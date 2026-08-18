import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { User, Bell, Database, Shield, LogOut } from 'lucide-react-native';
import tw from '../styles/tw';

export default function SettingsScreen() {
  const settings = [
    { id: 1, title: 'Akun Pengguna', icon: <User color="#6366F1" size={24} />, color: 'bg-indigo-50' },
    { id: 2, title: 'Notifikasi & Peringatan', icon: <Bell color="#F59E0B" size={24} />, color: 'bg-amber-50' },
    { id: 3, title: 'Backup & Ekspor Data', icon: <Database color="#10B981" size={24} />, color: 'bg-emerald-50' },
    { id: 4, title: 'Privasi & Keamanan', icon: <Shield color="#8B5CF6" size={24} />, color: 'bg-violet-50' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8FAFC]`}>
      <View style={tw`px-6 pt-12 pb-6 bg-white border-b border-gray-100`}>
        <Text style={tw`text-gray-900 font-bold text-3xl tracking-tight`}>Pengaturan</Text>
      </View>

      <View style={tw`p-6`}>
        <View style={tw`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden`}>
          {settings.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                tw`flex-row items-center p-4`,
                index !== settings.length - 1 && tw`border-b border-gray-100`
              ]}
            >
              <View style={[tw`p-3 rounded-xl mr-4`, tw.style(item.color)]}>
                {item.icon}
              </View>
              <Text style={tw`text-gray-800 font-semibold text-base flex-1`}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={tw`bg-red-50 p-4 rounded-2xl flex-row justify-center items-center mt-8`}>
          <LogOut color="#EF4444" size={20} />
          <Text style={tw`text-red-500 font-bold text-base ml-2`}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
