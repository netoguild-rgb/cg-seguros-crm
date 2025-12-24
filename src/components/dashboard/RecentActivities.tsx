import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Phone, Mail, MessageCircle, FileText, RefreshCw, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Atividade, TipoAtividade } from '@/types/crm';

interface RecentActivitiesProps {
  activities: Atividade[];
}

const activityIcons: Record<TipoAtividade, typeof Phone> = {
  ligacao: Phone,
  email: Mail,
  reuniao: FileText,
  whatsapp: MessageCircle,
  cotacao: FileText,
  renovacao: RefreshCw,
  sinistro: AlertTriangle,
  outros: FileText,
};

const activityColors: Record<TipoAtividade, string> = {
  ligacao: 'bg-primary/10 text-primary',
  email: 'bg-info/10 text-info',
  reuniao: 'bg-accent/10 text-accent',
  whatsapp: 'bg-success/10 text-success',
  cotacao: 'bg-warning/10 text-warning',
  renovacao: 'bg-primary/10 text-primary',
  sinistro: 'bg-destructive/10 text-destructive',
  outros: 'bg-muted text-muted-foreground',
};

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card border border-border/50">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Atividades Recentes
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.tipo];
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn('rounded-lg p-2', activityColors[activity.tipo])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.descricao}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(activity.created_at), "dd 'de' MMM 'às' HH:mm", {
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
