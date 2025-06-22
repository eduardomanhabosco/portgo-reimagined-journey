import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx' // 1. Importar o provedor

createRoot(document.getElementById("root")!).render(
  // 2. Envolver o <App /> com o <ThemeProvider>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);