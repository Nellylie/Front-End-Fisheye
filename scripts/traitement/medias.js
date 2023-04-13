import { urlRecupere } from '../utils/functions.js'
import { modalContact } from '../utils/contactForm.js'
import { PhotographerHeaderFactory } from '../factories/PhotographerHeaderFactory.js'
import { recuperationMediaATrier } from '../utils/tri.js'
async function getPhotographers () {
  const urlJson = await fetch('./data/photographers.json')
  const photographesMedias = await urlJson.json()

  return (photographesMedias)
}

async function displayData (photographers, media) {
  const paramId = urlRecupere(window.location.href)
  const photographersHeader = document.querySelector('.photograph-header')

  // pour l'en-tete

  if (paramId) {
    const photographerSelection = photographers.find((photographer) => photographer.id === parseInt(paramId))
    const { name, id, city, country, tagline, price, portrait } = photographerSelection
    const photographerHeaderModel = new PhotographerHeaderFactory(name, id, city, country, tagline, price, portrait)
    const getHeadDOM = photographerHeaderModel.getProfilHeaderDOM()
    photographersHeader.appendChild(getHeadDOM)
    modalContact(name)
    console.log('origine', name, price)
    // pour les médias et leur ordre d'emplacement
    const mediasSelection = media.filter((photographer) => photographer.photographerId === parseInt(paramId))
    recuperationMediaATrier(mediasSelection, price, name)
  }
}

async function init () {
  const { photographers, media } = await getPhotographers()
  displayData(photographers, media)
};

init()
