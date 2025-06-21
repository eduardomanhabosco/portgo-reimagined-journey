// src/pages/SignUp.tsx
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Comentei o zodResolver
// import * as z from "zod"; // Comentei o zod
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

// Removi o formSchema para permitir qualquer dado para demonstração (bypass)
/*
const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});
*/

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    // resolver: zodResolver(formSchema), // Comentei o resolver para bypass
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: any) => { // Alterado para 'any' para aceitar qualquer valor
    console.log("Dados de cadastro (bypass):", values);
    alert("Cadastro realizado com sucesso com qualquer dado! (Apenas demonstrativo)");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {/* Logo adicionado aqui */}
          <div className="flex justify-center mb-4">
            <img
              src="/PortGO_logo branco.png" // Caminho para o logo na pasta public
              alt="PortGO Logo"
              className="h24 w-auto" // Tamanho do logo
            />
          </div>
          <CardTitle className="text-3xl font-bold">Crie sua conta</CardTitle>
          <CardDescription className="text-gray-600">
            Junte-se a nós para dominar o Português!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2">
                Cadastrar
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;