import{d as r,o as p,g as o,b as k,s as t,a as m,z as n,C as a,L as s,D as l,_ as u}from"./entry.eb67953c.js";const d=r({__name:"external-link",props:{to:{type:String,required:!0}},setup(i){return(e,y)=>{const T=u;return p(),o("span",{class:l({"inline-flex items-center hover:opacity-70 transition-opacity text-inherit":!0,"gap-1.5":("linkType"in e?e.linkType:n(a))(i.to)==("LinkTypes"in e?e.LinkTypes:n(s)).INTERNAL,"gap-2":("linkType"in e?e.linkType:n(a))(i.to)==("LinkTypes"in e?e.LinkTypes:n(s)).EXTERNAL})},[k("span",null,[t(e.$slots,"default")]),m(T,{name:("linkType"in e?e.linkType:n(a))(i.to)==("LinkTypes"in e?e.LinkTypes:n(s)).EXTERNAL?"layout/external":"layout/arrow-right",class:l({"inline-block":!0,"h-[1.32rem] w-[1.32rem]":("linkType"in e?e.linkType:n(a))(i.to)==("LinkTypes"in e?e.LinkTypes:n(s)).EXTERNAL,"h-4 w-4":("linkType"in e?e.linkType:n(a))(i.to)==("LinkTypes"in e?e.LinkTypes:n(s)).INTERNAL})},null,8,["name","class"])],2)}}}),f=r({__name:"wrapper",props:{center:{type:Boolean,required:!1}},setup(i){return(e,y)=>(p(),o("div",{class:l(`max-w-[85rem] px-4 sm:px-6 lg:px-8${i.center?" mx-auto":""}`)},[t(e.$slots,"default")],2))}});export{d as _,f as a};
