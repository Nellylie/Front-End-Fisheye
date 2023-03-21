async function getPhotographers() {
    const urlJson = await fetch("./data/photographers.json");
    const photographes = await urlJson.json();
    return (photographes);
}

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photographer-section");
    
    photographer.forEach((photographe) => {
            const { name, id, city, country, tagline, price, portrait } = photographe;
            const photographerModel = new PhotographerFactory(name, id, city, country, tagline, price, portrait);
            const profilCardDOM = photographerModel.getProfilCardDOM();
            photographersSection.appendChild(profilCardDOM);
        });
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

