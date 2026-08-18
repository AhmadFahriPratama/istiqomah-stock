import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { PieChart, LineChart } from 'react-native-gifted-charts';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle, Box, TrendingUp, Package } from 'lucide-react-native';
import tw from '../styles/tw';
import * as SQLite from 'expo-sqlite';

export default function DashboardScreen() {
  const [stats, setStats] = useState({ totalItems: 0, criticalItems: 0 });
  const [floorData, setFloorData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const db = await SQLite.openDatabaseAsync('istiqomah-stock.db');
    
    // Mocking data based on PDF since it's an empty DB initially
    // In real app, we would query: SELECT count(*) from items where qty < min_qty
    setStats({ totalItems: 513, criticalItems: 8 });
    
    setFloorData([
      { value: 42.5, color: '#8B5CF6', text: 'Gudang' },
      { value: 27.7, color: '#6366F1', text: 'Harian' },
      { value: 17.3, color: '#3B82F6', text: 'Pakaian' },
      { value: 12.5, color: '#EC4899', text: 'Perabot' },
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8FAFC]`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-20`}>
        
        {/* Header Section */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`px-6 pt-12 pb-16 rounded-b-3xl`}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-white/80 font-medium text-lg`}>Istiqomah Stock</Text>
              <Text style={tw`text-white font-bold text-3xl tracking-tight mt-1`}>Dashboard</Text>
            </View>
            <TouchableOpacity style={tw`bg-white/20 p-3 rounded-full`}>
              <AlertCircle color="white" size={24} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Stats Cards */}
        <View style={tw`flex-row px-4 -mt-10 justify-between`}>
          
          <View style={tw`flex-1 bg-white mx-2 p-4 rounded-2xl shadow-sm border border-gray-100 flex-row items-center`}>
            <View style={tw`bg-indigo-50 p-3 rounded-xl mr-3`}>
              <Box color="#6366F1" size={24} />
            </View>
            <View>
              <Text style={tw`text-gray-500 text-xs font-medium`}>Total Item</Text>
              <Text style={tw`text-gray-900 font-bold text-xl`}>{stats.totalItems}</Text>
            </View>
          </View>

          <View style={tw`flex-1 bg-white mx-2 p-4 rounded-2xl shadow-sm border border-gray-100 flex-row items-center`}>
            <View style={tw`bg-red-50 p-3 rounded-xl mr-3`}>
              <AlertCircle color="#EF4444" size={24} />
            </View>
            <View>
              <Text style={tw`text-gray-500 text-xs font-medium`}>Stok Kritis</Text>
              <Text style={tw`text-red-500 font-bold text-xl`}>{stats.criticalItems}</Text>
            </View>
          </View>
        </View>

        {/* Chart Section - Distribusi Lantai */}
        <View style={tw`px-6 mt-8`}>
          <Text style={tw`text-gray-900 font-bold text-lg mb-4`}>Distribusi Stok per Lantai</Text>
          <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-gray-100 items-center justify-center`}>
            {floorData.length > 0 && (
              <PieChart
                donut
                radius={90}
                innerRadius={60}
                data={floorData}
                centerLabelComponent={() => {
                  return (
                    <View style={tw`justify-center items-center`}>
                      <Text style={tw`text-2xl font-bold text-gray-800`}>513</Text>
                      <Text style={tw`text-xs text-gray-500`}>Total Item</Text>
                    </View>
                  );
                }}
              />
            )}
            
            <View style={tw`flex-row flex-wrap justify-center mt-6`}>
              {floorData.map((item, index) => (
                <View key={index} style={tw`flex-row items-center mx-3 my-1`}>
                  <View style={[tw`w-3 h-3 rounded-full mr-2`, { backgroundColor: item.color }]} />
                  <Text style={tw`text-gray-600 text-sm font-medium`}>{item.text} ({item.value}%)</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Critical Items Alert */}
        <View style={tw`px-6 mt-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
             <Text style={tw`text-gray-900 font-bold text-lg`}>Perlu Perhatian</Text>
             <TouchableOpacity>
               <Text style={tw`text-primary font-medium text-sm`}>Lihat Semua</Text>
             </TouchableOpacity>
          </View>

          <TouchableOpacity style={tw`bg-white p-4 rounded-2xl shadow-sm border border-red-100 flex-row items-center`}>
            <View style={tw`bg-red-50 p-3 rounded-xl mr-4`}>
              <Package color="#EF4444" size={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900 font-bold text-base`}>Pempes / Pampers</Text>
              <Text style={tw`text-gray-500 text-xs mt-1`}>Lantai 1 • Sisa 2 pack (Min. 5)</Text>
            </View>
            <View style={tw`bg-red-500 px-3 py-1 rounded-full`}>
              <Text style={tw`text-white text-xs font-bold`}>Kritis</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={tw`bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex-row items-center mt-3`}>
            <View style={tw`bg-amber-50 p-3 rounded-xl mr-4`}>
              <Package color="#F59E0B" size={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900 font-bold text-base`}>Garam Dapur</Text>
              <Text style={tw`text-gray-500 text-xs mt-1`}>Lantai 1 • Sisa 2 pack (Min. 2)</Text>
            </View>
            <View style={tw`bg-amber-500 px-3 py-1 rounded-full`}>
              <Text style={tw`text-white text-xs font-bold`}>Perhatian</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
