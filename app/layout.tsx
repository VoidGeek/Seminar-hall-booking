import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seminar Hall Management",
  description: "Manage seminar halls, volunteers, and maintenance requests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setInitialThemeScript = `
    (function() {
      const storedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', storedTheme);
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: setInitialThemeScript,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
