const accessKey = "36WZr7knl4hRfq42RYXR3ukNM_TVokJgpwS4kMgyJIs";
const searchform = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const noResult = document.getElementById('no-result');
const showMoreBtn = document.getElementById("show-more-btn");


// Get DOM for carousel elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 5000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext)

// Get DOM for Search elements
let keyword = "";
let page = 1;

//Function of Searching
async function searchImage(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if(page === 1){
            searchResult.innerHTML = "";
            // Hide carousel section when result appears
            let carouselBorderDom = document.querySelector('.carousel');
            carouselBorderDom.style.display = 'none';
        }
        
        if(page === 1){
            searchResult.innerHTML = "";
            // Hide about section when result appears
            let aboutsectionBorderDom = document.querySelector('.about-section');
            aboutsectionBorderDom.style.display = 'none';
        }

        if(page === 1){
            searchResult.innerHTML = "";
            // Hide features section when result appears
            let ourfeaturesBorderDom = document.querySelector('.ourfeatures');
            ourfeaturesBorderDom.style.display = 'none';
        }


        function loadMoreItems() {
            console.log('Loading more items...');
        }
        const results = data.results;
        if (results.length === 0) {
            noResult.style.display = 'block';
            showMoreBtn.style.display = 'none'; // Hide showMoreBtn when no results
        } else {
            noResult.style.display = 'none';
            showMoreBtn.style.display = 'block';
            results.map((result) =>{
                const image = document.createElement("img");
                image.src = result.urls.small;
                
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            })
        }
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch images:', error);
    }
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});

//Carousel sliding animation
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 5]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 5]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
}

// Transition effect on scrolling
// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll event listener
window.addEventListener('scroll', function() {
    const searchResult = document.getElementById('search-result');
    if (isInViewport(searchResult)) {
        searchResult.style.opacity = 1;
        searchResult.style.transform = 'translateY(0)';
    }
});
