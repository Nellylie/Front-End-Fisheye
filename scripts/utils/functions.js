

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

function reconnaitreMp4(titreVideo, titreImage){
    if (titreVideo !== undefined){
    return titreVideo;}
    else {
        return titreImage;
    }
}


function urlRecupere(urlLien){
   const url = new URL(urlLien);
   if (new URLSearchParams(url.search)){
        let urlId = url.searchParams.get("id");
        return urlId;
   }
   else{
        return false;
   }
}

