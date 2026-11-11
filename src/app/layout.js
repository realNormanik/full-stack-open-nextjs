import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Blog app",
  description: "Full Stack Open - blog app in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
};