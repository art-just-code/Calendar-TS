import type { Metadata } from "next";
import App from "./App";
import "./globals.css";

export const metadata: Metadata = {
    title: "Аренда досок SUP в Рязани",
    description: "Сапы посуточно с доставкой по городу и области",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}
