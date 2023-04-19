import { urlRecupere } from '../utils/functions.js'
import { modalContact } from '../utils/contactForm.js'
import { PhotographerHeaderFactory } from '../factories/PhotographerHeaderFactory.js'
import { recuperationMediaATrier } from '../utils/tri.js'

async function getPhotographers () {
  // stock le fichier json dans la constante
  const urlJson = await fetch('./data/photographers.json')
  // forme l'objet jsonn
  const photographesMedias = await urlJson.json()

  return (photographesMedias)
}

async function displayData (photographers, media) {
  // recupere l'id de l'url de la barre d'adresse
  const paramId = urlRecupere(window.location.href)
  const photographersHeader = document.querySelector('.photograph-header')

  // pour l'en-tete

  if (paramId) {
    // si il y a une id dans la barre d'adresse, photographers.find retourne le 1er objet dont la clé du tableau
    // correspond à l'id de l'url de la barre d'adresse, cela est stocké dans photographerSelection
    const photographerSelection = photographers.find((photographer) => photographer.id === parseInt(paramId))
    // deconstructuring sur le 1er tableau retourné : les propriétés sont récupérées dans des constantes
    const { name, id, city, country, tagline, price, portrait } = photographerSelection
    // puis communiquer à l'objet factory du header
    const photographerHeaderModel = new PhotographerHeaderFactory(name, id, city, country, tagline, price, portrait)
    // une fois communiquer, la methode getprofilheaderdom construit le header et le retourne
    const getHeadDOM = photographerHeaderModel.getProfilHeaderDOM()
    // il est ajouté dans le dom html du document
    photographersHeader.appendChild(getHeadDOM)
    // la modale lance avec comme parametre la propriete du name du photographe qui correspond à l'id de notre url
    modalContact(name)
    // pour les médias et leur ordre d'emplacement, la fonction recuperationMediaATrier est lancé, elle prend
    // en parametre le tableau mediasSelection, ce dernier est retourné grace à .filter sur le tableau
    // media. Ainsi les médias retournés seront tout ceux dont le photographerId correspond
    // à l'id récupéré de l'url.
    // parseInt permet de convertir la valeur string en valeur chiffré.
    // enfin, le prix et le nom du photographe concerné y sont aussi communiqués.
    const mediasSelection = media.filter((photographer) => photographer.photographerId === parseInt(paramId))
    recuperationMediaATrier(mediasSelection, price, name)
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelector('#retour').focus()
    }
  })
}

async function init () {
  // destructuring pour stocker dans des constante le tableau photographers et média
  const { photographers, media } = await getPhotographers()
  // les communique à la fonction displayData
  displayData(photographers, media)
};
// la fonction démarre au chargement de la page
init()
