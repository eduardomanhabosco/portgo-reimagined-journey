import { BookOpen, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export const FeaturesSection = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      id: "estudar",
      icon: BookOpen,
      title: "Módulo Estudar",
      description: "Pratique gramática, interpretação de texto e redação com exercícios personalizados para seu nível.",
      color: "blue",
      link: isAuthenticated ? "/select-level" : "/login"
    },
    {
      id: "ranking",
      icon: Trophy,
      title: "Sistema de Ranking",
      description: "Compare seu progresso com outros estudantes e conquiste medalhas por suas conquistas.",
      color: "green",
      link: "#ranking"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
      green: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
  };

  const CardContentComponent = ({ feature }: { feature: typeof features[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-800/50">
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 rounded-2xl ${getColorClasses(feature.color)} flex items-center justify-center mx-auto mb-4`}>
          <feature.icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  return (
    <section id="exercicios" className="py-20 px-4 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Por que escolher o{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              PortGO?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nossa plataforma combina metodologia educacional comprovada com tecnologia moderna
            para criar a melhor experiência de aprendizado de português.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature) => {
            if (feature.id === 'ranking') {
              return (
                <a href={feature.link} key={feature.id} className="block hover:no-underline">
                  <CardContentComponent feature={feature} />
                </a>
              )
            }
            return (
              <Link to={feature.link} key={feature.id} className="block hover:no-underline">
                <CardContentComponent feature={feature} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};