import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    base: "#F7F8FA",
                    surface: "#FFFFFF",
                },
                text: {
                    primary: "#0F172A",
                    secondary: "#475569",
                    muted: "#94A3B8",
                },
                brand: {
                    primary: "#6366F1",
                    soft: "#EEF2FF",
                },
                danger: "#EF4444",
                success: "#22C55E",
            },
            boxShadow: {
                soft: "0 4px 20px rgba(15, 23, 42, 0.06)",
                card: "0 8px 30px rgba(15, 23, 42, 0.08)",
            },
            borderRadius: {
                xl: "14px",
            },
        },
    },
    plugins: [],
};

export default config;
