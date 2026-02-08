import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Loader2 } from 'lucide-react';

interface InputFormProps {
  onFetch: (url: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onFetch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onFetch(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto z-10 relative"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        <form 
          onSubmit={handleSubmit}
          className="relative flex flex-col sm:flex-row gap-3 bg-slate-900/80 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Link className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok Link here..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={!url || isLoading}
            className={`
              flex items-center justify-center px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform
              ${!url || isLoading 
                ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing
              </>
            ) : (
              'Fetch Video'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default InputForm;