import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Apolice } from '@/types/crm';
import { tiposSeguroLabels } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

interface UpcomingRenewalsProps {
  apolices: Apolice[];
}

export function UpcomingRenewals({ apolices }: UpcomingRenewalsProps) {
  const sortedApolices = [...apolices]
    .filter((a) => a.status === 'ativa' || a.status === 'renovacao')
    .sort(
      (a, b) =>
        new Date(a.data_vencimento).getTime() - new Date(b.data_vencimento).getTime()
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Próximas Renovações
      </h3>
      <div className="space-y-3">
        {sortedApolices.map((apolice) => {
          const daysUntilExpiry = differenceInDays(
            new Date(apolice.data_vencimento),
            new Date()
          );
          const isUrgent = daysUntilExpiry <= 30;
          const isWarning = daysUntilExpiry <= 60 && daysUntilExpiry > 30;

          return (
            <div
              key={apolice.id}
              className={cn(
                'flex items-center justify-between rounded-lg p-3 border transition-colors',
                isUrgent && 'bg-destructive/5 border-destructive/20',
                isWarning && 'bg-warning/5 border-warning/20',
                !isUrgent && !isWarning && 'bg-secondary/50 border-border'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-lg p-2',
                    isUrgent && 'bg-destructive/10 text-destructive',
                    isWarning && 'bg-warning/10 text-warning',
                    !isUrgent && !isWarning && 'bg-primary/10 text-primary'
                  )}
                >
                  {isUrgent ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {apolice.numero}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tiposSeguroLabels[apolice.tipo_seguro]} • {apolice.seguradora}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={isUrgent ? 'destructive' : isWarning ? 'outline' : 'secondary'}
                  className={cn(
                    isWarning && 'border-warning text-warning'
                  )}
                >
                  {daysUntilExpiry} dias
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(apolice.data_vencimento), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
