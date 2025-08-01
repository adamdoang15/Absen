"use client";

import QRScanner from "@/components/QRScanner";
import { useState } from "react";

const allowedActivities = [
  "Upacara",
  "Belajar Pagi",
  "Shalat Dhuha",
  "Istirahat",
  "Belajar Siang",
  "Shalat Dzuhur",
  "Belajar Malam",
];

export default function ScanPage() {
  const [scannedData, setScannedData] = useState(null);

  const handleScan = async (data) => {
    const saved = localStorage.getItem("userInfo");
    if (!saved) {
      alert("Perangkat belum terdaftar. Silakan daftar di menu 'Device'.");
      return;
    }

    // Validasi QR (apakah termasuk kegiatan yang diizinkan?)
    if (!allowedActivities.includes(data)) {
      alert(`❌ Kegiatan "${data}" tidak terdaftar.`);
      return;
    }

    const userInfo = JSON.parse(saved);
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const scanHistoryRaw = localStorage.getItem("scanHistory");
    const scanHistory = scanHistoryRaw ? JSON.parse(scanHistoryRaw) : {};

    const todayHistory = scanHistory[today] || [];

    if (todayHistory.includes(data)) {
      alert(`❌ Kamu sudah absen untuk kegiatan "${data}" hari ini.`);
      return;
    }

    const payload = {
      nama: userInfo.nama,
      kelas: userInfo.kelas,
      aktivitas: data,         // Nama kegiatan dari QR
      keterangan: "hadir",     // Selalu hadir jika berhasil scan
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwmw9Lk-e1NoxgqqV6Og6PLokxNXElTD2Sy_xlaEvUx7pa5EqadCY5zLM_8DjKcXfR7Pw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("[ScanPage] Response dari server:", result);

      // Simpan ke histori
      const updatedTodayHistory = [...todayHistory, data];
      const updatedScanHistory = { ...scanHistory, [today]: updatedTodayHistory };
      localStorage.setItem("scanHistory", JSON.stringify(updatedScanHistory));

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
        <p className="text-gray-600">Arahkan kamera ke QR Code kegiatan</p>
      </div>

      <div className="relative rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4 w-full max-w-sm">
        <QRScanner onScanSuccess={handleScan} />
      </div>
    </main>
  );
}
