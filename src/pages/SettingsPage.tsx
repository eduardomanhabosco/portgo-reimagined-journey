import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import apiClient from "@/api";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";

export const SettingsPage = () => {
  const { auth, updateUser } = useAuth();

  const profileForm = useForm({
    defaultValues: {
      name: auth.user?.name || "",
      email: auth.user?.email || "",
      school: auth.user?.school || "",
    },
  });

  const passwordForm = useForm({ defaultValues: { current_password: "", new_password: "", confirm_password: "" } });

  const onProfileSubmit = async (data: { name: string; email: string; school: string }) => {
    toast.info("Atualizando perfil...");
    try {
      const response = await apiClient.put('/users/me', data);
      updateUser(response.data); // Atualiza os dados do usuário no contexto global
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o perfil.");
    }
  };

  const onPasswordSubmit = async (data: any) => {
    if (data.new_password !== data.confirm_password) return toast.error("As novas senhas não coincidem.");
    toast.info("Alterando senha...");
    try {
      await apiClient.put('/users/me/password', { current_password: data.current_password, new_password: data.new_password });
      toast.success("Senha alterada com sucesso!");
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Erro ao alterar a senha.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Configurações</h1>
        <p className="text-gray-500 mb-8">Gerencie suas informações de conta e preferências.</p>
        
        <div className="space-y-8">
          <Card><CardHeader><CardTitle>Informações do Perfil</CardTitle></CardHeader><CardContent>
              <Form {...profileForm}><form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField control={profileForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <FormField control={profileForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl></FormItem>)} />
                <FormField control={profileForm.control} name="school" render={({ field }) => (<FormItem><FormLabel>Escola</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                <Button type="submit">Salvar Perfil</Button>
              </form></Form>
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Alterar Senha</CardTitle></CardHeader><CardContent>
            <Form {...passwordForm}><form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField control={passwordForm.control} name="current_password" render={({ field }) => (<FormItem><FormLabel>Senha Atual</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>)} />
                <FormField control={passwordForm.control} name="new_password" render={({ field }) => (<FormItem><FormLabel>Nova Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>)} />
                <FormField control={passwordForm.control} name="confirm_password" render={({ field }) => (<FormItem><FormLabel>Confirmar Nova Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>)} />
                <Button type="submit" variant="secondary">Alterar Senha</Button>
            </form></Form>
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Aparência</CardTitle></CardHeader><CardContent className="flex items-center justify-between">
              <p className="text-sm font-medium">Tema do site</p>
              <ThemeToggle />
          </CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default SettingsPage;