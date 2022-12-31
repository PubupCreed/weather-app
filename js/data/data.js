document.addEventListener('alpine:init', () => {
    Alpine.data('weather', () => ({
        baseURL: `http://api.weatherapi.com/v1/`,
        key: `?key=162d6a0b39d54500a55194046222712`,
        city: Alpine.$persist(''),
        currentWeather: 'current.json',
        search: 'search.json',
        searchCity: '',
        searchResult: [],
        getWeather: [],
        preloader: true,
        openPopup: false,

        getData() {
            fetch(`${this.baseURL}${this.currentWeather}${this.key}&q=${this.city ? this.city : 'London'}`)
            .then(response => response.json())
            .then(data => this.getWeather = data)
        },

        searchData() {
            fetch(`${this.baseURL}${this.search}${this.key}&q=${this.searchCity}`)
            .then(response => response.json())
            .then(data => this.searchResult = data)
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