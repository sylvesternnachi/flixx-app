const path = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages:1,
        totalResult: 0
    },
    api:{
        apiKey: 'ab968b61471a1b944a3acae5c0f497f4',
        apiURL: 'https://api.themoviedb.org/3/'
    }
};

async function tvDetails(){
    const tvShowID = window.location.search.split('=')[1];

    const tvShow  = await fetchAPIData('tv/' + tvShowID);

        const div = document.createElement('div');
        div.classList.add('details-top');
    
        div.innerHTML =  `

              ${ 
                tvShow.poster_path ? 
                ` 
                <div>
                <img
                src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
                class="card-img-top"
                alt="${tvShow.name}"
                /> </div>` 
              :
              ` <div> <img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${tvShow.name}"
                /> </div>`
            }
              
             
              
              <div>
                <h2>${tvShow.name}</h2>
                <p>
                  <i class="fas fa-star text-primary"></i>
                 ${tvShow.vote_average}
                </p>
                <p class="text-muted">Release Date: ${tvShow.first_air_date}</p>
                <p>
                 ${tvShow.overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">

                ${
                    tvShow.genres.map(gen => `<li>${gen.name}</li>`).join('')
                }
                
                </ul>
                <a href="${tvShow.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
              </div>
        
        `;

                //backdrop
                displayBackgroundImages('tv',tvShow.backdrop_path);
    
        const tvShowDetails = document.querySelector('#show-details');
        const buttomDetailsdiv = document.querySelector('.details-bottom');
        
           buttomDetailsdiv.innerHTML = `
           
           <h2>Show Info</h2>
           <ul>
             <li><span class="text-secondary">Number Of Episodes:</span> ${tvShow.number_of_episodes}</li>
             <li>
               <span class="text-secondary">Last Episode To Air:</span> ${tvShow.last_episode_to_air.air_date}
             </li>
             <li><span class="text-secondary">Status:</span> ${tvShow.status}</li>
           </ul>
           <h4>Production Companies</h4>
           <div class="list-group">
                 ${tvShow.production_companies.map(proc => `<li> ${proc.name}</li>`).join('')}
           </div>
           
           `     

        
        tvShowDetails.appendChild(div);





}

async function movieDetails(){

    const currentLink = window.location.href;
    const id = currentLink.split('=')[1]
   
    
    const movie  = await fetchAPIData('movie/' + id);

        const div = document.createElement('div');
        div.classList.add('details-top');
    
        div.innerHTML =  `

              ${ 
                movie.poster_path ? 
                ` 
                <div>
                <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                /> </div>` 
              :
              ` <div> <img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                /> </div>`
            }
              
             
              
              <div>
                <h2>${movie.title}</h2>
                <p>
                  <i class="fas fa-star text-primary"></i>
                 ${movie.vote_average}
                </p>
                <p class="text-muted">Release Date: ${movie.release_date}</p>
                <p>
                 ${movie.overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">

                ${
                    movie.genres.map(gen => `<li>${gen.name}</li>`).join('')
                }
                
                </ul>
                <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
              </div>
        
        
        `;

                //backdrop
                displayBackgroundImages('movie',movie.backdrop_path);
    
        const movieDetails = document.querySelector('#movie-details');
        const buttomDetailsdiv = document.querySelector('.details-bottom');
        
        buttomDetailsdiv.innerHTML = `
        
        <h2 class="">Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
          <li><span class="text-secondary">Revenue:</span>${movie.revenue}</li>
          <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">Company 1, Company 2, Company 3</div>

        `;

        
        movieDetails.appendChild(div);

}



async function displayTvShows(){
    const { results } = await fetchAPIData('tv/popular');
    results.forEach(tv => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        
        
        <a href="tv-details.html?id=${tv.id}">
         
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
};

//search movies / show
async function search(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    path.search.type = urlParams.get('type');
    path.search.term = urlParams.get('search-term');

    if(path.search.term !== '' && path.search.term !== null){
        const { results, total_pages, page, total_results } = await searchAPIData();

        path.search.page = page;
        path.search.totalPages = total_pages;
        path.search.totalResult = total_results;


        if(results.length === 0 ){
            showAlert('No Result found');
            return;
        }

        displaySearchResults(results);

        document.querySelector('#search-term').value = '';        

    }else{
        showAlert('Please enter search terms', 'alert-error');
    }
}

//DisplaySearhResult
function displaySearchResults(results){

    //clear previous result
   
    document.querySelector("#search-results").innerHTML = '';
    document.querySelector("#search-results-heading").innerHTML = '';
    document.querySelector("#pagination").innerHTML = '';
  
    
    results.forEach(searchResult => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        
        
        <a href="${path.search.type}-details.html?id=${searchResult.id}">
         
          ${
            searchResult.poster_path ? 

            ` <img
            src="https://image.tmdb.org/t/p/w500${searchResult.poster_path}"
            class="card-img-top"
            alt="${path.search.type === 'movie' ? searchResult.title : searchResult.name}"
            />` 
            
            :  
            
            `
            <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${path.search.type === 'movie' ? searchResult.title : searchResult.name}"
          />`
        }
          
        </a>
        <div class="card-body">
          <h5 class="card-title">${path.search.type === 'movie' ? searchResult.title : searchResult.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${path.search.type === 'movie' ? searchResult.release_date : searchResult.first_air_date}</small>
          </p>
        </div>
      
        
        
        `;

        document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${path.search.totalResult} Results for ${path.search.term}</h2>
        `;

        const searchResultDsply = document.querySelector('#search-results');
        searchResultDsply.appendChild(div);

    });

    displayPagination();

}


//Display Pagination for search
function displayPagination(){
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `

    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${path.search.page} of ${path.search.totalPages}</div>

    `;

    document.querySelector('#pagination').appendChild(div);

    //Disable Prev button on first page

    if(path.search.page === 1){
        document.querySelector("#prev").disabled = true;
    }

     //Disable Next button on last page

     if(path.search.page === path.search.totalPages){
        document.querySelector("#next").disabled = true;
    }

    //Taking us to the next page
    document.querySelector('#next').addEventListener('click', async () => {
        path.search.page++;
        const { results, total_pages } =  await searchAPIData();

        displaySearchResults(results)
    });


    //Taking us to the previous page
    document.querySelector('#prev').addEventListener('click', async () => {
        path.search.page--;
        const { results, total_pages } =  await searchAPIData();

        displaySearchResults(results)
    });
}


//Display Slider Movies

async function displaySlider(){
    const { results } = await fetchAPIData('movie/now_playing');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = ` 
        <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    });
    
}

function initSwiper(){
    const swiper = new Swiper('.swiper', {  
       // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
      });
}


//Display Backdrop On Details Pages
function displayBackgroundImages(type,backgroundPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://images.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv); 
    };

};


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


//Make Request to Search API
async function searchAPIData(){
    const API_KEY = 'ab968b61471a1b944a3acae5c0f497f4';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}search/${path.search.type}?api_key=${API_KEY}&language=en-US&query=${path.search.term}&page=${path.search.page}`)
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

//Show Alert

function showAlert(message,className){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));

    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
}

//Init App

function init(){
    switch (path.currentPage) {
        case '/':
        case '/index.html':
            // console.log('Home');
            displaySlider();
            displayPopularMovies();
            break;

        case '/shows.html':
            // console.log('Shows');
            displayTvShows();
            break;

        case '/movie-details.html':
            movieDetails()
            // console.log('Movie Details');
            break;

        case '/tv-details.html':
            tvDetails();
            //  console.log('TV Details');
             break;

        case '/search.html':
             search();
             break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
