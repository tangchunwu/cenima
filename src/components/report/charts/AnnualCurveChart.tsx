import {
       LineChart,
       Line,
       XAxis,
       YAxis,
       CartesianGrid,
       Tooltip,
       ResponsiveContainer,
       ReferenceLine,
} from 'recharts';

interface AnnualCurveChartProps {
       data: { month: string; value: number; status: 'high' | 'low' | 'normal' }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
       if (active && payload && payload.length) {
              const data = payload[0].payload;
              const isHigh = data.status === 'high';
              const isLow = data.status === 'low';

              return (
                     <div className="bg-slate-900/90 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-sm">
                            <p className="text-white/60 text-xs mb-1">{label}</p>
                            <p className={`text-lg font-bold ${isHigh ? 'text-red-400' : isLow ? 'text-blue-400' : 'text-mint'
                                   }`}>
                                   {isHigh ? '🔥 高光时刻' : isLow ? '💧 至暗时刻' : '✨ 状态平稳'}
                            </p>
                            <p className="text-white/40 text-xs mt-1">指数: {data.value}</p>
                     </div>
              );
       }
       return null;
};

export const AnnualCurveChart = ({ data }: AnnualCurveChartProps) => {
       return (
              <div className="w-full h-[200px] mt-4 relative">
                     <div className="absolute top-0 right-0 z-10">
                            <div className="flex items-center gap-2 text-[10px] text-white/30 bg-black/20 px-2 py-1 rounded">
                                   <div className="w-2 h-2 bg-mint rounded-full animate-pulse"></div>
                                   <span>LIVE MONITORING</span>
                            </div>
                     </div>
                     <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                   <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                   <XAxis
                                          dataKey="month"
                                          tick={{ fill: '#ffffff60', fontSize: 10 }}
                                          axisLine={false}
                                          tickLine={false}
                                          interval={2}
                                   />
                                   <YAxis hide domain={[0, 100]} />
                                   <Tooltip content={<CustomTooltip />} />
                                   <ReferenceLine y={50} stroke="#ffffff20" strokeDasharray="3 3" />
                                   <Line
                                          type="monotone"
                                          dataKey="value"
                                          stroke="#00f2fe"
                                          strokeWidth={2}
                                          dot={false}
                                          activeDot={{ r: 4, fill: '#fff', stroke: '#00f2fe' }}
                                          animationDuration={2000}
                                   />
                            </LineChart>
                     </ResponsiveContainer>
              </div>
       );
};
