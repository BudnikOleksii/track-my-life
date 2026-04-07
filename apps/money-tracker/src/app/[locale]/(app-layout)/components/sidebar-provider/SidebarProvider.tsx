'use client';

import type { FC, PropsWithChildren } from 'react';

import { createContext, use, useCallback, useState } from 'react';

interface SidebarContextValue {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebar = (): SidebarContextValue => {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleToggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <SidebarContext
      value={{
        isCollapsed,
        isMobileOpen,
        onToggleCollapse: handleToggleCollapse,
        onToggleMobile: handleToggleMobile,
        onCloseMobile: handleCloseMobile,
      }}
    >
      <div data-sidebar-collapsed={isCollapsed ? '' : undefined}>{children}</div>
    </SidebarContext>
  );
};
