import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Bot, 
  CheckCircle, 
  MessageCircle,
  Headphones,
  Mail,
  Phone
} from 'lucide-react';

interface StatusItemProps {
  label: string;
  status: 'online' | 'offline' | 'warning';
  icon: React.ElementType;
}

const StatusItem = ({ label, status, icon: Icon }: StatusItemProps) => {
  const statusConfig = {
    online: {
      badge: 'Online',
      badgeClass: 'bg-success/10 text-success border-success/20',
      dotClass: 'bg-success animate-pulse'
    },
    offline: {
      badge: 'Offline',
      badgeClass: 'bg-destructive/10 text-destructive border-destructive/20',
      dotClass: 'bg-destructive'
    },
    warning: {
      badge: 'Atenção',
      badgeClass: 'bg-warning/10 text-warning border-warning/20',
      dotClass: 'bg-warning animate-pulse'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.dotClass}`} />
        <Badge variant="outline" className={config.badgeClass}>
          {config.badge}
        </Badge>
      </div>
    </div>
  );
};

export function SystemStatus() {
  const handleContactSupport = (method: 'whatsapp' | 'email' | 'phone') => {
    switch (method) {
      case 'whatsapp':
        window.open('https://wa.me/5500000000000', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:suporte@cgseguros.com.br';
        break;
      case 'phone':
        window.location.href = 'tel:+5500000000000';
        break;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          Status do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Items */}
        <div className="space-y-2">
          <StatusItem 
            label="Site CG Seguros" 
            status="online" 
            icon={Globe} 
          />
          <StatusItem 
            label="Agente Autônomo" 
            status="online" 
            icon={Bot} 
          />
        </div>

        {/* Support Section */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Precisa de ajuda? Entre em contato com o suporte:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-success/10 hover:text-success hover:border-success/30"
              onClick={() => handleContactSupport('whatsapp')}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              onClick={() => handleContactSupport('email')}
            >
              <Mail className="w-4 h-4" />
              E-mail
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-info/10 hover:text-info hover:border-info/30"
              onClick={() => handleContactSupport('phone')}
            >
              <Phone className="w-4 h-4" />
              Telefone
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
