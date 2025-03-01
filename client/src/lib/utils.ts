import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskEmail = (
  email: string,
  options = {
    minVisible: 0.3, // Minimum percentage of visible characters
    maskChar: "*",
    preserveDots: true, // Preserve dots in email
  }
) => {
  if (!email) return "your email address";

  const [localPart, domain] = email.split("@");

  const chars = localPart.split("");

  const minVisibleChars = Math.max(2, Math.floor(chars.length * options.minVisible));

  const maskedChars = chars.map((char, index) => {
    if (index === 0 || index === chars.length - 1) return char;
    if (options.preserveDots && char === ".") return char;

    const remainingPositions = chars.length - index - 1;
    const remainingRequired = minVisibleChars - chars.slice(0, index).filter((c) => c !== options.maskChar).length;
    const probability = remainingRequired / remainingPositions;

    return Math.random() < probability ? char : options.maskChar;
  });

  return `${maskedChars.join("")}@${domain}`;
};

export const extractPathSegment = (url: string, baseSegment: string = "hallyupix") => {
  const startIndex = url.indexOf(baseSegment);
  if (startIndex === -1) {
    return "";
  }

  const endIndex = url.lastIndexOf(".");
  if (endIndex === -1) {
    return "";
  }

  return url.substring(startIndex, endIndex);
};

export const createImageData = (imageUrl: string | null | undefined) => {
  if (!imageUrl) return undefined;

  const publicId = extractPathSegment(imageUrl);
  return publicId
    ? {
        url: imageUrl,
        publicId: publicId,
      }
    : undefined;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
