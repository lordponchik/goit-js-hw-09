var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");const u={formEl:document.querySelector(".form"),delayEl:document.querySelector("input[name='delay']"),stepEl:document.querySelector("input[name='step']"),amountEl:document.querySelector("input[name='amount']")};let a={};function l(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n(`✅ Fulfilled promise ${e} in ${t}ms`):o(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}function i(e){setTimeout((()=>{u.delayEl.value="",u.stepEl.value="",u.amountEl.value="",a={}}),e)}u.formEl.addEventListener("input",(function(e){a[e.target.name]=Number(e.target.value)})),u.formEl.addEventListener("submit",(function(e){e.preventDefault();const{delay:t,step:n,amount:o}=a;let u=t;if(t<0||n<0||o<=0)return function({delay:e,step:t,amount:n}){e<0&&r.Notify.warning("Delay must be greater than or equal to 0");t<0&&r.Notify.warning("Step must be greater than or equal to 0");n<=0&&r.Notify.warning("Amount must be greater than 0")}({delay:t,step:n,amount:o}),void i();for(let e=1;e<=o;e+=1)l(e,u).then((e=>r.Notify.success(e))).catch((e=>r.Notify.failure(e))),u+=n;i(u+n)}));
//# sourceMappingURL=03-promises.5f680edd.js.map
