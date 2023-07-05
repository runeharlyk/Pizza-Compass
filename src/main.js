import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		ready: false,
		location: false, //{lat:12,lng:55},
		error: false,
        place_type: "McDonald's" // "pizza"
	}
});

const locationLoop = () => {
	var geolocation = window.navigator.geolocation.watchPosition( 
        function ( pos ) {
            const crd = pos.coords;
			app.$set({ location:{lat:crd.latitude, lng:crd.longitude}})
        }, function (err) { 
            error = `ERROR(${err.code}): ${err.message}`;
        }, {
            maximumAge: 250, 
            enableHighAccuracy: true
        } 
    );
    window.setTimeout( function () {
            window.navigator.geolocation.clearWatch( geolocation ) 
        }, 
        5000
    );
}

const geolocation = () => {
	locationLoop()
	window.setTimeout(()=> locationLoop(), 30000)
}

const getPermsLocation = () => {
	navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted') {
            geolocation()
        } else if (result.state === 'prompt') {
            geolocation()
        } else if (result.state === 'denied') {
            error = result.state;
        }
        result.addEventListener('change', function() {
            error = "Location permission changed to: " + result.state;
        });
    });
}

window.initMap = function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    app.$set({ place_type: urlParams.has('type')?urlParams.getAll('type')[0]: "pizza" });
	getPermsLocation()
	app.$set({ ready: true });
}

export default app;