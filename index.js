import{a as c,S as f,i}from"./assets/vendor-DvfmeZXB.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const m="30108062-264069135fbcff220b3f8c28b",u="https://pixabay.com/api/";function d(t){const r={key:m,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"};return c.get(u,{params:r})}function p({downloads:t,comments:r,views:a,likes:o,tags:e,webformatURL:s,largeImageURL:n}){return`
  <li class="gallery-card">
    <a class="gallery-item" href="${n}">
      <img src="${s}" alt="${e}" loading="lazy" class="gallery-image" />
    </a>
    <div class="info">
      <p class="info-item"><b>Likes</b> <span>${o}</span></p>
      <p class="info-item"><b>Views</b> <span>${a}</span></p>
      <p class="info-item"><b>Comments</b> <span>${r}</span></p>
      <p class="info-item"><b>Downloads</b> <span>${t}</span></p>
    </div>
  </li>
`}function g(t,r){if(!(r!=null&&r.length)){iziToast.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.innerHTML="";return}t.innerHTML=r.map(p).join(""),new f(".js-gallery .gallery-item",{captionsData:"alt",captionDelay:250}).refresh()}function y(){const t=document.getElementById("loader");t&&t.classList.remove("is-hidden")}function h(){const t=document.getElementById("loader");t&&t.classList.add("is-hidden")}const l={searchForm:document.querySelector("form.form"),queryInput:document.querySelector('form.form [name="query"]'),gallery:document.querySelector(".js-gallery")};l.searchForm.addEventListener("submit",b);async function b(t){t.preventDefault();const{target:r}=t,a=r.elements.query.value.trim();if(a.length===0){i.warning({title:"Увага",message:"Введи пошуковий запит"});return}l.gallery.innerHTML="",y();try{const{data:o}=await d(a);console.log(o),g(l.gallery,o.hits)}catch(o){o.status===404||o.status==="404"?i.error({title:"❌ 404 Not Found",message:"Ресурс не знайдено або не існує.",position:"topRight"}):i.error({title:"⚠️ Помилка запиту",message:(o==null?void 0:o.message)||"Виникла мережева або інша помилка.",position:"topRight"})}finally{h()}}
//# sourceMappingURL=index.js.map
