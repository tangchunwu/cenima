import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DimensionData {
  subject: string;
  A: number;
  fullMark: number;
}

interface DimensionRadarChartProps {
  data: DimensionData[];
}

export const DimensionRadarChart = ({ data }: DimensionRadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
          stroke="rgba(255,255,255,0.2)"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={false}
          axisLine={false}
        />
        <Radar
          name="维度"
          dataKey="A"
          stroke="hsl(var(--mint))"
          fill="hsl(var(--mint))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
