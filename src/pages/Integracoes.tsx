import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Database, Server, CheckCircle } from 'lucide-react';

export default function Integracoes() {
  return (
    <MainLayout title="Integrações" subtitle="Conecte seu CRM a outras ferramentas">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Typebot */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Typebot</CardTitle>
                  <CardDescription>Chatbot inteligente</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Webhook URL (Receber Leads)</Label>
              <Input value="https://seu-servidor.render.com/api/typebot/lead" readOnly />
            </div>
            <div className="space-y-2">
              <Label>API Consulta</Label>
              <Input value="https://seu-servidor.render.com/api/typebot/query" readOnly />
            </div>
            <Button variant="outline" className="w-full gap-2">
              <CheckCircle className="h-4 w-4" />
              Testar Conexão
            </Button>
          </CardContent>
        </Card>

        {/* Neon Database */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Neon Database</CardTitle>
                  <CardDescription>PostgreSQL Serverless</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Conectado
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Connection String</Label>
              <Input type="password" value="postgresql://***" readOnly />
            </div>
            <p className="text-sm text-muted-foreground">
              Banco de dados configurado no servidor Render
            </p>
          </CardContent>
        </Card>

        {/* Render Server */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-warning/10 p-2">
                  <Server className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-lg">Render</CardTitle>
                  <CardDescription>Servidor Backend</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Online
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>URL do Servidor</Label>
              <Input placeholder="https://seu-app.onrender.com" />
            </div>
            <Button variant="outline" className="w-full">
              Salvar Configuração
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
