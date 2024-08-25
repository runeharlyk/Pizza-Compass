<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<script
		defer
		async
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPLpoMuYCR-I0scqUY2M6HC3xYsONavWI&callback=initMap&libraries=places&"
	>
	</script>
</svelte:head>

<slot />
