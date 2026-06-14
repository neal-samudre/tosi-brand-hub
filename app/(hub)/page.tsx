'use client';
import Link from 'next/link';

export default function HubHome() {
  return (
    <div className="max-w-3xl">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2"
            style={{color: 'var(--text-primary)', letterSpacing: '-0.02em'}}>
          Brand Asset Hub
        </h1>
        <p className="font-body text-sm"
           style={{color: 'var(--text-secondary)'}}>
          The single source of truth for all Tosi brand assets.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/brand">
          <div
            className="group p-6 rounded-xl cursor-pointer"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 220ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                'var(--shadow-md)';
              (e.currentTarget as HTMLElement).style.transform =
                'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                'var(--shadow-sm)';
              (e.currentTarget as HTMLElement).style.transform =
                'translateY(0)';
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center
                           justify-center"
                style={{background: 'rgba(27,40,58,0.06)'}}
              >
                <span className="font-display text-sm font-bold"
                      style={{color: 'var(--tosi-navy)'}}>B</span>
              </div>
              <span className="font-body text-xs font-semibold
                               tracking-widest uppercase"
                    style={{color: 'var(--text-tertiary)'}}>
                01
              </span>
            </div>
            <h2 className="font-display text-lg font-semibold mb-1"
                style={{color: 'var(--text-primary)', letterSpacing: '-0.01em'}}>
              Brand Identity
            </h2>
            <p className="font-body text-sm"
               style={{color: 'var(--text-secondary)'}}>
              Logos, typography, color palettes, messaging,
              and illustration
            </p>
          </div>
        </Link>

        <Link href="/product">
          <div
            className="group p-6 rounded-xl cursor-pointer"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 220ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                'var(--shadow-md)';
              (e.currentTarget as HTMLElement).style.transform =
                'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                'var(--shadow-sm)';
              (e.currentTarget as HTMLElement).style.transform =
                'translateY(0)';
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center
                           justify-center"
                style={{background: 'rgba(178,105,103,0.08)'}}
              >
                <span className="font-display text-sm font-bold"
                      style={{color: 'var(--tosi-terracotta)'}}>P</span>
              </div>
              <span className="font-body text-xs font-semibold
                               tracking-widest uppercase"
                    style={{color: 'var(--text-tertiary)'}}>
                02
              </span>
            </div>
            <h2 className="font-display text-lg font-semibold mb-1"
                style={{color: 'var(--text-primary)', letterSpacing: '-0.01em'}}>
              Product Assets
            </h2>
            <p className="font-body text-sm"
               style={{color: 'var(--text-secondary)'}}>
              Renders, packaging flats, nutrition panels,
              UPC codes, and certifications
            </p>
          </div>
        </Link>
      </div>

      {/* Footer callout */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <p className="font-body text-sm font-semibold mb-0.5"
           style={{color: 'var(--text-primary)'}}>
          Need something added?
        </p>
        <p className="font-body text-xs"
           style={{color: 'var(--text-secondary)'}}>
          All assets are managed in Google Drive. Contact
          the brand team to add or update files.
        </p>
      </div>
    </div>
  );
}
