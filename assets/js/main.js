
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const modalTop = document.getElementById("modal-top");
const abilities =  document.getElementById("abilities");
const mais  = document.getElementById("mais");

modalTop.style.top = 0+'px';
limit = 10
offset = 0;
pokemons = [];
getPokemonsInit();


function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


function converteListatoLi(pokemon){

    pokemons.push(pokemon);
   
    return`
    <li class="pokemon ${pokemon.type}"  onclick="openModal(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" srcset="">
                </div>
                
            </li>
    `

}

const ol = document.getElementById('pokemonList');

function getPokemonsInit(){
     mais.innerHTML = 'Carregando mais.....';
    pokeApi.getPokemons(offset,limit).then(data=>{
     
   
        const novaLista = data.map((pokemons)=>{
            return converteListatoLi(pokemons)

        })

        const novoHtml = novaLista.join('');

        ol.innerHTML += novoHtml;

        offset = offset + 10;

        mais.innerHTML = '';
        
    })
}

function openModal(id) {
  
   
   

   var foundPokemons = pokemons.filter(pokemon=>pokemon.number===id);

   console.log(foundPokemons);

   var image = document.getElementById("imagepokemon");
   var title = document.getElementById("title");
   document.getElementById("hp").innerHTML = foundPokemons[0].status[0].base_stat;
   document.getElementById("attack").innerHTML = foundPokemons[0].status[1].base_stat;
   document.getElementById("defense").innerHTML = foundPokemons[0].status[2].base_stat;
   document.getElementById("special-attack").innerHTML = foundPokemons[0].status[3].base_stat;
   document.getElementById("special-defense").innerHTML = foundPokemons[0].status[4].base_stat;
   document.getElementById("speed").innerHTML = foundPokemons[0].status[5].base_stat;

  

   foundPokemons[0].abilities.map(abilit=>{
        abilities.innerHTML += abilit+', '
   });

   

   title.innerHTML = foundPokemons[0].name;
   image.src = foundPokemons[0].photo;
   modalTop.classList.add(foundPokemons[0].type)
   
    modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  }


  function closeModal(){
        abilities.innerHTML = '';
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        modalTop.classList.remove(
        'grass',
        'fire',
        'normal',
        'water',
        'bug',
        'electric',
        'ice',
        'ghost', 
        'poison',
        'ground',
        'fairy',
        'fighting',
        'psychic',
        'rock',
        'dragon',
        'steel',
        'dark')
      
  }

   

    window.addEventListener('scroll',()=>{
        console.log("scrolled", window.scrollY) //scrolled from top
        console.log(window.innerHeight) //visible part of screen
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
          getPokemonsInit();
        }
        modalTop.style.top = (window.scrollY) + "px"
    })