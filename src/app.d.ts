// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		AbsoluteOrientationSensor: {
			new (options?: SensorOptions): AbsoluteOrientationSensor;
			prototype: AbsoluteOrientationSensor;
		};
	}

	interface AbsoluteOrientationSensor extends Sensor {
		quaternion: Float32Array;
		addEventListener(
			type: 'reading' | 'activate' | 'error',
			listener: (this: AbsoluteOrientationSensor, ev: Event) => any
		): void;
		start(): void;
	}

	interface SensorOptions {
		frequency?: number;
		referenceFrame?: 'device' | 'screen';
	}
}

export {};
