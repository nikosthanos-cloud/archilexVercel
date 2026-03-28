import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.set("trust proxy", 1);
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Initialize routes once at module load
let startupError: Error | null = null;
const ready = registerRoutes(httpServer, app)
  .then(() => {
    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      if (res.headersSent) return next(err);
      return res.status(status).json({ message });
    });
  })
  .catch((err: Error) => {
    startupError = err;
    console.error("Server startup failed:", err.message);
  });

export default async function handler(req: Request, res: Response) {
  await ready;
  if (startupError) {
    return res.status(500).json({ message: `Server startup failed: ${startupError.message}` });
  }
  return app(req, res);
}
