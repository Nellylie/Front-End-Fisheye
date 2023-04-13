
import { Lightbox } from './lightbox.js'
import { GalleryFactory } from '../factories/GalleryFactory.js'
import { EtiquetteFactory } from '../factories/EtiquetteFactory.js'
import { CompteurLikes } from '../utils/functions.js'

export class TriageDeMedias {
  constructor (tableau) {
    this.tableau = tableau
  }

  triAlphabetiqueCroissant () {
    const tableauTri = this.tableau.sort((a, b) => {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
    })
    return tableauTri
  }

  triDateDecroissant () {
    const tableauTri = this.tableau.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    return tableauTri
  }

  triLikeDecroissant () {
    const tableauTri = this.tableau.sort((a, b) => {
      return b.likes - a.likes
    })
    return tableauTri
  }
}

export function gestionGallery (resultatMediaSelectionTri, price, nameTotal) {
  const photographersHeader = document.querySelector('.photograph-header')
  const photosSection = document.querySelector('.photos__section')
  const photosParents = document.createElement('div')
  photosParents.setAttribute('class', 'section__parent')
  photosSection.appendChild(photosParents)

  const tableauSommeLikes = []
  resultatMediaSelectionTri.forEach((media) => {
    const { id, photographerId, title, video, image, likes, date } = media
    tableauSommeLikes.push(media.likes)
    const galleryModel = new GalleryFactory(id, photographerId, title, video, image, likes, date, price, nameTotal)
    const mediaDom = galleryModel.getMediaDOM()
    photographersHeader.appendChild(mediaDom)
    photosParents.appendChild(mediaDom)
  }

  )
  const sommeLikes = CompteurLikes(tableauSommeLikes)
  if (document.querySelector('.etiquette') === null) {
    const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette()
    photographersHeader.appendChild(etiquetteModel)
  } else {
    document.querySelector('.etiquette').remove()
    const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette()
    photographersHeader.appendChild(etiquetteModel)
  }
  new Lightbox().navigationLightbox()
}

export function recuperationMediaATrier (mediaSelection, price, nameTotal) {
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
