

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

function reconnaitreMp4(titreImage, titreVideo){
    let remplacement;
    if (titreVideo){
    remplacement = titreVideo.replace("mp4", "jpg");
    return remplacement;}
    else {
        return titreImage;
    }
}


function transformeMp4Jpg(titreImage){
    let i;
    let temporaire;
    for (i = titreImage.length - 1; i>-1; i--){
        if (namtitreImagee.charAt(i) ==" "){
            break;
        }
    }
    
    temporaire = titreImage.toString().substring (0, i);
    return temporaire;
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

