import React, { useState } from 'react';
import db, { type Item } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function FloorScreen() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const items = useLiveQuery(
    () => db.items
      .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search))
      .toArray(),
    [search]
  ) || [];

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: Item = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      quantity: parseInt(formData.get('quantity') as string, 10),
      location: formData.get('location') as string,
      updatedAt: Date.now()
    };

    try {
      if (editingItem && editingItem.id !== newItem.id) {
        // If ID changed, delete old one and put new
        await db.items.delete(editingItem.id);
      }
      await db.items.put(newItem);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      alert('Error saving item: ' + error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      await db.items.delete(id);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <header className="mb-6 mt-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Stok</h1>
          <p className="text-gray-500 text-sm">{items.length} Barang terdaftar</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="bg-primary-600 text-white p-3 rounded-full shadow-md hover:bg-primary-700 transition"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Cari ID atau nama barang..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500">ID: {item.id} &bull; {item.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                {item.quantity}
              </span>
              <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-500 p-1">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Tidak ada barang ditemukan.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">{editingItem ? 'Edit Barang' : 'Tambah Barang Baru'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID / Barcode</label>
                <input required name="id" defaultValue={editingItem?.id} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                <input required name="name" defaultValue={editingItem?.name} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kuantitas</label>
                  <input required name="quantity" defaultValue={editingItem?.quantity ?? 0} min="0" type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi/Rak</label>
                  <input required name="location" defaultValue={editingItem?.location} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">Batal</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
