document.addEventListener('alpine:init', () => {
    Alpine.data('weather', () => ({
        baseURL: `http://api.weatherapi.com/v1/`,
        key: `?key=162d6a0b39d54500a55194046222712`,
        city: Alpine.$persist(''),
        searchCity: '',
        searchResult: [],
        getWeather: [],
        preloader: true,
        openPopup: false,

        async getData() {
            const res = await fetch(`${this.baseURL}current.json${this.key}&q=${this.city ? this.city : 'London'}`);
            this.getWeather = await res.json();
        },

        async searchData() {
            const res = await fetch(`${this.baseURL}search.json${this.key}&q=${this.searchCity}`);
            this.searchResult = await res.json();
        },

        updateCity(item) {
            this.city = item;
            this.togglePopup();
        },

        updateData() {
            setInterval(() => this.getData(), 60000)
        },

        togglePopup() {
            this.searchCity = ''
            this.openPopup = !this.openPopup
        },

        togglePreloader() {
            window.addEventListener('load', () => this.preloader = !this.preloader)
        }
    }))
})