"use client";

// Kita cuma butuh motion aja sekarang buat hero gambar
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    // 1. Kotak pembungkus layar penuh dengan background hitam/gelap
    <section className="relative w-full h-screen overflow-hidden bg-[#1E1E1E]">
      
      {/* 2. Ubah div biasa jadi <motion.div> */}
      <motion.div
        // --- ANIMASI PURE GAMBAR PREMIMUM ---
        initial={{ scale: 1 }} // Ukuran asli (100%)
        animate={{ scale: 1.05 }} // Perlahan membesar jadi 105%
        transition={{ 
          duration: 1.5, // Durasi sedikit lama biar elegan
          ease: "easeOut" // Pengereman halus di akhir
        }}
        // -----------------------------------

        className="absolute inset-0 bg-cover bg-center"
        // --- Masukin gambar naga kamu di sini ---
        style={{ backgroundImage: "url('/assets/images/LandingPage.png')" }}
      ></motion.div>

    </section>
  );
}