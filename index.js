// get the container from the DOM
const container = document.querySelector('#container')
const singlePokemon = document.querySelector('#single-pokemon')
const getAllPokemonBtn = document.querySelector('#see-all-pokemon')
const form = document.querySelector('#form')

const onShowPokemonSuccess = (pokemon) => {

    // while there is something in the single pokemon div
    while (singlePokemon.firstChild) {
        // remove it
        singlePokemon.removeChild(singlePokemon.firstChild)
    }

    console.log(pokemon)
    container.style.display = 'none'
    const pokeDex = document.createElement('div')
    // add the class single-pokemon
    pokeDex.classList.add('single-pokemon')
    // innerHTML - insert html into our DOM
    pokeDex.innerHTML = `
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}"/>
    `
    // add single pokemon to the DOM
    singlePokemon.appendChild(pokeDex)
}

const showPokemon = (event) => {
    // getter method - getAttribute
    // set it as `data-url` I want to get it as `data-url`
    const pokeUrl = event.target.getAttribute('data-url')
    // console.log(pokeUrl)
    fetch(pokeUrl)
    .then(res => res.json())
    .then(onShowPokemonSuccess)
    .catch(console.error)
}

const onGetAllPokemonSuccess = (pokemonArray) => {
	// loop over all the pokemon
    pokemonArray.results.forEach(pokemon => {
        // create a single div for each pokemon
        const pokeCard = document.createElement('div')
	    // give that div pokemon name
        pokeCard.innerText = pokemon.name
        // add a class to each div
        pokeCard.classList.add('pokemon-card')
        // data-*
        // we can set data in our DOM elements by first starting off with data-kaleSoup
        // data-url
        // setter method - setAttribute()
        pokeCard.setAttribute('data-url', pokemon.url)
        // click event
        pokeCard.addEventListener('click', showPokemon)
        // take this pokecard and add it to the container
        container.appendChild(pokeCard)
        
    })
	
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    // returning the json response from this request
        .then(res => res.json())
        // intaking the return value from the above .then 
        // naming it res
        // this is kaleSoup
        .then(onGetAllPokemonSuccess)
        // if we have 2 params or args that needs to be passed in to a function we cannot do the above
        // .then(res => console.log(res, 'something else'))
        // handle the error
        .catch(console.error)
})

getAllPokemonBtn.addEventListener('click', () => {
	// while there is something in the single pokemon div
	while (singlePokemon.firstChild) {
		// remove it
		singlePokemon.removeChild(singlePokemon.firstChild)
	}
	container.style.display = 'flex'
})

form.addEventListener('submit', event => {
    // prevent default behavior of refresh
    // you will have to do this 99.99% of the time
    event.preventDefault()

    // can access input with their `id`s
    // console.log(input.value)
    const pokeNumber = input.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
    .then(res => res.json())
    .then(onShowPokemonSuccess)
    .catch(console.error)
})