// https://svelte.dev/repl/e9b0322383bd4922bed92056c106c643?version=3.34.0
import { readable } from 'svelte/store';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const getInitialMotionPreference = () =>
	window.matchMedia(reducedMotionQuery).matches;

export const reducedMotion = readable(getInitialMotionPreference(), (set) => {
	const updateMotionPreference = (event) => {
		set(event.matches);
	};

	const mediaQueryList = window.matchMedia(reducedMotionQuery);
	mediaQueryList.addEventListener('change', updateMotionPreference);

	return () => {
		mediaQueryList.removeEventListener('change', updateMotionPreference);
	};
});