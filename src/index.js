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
    instanceAPI.query = evt.target[0].value;
    console.log(instanceAPI);
    try {
        const response = await instanceAPI.getImages();
        if (response.data.hits.length > 0) {
            renderContent(response.data.hits);
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

async function onShowMore() {
    instanceAPI.incrementPage();    
    try {
        const response = await instanceAPI.getImages();
        renderContent(response.data.hits);
        if (instanceAPI.countHits >= response.data.totalHits) {
            refs.btnLoadMore.classList.add('is-hidden');
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        console.log('from catch')
    }
}

function renderContent(content) {
    const markup = renderAPI.creatGalleryItems(content);
    renderAPI.makeupContent(markup, refs.gallery);
    let gallery = new SimpleLightbox('.gallery a');
    refs.btnLoadMore.classList.remove('is-hidden');
}