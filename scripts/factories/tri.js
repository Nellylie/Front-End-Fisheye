class TriageDeMedias{
    constructor(tableau){
        this.tableau = tableau;}


    triAlphabetiqueCroissant() {
        let tableauTri = this.tableau.sort((a, b) => {
            return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
        });
        return tableauTri;
    }

    triDateDecroissant() {
        let tableauTri = this.tableau.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        return tableauTri;
    }

    triLikeDecroissant() {
        let tableauTri = this.tableau.sort((a, b) => {
            return b.likes - a.likes;
        });
        return tableauTri;
    }

}


function TriBouton(tableau){
const triPopularite = document.querySelector(".populaire");
const triDate = document.querySelector(".date");
const triTitre = document.querySelector(".titre");

let resultatTri = new TriageDeMedias(tableau).triLikeDecroissant();

if(sessionStorage.getItem("tri") === "triLikeDecroissant"){
    resultatTri = new TriageDeMedias(tableau).triLikeDecroissant();
    sessionStorage.removeItem("tri");
}
else if (sessionStorage.getItem("tri") === "triDateDecroissant"){
    resultatTri = new TriageDeMedias(tableau).triDateDecroissant(); 
    sessionStorage.removeItem("tri");
}
else if (sessionStorage.getItem("tri") === "alphabetCroissant"){
    resultatTri = new TriageDeMedias(tableau).triAlphabetiqueCroissant(); 
    sessionStorage.removeItem("tri");
}


triPopularite.addEventListener("click", ()=>{; sessionStorage.setItem("tri", "triLikeDecroissant"); window.location.reload()});
triDate.addEventListener("click", ()=>{sessionStorage.setItem("tri", "triDateDecroissant"); window.location.reload()});
triTitre.addEventListener("click", () =>{sessionStorage.setItem("tri", "alphabetCroissant"); window.location.reload()});

return resultatTri;
}