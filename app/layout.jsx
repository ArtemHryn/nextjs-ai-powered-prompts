'use client'

import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";

import Nav from "@components/Nav";


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
