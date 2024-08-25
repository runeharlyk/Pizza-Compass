export const formatDistance = (distance: number) => {
	if (distance >= 1000) return Math.round(distance / 100) / 10 + ' km';
	else if (distance >= 100) return Math.round(distance) + ' m';
	return distance.toFixed(1) + ' m';
};
