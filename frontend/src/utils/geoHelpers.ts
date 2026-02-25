/**
 * Geo-based utility functions for attendance validation.
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Maximum acceptable GPS accuracy in meters.
 * Readings with accuracy above this threshold are rejected.
 */
export const MAX_GPS_ACCURACY_METERS = 150;

/**
 * Compute the haversine distance in meters between two GPS coordinate pairs.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c * 1000; // meters
}

/**
 * Returns true if GPS accuracy is within MAX_GPS_ACCURACY_METERS (150 meters).
 */
export function checkGPSAccuracy(position: GeolocationPosition): boolean {
  return position.coords.accuracy <= MAX_GPS_ACCURACY_METERS;
}

/**
 * Detects mock/spoofed location using browser flags.
 */
export function detectMockLocation(position: GeolocationPosition): boolean {
  // Check for mocked flag (available in some browsers/environments)
  const coords = position.coords as GeolocationCoordinates & { mocked?: boolean };
  if (coords.mocked === true) return true;
  return false;
}

/**
 * Returns true if current position is within radiusMeters of the target.
 */
export function isWithinGeofence(
  currentLat: number,
  currentLon: number,
  targetLat: number,
  targetLon: number,
  radiusMeters: number,
): boolean {
  const dist = haversineDistance(currentLat, currentLon, targetLat, targetLon);
  return dist <= radiusMeters;
}

/**
 * Detects suspicious speed jumps between two GPS readings.
 * Returns { isJump, speed (km/h), distance (km) }
 */
export function detectSpeedJump(
  prevLat: number,
  prevLon: number,
  prevTimestamp: number,
  currentLat: number,
  currentLon: number,
  currentTimestamp: number,
  maxSpeedKmh = 120,
): { isJump: boolean; speed: number; distance: number } {
  const distanceMeters = haversineDistance(prevLat, prevLon, currentLat, currentLon);
  const distanceKm = distanceMeters / 1000;
  const elapsedMs = currentTimestamp - prevTimestamp;
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  if (elapsedHours <= 0) {
    return { isJump: false, speed: 0, distance: distanceKm };
  }

  const speed = distanceKm / elapsedHours;
  return {
    isJump: speed > maxSpeedKmh,
    speed,
    distance: distanceKm,
  };
}
