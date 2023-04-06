export class LightboxFactory {
  navigationLightbox () {
    const lightboxTableau = document.querySelectorAll('.portfolio__carte')
    const photoSelection = document.querySelectorAll('.carte__photo')
    // const buttonClose = document.querySelector('.button-close')
    lightboxTableau.forEach((photo, index, parentPhoto) => {
      photo.setAttribute('tabindex', index + 1)

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
      if (keyCode === 'Enter' && document.hasFocus()) {
        const photoIndex = document.querySelector('.portfolio__carte:focus').getAttribute('tabindex')
        if (document.querySelector('div.lightbox') === null) {
          this.affichageIndividuelPhoto(photoIndex - 1, lightboxTableau)
        } else {
          document.querySelector('div.lightbox').remove()
          this.affichageIndividuelPhoto(photoIndex - 1, lightboxTableau)
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
    if (imgSrc[indexPhoto].getAttribute('src') !== null) {
      videoAffiche.remove()
      imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
      figureImage.appendChild(imageAffiche)
    } else {
      imageAffiche.remove()
      const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
      videoSource.setAttribute('src', videoSrc)
      videoAffiche.setAttribute('controls', true)
      videoAffiche.setAttribute('width', '800px')
      videoSource.setAttribute('type', 'video/mp4')
      figureImage.appendChild(videoAffiche)
    }

    const titrePhotoTableau = document.querySelectorAll('.carte__titre')
    let titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent

    buttonClose.addEventListener('click', () => {
      document.querySelector('div.lightbox').style.display = 'none'
    })

    buttonLeft.addEventListener('click', () => {
      if (indexPhoto < 0) { indexPhoto = parentPhoto.length } else { indexPhoto -= 1 }
      const imgSrc = document.querySelectorAll('.carte__photo')
      if (imgSrc[indexPhoto].getAttribute('src') !== null) {
        videoAffiche.remove()
        imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
        figureImage.appendChild(imageAffiche)
      } else {
        imageAffiche.remove()
        const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
        videoSource.setAttribute('src', videoSrc)
        videoAffiche.setAttribute('controls', true)
        videoAffiche.setAttribute('width', '800px')
        videoSource.setAttribute('type', 'video/mp4')
        figureImage.appendChild(videoAffiche)
      }

      titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
      figureLegende.textContent = titrePhotoContenu
    })
    buttonRight.addEventListener('click', () => {
      if (indexPhoto > parentPhoto.length) { indexPhoto = 0 } else { indexPhoto += 1 }
      const imgSrc = document.querySelectorAll('.carte__photo')
      if (imgSrc[indexPhoto].getAttribute('src') !== null) {
        videoAffiche.remove()
        imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
        figureImage.appendChild(imageAffiche)
      } else {
        imageAffiche.remove()
        const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
        videoSource.setAttribute('src', videoSrc)
        videoAffiche.setAttribute('controls', true)
        videoAffiche.setAttribute('width', '800px')
        videoSource.setAttribute('type', 'video/mp4')
        figureImage.appendChild(videoAffiche)
      }

      titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
      figureLegende.textContent = titrePhotoContenu
    })

    document.addEventListener('keydown', (e) => {
      const keyCode = e.key
      if (keyCode === 'ArrowRight') {
        if (indexPhoto > parentPhoto.length) { indexPhoto = 0 } else { indexPhoto += 1 }
        const imgSrc = document.querySelectorAll('.carte__photo')
        if (imgSrc[indexPhoto].getAttribute('src') !== null) {
          videoAffiche.remove()
          imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
          figureImage.appendChild(imageAffiche)
        } else {
          imageAffiche.remove()
          const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
          videoSource.setAttribute('src', videoSrc)
          videoAffiche.setAttribute('controls', true)
          videoAffiche.setAttribute('width', '800px')
          videoSource.setAttribute('type', 'video/mp4')
          figureImage.appendChild(videoAffiche)
        }

        titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
        figureLegende.textContent = titrePhotoContenu
      } else if (keyCode === 'ArrowLeft') {
        if (indexPhoto < 0) { indexPhoto = parentPhoto.length } else { indexPhoto -= 1 }
        const imgSrc = document.querySelectorAll('.carte__photo')
        if (imgSrc[indexPhoto].getAttribute('src') !== null) {
          videoAffiche.remove()
          imageAffiche.setAttribute('src', imgSrc[indexPhoto].getAttribute('src'))
          figureImage.appendChild(imageAffiche)
        } else {
          imageAffiche.remove()
          const videoSrc = imgSrc[indexPhoto].querySelector('source').getAttribute('src')
          videoSource.setAttribute('src', videoSrc)
          videoAffiche.setAttribute('controls', true)
          videoAffiche.setAttribute('width', '800px')
          videoSource.setAttribute('type', 'video/mp4')
          figureImage.appendChild(videoAffiche)
        }

        titrePhotoContenu = titrePhotoTableau[indexPhoto].textContent
        figureLegende.textContent = titrePhotoContenu
      } else if (keyCode === 'Escape') {
        document.querySelector('div.lightbox').style.display = 'none'
      }
    })

    figureLegende.textContent = titrePhotoContenu
    parentImageAffiche.appendChild(figureImage)
    parentImageAffiche.appendChild(buttonRight)
    document.querySelector('.photos__section').appendChild(parentImageAffiche)
  }
}
