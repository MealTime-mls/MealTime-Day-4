(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const d="https://www.themealdb.com/api/json/v1/1",u=async t=>{try{return[await(await fetch(t)).json(),null]}catch(e){return[null,e]}},y=async()=>{const t=`${d}/categories.php`,[{categories:e},n]=await u(t);return[e,n]},v=async t=>{const e=`${d}/filter.php?c=${t}`,[{meals:n},o]=await u(e);return[n,o]},f=async t=>{const e=`${d}/lookup.php?i=${t}`,[{meals:[n]},o]=await u(e);return[n,o]},a=JSON.parse(localStorage.getItem("bookmarks"))||[],c=JSON.parse(localStorage.getItem("categories"))||[];JSON.parse(localStorage.getItem("meals"));const h=async()=>{if(c.length===0){console.log("fetching categories");let[t,e]=await y();e&&console.log(e),c.push(...t),localStorage.setItem("categories",JSON.stringify(c))}else console.log("using cached categories",c);return c},l=t=>a.includes(t),k=t=>{a.push(t),localStorage.setItem("bookmarks",JSON.stringify(a))},S=t=>{const e=a.indexOf(t);a.splice(e,1),localStorage.setItem("bookmarks",JSON.stringify(a))};async function b(){document.querySelector("#app").innerHTML=`
    <div>
      <h1>Meal Time!</h1>
      <select id="category" name="category"></select>
      <h2>Favorites</h2>
        <div id="favorites">
      </div>
      <hr>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `;const t=await h();t.forEach(L),m(t[0].strCategory),document.querySelector("#category").addEventListener("change",e=>{m(e.target.value)})}function L(t){const e=document.createElement("option");e.value=t.strCategory,e.innerText=t.strCategory,document.querySelector("#category").append(e)}async function m(t){document.querySelector("#meals").innerHTML="",document.querySelector("#favorites").innerHTML="";const[e]=await v(t);e.forEach($)}function $({idMeal:t,strMeal:e,strMealThumb:n}){const o=document.createElement("div");o.className="mealCard",o.setAttribute("id",`meal-${t}`),o.innerHTML=`
    <h3>${e}</h3>
    <img src="${n}">
  `,o.addEventListener("click",()=>{O(t)});const r=document.createElement("button");r.className=`bookmarkButton ${l(t)?"bookmarked":""}`,r.innerHTML="♡",r.addEventListener("click",s=>{s.stopPropagation(),p(s,t)}),l(t)?document.querySelector("#favorites").append(o):document.querySelector("#meals").append(o),o.append(r)}async function O(t){const[e]=await f(t),n=document.querySelector("#recipeOverlay");n.className="visible",n.innerHTML=`
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="overlayBookmarkButton" class="bookmarkButton ${l(t)?"bookmarked":""}">♡</button>
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
  `;let o=1,r=e[`strIngredient${o}`],s=e[`strMeasure${o}`];const i=document.querySelector("#ingredientsList");for(;r;)i.innerHTML+=`<li>${r}: <em>${s}</em></li>`,o++,r=e[`strIngredient${o}`],s=e[`strMeasure${o}`];document.querySelector("#closeOverlayButton").addEventListener("click",()=>{n.className="hidden"}),document.querySelector("#overlayBookmarkButton").addEventListener("click",g=>p(g,t))}const p=(t,e)=>{t.target.className=`bookmarkButton ${l(e)?"":"bookmarked"}`;const n=document.querySelector(`#meal-${e}`);n.remove(),l(e)?(S(e),document.querySelector("#meals").append(n)):(k(e),document.querySelector("#favorites").append(n))};b();
