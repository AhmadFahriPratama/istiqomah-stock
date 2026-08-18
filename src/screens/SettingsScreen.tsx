import React from 'react';
import { Info, LogOut, Trash2 } from 'lucide-react';
import db from '../db';

export default function SettingsScreen() {
  const handleClearData = async () => {
    if (confirm('PERINGATAN: Semua data barang akan dihapus. Yakin?')) {
      await db.items.clear();
      alert('Data berhasil dihapus.');
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full text-blue-500">
            <Info size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Tentang Aplikasi</p>
            <p className="text-xs text-gray-500">Istiqomah Stock v2.0 (Web-First)</p>
          </div>
        </div>

        <button 
          onClick={handleClearData}
          className="w-full p-4 border-b border-gray-50 flex items-center gap-4 hover:bg-gray-50 transition text-left"
        >
          <div className="bg-red-50 p-3 rounded-full text-red-500">
            <Trash2 size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Hapus Semua Data</p>
            <p className="text-xs text-gray-500">Kosongkan database lokal</p>
          </div>
        </button>

        <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition text-left">
          <div className="bg-gray-100 p-3 rounded-full text-gray-500">
            <LogOut size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Keluar</p>
            <p className="text-xs text-gray-500">Tutup sesi aplikasi</p>
          </div>
        </button>
      </div>
      
      <p className="text-center text-gray-400 text-xs mt-8">
        Developed for Istiqomah Stock
      </p>
    </div>
  );
}
