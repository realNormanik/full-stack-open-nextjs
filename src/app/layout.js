import "./globals.css";
import { Plus_Jakarta_Sans, Gabarito } from "next/font/google";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito" });

export const metadata = {
  title: "Blog app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${gabarito.variable}`}>
      <body>
        <NotificationProvider>
          <NavBar />
          <Notification />
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        </NotificationProvider>
      </body>
    </html>
  );
}