import type { Context } from "hono";
import { getConnInfo } from "hono/bun";

export const isIp = (value: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?!$)|$)){4}$/;
  const ipv6Regex =
    /^((?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}|(?:[a-fA-F\d]{1,4}:){1,7}:|:(?::[a-fA-F\d]{1,4}){1,7}|::|(?:[a-fA-F\d]{1,4}:){1,6}:[a-fA-F\d]{1,4}|::(?:[a-fA-F\d]{1,4}:){0,5}:[a-fA-F\d]{1,4})$/;

  return ipv4Regex.test(value) || ipv6Regex.test(value);
};

export const extractClientIpFromHeaders = (c: Context): string | null => {
  const headers = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "fastly-client-ip",
    "true-client-ip",
    "x-real-ip",
    "x-cluster-client-ip",
    "x-forwarded",
    "forwarded-for",
    "forwarded",
    "appengine-user-ip",
    "cf-pseudo-ipv4",
  ];

  for (const header of headers) {
    const rawValue: string | undefined = c.req.raw.headers.get(header.toLowerCase()) ?? undefined;
    if (typeof rawValue === "string") {
      const potentialIps = rawValue.split(",");
      for (const potentialIp of potentialIps) {
        const trimmedIp = potentialIp.trim();
        if (isIp(trimmedIp)) {
          return trimmedIp;
        }
      }
    }
  }

  return null;
};

export const sortNestedData = (data: any[], sortField: string, sortOrder: string) => {
  const fields = sortField.split(".");
  return data.sort((a: any, b: any) => {
    let aValue = a;
    let bValue = b;

    for (const field of fields) {
      aValue = aValue[field];
      bValue = bValue[field];
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

export const extractClientIp = (c: Context): string => {
  const connInfo = getConnInfo(c);
  if (connInfo && connInfo.remote && connInfo.remote.address) {
    let ip = cleanIp(connInfo.remote.address);
    if (isIp(ip)) {
      return ip;
    }
  }

  let ip =
    c.req.raw.headers.get("x-forwarded-for") ??
    c.req.raw.headers.get("x-real-ip") ??
    c.req.raw.headers.get("cf-connecting-ip") ??
    c.req.raw.headers.get("remote-addr");

  if (ip) {
    ip = cleanIp(ip);
    if (isIp(ip)) {
      console.log("clientIp (from headers):", ip);
      return ip;
    }
  }
  ip = extractClientIpFromHeaders(c);
  if (ip) {
    console.log("clientIp (from additional headers):", ip);
    return ip;
  }

  console.warn("Warning: Unable to extract client IP, defaulting to 'unknown'");
  return "unknown";
};

const cleanIp = (ip: string): string => ip.replace(/:\d+[^:]*$/, "");
