import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SystemBootLoaderProps {
       onBoot: (command: string) => void;
}

export const SystemBootLoader = ({ onBoot }: SystemBootLoaderProps) => {
       const { t } = useLanguage();
       const [command, setCommand] = useState('');
       const [step, setStep] = useState(0); // 0: typing logs, 1: input, 2: launching
       const scrollRef = useRef<HTMLDivElement>(null);

       // 模拟开机自检日志
       const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

       const bootLogs = useMemo(() => [
              { text: "INITIALIZING KERNEL... 系统内核初始化", delay: 100 },
              { text: "LOADING NEURAL MODULES... 神经模块加载 [OK]", delay: 300 },
              { text: "CHECKING MEMORY INTEGRITY... 记忆完整性校验 99%", delay: 600 },
              { text: "MOUNTING FILE SYSTEM... 挂载灵魂分区 /dev/soul0", delay: 800 },
              { text: "ESTABLISHING LINK TO 2026... 正在建立2026时空链接", delay: 1200 },
              { text: "SYSTEM READY. 系统就绪", delay: 1500 },
       ], []);

       // 自动滚动到底部
       useEffect(() => {
              if (scrollRef.current) {
                     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              }
       }, [displayedLogs]);

       useEffect(() => {
              let currentIndex = 0;

              // 递归显示日志
              const showNextLog = () => {
                     if (currentIndex >= bootLogs.length) {
                            setTimeout(() => setStep(1), 500);
                            return;
                     }

                     const log = bootLogs[currentIndex];
                     setDisplayedLogs(prev => [...prev, `> ${log.text}`]);
                     currentIndex++;
                     setTimeout(showNextLog, 150 + Math.random() * 200); // 随机间隔更有真实感
              };

              const timer = setTimeout(showNextLog, 500);
              return () => clearTimeout(timer);
       }, [bootLogs]);

       const handleBoot = (e: React.FormEvent) => {
              e.preventDefault();
              if (!command.trim()) return;

              setStep(2);
              // 播放回车确认音效（如果后续加了全局音效系统）
              setTimeout(() => {
                     onBoot(command);
              }, 1200);
       };

       return (
              <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-green-500 p-6 overflow-hidden">
                     {/* CRT Scanline Effect */}
                     <div className="absolute inset-0 z-10 pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqhgYGARAXCAxEA8kBgQA8zMv7Q20R78AAAAASUVORK5CYII=')] opacity-10 mix-blend-overlay"></div>
                     <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanline"></div>

                     <div className="w-full max-w-lg space-y-4 relative z-20">

                            {/* Terminal Header */}
                            <div className="border-b-2 border-green-500 pb-2 mb-4 flex justify-between items-end">
                                   <div className="flex items-center gap-2">
                                          <Terminal className="w-5 h-5 animate-pulse" />
                                          <span className="text-sm font-bold tracking-widest">SHABI-OS v2.0.26</span>
                                   </div>
                                   <span className="text-xs opacity-60">MEM: 64KB OK</span>
                            </div>

                            {/* Logs Area */}
                            <div
                                   ref={scrollRef}
                                   className="space-y-1 text-sm h-64 overflow-y-auto font-bold opacity-90 font-mono scrollbar-hide"
                            >
                                   {displayedLogs.map((log, i) => (
                                          <motion.div
                                                 key={i}
                                                 initial={{ opacity: 0, x: -10 }}
                                                 animate={{ opacity: 1, x: 0 }}
                                                 transition={{ duration: 0.1 }}
                                                 className="text-green-400"
                                          >
                                                 {log}
                                          </motion.div>
                                   ))}

                                   {step >= 1 && (
                                          <motion.div
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 className="mt-6 mb-2 text-white bg-green-900/30 p-4 border border-green-500/50 rounded shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                          >
                                                 <p className="tracking-wider leading-relaxed">
                                                        {t('boot.ask') || "ENTER YOUR WISH FOR 2026:"}
                                                 </p>
                                          </motion.div>
                                   )}
                            </div>

                            {/* Command Input */}
                            {step >= 1 && step < 2 && (
                                   <motion.form
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          onSubmit={handleBoot}
                                          className="mt-4 relative group"
                                   >
                                          <div className="flex items-center gap-3 bg-black border-2 border-green-500 p-3 shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-shadow group-focus-within:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                                 <ChevronRight className="w-6 h-6 animate-pulse text-green-400" />
                                                 <input
                                                        autoFocus
                                                        value={command}
                                                        onChange={(e) => setCommand(e.target.value)}
                                                        className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-white placeholder:text-green-700 uppercase caret-green-500 font-mono"
                                                        placeholder={t('boot.placeholder') || "TYPE COMMAND..."}
                                                        autoComplete="off"
                                                 />
                                                 <div className="animate-pulse w-3 h-5 bg-green-500/50" />
                                          </div>
                                   </motion.form>
                            )}

                            {/* Launch Animation Overlay */}
                            <AnimatePresence>
                                   {step === 2 && (
                                          <motion.div
                                                 className="fixed inset-0 bg-green-500 z-[100] flex items-center justify-center overflow-hidden"
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 exit={{ opacity: 0 }}
                                                 transition={{ duration: 0.2 }}
                                          >
                                                 <motion.div
                                                        className="text-center space-y-4"
                                                        initial={{ scale: 0.8 }}
                                                        animate={{ scale: [1, 50] }}
                                                        transition={{ duration: 1.5, ease: "circIn", delay: 0.2 }}
                                                 >
                                                        <div className="text-9xl font-black text-black tracking-tighter mix-blend-multiply">
                                                               EXECUTING
                                                        </div>
                                                        <div className="text-4xl font-bold text-black font-mono">
                                                               {command}
                                                        </div>
                                                 </motion.div>
                                          </motion.div>
                                   )}
                            </AnimatePresence>

                     </div>
              </div>
       );
};
