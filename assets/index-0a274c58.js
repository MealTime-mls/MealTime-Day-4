(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const g="https://www.themealdb.com/api/json/v1/1",p=async e=>{try{return[await(await fetch(e)).json(),null]}catch(t){return[null,t]}},v=async()=>{const e=`${g}/categories.php`,[{categories:t},o]=await p(e);return[t,o]},h=async e=>{const t=`${g}/filter.php?c=${e}`,[{meals:o},n]=await p(t);return[o,n]},k=async e=>{const t=`${g}/lookup.php?i=${e}`,[{meals:[o]},n]=await p(t);return[o,n]},c=JSON.parse(localStorage.getItem("bookmarks"))||[],d=JSON.parse(localStorage.getItem("categories"))||[],u=JSON.parse(localStorage.getItem("mealsByCategory"))||{},m=JSON.parse(localStorage.getItem("meals"))||{},S=async()=>{if(d.length===0){let[e,t]=await v();if(t)return console.error(t),[];d.push(...e),localStorage.setItem("categories",JSON.stringify(d))}return d},b=async e=>{if(!u[e]){let[t,o]=await h(e);if(o)return console.error(o),[];u[e]=t,localStorage.setItem("mealsByCateogory",JSON.stringify(u))}return u[e]},I=async e=>{if(!m[e]){let[t,o]=await k(e);if(o)return console.error(o),{};m[e]=t,localStorage.setItem("meals",JSON.stringify(m))}return m[e]},i=e=>c.includes(e),O=e=>{c.push(e),localStorage.setItem("bookmarks",JSON.stringify(c))},C=e=>{const t=c.indexOf(e);c.splice(t,1),localStorage.setItem("bookmarks",JSON.stringify(c))};async function L(){document.querySelector("#app").innerHTML=`
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
  `;const e=await S();e.forEach(B),y(e[0].strCategory),document.querySelector("#category").addEventListener("change",t=>{y(t.target.value)})}function B(e){const t=document.createElement("option");t.value=e.strCategory,t.innerText=e.strCategory,document.querySelector("#category").append(t)}async function y(e){document.querySelector("#meals").innerHTML="",document.querySelector("#favorites").innerHTML="",(await b(e)).forEach($)}function $({idMeal:e,strMeal:t,strMealThumb:o}){const n=document.createElement("div");n.className="mealCard",n.setAttribute("id",`meal-${e}`),n.innerHTML=`
    <h3>${t}</h3>
  `,n.addEventListener("click",()=>{N(e)});const r=document.createElement("button");r.className=`bookmarkButton ${i(e)?"bookmarked":""}`,r.innerHTML="♡",r.addEventListener("click",l=>{l.stopPropagation(),f(l,e)}),i(e)?document.querySelector("#favorites").append(n):document.querySelector("#meals").append(n);const a=document.createElement("div");a.className="mealCardImageContainer",n.append(a);const s=document.createElement("img");s.src=o,a.append(r,s)}async function N(e){const t=await I(e),o=document.querySelector("#recipeOverlay");o.className="visible",o.innerHTML=`
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="overlayBookmarkButton" class="bookmarkButton ${i(e)?"bookmarked":""}">♡</button>
        </div>
      <h2 id="recipeTitle">${t.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <div id="overlayImageContainer">
          <img src="${t.strMealThumb}">
        </div>
        <div id="overlayIngredientsContainer">
          <h3>Ingredients</h3>
          <ul id="ingredientsList"></ul>
        </div>
      </div>
      <div id="recipeInstructionsContainer">
        <h3>Instructions</h3>
        <p id="recipeInstructions">${t.strInstructions}</p>
      </div>
    </div>
  `;let n=1,r=t[`strIngredient${n}`],a=t[`strMeasure${n}`];const s=document.querySelector("#ingredientsList");for(;r;)s.innerHTML+=`<li>${r}: <em>${a}</em></li>`,n++,r=t[`strIngredient${n}`],a=t[`strMeasure${n}`];document.querySelector("#closeOverlayButton").addEventListener("click",()=>{o.className="hidden"}),document.querySelector("#overlayBookmarkButton").addEventListener("click",l=>f(l,e))}const f=(e,t)=>{e.target.className=`bookmarkButton ${i(t)?"":"bookmarked"}`,document.querySelector(`#meal-${t}`),i(t)?C(t):O(t);const o=document.querySelector("#category").value;y(o)};L();
