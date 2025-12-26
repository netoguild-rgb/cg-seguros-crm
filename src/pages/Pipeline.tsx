import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockLeads, statusLeadLabels, tiposSeguroLabels, origemLeadLabels } from '@/lib/mock-data';
import { Lead, StatusLead } from '@/types/crm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  DollarSign, 
  Send, 
  MessageSquare, 
  Users, 
  Target,
  Zap,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  Megaphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const columns: { id: StatusLead; title: string; color: string; icon: React.ReactNode }[] = [
  { id: 'novo', title: 'Novos Leads', color: 'border-t-primary', icon: <Target className="h-4 w-4" /> },
  { id: 'contato', title: 'Em Contato', color: 'border-t-info', icon: <Phone className="h-4 w-4" /> },
  { id: 'qualificado', title: 'Qualificados', color: 'border-t-accent', icon: <CheckCircle2 className="h-4 w-4" /> },
  { id: 'proposta', title: 'Proposta Enviada', color: 'border-t-warning', icon: <Send className="h-4 w-4" /> },
  { id: 'negociacao', title: 'Em Negociação', color: 'border-t-primary', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'fechado', title: 'Fechados', color: 'border-t-success', icon: <CheckCircle2 className="h-4 w-4" /> },
];

const campaignTypes = [
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="h-4 w-4" />, color: 'bg-green-500 hover:bg-green-600' },
  { id: 'email', label: 'E-mail Marketing', icon: <Mail className="h-4 w-4" />, color: 'bg-blue-500 hover:bg-blue-600' },
  { id: 'sms', label: 'SMS', icon: <Phone className="h-4 w-4" />, color: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'promocao', label: 'Promoção', icon: <Megaphone className="h-4 w-4" />, color: 'bg-primary hover:bg-primary/90' },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Pipeline() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<StatusLead | 'all'>('all');
  const { toast } = useToast();

  const getLeadsByStatus = (status: StatusLead) =>
    leads.filter((lead) => lead.status === status);

  const filteredLeads = activeFilter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === activeFilter);

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = (status: StatusLead) => {
    const columnLeads = getLeadsByStatus(status);
    const allSelected = columnLeads.every(lead => selectedLeads.includes(lead.id));
    
    if (allSelected) {
      setSelectedLeads(prev => prev.filter(id => !columnLeads.find(l => l.id === id)));
    } else {
      setSelectedLeads(prev => [...new Set([...prev, ...columnLeads.map(l => l.id)])]);
    }
  };

  const handleCampaign = (type: string) => {
    if (selectedLeads.length === 0) {
      toast({
        title: "Nenhum lead selecionado",
        description: "Selecione pelo menos um lead para disparar a campanha.",
        variant: "destructive",
      });
      return;
    }

    const campaignName = campaignTypes.find(c => c.id === type)?.label;
    toast({
      title: "Campanha Iniciada!",
      description: `Disparando ${campaignName} para ${selectedLeads.length} lead(s).`,
    });
    
    // Reset selection after campaign
    setSelectedLeads([]);
  };

  const totalValue = selectedLeads.reduce((acc, id) => {
    const lead = leads.find(l => l.id === id);
    return acc + (lead?.valor_estimado || 0);
  }, 0);

  return (
    <MainLayout title="Pipeline de Campanhas" subtitle="Gerencie leads e dispare campanhas em massa">
      {/* Campaign Control Panel */}
      <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Central de Campanhas</CardTitle>
                <CardDescription>Selecione leads e dispare campanhas personalizadas</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Leads Selecionados</p>
                <p className="text-2xl font-bold text-primary">{selectedLeads.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Valor Potencial</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {campaignTypes.map((campaign) => (
              <Button
                key={campaign.id}
                onClick={() => handleCampaign(campaign.id)}
                className={cn("gap-2 text-white shadow-lg transition-all hover:scale-105", campaign.color)}
                disabled={selectedLeads.length === 0}
              >
                {campaign.icon}
                {campaign.label}
                {selectedLeads.length > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-white/20 text-white">
                    {selectedLeads.length}
                  </Badge>
                )}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setSelectedLeads([])}
              className="gap-2"
              disabled={selectedLeads.length === 0}
            >
              Limpar Seleção
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {columns.map((column) => {
          const count = getLeadsByStatus(column.id).length;
          const isActive = activeFilter === column.id;
          return (
            <button
              key={column.id}
              onClick={() => setActiveFilter(isActive ? 'all' : column.id)}
              className={cn(
                "p-3 rounded-xl border transition-all text-left",
                isActive 
                  ? "bg-primary text-white border-primary shadow-lg" 
                  : "bg-card border-border hover:border-primary/50 hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={isActive ? "text-white" : "text-primary"}>{column.icon}</span>
                <span className={cn("text-xs font-medium", isActive ? "text-white/80" : "text-muted-foreground")}>
                  {column.title}
                </span>
              </div>
              <p className={cn("text-2xl font-bold", isActive ? "text-white" : "text-foreground")}>{count}</p>
            </button>
          );
        })}
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnLeads = getLeadsByStatus(column.id);
          const allSelected = columnLeads.length > 0 && columnLeads.every(lead => selectedLeads.includes(lead.id));
          const someSelected = columnLeads.some(lead => selectedLeads.includes(lead.id));
          
          return (
            <div
              key={column.id}
              className={cn(
                'flex-shrink-0 w-80 rounded-xl bg-card border border-border/50 shadow-card border-t-4',
                column.color
              )}
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{column.icon}</span>
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                  </div>
                  <Badge variant="secondary" className="font-bold">{columnLeads.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    <Checkbox 
                      checked={allSelected}
                      onCheckedChange={() => handleSelectAll(column.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    Selecionar todos
                  </label>
                  {someSelected && (
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                      {columnLeads.filter(l => selectedLeads.includes(l.id)).length} selecionado(s)
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-2 space-y-2 min-h-[400px] max-h-[600px] overflow-y-auto">
                {columnLeads.map((lead) => {
                  const isSelected = selectedLeads.includes(lead.id);
                  return (
                    <div
                      key={lead.id}
                      onClick={() => handleSelectLead(lead.id)}
                      className={cn(
                        "rounded-lg p-3 border transition-all cursor-pointer",
                        isSelected 
                          ? "bg-primary/10 border-primary shadow-md ring-2 ring-primary/30" 
                          : "bg-background border-border hover:shadow-md hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleSelectLead(lead.id)}
                            className="data-[state=checked]:bg-primary"
                          />
                          <p className="font-medium text-foreground">{lead.nome}</p>
                        </div>
                      </div>
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
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {origemLeadLabels[lead.origem]}
                        </span>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 hover:bg-green-500/20 hover:text-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast({ title: "WhatsApp", description: `Abrindo conversa com ${lead.nome}` });
                            }}
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 hover:bg-blue-500/20 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast({ title: "E-mail", description: `Enviando e-mail para ${lead.email}` });
                            }}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 hover:bg-primary/20 hover:text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast({ title: "Ligação", description: `Iniciando chamada para ${lead.telefone}` });
                            }}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
