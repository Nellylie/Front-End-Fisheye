


class PhotographerFactory{
    constructor(name, id, city, country, tagline, price, portrait ){
    
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
    }

    getUserCardDOM() {
        
        const picture = `./assets/photographers/photographers-id/${this.portrait}`;

        const article = document.createElement( 'article' );
        const aLien = document.createElement('a');
        const img = document.createElement( 'img' );
        const div = document.createElement("div");
        div.setAttribute("class", "parent-image");
        img.setAttribute("class", "imgAvatar");
        img.setAttribute("src", picture);
        aLien.setAttribute("href", `./photographer.html?id=${this.id}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = this.name;
        const description = document.createElement("p");
        description.setAttribute("class", "description");
        description.innerHTML = `${this.city}, ${this.country} <br> ${this.tagline} <br> ${this.price}€/jour`;
       
        div.appendChild(img);
        aLien.appendChild(div);
        article.appendChild(aLien);
        article.appendChild(h2);
        article.appendChild(description);
        return article;
    }

    photoHeaderFactory(name, id, city, country, tagline, portrait) {

        const header = document.createElement( 'article' );
        const avatar = document.createElement( 'img' );
        const div = document.createElement("div");
        const description = document.createElement("div");
        const paragraphe = document.createElement("p");
        const h2 = document.createElement( 'h2' );

        div.setAttribute("class", "parent-image");
        avatar.setAttribute("class", "imgAvatar");

        avatar.setAttribute("src", `./assets/photographers/photographers-id/${portrait}`);

        description.setAttribute("class", "description");
        paragraphe.textContent = `${city}, ${country}, ${tagline}`;

        h2.textContent = name;
        
        description.appendChild(h2);
        description.appendChild(paragraphe);
        div.appendChild(avatar);
        header.appendChild(description);
        header.appendChild(div);
        return header;

    }

    getMediaDOM(id, photographerId, title, image, likes, date, price, name) {
        const prenom = coupePrenom(name);
        const imagePhoto = `./assets/images/${prenom}/${image}`;

        const figure = document.createElement( "figure" );
        const figCaption = document.createElement( "figcaption");

        const img = document.createElement( 'img' );
        img.setAttribute("class", "imagePhoto");
        img.setAttribute("src", imagePhoto);
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        figCaption.appendChild(h2);
        return (figure);
    }
}



