import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import db from '../db';
import { useNavigate } from 'react-router-dom';

export default function ScannerScreen() {
  const [result, setResult] = useState<string>('');
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const { ref } = useZxing({
    paused,
    onDecodeResult(decodedResult) {
      const text = decodedResult.getText();
      setResult(text);
      setPaused(true);
      handleScan(text);
    },
    onError(error) {
      // ignore
    }
  });

  const handleScan = async (scannedId: string) => {
    const item = await db.items.get(scannedId);
    if (item) {
      alert(`Barang Ditemukan: ${item.name} (Stok: ${item.quantity})`);
      // Optionally route to a detail view
      navigate('/floor');
    } else {
      if (confirm(`Barang dengan Barcode ${scannedId} tidak ditemukan. Tambah baru?`)) {
        // Just route to floor for now where they can click Add
        navigate('/floor');
      } else {
        setPaused(false);
      }
    }
  };

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center relative">
      <video ref={ref} className="h-full w-full object-cover" />
      
      {/* Overlay for Scanner */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-4 border-primary-500 rounded-3xl opacity-80" />
        <p className="text-white mt-8 font-medium bg-black/50 px-4 py-2 rounded-full">
          Arahkan kamera ke Barcode
        </p>
      </div>

      {paused && (
        <div className="absolute bottom-24 z-20">
          <button 
            onClick={() => { setPaused(false); setResult(''); }}
            className="bg-white text-black font-bold px-6 py-3 rounded-full shadow-lg"
          >
            Scan Ulang
          </button>
        </div>
      )}
    </div>
  );
}
