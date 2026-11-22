import { Palmtree, Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="page-loading-skeleton" aria-label="Loading page content">
      {/* Top Banner Skeleton */}
      <div className="skeleton-banner">
        <div className="skeleton-banner-content">
          <div className="skeleton-spinner">
            <Compass className="animate-spin-slow text-[#ff8a28]" size={36} />
          </div>
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-subtitle" />
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="section skeleton-section">
        <div className="skeleton-head-bar">
          <div className="skeleton-line skeleton-eyebrow" />
          <div className="skeleton-line skeleton-heading" />
        </div>
        <div className="skeleton-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-card-img" />
              <div className="skeleton-card-body">
                <div className="skeleton-line skeleton-card-title" />
                <div className="skeleton-line skeleton-card-text" />
                <div className="skeleton-line skeleton-card-text short" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
