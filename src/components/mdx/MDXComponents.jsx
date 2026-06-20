import { Link } from 'react-router-dom';

// Custom MDX component overrides for rich Notion-like rendering
export const MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-6 text-foreground border-b pb-4">{children}</h1>
  ),
  h2: ({ children, ...props }) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined;
    return <h2 id={id} className="text-2xl font-bold mt-10 mb-4 text-foreground scroll-mt-20">{children}</h2>;
  },
  h3: ({ children, ...props }) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined;
    return <h3 id={id} className="text-xl font-semibold mt-8 mb-3 text-foreground scroll-mt-20">{children}</h3>;
  },
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mt-6 mb-2 text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="leading-7 text-foreground/90 mb-4">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">{children}</a>;
    }
    return <Link to={href} className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">{children}</Link>;
  },
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2 text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-4 mb-4 pl-4 border-l-4 border-primary/50 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
  code: ({ children, className }) => {
    // Inline code (no language class)
    if (!className) {
      return (
        <code className="relative rounded bg-muted px-[0.4em] py-[0.2em] font-mono text-sm font-medium text-foreground border">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border bg-[#1e1e1e] p-5 text-sm font-mono leading-relaxed shadow-lg">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-muted/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 text-muted-foreground">{children}</td>,

  // Custom components available inside .mdx files
  Callout: ({ children, type = 'info' }) => {
    const styles = {
      info:    'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400',
      warning: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400',
      tip:     'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
      danger:  'border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400',
    };
    const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡', danger: '🚨' };
    return (
      <div className={`flex gap-3 my-6 p-4 rounded-xl border ${styles[type] || styles.info}`}>
        <span className="text-lg">{icons[type] || icons.info}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    );
  },
};
