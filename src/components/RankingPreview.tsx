
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award } from "lucide-react";

export const RankingPreview = () => {
  const topUsers = [
    {
      position: 1,
      name: "Ana Silva",
      points: 2850,
      level: "Avançado",
      avatar: "AS",
      badge: "crown"
    },
    {
      position: 2,
      name: "Carlos Santos",
      points: 2640,
      level: "Avançado",
      avatar: "CS",
      badge: "medal"
    },
    {
      position: 3,
      name: "Maria Oliveira",
      points: 2520,
      level: "Intermediário",
      avatar: "MO",
      badge: "award"
    },
    {
      position: 4,
      name: "João Costa",
      points: 2310,
      level: "Intermediário",
      avatar: "JC",
      badge: "none"
    },
    {
      position: 5,
      name: "Lucia Ferreira",
      points: 2180,
      level: "Intermediário",
      avatar: "LF",
      badge: "none"
    }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "crown":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "medal":
        return <Medal className="h-4 w-4 text-gray-400" />;
      case "award":
        return <Award className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Avançado":
        return "bg-green-100 text-green-700";
      case "Intermediário":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section id="ranking" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Ranking
            </span>{" "}
            dos Estudantes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Veja como você se compara com outros estudantes e se inspire para alcançar novos níveis!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                🏆 Top 5 Estudantes da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md ${
                      user.position <= 3 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Position */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.position === 1 ? 'bg-yellow-500 text-white' :
                        user.position === 2 ? 'bg-gray-400 text-white' :
                        user.position === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {user.position}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar}
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{user.name}</h3>
                          {getBadgeIcon(user.badge)}
                        </div>
                        <Badge className={`text-xs ${getLevelColor(user.level)}`}>
                          {user.level}
                        </Badge>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-800">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">pontos</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Quer aparecer no ranking?</p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer">
                  Começar a Competir
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
