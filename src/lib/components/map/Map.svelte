<script lang="ts">
	import { pizzaPlaces } from '$lib/stores';

	let container: HTMLElement;

	let map: google.maps.Map<Element>;
	let marker;
	let zoom = 18;
	let service;
	let placeType = 'pizza';

	export let center;
	export let hidden = false;

	$: {
		if (center.lat && center.lng) {
			setupMap();
		}
	}

	const setupMap = () => {
		if (!google) return;

		map = new google.maps.Map(container, {
			zoom,
			center: center
		});

		marker = new google.maps.Marker({
			position: center,
			map: map,
			title: 'You are here'
		});

		service = new google.maps.places.PlacesService(map);
		var request = {
			location: center,
			query: placeType,
			//opennow: true,
			fields: ['name', 'geometry', 'place_id']
		};
		service.textSearch(request, handlePizza);
	};

	const handlePizza = (
		results: google.maps.places.PlaceResult[],
		status: google.maps.places.PlacesServiceStatus
	) => {
		if (status == google.maps.places.PlacesServiceStatus.OK) pizzaPlaces.set(results);
	};
</script>

<div class="w-full h-screen" class:hidden bind:this={container}></div>
