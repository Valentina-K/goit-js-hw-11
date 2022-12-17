function clearContent(elem) {
    elem.innerHTML = '';
}
    
function creatGalleryItems(items) {
    return items.map(({ webformatURL, largeImageURL, tags,likes,views,comments,downloads }) => {
        return ` 
        <div class="photo-card">      
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}">
            </a>
            <div class="info">
                <p class="info-item">
                    <span class="info-item__value"><b>Likes</b></span>
                    <span class="info-item__value">${likes}</span>
                </p>
                <p class="info-item">
                    <span class="info-item__value"><b>Views</b></span>
                    <span class="info-item__value">${views}</span>
                </p>
                <p class="info-item">
                    <span class="info-item__value"><b>Comments</b></span>
                    <span class="info-item__value">${comments}</span>
                </p>
                <p class="info-item">
                    <span class="info-item__value"><b>Downloads</b></span>
                    <span class="info-item__value">${downloads}</span>
                </p>
            </div>
        </div>`;
    }).join('');
};

function makeupContent(markup, elem) {   
    elem.insertAdjacentHTML('beforeend', markup);
}

export default { clearContent, creatGalleryItems, makeupContent};