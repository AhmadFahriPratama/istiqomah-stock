import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { ScanLine, X } from 'lucide-react-native';
import tw from '../styles/tw';

export default function ScannerScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    // Di aplikasi nyata, navigasi ke detail item atau add transaction
    alert(`Barang dengan Barcode ${data} berhasil dipindai!`);
  };

  if (hasPermission === null) {
    return <View style={tw`flex-1 bg-black`} />;
  }
  if (hasPermission === false) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg font-medium text-gray-800`}>Akses Kamera Ditolak</Text>
        <Text style={tw`text-sm text-gray-500 mt-2 text-center px-8`}>
          Mohon izinkan akses kamera di pengaturan untuk menggunakan fitur Scanner Barcode.
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
        }}
      >
        {/* Overlay Scanner */}
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`w-64 h-64 border-2 border-white rounded-2xl bg-white/10 justify-center items-center`}>
             <ScanLine color="white" size={48} style={tw`opacity-50`} />
          </View>
          <Text style={tw`text-white font-medium text-lg mt-8 bg-black/50 px-4 py-2 rounded-full overflow-hidden`}>
            Arahkan kamera ke Barcode / QR Code
          </Text>
        </View>

        {/* Top Actions */}
        <View style={tw`absolute top-12 left-6 right-6 flex-row justify-between items-center`}>
          <Text style={tw`text-white font-bold text-2xl drop-shadow-md`}>Scanner</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-black/40 p-2 rounded-full`}>
            <X color="white" size={24} />
          </TouchableOpacity>
        </View>

        {scanned && (
          <View style={tw`absolute bottom-10 left-6 right-6`}>
             <TouchableOpacity 
               style={tw`bg-primary py-4 rounded-2xl shadow-lg items-center`}
               onPress={() => setScanned(false)}
             >
               <Text style={tw`text-white font-bold text-lg`}>Scan Lagi</Text>
             </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}
