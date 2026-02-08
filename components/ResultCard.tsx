import React from 'react';
import { motion } from 'framer-motion';
import { Download, Music, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { TikTokData } from '../types';
import { formatNumber } from '../services/tiktokService';

interface ResultCardProps {
  data: TikTokData;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const handleDownload = (url: string) => {
    // Open in new tab to trigger download behavior (safest for cross-origin)
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: -15, y: 50 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full max-w-4xl mx-auto mt-12 perspective-1000"
    >
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]" />
        
        <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 relative z-10">
          
          {/* Cover Image with 3D effect */}
          <div className="w-full md:w-1/3 flex-shrink-0 perspective-500">
             <motion.div 
               whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[3/4] cursor-pointer"
             >
                <img 
                  src={data.cover} 
                  alt={data.title} 
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 fill-white text-white ml-1" />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                   <div className="flex items-center text-white/90 text-sm font-medium mb-1">
                      <Play className="w-3 h-3 mr-1 fill-current" />
                      {formatNumber(data.play_count)} views
                   </div>
                   <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white/80 w-1/2 rounded-full" />
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-2xl border border-white/5">
                <img 
                  src={data.author.avatar} 
                  alt={data.author.nickname}
                  className="w-14 h-14 rounded-full border-2 border-purple-500 shadow-lg"
                />
                <div>
                  <h3 className="font-bold text-xl text-white leading-tight">{data.author.nickname}</h3>
                  <p className="text-sm text-slate-400 font-medium">@{data.author.unique_id}</p>
                </div>
              </div>

              <p className="text-slate-200 text-sm mb-6 line-clamp-3 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                {data.title || "No description available for this video."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Heart, count: data.digg_count, label: 'Likes', color: 'text-pink-500' },
                  { icon: MessageCircle, count: data.comment_count, label: 'Comments', color: 'text-blue-400' },
                  { icon: Share2, count: data.share_count, label: 'Shares', color: 'text-green-400' }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/40 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5 shadow-lg"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
                    <span className="text-sm font-bold text-white">{formatNumber(stat.count)}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDownload(data.play)}
                className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl font-bold text-white shadow-xl shadow-cyan-500/20 overflow-hidden border border-white/20"
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Download className="w-6 h-6 z-10" />
                <span className="text-lg z-10">Download No-Watermark</span>
              </motion.button>

              {data.music && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(data.music)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl font-medium text-slate-300 transition-colors backdrop-blur-sm"
                >
                  <Music className="w-4 h-4" />
                  <span>Download Audio MP3</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;