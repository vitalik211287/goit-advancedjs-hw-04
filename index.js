import{S as c,i}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const u="30108062-264069135fbcff220b3f8c28b",f="https://pixabay.com/api/";function m(s){const r=new URLSearchParams({key:u,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"}),n=`${f}?${r.toString()}`;return fetch(n).then(e=>{if(!e.ok){const t=new Error(`HTTP ${e.status}`);throw t.status=e.status,t}return e.json()}).then(e=>e.hits).catch(e=>{throw console.error("❌ Fetch error:",e),e})}function p({downloads:s,comments:r,views:n,likes:e,tags:t,webformatURL:o,largeImageURL:a}){return`
    <li class="gallery-card">
     <a class="gallery-item" href="${a}">
  <img src="${o}" alt="${t}" loading="lazy" class="gallery-image" />
  </a>
      <div class="info">
    <p class="info-item">
      <b>Likes </b>
       <span class="span_text">${e}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
        <span class="span_text">${n}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
       <span class="span_text">${r}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
       <span class="span_text">${s}</span>
    </p>
  </div>
</div>
    </li>
  `}function d(s,r){if(!(r!=null&&r.length)){s.innerHTML='<li class="empty">Нічого не знайдено</li>';return}s.innerHTML=r.map(p).join(""),new c(".js-gallery .gallery-item",{captionsData:"alt",captionDelay:250}).refresh()}function g(){const s=document.getElementById("loader");s&&s.classList.remove("is-hidden")}function y(){const s=document.getElementById("loader");s&&s.classList.add("is-hidden")}const l={searchForm:document.querySelector("form.form"),queryInput:document.querySelector('form.form [name="query"]'),gallery:document.querySelector(".js-gallery")};l.searchForm.addEventListener("submit",h);function h(s){s.preventDefault();const{target:r}=s,n=r.elements.query.value.trim();if(n.length===0){i.warning({title:"Увага",message:"Введи пошуковий запит"});return}g(),m(n).then(e=>{d(l.gallery,e)}).catch(e=>{e.status===404||e.status==="404"?i.error({title:"❌ 404 Not Found",message:"Ресурс не знайдено або не існує.",position:"topRight"}):i.error({title:"⚠️ Помилка запиту",message:(e==null?void 0:e.message)||"Виникла мережева або інша помилка.",position:"topRight"})}).finally(()=>y())}
//# sourceMappingURL=index.js.map
