import{r as c,t as w,g as S}from"./default.732aaddb.js";function T(t){if(t===null||t===!0||t===!1)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function g(t,e){var a,r,l,i,u,s,v,d;c(1,arguments);var f=S(),o=T((a=(r=(l=(i=e==null?void 0:e.weekStartsOn)!==null&&i!==void 0?i:e==null||(u=e.locale)===null||u===void 0||(s=u.options)===null||s===void 0?void 0:s.weekStartsOn)!==null&&l!==void 0?l:f.weekStartsOn)!==null&&r!==void 0?r:(v=f.locale)===null||v===void 0||(d=v.options)===null||d===void 0?void 0:d.weekStartsOn)!==null&&a!==void 0?a:0);if(!(o>=0&&o<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var n=w(t),O=n.getUTCDay(),k=(O<o?7:0)+O-o;return n.setUTCDate(n.getUTCDate()-k),n.setUTCHours(0,0,0,0),n}function m(t,e,a){c(2,arguments);var r=g(t,a),l=g(e,a);return r.getTime()===l.getTime()}export{m as i};
