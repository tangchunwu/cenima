import { useRef, useEffect } from 'react';
import { TagResult } from '@/lib/resultCalculator';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

interface PosterGeneratorProps {
       result: TagResult;
       onGenerate: (blob: Blob) => void;
       trigger: boolean;
       link: string;
}

export const PosterGenerator = ({ result, onGenerate, trigger, link }: PosterGeneratorProps) => {
       const posterRef = useRef<HTMLDivElement>(null);

       useEffect(() => {
              if (trigger && posterRef.current) {
                     setTimeout(() => {
                            html2canvas(posterRef.current!, {
                                   useCORS: true,
                                   scale: 2, // High resolution
                                   backgroundColor: '#000000',
                                   logging: false,
                            }).then((canvas) => {
                                   canvas.toBlob((blob) => {
                                          if (blob) {
                                                 onGenerate(blob);
                                          }
                                   }, 'image/png');
                            });
                     }, 500); // Small delay to ensure rendering
              }
       }, [trigger, result, onGenerate]);

       return (
              <div className="fixed left-[-9999px] top-[-9999px]">
                     <div
                            ref={posterRef}
                            className="w-[375px] h-[667px] bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between p-8 text-center"
                            style={{
                                   backgroundImage: `linear-gradient(to bottom right, #1e293b, #0f172a)`
                            }}
                     >
                            {/* Dynamic Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                                   <div className={`absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full blur-3xl bg-gradient-to-r ${result.color}`} />
                                   <div className={`absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full blur-3xl bg-gradient-to-r ${result.color}`} />
                            </div>

                            {/* Title & Rarity */}
                            <div className="z-10 mt-6 w-full flex justify-between items-start px-6">
                                   <div className="text-left">
                                          <p className="text-white/50 text-xs mb-1 tracking-widest">2025年度人设报告</p>
                                          <h1 className="text-2xl font-black text-white italic">SHABI TEST</h1>
                                   </div>
                                   <div className="flex flex-col items-end">
                                          <div className={`px-3 py-1 rounded-lg font-black text-xl italic shadow-lg
              ${result.rarity === 'SSR' ? 'bg-gradient-to-r from-yellow-400 to-red-600 text-white border-2 border-yellow-200' : ''}
              ${result.rarity === 'SR' ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-white border-2 border-purple-200' : ''}
              ${result.rarity === 'R' ? 'bg-blue-500 text-white' : ''}
              ${result.rarity === 'N' ? 'bg-gray-500 text-white/80' : ''}
            `}>
                                                 {result.rarity}
                                          </div>
                                          <p className="text-white/40 text-[10px] mt-1">稀有度</p>
                                   </div>
                            </div>

                            {/* Main Visual */}
                            <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
                                   <div className="relative w-48 h-48 mb-6">
                                          <div className={`absolute inset-0 bg-gradient-to-r ${result.color} rounded-full blur-xl opacity-30 animate-pulse`} />
                                          <img
                                                 src={result.image}
                                                 alt={result.mainTag}
                                                 className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                                          />
                                          {/* Scarcity Badge */}
                                          <div className="absolute -bottom-2 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20 transform rotate-[-5deg] shadow-lg z-20">
                                                 仅 {result.populationPercentage}% 人
                                          </div>
                                   </div>

                                   <h2 className={`text-4xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-2`}>
                                          {result.mainTag}
                                   </h2>

                                   <div className="flex flex-wrap justify-center gap-2 mb-4">
                                          {result.subTags.map(tag => (
                                                 <span key={tag} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/10">
                                                        #{tag}
                                                 </span>
                                          ))}
                                   </div>

                                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 max-w-[85%]">
                                          <p className="text-white/90 text-sm italic font-medium">
                                                 "{result.roast}"
                                          </p>
                                   </div>
                            </div>

                            {/* Footer / QR Code */}
                            <div className="z-10 w-full flex items-end justify-between border-t border-white/10 pt-4 mt-4">
                                   <div className="text-left">
                                          <p className="text-white/40 text-[10px]">扫描二维码</p>
                                          <p className="text-white/60 text-xs font-bold">测测你有"多毒"</p>
                                   </div>

                                   <div className="bg-white p-1 rounded-lg">
                                          <QRCodeCanvas
                                                 value={link || window.location.href}
                                                 size={60}
                                                 bgColor={"#ffffff"}
                                                 fgColor={"#000000"}
                                                 level={"L"}
                                                 includeMargin={false}
                                          />
                                   </div>
                            </div>

                            {/* Watermark */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/10 text-[10px]">
                                   Generated by Shabi Test AI
                            </div>
                     </div>
              </div>
       );
};
