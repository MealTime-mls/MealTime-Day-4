(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const m="https://www.themealdb.com/api/json/v1/1",y=async t=>{try{const e=await fetch(t);return e.ok?[await e.json(),null]:[null,{status:e.status,message:e.statusText}]}catch(e){return console.error(e),[null,e]}},v=async()=>{const t=`${m}/categories.php`,[e,r]=await y(t);return r?[]:e.categories},f=async t=>{const e=`${m}/filter.php?c=${t}`,[r,n]=await y(e);return n?[]:r.meals},k=async t=>{const e=`${m}/lookup.php?i=${t}`,[r,n]=await y(e);return n?{}:r.meals[0]},c=t=>{try{return JSON.parse(localStorage.getItem(t))}catch{return null}},d=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},h=async()=>{if(!c("categories")){let t=await v();d("categories",t)}return c("categories")},b=async t=>{const e=c("mealsByCategory")||{};if(!e[t]){let r=await f(t);e[t]=r,d("mealsByCategory",e)}return c("mealsByCategory")[t]},C=async t=>{const e=c("meals")||{};if(!e[t]){let r=await k(t);e[t]=r,localStorage.setItem("meals",JSON.stringify(e))}return console.log(e[t]),e[t]},i=t=>(c("bookmarks")||[]).includes(t),L=t=>{d("bookmarks",[...c("bookmarks"),t])},B=t=>{const e=c("bookmarks")||[];d("bookmarks",e.filter(r=>r!==t))},S=async()=>{var e;document.querySelector("#app").innerHTML=`
    <h1>Meal Time!</h1>
    <select id="category" name="category"></select>
    <h2>Favorites</h2>
    <div id="favorites"></div>
    <hr>
    <div id="meals"></div>
    <p id="error"></p>
    <div id='recipeOverlay' class='hidden'></div>
  `;const t=await h();t.forEach(I),u(((e=t[0])==null?void 0:e.strCategory)||"Beef"),document.querySelector("#category").addEventListener("change",r=>{u(r.target.value)})};function I(t){const e=document.createElement("option");e.value=t.strCategory,e.innerText=t.strCategory,document.querySelector("#category").append(e)}async function u(t){document.querySelector("#meals").innerHTML="",document.querySelector("#favorites").innerHTML="",(await b(t)).forEach($)}function $({idMeal:t,strMeal:e,strMealThumb:r}){const n=document.createElement("div");n.className="mealCard",n.setAttribute("id",`meal-${t}`),n.innerHTML=`<h3>${e}</h3>`,n.addEventListener("click",()=>{w(t)});const o=document.createElement("button");o.className=`bookmarkButton ${i(t)?"bookmarked":""}`,o.innerHTML="♡",o.addEventListener("click",g=>{g.stopPropagation(),p(g,t)});const s=i(t)?"#favorites":"#meals";document.querySelector(s).append(n);const a=document.createElement("div");a.className="mealCardImageContainer",n.append(a);const l=document.createElement("img");l.src=r,a.append(o,l)}async function w(t){const e=await C(t),r=document.querySelector("#recipeOverlay");r.classList.toggle("hidden"),r.innerHTML=`
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="overlayBookmarkButton" class="bookmarkButton ${i(t)?"bookmarked":""}">♡</button>
        </div>
      <h2 id="recipeTitle">${e.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <div id="overlayImageContainer">
          <img src="${e.strMealThumb}">
        </div>
        <div id="overlayIngredientsContainer">
          <h3>Ingredients</h3>
          <ul id="ingredientsList"></ul>
        </div>
      </div>
      <div id="recipeInstructionsContainer">
        <h3>Instructions</h3>
        <p id="recipeInstructions">${e.strInstructions}</p>
      </div>
    </div>
  `;let n=1,o=e[`strIngredient${n}`],s=e[`strMeasure${n}`];const a=document.querySelector("#ingredientsList");for(;o;)a.innerHTML+=`<li>${o}: <em>${s}</em></li>`,n++,o=e[`strIngredient${n}`],s=e[`strMeasure${n}`];document.querySelector("#closeOverlayButton").addEventListener("click",()=>{r.classList.toggle("hidden")}),document.querySelector("#overlayBookmarkButton").addEventListener("click",l=>p(l,t))}const p=(t,e)=>{t.target.className=`bookmarkButton ${i(e)?"":"bookmarked"}`,i(e)?B(e):L(e);const r=document.querySelector("#category").value;u(r)};S();
