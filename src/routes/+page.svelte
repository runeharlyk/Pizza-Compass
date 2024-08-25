<script>
	import LiveBackground from '$lib/components/LiveBackground.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import { geolocation } from '$lib/stores';

	import PizzaNeedle from '$lib/components/PizzaNeedle.svelte';
	import PizzaCard from '$lib/components/PizzaCard.svelte';

	let showMap = false;
</script>

<div class="flex flex-col items-center p-10 h-screen overflow-hidden">
	<h1 class="lg:text-6xl text-5xl text-orange-500 uppercase text-center">Looking for pizza?</h1>

	<PizzaNeedle />

	<PizzaCard />
</div>

<LiveBackground />

<Map center={$geolocation} hidden={!showMap} />
