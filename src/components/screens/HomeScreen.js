'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function HomeScreen() {
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const qrCode = new Html5Qrcode('qr-reader');
    html5QrCodeRef.current = qrCode;

    qrCode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          console.log("✅ Scanned:", decodedText);
          qrCode.stop().then(() => {
            qrCode.clear();
          });
        },
        (errorMessage) => {
          // Optional: console.log("Scan error:", errorMessage);
        }
      )
      .catch((err) => console.error("Scanner error:", err));

    return () => {
      // Hentikan kamera saat komponen keluar (pindah tab)
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
          console.log("📴 Kamera dimatikan");
        }).catch((err) => {
          console.warn("❌ Gagal stop kamera:", err);
        });
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div id="qr-reader" className="w-full max-w-md aspect-square rounded-lg shadow-lg" />
      <p className="mt-4 text-gray-600">Arahkan kamera ke QR Code aktivitas</p>
    </div>
  );
}
