import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { tiposSeguroLabels } from '@/lib/mock-data';

interface PolicyDistributionChartProps {
  data: Array<{ tipo: string; quantidade: number }>;
}

const COLORS = [
  'hsl(217, 91%, 60%)',   // primary
  'hsl(173, 80%, 40%)',   // accent
  'hsl(142, 76%, 36%)',   // success
  'hsl(38, 92%, 50%)',    // warning
  'hsl(0, 84%, 60%)',     // destructive
  'hsl(199, 89%, 48%)',   // info
  'hsl(280, 65%, 60%)',   // purple
  'hsl(320, 65%, 52%)',   // pink
];

export function PolicyDistributionChart({ data }: PolicyDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: tiposSeguroLabels[item.tipo] || item.tipo,
    value: item.quantidade,
  }));

  return (
    <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Distribuição por Tipo de Seguro
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
