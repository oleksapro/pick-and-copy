import{n as e,t}from"./browser-polyfill-COJV982g.js";var n=e(t(),1);function r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}function i(e,t){return Array(t+1).join(e)}function a(e){return e.replace(/^\n*/,``)}function o(e){for(var t=e.length;t>0&&e[t-1]===`
`;)t--;return e.substring(0,t)}function s(e){return o(a(e))}var c=`ADDRESS.ARTICLE.ASIDE.AUDIO.BLOCKQUOTE.BODY.CANVAS.CENTER.DD.DIR.DIV.DL.DT.FIELDSET.FIGCAPTION.FIGURE.FOOTER.FORM.FRAMESET.H1.H2.H3.H4.H5.H6.HEADER.HGROUP.HR.HTML.ISINDEX.LI.MAIN.MENU.NAV.NOFRAMES.NOSCRIPT.OL.OUTPUT.P.PRE.SECTION.TABLE.TBODY.TD.TFOOT.TH.THEAD.TR.UL`.split(`.`);function l(e){return p(e,c)}var u=[`AREA`,`BASE`,`BR`,`COL`,`COMMAND`,`EMBED`,`HR`,`IMG`,`INPUT`,`KEYGEN`,`LINK`,`META`,`PARAM`,`SOURCE`,`TRACK`,`WBR`];function d(e){return p(e,u)}function ee(e){return m(e,u)}var f=[`A`,`TABLE`,`THEAD`,`TBODY`,`TFOOT`,`TH`,`TD`,`IFRAME`,`SCRIPT`,`AUDIO`,`VIDEO`];function te(e){return p(e,f)}function ne(e){return m(e,f)}function p(e,t){return t.indexOf(e.nodeName)>=0}function m(e,t){return e.getElementsByTagName&&t.some(function(t){return e.getElementsByTagName(t).length})}var re=[[/\\/g,`\\\\`],[/\*/g,`\\*`],[/^-/g,`\\-`],[/^\+ /g,`\\+ `],[/^(=+)/g,`\\$1`],[/^(#{1,6}) /g,`\\$1 `],[/`/g,"\\`"],[/^~~~/g,`\\~~~`],[/\[/g,`\\[`],[/\]/g,`\\]`],[/^>/g,`\\>`],[/_/g,`\\_`],[/^(\d+)\. /g,`$1\\. `]];function h(e){return re.reduce(function(e,t){return e.replace(t[0],t[1])},e)}var g={};g.paragraph={filter:`p`,replacement:function(e){return`

`+e+`

`}},g.lineBreak={filter:`br`,replacement:function(e,t,n){return n.br+`
`}},g.heading={filter:[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],replacement:function(e,t,n){var r=Number(t.nodeName.charAt(1));if(n.headingStyle===`setext`&&r<3){var a=i(r===1?`=`:`-`,e.length);return`

`+e+`
`+a+`

`}else return`

`+i(`#`,r)+` `+e+`

`}},g.blockquote={filter:`blockquote`,replacement:function(e){return e=s(e).replace(/^/gm,`> `),`

`+e+`

`}},g.list={filter:[`ul`,`ol`],replacement:function(e,t){var n=t.parentNode;return n.nodeName===`LI`&&n.lastElementChild===t?`
`+e:`

`+e+`

`}},g.listItem={filter:`li`,replacement:function(e,t,n){var r=n.bulletListMarker+`   `,i=t.parentNode;if(i.nodeName===`OL`){var a=i.getAttribute(`start`),o=Array.prototype.indexOf.call(i.children,t);r=(a?Number(a)+o:o+1)+`.  `}var c=/\n$/.test(e);return e=s(e)+(c?`
`:``),e=e.replace(/\n/gm,`
`+` `.repeat(r.length)),r+e+(t.nextSibling?`
`:``)}},g.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle===`indented`&&e.nodeName===`PRE`&&e.firstChild&&e.firstChild.nodeName===`CODE`},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}},g.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle===`fenced`&&e.nodeName===`PRE`&&e.firstChild&&e.firstChild.nodeName===`CODE`},replacement:function(e,t,n){for(var r=((t.firstChild.getAttribute(`class`)||``).match(/language-(\S+)/)||[null,``])[1],a=t.firstChild.textContent,o=n.fence.charAt(0),s=3,c=RegExp(`^`+o+`{3,}`,`gm`),l;l=c.exec(a);)l[0].length>=s&&(s=l[0].length+1);var u=i(o,s);return`

`+u+r+`
`+a.replace(/\n$/,``)+`
`+u+`

`}},g.horizontalRule={filter:`hr`,replacement:function(e,t,n){return`

`+n.hr+`

`}},g.inlineLink={filter:function(e,t){return t.linkStyle===`inlined`&&e.nodeName===`A`&&e.getAttribute(`href`)},replacement:function(e,t){var n=v(t.getAttribute(`href`)),r=y(_(t.getAttribute(`title`))),i=r?` "`+r+`"`:``;return`[`+e+`](`+n+i+`)`}},g.referenceLink={filter:function(e,t){return t.linkStyle===`referenced`&&e.nodeName===`A`&&e.getAttribute(`href`)},replacement:function(e,t,n){var r=v(t.getAttribute(`href`)),i=_(t.getAttribute(`title`));i&&=` "`+y(i)+`"`;var a,o;switch(n.linkReferenceStyle){case`collapsed`:a=`[`+e+`][]`,o=`[`+e+`]: `+r+i;break;case`shortcut`:a=`[`+e+`]`,o=`[`+e+`]: `+r+i;break;default:var s=this.references.length+1;a=`[`+e+`][`+s+`]`,o=`[`+s+`]: `+r+i}return this.references.push(o),a},references:[],append:function(e){var t=``;return this.references.length&&(t=`

`+this.references.join(`
`)+`

`,this.references=[]),t}},g.emphasis={filter:[`em`,`i`],replacement:function(e,t,n){return e.trim()?n.emDelimiter+e+n.emDelimiter:``}},g.strong={filter:[`strong`,`b`],replacement:function(e,t,n){return e.trim()?n.strongDelimiter+e+n.strongDelimiter:``}},g.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName===`PRE`&&!t;return e.nodeName===`CODE`&&!n},replacement:function(e){if(!e)return``;e=e.replace(/\r?\n|\r/g,` `);for(var t=/^`|^ .*?[^ ].* $|`$/.test(e)?` `:``,n="`",r=e.match(/`+/gm)||[];r.indexOf(n)!==-1;)n+="`";return n+t+e+t+n}},g.image={filter:`img`,replacement:function(e,t){var n=h(_(t.getAttribute(`alt`))),r=v(t.getAttribute(`src`)||``),i=_(t.getAttribute(`title`)),a=i?` "`+y(i)+`"`:``;return r?`![`+n+`](`+r+a+`)`:``}};function _(e){return e?e.replace(/(\n+\s*)+/g,`
`):``}function v(e){var t=e.replace(/([<>()])/g,`\\$1`);return t.indexOf(` `)>=0?`<`+t+`>`:t}function y(e){return e.replace(/"/g,`\\"`)}function b(e){for(var t in this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[],e.rules)this.array.push(e.rules[t])}b.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return``}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;return(t=x(this.array,e,this.options))||(t=x(this._keep,e,this.options))||(t=x(this._remove,e,this.options))?t:this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};function x(e,t,n){for(var r=0;r<e.length;r++){var i=e[r];if(ie(i,t,n))return i}}function ie(e,t,n){var r=e.filter;if(typeof r==`string`){if(r===t.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof r==`function`){if(r.call(e,t,n))return!0}else throw TypeError("`filter` needs to be a string, array, or function")}function ae(e){var t=e.element,n=e.isBlock,r=e.isVoid,i=e.isPre||function(e){return e.nodeName===`PRE`};if(!(!t.firstChild||i(t))){for(var a=null,o=!1,s=null,c=C(s,t,i);c!==t;){if(c.nodeType===3||c.nodeType===4){var l=c.data.replace(/[ \r\n\t]+/g,` `);if((!a||/ $/.test(a.data))&&!o&&l[0]===` `&&(l=l.substr(1)),!l){c=S(c);continue}c.data=l,a=c}else if(c.nodeType===1)n(c)||c.nodeName===`BR`?(a&&(a.data=a.data.replace(/ $/,``)),a=null,o=!1):r(c)||i(c)?(a=null,o=!0):a&&(o=!1);else{c=S(c);continue}var u=C(s,c,i);s=c,c=u}a&&(a.data=a.data.replace(/ $/,``),a.data||S(a))}}function S(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function C(e,t,n){return e&&e.parentNode===t||n(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}var w=typeof window<`u`?window:{};function T(){var e=w.DOMParser,t=!1;try{new e().parseFromString(``,`text/html`)&&(t=!0)}catch{}return t}function oe(){var e=function(){};return se()?e.prototype.parseFromString=function(e){var t=new window.ActiveXObject(`htmlfile`);return t.designMode=`on`,t.open(),t.write(e),t.close(),t}:e.prototype.parseFromString=function(e){var t=document.implementation.createHTMLDocument(``);return t.open(),t.write(e),t.close(),t},e}function se(){var e=!1;try{document.implementation.createHTMLDocument(``).open()}catch{w.ActiveXObject&&(e=!0)}return e}var ce=T()?w.DOMParser:oe();function E(e,t){var n=typeof e==`string`?le().parseFromString(`<x-turndown id="turndown-root">`+e+`</x-turndown>`,`text/html`).getElementById(`turndown-root`):e.cloneNode(!0);return ae({element:n,isBlock:l,isVoid:d,isPre:t.preformattedCode?ue:null}),n}var D;function le(){return D||=new ce,D}function ue(e){return e.nodeName===`PRE`||e.nodeName===`CODE`}function de(e,t){return e.isBlock=l(e),e.isCode=e.nodeName===`CODE`||e.parentNode.isCode,e.isBlank=fe(e),e.flankingWhitespace=pe(e,t),e}function fe(e){return!d(e)&&!te(e)&&/^\s*$/i.test(e.textContent)&&!ee(e)&&!ne(e)}function pe(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:``,trailing:``};var n=me(e.textContent);return n.leadingAscii&&O(`left`,e,t)&&(n.leading=n.leadingNonAscii),n.trailingAscii&&O(`right`,e,t)&&(n.trailing=n.trailingNonAscii),{leading:n.leading,trailing:n.trailing}}function me(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}function O(e,t,n){var r,i,a;return e===`left`?(r=t.previousSibling,i=/ $/):(r=t.nextSibling,i=/^ /),r&&(r.nodeType===3?a=i.test(r.nodeValue):n.preformattedCode&&r.nodeName===`CODE`?a=!1:r.nodeType===1&&!l(r)&&(a=i.test(r.textContent))),a}var he=Array.prototype.reduce;function k(e){if(!(this instanceof k))return new k(e);var t={rules:g,headingStyle:`setext`,hr:`* * *`,bulletListMarker:`*`,codeBlockStyle:`indented`,fence:"```",emDelimiter:`_`,strongDelimiter:`**`,linkStyle:`inlined`,linkReferenceStyle:`full`,br:`  `,preformattedCode:!1,blankReplacement:function(e,t){return t.isBlock?`

`:``},keepReplacement:function(e,t){return t.isBlock?`

`+t.outerHTML+`

`:t.outerHTML},defaultReplacement:function(e,t){return t.isBlock?`

`+e+`

`:e}};this.options=r({},t,e),this.rules=new b(this.options)}k.prototype={turndown:function(e){if(!P(e))throw TypeError(e+` is not a string, or an element/document/fragment node.`);if(e===``)return``;var t=A.call(this,new E(e,this.options));return j.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e==`function`)e(this);else throw TypeError(`plugin must be a Function or an Array of Functions`);return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return h(e)}};function A(e){var t=this;return he.call(e.childNodes,function(e,n){n=new de(n,t.options);var r=``;return n.nodeType===3?r=n.isCode?n.nodeValue:t.escape(n.nodeValue):n.nodeType===1&&(r=M.call(t,n)),N(e,r)},``)}function j(e){var t=this;return this.rules.forEach(function(n){typeof n.append==`function`&&(e=N(e,n.append(t.options)))}),e.replace(/^[\t\r\n]+/,``).replace(/[\t\r\n\s]+$/,``)}function M(e){var t=this.rules.forNode(e),n=A.call(this,e),r=e.flankingWhitespace;return(r.leading||r.trailing)&&(n=n.trim()),r.leading+t.replacement(n,e,this.options)+r.trailing}function N(e,t){var n=o(e),r=a(t),i=Math.max(e.length-n.length,t.length-r.length);return n+`

`.substring(0,i)+r}function P(e){return e!=null&&(typeof e==`string`||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var F=/highlight-(?:text|source)-([a-z0-9]+)/;function I(e){e.addRule(`highlightedCodeBlock`,{filter:function(e){var t=e.firstChild;return e.nodeName===`DIV`&&F.test(e.className)&&t&&t.nodeName===`PRE`},replacement:function(e,t,n){var r=((t.className||``).match(F)||[null,``])[1];return`

`+n.fence+r+`
`+t.firstChild.textContent+`
`+n.fence+`

`}})}function L(e){e.addRule(`strikethrough`,{filter:[`del`,`s`,`strike`],replacement:function(e){return`~`+e+`~`}})}var R=Array.prototype.indexOf,ge=Array.prototype.every,z={};z.tableCell={filter:[`th`,`td`],replacement:function(e,t){return V(e,t)}},z.tableRow={filter:`tr`,replacement:function(e,t){var n=``,r={left:`:--`,right:`--:`,center:`:-:`};if(B(t))for(var i=0;i<t.childNodes.length;i++){var a=`---`,o=(t.childNodes[i].getAttribute(`align`)||``).toLowerCase();o&&(a=r[o]||a),n+=V(a,t.childNodes[i])}return`
`+e+(n?`
`+n:``)}},z.table={filter:function(e){return e.nodeName===`TABLE`&&B(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}},z.tableSection={filter:[`thead`,`tbody`,`tfoot`],replacement:function(e){return e}};function B(e){var t=e.parentNode;return t.nodeName===`THEAD`||t.firstChild===e&&(t.nodeName===`TABLE`||_e(t))&&ge.call(e.childNodes,function(e){return e.nodeName===`TH`})}function _e(e){var t=e.previousSibling;return e.nodeName===`TBODY`&&(!t||t.nodeName===`THEAD`&&/^\s*$/i.test(t.textContent))}function V(e,t){var n=R.call(t.parentNode.childNodes,t),r=` `;return n===0&&(r=`| `),r+e+` |`}function ve(e){for(var t in e.keep(function(e){return e.nodeName===`TABLE`&&!B(e.rows[0])}),z)e.addRule(t,z[t])}function ye(e){e.addRule(`taskListItems`,{filter:function(e){return e.type===`checkbox`&&e.parentNode.nodeName===`LI`},replacement:function(e,t){return(t.checked?`[x]`:`[ ]`)+` `}})}function be(e){e.use([I,L,ve,ye])}var H=new k({headingStyle:`atx`,codeBlockStyle:`fenced`});H.use(be);var U=!1,W=null,G=null,K=null,q=null;function xe(e){let t=e.tagName.toLowerCase();return e.id?t+=`#${e.id}`:e.classList.length&&(t+=`.${[...e.classList].slice(0,2).join(`.`)}`),t}function Se(){G=document.createElement(`div`),G.style.cssText=`all: initial; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;`;let e=G.attachShadow({mode:`open`});K=document.createElement(`div`),K.style.cssText=`
    position: fixed;
    pointer-events: none;
    background: rgba(124, 58, 237, 0.25);
    outline: 2px solid #7c3aed;
    border-radius: 2px;
    display: none;
  `,q=document.createElement(`div`),q.style.cssText=`
    position: fixed;
    pointer-events: none;
    background: #7c3aed;
    color: #fff;
    font: 600 11px/1.4 -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 2px 6px;
    border-radius: 3px;
    white-space: nowrap;
    display: none;
  `,e.appendChild(K),e.appendChild(q),document.documentElement.appendChild(G)}function J(){G?.remove(),G=null,K=null,q=null}function Ce(e){let t=e.getBoundingClientRect();K.style.display=`block`,K.style.left=`${t.left}px`,K.style.top=`${t.top}px`,K.style.width=`${t.width}px`,K.style.height=`${t.height}px`,q.textContent=xe(e),q.style.display=`block`;let n=t.top>20?t.top-20:t.bottom+2;q.style.left=`${Math.max(t.left,0)}px`,q.style.top=`${n}px`}function Y(e){let t=document.elementFromPoint(e.clientX,e.clientY);!t||t===W||(W=t,Ce(t))}function X(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();let t=W;Q(),t&&Te(t)}function Z(e){e.key===`Escape`&&(e.preventDefault(),Q())}function we(){U||(U=!0,Se(),document.documentElement.style.cursor=`crosshair`,document.addEventListener(`mousemove`,Y,!0),document.addEventListener(`click`,X,!0),document.addEventListener(`keydown`,Z,!0))}function Q(){U&&(U=!1,W=null,document.documentElement.style.cursor=``,document.removeEventListener(`mousemove`,Y,!0),document.removeEventListener(`click`,X,!0),document.removeEventListener(`keydown`,Z,!0),J())}async function Te(e){try{let t=H.turndown(e.outerHTML).trim();await navigator.clipboard.writeText(t),$(`Copied as Markdown`)}catch(e){console.error(`Pick & Copy: failed to copy markdown`,e),$(`Copy failed — see console`,!0)}}function $(e,t=!1){let n=document.createElement(`div`);n.style.cssText=`all: initial; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;`;let r=n.attachShadow({mode:`open`}),i=document.createElement(`div`);i.textContent=e,i.style.cssText=`
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    background: ${t?`#dc2626`:`#111827`};
    color: #fff;
    font: 500 13px/1.4 -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 8px 14px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    opacity: 0;
    transition: opacity 0.15s ease-out;
  `,r.appendChild(i),document.documentElement.appendChild(n),requestAnimationFrame(()=>{i.style.opacity=`1`}),setTimeout(()=>{i.style.opacity=`0`,setTimeout(()=>n.remove(),200)},1800)}n.default.runtime.onMessage.addListener(e=>{if(e?.type===`toggle-inspect`)return U?Q():we(),Promise.resolve({inspecting:U})});