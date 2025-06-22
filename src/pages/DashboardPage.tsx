import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart2, CheckCircle, Dumbbell, Brain, Award, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "@/api";

export const DashboardPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loadingRank, setLoadingRank] = useState(true);

  useEffect(() => {
    if (auth.user) {
      setLoadingRank(true);
      apiClient.get(`/ranking/`)
        .then(response => {
          const rankIndex = response.data.findIndex((u: { id: number }) => u.id === auth.user?.id);
          if (rankIndex !== -1) {
            setUserRank(rankIndex + 1);
          }
        })
        .catch(error => console.error("Erro ao buscar ranking:", error))
        .finally(() => setLoadingRank(false));
    }
  }, [auth.user]);

  if (!auth.user) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900">
            <p className="dark:text-white">Carregando dados do usuário...</p>
        </div>
    );
  }

  const userScore = auth.user.score;
  const nextLevelScore = Math.floor(userScore / 1000 + 1) * 1000;
  const progressPercentage = (userScore / nextLevelScore) * 100;

  const challengeCards = [
    { title: "Nível Fácil", icon: <Dumbbell className="w-6 h-6 text-green-500" />, path: "/game/question/facil" },
    { title: "Nível Médio", icon: <Brain className="w-6 h-6 text-blue-500" />, path: "/game/question/medio" },
    { title: "Nível Difícil", icon: <Award className="w-6 h-6 text-red-500" />, path: "/game/question/dificil" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10">
          <p className="text-lg text-gray-500 dark:text-gray-400">Bem-vindo(a) de volta,</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">{auth.user.name}!</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">Continuar Jornada</CardTitle>
                <CardDescription className="dark:text-gray-400">Sua próxima meta de aprendizado está a um clique de distância.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">Progresso para {nextLevelScore} pontos</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{userScore} / {nextLevelScore}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <Button size="lg" className="w-full" onClick={() => navigate('/select-level')}>
                  Iniciar Novo Desafio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {challengeCards.map(card => (
                <Card 
                  key={card.path} 
                  onClick={() => navigate(card.path)}
                  className="group cursor-pointer transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 bg-white dark:bg-gray-800/80"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    {card.icon}
                    <h3 className="mt-2 font-semibold dark:text-white">{card.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="text-center bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl">
              <CardHeader><CardTitle className="text-white/90 flex items-center justify-center gap-2"><Star /> Pontuação Total</CardTitle></CardHeader>
              <CardContent><p className="text-6xl font-extrabold">{userScore.toLocaleString()}</p></CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader><CardTitle className="flex items-center dark:text-white"><BarChart2 className="mr-2 text-green-500"/>Ranking</CardTitle></CardHeader>
              <CardContent>
                {loadingRank ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Carregando sua posição...</p> 
                ) : (
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Você está na <span className="font-bold text-blue-600 dark:text-blue-400">#{userRank ?? 'N/A'}</span> posição do ranking geral.
                  </p>
                )}
                <Button onClick={() => navigate('/ranking')} variant="secondary" className="w-full dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white">
                  Ver Ranking Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default DashboardPage;