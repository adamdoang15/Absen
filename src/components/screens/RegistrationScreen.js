"use client";
import { useState, useEffect } from "react";

export default function RegistrationScreen({ onRegister }) {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userInfo");
    console.log("[RegistrationScreen] userInfo dari localStorage:", saved);

    if (saved) {
      setRegistered(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = { nama, kelas };
    console.log("[RegistrationScreen] Menyimpan userInfo:", userInfo);

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setRegistered(true);
    onRegister?.(userInfo);
  };

  if (registered) {
    const saved = localStorage.getItem("userInfo");
    const { nama, kelas } = JSON.parse(saved);

    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Sudah Terdaftar</h2>
        <p>Nama: {nama}</p>
        <p>Kelas: {kelas}</p>
        <p className="mt-2 text-green-600">
          Perangkat siap digunakan untuk absensi.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pendaftaran Perangkat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Daftarkan Perangkat
        </button>
      </form>
    </div>
  );
}
