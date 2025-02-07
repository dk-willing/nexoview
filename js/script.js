const appContext = {
  path: window.location.pathname,
};

async function displayMovies() {
  const { results } = await fetchDataAPI("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
            <a href="../movie-details.html?id=${movie.id}">
                  <div class="card-img">
                    ${
                      movie.poster_path
                        ? `
                        <img src="https://images.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                        `
                        : `<img src="../img/no-image.jpg" alt="" />`
                    }
                  </div>
                  <div class="card-text">
                    <h3 class="title">${movie.title}</h3>
                    <p class="date">
                      <small class="text-muted">Release</small>
                      <span class="text-bold">${movie.release_date}</span>
                    </p>
                  </div>
                </a>
    `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchDataAPI(`movie/${movieId}`);

  const divUpper = document.createElement("div");
  divUpper.classList.add("movie-details");

  const divLower = document.createElement("div");
  divLower.classList.add("more-info");

  displayBackdrop("movie", movie.backdrop_path);

  divUpper.innerHTML = `
              <div class="movie-details">
                <div class="details-img">
                  ${
                    movie.poster_path
                      ? ` 
                    <img src="https://images.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" class="movie-details-img" />`
                      : `<img src="../img/no-image.jpg" alt="Movie Title" class="movie-details-img" />`
                  }
                </div>
                <div class="details-text">
                  <h3 class="details-title">${movie.title}</h3>
                  <p class="details-rating">
                    <i class="fa-solid fa-star"></i> <span>${movie.vote_average.toFixed(
                      1
                    )}</span> / 10
                  </p>
                  <p class="release-date">
                    <span class="text-muted">Release:</span>
                    <span class="text-bold">${movie.release_date}</span>
                  </p>
                  <p class="movie-detail-description">${movie.overview}</p>
                  <ul class="genres-list">
                    <p class="list-title">Genres</p>
                    ${movie.genres
                      .map((genre) => `<li>${genre.name}</li>`)
                      .join("")}
                  </ul>
                  <a href="${movie.homepage}" class="details-btn" target="_blank">View Movie Homepage</a>
                </div>
              </div>
  `;

  divLower.innerHTML = `
                <h3 class="details-title">Movie info</h3>
                <p class="b-bottom">
                  <span class="tag">Budget:</span> <span>$${movie.budget.toLocaleString()}</span>
                </p>
                <p class="b-bottom">
                  <span class="tag">Revenue:</span> <span>$${movie.revenue.toLocaleString()}</span>
                </p>
                <p class="b-bottom">
                  <span class="tag">Runtime:</span> <span>${movie.runtime} minutes</span>
                </p>
                <p class="b-bottom">
                  <span class="tag">Status:</span> <span>${movie.status}</span>
                </p>
                <p class="p-top">Production Companies</p>
                <p>${movie.production_companies
                  .map((company) => `<span>${company.name}</span>`)
                  .join(", ")}</p>
  `;

  document.querySelector(".upper").appendChild(divUpper);
  document.querySelector(".lower").appendChild(divLower);
}

async function displayShows() {
  const { results } = await fetchDataAPI("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <a href="../show-details.html?id=${show.id}">
                  <div class="card-img">
                    ${
                      show.poster_path
                        ? `
                        <img src="https://images.tmdb.org/t/p/w500${show.poster_path}" alt="" />
                        `
                        : `<img src="../img/no-image.jpg" alt="" />`
                    }
                  </div>
                  <div class="card-text">
                    <h3 class="title">${show.name}</h3>
                    <p class="date">
                      <small class="text-muted">Release</small>
                      <span class="text-bold">${show.first_air_date}</span>
                    </p>
                  </div>
                </a>
    `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];

  const show = await fetchDataAPI(`tv/${showId}`);

  const divUpper = document.createElement("div");
  divUpper.classList.add("movie-details");

  const divLower = document.createElement("div");
  divLower.classList.add("more-info");

  displayBackdrop("show", show.backdrop_path);

  divUpper.innerHTML = `
                <div class="movie-details">
                  <div class="details-img">
                    ${
                      show.poster_path
                        ? `
                      <img src="https://images.tmdb.org/t/p/w500${show.poster_path}" alt="Movie Title" class="movie-details-img" />`
                        : `<img src="../img/no-image.jpg" alt="Movie Title" class="movie-details-img" />`
                    }
                  </div>
                  <div class="details-text">
                    <h3 class="details-title">${show.name}</h3>
                    <p class="details-rating">
                      <i class="fa-solid fa-star"></i> <span>${show.vote_average.toFixed(
                        1
                      )}</span> / 10
                    </p>
                    <p class="release-date">
                      <span class="text-muted">Release:</span>
                      <span class="text-bold">${show.first_air_date}</span>
                    </p>
                    <p class="movie-detail-description">${show.overview}</p>
                    <ul class="genres-list">
                      <p class="list-title">Genres</p>
                      ${show.genres
                        .map((genre) => `<li>${genre.name}</li>`)
                        .join("")}
                    </ul>
                    <a href="${show.homepage}" class="details-btn" target="_blank">View Movie Homepage</a>
                  </div>
                </div>
    `;

  divLower.innerHTML = `
                  <h3 class="details-title">Movie info</h3>
                  <p class="b-bottom">
                    <span class="tag">Popularity:</span> <span>${show.popularity.toFixed(0)}</span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Languages:</span> <span>
                    ${show.spoken_languages.map((lang) => `<span>${lang.english_name}</span>`)}
                    </span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Number of Episodes:</span> <span>${show.number_of_episodes}</span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Status:</span> <span>${show.status}</span>
                  </p>
                  <p class="p-top">Production Companies</p>
                  <p>${show.production_companies
                    .map((company) => `<span>${company.name}</span>`)
                    .join(", ")}</p>
  `;

  document.querySelector(".upper").appendChild(divUpper);
  document.querySelector(".lower").appendChild(divLower);
}

async function fetchDataAPI(endpoint) {
  const API_KEY = "3606a23e6ef89abad448593ca3a7faf6";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&languages=en-US`
  );

  const data = await res.json();

  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highLight() {
  const allLinks = document.querySelectorAll(".nav-link");

  allLinks.forEach((link) => {
    if (link.getAttribute("href") === appContext.path) {
      link.classList.add("active");
    }
  });
}

function displayBackdrop(type, backdroppath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(
    https://image.tmdb.org/t/p/original/${backdroppath}
  )`;
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "150vh";
  overlayDiv.style.width = "100%";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.right = "0";
  overlayDiv.style.bottom = "0";
  overlayDiv.style.zIndex = "-1";

  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-main").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-main").appendChild(overlayDiv);
  }
}

async function displaySlider() {
  const { results } = await fetchDataAPI("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
                <a href="../movie-details.html?id=${movie.id}">
                  <img src="https://image.tmdb.org/t/p/w500${
                    movie.poster_path
                  }" alt="" />
                </a>

                <h4 class="swiper-rating">
                  <i class="fa-solid fa-star"></i>
                  ${movie.vote_average.toFixed(1)} / 10
                </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);
  });
  initSwipper();
}

function initSwipper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    autoplay: {
      disbaleOnInteraction: false,
      delay: 4000,
    },
    freeMode: true,
    loop: true,
    spaceBetween: 30,
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      zoom: {
        maxRatio: 3,
      },
    },
  });
}

function routes() {
  switch (appContext.path) {
    case "/":
    case "/index.html":
      displaySlider();
      displayMovies();
      console.log("Home");
      break;
    case "/show-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      console.log("Search");
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/show.html":
      displayShows();
      break;
  }
  highLight();
}

function init() {
  document.addEventListener("DOMContentLoaded", routes);
}

init();
