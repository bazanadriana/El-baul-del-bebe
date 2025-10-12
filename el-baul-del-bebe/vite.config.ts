import { webcrypto as _crypto } from "node:crypto";
(globalThis as any).crypto = _crypto as any;
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "/El-baul-del-bebe/" : "/"
});
