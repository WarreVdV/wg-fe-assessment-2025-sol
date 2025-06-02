import { FC } from "react";
import { BrowserRouter, Routes } from "react-router";

interface AppRoutesProps {
  children: React.ReactNode;
}

export const AppRoutes: FC<AppRoutesProps> = ({ children }) => {
  return (
    // Wrapping the routes with BrowserRouter to enable routing in the application
    <BrowserRouter>
      <Routes>{children}</Routes>
    </BrowserRouter>
  );
};
