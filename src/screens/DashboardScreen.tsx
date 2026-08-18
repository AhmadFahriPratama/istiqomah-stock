import React, { useEffect, useState } from 'react';
import db from '../db';
import { Package, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

export default function DashboardScreen() {
  const items = useLiveQuery(() => db.items.toArray()) || [];
  
  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = items.length;
  const lowStock = items.filter(i => i.quantity > 0 && i.quantity < 5).length;
  const outOfStock = items.filter(i => i.quantity === 0).length;

  return (
    <div className="p-6">
      <header className="mb-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">Istiqomah Stock</h1>
        <p className="text-gray-500 text-sm">Dashboard Ringkasan</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard 
          icon={<Package className="text-primary-500" size={24} />} 
          title="Total Produk" 
          value={totalItems} 
          bg="bg-primary-50"
        />
        <StatCard 
          icon={<TrendingUp className="text-blue-500" size={24} />} 
          title="Total Stok" 
          value={totalStock} 
          bg="bg-blue-50"
        />
        <StatCard 
          icon={<AlertCircle className="text-orange-500" size={24} />} 
          title="Stok Menipis" 
          value={lowStock} 
          bg="bg-orange-50"
        />
        <StatCard 
          icon={<RefreshCw className="text-red-500" size={24} />} 
          title="Stok Habis" 
          value={outOfStock} 
          bg="bg-red-50"
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Produk Terbaru</h2>
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <Package className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">Belum ada data barang.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {items.slice(0, 5).map((item, index) => (
              <div key={item.id} className={`p-4 flex items-center justify-between ${index !== items.slice(0, 5).length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">ID: {item.id} &bull; {item.location}</p>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-lg">
                  <span className="font-bold text-primary-600">{item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, bg }: { icon: React.ReactNode, title: string, value: number | string, bg: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start">
      <div className={`p-3 rounded-xl mb-3 ${bg}`}>
        {icon}
      </div>
      <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
