



function photographerFactory(data) {
    
    const name = data.name;
    const portrait = data.portrait;
    const id = data.id;
    const tagline = data.tagline;
    const price = data.price;
    const city = data.city;
    const country = data.country;

    console.log ("photographerfactory", data);
    const picture = `./assets/photographers/photographers-id/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const aLien = document.createElement('a');
        aLien.setAttribute("href", `./photographer.html?${id}`);
        const img = document.createElement( 'img' );
        const div = document.createElement("div");
        div.setAttribute("class", "parent-image");
        img.setAttribute("class", "imgAvatar");
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const description = document.createElement("p");
        description.setAttribute("class", "description");
        description.innerHTML = `${city}, ${country} <br> ${tagline} <br> ${price}€/jour`;
        div.appendChild(img);
        aLien.appendChild(div);
        article.appendChild(aLien);
        article.appendChild(h2);
        article.appendChild(description);
        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}


function coupePrenom(name){
    let i;
    let temporaire;
    for (i = name.length - 1; i>-1; i--){
        if (name.charAt(i) ==" "){
            break;
        }
    }
    
    temporaire = name.toString().substring (0, i);
    return temporaire;
}

function photoFactory(data, photographeName) {
    
    const urlImage = data.image;
    const titre = data.title;
    const name = photographeName.name;
    const prenom = coupePrenom(name);
    console.log("prenom", prenom);

    console.log ("photographerfactory", data);
    const imagePhoto = `./assets/images/${prenom}/${urlImage}`;

    function getPhotoCardDOM() {
        const figure = document.createElement( "figure" );
        const figCaption = document.createElement( "figcaption");
        const img = document.createElement( 'img' );
        img.setAttribute("class", "imagePhoto");
        img.setAttribute("src", imagePhoto);
        const h2 = document.createElement( 'h2' );
        h2.textContent = titre;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        figCaption.appendChild(h2);
        return (figure);
    }
    return { name, imagePhoto, getPhotoCardDOM }
}

