import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 🔥 NEU: ZIP-Parser für 📁 + Code-Blöcke
export interface FileEntry {
  path: string;
  content: string;
}

export function parseMarkdownStructure(md: string): FileEntry[] {
  const files: FileEntry[] = [];
  const treeRegex = /📁\s*([^📁]+?)(?=\n)/g;
  let treeMatch: RegExpExecArray | null;
  while ((treeMatch = treeRegex.exec(md)) !== null) {
    // Ordner extrahieren
    const folderContent = treeMatch[1];
    const fileMatches = folderContent.match(/[-└├─\s]*([^\n`]+?)(?=\s*```)/g);
    if (fileMatches) {
      fileMatches.forEach(fileLine => {
        const path = fileLine.trim().replace(/[-└├─\s]/g, '').replace(/📁\s*/, 'index.html');
        // Nächsten Code-Block finden
        const codeStartIdx = md.indexOf('```', treeMatch!.index);
        if (codeStartIdx !== -1) {
          const codeEndIdx = md.indexOf('```', codeStartIdx + 3);
          const content = md.slice(codeStartIdx + 3, codeEndIdx).trim();
          if (content) files.push({ path, content });
        }
      });
    }
  }
  if (files.length === 0) files.push({ path: 'index.html', content: md });
  return files;
}