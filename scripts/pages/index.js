    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        // let photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"
        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     },
        // ]

        //recuperation du json avec fetch et await pour ne pas avoir du contenu avant chargement 
        //complete
        const urlJson = await fetch("./data/photographers.json");
        const id = await urlJson.json();
        let photographers = id.photographers;


        // et bien retourner le tableau photographers seulement une fois récupéré
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }
    return photographers;
    }

    async function displayData(photographers) {
        
        const photographersSection = document.querySelector(".photographer_section");
        photographers = new Array(photographers);//transformation en objet iterable la variable du json
        console.log("display", photographers);
        let i=0;//c'était au cas ou j'aurais besoin d'un index iterable
        // photographers.forEach((photographer) => {
            
            //remplace de la boucle forEach par une boucle classique
            //pour resoudre mes complications d'indexation
            for (let photographer of photographers[0]){
            i++;
            console.log("iteration", i)
            console.log("boucle", photographer);
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        };
    };

    async function init() {
        // Récupère les datas des photographes
        // const { photographers } = await getPhotographers();
        // displayData(photographers);
        //mets dans une variable le retour de la fonction getPhotographers()
        let photographers = await getPhotographers();//simplification avec une await pour ne charger que si complet
        //la fait passer en argument dans la fonction displaydata.
        displayData(photographers);
    };
    
    init();
    
