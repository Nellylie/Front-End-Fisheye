async function getPhotographers() {
    const urlJson = await fetch("./data/photographers.json");
    const photographesMedias = await urlJson.json();

    return (photographesMedias);
}

async function displayData(photographers, media) {

    const paramId = urlRecupere(window.location.href);
    const photographersHeader = document.querySelector(".photograph-header");
    const photosSection = document.querySelector(".photos__section");


    // pour l'en-tete

    if (paramId) {
        const photographerSelection = photographers.find((photographer) => photographer.id == paramId);
        const { name, id, city, country, tagline, price, portrait } = photographerSelection;
        const photographerHeaderModel = new PhotographerHeaderFactory(name, id, city, country, tagline, price, portrait);
        const getHeadDOM = photographerHeaderModel.getProfilHeaderDOM();
        photographersHeader.appendChild(getHeadDOM);

        //pour les médias et leur ordre d'emplacement
        const mediasSelection = media.filter((photographer) => photographer.photographerId == paramId);
        recuperationMediaATrier(mediasSelection);



        function triage(resultatMediaSelectionTri) {

            

            let photosParents = document.createElement("div");
            photosParents.setAttribute("class", "section__parent");
            let tableauSommeLikes = [];
            resultatMediaSelectionTri.map((media) => {
                const { id, photographerId, title, video, image, likes, date } = media;
                tableauSommeLikes.push(media.likes);
                const galleryModel = new GalleryFactory(id, photographerId, title, video, image, likes, date, price, name);
                const mediaDom = galleryModel.getMediaDOM();
                photosParents.appendChild(mediaDom);
                photosSection.appendChild(photosParents);
            }
            
            )
            const sommeLikes = CompteurLikes(tableauSommeLikes);
            const etiquetteModel = new EtiquetteFactory(sommeLikes, price).getEtiquette();
            photographersHeader.appendChild(etiquetteModel);
        }




        function recuperationMediaATrier(mediaSelection) {
            
            resultatTri = new TriageDeMedias(mediaSelection).triLikeDecroissant();
            triage(resultatTri);


            let selection = document.querySelector('#selection-tri');

            selection.addEventListener("change", (resultatTri) => {
                if (selection.options[0].selected === true) {
                    if (document.querySelector('div.section__parent') !== null) {
                        document.querySelector('div.section__parent').remove();
                    } resultatTri = new TriageDeMedias(mediaSelection).triLikeDecroissant(); triage(resultatTri); console.log("resultatMediaSelectionTri", resultatTri)
                }
            });

            selection.addEventListener("change", (resultatTri) => {
                if (selection.options[1].selected === true) {
                    if (document.querySelector('div.section__parent') !== null) {
                        document.querySelector('div.section__parent').remove();
                    } resultatTri = new TriageDeMedias(mediaSelection).triDateDecroissant(), triage(resultatTri); console.log("resultatMediaSelectionTri", resultatTri)
                }
            });
            selection.addEventListener("change", (resultatTri) => {
                if (selection.options[2].selected === true) {
                    if (document.querySelector('div.section__parent') !== null) {
                        document.querySelector('div.section__parent').remove();
                    } resultatTri = new TriageDeMedias(mediaSelection).triAlphabetiqueCroissant(), triage(resultatTri); console.log("resultatMediaSelectionTri", resultatTri)
                }
            });
        }

        // 
    }
};

async function init() {
    const { photographers, media } = await getPhotographers();
    displayData(photographers, media);
};

init();

