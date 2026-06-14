'use client';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const SECTION_TITLES: Record<string, string> = {
  '/': 'Home',
  '/brand': 'Brand Identity',
  '/product': 'Product Assets',
};

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = SECTION_TITLES[pathname] ?? 'Asset Hub';

  return (
    <header
      className="h-12 flex items-center justify-between px-6 flex-shrink-0"
      style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <h2 className="font-body font-semibold text-sm"
          style={{color: 'var(--text-primary)'}}>
        {title}
      </h2>
      <div className="flex items-center gap-3">
        {session?.user && (
          <>
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="font-body text-xs hidden md:block"
                    style={{color: 'var(--text-secondary)'}}>
                {session.user.email}
              </span>
            </div>
            <div style={{
              width: '1px',
              height: '16px',
              background: 'var(--border-default)'
            }}/>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="font-body text-xs transition-colors duration-150
                         hover:opacity-70"
              style={{color: 'var(--text-tertiary)'}}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
