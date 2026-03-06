/**
 * Device fingerprinting utilities for device binding and security checks.
 */

export function getDeviceId(): string {
  const key = "xpertlab_deviceId";
  let deviceId = localStorage.getItem(key);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(key, deviceId);
  }
  return deviceId;
}

export function parseUserAgent(): { deviceModel: string; osVersion: string } {
  const ua = navigator.userAgent;

  // Detect OS
  let osVersion = "Unknown OS";
  if (/Windows NT 10/.test(ua)) osVersion = "Windows 10";
  else if (/Windows NT 6\.3/.test(ua)) osVersion = "Windows 8.1";
  else if (/Windows NT 6\.2/.test(ua)) osVersion = "Windows 8";
  else if (/Windows NT 6\.1/.test(ua)) osVersion = "Windows 7";
  else if (/Mac OS X ([\d_]+)/.test(ua)) {
    const match = ua.match(/Mac OS X ([\d_]+)/);
    osVersion = `macOS ${match ? match[1].replace(/_/g, ".") : ""}`;
  } else if (/Android ([\d.]+)/.test(ua)) {
    const match = ua.match(/Android ([\d.]+)/);
    osVersion = `Android ${match ? match[1] : ""}`;
  } else if (/iPhone OS ([\d_]+)/.test(ua)) {
    const match = ua.match(/iPhone OS ([\d_]+)/);
    osVersion = `iOS ${match ? match[1].replace(/_/g, ".") : ""}`;
  } else if (/Linux/.test(ua)) {
    osVersion = "Linux";
  }

  // Detect browser/device model
  let deviceModel = "Unknown Browser";
  if (/Edg\//.test(ua)) {
    const match = ua.match(/Edg\/([\d.]+)/);
    deviceModel = `Edge ${match ? match[1] : ""}`;
  } else if (/Chrome\/([\d.]+)/.test(ua) && !/Chromium/.test(ua)) {
    const match = ua.match(/Chrome\/([\d.]+)/);
    deviceModel = `Chrome ${match ? match[1] : ""}`;
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    const match = ua.match(/Firefox\/([\d.]+)/);
    deviceModel = `Firefox ${match ? match[1] : ""}`;
  } else if (/Safari\/([\d.]+)/.test(ua) && !/Chrome/.test(ua)) {
    const match = ua.match(/Version\/([\d.]+)/);
    deviceModel = `Safari ${match ? match[1] : ""}`;
  }

  return { deviceModel, osVersion };
}

export function getDeviceFingerprint(): {
  deviceId: string;
  deviceModel: string;
  osVersion: string;
} {
  const deviceId = getDeviceId();
  const { deviceModel, osVersion } = parseUserAgent();
  return { deviceId, deviceModel, osVersion };
}
