import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppRoutes } from "./config/routes.tsx";
import { Route } from "react-router";

// Enable React Strict Mode if you want to use it (components will be rendered twice)
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AppRoutes>
    <Route path="/" element={<App />} />
  </AppRoutes>

  // </StrictMode>,
);
