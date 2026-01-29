import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import ProfileCard from '@/components/ProfileCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

interface PersonaCardProps {
       result: TagResult;
}

// 辅助函数：生成渐变
const getGradientByResult = (color: string) => {
       return `linear-gradient(145deg, ${color}aa 0%, ${color}44 100%)`;
};

const getGlowByResult = (color: string) => {
       return `${color}66`; // 40% opacity
};

export const PersonaCard = ({ result }: PersonaCardProps) => {
       const { t } = useLanguage();

       return (
              <ReportCard className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                     {/* 背景装饰 */}
                     <div className="absolute inset-0">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/10 rounded-full blur-3xl" />
                     </div>

                     <div className="relative z-10 space-y-4">
                            {/* 标题 */}
                            <div className="text-center space-y-1">
                                   <p className="text-white/60 text-sm font-mono">{t('report.persona_card_title') || '[ 人格档案 ]'}</p>
                                   {result.rarity === 'SSR' && (
                                          <div className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
                                                 <Star className="w-3 h-3 fill-current" /> 稀有人格
                                          </div>
                                   )}
                            </div>

                            {/* ProfileCard 展示 */}
                            <div className="flex justify-center">
                                   <ProfileCard
                                          name={result.mainTag}
                                          title={result.description?.slice(0, 50) + '...' || '神秘人格'}
                                          handle={result.emoji || '🔮'}
                                          status={result.rarity || 'Normal'}
                                          avatarUrl={result.image || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&q=80'}
                                          showUserInfo={false}
                                          enableTilt={true}
                                          enableMobileTilt={false}
                                          showBehindGlow
                                          behindGlowColor={getGlowByResult(result.color)}
                                          customInnerGradient={getGradientByResult(result.color)}
                                   />
                            </div>

                            {/* 人格标签 */}
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                   {result.subTags?.slice(0, 3).map((tag, i) => (
                                          <span
                                                 key={i}
                                                 className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10"
                                          >
                                                 #{tag}
                                          </span>
                                   ))}
                            </div>

                            {/* 底部提示 */}
                            <div className="text-center text-[10px] text-white/40 pt-2">
                                   {t('report.tilt_hint') || '移动鼠标体验3D效果'}
                            </div>
                     </div>
              </ReportCard>
       );
};
