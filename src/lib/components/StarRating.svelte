<script lang="ts">
	export let rating = 0;
	export let disabled = false;

	$: roundedRating = Math.round(rating * 2) / 2;
</script>

<div class="tooltip" data-tip={rating}>
	<div class="rating rating-lg rating-half">
		{#each Array(5) as _, index}
			<input type="radio" name="rating-{index}" class="rating-hidden" {disabled} />
			<input
				type="radio"
				name="rating-{index}"
				class="mask mask-star-2 mask-half-1 bg-yellow-300"
				checked={roundedRating === index + 0.5}
				{disabled}
			/>
			<input
				type="radio"
				name="rating-{index}"
				class="mask mask-star-2 mask-half-2 bg-yellow-300"
				checked={roundedRating === index + 1}
				{disabled}
			/>
		{/each}
	</div>
</div>
