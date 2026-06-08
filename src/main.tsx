import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { initHotjar } from "./app/lib/hotjar";
import "./styles/index.css";

initHotjar(import.meta.env.VITE_HOTJAR_SITE_ID);

createRoot(document.getElementById("root")!).render(<App />);
  