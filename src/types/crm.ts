// Types for CG Seguros CRM

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf_cnpj: string;
  tipo: 'pf' | 'pj';
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  observacoes?: string;
  data_nascimento?: string;
  created_at: string;
  updated_at: string;
}

export interface Apolice {
  id: string;
  cliente_id: string;
  cliente?: Cliente;
  numero: string;
  seguradora: string;
  tipo_seguro: TipoSeguro;
  valor_premio: number;
  valor_cobertura: number;
  data_inicio: string;
  data_vencimento: string;
  status: StatusApolice;
  comissao_percentual: number;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export type TipoSeguro = 
  | 'auto'
  | 'vida'
  | 'residencial'
  | 'empresarial'
  | 'saude'
  | 'viagem'
  | 'previdencia'
  | 'outros';

export type StatusApolice = 
  | 'ativa'
  | 'pendente'
  | 'vencida'
  | 'cancelada'
  | 'renovacao';

export interface Lead {
  id: string;
  nome: string;
  email?: string;
  telefone: string;
  interesse: TipoSeguro;
  origem: OrigemLead;
  status: StatusLead;
  valor_estimado?: number;
  observacoes?: string;
  responsavel_id?: string;
  created_at: string;
  updated_at: string;
}

export type OrigemLead = 
  | 'typebot'
  | 'site'
  | 'indicacao'
  | 'telefone'
  | 'whatsapp'
  | 'outros';

export type StatusLead = 
  | 'novo'
  | 'contato'
  | 'qualificado'
  | 'proposta'
  | 'negociacao'
  | 'fechado'
  | 'perdido';

export interface Atividade {
  id: string;
  tipo: TipoAtividade;
  descricao: string;
  cliente_id?: string;
  lead_id?: string;
  apolice_id?: string;
  responsavel_id?: string;
  created_at: string;
}

export type TipoAtividade = 
  | 'ligacao'
  | 'email'
  | 'reuniao'
  | 'whatsapp'
  | 'cotacao'
  | 'renovacao'
  | 'sinistro'
  | 'outros';

export interface DashboardMetrics {
  totalClientes: number;
  totalApolices: number;
  apolicesAtivas: number;
  apolicesVencendo: number;
  leadsNovos: number;
  leadsFechados: number;
  receitaMensal: number;
  comissaoMensal: number;
}

export interface PipelineColumn {
  id: StatusLead;
  title: string;
  leads: Lead[];
}
