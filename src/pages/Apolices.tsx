import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockApolices, mockClientes, tiposSeguroLabels, statusApoliceLabels } from '@/lib/mock-data';
import { Apolice, StatusApolice, TipoSeguro } from '@/types/crm';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const statusColors: Record<StatusApolice, string> = {
  ativa: 'bg-success/10 text-success border-success/20',
  pendente: 'bg-warning/10 text-warning border-warning/20',
  vencida: 'bg-destructive/10 text-destructive border-destructive/20',
  cancelada: 'bg-muted text-muted-foreground border-muted',
  renovacao: 'bg-primary/10 text-primary border-primary/20',
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default function Apolices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tipoFilter, setTipoFilter] = useState<string>('all');

  const apolicesWithClientes = mockApolices.map((apolice) => ({
    ...apolice,
    cliente: mockClientes.find((c) => c.id === apolice.cliente_id),
  }));

  const filteredApolices = apolicesWithClientes.filter((apolice) => {
    const matchesSearch =
      apolice.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apolice.seguradora.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apolice.cliente?.nome.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || apolice.status === statusFilter;
    const matchesTipo = tipoFilter === 'all' || apolice.tipo_seguro === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  return (
    <MainLayout title="Apólices" subtitle="Gerencie suas apólices de seguro">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por número, seguradora ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              {Object.entries(statusApoliceLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Tipos</SelectItem>
              {Object.entries(tiposSeguroLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Apólice
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border/50 shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Apólice</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApolices.map((apolice) => (
              <TableRow key={apolice.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{apolice.numero}</p>
                      <p className="text-sm text-muted-foreground">{apolice.seguradora}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-foreground">
                    {apolice.cliente?.nome || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {tiposSeguroLabels[apolice.tipo_seguro]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {formatCurrency(apolice.valor_premio)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cobertura: {formatCurrency(apolice.valor_cobertura)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">
                    {format(new Date(apolice.data_vencimento), 'dd/MM/yyyy')}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusColors[apolice.status])}
                  >
                    {statusApoliceLabels[apolice.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Renovar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}
