import "./styles/style.scss";
import { pokemonArray } from "./data/pokemon";
import { Pokemon } from "./data/types";

const cardContainer = document.querySelector(".card-container");

if (!cardContainer) {
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

pokemonArray.forEach(displayPokemonCard);
