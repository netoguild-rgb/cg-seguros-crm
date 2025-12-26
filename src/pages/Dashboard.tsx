import { MainLayout } from '@/components/layout/MainLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PolicyDistributionChart } from '@/components/dashboard/PolicyDistributionChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { mockMetrics, mockApolices, mockAtividades } from '@/lib/mock-data';
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  CheckCircle,
  DollarSign,
  Percent,
} from 'lucide-react';

const policyDistribution = [
  { tipo: 'auto', quantidade: 35 },
  { tipo: 'vida', quantidade: 18 },
  { tipo: 'residencial', quantidade: 15 },
  { tipo: 'empresarial', quantidade: 12 },
  { tipo: 'saude', quantidade: 6 },
  { tipo: 'outros', quantidade: 3 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      subtitle="Visão geral do seu negócio"
    >
      {/* System Status */}
      <div className="mb-6">
        <SystemStatus />
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total de Clientes"
          value={mockMetrics.totalClientes}
          change="+5 este mês"
          changeType="positive"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
        />
        <MetricCard
          title="Apólices Ativas"
          value={mockMetrics.apolicesAtivas}
          change={`${mockMetrics.totalApolices} total`}
          changeType="neutral"
          icon={FileText}
          iconColor="bg-accent/10 text-accent"
        />
        <MetricCard
          title="Leads Novos"
          value={mockMetrics.leadsNovos}
          change={`${mockMetrics.leadsFechados} fechados`}
          changeType="positive"
          icon={UserPlus}
          iconColor="bg-success/10 text-success"
        />
        <MetricCard
          title="Vencendo (30 dias)"
          value={mockMetrics.apolicesVencendo}
          change="Atenção necessária"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <MetricCard
          title="Receita Mensal"
          value={formatCurrency(mockMetrics.receitaMensal)}
          change="+12% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-success/10 text-success"
        />
        <MetricCard
          title="Comissão Mensal"
          value={formatCurrency(mockMetrics.comissaoMensal)}
          change="~20% média"
          changeType="neutral"
          icon={Percent}
          iconColor="bg-primary/10 text-primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <RevenueChart />
        <PolicyDistributionChart data={policyDistribution} />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingRenewals apolices={mockApolices} />
        <RecentActivities activities={mockAtividades} />
      </div>
    </MainLayout>
  );
}
