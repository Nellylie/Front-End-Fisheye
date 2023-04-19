
export class Lightbox {
  navigationLightbox () {
    const lightboxTableau = document.querySelectorAll('.portfolio__carte')
    const photoSelection = document.querySelectorAll('.carte__photo')
    // const buttonClose = document.querySelector('.button-close')
    lightboxTableau.forEach((photo, index, parentPhoto) => {
      photo.setAttribute('id', index)
      photoSelection[index].addEventListener('click', () => {
        if (document.querySelector('div.lightbox') === null) {
          this.affichageIndividuelPhoto(index, parentPhoto)
        } else {
          document.querySelector('div.lightbox').remove()
          this.affichageIndividuelPhoto(index, parentPhoto)
        }
      })
    })

    document.addEventListener('keydown', (e) => {
      const keyCode = e.key
      if (keyCode === 'Enter' && document.hasFocus() && document.querySelector('.contact__button:focus') === null && document.querySelector('select:focus') === null) {
        let photoIndex
        if (document.querySelector('.portfolio__carte:focus') !== null) {
          photoIndex = parseInt(document.querySelector('.portfolio__carte:focus').getAttribute('id'))
        }
        if (document.querySelector('div.lightbox') === null) {
          this.affichageIndividuelPhoto(photoIndex, lightboxTableau)
        } else {
          document.querySelector('div.lightbox').remove()
          this.affichageIndividuelPhoto(photoIndex, lightboxTableau)
        }
      }
    })
  }

  affichageIndividuelPhoto (index, parentPhoto) {
    let indexPhoto = index
    const parentImageAffiche = document.createElement('div')
    parentImageAffiche.style.display = 'flex'

    const imageAffiche = document.createElement('img')
    const videoAffiche = document.createElement('video')
    const videoSource = document.createElement('source')
    videoAffiche.appendChild(videoSource)

    const buttonLeft = document.createElement('div')
    const buttonRight = document.createElement('div')
    const buttonClose = document.createElement('div')

    const figureImage = document.createElement('figure')
    const figureLegende = document.createElement('figcaption')

    figureImage.appendChild(figureLegende)

    buttonLeft.setAttribute('class', 'button-left')
    buttonRight.setAttribute('class', 'button-right')
    buttonClose.setAttribute('class', 'button-close')

    buttonLeft.innerHTML = '<i class = "fa-solid fa-angle-left fa-5x"></i>'
    buttonRight.innerHTML = '<i class = "fa-solid fa-angle-right fa-5x"></i>'
    buttonClose.innerHTML = '<i class = "fa-solid fa-xmark fa-5x"></i>'

    parentImageAffiche.setAttribute('class', 'lightbox')

    parentImageAffiche.appendChild(buttonClose)
    parentImageAffiche.appendChild(buttonLeft)
    imageAffiche.setAttribute('class', 'lightbox__image')

    const imgSrc = document.querySelectorAll('.carte__photo')
    const titrePhotoTableau = document.querySelectorAll('.carte__titre')
    const titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent

    if (imgSrc[indexPhoto].getAttribute('src') !== null) {
      videoAffiche.remove()
      imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
      imageAffiche.setAttribute('aria-label', titrePhotoContenu)
      imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
      figureImage.appendChild(imageAffiche)
    } else {
      imageAffiche.remove()
      const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
      videoSource.setAttribute('src', videoSrc)
      videoAffiche.setAttribute('aria-label', titrePhotoContenu)
      videoAffiche.setAttribute('aria-description', `une video titrée : ${titrePhotoContenu}`)
      videoAffiche.setAttribute('controls', true)
      videoAffiche.setAttribute('width', '800px')
      videoSource.setAttribute('type', 'video/mp4')
      figureImage.appendChild(videoAffiche)
    }

    buttonClose.addEventListener('click', () => {
      document.querySelector('div.lightbox').style.display = 'none'
    })

    buttonRight.addEventListener('click', () => {
      if (indexPhoto < parentPhoto.length - 1) { indexPhoto++ } else { indexPhoto = -1; indexPhoto++ }
      this.suivanteImage(indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende)
    })

    buttonLeft.addEventListener('click', () => {
      if (indexPhoto > 0) { indexPhoto-- } else { indexPhoto = parentPhoto.length; indexPhoto-- }
      this.precedenteImage(indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende)
    })

    document.addEventListener('keydown', (e) => {
      const keyCode = e.key
      if (keyCode === 'ArrowRight') {
        if (indexPhoto < parentPhoto.length - 1) { indexPhoto++ } else { indexPhoto = -1; indexPhoto++ }
        this.suivanteImage(indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende)
      } else if (keyCode === 'ArrowLeft') {
        if (indexPhoto > 0) { indexPhoto-- } else { indexPhoto = parentPhoto.length; indexPhoto-- }
        this.precedenteImage(indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende)
      } else if (keyCode === 'Escape' && document.hasFocus()) {
        document.querySelector('div.lightbox').style.display = 'none'
        document.querySelector('#header-principal').focus()
      }
    })

    figureLegende.textContent = titrePhotoContenu
    parentImageAffiche.appendChild(figureImage)
    parentImageAffiche.appendChild(buttonRight)
    document.querySelector('.photos__section').appendChild(parentImageAffiche)
  }

  precedenteImage (indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende) {
    const imgSrc = document.querySelectorAll('.carte__photo')
    titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
    figureLegende.textContent = titrePhotoContenu
    figureLegende.setAttribute('tabindex', '0')
    figureLegende.focus()
    if (imgSrc[indexPhoto].getAttribute('src') !== null) {
      videoAffiche.remove()
      imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
      imageAffiche.setAttribute('aria-label', titrePhotoContenu)
      imageAffiche.setAttribute('aria-description', `une photographie titrée : ${titrePhotoContenu}`)
      figureImage.appendChild(imageAffiche)
    } else {
      imageAffiche.remove()
      const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
      videoSource.setAttribute('src', videoSrc)
      videoAffiche.setAttribute('aria-label', titrePhotoContenu)
      videoAffiche.setAttribute('aria-description', `une video titrée : ${titrePhotoContenu}`)
      videoAffiche.setAttribute('controls', true)
      videoAffiche.setAttribute('width', '800px')
      videoSource.setAttribute('type', 'video/mp4')
      figureImage.appendChild(videoAffiche)
    }
  }

  suivanteImage (indexPhoto, videoAffiche, imageAffiche, figureImage, videoSource, titrePhotoContenu, titrePhotoTableau, figureLegende) {
    const imgSrc = document.querySelectorAll('.carte__photo')
    titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
    figureLegende.textContent = titrePhotoContenu
    figureLegende.setAttribute('tabindex', '0')
    figureLegende.focus()
    if (imgSrc[indexPhoto].getAttribute('src') !== null) {
      videoAffiche.remove()
      imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
      imageAffiche.setAttribute('aria-label', titrePhotoContenu)
      imageAffiche.setAttribute('aria-description', `une photographie titrée : ${titrePhotoContenu}`)
      figureImage.appendChild(imageAffiche)
    } else {
      imageAffiche.remove()
      const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
      videoSource.setAttribute('src', videoSrc)
      videoAffiche.setAttribute('aria-label', titrePhotoContenu)
      videoAffiche.setAttribute('aria-description', `une video titrée : ${titrePhotoContenu}`)
      videoAffiche.setAttribute('controls', true)
      videoAffiche.setAttribute('width', '800px')
      videoSource.setAttribute('type', 'video/mp4')
      figureImage.appendChild(videoAffiche)
    }
  }
}
