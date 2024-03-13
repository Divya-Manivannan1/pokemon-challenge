import "./styles/style.scss";
import { pokemonArray } from "./data/pokemon";
import { Pokemon } from "./data/types";

const cardContainer = document.querySelector<HTMLDivElement>(".card-container");
const searchByName = document.querySelector<HTMLInputElement>("#searchByName");
const noOfResults = document.querySelector<HTMLInputElement>("#noOfResults");

if (!cardContainer || !searchByName || !noOfResults) {
  throw new Error("Problem with the selector");
}

const displayPokemonCard = (pokemon: Pokemon): void => {
  const { id, name, types, sprite } = pokemon;
  const titleCaseName = name[0].toUpperCase() + name.slice(1);
  cardContainer.innerHTML += `<article class="card">
        <img src="${sprite}" alt="Image of ${name}" class="card__image">
        <section class="card__content">
          <h2 class="card__heading">${titleCaseName}</h2>
          <p class="card__text">${titleCaseName} (#${id}) is a ${types.join(
    " & "
  )} type pokemon.</p>
        </section>
      </article>`;
};

noOfResults.placeholder = `${pokemonArray.length}`;

pokemonArray.forEach(displayPokemonCard);

const displayFilteredCardsByName = (event: Event): void => {
  noOfResults.value = "";
  const textBox = event.currentTarget as HTMLInputElement;
  const searchTerm: string = textBox.value.toLowerCase();
  const filteredPokemons: Pokemon[] = pokemonArray.filter((pokemon): boolean =>
    pokemon.name.includes(searchTerm)
  );
  cardContainer.innerHTML = "";
  filteredPokemons.forEach(displayPokemonCard);
};

const handleNoOfResults = (event: Event): void => {
  searchByName.value = "";
  pokemonArray.forEach(displayPokemonCard);
  const noField = event.currentTarget as HTMLInputElement;
  const displayNum: number = +noField.value;
  while (cardContainer.children.length > displayNum) {
    const cardToBeRemoved = cardContainer.lastChild as HTMLElement;
    if (!cardToBeRemoved) {
      throw new Error("Problem with card container child selector");
    }
    cardContainer.removeChild(cardToBeRemoved);
  }
};

searchByName.addEventListener("input", displayFilteredCardsByName);
noOfResults.addEventListener("input", handleNoOfResults);
