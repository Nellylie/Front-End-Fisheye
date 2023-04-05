
class PhotographerFactory {
  constructor (name, id, city, country, tagline, price, portrait) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
  }

  getProfilCardDOM () {
    const picture = `./assets/photographers/photographers-id/${this.portrait}`

    const card = document.createElement('figure')
    const aLien = document.createElement('a')
    const img = document.createElement('img')
    const parentImage = document.createElement('div')
    const description = document.createElement('figcaption')
    const slogan = document.createElement('div')
    const localisation = document.createElement('div')
    const price = document.createElement('div')
    const h2 = document.createElement('h2')

    card.setAttribute('class', 'card')
    aLien.setAttribute('class', 'imgAvatar')
    img.setAttribute('class', 'imgAvatar')
    parentImage.setAttribute('class', 'parent-image')
    description.setAttribute('class', 'card__description')
    slogan.setAttribute('class', 'description__slogan')
    localisation.setAttribute('class', 'description__localisation')
    price.setAttribute('class', 'description__price')
    h2.setAttribute('class', 'description__name')

    img.setAttribute('src', `${picture}`)
    aLien.setAttribute('href', `./photographer.html?id=${this.id}`)

    h2.textContent = this.name
    localisation.textContent = `${this.city}, ${this.country}`
    slogan.textContent = `${this.tagline}`
    price.textContent = `${this.price}€/jour`

    description.appendChild(h2)
    description.appendChild(localisation)
    description.appendChild(slogan)
    description.appendChild(price)

    parentImage.appendChild(img)
    aLien.appendChild(parentImage)
    card.appendChild(aLien)
    card.appendChild(description)
    return card
  }
}
