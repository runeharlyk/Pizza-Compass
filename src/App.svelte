<script>
	import Map from './Map.svelte';
	import Background from './Background.svelte';
	import { reducedMotion } from './reducedMotion';
	import { heading } from './motion';
	import Fab, { Icon } from '@smui/fab';
	import Select, { Option } from '@smui/select';
	import StarRating from 'svelte-star-rating';
	export let ready;
	export let location
	export let error
	export let place_type

	let showMap = false
	let place
	let pizza = undefined

	$: angle = bearing(location.lat, location.lng, pizza?.geometry.location.lat(),pizza?.geometry.location.lng())
	$: distance = formatDistance(calcDistance(location.lat, location.lng, pizza?.geometry.location.lat(),pizza?.geometry.location.lng()))

	const toRadians = (degrees) => {return degrees * Math.PI / 180}
	const toDegrees = (radians) => {return radians * 180 / Math.PI}
	const bearing = (startLat, startLng, destLat, destLng) => {
		startLat = toRadians(startLat);
		startLng = toRadians(startLng);
		destLat = toRadians(destLat);
		destLng = toRadians(destLng);

		var y = Math.sin(destLng - startLng) * Math.cos(destLat);
		var x = Math.cos(startLat) * Math.sin(destLat) -
				Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
		var brng = Math.atan2(y, x);
		var brng = toDegrees(brng)||0;
		return (brng + 360) % 360;
	}
	const calcDistance = (lat, lng, endlat, endlng) => {
		const latLongDegToMeters = 111139
    	return Math.sqrt(((lng - endlng))**2, ((lat - endlat))**2)*latLongDegToMeters
	}
	const formatDistance = distance => {
		if (distance >= 1000) return Math.round(distance / 1000.0) + " km"
		else if (distance >= 100) return Math.round(distance) + " m"
		return distance.toFixed(1) + " m"
  	}

	// <h2>{place.name}<br />{distance} away<br />rating: {place.rating||"unknown"}</h2>
</script>

<svelte:head>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPLpoMuYCR-I0scqUY2M6HC3xYsONavWI&callback=initMap&libraries=places&">
	</script>
	<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
</svelte:head>

<main>
	<h1>Hello Hungry</h1>
	{ #if ready && location && !error}
		<Map {...location} placeType={place_type} bind:place bind:showMap></Map>
		{ #if !showMap}
			<img class="pizza" src="images/pizza.png" alt="pizza" style="transform: rotate({-180+angle+$heading}deg)" />
		{ /if }
	{ /if }
	
	{ #if Array.isArray(place)}
		<Select bind:value={pizza} key={(pizza) => `${(pizza && pizza.id) || ''}`} class="selector">
			{#each place as pl (pl.name)}
			  <Option value={pl} color="white" class="selector">{pl.name} <StarRating config={{size: 5}} rating={pl.rating} /></Option>
			{/each}

		</Select>
		<h2 >{pizza?.name}<br />{distance} away<br /><StarRating style="justify-content: center" rating={pizza?.rating||0} /></h2>
	{ /if }

	

	<div class="actions">
		<Fab on:click={() => console.log("call")}>
			<Icon class="material-icons">call</Icon>
		</Fab>
		<Fab on:click={() => showMap = !showMap}>
			<Icon class="material-icons">map</Icon>
		</Fab>
	</div>
	{#if !$reducedMotion}
		<Background />
	{/if}
</main>
 
<style>
	* :global(.selector .mdc-select__selected-text) {
		color: white! important;
	}
	* :global(.selector .mdc-select__dropdown-icon) {
		color: white! important;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.actions{
		position: absolute;
		bottom: 0;
		left: 0;
		width: -webkit-fill-available;
		height: 30vh;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.pizza {
		width: calc(min(100vw, 100vh) / 2);
		height: calc(min(100vw, 100vh) / 2);
		/*transition: transform 0.2s ease-out;*/
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>