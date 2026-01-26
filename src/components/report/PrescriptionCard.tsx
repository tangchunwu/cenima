import { ReportCard } from './ReportCard';
import { TagResult } from '@/lib/resultCalculator';
import { FileText, ClipboardList, Pill, User } from 'lucide-react';

interface PrescriptionCardProps {
       result: TagResult;
}

export const PrescriptionCard = ({ result }: PrescriptionCardProps) => {
       return (
              <ReportCard className="bg-[#f0f2f5] text-slate-800 border-2 border-slate-200 relative overflow-hidden font-mono">
                     {/* 纸张纹理 */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-50 pointer-events-none" />

                     {/* 顶部红条 */}
                     <div className="absolute top-0 left-0 right-0 h-2 bg-red-500/80" />

                     <div className="space-y-6 relative z-10 p-2">
                            {/* 医院/机构抬头 */}
                            <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4">
                                   <div className="flex items-center gap-3">
                                          <div className="bg-red-500/10 p-2 rounded-full border border-red-500/20">
                                                 <div className="text-red-600 font-black text-xl">Rx</div>
                                          </div>
                                          <div>
                                                 <h3 className="text-xl font-black text-slate-900 tracking-tighter">
                                                        2026 CLINICAL PRESCRIPTION
                                                 </h3>
                                                 <p className="text-slate-500 text-xs">PSYCHIATRIC DEPARTMENT • NO. {Math.random().toString().substr(2, 6)}</p>
                                          </div>
                                   </div>
                                   <FileText className="w-8 h-8 text-slate-300" />
                            </div>

                            {/* 患者信息 */}
                            <div className="grid grid-cols-2 gap-4 bg-slate-100 p-3 rounded border border-slate-200">
                                   <div>
                                          <span className="text-xs text-slate-400 block mb-1">PATIENT NAME</span>
                                          <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                                 <User className="w-3 h-3" /> {result.mainTag}
                                          </span>
                                   </div>
                                   <div>
                                          <span className="text-xs text-slate-400 block mb-1">DATE</span>
                                          <span className="text-sm font-bold text-slate-800">JAN 26, 2026</span>
                                   </div>
                            </div>

                            {/* 诊断内容 */}
                            <div className="space-y-4">
                                   <div className="border-l-4 border-red-400 pl-3">
                                          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                                                 <ClipboardList className="w-4 h-4" />
                                                 SYMPTOMS (临床表现)
                                          </h4>
                                          <p className="text-sm text-slate-600 leading-relaxed italic">
                                                 "{result.roast}"
                                          </p>
                                   </div>

                                   <div className="border-l-4 border-emerald-400 pl-3">
                                          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                                 <Pill className="w-4 h-4" />
                                                 PRESCRIPTION (处方建议)
                                          </h4>

                                          <div className="bg-white p-3 rounded border border-slate-200 shadow-sm relative">
                                                 <span className="absolute -top-2 -right-2 bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                                                        DAILY
                                                 </span>
                                                 <p className="text-lg font-bold text-slate-800 mb-1 font-serif">
                                                        {result.prediction2026}
                                                 </p>
                                                 <p className="text-xs text-slate-400">
                                                        *Discontinue use if happiness persists for more than 4 hours.
                                                 </p>
                                          </div>
                                   </div>
                            </div>

                            {/* 签名栏 */}
                            <div className="pt-8 flex justify-between items-end">
                                   <div className="text-center">
                                          <div className="w-24 border-b border-slate-400 mb-1" />
                                          <p className="text-[10px] text-slate-400">PHYSICIAN SIGNATURE</p>
                                   </div>
                                   <div className="font-script text-2xl text-slate-600 rotate-[-10deg] opacity-60">
                                          Dr. A.I.
                                   </div>
                            </div>

                            {/* 底部印章 */}
                            <div className="absolute bottom-10 right-10 opacity-20 rotate-[-20deg] pointer-events-none">
                                   <div className="w-24 h-24 border-4 border-red-600 rounded-full flex items-center justify-center p-2">
                                          <div className="w-full h-full border border-red-600 rounded-full flex items-center justify-center text-red-600 font-black text-xs text-center leading-none">
                                                 HIGHLY<br />RECOMMENDED
                                          </div>
                                   </div>
                            </div>
                     </div>
              </ReportCard>
       );
};
