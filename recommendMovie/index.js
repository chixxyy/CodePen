let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "f5938903";

let getMovie = () => {
  let movieName = movieNameRef.value.trim();
  let url = `http://www.omdbapi.com/?t=${encodeURIComponent(
    movieName
  )}&apikey=${key}`;

  if (movieName.length === 0) {
    result.innerHTML = `<h3 class="msg">請輸入電影英文名字</h3>`;
    return;
  }

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response === "True") {
        result.innerHTML = `
          <div class="info">
            <img src="${data.Poster}" class="poster">
            <div>
              <h2>${data.Title}</h2>
              <div class="rating">
                <img src="star-icon.svg">
                <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div>
              <div class="genre">
                ${data.Genre.split(",")
                  .map((g) => `<div>${g.trim()}</div>`)
                  .join("")}
              </div>
            </div>
          </div>
          <h3>劇情：</h3>
          <p>${data.Plot}</p>
          <h3>演員：</h3>
          <p>${data.Actors}</p>
        `;
      } else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">發生錯誤！</h3>`;
    });
};

searchBtn.addEventListener("click", getMovie);

movieNameRef.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getMovie();
  }
});
