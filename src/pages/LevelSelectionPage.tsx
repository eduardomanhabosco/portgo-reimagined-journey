// src/pages/LevelSelectionPage.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Brain, Award, ArrowLeft, Book } from "lucide-react"; // Importe o ícone Book
import { useNavigate, Link } from "react-router-dom";

export const LevelSelectionPage = () => {
  const navigate = useNavigate();

  const handleLevelSelect = (levelKey: string) => {
    navigate(`/game/question/${levelKey}`);
  };

  const levels = [
    {
      name: "1º ano Ensino Médio",
      key: "facil",
      icon: Dumbbell,
      description: "Conteúdo fundamental do primeiro ano. Ideal para reforçar a base.",
      color: "from-green-500 to-teal-500",
      shadow: "shadow-green-500/30",
      textColor: "text-green-800 dark:text-green-200"
    },
    {
      name: "2º ano Ensino Médio",
      key: "medio",
      icon: Brain,
      description: "Tópicos e desafios do segundo ano. Aprofunde seus conhecimentos.",
      color: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/30",
      textColor: "text-blue-800 dark:text-blue-200"
    },
    {
      name: "3º ano Ensino Médio",
      key: "dificil",
      icon: Award,
      description: "Revisão e aprofundamento para exames importantes.",
      color: "from-red-500 to-rose-500",
      shadow: "shadow-red-500/30",
      textColor: "text-red-800 dark:text-red-200"
    },
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 overflow-hidden">
      
      {/* --- BOTÃO VOLTAR --- */}
      <div className="absolute top-6 left-6 z-10">
        <Button asChild variant="ghost" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Início
          </Link>
        </Button>
      </div>
      
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          Escolha o <span className="text-blue-600">Ano Escolar</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Selecione o nível para começar a praticar.
        </p>

        {/* --- BOTÃO DE REGRAS --- */}
        <div className="mb-12">
          <Button asChild variant="outline" className="text-purple-600 dark:text-purple-400 border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Link to="/rules">
              <Book className="mr-2 h-4 w-4" />
              Ver Regras do Jogo
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level) => (
            <div
              key={level.key}
              onClick={() => handleLevelSelect(level.key)}
              className="group cursor-pointer"
            >
              <Card
                className={`w-full h-full text-left rounded-2xl border-2 border-transparent transition-all duration-300 ease-in-out group-hover:border-blue-500 group-hover:shadow-2xl group-hover:-translate-y-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm ${level.shadow}`}
              >
                <CardHeader className="pt-8 px-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <level.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`text-2xl font-bold text-gray-900 dark:text-white`}>
                    {level.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-base min-h-[3rem]">
                    {level.description}
                  </CardDescription>
                  <div className="mt-6 font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                    Começar agora <ArrowLeft className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 rotate-180" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LevelSelectionPage;