(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const u="https://www.themealdb.com/api/json/v1/1",m=async t=>{try{const e=await fetch(t);return e.ok?[await e.json(),null]:[null,{status:e.status,message:e.statusText}]}catch(e){return console.error(e),[null,e]}},f=async()=>{const t=`${u}/categories.php`,[e,o]=await m(t);return o?[]:e.categories},v=async t=>{const e=`${u}/filter.php?c=${t}`,[o,s]=await m(e);return s?[]:o.meals},k=async t=>{const e=`${u}/lookup.php?i=${t}`,[o,s]=await m(e);return s?{}:o.meals[0]},c=t=>{try{return JSON.parse(localStorage.getItem(t))}catch{return null}},l=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},h=async()=>{if(!c("categories")){let t=await f();l("categories",t)}return c("categories")},b=async t=>{const e=c("mealsByCategory")||{};if(!e[t]){let o=await v(t);e[t]=o,l("mealsByCategory",e)}return c("mealsByCategory")[t]},C=async t=>{const e=c("meals")||{};if(!e[t]){let o=await k(t);e[t]=o,localStorage.setItem("meals",JSON.stringify(e))}return console.log(e[t]),e[t]},i=t=>(c("bookmarks")||[]).includes(t),L=t=>{l("bookmarks",[...c("bookmarks"),t])},B=t=>{const e=c("bookmarks")||[];l("bookmarks",e.filter(o=>o!==t))},S=async()=>{var e;document.querySelector("#app").innerHTML=`
    <h1>Meal Time!</h1>
    <select id="category" name="category"></select>
    <h2>Favorites</h2>
    <div id="favorites"></div>
    <hr>
    <div id="meals"></div>
    <p id="error"></p>
    <div id='recipeOverlay' class='hidden'></div>
  `;const t=await h();t.forEach(I),d(((e=t[0])==null?void 0:e.strCategory)||"Beef"),document.querySelector("#category").addEventListener("change",o=>{d(o.target.value)})};function I(t){const e=document.createElement("option");e.value=t.strCategory,e.innerText=t.strCategory,document.querySelector("#category").append(e)}async function d(t){document.querySelector("#meals").innerHTML="",document.querySelector("#favorites").innerHTML="",(await b(t)).forEach(O)}function O({idMeal:t,strMeal:e,strMealThumb:o}){const s=document.createElement("div");s.className="mealCard",s.setAttribute("id",`meal-${t}`),s.innerHTML=`<h3>${e}</h3>`,s.addEventListener("click",()=>{E(t)});const r=document.createElement("button");r.className=`bookmarkButton ${i(t)?"bookmarked":""}`,r.innerHTML="♡",r.addEventListener("click",g=>{g.stopPropagation(),p(g,t)});const n=i(t)?"#favorites":"#meals";document.querySelector(n).append(s);const a=document.createElement("div");a.className="mealCardImageContainer",s.append(a);const y=document.createElement("img");y.src=o,a.append(r,y)}async function E(t){const e=await C(t),o=document.querySelector("#recipeOverlay");o.classList.toggle("hidden"),o.innerHTML=`
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
          <table>
            <tbody id="ingredientsList">
            </tbody>
          </table>
        </div>
      </div>
      <div id="recipeInstructionsContainer">
        <h3>Instructions</h3>
        <p id="recipeInstructions">${e.strInstructions}</p>
      </div>
    </div>
  `;const s=document.querySelector("#ingredientsList");Object.entries(e).filter(([r,n])=>n&&r.includes("strIngredient")).forEach(([r,n])=>{const a=e[r.replace("strIngredient","strMeasure")];s.innerHTML+=`<tr><td>${n}</td><td>${a}</td></tr>`}),document.querySelector("#closeOverlayButton").addEventListener("click",()=>{o.classList.toggle("hidden")}),document.querySelector("#overlayBookmarkButton").addEventListener("click",r=>p(r,t))}const p=(t,e)=>{t.target.className=`bookmarkButton ${i(e)?"":"bookmarked"}`,i(e)?B(e):L(e);const o=document.querySelector("#category").value;d(o)};S();
