import { FC, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="fixed h-[100vh] w-[100vw] overflow-x-auto bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container mx-auto px-4 pt-4">{children}</div>
    </div>
  );
};

export default Layout;
