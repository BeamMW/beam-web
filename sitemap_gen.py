#! /usr/bin/env python
""" 
    Copyright (C) 2007-2009 Vladimir Toncar

    Contributors:
        Redirect handling by Pavel "ShadoW" Dvorak
        Upate to Python3, auto crawl depth(priority) by Maxnflaxl

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

"""

import os.path
import sys
import string
import getopt
import urllib.request
import urllib.error
import urllib.parse
import urllib.robotparser
import re
import xml.sax.saxutils
from html.parser import HTMLParser


helpText = """sitemap_gen.py version 1.2.0 (2026-02-24)

This script crawls a web site from a given starting URL and generates
a Sitemap file in the format that is accepted by Google. The crawler
does not follow links to other web sites. It also respects the 'nofollow'
tags and will not crawl into directories disallowed in the robots.txt file.

Command line syntax:

python sitemap_gen.py <options> <starting URL>

Available options:
-h         --help                Print this text and exit

-b <ext>   --block <ext>         Exclude URLs with the given extension;
                                 <ext> must be without the leading dot.
                                 The comparison is case insensitive, so
                                 for example DOC and doc are treated
                                 the same. You can use this option several
                                 times to block several extensions.
                                 
-c <value> --changefreq <value>  Set the change frequency. The given value
                                 is used in all sitemap entries (maybe a
                                 future version of this script will change
                                 that). The allowed values are: always,
                                 hourly, daily, weekly, monthly, yearly,
                                 never.
                                 
-p <prio>  --priority <prio>     Set a fixed priority for all URLs (0.0-1.0).
                                 If omitted, priority is auto: 0.8^depth
                                 (homepage 1.00, 1 click 0.80, 2 clicks 0.64, etc.).
                                 
-m <value> --max-urls <value>    Set the maximum number of URLs to be crawled.
                                 The default value is 1000 and the largest
                                 value that you can set is 50000 (the script
                                 generates only a single sitemap file).
                                 
-o <file>  --output-file <file>  Set the name of the geneated sitemap file.
                                 The default file name is sitemap.xml.

Usage example:
python sitemap_gen.py -b doc -b bmp -o test_sitemap.xml http://www.your-site-name.com/index.html

For more information, visit http://toncar.cz/opensource/sitemap_gen.html

"""

allowedChangefreq = ["always", "hourly", "daily", "weekly", \
                     "monthly", "yearly", "never"]

def getPage(url):
    try:
        f = urllib.request.urlopen(url)
        page = f.read().decode('utf-8', errors='replace')
        from email.utils import parsedate
        date_hdr = f.info().get('Last-Modified')
        parsed = parsedate(date_hdr) if date_hdr else None
        date = tuple(parsed[:3]) if parsed else (0, 0, 0)
        f.close()
        return (page, date, f.geturl())
    except urllib.error.URLError as detail:
        print("%s. Skipping..." % (detail,))
        return (None, (0, 0, 0), "")
#end def


def joinUrls(baseUrl, newUrl):
    helpUrl, fragment = urllib.parse.urldefrag(newUrl)
    return urllib.parse.urljoin(baseUrl, helpUrl)
#end def


def getRobotParser(startUrl):
    rp = urllib.robotparser.RobotFileParser()
    robotUrl = urllib.parse.urljoin(startUrl, "/robots.txt")
    page, date, url = getPage(robotUrl)

    if page is None:
        print("Could not read ROBOTS.TXT at:", robotUrl)
        return None
    #end if

    rp.parse(page)
    print("Found ROBOTS.TXT at:", robotUrl)
    return rp
#end def


class MyHTMLParser(HTMLParser):

    def __init__(self, pageMap, redirects, baseUrl, maxUrls, blockExtensions, robotParser, depth=0):
        super().__init__()
        self.pageMap = pageMap
        self.redirects = redirects
        self.baseUrl = baseUrl
        self.server = urllib.parse.urlsplit(baseUrl)[1]
        self.maxUrls = maxUrls
        self.blockExtensions = blockExtensions
        self.robotParser = robotParser
        self.depth = depth
    #end def

    def hasBlockedExtension(self, url):
        p = urllib.parse.urlparse(url)
        path = p[2].upper()
        # In python 2.5, endswith() also accepts a tuple,
        # but let's make it backwards compatible
        for i in self.blockExtensions:
            if path.endswith(i):
                return 1
        return 0
    #end def        

    def handle_starttag(self, tag, attrs):
        if len(self.pageMap) >= self.maxUrls:
            return

        if (tag.upper() == "BASE"):
            if attrs and (attrs[0][0].upper() == "HREF"):
                self.baseUrl = joinUrls(self.baseUrl, attrs[0][1])
                print("BASE URL set to", self.baseUrl)

        if (tag.upper() == "A"):
            url = ""
            for attr in attrs:
                if (attr[0].upper() == "REL") and ('NOFOLLOW' in attr[1].upper()):
                    return
                elif (attr[0].upper() == "HREF") and ('MAILTO:' not in attr[1].upper()):
                    url = joinUrls(self.baseUrl, attr[1])
            if url == "":
                return

            if urllib.parse.urlsplit(url)[1] != self.server:
                return
            if self.hasBlockedExtension(url) or self.redirects.count(url) > 0:
                return
            if (self.robotParser is not None) and not (self.robotParser.can_fetch("*", url)):
                print("URL restricted by ROBOTS.TXT: ", url)
                return
            if url not in self.pageMap:
                self.pageMap[url] = (None, self.depth + 1)  # (to_fetch, depth)
        #end if
    #end def
#end class

def getUrlToProcess(pageMap):
    for i in list(pageMap.keys()):
        val = pageMap[i]
        if isinstance(val, tuple) and len(val) == 2 and val[0] is None:
            return i
    return None

def parsePages(startUrl, maxUrls, blockExtensions):
    pageMap = {}
    pageMap[startUrl] = (None, 0)  # (to_fetch, depth)
    redirects = []

    robotParser = getRobotParser(startUrl)

    while True:
        url = getUrlToProcess(pageMap)
        if url is None:
            break
        _, depth = pageMap[url]
        print(" ", url)
        page, date, newUrl = getPage(url)
        if page is None:
            del pageMap[url]
        elif url != newUrl:
            print("Redirect -> " + newUrl)
            del pageMap[url]
            pageMap[newUrl] = (None, depth)
            redirects.append(url)
        else:
            pageMap[url] = (date, depth)
            parser = MyHTMLParser(pageMap, redirects, url, maxUrls, blockExtensions, robotParser, depth)
            try:
                parser.feed(page)
                parser.close()
            except Exception as e:
                print("Error parsing %s, skipping: %s" % (url, e))
    #end while

    return pageMap
#end def


def _normalize_loc_scheme(url, scheme):
    """Ensure <loc> uses the same scheme as the start URL (e.g. https)."""
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme and parsed.scheme != scheme:
        parsed = parsed._replace(scheme=scheme)
        return urllib.parse.urlunparse(parsed)
    return url


def generateSitemapFile(pageMap, fileName, changefreq="", priority_fixed=None, base_url=None):
    """priority_fixed: None = auto (0.8^depth like xml-sitemaps.com), else use that value for all."""
    scheme = 'https'
    if base_url:
        parsed = urllib.parse.urlparse(base_url)
        if parsed.scheme:
            scheme = parsed.scheme
    with open(fileName, "wt", encoding='utf-8') as fw:
        fw.write('''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
''')
        for i in pageMap.keys():
            val = pageMap[i]
            date, depth = val[0], val[1]
            loc = _normalize_loc_scheme(i, scheme)
            fw.write('<url>\n  <loc>%s</loc>\n' % (xml.sax.saxutils.escape(loc)))
            if date and date != (0, 0, 0):
                fw.write('  <lastmod>%4d-%02d-%02d</lastmod>\n' % date)
            if changefreq != "":
                fw.write('  <changefreq>%s</changefreq>\n' % (changefreq))
            if priority_fixed is not None:
                if priority_fixed > 0.0:
                    fw.write('  <priority>%.2f</priority>\n' % (priority_fixed))
            else:
                # Auto: priority = 0.8^depth (same as xml-sitemaps.com)
                prio = round(0.8 ** depth, 2)
                fw.write('  <priority>%.2f</priority>\n' % (prio))
            fw.write('</url>\n')
        fw.write('</urlset>')
#end def
        


def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:],
                "hb:c:m:p:o:",
                ["help", "block=", "changefreq=",
                 "max-urls=", "priority=", "output-file="])
    except getopt.GetoptError:
        print(helpText)
        return

    blockExtensions = []
    changefreq = ""
    priority_fixed = None  # None = auto (0.8^depth)
    fileName = "sitemap.xml"
    maxUrls = 1000
    pageMap = {}

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(helpText)
            return
        elif opt in ("-b", "--block"):
            blockExtensions.append("." + arg.upper())
        elif opt in ("-c", "--changefreq"):
            if arg in allowedChangefreq:
                changefreq = arg
            else:
                print("Allowed changefreq values are:")
                for i in allowedChangefreq:
                    print(i)
                print()
                return
        elif opt in ("-m", "--max-urls"):
            maxUrls = int(arg)
            if (maxUrls < 0) or (maxUrls > 50000):
                print("The maximum number of URLs must be greater than 0 and smaller than 50000")
                return
        elif opt in ("-p", "--priority"):
            try:
                p = float(arg)
            except ValueError:
                print("Option -p requires a number (e.g. 0.8). Use: python sitemap-gen.py -p 0.8 <URL>")
                return
            if (p < 0.0) or (p > 1.0):
                print("Priority must be between 0.0 and 1.0")
                return
            priority_fixed = p
        elif opt in ("-o", "--output-file"):
            fileName = arg
            if fileName in ("", ".", ".."):
                print("Please provide a sensible file name")
                return
        #end if

    if len(args) == 0:
        print("You must provide the starting URL.\nTry the -h option for help.")
        return

    startUrl = args[0].strip()
    if not startUrl.startswith(('http://', 'https://')):
        startUrl = 'https://' + startUrl

    # Set user agent string
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'sitemap_gen/1.0')]
    urllib.request.install_opener(opener)

    # Start processing
    print("Crawling the site...")
    pageMap = parsePages(startUrl, maxUrls, blockExtensions)
    print("Generating sitemap: %d URLs" % (len(pageMap)))
    generateSitemapFile(pageMap, fileName, changefreq, priority_fixed, base_url=startUrl)
    print("Finished.")
#end def

if __name__ == '__main__': main()