(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const g="https://www.themealdb.com/api/json/v1/1",y=async e=>{try{return[await(await fetch(e)).json(),null]}catch(t){return[null,t]}},v=async()=>{const e=`${g}/categories.php`,[{categories:t},r]=await y(e);return[t,r]},h=async e=>{const t=`${g}/filter.php?c=${e}`,[{meals:r},n]=await y(t);return[r,n]},k=async e=>{const t=`${g}/lookup.php?i=${e}`,[{meals:[r]},n]=await y(t);return[r,n]},c=JSON.parse(localStorage.getItem("bookmarks"))||[],u=JSON.parse(localStorage.getItem("categories"))||[],m=JSON.parse(localStorage.getItem("mealsByCategory"))||{},i=JSON.parse(localStorage.getItem("meals"))||{},S=async()=>{if(u.length===0){let[e,t]=await v();if(t)return console.log(t),[];u.push(...e),localStorage.setItem("categories",JSON.stringify(u))}return u},b=async e=>{if(!m[e]){let[t,r]=await h(e);if(r)return console.log(r),[];m[e]=t,localStorage.setItem("mealsByCateogory",JSON.stringify(m))}return m[e]},I=async e=>{if(i[e])console.log("using cached meal",i[e]);else{console.log("fetching meal");let[t,r]=await k(e);if(r)return console.log(r),{};i[e]=t,localStorage.setItem("meals",JSON.stringify(i))}return i[e]},l=e=>c.includes(e),O=e=>{c.push(e),localStorage.setItem("bookmarks",JSON.stringify(c))},C=e=>{const t=c.indexOf(e);c.splice(t,1),localStorage.setItem("bookmarks",JSON.stringify(c))};async function L(){document.querySelector("#app").innerHTML=`
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
  `;const e=await S();e.forEach(B),p(e[0].strCategory),document.querySelector("#category").addEventListener("change",t=>{p(t.target.value)})}function B(e){const t=document.createElement("option");t.value=e.strCategory,t.innerText=e.strCategory,document.querySelector("#category").append(t)}async function p(e){document.querySelector("#meals").innerHTML="",document.querySelector("#favorites").innerHTML="",(await b(e)).forEach($)}function $({idMeal:e,strMeal:t,strMealThumb:r}){const n=document.createElement("div");n.className="mealCard",n.setAttribute("id",`meal-${e}`),n.innerHTML=`
    <h3>${t}</h3>
  `,n.addEventListener("click",()=>{N(e)});const o=document.createElement("button");o.className=`bookmarkButton ${l(e)?"bookmarked":""}`,o.innerHTML="♡",o.addEventListener("click",d=>{d.stopPropagation(),f(d,e)}),l(e)?document.querySelector("#favorites").append(n):document.querySelector("#meals").append(n);const a=document.createElement("div");a.className="mealCardImageContainer",n.append(a);const s=document.createElement("img");s.src=r,a.append(o,s)}async function N(e){const t=await I(e),r=document.querySelector("#recipeOverlay");r.className="visible",r.innerHTML=`
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="overlayBookmarkButton" class="bookmarkButton ${l(e)?"bookmarked":""}">♡</button>
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
  `;let n=1,o=t[`strIngredient${n}`],a=t[`strMeasure${n}`];const s=document.querySelector("#ingredientsList");for(;o;)s.innerHTML+=`<li>${o}: <em>${a}</em></li>`,n++,o=t[`strIngredient${n}`],a=t[`strMeasure${n}`];document.querySelector("#closeOverlayButton").addEventListener("click",()=>{r.className="hidden"}),document.querySelector("#overlayBookmarkButton").addEventListener("click",d=>f(d,e))}const f=(e,t)=>{e.target.className=`bookmarkButton ${l(t)?"":"bookmarked"}`;const r=document.querySelector(`#meal-${t}`);r.remove(),l(t)?(C(t),document.querySelector("#meals").append(r)):(O(t),document.querySelector("#favorites").append(r))};L();
