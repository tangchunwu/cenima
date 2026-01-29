import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
       return (
              <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a0b2e] to-slate-950 text-white">
                     <div className="max-w-2xl mx-auto px-4 py-8">
                            {/* 返回按钮 */}
                            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
                                   <ArrowLeft className="w-4 h-4" />
                                   <span>返回首页</span>
                            </Link>

                            <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   className="bg-black/40 rounded-2xl p-6 border border-white/10 backdrop-blur-md"
                            >
                                   <h1 className="text-2xl font-bold mb-6 text-center">🔒 隐私政策</h1>

                                   <div className="space-y-6 text-white/80 text-sm leading-relaxed">
                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">1. 信息收集</h2>
                                                 <p>
                                                        《马生模拟器 2026》是一款纯前端运行的网页游戏。我们<strong className="text-white">不会收集、存储或传输</strong>您的任何个人身份信息（如姓名、邮箱、手机号等）。
                                                 </p>
                                          </section>

                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">2. 使用数据</h2>
                                                 <p>
                                                        为了改善游戏体验，我们使用 <strong className="text-white">PostHog</strong> 进行匿名的用户行为分析，包括：
                                                 </p>
                                                 <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
                                                        <li>页面访问次数</li>
                                                        <li>游戏完成率</li>
                                                        <li>功能使用情况</li>
                                                 </ul>
                                                 <p className="mt-2">
                                                        这些数据均为<strong className="text-white">匿名</strong>且<strong className="text-white">聚合</strong>的，无法用于识别任何个人用户。
                                                 </p>
                                          </section>

                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">3. 本地存储</h2>
                                                 <p>
                                                        游戏可能使用浏览器的 <code className="bg-white/10 px-1 rounded">localStorage</code> 存储您的游戏进度和设置偏好。这些数据仅保存在您的设备上，我们无法访问。
                                                 </p>
                                          </section>

                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">4. Cookie</h2>
                                                 <p>
                                                        我们使用必要的 Cookie 来维持网站的基本功能。您可以通过浏览器设置管理 Cookie。
                                                 </p>
                                          </section>

                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">5. 第三方服务</h2>
                                                 <p>
                                                        本游戏使用以下第三方服务：
                                                 </p>
                                                 <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
                                                        <li>PostHog - 匿名分析</li>
                                                        <li>Vercel - 网站托管</li>
                                                 </ul>
                                          </section>

                                          <section>
                                                 <h2 className="text-lg font-semibold text-white mb-2">6. 联系我们</h2>
                                                 <p>
                                                        如有任何隐私相关问题，请通过 GitHub Issues 联系我们。
                                                 </p>
                                          </section>

                                          <div className="pt-4 border-t border-white/10 text-center text-white/40 text-xs">
                                                 最后更新：2026年1月29日
                                          </div>
                                   </div>
                            </motion.div>
                     </div>
              </div>
       );
};

export default Privacy;
