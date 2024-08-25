import { browser } from '$app/environment';
import { derived, get, readable, writable, type Readable, type Writable } from 'svelte/store';

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

export const geolocation: Readable<google.maps.LatLngLiteral> = readable(
	{ lat: 0, lng: 0 },
	(set) => {
		if (!browser) return;
		if (navigator.geolocation) {
			const success = (pos: GeolocationPosition) => {
				const { latitude, longitude } = pos.coords;
				set({ lat: latitude, lng: longitude });
			};

			const error = () => set({ lat: -1, lng: -1 });

			const watchId = navigator.geolocation.watchPosition(success, error, options);

			return () => navigator.geolocation.clearWatch(watchId);
		}
	}
);

const toRadians = (degrees: number) => {
	return (degrees * Math.PI) / 180;
};

const toDegrees = (radians: number) => {
	return (radians * 180) / Math.PI;
};

export const pizzaPlaces: Writable<google.maps.places.PlaceResult[]> = writable();

const createPizzaIndex = () => {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		next: () => update((n) => (n + 1) % get(pizzaPlaces).length),
		prev: () => update((n) => (get(pizzaPlaces).length + n - 1) % get(pizzaPlaces).length),
		update,
		set,
		reset: () => set(0)
	};
};
export const pizzaIndex = createPizzaIndex();

export const pizzaPlace: Readable<google.maps.places.PlaceResult> = derived(
	[pizzaPlaces, pizzaIndex],
	([$pizzaPlaces, $pizzaIndex]) => {
		return $pizzaPlaces ? $pizzaPlaces[$pizzaIndex] : $pizzaPlaces;
	}
);

export const pizzaLocation: Readable<google.maps.LatLngLiteral> = derived(pizzaPlace, ($pizza) => {
	return {
		lat: $pizza?.geometry ? $pizza.geometry?.location.lat() : 0,
		lng: $pizza?.geometry ? $pizza.geometry?.location.lng() : 0
	};
});

export const pizzaAngle = derived(
	[geolocation, pizzaLocation],
	([$geolocation, $pizzaLocation]) => {
		const deviceLat = $geolocation.lat;
		const deviceLng = $geolocation.lng;
		const pizzaLat = $pizzaLocation.lat;
		const pizzaLng = $pizzaLocation.lng;

		if (!deviceLat || !deviceLng || !pizzaLat || !pizzaLng) return 0;

		const φ1 = toRadians(deviceLat);
		const φ2 = toRadians(pizzaLat);
		const Δλ = toRadians(pizzaLng - deviceLng);

		const y = Math.sin(Δλ) * Math.cos(φ2);
		const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
		const θ = Math.atan2(y, x);

		return (toDegrees(θ) + 360) % 360;
	}
);

export const pizzaDistance = derived(
	[geolocation, pizzaLocation],
	([$geolocation, $pizzaLocation]) => {
		const latLongDegToMeters = 111139;
		const deviceLat = $geolocation.lat;
		const deviceLng = $geolocation.lng;
		const pizzaLat = $pizzaLocation.lat;
		const pizzaLng = $pizzaLocation.lng;
		if (!deviceLat || !deviceLng || !pizzaLat || !pizzaLng) return -1;
		return (
			Math.sqrt((deviceLng - pizzaLng) ** 2 + (deviceLat - pizzaLat) ** 2) * latLongDegToMeters
		);
	}
);
