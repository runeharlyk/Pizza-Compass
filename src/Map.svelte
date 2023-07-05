<script>
    import { onDestroy } from 'svelte';
    import { onMount } from 'svelte';
    //import { heading } from './motion';
    export let lat;
	export let lng;
    export let place
    export let showMap
    export let placeType
	
    let zoom = 15;
	let container;
    let service
	let map;
    let heading = 0
   
   onMount(async () => {
       map = new google.maps.Map(container, {
           zoom,
           center: {lng, lat},
       });
       new google.maps.Marker({
        position:  {lng, lat},
        map,
        title: "You are here",
        icon:{
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            strokeColor: "#4C8BF5",
            scale: 7,
            rotation:{heading}*-1+360
          }
    });

       service = new google.maps.places.PlacesService(map);
       var request = {
            location: {lng, lat},
            //radius: '500',
            query: placeType,
            //opennow: true,
            fields: ["name", "geometry", "place_id"]
        };
        service.textSearch(request, callback); //findPlaceFromQuery
   });
   onDestroy(() => {
		if (map) map.remove();
	});

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //console.log(results);
            place = results
            //var places = []
            // place = results[0]
            for (let i = 0; i < results.length; i++) {
                const pizza = results[i];
                //places.push(pizza)
                new google.maps.Marker({
                    position:  {lat:pizza.geometry.location.lat(),lng:pizza.geometry.location.lng()},
                    map,
                    title: pizza.name,
                });
                if(i >= 5) return
            }
            //console.log(places);
            //place = places
            
        }
    }
</script>

<style>
.map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>

<div class:map bind:this={container} style="display:{showMap?"block":"none"}">
    {#if map}
        <slot />
    {/if}
</div>