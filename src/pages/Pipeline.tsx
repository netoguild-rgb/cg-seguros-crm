import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockLeads, statusLeadLabels, tiposSeguroLabels, origemLeadLabels } from '@/lib/mock-data';
import { Lead, StatusLead } from '@/types/crm';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Phone, Mail, DollarSign } from 'lucide-react';

const columns: { id: StatusLead; title: string; color: string }[] = [
  { id: 'novo', title: 'Novo', color: 'border-t-primary' },
  { id: 'contato', title: 'Em Contato', color: 'border-t-info' },
  { id: 'qualificado', title: 'Qualificado', color: 'border-t-accent' },
  { id: 'proposta', title: 'Proposta', color: 'border-t-warning' },
  { id: 'negociacao', title: 'Negociação', color: 'border-t-primary' },
  { id: 'fechado', title: 'Fechado', color: 'border-t-success' },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Pipeline() {
  const [leads] = useState<Lead[]>(mockLeads);

  const getLeadsByStatus = (status: StatusLead) =>
    leads.filter((lead) => lead.status === status);

  return (
    <MainLayout title="Pipeline de Vendas" subtitle="Acompanhe seus leads e oportunidades">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnLeads = getLeadsByStatus(column.id);
          return (
            <div
              key={column.id}
              className={cn(
                'flex-shrink-0 w-72 rounded-xl bg-card border border-border/50 shadow-card border-t-4',
                column.color
              )}
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{column.title}</h3>
                  <Badge variant="secondary">{columnLeads.length}</Badge>
                </div>
              </div>
              <div className="p-2 space-y-2 min-h-[400px]">
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-lg bg-background p-3 border border-border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <p className="font-medium text-foreground mb-1">{lead.nome}</p>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {tiposSeguroLabels[lead.interesse]}
                    </Badge>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.telefone}
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                      )}
                      {lead.valor_estimado && (
                        <div className="flex items-center gap-1 text-success font-medium">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(lead.valor_estimado)}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Origem: {origemLeadLabels[lead.origem]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
