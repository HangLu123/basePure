import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  corePlugins: {
    preflight: false
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["12px", "28px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"]
    },
    extend: {
      colors: {
        bg_color: "var(--el-bg-color)",
        primary: "var(--el-color-primary)",
        text_color_primary: "var(--el-text-color-primary)",
        text_color_regular: "var(--el-text-color-regular)"
      }
    }
  }
} satisfies Config;
