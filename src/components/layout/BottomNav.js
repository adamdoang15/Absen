// src/components/layout/BottomNav.js
'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Scan', path: '/scan', icon: '📷' },
    { label: 'Riwayat', path: '/history', icon: '📜' },
    { label: 'Device', path: '/register', icon: '🔒' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`flex flex-col items-center text-sm ${
            pathname === item.path ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
