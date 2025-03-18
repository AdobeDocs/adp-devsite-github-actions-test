"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[8640],{68434:function(e,t,i){i.d(t,{E_:function(){return O},FU:function(){return z},JU:function(){return H},OO:function(){return $},Qv:function(){return j},dF:function(){return x},q7:function(){return S},tU:function(){return I},we:function(){return B}});var n=i(54705),r=i(58168),a=i(80045),s=i(88763),l=i(46942),o=i.n(l),c=i(94760),d=i(89745);const m=["orientation","density","isQuiet","isHeader","children","className","onFontsReady"],p=["elementType","isDisabled","isSelected","className","children","icon","label"],u=["elementType","icon","isSelected","isDisabled","className","children","iconSize"],b=["className"],g=["className","index"],v=["elementType","isDisabled","isSelected","className","children","icon","hasDropdown","label"],f=["elementType","isHidden","className","children"],h=["theme","orientation","className","APIReference"];function y(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function w(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?y(Object(i),!0).forEach((function(t){(0,n.A)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):y(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}const x=(e,t)=>{e.current.style.transform=`translate(${t.current.offsetLeft}px, 0px)`,e.current.style.width=`${t.current.offsetWidth}px`},z=(e,t)=>{e.current.style.transition=t?"":"none"},A="480px",N=e=>{var t;return"img"===(null==e||null===(t=e.props)||void 0===t?void 0:t.mdxType)?(0,s.cloneElement)(e,{loading:"eager"}):e},D=e=>{let{image:t="",styles:i=""}=e;return t?(0,s.cloneElement)(t,{children:(0,d.t_)(t.props.children,N),css:(0,c.AH)("display:flex;align-items:center;justify-content:center;height:100%;width:100%;margin-top:var(--spectrum-global-dimension-size-0);img{display:block;object-fit:contain;}",i,";","")}):null},T=e=>{let{icon:t,styles:i}=e;return t?(0,s.cloneElement)(t,{alt:"",css:(0,c.AH)("height:var(--spectrum-global-dimension-size-600);width:var(--spectrum-global-dimension-size-600);margin-top:var(--spectrum-global-dimension-size-0);img{display:block;object-fit:contain;}",i,";","")}):null},I=(0,s.forwardRef)(((e,t)=>{let{orientation:i="horizontal",density:n="regular",isQuiet:l=!0,isHeader:d=!1,children:p,className:u,onFontsReady:b}=e,g=(0,a.A)(e,m);return(0,s.useEffect)((()=>{document.fonts.ready.then((()=>{b&&b()}))}),[b]),(0,c.Y)("div",(0,r.A)({ref:t},g,{role:d?void 0:"tablist","aria-orientation":d?void 0:"orientation",className:o()(u,"spectrum-Tabs","spectrum-Tabs--sizeM",`spectrum-Tabs--${i}`,{"spectrum-Tabs--quiet":l},{"spectrum-Tabs--compact":"compact"===n})}),p)})),S=(0,s.forwardRef)(((e,t)=>{var i;let{elementType:n="div",isDisabled:s=!1,isSelected:l=!1,className:d,children:m,icon:u,label:b}=e,g=(0,a.A)(e,p);const v=n;return(0,c.Y)(v,(0,r.A)({},g,{ref:t,role:"tab",title:null==b||null===(i=b.props)||void 0===i?void 0:i.children,"aria-selected":l,disabled:s,className:o()(d,"spectrum-Tabs-item",{"is-selected":l},{"is-disabled":s})}),u?(0,c.Y)(k,{icon:u,isSelected:l,isDisabled:s}):null,b?(0,c.Y)(H,null," ",b," "):null,m)}));var Y={name:"16l42sl",styles:"height:var(--spectrum-global-dimension-size-600);width:var(--spectrum-global-dimension-size-550);z-index:1"};const k=(0,s.forwardRef)(((e,t)=>{let{elementType:i="div",icon:n,isSelected:s,isDisabled:l,className:d,children:m,iconSize:p="xl"}=e,b=(0,a.A)(e,u);const g=i;return(0,c.Y)(g,(0,r.A)({},b,{ref:t,className:o()(d,"spectrum-Icon",{"is-selected":s},{"is-disabled ":l}),css:Y}),n?((e,t,i)=>{var n,r,a;return"img"===(null==e||null===(n=e.props)||void 0===n||null===(r=n.children)||void 0===r||null===(a=r.props)||void 0===a?void 0:a.mdxType)?(0,c.Y)(D,{image:e,className:o()(t,`spectrum-Icon--spectrum-icon-size-${i}`)}):(0,c.Y)(T,{icon:e,className:o()(t,`spectrum-Icon--spectrum-icon-size-${i}`)})})(n,d,p):null)}));var E={name:"pwo431",styles:"transition-property:transform,width"};const O=(0,s.forwardRef)(((e,t)=>{let{className:i}=e,n=(0,a.A)(e,b);return(0,c.Y)("div",(0,r.A)({},n,{ref:t,className:o()(i,"spectrum-Tabs-selectionIndicator"),css:E}))}));var R={name:"pwo431",styles:"transition-property:transform,width"};const j=(0,s.forwardRef)(((e,t)=>{let{className:i,index:n=0}=e,s=(0,a.A)(e,g);return(0,c.Y)("div",(0,r.A)({},s,{ref:t,className:o()(i,"spectrum-Tabs-selectionIndicator",{default:0===n}),css:R}))})),H=e=>{let{children:t}=e;return(0,c.Y)("span",{className:"spectrum-Tabs-itemLabel"},t)},$=(0,s.forwardRef)(((e,t)=>{var i;let{elementType:n="div",isDisabled:s=!1,isSelected:l=!1,className:d,children:m,icon:p,hasDropdown:u=!1,label:b}=e,g=(0,a.A)(e,v);const f=n;return(0,c.Y)(f,(0,r.A)({},g,{ref:t,title:null==b||null===(i=b.props)||void 0===i?void 0:i.children,"aria-selected":l,autofocus:!0,tabIndex:"0",onKeyDown:e=>{var t;("ArrowRight"===e.key&&("tabindex5"===g.id&&document.getElementById("getCredentialID").focus(),e.target.nextElementSibling&&e.target.nextElementSibling.focus()),"ArrowLeft"===e.key)&&("tabindex0"===g.id?null===(t=document.getElementById("product"))||void 0===t||t.focus():e.target.previousElementSibling&&e.target.previousElementSibling.focus());"ArrowDown"===e.key&&(e.preventDefault(),u?(null==g?void 0:g.openDropDown)&&(null==g||g.openDropDown({index:g.index,isOpen:!0,id:g.id})):e.target.nextElementSibling&&e.target.nextElementSibling.focus()),"ArrowUp"===e.key&&((null==g?void 0:g.openDropDown)&&(null==g||g.openDropDown({isOpen:!1,id:g.id})),e.target.previousElementSibling&&e.target.previousElementSibling.focus())},disabled:s,className:o()(d,"spectrum-Tabs-item",{"is-selected":l},{"is-disabled":s})}),p?(0,c.Y)(k,{icon:p,isSelected:l,isDisabled:s}):null,b?(0,c.Y)(H,null," ",b," "):null,m)})),_=(0,s.forwardRef)(((e,t)=>{let{elementType:i="div",isHidden:n,className:s,children:l}=e,d=(0,a.A)(e,f);const m=i;return(0,c.Y)(m,(0,r.A)({},d,{ref:t,hidden:n,className:o()(s)}),l)}));var P={name:"15jol59",styles:"color:#4b9cf5;&:focus{text-decoration:underline;border-bottom:1px solid #1374e6;}"},V={name:"1xt9l3k",styles:"background:var(--spectrum-global-color-gray-100);max-width:100%;overflow-x:hidden!important;margin:0;padding-bottom:var(--spectrum-global-dimension-size-250)"};const B=e=>{let{theme:t="light",orientation:i="horizontal",className:n,APIReference:r=""}=e,l=(0,a.A)(e,h);const{0:m}=(0,s.useState)([]),p=(0,s.useRef)(null),{0:u,1:b}=(0,s.useState)({tab:0});let g=Object.keys(l).filter((e=>e.startsWith("heading"))).map((e=>e)).map(((e,t)=>{var i,n;return{heading:(null==l||null===(i=l[`heading${t}`])||void 0===i||null===(n=i.props)||void 0===n?void 0:n.children)||(null==l?void 0:l.heading),content:(null==l?void 0:l[`content${t}`])||(null==l?void 0:l.content),image:(null==l?void 0:l[`image${t}`])||(null==l?void 0:l.image)}}));const v=function(e){void 0===e&&(e=u.tab);const t=m.filter((e=>null==e?void 0:e.current))[e];x(p,t)},f=e=>{b({tab:e}),v(e)};return(0,c.Y)("section",{className:o()(n,`tabsBlock spectrum--${t}`),css:V},(0,c.Y)("div",{css:(0,c.AH)("display:","vertical"===i?"inline-flex":"",";@media only screen and (min-width: ",d.TN,"){margin:0 auto!important;}@media screen and (max-device-width: ",d.Vh,"){flex-direction:column;}","")},(0,c.Y)("div",{css:(0,c.AH)("display:","vertical"===i?"grid":"block",";position:relative;grid-template-columns:300px calc(100% - 300px);margin-top:","vertical"===i?"var(--spectrum-global-dimension-size-300)":"",";width:","vertical"===i?d.fy+" !important":"inherit",";@media only screen and (max-width: ",d.Vh,"){width:100%!important;}@media only screen and (device-width: ",d.TN,"){width:",(0,d.I6)(8),"!important;}","")},(0,c.Y)("div",{css:(0,c.AH)((null==g?void 0:g.length)>6?"overflow-x:auto; overflow-y: hidden;":"",";","")},(null==g?void 0:g.length)>0?(0,c.Y)(I,{orientation:i,isQuiet:!0,onFontsReady:v},g.map(((e,t)=>{const n=(0,s.createRef)();m.push(n);const a=u.tab===t;return(0,c.Y)(s.default.Fragment,null,(0,c.Y)(S,{className:"tabItem",key:`tabItem_${t}`,id:`tabItem_${t}`,ref:n,isSelected:a,"aria-controls":`tabView${t}`,tabIndex:t===u.tab?0:-1,"aria-label":e.heading,"aria-selected":t===u.tab,label:(0,c.Y)("b",null,e.heading),icon:e.image,onKeyDown:e=>{if("ArrowDown"===e.key||"Enter"===e.key){var i;if(e.preventDefault(),g.length===t+1&&""!==r)null===(i=document.getElementById("apiReference"))||void 0===i||i.setAttribute("tabIndex",0),document.getElementById("apiReference").focus();e.currentTarget.nextSibling&&e.currentTarget.nextSibling.nextSibling.focus()}"ArrowUp"===e.key&&(e.preventDefault(),e.currentTarget.previousSibling&&e.currentTarget.previousSibling.previousSibling.focus())},onFocus:()=>{f(t)},onClick:()=>{f(t)},css:(0,c.AH)("text-align:left;white-space:normal;width:","vertical"===i?"calc(var(--spectrum-global-dimension-size-2000) + var(--spectrum-global-dimension-size-600))":"calc(var(--spectrum-global-dimension-static-grid-fixed-max-width) / var(--spectrum-global-dimension-static-grid-columns))","!important;font-size:var(--spectrum-global-dimension-size-200);margin-bottom:","vertical"===i?"1rem !important":"0rem",";display:flex!important;padding:var(--spectrum-global-dimension-size-125)!important;height:auto!important;line-height:","vertical"===i?"initial !important":"initial",";.spectrum-Tabs-itemLabel{margin-top:5px;margin-bottom:5px;}.spectrum-Icon{background-size:var(--spectrum-global-dimension-size-225) var(--spectrum-global-dimension-size-275);width:var(--spectrum-global-dimension-size-500);height:var(--spectrum-global-dimension-size-400);}&.is-disabled{pointer-events:none;}&::before{left:var(--spectrum-global-dimension-size-0)!important;right:var(--spectrum-global-dimension-size-0)!important;border:none!important;}@media only screen and (max-width: ",A,"){margin-top:var(--spectrum-global-dimension-size-25)!important;margin-bottom:var(--spectrum-global-dimension-size-25)!important;}@media only screen and (max-width: ",d.Vh,"){padding-left:var(--spectrum-global-dimension-size-0)!important;}@media only screen and (min-width: ",d.TN,"){left:var(--spectrum-global-dimension-size-250)!important;}","")},(0,c.Y)("div",{key:`mobileTabView_${t}`,className:"mobileTabView",hidden:!a,css:(0,c.AH)("display:none;padding:var(--spectrum-global-dimension-size-0)!important;h3{font-size:var(--spectrum-heading-s-text-size, var(--spectrum-alias-heading-s-text-size));}p{font-size:var(--spectrum-body-s-text-size, var(--spectrum-global-dimension-font-size-150));}@media only screen and (max-width: ","767px","){display:block;}","")},e.content?e.content:null)))})),(0,c.Y)(O,{ref:p}),""!==r&&(0,c.Y)("div",{css:(0,c.AH)("text-align:left;white-space:normal;width:calc(var(--spectrum-global-dimension-size-2500) + var(--spectrum-global-dimension-size-750))!important;font-size:var(--spectrum-global-dimension-size-200);padding:var(--spectrum-global-dimension-size-125)!important;@media only screen and (max-width: ",A,"){left:var(--spectrum-global-dimension-size-100)!important;margin-top:var(--spectrum-global-dimension-size-125)!important;margin-bottom:var(--spectrum-global-dimension-size-125)!important;}@media only screen and (min-width: ",d.TN,"){left:var(--spectrum-global-dimension-size-250)!important;}","")},(0,c.Y)("span",{css:(0,c.AH)("text-align:left;cursor:pointer;margin-top:var(--spectrum-global-dimension-size-85);margin-left:var(--spectrum-global-dimension-size-400);@media only screen and (max-width: ",A,"){margin-left:var(--spectrum-global-dimension-size-100)!important;}@media only screen and (max-width: ",d.Vh,"){margin-left:var(--spectrum-global-dimension-size-100)!important;}","")},(0,c.Y)("a",{href:r,tabIndex:-1,id:"apiReference",css:P,target:"_blank",rel:"noreferrer",onKeyDown:e=>{"ArrowUp"===e.key&&(e.preventDefault(),f((null==g?void 0:g.length)-1),document.getElementById("tabItem_"+((null==g?void 0:g.length)-1)).focus())},onBlur:()=>{document.getElementById("apiReference").setAttribute("tabIndex",-1)}},"API Reference")))):null),(null==g?void 0:g.length)>0?g.map(((e,t)=>{const i=u.tab===t,n=e.content;return n.props=w(w({},n.props),{},{index:u.tab}),(0,c.Y)(_,{key:`tabView_${t}`,id:`tabView${t}`,className:"tabView",isHidden:!i,css:(0,c.AH)("text-align:left;padding:0px 0 var(--spectrum-global-dimension-size-100) 10px!important;overflow-x:hidden!important;@media only screen and (max-width: ",A,"){padding-left:inherit!important;max-width:",(0,d.I6)(3),"!important;}@media only screen and (device-width: ",d.Vh,"){max-width:",(0,d.I6)(3.5),"!important;}@media only screen and (device-width: ",d.TN,"){max-width:",(0,d.I6)(6.5),"!important;padding-left:var(--spectrum-global-dimension-size-500);}","")},n)})):null)))}}}]);
//# sourceMappingURL=3f943334-00e7a167c56a7c53f0a1.js.map