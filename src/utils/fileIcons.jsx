import { SiJavascript, SiReact, SiCss, SiHtml5, SiJson, SiTypescript } from 'react-icons/si';
import { FileText } from 'lucide-react';

export const getFileIcon = (filename) => {
  if (filename.endsWith('.jsx')) return <SiReact className="w-4 h-4 text-[#61DAFB]" />;
  if (filename.endsWith('.js')) return <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />;
  if (filename.endsWith('.ts')) return <SiTypescript className="w-4 h-4 text-[#3178C6]" />;
  if (filename.endsWith('.tsx')) return <SiReact className="w-4 h-4 text-[#61DAFB]" />;
  if (filename.endsWith('.css')) return <SiCss className="w-4 h-4 text-[#1572B6]" />;
  if (filename.endsWith('.html')) return <SiHtml5 className="w-4 h-4 text-[#E34F26]" />;
  if (filename.endsWith('.json')) return <SiJson className="w-4 h-4 text-[#CBCB41]" />;
  return <FileText className="w-4 h-4 text-muted-foreground" />;
};
