



function photographerFactory(data) {
    // const {name, portrait} = data;
    // data = Object.fromEntries(new Array (data));

    //simplification pour recuperer les valeurs des cles de chaque photographe
    const name = data.name;
    const portrait = data.portrait;

    console.log ("photographerfactory", data);
    const picture = `./assets/photographers/photographers-id/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}