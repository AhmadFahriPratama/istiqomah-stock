import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Layers, ChevronRight, ShoppingBag, Shirt, Sofa, Archive } from 'lucide-react-native';
import tw from '../styles/tw';
import * as SQLite from 'expo-sqlite';

export default function FloorScreen() {
  const [floors, setFloors] = useState<any[]>([]);

  useEffect(() => {
    const fetchFloors = async () => {
      const db = await SQLite.openDatabaseAsync('istiqomah-stock.db');
      const allRows = await db.getAllAsync('SELECT * FROM floors ORDER BY sort_order ASC');
      setFloors(allRows);
    };
    fetchFloors();
  }, []);

  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'shopping-bag': return <ShoppingBag color={color} size={32} />;
      case 'shirt': return <Shirt color={color} size={32} />;
      case 'sofa': return <Sofa color={color} size={32} />;
      case 'archive': return <Archive color={color} size={32} />;
      default: return <Layers color={color} size={32} />;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8FAFC]`}>
      <View style={tw`px-6 pt-12 pb-6 bg-white border-b border-gray-100`}>
        <Text style={tw`text-gray-900 font-bold text-3xl tracking-tight`}>Lantai Penyimpanan</Text>
        <Text style={tw`text-gray-500 font-medium mt-1`}>Pilih kategori untuk melihat stok</Text>
      </View>

      <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
        {floors.map((floor) => (
          <TouchableOpacity 
            key={floor.id} 
            style={tw`bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4 flex-row items-center`}
          >
            <View style={[tw`p-4 rounded-2xl mr-4`, { backgroundColor: `${floor.color}15` }]}>
              {getIcon(floor.icon, floor.color)}
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900 font-bold text-xl`}>{floor.name}</Text>
              <Text style={tw`text-gray-500 text-sm mt-1`}>{floor.description}</Text>
            </View>
            <View style={tw`bg-gray-50 p-2 rounded-full`}>
              <ChevronRight color="#94A3B8" size={24} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
