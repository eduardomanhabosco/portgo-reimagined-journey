import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, auth, logout } = useAuth();
  const { theme } = useTheme();

  const navLinks = [
    { name: 'Início', path: isAuthenticated ? '/' : '/#inicio' },
    { name: 'Exercícios', path: isAuthenticated ? '/select-level' : '/#exercicios' },
    { name: 'Ranking', path: isAuthenticated ? '/ranking' : '/#ranking' }
  ];

  const renderNavLinks = (isMobile = false) => {
    return navLinks.map(link => {
      if (!isAuthenticated) {
        return (
          <a
            key={link.name}
            href={link.path}
            onClick={() => isMobile && setIsMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2 md:py-0"
          >
            {link.name}
          </a>
        );
      }
      return (
        <Link
          key={link.name}
          to={link.path}
          onClick={() => isMobile && setIsMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2 md:py-0"
        >
          {link.name}
        </Link>
      );
    });
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <Link to="/">
              <img
                src={theme === 'dark' ? '/PortGO_logo branco.png' : '/PortGO_logo preto.png'}
                alt="PortGO Logo"
                className="h-10 w-auto transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {renderNavLinks()}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="dark:text-gray-200 dark:hover:bg-gray-700">Olá, {auth.user?.name}!</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuLabel className="dark:text-gray-400">Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700"/>
                  <DropdownMenuItem asChild>
                    <Link to="/" className="dark:text-gray-200 dark:focus:bg-gray-700 w-full cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4"/>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="dark:text-gray-200 dark:focus:bg-gray-700 w-full cursor-pointer"><Settings className="mr-2 h-4 w-4"/>Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="dark:bg-gray-700"/>
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-500 dark:focus:bg-red-900/50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4"/>Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
                  <Link to="/login"><User className="h-4 w-4 mr-2" />Entrar</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <Link to="/signup">Começar Agora</Link>
                </Button>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3 px-4">
              {renderNavLinks(true)}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <Button onClick={logout} variant="ghost" className="text-red-600 justify-start"><LogOut className="h-4 w-4 mr-2" />Sair</Button>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="text-blue-600 dark:text-blue-400 justify-start"><Link to="/login"><User className="h-4 w-4 mr-2" />Entrar</Link></Button>
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"><Link to="/signup">Começar Agora</Link></Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};