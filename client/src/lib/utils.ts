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
