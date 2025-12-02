"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    if (className) {
      document.body.className = className;
    }
  }, [className]);

  return <body className={className} suppressHydrationWarning>{children}</body>;
}
