import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider"; // 1. Importar o hook de tema

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme(); // 2. Usar o hook para pegar o tema atual
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setError(null);
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);

      const response = await apiClient.post("/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data && response.data.user && response.data.access_token) {
        login(response.data.user, response.data.access_token);
        navigate("/");
      }
    } catch (err) {
      setError("Falha no login. Verifique seu e-mail e senha.");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            {/* 3. A logo agora muda com base no tema */}
            <img
              src={theme === 'dark' ? '/PortGO_logo branco.png' : '/PortGO_logo preto.png'}
              alt="PortGO Logo"
              className="h-24 w-auto"
            />
          </Link>
          <CardTitle className="text-3xl font-bold dark:text-white">
            Bem-vindo(a) de volta!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Entre na sua conta para continuar.
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
                    <FormLabel className="dark:text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="seu@email.com"
                        {...field}
                      />
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
                    <FormLabel className="dark:text-gray-200">Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <div className="text-right text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm dark:text-gray-300">
            Não tem uma conta?{" "}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Cadastre-se
            </Link>
          </div>
          {/* 4. Botão para voltar para a tela inicial */}
          <div className="mt-4 text-center text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:underline transition-colors"
            >
              Voltar para a tela inicial
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;