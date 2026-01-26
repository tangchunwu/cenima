import {
       Radar,
       RadarChart,
       PolarGrid,
       PolarAngleAxis,
       ResponsiveContainer,
} from 'recharts';

interface DimensionRadarChartProps {
       data: { subject: string; A: number; fullMark: number }[];
}

export const DimensionRadarChart = ({ data }: DimensionRadarChartProps) => {
       return (
              <div className="w-full h-[240px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                   <PolarGrid stroke="#ffffff20" />
                                   <PolarAngleAxis
                                          dataKey="subject"
                                          tick={{ fill: '#ffffff80', fontSize: 11 }}
                                   />
                                   <Radar
                                          name="My Stats"
                                          dataKey="A"
                                          stroke="#4facfe"
                                          fill="#4facfe"
                                          fillOpacity={0.3}
                                   />
                            </RadarChart>
                     </ResponsiveContainer>

                     {/* 装饰性UI */}
                     <div className="absolute top-2 right-2 text-[10px] text-white/20 font-mono">
                            SCANNING...
                     </div>
              </div>
       );
};
