import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export interface CustomHTTPExceptionOptions {
  res?: Response;
  message?: string;
  cause?: unknown;
  code?: string;
}

export class CustomHTTPException extends HTTPException {
  status: ContentfulStatusCode;
  code: string | undefined;

  constructor(status: ContentfulStatusCode, options?: CustomHTTPExceptionOptions) {
    super(status, options);
    this.status = status;
    this.code = options?.code;
  }

  getResponse(): Response {
    const response = super.getResponse();
    if (this.status) {
      const body = {
        code: this.code ?? this.status ?? "UNKNOWN_ERROR",
        message: this.message || "An error occurred",
      };
      return new Response(JSON.stringify(body), {
        status: this.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return response;
  }
}
