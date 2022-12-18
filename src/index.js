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
    searchInput: document.querySelector('.searchTerm'),
}

const instanceAPI = new API();
refs.searchForm.addEventListener('submit', onSearch);
refs.searchInput.addEventListener('focus', onGotFocus);
refs.btnLoadMore.addEventListener('click', onShowMore);
let gallery;

async function onSearch(evt) {
    evt.preventDefault();
    refs.btnLoadMore.classList.add('is-hidden');
    renderAPI.clearContent(refs.gallery);
    instanceAPI.query = evt.currentTarget.searchQuery.value;
    evt.currentTarget.searchQuery.blur();
    try {
        const response = await instanceAPI.getImages();
        if (response.data.hits.length > 0) {
            Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
            renderContent(response.data.hits);
            gallery = new SimpleLightbox('.gallery a');
            
        }
        else {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    }
    catch {
        refs.btnLoadMore.classList.add('is-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");        
    }      
}

function onGotFocus(evt) {
    evt.currentTarget.value = '';
}

async function onShowMore() {
    instanceAPI.incrementPage();       
    try {
        const response = await instanceAPI.getImages();
        if (instanceAPI.countHits >= response.data.totalHits) {
            throw (error);
        }
        console.log(response);
        renderContent(response.data.hits);
        gallery.refresh();
    } catch (error) {
        refs.btnLoadMore.classList.add('is-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
}

function renderContent(content) {
    const markup = renderAPI.creatGalleryItems(content);
    renderAPI.makeupContent(markup, refs.gallery);
    
    refs.btnLoadMore.classList.remove('is-hidden');
}

