const POSTS_CONTAINER_EL = document.querySelector('.posts-container');

const postsURL = "https://propago.com.br/wp-json/wp/v2/posts";
const ALL_THE_POSTS = await getThePosts(postsURL+'?_fields=title,link,_links.wp:featuredmedia,date&per_page=8');

ALL_THE_POSTS.forEach(async (postObject) => {    
    // Fetching the image
    let imageURIValue = Object.values(postObject._links)[0][0].href;
    let imageURL = await getTheImageURL(imageURIValue);
    
    // Altering date format
    let dateValue = postObject.date.slice(0,10)
    dateValue = dateValue.substring(10,8)+'/'+dateValue.substring(7,5)+'/'+dateValue.substring(4,0);

    // creating the element
    let postElement = `
    <article class="post">
        <div class="post__header">
            <img src="${imageURL}" class="post__image" alt="Imagem do Post"/>
        </div>
        <div class="post__body">
            <h3 class="post__title">${postObject.title.rendered}</h3>
            <ul class="post__metadata">
                <li class="post__info"><strong class="post__label">Publicado em:</strong> <span class="post__data">${dateValue}</span></li>
            </ul>
        </div>
        <div class="post__footer"><a href="${postObject.link}" class="post__button">Veja A Página</a></div>
    </article>`;

    POSTS_CONTAINER_EL.innerHTML += postElement;
});


async function getThePosts(postsURLValue){
    let result = {}
    await fetch(postsURLValue).then((response) => response.json()).then((data) =>{
        result = data;
    });
    return result;
}

async function getTheImageURL(imageURI){
    let imageURL = null

    let params = '?_fields=media_details';
    await fetch(imageURI+params).then((response) => response.json()).then((data) => {
        imageURL = data.media_details.sizes.medium.source_url;
    });

    return imageURL;
}