import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { mes: 'Jul', receita: 32000, comissao: 6400 },
  { mes: 'Ago', receita: 38000, comissao: 7600 },
  { mes: 'Set', receita: 35000, comissao: 7000 },
  { mes: 'Out', receita: 42000, comissao: 8400 },
  { mes: 'Nov', receita: 48000, comissao: 9600 },
  { mes: 'Dez', receita: 45680, comissao: 9136 },
];

export function RevenueChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Receita e Comissões
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComissao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="mes"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  notation: 'compact',
                }).format(value)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="receita"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReceita)"
              name="Receita"
            />
            <Area
              type="monotone"
              dataKey="comissao"
              stroke="hsl(173, 80%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorComissao)"
              name="Comissão"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
