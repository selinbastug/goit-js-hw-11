import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".container");
const inputValue = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const loadingDiv = document.createElement("span");
loadingDiv.className = "loader";
//loadingDiv.textContent = 'Loading images, please wait...';

searchButton.addEventListener("click", (e) => {
  gallery.parentNode.insertBefore(loadingDiv, gallery); // Loading div'ini resultsDiv'in önüne ekle
  loadingDiv.style.display = "block";
  delay(90000);
  e.preventDefault();
  const input = inputValue.value;
  const url = `https://pixabay.com/api/?key=26694191-13f704d2e0e711d67f08fd2b2&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`;
  gallery.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
      }

      const pixabay = data.hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) =>
            `<div class="item">
        <a href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes <br/> ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views <br/> ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments <br/> ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads <br/> ${downloads}</b>
          </p>
        </div>
        </a>
        </div>`
        )
        .join("");

      gallery.insertAdjacentHTML("beforeend", pixabay);
      delay(90000);
      loadingDiv.style.display = "none";
      box.refresh();
    })
    .catch((error) => {
      console.error("Hata oluştu:", error);
    });
});

let box = new SimpleLightbox(".container a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
