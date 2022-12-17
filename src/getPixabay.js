import axios from 'axios';
//const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32106201-0c90331702e18f870e8d36f12';

export default class ImageApiServices {
    constructor() {
        this.page = 1;
    }

    async getImages(category) {
    console.log(encodeURIComponent('red rose'))
    
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                key: KEY,
                q: encodeURIComponent(category),
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: 40,
                page: this.page,
            }
        });
        return response;    
    }

    incrementPage() {
        this.page += 1;
    }
}



