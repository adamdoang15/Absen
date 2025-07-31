export async function getCurrentLocation() {
  if (typeof window === "undefined" || !navigator.geolocation) {
    throw new Error("Geolocation tidak didukung di lingkungan ini.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(new Error("Gagal mendapatkan lokasi: " + error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
