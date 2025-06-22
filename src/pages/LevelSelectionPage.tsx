// src/pages/LevelSelectionPage.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Brain, Award } from "lucide-react"; // Ícones para os níveis
import { useNavigate } from "react-router-dom"; // Para navegação

const LevelSelectionPage = () => {
  const navigate = useNavigate();

  // Função para lidar com a seleção do nível
  const handleLevelSelect = (levelKey: string) => { // Mudança aqui: agora recebe uma 'levelKey'
    // Redireciona para a QuestionPage, passando a chave padronizada do nível na URL
    navigate(`/game/question/${levelKey}`); // Passamos diretamente a chave padronizada
  };

  const levels = [
    {
      name: "1º ano Ensino Médio",
      key: "facil", // Nova propriedade 'key' que será usada na URL e no questions.json
      icon: Dumbbell,
      description: "Conteúdo fundamental do primeiro ano do Ensino Médio. Ideal para reforçar a base.",
      color: "from-green-400 to-green-600",
      textColor: "text-green-800",
      hoverColor: "hover:from-green-500 hover:to-green-700"
    },
    {
      name: "2º ano Ensino Médio",
      key: "medio", // Nova propriedade 'key'
      icon: Brain,
      description: "Tópicos e desafios do segundo ano do Ensino Médio. Aprofunde seus conhecimentos.",
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-800",
      hoverColor: "hover:from-yellow-500 hover:to-yellow-700"
    },
    {
      name: "3º ano Ensino Médio",
      key: "dificil", // Nova propriedade 'key'
      icon: Award,
      description: "Revisão e aprofundamento para o terceiro ano e preparação para exames importantes.",
      color: "from-red-400 to-red-600",
      textColor: "text-red-800",
      hoverColor: "hover:from-red-500 hover:to-red-700"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Escolha o{" "}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Ano Escolar
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Selecione o ano do Ensino Médio para começar a praticar português.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {levels.map((level, index) => (
          <Card
            key={index}
            className={`shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-gray-200`}
            // Ao clicar, passamos a 'level.key' que é 'facil', 'medio' ou 'dificil'
            onClick={() => handleLevelSelect(level.key)}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center mx-auto mb-4`}>
                <level.icon className="h-10 w-10 text-white" />
              </div>
              <CardTitle className={`text-2xl font-bold ${level.textColor}`}>
                {level.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 leading-relaxed">
                {level.description}
              </CardDescription>
              <Button
                className={`mt-6 w-full bg-gradient-to-r ${level.color} ${level.hoverColor} text-white font-semibold py-3`}
                // O botão também usa a 'level.key'
                onClick={(e) => {
                  e.stopPropagation(); // Previne que o click do botão acione o click do Card
                  handleLevelSelect(level.key);
                }}
              >
                Selecionar {level.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelSelectionPage;