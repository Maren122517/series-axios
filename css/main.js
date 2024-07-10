//Uso de axios
const createSerieCard = (serie) => {
    console.log(serie)
    const card = document.createElement("div");
    card.classList.add("serie-card");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("serie-info");

    const name = document.createElement("h2");
    name.classList.add("serie-name");
    name.textContent = serie.name;

    const genresDiv = document.createElement("div");
    genresDiv.classList.add("serie-genres");

    serie.genres.forEach((genre) => {
        const genreSpan = document.createElement("span");
        genreSpan.classList.add("serie-genre", genre.toLowerCase());
        genreSpan.textContent = genre;
        genresDiv.appendChild(genreSpan);
    });

    infoDiv.appendChild(name);
    infoDiv.appendChild(genresDiv);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("serie-image-container");

    const image = document.createElement("img");
    image.classList.add("serie-image");
    image.src = serie.image.medium;
    image.alt = serie.name;

    imageContainer.appendChild(image);

    card.appendChild(infoDiv);
    card.appendChild(imageContainer);

    return card;
};

const loadSeries = async () => {
    const serieGrid = document.getElementsByClassName("gridSerie")[0];
    try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        const series = response.data;

        serieGrid.innerHTML = '';

        for (const serie of series) {
            const serieCard = createSerieCard(serie);
            serieGrid.appendChild(serieCard);
        }
    } catch (error) {
        console.log("Error fetching series:", error);
    }
};

document.addEventListener("DOMContentLoaded", loadSeries);

const searchSerie = async () => {
    const serieName = document.getElementById("search").value.toLowerCase();
    if (serieName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${serieName}`);
            const serieGrid = document.getElementsByClassName("gridSerie")[0];
            serieGrid.innerHTML = '';
            const series = response.data.map(item => item.show);
            series.forEach(serie => {
                const serieCard = createSerieCard(serie);
                serieGrid.appendChild(serieCard);
            });
        } catch (error) {
            console.log("Error searching for series:", error);
        }
    }
};

document.getElementById("search").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchSerie();
    }
});

document.getElementById("search-button").addEventListener("click", searchSerie);
