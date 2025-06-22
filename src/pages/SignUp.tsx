import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "@/api";

type SignUpFormValues = { name: string; email: string; password: string; school: string; };

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignUpFormValues>({ defaultValues: { name: "", email: "", password: "", school: "" } });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setError(null);
    try {
      await apiClient.post('/users/', data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Erro ao realizar o cadastro.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
        <Link to="/" className="flex justify-center mb-4">
            <img src="/PortGO_logo branco.png" alt="PortGO Logo" className="h-24 w-auto"/>
          </Link>
          <CardTitle className="text-3xl font-bold dark:text-white">Crie sua conta</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Junte-se a nós para dominar o Português!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel className="dark:text-gray-200">Nome</FormLabel><FormControl><Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel className="dark:text-gray-200">Email</FormLabel><FormControl><Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" type="email" placeholder="seu@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="school" render={({ field }) => (<FormItem><FormLabel className="dark:text-gray-200">Nome da Escola</FormLabel><FormControl><Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Colégio Exemplo" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel className="dark:text-gray-200">Senha</FormLabel><FormControl><Input className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>)} />
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm dark:text-gray-300">Já tem uma conta? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Entrar</Link></div>
        </CardContent>
      </Card>
    </div>
  );
};
export default SignUp;