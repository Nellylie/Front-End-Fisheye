import { displayModal } from '../utils/contactForm.js'
// factory pour construire le header de chaque photographe
export class PhotographerHeaderFactory {
  constructor (name, id, city, country, tagline, price, portrait) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
  }

  getProfilHeaderDOM () {
    const picture = `./assets/photographers/photographers-id/${this.portrait}`
    const header = document.createElement('div')
    const imgParent = document.createElement('div')
    const img = document.createElement('img')
    const parentImage = document.createElement('div')
    const description = document.createElement('div')
    const slogan = document.createElement('div')
    const localisation = document.createElement('div')
    const price = document.createElement('div')
    const h1 = document.createElement('h1')
    const contact = document.createElement('button')

    contact.setAttribute('class', 'contact__button')
    header.setAttribute('class', 'header')
    imgParent.setAttribute('class', 'imgAvatar')
    img.setAttribute('class', 'imgAvatar')
    img.setAttribute('alt', this.name)
    parentImage.setAttribute('class', 'header__parent-image')
    description.setAttribute('class', 'header__description')
    slogan.setAttribute('class', 'header-description__slogan')
    localisation.setAttribute('class', 'header-description__localisation')
    h1.setAttribute('class', 'header-description__name')

    img.setAttribute('src', `${picture}`)

    contact.textContent = 'Contactez-moi'
    // gère l'affichage de la modale au click
    contact.addEventListener('click', () => {
      displayModal()
      document.getElementById('input-3').focus()
    })
    h1.textContent = this.name
    localisation.textContent = `${this.city}, ${this.country}`
    slogan.textContent = `${this.tagline}`

    description.appendChild(h1)
    description.appendChild(localisation)
    description.appendChild(slogan)
    description.appendChild(price)

    parentImage.appendChild(img)
    header.appendChild(description)
    header.appendChild(contact)
    header.appendChild(parentImage)

    // retourne la balise finale, l'objet est créé dans le fichier medias.js
    return (header)
  }
}
