'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.07926 0.222253C7.31275 -0.007434 7.68725
        -0.007434 7.92074 0.222253L14.6708 6.86227C14.907
        7.09465 14.9101 7.47453 14.6778 7.71076C14.4454
        7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V13.5C13
        13.7761 12.7762 14 12.5 14H9.00001C8.72387 14 8.50001
        13.7761 8.50001 13.5V11H6.50001V13.5C6.50001 13.7761
        6.27615 14 6.00001 14H2.50001C2.22387 14 2.00001 13.7761
        2.00001 13.5V6.90201L1.17074 7.71773C0.934505 7.95012
        0.554603 7.947 0.322259 7.71076C0.0899148 7.47453
        0.0930485 7.09465 0.329285 6.86227L7.07926 0.222253Z"
        fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'Brand Identity',
    href: '/brand',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2
        13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44772
        13 2 12.5523 2 12V3ZM3 3V12H12V3H3ZM4.5 6.5C4.5 5.39543
        5.39543 4.5 6.5 4.5C7.60457 4.5 8.5 5.39543 8.5 6.5C8.5
        7.60457 7.60457 8.5 6.5 8.5C5.39543 8.5 4.5 7.60457 4.5
        6.5ZM6.5 5.5C5.94772 5.5 5.5 5.94772 5.5 6.5C5.5 7.05228
        5.94772 7.5 6.5 7.5C7.05228 7.5 7.5 7.05228 7.5 6.5C7.5
        5.94772 7.05228 5.5 6.5 5.5Z"
        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      </svg>
    )
  },
  {
    label: 'Product Assets',
    href: '/product',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8
        2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7
        0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144
        2.70854 2.00144 2.9038 2.1967L4.31802 3.61091C4.51328
        3.80617 4.51328 4.12275 4.31802 4.31802C4.12275 4.51328
        3.80617 4.51328 3.61091 4.31802L2.1967 2.9038C2.00144
        2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7
        0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614
        8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM7.5 12C7.77614
        12 8 12.2239 8 12.5V14.5C8 14.7761 7.77614 15 7.5 15C7.22386
        15 7 14.7761 7 14.5V12.5C7 12.2239 7.22386 12 7.5 12ZM12.5
        7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5
        8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7
        14.5 7H12.5ZM7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11
        7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4ZM5
        7.5C5 6.11929 6.11929 5 7.5 5C8.88071 5 10 6.11929 10
        7.5C10 8.88071 8.88071 10 7.5 10C6.11929 10 5 8.88071 5
        7.5Z"
        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      </svg>
    )
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className="w-56 flex flex-col h-full flex-shrink-0"
      style={{
        background: 'var(--tosi-navy)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5"
           style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{background: 'var(--tosi-terracotta)'}}
          >
            <span className="font-display text-white text-xs font-bold">T</span>
          </div>
          <div>
            <p className="font-display text-white text-sm font-semibold
                          tracking-wide leading-none">TOSI</p>
            <p className="font-body text-xs leading-none mt-0.5"
               style={{color: 'rgba(255,255,255,0.35)'}}>
              Asset Hub
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        <p className="px-2 pb-1.5 font-body text-xs font-semibold
                      tracking-widest uppercase"
           style={{color: 'rgba(255,255,255,0.25)'}}>
          Library
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md',
                'font-body text-sm transition-all duration-150',
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
              )}
              style={isActive ? {
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
              } : {
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span className={isActive ? 'opacity-100' : 'opacity-50'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3"
           style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
        <p className="font-body text-xs"
           style={{color: 'rgba(255,255,255,0.2)'}}>
          Internal use only
        </p>
      </div>
    </div>
  );
}
