

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

function CompteurLikes(likes){
    let sommeLikes = 0;
    likes.forEach((like)=>{sommeLikes += like});
    return sommeLikes;
}

function checkEmail(email){
    return /^[a-zA-Z0-9._-]+\@[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,15}$/g.test(email);
}
function checkString(text){
    return /^([a-zA-Z]{2,500})+$/g.test(text);
}