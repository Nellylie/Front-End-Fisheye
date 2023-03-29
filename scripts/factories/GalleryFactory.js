
class GalleryFactory {
    constructor(id, photographerId, title, video, image, likes, date, price, name) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.video = video;
        this.image = image;
        this.likes = likes;
        this.date = date;
        this.price = price;
        this.name = name;

    }

    getMediaDOM() {
        const prenom = coupePrenom(this.name);
        const urlImage = reconnaitreMp4(this.video, this.image);
        const imagePhoto = `./assets/images/${prenom}/${urlImage}`;

        const figure = document.createElement("figure");
        const figCaption = document.createElement("figCaption");
        const like = document.createElement("div");
        const likeButton = document.createElement("div");
        const ensembleLike = document.createElement("div");
        const img = document.createElement("img");
        const videoBalise = document.createElement("video");
        const videoSource = document.createElement("source");
        

        likeButton.setAttribute("class", "carte__likeButton");
        figure.setAttribute("class", "portfolio__carte");
        figCaption.setAttribute("class", "description__carte");

        if (this.video !== undefined) {
            
        videoBalise.setAttribute("class", "carte__video");
        videoBalise.setAttribute("controls", true);
        videoBalise.setAttribute("width", "200px");
        videoSource.setAttribute("src", imagePhoto);
        videoSource.setAttribute("type", "video/mp4");
            videoBalise.appendChild(videoSource);
            figure.appendChild(videoBalise);

        }
        else {
            img.setAttribute("class", "carte__photo");
            img.setAttribute("src", imagePhoto);
            figure.appendChild(img);
        }

        const h2 = document.createElement('h2');
        h2.setAttribute("class", "carte__titre");
        like.setAttribute("class", "carte__likes");
        ensembleLike.setAttribute("class", "carte__ensemble-like");
        h2.textContent = this.title;

        like.textContent = this.likes;
        likeButton.innerHTML = "<i class='fa-regular fa-heart'></i>";
        let click = false;
        likeButton.addEventListener("click", () => {
            (!click ? click = true : click = false);
            if (click) { like.textContent = `${this.likes + 1}`; likeButton.innerHTML = "<i class='fa-solid fa-heart fa-couleur'></i>" }
            else {
                like.innerHTML = `${this.likes} `;
                likeButton.innerHTML = "<i class='fa-regular fa-heart fa-heart-margin'></i>";
            }
        });
        ensembleLike.appendChild(like);
        ensembleLike.appendChild(likeButton);
        figCaption.appendChild(h2);
        figCaption.appendChild(ensembleLike);
        figure.appendChild(figCaption);

        return (figure);
    }
}