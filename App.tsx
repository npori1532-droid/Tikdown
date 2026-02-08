import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Video, ExternalLink, Send } from 'lucide-react';
import Background from './components/Background';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { fetchTikTokVideo } from './services/tiktokService';
import { TikTokData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<TikTokData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchTikTokVideo(url);
      
      if (response.code === 0 && response.data) {
        setData(response.data);
      } else {
        setError(response.msg || 'Could not fetch video. Please check the URL and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6 sm:p-12 overflow-x-hidden">
      <Background />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-16 z-10 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg border border-white/20"
          >
            <Video className="text-white w-7 h-7" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            TikDown <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              animate={{ 
                textShadow: ["0 0 0px #d8b4fe", "0 0 10px #d8b4fe", "0 0 0px #d8b4fe"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3D
            </motion.span>
          </h1>
        </div>
        
        <div className="flex gap-4">
             {/* Optional Header Links */}
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="w-full max-w-4xl z-10 flex flex-col items-center flex-grow">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10 perspective-500"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-2xl mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% auto" }}
          >
            Download TikToks <br /> Without Watermark
          </motion.h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Paste a TikTok link below to get the high-quality MP4 video instantly. 
            <span className="block mt-2 text-sm opacity-70">No Login • No Watermark • Fast & Free</span>
          </p>
        </motion.div>

        <InputForm onFetch={handleFetch} isLoading={loading} />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0, rotateX: 90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              className="mt-6 w-full max-w-2xl bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl text-center backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}

          {data && (
            <ResultCard key="result" data={data} />
          )}
        </AnimatePresence>
      </div>

      {/* Footer & Developer Info */}
      <footer className="mt-20 w-full z-10">
        <div className="max-w-2xl mx-auto border-t border-white/5 pt-8 pb-6 flex flex-col items-center text-center">
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <p className="text-sm text-slate-400 mb-2 uppercase tracking-widest font-semibold">Developed By</p>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Tech Master</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a 
                        href="https://t.me/GAJARBOTOLZ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <Send className="w-4 h-4 text-blue-400 mb-1" />
                        <span className="text-[10px] text-slate-300">Channel</span>
                    </a>
                    
                    <a 
                        href="https://t.me/tech_master_a2z" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <Send className="w-4 h-4 text-cyan-400 mb-1" />
                        <span className="text-[10px] text-slate-300">Contact</span>
                    </a>

                    <a 
                        href="https://www.gajarbotol.site/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <ExternalLink className="w-4 h-4 text-pink-400 mb-1" />
                        <span className="text-[10px] text-slate-300">Website</span>
                    </a>
                </div>
            </motion.div>

            <p className="text-slate-600 text-xs mt-8">
                &copy; {new Date().getFullYear()} TikDown 3D. All rights reserved.
            </p>
        </div>
      </footer>
    </main>
  );
};

export default App;