import { FC } from "react";
import { BrowserRouter, Routes } from "react-router";

interface AppRoutesProps {
  children: React.ReactNode;
}

export const AppRoutes: FC<AppRoutesProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>{children}</Routes>
    </BrowserRouter>
  );
};
