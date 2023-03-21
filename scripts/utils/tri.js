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

