'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        {name : 'profile', path:'/profile'},
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Venues', path: '/uservenues' },
        { name: 'Teams', path: '/dashboard' },
        { name: 'Challenges', path: '/dashboard' },
        {name: 'mybookings', path: '/mybookings'},
        
    ];

    return (
        <div className={`h-screen bg-gray-900 text-white flex ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    {!collapsed && <span className="text-lg font-bold">Dashboard</span>}
                    <button onClick={toggleSidebar} className="text-white p-2">
                        {collapsed ? <Menu /> : <X />}
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
                        >
                            <span className={`${collapsed ? 'hidden' : 'block'} ml-2`}>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
