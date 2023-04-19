
// une classe pour fabriquer l'etiquette pour chaque photographe
export class EtiquetteFactory {
  // elle prend comme propriete la sommes des likes des médias et le prix par jour des photographes
  constructor (sommeLikes, price) {
    this.sommeLikes = sommeLikes
    this.price = price
  }

  getEtiquette () {
    const etiquette = document.createElement('div')
    etiquette.setAttribute('class', 'etiquette')
    const prix = document.createElement('div')
    const likeTotal = document.createElement('div')
    likeTotal.setAttribute('class', 'etiquette__total')
    likeTotal.innerHTML = `${this.sommeLikes} <i class= 'fa-solid fa-heart fa-1x'></i>`
    prix.innerHTML = `${this.price}€ / jour`

    etiquette.appendChild(likeTotal)
    etiquette.appendChild(prix)
    // retourne l'element dom créé, l'objet Etiquette est appelé dans tri.js car elle a un lien avec les likes
    // des médias qui sont comptées
    return (etiquette)
  }
}
