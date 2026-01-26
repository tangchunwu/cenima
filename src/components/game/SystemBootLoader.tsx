import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, Power } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SystemBootLoaderProps {
       onBoot: (command: string) => void;
}

export const SystemBootLoader = ({ onBoot }: SystemBootLoaderProps) => {
       const [command, setCommand] = useState('');
       const [step, setStep] = useState(0); // 0: typing logs, 1: input, 2: launching

       // 模拟开机自检日志
       const [logs, setLogs] = useState<string[]>([]);
       const bootLogs = [
              "BIOS_CHECK... OK",
              "LOADING_KERNEL... OK",
              "MOUNTING_DEVICES... DONE",
              "CHECKING_EMOTIONAL_DRIVERS... OPTIMIZED",
              "DELETING_OLD_CACHES....... CLEARED",
              "INITIALIZING_2026_CORE... READY",
       ];

       useEffect(() => {
              let delay = 0;
              bootLogs.forEach((log, index) => {
                     delay += Math.random() * 300 + 100;
                     setTimeout(() => {
                            setLogs(prev => [...prev, log]);
                            if (index === bootLogs.length - 1) {
                                   setTimeout(() => setStep(1), 500);
                            }
                     }, delay);
              });
       }, []);

       const handleBoot = (e: React.FormEvent) => {
              e.preventDefault();
              if (!command.trim()) return;

              setStep(2);
              setTimeout(() => {
                     onBoot(command);
              }, 1500);
       };

       return (
              <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-green-500 p-6">
                     <div className="w-full max-w-lg space-y-4">

                            {/* Terminal Header */}
                            <div className="border-b border-green-500/30 pb-2 mb-4 flex justify-between items-center">
                                   <span className="text-xs">ROOT_ACCESS_TERMINAL v2.0.26</span>
                                   <div className="flex gap-1">
                                          <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                          <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                          <div className="w-3 h-3 rounded-full bg-green-500" />
                                   </div>
                            </div>

                            {/* Logs */}
                            <div className="space-y-1 text-sm h-48 overflow-hidden font-bold opacity-80">
                                   {logs.map((log, i) => (
                                          <motion.div
                                                 key={i}
                                                 initial={{ opacity: 0, x: -10 }}
                                                 animate={{ opacity: 1, x: 0 }}
                                                 className="flex gap-2"
                                          >
                                                 <span className="text-green-500/50">[{new Date().toLocaleTimeString()}]</span>
                                                 <span>{log}</span>
                                          </motion.div>
                                   ))}
                                   {step >= 1 && (
                                          <motion.div
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 className="text-white mt-4 bg-green-900/20 p-2 border-l-2 border-green-500"
                                          >
               > SYSTEM READY. WAITING FOR USER DIRECTIVE.
                                          </motion.div>
                                   )}
                            </div>

                            {/* Command Input */}
                            {step >= 1 && step < 2 && (
                                   <motion.form
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          onSubmit={handleBoot}
                                          className="mt-8 relative"
                                   >
                                          <p className="text-xs text-green-400/60 mb-2 uppercase tracking-widest">
                                                 Please enter your primary goal for 2026 to initialize:
                                          </p>
                                          <div className="flex items-center gap-2 border-b-2 border-green-500 py-2">
                                                 <ChevronRight className="w-6 h-6 animate-pulse" />
                                                 <input
                                                        autoFocus
                                                        value={command}
                                                        onChange={(e) => setCommand(e.target.value)}
                                                        className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-white placeholder:text-green-500/30 uppercase"
                                                        placeholder="Type command..."
                                                 />
                                                 <Button type="submit" size="icon" variant="ghost" className="hover:bg-green-500/20 text-green-500">
                                                        <Power className="w-5 h-5" />
                                                 </Button>
                                          </div>
                                   </motion.form>
                            )}

                            {/* Launch Animation */}
                            {step === 2 && (
                                   <motion.div
                                          className="fixed inset-0 bg-white z-[60] flex items-center justify-center overflow-hidden"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.5 }}
                                   >
                                          <motion.h1
                                                 className="text-9xl font-black text-black tracking-tighter"
                                                 initial={{ scale: 0.5, opacity: 0 }}
                                                 animate={{ scale: 10, opacity: 0 }}
                                                 transition={{ duration: 1.5, ease: "easeIn" }}
                                          >
                                                 {command}
                                          </motion.h1>
                                   </motion.div>
                            )}

                     </div>
              </div>
       );
};
