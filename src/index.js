import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './getPixabay';
import renderAPI from './renderingPage';
import Notiflix from "notiflix";

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

const instanceAPI = new API();
refs.searchForm.addEventListener('submit', onSearch);
refs.searchForm.addEventListener('blur', onGotFocus);
refs.btnLoadMore.addEventListener('click', onShowMore);

async function onSearch(evt) {
    evt.preventDefault();
    refs.btnLoadMore.classList.add('is-hidden');
    renderAPI.clearContent(refs.gallery);
    try {
        const response = await instanceAPI.getImages(evt.target[0].value);
        //totalHits 
        if (response.data.hits.length > 0) {
            const markup = renderAPI.creatGalleryItems(response.data.hits);
            renderAPI.renderContent(markup, refs.gallery);
            let gallery = new SimpleLightbox('.gallery a');
            refs.btnLoadMore.classList.remove('is-hidden');
        }
        else {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    }
    catch {
        console.log('from catch')        
    }      
}

function onGotFocus(evt) {
    evt.target[0].value = '';
}

function onShowMore(evt) {
    instanceAPI.incrementPage();
}
