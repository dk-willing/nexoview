const appContext = {
  path: window.location.pathname,
  search: {
    type: "",
    term: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "3606a23e6ef89abad448593ca3a7faf6",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

async function fetchDataAPI(endpoint) {
  const API_KEY = appContext.api.apiKey;
  const API_URL = appContext.api.apiUrl;

  showSpinner();
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&languages=en-US`
  );

  const data = await res.json();

  hideSpinner();
  return data;
}

async function searchAPIData() {
  const API_KEY = appContext.api.apiKey;
  const API_URL = appContext.api.apiUrl;

  showSpinner();
  const res = await fetch(
    `${API_URL}search/${appContext.search.type}?api_key=${API_KEY}&languages=en-US&query=${appContext.search.term}&page=${appContext.search.page}`
  );

  const data = await res.json();

  hideSpinner();
  return data;
}

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
                        : `<img src="img/no-image.jpg" alt="" />`
                    }
                  </div>
                  <div class="card-text">
                    <h3 class="title">${movie.title}</h3>
                    <p class="date">
                      <small class="text-muted">Release: </small>
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
                    <img
                    src="https://images.tmdb.org/t/p/w500${movie.poster_path}"
                    alt="Movie Title"
                    class="movie-details-img"
                  />`
                      : `<img
                    src="img/no-image.jpg"
                    alt="Movie Title"
                    class="movie-details-img"
                  />`
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

                  <p class="movie-detail-description">
                   ${movie.overview}
                  </p>

                  <ul class="genres-list">
                    <p class="list-title">Genres</p>
                    ${movie.genres
                      .map((genre) => {
                        return `<li>${genre.name}</li>`;
                      })
                      .join("")}
                  </ul>

                  <a href="${
                    movie.homepage
                  }" class="details-btn" target="_blank">View Movie Homepage <i class="fa-solid fa-up-right-from-square"></i></a>
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
                  <span class="tag">Runtime:</span> <span>${
                    movie.runtime
                  } minutes</span>
                </p>
                <p class="b-bottom">
                  <span class="tag">Status:</span> <span>${movie.status}</span>
                </p>
                <p class="p-top">Production Companies</p>
                <p>
                  ${movie.production_companies
                    .map((company) => {
                      return `<span>${company.name}</span>`;
                    })
                    .join(", ")}
                </p>
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
                        : `<img src="img/no-image.jpg" alt="" />`
                    }
                  </div>
                  <div class="card-text">
                    <h3 class="title">${show.name}</h3>
                    <p class="date">
                      <small class="text-muted">First Air Date: </small>
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
                      <img
                      src="https://images.tmdb.org/t/p/w500${show.poster_path}"
                      alt="Movie Title"
                      class="movie-details-img"
                    />`
                        : `<img
                      src="img/no-image.jpg"
                      alt="Movie Title"
                      class="movie-details-img"
                    />`
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
  
                    <p class="movie-detail-description">
                     ${show.overview}
                    </p>
  
                    <ul class="genres-list">
                      <p class="list-title">Genres</p>
                      ${show.genres
                        .map((genre) => {
                          return `<li>${genre.name}</li>`;
                        })
                        .join("")}
                    </ul>
  
                    <a href="${
                      show.homepage
                    }" class="details-btn" target="_blank">View Show Homepage  <i class="fa-solid fa-up-right-from-square"></i></a>
                  </div>
                </div>
    `;

  divLower.innerHTML = `
                  <h3 class="details-title">Movie info</h3>
                  <p class="b-bottom">
                    <span class="tag">Popularity:</span> <span>${show.popularity.toFixed(
                      0
                    )}</span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Languages:</span> <span>
                    ${show.spoken_languages.map((lang) => {
                      return `<span>${lang.english_name}</span>`;
                    })}
                    </span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Number of Episodes:</span> <span>${
                      show.number_of_episodes
                    }</span>
                  </p>
                  <p class="b-bottom">
                    <span class="tag">Status:</span> <span>${show.status}</span>
                  </p>
                  <p class="p-top">Production Companies</p>
                  <p>
                    ${show.production_companies
                      .map((company) => {
                        return `<span>${company.name}</span>`;
                      })
                      .join(", ")}
                  </p>
    `;

  document.querySelector(".upper").appendChild(divUpper);
  document.querySelector(".lower").appendChild(divLower);

  console.log(show);
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
                <a href="movie-details.html?id=${movie.id}">
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

async function displayShowSlider() {
  const { results } = await fetchDataAPI("tv/top_rated");

  console.log(results);

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
                <a href="show-details.html?id=${show.id}">
                  <img src="https://image.tmdb.org/t/p/original${
                    show.poster_path
                  }" alt="" />
                </a>

                <h4 class="swiper-rating">
                  <i class="fa-solid fa-star"></i>
                  ${show.vote_average.toFixed(1)} / 10
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

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  appContext.search.type = urlParams.get("type");
  appContext.search.term = urlParams.get("search-term");

  if (appContext.search.term !== "" && appContext.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    appContext.search.page = page;
    appContext.search.totalPages = total_pages;
    appContext.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found", "alert-success");
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";

    console.log(results);
  } else {
    showAlert("Please enter a search terms", "alert-error");
  }
}

function displaySearchResults(results) {
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <a href="movie-details.html?id=${item.id}">
                <div class="card-img">
                  ${
                    item.poster_path
                      ? `<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="" />`
                      : `<img src="img/no-image.jpg" alt="${
                          appContext.search.type === "movie"
                            ? item.title
                            : item.name
                        }" />`
                  }
                </div>
                <div class="card-text">
                  <h3 class="title">${
                    appContext.search.type === "movie" ? item.title : item.name
                  }</h3>
                  <p class="date">
                    <small class="text-muted">Release: </small>
                    <span class="text-bold">${
                      appContext.search.type === "movie"
                        ? item.release_date
                        : item.first_air_date
                    }</span>
                  </p>
                </div>
              </a>
      `;

    document.querySelector("#search-results-heading").innerHTML = `
      <h2 class="heading-text">${results.length} of ${appContext.search.totalResults} results for ${appContext.search.term}</h2>`;
    document.querySelector("#results").appendChild(div);
  });

  displayPagination();
}

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");

  div.innerHTML = `
    <button class="btn-pagination" id="prev">Prev</button>
    <button class="btn-pagination" id="next">Next</button>
    <div class="page-counter">Page ${appContext.search.page} of ${appContext.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  // Disable buttons based on page we are on
  if (appContext.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (appContext.search.page === appContext.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  // Adding event listeners to increase and create pagination
  document.querySelector("#next").addEventListener("click", async () => {
    appContext.search.page++;
    const { results, page } = await searchAPIData();
    displaySearchResults(results);
  });

  document.querySelector("#prev").addEventListener("click", async () => {
    appContext.search.page--;
    const { results, page } = await searchAPIData();
    displaySearchResults(results);
  });

  console.log(appContext.search.page);
}

function showAlert(message, className) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));

  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
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
      search();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/show.html":
      displayShows();
      displayShowSlider();
      break;
  }
  highLight();
}

function init() {
  document.addEventListener("DOMContentLoaded", routes);
}

init();
