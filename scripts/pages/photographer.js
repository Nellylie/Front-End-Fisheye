//Mettre le code JavaScript lié à la page photographer.html
async function getPhoto() {

    const urlJson = await fetch("./data/photographers.json");
    const photographersMedia = await urlJson.json();
    let medias = photographersMedia.media;
    let photographers = photographersMedia.photographers;

   
return {medias, photographers};
}

async function displayData(photo, photographe) {
    
    const photoSection = document.querySelector(".photos_section");
    const photosMedia = photo;
    const photosPhotographe = photographe;
    const id = urlRecupere(urlLien);
    console.log("lid", id);
    const photosId = photosMedia.filter(photoId => photoId.photographerId == id);
    console.log("display", photosId);
    const photosPhotographeName = photosPhotographe.find(photosPhotographeId => photosPhotographeId.id == id);

        photosId.forEach((photoMedia)=>{
            console.log("boucle photo media", photoMedia); 
        console.log("liste photographe", photosPhotographe);
        
        console.log("photographe", photosPhotographeName);
        const photoModel = photoFactory(photoMedia, photosPhotographeName);
        const photoCardDOM = photoModel.getPhotoCardDOM();
        photoSection.appendChild(photoCardDOM);}
    );
};

async function init() {
    let photoMedia = await (await getPhoto()).medias;
    let photographers = await (await getPhoto()).photographers;
    displayData(photoMedia, photographers);
};


init();

const urlLien = window.location.href;
console.log (urlLien);

function urlRecupere(urlLien){
    let i;
    let urlId;
    for (i = urlLien.length -1; i> -1; i--){
        if (urlLien.charAt(i - 1) =="?"){
            break
        }
    }
    urlId = urlLien.substring(i, );
    return urlId;
}

