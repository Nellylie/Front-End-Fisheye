import { urlRecupere } from '../utils/functions.js'
import { gestionGallery, TriageDeMedias } from '../utils/tri.js'
import { modalContact } from '../utils/contactForm.js'
import { PhotographerHeaderFactory } from '../factories/PhotographerHeaderFactory.js'

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
    const photographerSelection = photographers.find((photographer) => photographer.id == paramId)
    const { name, id, city, country, tagline, price, portrait } = photographerSelection
    const photographerHeaderModel = new PhotographerHeaderFactory(name, id, city, country, tagline, price, portrait)
    const getHeadDOM = photographerHeaderModel.getProfilHeaderDOM()
    photographersHeader.appendChild(getHeadDOM)
    modalContact(name)
    console.log('origine', name, price)
    // pour les médias et leur ordre d'emplacement
    const mediasSelection = media.filter((photographer) => photographer.photographerId == paramId)
    recuperationMediaATrier(mediasSelection, price, name)
  }
}

function recuperationMediaATrier (mediaSelection, price, nameTotal) {
  let resultatTri = new TriageDeMedias(mediaSelection).triLikeDecroissant()
  gestionGallery(resultatTri, price, nameTotal)

  const selection = document.querySelector('#selection-tri')

  selection.addEventListener('change', () => {
    if (selection.options[0].selected === true) {
      if (document.querySelector('div.section__parent') !== null) {
        document.querySelector('div.section__parent').remove()
      } resultatTri = new TriageDeMedias(mediaSelection).triLikeDecroissant(); gestionGallery(resultatTri, price, nameTotal)
    }
  })

  selection.addEventListener('change', () => {
    if (selection.options[1].selected === true) {
      if (document.querySelector('div.section__parent') !== null) {
        document.querySelector('div.section__parent').remove()
      } resultatTri = new TriageDeMedias(mediaSelection).triDateDecroissant(); gestionGallery(resultatTri, price, nameTotal)
    }
  })
  selection.addEventListener('change', () => {
    if (selection.options[2].selected === true) {
      if (document.querySelector('div.section__parent') !== null) {
        document.querySelector('div.section__parent').remove()
      } resultatTri = new TriageDeMedias(mediaSelection).triAlphabetiqueCroissant(); gestionGallery(resultatTri, price, nameTotal)
    }
  })
}

async function init () {
  const { photographers, media } = await getPhotographers()
  displayData(photographers, media)
};

init()
