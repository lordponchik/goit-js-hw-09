var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");const l={formEl:document.querySelector(".form"),delayEl:document.querySelector("input[name='delay']"),stepEl:document.querySelector("input[name='step']"),amountEl:document.querySelector("input[name='amount']")};let u={};function a(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n(`✅ Fulfilled promise ${e} in ${t}ms`):o(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}l.formEl.addEventListener("submit",(e=>{e.preventDefault(),u.delay=Number(l.delayEl.value),u.step=Number(l.stepEl.value),u.amount=Number(l.amountEl.value);for(let e=1;e<=u.amount;e+=1)a(e,u.delay).then((e=>r.Notify.success(e))).catch((e=>r.Notify.failure(e))),u.delay+=u.step}));
//# sourceMappingURL=03-promises.9ab093b3.js.map
