
import { Lightbox } from './lightbox.js'
import { GalleryFactory } from '../factories/GalleryFactory.js'
import { EtiquetteFactory } from '../factories/EtiquetteFactory.js'
import { CompteurLikes } from '../utils/functions.js'

// utilisation du .sort pour ordonner les données médias
export class TriageDeMedias {
  constructor (tableau) {
    this.tableau = tableau
  }

  triAlphabetiqueCroissant () {
    // classe par ordre alphabétique
    const tableauTri = this.tableau.sort((a, b) => {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
    })
    return tableauTri
  }

  // classe par la date la plus récente
  triDateDecroissant () {
    const tableauTri = this.tableau.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    return tableauTri
  }

  // classe par un nombre de like décroissant
  triLikeDecroissant () {
    const tableauTri = this.tableau.sort((a, b) => {
      return b.likes - a.likes
    })
    return tableauTri
  }
}
// construit la galerie avec la nouvelle organisation retourner et rendu en argument par resultatMedaSelectionTri
// lors de l'appel de la fonction gestioGallery plus tard avec la fonction recuperationMediaATrier
export function gestionGallery (resultatMediaSelectionTri, price, nameTotal) {
  const photographersHeader = document.querySelector('.photograph-header')
  const photosSection = document.querySelector('.photos__section')
  const photosParents = document.createElement('div')
  photosParents.setAttribute('class', 'section__parent')
  photosSection.appendChild(photosParents)

  // creer un tableau pour récuperer toutes les sommes de likes de chaque média
  const tableauSommeLikes = []
  // réalise une boucle dans le tableau resultatMediaSelectionTri
  resultatMediaSelectionTri.forEach((media) => {
    const { id, photographerId, title, video, image, likes, date } = media
    tableauSommeLikes.push(media.likes)
    // pour chaque media, une figure, img, legende etc est construite
    const galleryModel = new GalleryFactory(id, photographerId, title, video, image, likes, date, price, nameTotal)
    const mediaDom = galleryModel.getMediaDOM()
    photographersHeader.appendChild(mediaDom)
    // ajoute le retour de la méthode getMediaDom dans le dom, dans la balise section__parent
    photosParents.appendChild(mediaDom)
  }

  )
  // appele la fonction compteurLikes en lui mettant comme argument le tableau des likes et calcule
  // le total de chaque element
  const sommeLikes = CompteurLikes(tableauSommeLikes)
  // la construction de l'etiquette pour chaque photographe
  // il est mis ici pour récuperer le total en argument
  // verifie ci dessous si l'etiquette n'existe pas avant de l'installer
  if (document.querySelector('.etiquette') === null) {
    const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette()
    photographersHeader.appendChild(etiquetteModel)
  } else {
    document.querySelector('.etiquette').remove()
    const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette()
    photographersHeader.appendChild(etiquetteModel)
  }
  // creer un objet lightbox avec la methode navigation
  new Lightbox().navigationLightbox()
}

// déclare la fonction recuperationMediaAtrier qui est appelé dans le fichier medias.js afin de prendre en argument
// les médias à trier
export function recuperationMediaATrier (mediaSelection, price, nameTotal) {
  // déclare une variable avec le retour du tableau ordonné grace à l'objet et à la méthode trilikeDecroissant
  // et au tableau mediaSelection
  let resultatTri = new TriageDeMedias(mediaSelection).triLikeDecroissant()
  // appelle la fonction gestionGallery avec en argument le retour du tri
  gestionGallery(resultatTri, price, nameTotal)

  const selection = document.querySelector('#selection-tri')

  // ecouteur d'evenement sur l'option selectionné, s'active au changement de l'input
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
