interface Location {
  lat: number;
  lng: number;
}

export function calculateDistance(loc1: Location, loc2: Location): number {
  // Haversine formula for calculating distance between two points
  const R = 6371; // Earth's radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lng - loc1.lng);
  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

export function formatDistance(location: Location): string {
  const userLocation = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  const distance = calculateDistance(userLocation, location);
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`;
  }
  return `${distance.toFixed(1)} miles away`;
}