$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?api_key=0db43aea84ad93bb55a7ab00167d70e5&language=en-US&query="+searchText+"&page=1&include_adult=false",
        "method": "GET",
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        let movies = response.results;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="card col-md-3 m-4">
                    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });

        $('#movies').html(output);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=0db43aea84ad93bb55a7ab00167d70e5",
        "method": "GET",
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        let movie = response;
        let arrayGenres = [];
        $.each(movie.genres, (index, genres) => {
            arrayGenres.push(genres.name);
        });
        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <strong>Genre:</strong>
                            ${arrayGenres.join(', ')}
                        </li>
                        <li class="list-group-item">
                            <strong>Released:</strong>
                            ${movie.release_date}
                        </li>
                        <li class="list-group-item">
                            <strong>Popularity:</strong>
                            ${movie.popularity}
                        </li>
                        <li class="list-group-item">
                            <strong>Vote Average:</strong>
                            ${movie.vote_average}
                        </li>
                    </ul>
                </div>
                <div class="col-md-8">
                    <h3>${movie.title}</h3>
                    <h5>Plot</h5>
                    ${movie.overview}
                    <hr>
                    <a href="https://www.imdb.com/search/title/?title=${movie.title}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back</a>
                </div>
            </div>
        `;

        $('#movies').html(output);
    });
}