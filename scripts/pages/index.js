async function getPhotographers() {
    const urlJson = await fetch("./data/photographers.json");
    const photographesMedias = await urlJson.json();
    let photographers = photographesMedias.photographers;
    let medias = photographesMedias.media;

    return { photographers, medias };
}

async function displayData(photographers, medias) {

    const paramId = urlRecupere(window.location.href);
    const photographersSection = document.querySelector(".photographer_section");
    const photographersHeader = document.querySelector(".photograph-header");
    const mediasSection = document.querySelector(".photos__section");

    if (!paramId) {
        photographers.map((photographe) => {
            const { name, id, city, country, tagline, price, portrait } = photographe;
            const photographerModel = new PhotographerFactory(name, id, city, country, tagline, price, portrait);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
    else {
        const photographerSelection = photographers.find((photographer) => photographer.id == paramId);
        const { name, id, city, country, tagline, portrait } = photographerSelection;
        const photographerModel = new PhotographerFactory(name, id, city, country, tagline, portrait);
        const userHeaderDom = photographerModel.photoHeaderFactory(name, id, city, country, tagline, portrait);
        photographersHeader.appendChild(userHeaderDom);

        const mediasSelection = medias.filter(media => media.photographerId == paramId);
        
        const triMedias = TriBouton(mediasSelection);

        triMedias.map((media)=>{
            const nomIdPhotographe = photographers.find((photographer) => photographer.id == paramId);            
            const nomPhotographe = nomIdPhotographe.name;
            const {id, photographerId, title, image, likes, date, price} = media;
            const photographerModel = new PhotographerFactory(name, id, city, country, tagline, portrait);
            const userMediaDom = photographerModel.getMediaDOM(id, photographerId, title, image, likes, date, price, nomPhotographe);
            mediasSection.appendChild(userMediaDom);

        })

    }
};

async function init() {
    const { photographers, medias } = await getPhotographers();
    displayData(photographers, medias);
};

init();

