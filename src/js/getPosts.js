const POSTS_CONTAINER_EL = document.querySelector('.posts-container');

const postsURL = "https://blog.propago.com.br/wp-json/wp/v2/posts";
const ALL_THE_POSTS = await getThePosts(postsURL+'?_fields=title,link,_links.wp:featuredmedia,date&per_page=8');
if(ALL_THE_POSTS){
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
}

async function getThePosts(postsURLValue){
    let result = {}

    try {
        await fetch(postsURLValue).then((response) => response.json()).then((data) =>{
            result = data;
        });
        
        return result;
    } catch (error) {
        POSTS_CONTAINER_EL.innerHTML = `
        <div class="no-post">
            <h3 class="no-post__title">Sem posts por enquanto</h3>
            <p class="no-post__message">Ficamos felizes que queira saber o que a Propago anda fazendo, mas infelizmente ainda não temos publicações em nosso blog. Aguarde até que tenhamos algo para lhe mostrar :)</p>
        </div>
        `;
        
        return false;
    }
}

async function getTheImageURL(imageURI){
    let imageURL = null

    let params = '?_fields=media_details';
    await fetch(imageURI+params).then((response) => response.json()).then((data) => {
        imageURL = data.media_details.sizes.medium.source_url;
    });

    return imageURL;
}