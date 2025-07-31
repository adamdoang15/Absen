// src/app/layout.js
import './globals.css'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'

export const metadata = {
  title: 'Absensi QR App',
  description: 'Absensi sekolah menggunakan QR dan device locking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen pt-14 pb-16">
        <Header />
        <main className="px-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
