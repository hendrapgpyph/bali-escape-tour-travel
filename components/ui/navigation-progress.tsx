"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset when path or search params change (navigation completes)
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Animate progress smoothly while navigating
  useEffect(() => {
    if (!isNavigating) return;

    setProgress(25);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          clearInterval(interval);
          return 88;
        }
        // Asymptotically slow down as it gets closer to 90%
        const increment = Math.max(1, (90 - prev) * 0.15);
        return Math.min(prev + increment, 88);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isNavigating]);

  // Intercept internal link clicks to immediately trigger the top loader UX
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, hash anchors, tel/mailto, or new tabs
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("whatsapp:") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's the exact same pathname + hash
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      setIsNavigating(true);
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  if (!isNavigating && progress === 0) return null;

  return (
    <aside aria-label="Page Loading" className="navigation-progress-bar-container">
      <div
        className="navigation-progress-bar"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition:
            progress === 100
              ? "width 0.2s ease-out, opacity 0.3s ease-out 0.1s"
              : "width 0.2s cubic-bezier(0.1, 0.5, 0.1, 1)",
        }}
      >
        <span className="navigation-progress-glow" />
      </div>
    </aside>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressBarInner />
    </Suspense>
  );
}
