import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weights: [400, 700],
});

export const metadata = {
  title: "Minemen Tier Tests",
  description: "The most accurate, organized, and active tier testing community for Minecraft PvP!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
