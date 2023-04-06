
import { LightboxFactory } from '../factories/lightboxFactory.js'
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
  const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette()
  photographersHeader.appendChild(etiquetteModel)
  new LightboxFactory().navigationLightbox()
}
