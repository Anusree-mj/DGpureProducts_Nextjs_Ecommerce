import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectToMongoDB, isMongoDBConnected } from "@/libs/connectDB";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DGpure",
  description: "an ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB()
    .then(() => {
      if (isMongoDBConnected()) {
        console.log("MongoDB is connected");
      } else {
        console.log("MongoDB is not connected");
      }
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
