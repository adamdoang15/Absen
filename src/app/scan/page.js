"use client";

import QRScanner from "@/components/QRScanner";
import { useState } from "react";

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);

  const handleScan = async (data) => {
    if (!data || scanning) return;
    setScanning(true);

    // Kirim data absensi dummy
    const payload = {
      nama: "Fulan",
      kelas: "10A",
      aktivitas: data,
      keterangan: "hadir"
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxGSj3CmApgYDL_U3LfCYPAmOS7LogwWyB3qMc5SYzaqWI6kFtmGfNtQ-6kv_7KdrWg_A/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert(`✅ Absensi berhasil untuk "${data}"`);
      } else {
        alert(`❌ Gagal: ${result.message || "Absensi gagal"}`);
      }
    } catch (error) {
      console.error("Gagal kirim:", error);
      alert("❌ Gagal mengirim data absensi.");
    }

    // Cegah double scan dalam 3 detik
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-xl font-bold mb-4">Scan QR Absensi</h1>
      <div className="rounded-lg shadow-md p-4 bg-gray-100 w-full max-w-sm">
        <QRScanner onScanSuccess={handleScan} />
      </div>
    </main>
  );
}
