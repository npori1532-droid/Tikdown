import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900 perspective-1000">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[90px]"
      />

      {/* 3D Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Cube 1 */}
        <motion.div
          animate={{ rotateX: 360, rotateY: 360, y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[10%] w-16 h-16 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg"
        />
        
        {/* Floating Pyramid/Triangle */}
        <motion.div
          animate={{ rotateZ: 360, y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] right-[10%] w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-purple-500/20 border-r-[30px] border-r-transparent blur-[1px]"
        />

        {/* Floating Circle/Donut */}
        <motion.div
          animate={{ rotateX: 180, rotateY: 180, scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[20%] w-24 h-24 border-4 border-dashed border-cyan-400/20 rounded-full"
        />

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               y: [0, -100 - (i * 20), 0], 
               opacity: [0, 1, 0] 
             }}
             transition={{ 
               duration: 5 + i, 
               repeat: Infinity, 
               ease: "easeIn",
               delay: i * 0.5
             }}
             className="absolute w-1 h-1 bg-white rounded-full"
             style={{
               left: `${10 + i * 20}%`,
               top: '80%'
             }}
           />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default Background;