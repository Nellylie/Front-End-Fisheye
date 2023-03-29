class EtiquetteFactory {
    constructor(sommeLikes, price) {
        this.sommeLikes = sommeLikes;
        this.price = price;

    }


    getEtiquette() {
        const etiquette = document.createElement("div");
        etiquette.setAttribute("class", "etiquette");
        const prix = document.createElement("div");
        const likeTotal = document.createElement("div");

        likeTotal.innerHTML = `${this.sommeLikes} <i class= 'fa-solid fa-heart fa-1x'></i>`;
        prix.innerHTML = `${this.price}€ / jour`;

        etiquette.appendChild(likeTotal);
        etiquette.appendChild(prix);

        return (etiquette);
    }
}