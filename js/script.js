const path = {
    currentPage: window.location.pathname
};



async function displayTvShows(){
    const { results } = await fetchAPIData('discover/tv');
    results.forEach(tv => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        
        
        <a href="movie-details.html?id=${tv.id}">
         
          ${
            tv.poster_path ? 

            ` <img
            src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
            class="card-img-top"
            alt="${tv.name}"
            />` 
            
            :  
            
            `
            <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${tv.name}"
          />`
        }
          
        </a>
        <div class="card-body">
          <h5 class="card-title">${tv.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${tv.first_air_date}</small>
          </p>
        </div>
      
        
        
        `;


        const popularMovies = document.querySelector('#popular-shows');
        popularMovies.appendChild(div);


    })
}



async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        
        
        <a href="movie-details.html?id=${movie.id}">
         
          ${
            movie.poster_path ? 

            ` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
            />` 
            
            :  
            
            `
            <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
        }
          
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      
        
        
        `;


        const popularMovies = document.querySelector('#popular-movies');
        popularMovies.appendChild(div);


    })
}


//Fetch data from TMDB API
    async function fetchAPIData(endpoint){
    const API_KEY = 'ab968b61471a1b944a3acae5c0f497f4';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json();

    hideSpinner()

    return data;
}


    function showSpinner(){
        document.querySelector('.spinner').classList.add('show')
    }

    function hideSpinner(){
        document.querySelector('.spinner').classList.remove('show')
    }

//highlight active link

function highlightActiveLink(){
   
        const links = document.querySelectorAll('.nav-link');
        links.forEach((link) => {
            if(link.getAttribute('href') === path.currentPage){
                link.classList.add('active')
            }
        });

}

//Init App

function init(){
    switch (path.currentPage) {
        case '/':
        case '/index.html':
            // console.log('Home');
            displayPopularMovies();
            break;

        case '/shows.html':
            // console.log('Shows');
            displayTvShows();
            break;

        case '/movie-details.html':
            console.log('Movie Details');
            break;

        case '/tv-details.html':
             console.log('TV Details');
             break;

        case '/search.html':
             console.log('Search');
             break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
