// src/pages/Login.tsx
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Removi o formSchema para permitir qualquer dado para demonstração
/*
const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});
*/

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    // resolver: zodResolver(formSchema), // Comentei o resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: any) => {
    // Salva o usuário no localStorage
    localStorage.setItem("portgoUser", JSON.stringify({ email: values.email, name: values.name || "" }));
    // Inicializa a pontuação se não existir
    if (!localStorage.getItem("portgoScore")) {
      localStorage.setItem("portgoScore", "0");
    }
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
              className="h-24 w-auto" // Tamanho do logo
            />
          </div>
          <CardTitle className="text-3xl font-bold">Bem-vindo(a) de volta!</CardTitle>
          <CardDescription className="text-gray-600">
            Entre na sua conta para continuar sua jornada de aprendizado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
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
              <div className="text-right text-sm">
                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2">
                Entrar
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;