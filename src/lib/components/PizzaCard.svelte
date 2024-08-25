<script lang="ts">
	import { pizzaDistance, pizzaIndex, pizzaPlace, pizzaPlaces } from '$lib/stores';
	import { formatDistance } from '$lib/utilities';
	import Rating from '$lib/components/StarRating.svelte';
</script>

<div class="card bg-neutral text-neutral-content w-96">
	{#if !$pizzaPlace}
		<div class="card-body flex flex-row gap-4 items-center p-6">
			<span class="loading loading-ring loading-lg"></span>
			<h2>Fetching the nearest pizzerias</h2>
		</div>
	{:else}
		<div class="card-body items-center text-center">
			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<button class="btn btn-circle" on:click={pizzaIndex.prev}>❮</button>
				<button class="btn btn-circle" on:click={pizzaIndex.next}>❯</button>
			</div>
			<h2 class="card-title">
				{$pizzaPlace.name}
				<br />
				{formatDistance($pizzaDistance)} away
			</h2>
			<Rating rating={$pizzaPlace.rating} disabled />
			<p></p>
			<div class="w-100 justify-end">
				({$pizzaIndex + 1} / {$pizzaPlaces.length})
			</div>
		</div>
	{/if}
</div>
