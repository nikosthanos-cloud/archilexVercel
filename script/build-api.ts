import { build } from "esbuild";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

await build({
  entryPoints: [path.join(root, "server/vercel.ts")],
  platform: "node",
  bundle: true,
  format: "cjs",
  outfile: path.join(root, "api/index.js"),
  alias: {
    "@shared": path.join(root, "shared"),
  },
  external: [
    "@anthropic-ai/sdk",
    "bcryptjs",
    "connect-pg-simple",
    "drizzle-orm",
    "drizzle-zod",
    "express",
    "express-session",
    "memorystore",
    "multer",
    "resend",
    "passport",
    "passport-local",
    "pg",
    "stripe",
    "zod",
    "zod-validation-error",
  ],
  logLevel: "info",
});
