<script lang="ts">
	import pizza from '$lib/assets/pizza.png';
	import { phoneHeading, pizzaAngle } from '$lib/stores';
</script>

<img
	class="w-2/3 h-2/3 max-w-screen max-h-screen object-contain aspect-square"
	src={pizza}
	alt="pizza"
	style="transform: rotate({-180 + $pizzaAngle + $phoneHeading}deg)"
/>
