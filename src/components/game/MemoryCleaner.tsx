import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertOctagon, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MemoryCleanerProps {
       onClean: (memory: string) => void;
}

export const MemoryCleaner = ({ onClean }: MemoryCleanerProps) => {
       const [input, setInput] = useState('');
       const [isCleaning, setIsCleaning] = useState(false);

       const handleClean = () => {
              if (!input.trim()) return;

              setIsCleaning(true);
              // 模拟清理动画时间
              setTimeout(() => {
                     onClean(input);
              }, 2000);
       };

       return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
                     <div className="w-full max-w-md bg-slate-900 border-2 border-red-500/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                            {/* 背景警告带 */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse" />

                            <div className="space-y-6 relative z-10">
                                   <div className="text-center space-y-2">
                                          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                                 <AlertOctagon className="w-8 h-8 text-red-500" />
                                          </div>
                                          <h2 className="text-xl font-black text-white font-mono uppercase tracking-widest">
                                                 Memory Overflow
                                          </h2>
                                          <p className="text-red-400 text-sm font-mono">
                                                 ERROR_CODE: 2025_REGRET_LEAK
                                          </p>
                                   </div>

                                   <div className="bg-red-950/30 rounded-lg p-4 border border-red-900/50 space-y-3">
                                          <div className="flex items-start gap-3">
                                                 <FileWarning className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                                 <div className="space-y-1">
                                                        <p className="text-sm font-bold text-red-100">System Performance Degraded</p>
                                                        <p className="text-xs text-red-200/60 leading-relaxed">
                                                               Corrupted data fragments from 2025 are consuming 87% of emotional RAM. Manual deletion required to restore system stability.
                                                        </p>
                                                        <p className="text-xs text-red-400 font-mono mt-2">
                     > Please verify the filename of the corrupted memory:
                                                        </p>
                                                 </div>
                                          </div>

                                          <Input
                                                 value={input}
                                                 onChange={(e) => setInput(e.target.value)}
                                                 placeholder="e.g. 错过的机会 / 前任 / 没存钱..."
                                                 className="bg-black/50 border-red-900/50 text-white placeholder:text-red-500/20 font-mono"
                                                 autoFocus
                                          />
                                   </div>

                                   <Button
                                          onClick={handleClean}
                                          disabled={!input.trim() || isCleaning}
                                          className={`w-full h-14 font-black text-lg uppercase tracking-wider transition-all duration-300 ${isCleaning
                                                        ? 'bg-red-500 text-white cursor-wait'
                                                        : 'bg-red-600 hover:bg-red-500 text-white hover:scale-[1.02] shadow-lg shadow-red-600/20'
                                                 }`}
                                   >
                                          {isCleaning ? (
                                                 <span className="flex items-center gap-2 animate-pulse">
                                                        <Trash2 className="w-5 h-5 animate-spin" />
                                                        Purging Data...
                                                 </span>
                                          ) : (
                                                 <span className="flex items-center gap-2">
                                                        <Trash2 className="w-5 h-5" />
                                                        Force Delete
                                                 </span>
                                          )}
                                   </Button>

                                   <p className="text-[10px] text-center text-white/20 font-mono">
                                          * Warning: Deleted memories cannot be recovered.
                                   </p>
                            </div>
                     </div>
              </div>
       );
};
