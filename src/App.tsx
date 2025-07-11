import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { AppRoutes } from "./config/routes";
import { Route } from "react-router";
import { RootLayout } from "./layout/root";

import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The RootLayout component is used to wrap the main content of the app */}
      <RootLayout>
        <AppRoutes>
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </AppRoutes>
      </RootLayout>
    </QueryClientProvider>
  );
};

export default App;
