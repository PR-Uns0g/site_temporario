const CAROUSEL__ELS = document.querySelectorAll('.carousel');
// let currentSlideIndex = Array(CAROUSEL__ELS.length).fill(0);
CAROUSEL__ELS.forEach((carouselEl) =>{
    let containerEl = carouselEl.querySelector('.carousel__container');
    // scrolls to the first slide initially
    containerEl.scroll(0,0);

    let leftButton = carouselEl.querySelector('.carousel__arrow-button--back');
    leftButton.addEventListener('click', () =>{
        scrollContainer(-1,containerEl)
    });

    let rightButton = carouselEl.querySelector('.carousel__arrow-button--forward');
    rightButton.addEventListener('click', () =>{
        scrollContainer(1,containerEl);
    });
});

function scrollContainer(modifier,containerEl){
    if(modifier == 1){
        containerEl.scrollLeft >= (containerEl.scrollWidth - containerEl.clientWidth) ? containerEl.scroll(0,0) : containerEl.scrollBy(containerEl.clientWidth,0);
    }
    else if(modifier == -1){
        containerEl.scrollLeft < 15 ? containerEl.scroll(containerEl.scrollWidth,0) : containerEl.scrollBy(modifier*containerEl.clientWidth,0);  
    }
}