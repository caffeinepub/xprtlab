/**
 * GPS validation utilities for attendance verification.
 */

/** Maximum acceptable GPS accuracy in meters */
export const MAX_GPS_ACCURACY_METERS = 4000;

/**
 * Validates that the GPS accuracy reading is within the acceptable threshold.
 * Returns true if accuracy is good enough (lower value = more accurate).
 */
export function validateGPSAccuracy(accuracyMeters: number): boolean {
  return accuracyMeters <= MAX_GPS_ACCURACY_METERS;
}

/**
 * Alias kept for backward compatibility.
 */
export function checkGPSAccuracy(accuracyMeters: number): boolean {
  return validateGPSAccuracy(accuracyMeters);
}

/**
 * Haversine formula — returns distance in meters between two lat/lng points.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000; // Earth radius in metres
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
  return R * c;
}

/**
 * Heuristic mock/spoofed location detection.
 */
export function detectMockLocation(
  latitude: number,
  longitude: number,
  accuracy: number,
): boolean {
  if (latitude === 0 && longitude === 0) return true;
  if (accuracy < 1) return true;
  if (Number.isInteger(latitude) && Number.isInteger(longitude)) return true;
  return false;
}

/**
 * Checks whether a coordinate is within a circular geofence.
 */
export function isWithinGeofence(
  lat: number,
  lon: number,
  centerLat: number,
  centerLon: number,
  radiusMeters: number,
): boolean {
  return haversineDistance(lat, lon, centerLat, centerLon) <= radiusMeters;
}

/**
 * Detects an implausible speed jump between two consecutive GPS readings.
 */
export function detectSpeedJump(
  prevLat: number,
  prevLon: number,
  prevTimestamp: number,
  currLat: number,
  currLon: number,
  currTimestamp: number,
  maxSpeedKmh = 200,
): boolean {
  const distanceMeters = haversineDistance(prevLat, prevLon, currLat, currLon);
  const elapsedSeconds = (currTimestamp - prevTimestamp) / 1000;

  if (elapsedSeconds <= 0) return false;

  const speedKmh = (distanceMeters / elapsedSeconds) * 3.6;
  return speedKmh > maxSpeedKmh;
}
