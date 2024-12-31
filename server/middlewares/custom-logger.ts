import { createMiddleware } from "hono/factory";
import type { HonoOpenAPIConfig } from "../lib/types";

type LogLevel = "info" | "error" | "debug" | "warn";

interface LoggerConfig {
  level?: LogLevel;
  excludePaths?: string[];
  enabled?: boolean;
  mode?: "pretty" | "json";
}

interface LogInfo {
  timestamp: string;
  level: LogLevel;
  method: string;
  path: string;
  requestId: string;
  status?: number;
  duration?: number;
  userAgent?: string;
  contentLength?: number;
  error?: Error;
  ip?: string;
}

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
} as const;

const levelColors: Record<LogLevel, string> = {
  info: colors.blue,
  error: colors.red,
  warn: colors.yellow,
  debug: colors.gray,
};

const symbols: Record<LogLevel | "response", string> = {
  info: "○",
  error: "✖",
  warn: "⚠",
  debug: "→",
  response: "←",
} as const;

function shouldLog(configLevel: LogLevel, messageLevel: LogLevel): boolean {
  const levels: LogLevel[] = ["debug", "info", "warn", "error"];
  return levels.indexOf(messageLevel) >= levels.indexOf(configLevel);
}

function formatPretty(info: LogInfo): string {
  const timestamp = `${colors.gray}${info.timestamp}${colors.reset}`;
  const reqId = `${colors.magenta}${info.requestId.slice(0, 8)}${colors.reset}`;
  const level = `${levelColors[info.level]}${info.level.toUpperCase().padEnd(5)}${colors.reset}`;
  const method = `${colors.cyan}${info.method.padEnd(7)}${colors.reset}`;
  const path = `${colors.blue}${info.path}${colors.reset}`;
  const status = info.status ? `${levelColors.info}${info.status}${colors.reset}` : undefined;

  return [timestamp, reqId, level, symbols[info.level], method, path, status, info.duration && `${colors.yellow}${info.duration.toFixed(2)}ms${colors.reset}`]
    .filter(Boolean)
    .join(" ");
}

export function enhancedLogger(config: LoggerConfig = {}) {
  const { level = "info", excludePaths = ["/health", "/metrics", "/favicon.ico"], enabled = true, mode = "json" } = config;

  if (!enabled) {
    return createMiddleware<HonoOpenAPIConfig>(async (_, next) => await next());
  }

  return createMiddleware<HonoOpenAPIConfig>(async (ctx, next) => {
    const path = ctx.req.path;
    if (excludePaths.includes(path)) {
      return next();
    }

    const requestId = crypto.randomUUID();
    ctx.set("requestId", requestId);

    const startTime = performance.now();
    const baseInfo: Omit<LogInfo, "status" | "duration" | "contentLength" | "error"> = {
      timestamp: new Date().toISOString(),
      level: "debug",
      method: ctx.req.method,
      path,
      requestId,
      ip: ctx.req.header("x-forwarded-for") ?? ctx.req.header("x-real-ip"),
      userAgent: ctx.req.header("user-agent"),
    };

    const log = (info: LogInfo) => {
      const output = mode === "pretty" ? formatPretty(info) : JSON.stringify(info);
      if (info.level === "error") {
        console.error(output);
      } else {
        console.log(output);
      }
    };

    // Log the incoming request
    if (shouldLog(level, "debug")) {
      log({ ...baseInfo, level: "debug" });
    }

    try {
      await next();

      // Log the response
      const duration = performance.now() - startTime;
      if (shouldLog(level, "info")) {
        log({
          ...baseInfo,
          level: "info",
          status: ctx.res.status,
          duration,
          contentLength: parseInt(ctx.res.headers.get("content-length") || "0"),
        });
      }
    } catch (err) {
      // Log errors
      const duration = performance.now() - startTime;
      const errorInfo: LogInfo = {
        ...baseInfo,
        level: "error",
        duration,
        error: err instanceof Error ? err : new Error(String(err)),
      };
      if (shouldLog(level, "error")) {
        log(errorInfo);
      }
      throw err;
    }
  });
}
