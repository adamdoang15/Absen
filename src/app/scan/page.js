"use client";

import QRScanner from "@/components/QRScanner";
import { useState } from "react";

export default function ScanPage() {
  const [scannedData, setScannedData] = useState(null);

  const handleScan = async (data) => {
    console.log("[ScanPage] QR Terdeteksi:", data);

    const saved = localStorage.getItem("userInfo");
    console.log("[ScanPage] userInfo dari localStorage:", saved);

    if (!saved) {
      alert("Perangkat belum terdaftar. Silakan daftar di menu 'Device'.");
      return;
    }

    const userInfo = JSON.parse(saved);

    // Kirim data ke spreadsheet
    const payload = {
      nama: userInfo.nama,
      kelas: userInfo.kelas,
      waktu: new Date().toISOString(),
      qr: data,
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwzjQMLlsFpx1eUBYcOle_QukrGjgsaODnUxwfyoOHSDlO9LKbbOCMEkYXolAyKcdqlSg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("[ScanPage] Response dari server:", result);
      alert(`✅ Scan berhasil: ${data}`);
      setScannedData(data);
    } catch (error) {
      console.error("[ScanPage] Gagal mengirim data:", error);
      alert("❌ Gagal mengirim data absensi.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-white p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-sky-700 mb-2">Scan QR Code</h1>
        <p className="text-gray-600">Arahkan kamera ke QR Code</p>
      </div>

      <div className="relative rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4 w-full max-w-sm">
        <QRScanner onScanSuccess={handleScan} />
      </div>
    </main>
  );
}
