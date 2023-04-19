
import { coupePrenom, reconnaitreMp4 } from '../utils/functions.js'
// une factory pour construire les médias dans la page html pour chaque photographe
export class GalleryFactory {
  // ce sont les proprietes de chaque média qui seront construit
  constructor (id, photographerId, title, video, image, likes, date, price, name) {
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.video = video
    this.image = image
    this.likes = likes
    this.date = date
    this.price = price
    this.nameTotal = name
  }

  // la méthode construit les balises spécifiques à l'image puis à la vidéo
  getMediaDOM () {
    // récupère le prenom du nom du photographe pour écrire l'acces au dossier au nom du prenom dans l'url
    const prenom = coupePrenom(this.nameTotal)
    const urlImage = reconnaitreMp4(this.video, this.image)
    const imagePhoto = `./assets/images/${prenom}/${urlImage}`

    const figure = document.createElement('figure')
    const figCaption = document.createElement('figCaption')
    const like = document.createElement('div')
    const likeButton = document.createElement('div')
    const ensembleLike = document.createElement('div')
    const img = document.createElement('img')
    const videoBalise = document.createElement('video')
    const videoSource = document.createElement('source')

    likeButton.setAttribute('class', 'carte__likeButton')
    likeButton.setAttribute('tabindex', 0)
    figure.setAttribute('class', 'portfolio__carte')
    figure.setAttribute('tabindex', 0)
    figCaption.setAttribute('class', 'description__carte')

    // si la video est le contraire d'undefined, elle est construite
    if (this.video !== undefined) {
      videoBalise.setAttribute('class', 'carte__photo')
      videoBalise.setAttribute('width', '200px')
      videoSource.setAttribute('src', imagePhoto)
      videoBalise.setAttribute('aria-label', this.title)
      videoBalise.setAttribute('aria-description', `une video titrée : ${this.title}`)
      videoSource.setAttribute('type', 'video/mp4')
      videoBalise.appendChild(videoSource)
      // puis est rajoutée à son parent
      figure.appendChild(videoBalise)
    } else {
      // sinon il s'agit d'une image
      img.setAttribute('class', 'carte__photo')
      img.setAttribute('src', imagePhoto)
      img.setAttribute('aria-label', this.title)
      img.setAttribute('aria-description', `une photographie titrée : ${this.title}`)
      // qui est ajoutée à son parent
      figure.appendChild(img)
    }

    const h2 = document.createElement('h2')
    h2.setAttribute('class', 'carte__titre')
    like.setAttribute('class', 'carte__likes')
    ensembleLike.setAttribute('class', 'carte__ensemble-like')
    h2.textContent = this.title

    like.textContent = this.likes
    likeButton.innerHTML = "<i class='fa-regular fa-heart'></i>"
    let click = false
    // un écouteur d'evenement du click
    likeButton.addEventListener('click', () => {
      // pour que chaque click soit unique, une variable globale click change si cela est cliqué ou non.
      // ainsi les likes s'incrémentent et se désincrémentent au deuxieme click a chaque média
      (!click ? click = true : click = false)
      if (click) {
        // si click vrai, écrit directement dans le dom le nombre de like dans la balise like avec textContent et addition 1 like
        // tout en rendant le coeur remplit
        like.textContent = `${this.likes + 1}`; likeButton.innerHTML = "<i class='fa-solid fa-heart'></i>"
        document.querySelector('.etiquette__total').innerHTML = parseInt(document.querySelector('.etiquette__total').textContent) + 1 + "<i class='fa-solid fa-heart'></i>"
      } else {
        // si click faux, ecrit dans le dom le nombre de like dans la balise like avec textContent sans rien additionner
        // tout en vidant le coeur
        like.innerHTML = `${this.likes} `
        likeButton.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
        document.querySelector('.etiquette__total').innerHTML = parseInt(document.querySelector('.etiquette__total').textContent) - 1 + "<i class='fa-solid fa-heart'></i>"
      }
    })
    // écouteur d'evenement sur la touche Entrée
    likeButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.hasFocus() && document.querySelector('.carte__likeButton:focus') && document.querySelector('.portfolio__carte:focus') === null) {
        (!click ? click = true : click = false)
        if (click) {
          like.textContent = `${this.likes + 1}`; likeButton.innerHTML = "<i class='fa-solid fa-heart'></i>"
          document.querySelector('.etiquette__total').innerHTML = parseInt(document.querySelector('.etiquette__total').textContent) + 1 + "<i class='fa-solid fa-heart'></i>"
        } else {
          like.innerHTML = `${this.likes} `
          likeButton.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>"
          document.querySelector('.etiquette__total').innerHTML = parseInt(document.querySelector('.etiquette__total').textContent) - 1 + "<i class='fa-solid fa-heart'></i>"
        }
      }
    })

    ensembleLike.appendChild(like)
    ensembleLike.appendChild(likeButton)
    figCaption.appendChild(h2)
    figCaption.appendChild(ensembleLike)
    figure.appendChild(figCaption)
    // retourne la balise finale des médias, elle sera appelé dans le fichier tri.js apres l'réorganisation des données
    // selon la selection de l'utilisateur
    return (figure)
  }
}
