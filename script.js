let textinput=document.getElementById('text-input');
let searchresults = document.getElementById('search-results');
let favoriteButtons;
let heros=[];
let favoriteheros=[];
const homebtn = document.getElementById('home');
const favbtn = document.getElementById('fav');
const homepage = document.getElementById('homepage');
const favpage = document.getElementById('favoritespage');
const cardlist = document.getElementById('cardlist');
const texthome = document.getElementById('text-home');
const textfav = document.getElementById('text-fav');
const iconhome = document.getElementById('icon-home');
const iconfav = document.getElementById('icon-fav');
const mainimage = document.getElementById('mainimage');
const cover = document.getElementById('cover');



homebtn.addEventListener('click',function(){
    homepage.style.display='block';
    favpage.style.display='none';
    texthome.className="active";
    textfav.className="";
    iconhome.className="material-symbols-outlined active";
    iconfav.className="material-symbols-outlined";
    textinput.value='';
    heros=[];
    renderList();
})

favbtn.addEventListener('click',function(){
  homepage.style.display='none';
  favpage.style.display='block';
  textfav.className="active";
  texthome.className="";
  iconhome.className="material-symbols-outlined";
  iconfav.className="material-symbols-outlined active";
  
  rendercards();
})
textinput.addEventListener('keyup',function(e){
  let str = e.target.value;
 let alpha = textinput.value;
  if(alpha==""){
   
   searchresults.className="";
   mainimage.style.display="block";
    heros=[];
    renderList();
  }else{
    mainimage.style.display="none";
   searchresults.className="heightincrese";
  
  const API_ENDPOINT = 'https://akabab.github.io/superhero-api/api/all.json';

  // Fetch names from API
  fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(users => {
      // Define search function
     
      function searchNames(query) {
       
        // users.filter(user => (user.name).toLowerCase().includes(query.toLowerCase()))
        return users.filter(user => (user.name).toLowerCase().includes(query.toLowerCase()));
      }
      // Get user input and call search function
      
      heros = searchNames(str);
      renderList();
      // Print search results
      // console.log('Search results:');
      // results.forEach(result => console.log(result));
    });
  }
  
  })

  function renderList(){
    searchresults.innerHTML='';
    for( let i in heros){
      changeList(heros[i]);
    }
   
    
  }
  
  function changeList(hero){
   
    const resultElement = document.createElement("div");
    let text;
    if(checkfavorites(hero.id)){
      text="Remove from favorites";
    }else{
      text="Add to Favorites";
    }
   
    resultElement.setAttribute("class", "result");
    // <img src=${"icons\superman.jpg"} alt="loading" id=${hero.id} ></img>
    resultElement.innerHTML=`
    <img src=${hero.images.lg} alt="loading" id=${hero.id} ></img>
    <span >${hero.name}</span>
    <button class="card-button fav-button"  data-id=${hero.id}> ${text}</button>
    `;
    
    searchresults.append(resultElement);

  }

 

   document.addEventListener('click',function(e){
    let target = e.target;
    let parent = target.parentNode;
   // console.log(parent);
    if(target.className === 'card-button fav-button'){
        let  task_id = target.getAttribute('data-id');
        const currentText = target.textContent.trim();
        if (currentText === "Add to Favorites") {
          addtofavorites(task_id);
         target.textContent = "Remove from Favorites";
        } else {
          removefromfavorites(task_id);
          target.textContent = "Add to Favorites";
        }
      

    }
    else if(target.className === 'nowinput'){

    }else if(target.className==='material-symbols-outlined closebtn'){
      
      cover.style.display="none";
    }
    else{
     textinput.value="";
      heros=[];
      renderList();
      
      if((parent.className === 'card') || (parent.className === 'card-body')){
        cover.style.display="block";
        cover.innerHTML="";
        window.scrollTo(0,0);
      //  cover.style.position="fixed";
        openDetails(target.getAttribute('data-id'));
      }
    }
   });
   function openDetails(heroid){
    favoriteheros=JSON.parse(localStorage.getItem("favoriteheros"));
    if(favoriteheros === null){
      return;
    }
    let ele = favoriteheros.filter(char=>{
      return char.id === parseInt(heroid,10);
    })
    createPage(ele[0]);
   }
   function createPage(hero){
    
    let divElement = document.createElement("div");

    divElement.innerHTML=`
    <button ><span class="material-symbols-outlined closebtn">
              close
              </span></button>
            <div class="details">
              <img src=${hero.images.lg} alt="Image">
              <div id="mname"> ${hero.name} </div>
              <div class="mdetails">
                <div class="thing" id="biography">
                  <span class="head" style="padding-left: 80px;"> <b>Biography</b> </span>
                  <span><b>FullName:</b> <span>${hero.biography.fullName}</span></span>
                  <span><b>PlaceOfBirth:</b> <span>${hero.biography.placeOfBirth}</span> </span>
                  <span> <b>FirstAppearance:</b> <span>${hero.biography.firstAppearance}</span> </span>
                  <span> <b>Publisher:</b> <span>${hero.biography.publisher}</span> </span>
                </div>
                <div class="thing">
                  <span class="head" ><b>Appearance</b></span>
                  <span><b>Gender:</b> <span>${hero.appearance.gender}</span></span>
                  <span><b>Race:</b> <span>${hero.appearance.race}</span> </span>
                  <span> <b>Height:</b> <span>${hero.appearance.height[1]}</span> </span>
                  <span><b>Weight:</b> <span>${hero.appearance.weight[1]}</span> </span>
                  <span> <b>EyeColor:</b> <span>${hero.appearance.eyeColor}</span> </span>
                  <span><b>HairColor:</b> <span>${hero.appearance.hairColor}</span> </span>
                </div>
                <div class="thing" style="border: none;">
                  <span class="head"><b>PowerStats</b></span>
                  <span><b>Intelligence:</b> <span>${hero.powerstats.intelligence}</span></span>
                  <span><b>Strength:</b> <span>${hero.powerstats.strength}</span> </span>
                  <span><b>Speed:</b>  <span>${hero.powerstats.speed}</span> </span>
                  <span><b>Durability:</b> <span>${hero.powerstats.durability}</span> </span>
                  <span><b>Power:</b>  <span>${hero.powerstats.power}</span> </span>
                  <span><b>Combat:</b> <span>${hero.powerstats.combat}</span> </span>
                </div>
              </div>
              
  
            </div>
    `
    cover.append(divElement);
   }

   function checkfavorites(hero_id){
    favoriteheros=JSON.parse(localStorage.getItem("favoriteheros"));
    if(favoriteheros=== null){
      return false;
    }
    let ele = favoriteheros.filter(char=>{
      return char.id === parseInt(hero_id,10);
    })
    if(ele.length==0){
      return false;
    }else{
     return true;
    }

   }

function addtofavorites(task_id){
  let ele = heros.filter(char=>{
    return char.id === parseInt(task_id,10);
  })
  favoriteheros.push(ele[0]);
  let favoritehero_serialized=JSON.stringify(favoriteheros);
  localStorage.setItem("favoriteheros",favoritehero_serialized);
 // console.log(favoriteheros);
}
function removefromfavorites(task_id){
  favoriteheros=JSON.parse(localStorage.getItem("favoriteheros"));
  if(favoriteheros === null){
    return;
  }
  let ele = favoriteheros.filter(char=>{
    return char.id !== parseInt(task_id,10);
  })
  
   favoriteheros=ele;
   let favoritehero_serialized=JSON.stringify(favoriteheros);
   localStorage.setItem("favoriteheros",favoritehero_serialized);
   rendercards();
  //console.log(favoriteheros);
  
}
function rendercards(){
  cardlist.innerHTML='';
  favoriteheros=JSON.parse(localStorage.getItem("favoriteheros"));
  if(favoriteheros === null){
    return;
  }
  for(let i=0;i<favoriteheros.length;i++){
    addcard(favoriteheros[i]);
  }
}
function addcard(favoritehero){
  const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "card");
    cardElement.innerHTML=`
     
          <img src=${favoritehero.images.lg} data-id=${favoritehero.id} alt="Image">
            <div class="card-body">
              <h3 class="card-title" data-id=${favoritehero.id}>${favoritehero.name}</h3>
              <p class="card-text" data-id=${favoritehero.id}>${favoritehero.biography.fullName} <span>${favoritehero.id}</span></p>
              <button class="card-button fav-button" data-id="${favoritehero.id}">Remove from favorites</button>
            </div>
    `;

    cardlist.append(cardElement);

}


