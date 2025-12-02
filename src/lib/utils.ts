import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 🔥 NEU: Parser für 📁 Ordner + Code-Blöcke → ZIP-Files
export function parseMarkdownStructure(md: string): Array<{ path: string; content: string }> {
  const files: Array<{ path: string; content: string }> = [];
  // Verbesserter Regex: Match 📁 folder/ └─── file.html ```lang\ncode\n```
  const fileRegex = /📁\s*([^\n\/]+?\/)?\s*[-└├─\s]*?([^\n`]+?)(?=\s*```\w*)/g;
  let match;
  while ((match = fileRegex.exec(md)) !== null) {
    const folder = match[1]?.trim() || '';
    const fileName = match[2].trim().replace(/[-└├─\s]/g, '');
    const fullPath = folder + fileName;

    // Code-Block extrahieren (nach fileName)
    const codeStart = md.indexOf('```', match.index);
    const codeEnd = md.indexOf('```', codeStart + 3);
    const codeContent = md.slice(codeStart + 3, codeEnd).trim();

    if (codeContent && fullPath) {
      files.push({ path: fullPath.replace(/📁\s*/, ''), content: codeContent });
    }
  }
  // Fallback: Wenn kein Parse, nimm ganzen Content als index.html
  if (files.length === 0) {
    files.push({ path: 'index.html', content: md });
  }
  return files;
}