import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Medal, Award } from "lucide-react";
import { useState, useEffect } from "react";
import apiClient from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

// Interface para os dados que vêm da API
interface UserFromAPI {
  id: number;
  name: string;
  score: number;
}

// Interface para os dados que o componente usa para renderizar
interface RankingUser extends UserFromAPI {
  position: number;
  points: number;
  level: string;
  avatar: string;
  badge: "crown" | "medal" | "award" | "none";
}

export const RankingPreview = () => {
  const { isAuthenticated } = useAuth();
  const [topUsers, setTopUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<UserFromAPI[]>('/ranking/?limit=5');
        const formattedUsers = response.data.map((user, index) => ({
          ...user,
          position: index + 1,
          points: user.score,
          level: user.score > 2700 ? "Avançado" : "Intermediário",
          avatar: user.name.substring(0, 2).toUpperCase(),
          badge: index === 0 ? "crown" : index === 1 ? "medal" : index === 2 ? "award" : "none",
        }));
        setTopUsers(formattedUsers);
      } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "crown": return <Crown className="h-4 w-4 text-yellow-500" />;
      case "medal": return <Medal className="h-4 w-4 text-gray-400" />;
      case "award": return <Award className="h-4 w-4 text-orange-500" />;
      default: return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Avançado": return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
      case "Intermediário": return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <section id="ranking" className="py-20 px-4 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Ranking
            </span>{" "}
            dos Estudantes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Veja como você se compara com outros estudantes e se inspire para alcançar novos níveis!
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                🏆 Top 5 Estudantes da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))
                ) : (
                  topUsers.map((user) => (
                    <div
                      key={user.id} // Corrigido para usar o ID do usuário como chave
                      className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md ${
                        user.position <= 3 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-800' 
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user.position === 1 ? 'bg-yellow-500 text-white' : user.position === 2 ? 'bg-gray-400 text-white' : user.position === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>
                          {user.position}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2"><h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>{getBadgeIcon(user.badge)}</div>
                          <Badge className={`text-xs ${getLevelColor(user.level)}`}>{user.level}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-800 dark:text-white">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">pontos</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="text-center mt-8">
                {isAuthenticated ? (
                  <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                    <Link to="/select-level">Continuar Desafio</Link>
                  </Button>
                ) : (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Quer aparecer no ranking?</p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Link to="/signup">Começar a Competir</Link>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};