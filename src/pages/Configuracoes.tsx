import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Database, 
  Server, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface ConnectionStatus {
  database: 'connected' | 'disconnected' | 'testing';
  server: 'connected' | 'disconnected' | 'testing';
}

export default function Configuracoes() {
  const [showConnectionString, setShowConnectionString] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    database: 'disconnected',
    server: 'disconnected'
  });

  const [config, setConfig] = useState({
    databaseUrl: '',
    serverUrl: '',
    serverApiKey: ''
  });

  // Carregar configurações salvas
  useEffect(() => {
    const savedConfig = localStorage.getItem('cg_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
      // Auto-testar conexões se houver configurações salvas
      if (parsed.databaseUrl) {
        testDatabaseConnection(parsed.databaseUrl);
      }
      if (parsed.serverUrl) {
        testServerConnection(parsed.serverUrl);
      }
    }
  }, []);

  const testDatabaseConnection = async (url: string) => {
    if (!url) {
      toast.error('Insira a connection string do banco de dados');
      return;
    }

    setConnectionStatus(prev => ({ ...prev, database: 'testing' }));
    
    // Simular teste de conexão - será substituído pela integração real
    setTimeout(() => {
      if (url.includes('neon.tech') || url.includes('postgresql')) {
        setConnectionStatus(prev => ({ ...prev, database: 'connected' }));
        toast.success('Banco de dados conectado com sucesso!');
      } else {
        setConnectionStatus(prev => ({ ...prev, database: 'disconnected' }));
        toast.error('Falha ao conectar com o banco de dados');
      }
    }, 1500);
  };

  const testServerConnection = async (url: string) => {
    if (!url) {
      toast.error('Insira a URL do servidor');
      return;
    }

    setConnectionStatus(prev => ({ ...prev, server: 'testing' }));
    
    // Simular teste de conexão - será substituído pela integração real
    setTimeout(() => {
      if (url.includes('render.com') || url.includes('http')) {
        setConnectionStatus(prev => ({ ...prev, server: 'connected' }));
        toast.success('Servidor conectado com sucesso!');
      } else {
        setConnectionStatus(prev => ({ ...prev, server: 'disconnected' }));
        toast.error('Falha ao conectar com o servidor');
      }
    }, 1500);
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    
    // Salvar configurações
    localStorage.setItem('cg_config', JSON.stringify(config));
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configurações salvas com sucesso!');
      
      // Testar conexões após salvar
      if (config.databaseUrl) {
        testDatabaseConnection(config.databaseUrl);
      }
      if (config.serverUrl) {
        testServerConnection(config.serverUrl);
      }
    }, 500);
  };

  const getStatusBadge = (status: 'connected' | 'disconnected' | 'testing') => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle className="w-3 h-3" />
            Conectado
          </Badge>
        );
      case 'testing':
        return (
          <Badge variant="secondary" className="gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Testando...
          </Badge>
        );
      default:
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" />
            Desconectado
          </Badge>
        );
    }
  };

  return (
    <MainLayout title="Configurações" subtitle="Gerencie as configurações do sistema">
      <div className="grid gap-6 max-w-4xl">
        {/* Configurações de Banco de Dados */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Banco de Dados Neon</CardTitle>
                  <CardDescription>Configure a conexão com o banco PostgreSQL</CardDescription>
                </div>
              </div>
              {getStatusBadge(connectionStatus.database)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="databaseUrl">Connection String</Label>
              <div className="relative">
                <Input
                  id="databaseUrl"
                  type={showConnectionString ? 'text' : 'password'}
                  placeholder="postgresql://user:password@ep-xxx.neon.tech/database"
                  value={config.databaseUrl}
                  onChange={(e) => setConfig({ ...config, databaseUrl: e.target.value })}
                  className="pr-20 font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setShowConnectionString(!showConnectionString)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConnectionString ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Encontre a connection string no painel do Neon em "Connection Details"
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => testDatabaseConnection(config.databaseUrl)}
              disabled={connectionStatus.database === 'testing' || !config.databaseUrl}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${connectionStatus.database === 'testing' ? 'animate-spin' : ''}`} />
              Testar Conexão
            </Button>
          </CardContent>
        </Card>

        {/* Configurações do Servidor */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Server className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Servidor Render</CardTitle>
                  <CardDescription>Configure a conexão com o backend</CardDescription>
                </div>
              </div>
              {getStatusBadge(connectionStatus.server)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serverUrl">URL do Servidor</Label>
              <Input
                id="serverUrl"
                type="url"
                placeholder="https://seu-app.onrender.com"
                value={config.serverUrl}
                onChange={(e) => setConfig({ ...config, serverUrl: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                URL do seu serviço backend hospedado no Render
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serverApiKey">API Key (Opcional)</Label>
              <Input
                id="serverApiKey"
                type="password"
                placeholder="Chave de autenticação da API"
                value={config.serverApiKey}
                onChange={(e) => setConfig({ ...config, serverApiKey: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Chave para autenticar requisições ao servidor
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => testServerConnection(config.serverUrl)}
              disabled={connectionStatus.server === 'testing' || !config.serverUrl}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${connectionStatus.server === 'testing' ? 'animate-spin' : ''}`} />
              Testar Conexão
            </Button>
          </CardContent>
        </Card>

        {/* Configurações Gerais */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <SettingsIcon className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Configurações adicionais do sistema serão implementadas conforme necessidade.
            </p>
          </CardContent>
        </Card>

        <Separator />

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
