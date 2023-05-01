import { PhotographerFactory } from '../factories/PhotographerFactory.js'

async function getPhotographers () {
  const urlJson = await fetch('./data/photographers.json')
  const photographes = await urlJson.json()
  return (photographes)
}

async function displayData (photographer) {
  const photographersSection = document.querySelector('.photographer-section')
  // pour chaque photographe une vignette est construite et ajouté au dom grace à l'objet Photographerfactory
  // et à sa méthode getProfilCardDom
  photographer.forEach((photographe) => {
    const { name, id, city, country, tagline, price, portrait } = photographe
    const photographerModel = new PhotographerFactory(name, id, city, country, tagline, price, portrait)
    const profilCardDOM = photographerModel.getProfilCardDOM()
    // ajoute dans le dom la carte que la méthode retourne
    photographersSection.appendChild(profilCardDOM)
  })
};

async function init () {
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

init()
