import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Configuracoes() {
  return (
    <MainLayout title="Configurações" subtitle="Gerencie as configurações do sistema">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configurações do sistema serão implementadas conforme necessidade.
          </p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
