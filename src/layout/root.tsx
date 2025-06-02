import { FC } from "react";

import Header from "../components/Header/Header";

interface RootProps {
  children: React.ReactNode;
}

export const RootLayout: FC<RootProps> = ({ children }) => {
  return (
    <div>
      <Header
        title="Solution WeGroup Assignment"
        subtitle="Welcome user! 👋"
      ></Header>
      <main className="p-4">{children}</main>
    </div>
  );
};
