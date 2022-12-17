import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './getPixabay';
import renderAPI from './renderingPage';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
let gallery = new SimpleLightbox('.gallery a',
    { captionDelay: 250, captionsData: 'alt', captionPosition: 'bottom' });

async function onSearch(evt) {
    evt.preventDefault();
    renderAPI.clearContent(refs.gallery);
    const response = await API.getImages(evt.target[0].value);
    if (response.data.hits.length > 0) {
        const markup = renderAPI.creatGalleryItems(response.data.hits);
        renderAPI.renderContent(markup, refs.gallery);
    }
}

