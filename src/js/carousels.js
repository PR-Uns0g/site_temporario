const CAROUSEL__ELS = document.querySelectorAll('.carousel');
let currentSlideIndex = Array(CAROUSEL__ELS.length).fill(0);
CAROUSEL__ELS.forEach((carouselEl, nthCarousel) =>{
    let containerEl = carouselEl.querySelector('.carousel__container');
    // scrolls to the first slide initially
    containerEl.scroll(0,0);

    let leftButton = carouselEl.querySelector('.carousel__arrow-button--back');
    leftButton.addEventListener('click', () =>{
        currentSlideIndex[nthCarousel]--;
        scrollContainer(containerEl,nthCarousel)
    });

    let rightButton = carouselEl.querySelector('.carousel__arrow-button--forward');
    rightButton.addEventListener('click', () =>{
        currentSlideIndex[nthCarousel]++;
        scrollContainer(containerEl,nthCarousel);
    });
});

function scrollContainer(containerEl, nthCarousel){
    // if the current value scrolled is >= the total scrollWidth of the container
    if(currentSlideIndex[nthCarousel]*containerEl.clientWidth >= containerEl.scrollWidth){
        currentSlideIndex[nthCarousel] = 0;
    }
    else if(currentSlideIndex[nthCarousel] < 0){
        currentSlideIndex[nthCarousel] = 2; // CHANGE THIS LATER
    }

    containerEl.scroll(currentSlideIndex[nthCarousel]*containerEl.clientWidth, 0);
}