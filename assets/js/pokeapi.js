const pokeApi = {}


function convertePokeApiDetailtoPokemon(pokeDetail){



     const pokemon = new Pokemon();
     pokemon.name = pokeDetail.name;
     pokemon.number = pokeDetail.id;
     const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name);
     const [type] = types;
     pokemon.types = types;
     pokemon.type = type;
     pokemon.abilities =  pokeDetail.abilities.map((abilities)=>abilities.ability.name);
     pokemon.status =  pokeDetail.stats.map((stats)=>{
          return {base_stat: stats.base_stat,
                  name: stats.stat.name        
          }
     });
     pokemon.photo = pokeDetail.sprites.other.home.front_default;
     
     return pokemon;

}

pokeApi.getPokemonsDetail = (pokemon)=>{
      return fetch(pokemon.url)
      .then((response) => response.json())
        .then(convertePokeApiDetailtoPokemon)
}


pokeApi.getPokemons = (offset = 0, limit=10)=>{

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   return fetch(url)
   .then((response) =>  response.json())
   .then((jsonBody) => jsonBody.results)
   .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
   .then((detailRequest)=> Promise.all(detailRequest))
   .then((pokemonDetail)=>pokemonDetail)
   .catch((err)=> console.log(err))

}