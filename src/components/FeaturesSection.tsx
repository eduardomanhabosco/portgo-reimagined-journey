
import { BookOpen, Target, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Modulo estudar",
      description: "Pratique gramática, interpretação de texto e redação com exercícios personalizados para seu nível.",
      color: "blue"
    },
    {
      icon: Trophy,
      title: "Sistema de Ranking",
      description: "Compare seu progresso com outros estudantes e conquiste medalhas por suas conquistas.",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="exercicios" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Por que escolher o{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              PortGO?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma combina metodologia educacional comprovada com tecnologia moderna 
            para criar a melhor experiência de aprendizado de português.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-2xl ${getColorClasses(feature.color)} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
