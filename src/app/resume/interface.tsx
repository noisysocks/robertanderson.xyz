"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SIDEBAR_WIDTH = 350;

type InterfaceContext = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const InterfaceContext = createContext<InterfaceContext | undefined>(undefined);

export function Interface({
  sidebarOpen = false,
  children,
}: {
  sidebarOpen?: boolean;
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpen);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const context = useMemo(
    () => ({ isSidebarOpen, toggleSidebar }),
    [isSidebarOpen, toggleSidebar],
  );
  return (
    <InterfaceContext.Provider value={context}>
      {children}
    </InterfaceContext.Provider>
  );
}

export function useInterface() {
  const context = useContext(InterfaceContext);
  if (!context) {
    throw new Error("Component must be used within a Interface");
  }
  return context;
}

export function InterfaceSidebar({
  children,
}: {
  children: ReactNode | (() => ReactNode);
}) {
  const { isSidebarOpen, toggleSidebar } = useInterface();
  const isMobile = useIsMobile();

  if (isSidebarOpen && isMobile) {
    return (
      <>
        <header className="flex gap-1 border-b p-4">
          <Button onClick={toggleSidebar} variant="outline" size="icon">
            <X />
          </Button>
        </header>
        {children}
      </>
    );
  }

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside
          className={`fixed h-full border-r bg-secondary print:hidden`}
          initial={{ x: -SIDEBAR_WIDTH }}
          animate={{ x: 0 }}
          exit={{ x: -SIDEBAR_WIDTH }}
          style={{ width: SIDEBAR_WIDTH }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {typeof children === "function" ? children() : children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function InterfaceToolbar({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useInterface();
  const isMobile = useIsMobile();
  if (isSidebarOpen && isMobile) return null;
  return (
    <motion.header
      className="fixed right-0 top-0 z-10 flex gap-1 border-b bg-card/75 p-4 backdrop-blur lg:border-none lg:bg-transparent lg:backdrop-blur-none print:hidden"
      initial={{ left: 0 }}
      animate={{
        left: isSidebarOpen ? SIDEBAR_WIDTH : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
}

export function InterfaceContent({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useInterface();
  const isMobile = useIsMobile();
  if (isSidebarOpen && isMobile) return null;
  return (
    <motion.main
      className="screen:absolute screen:right-0 screen:mt-[57px] screen:lg:mt-0"
      initial={{ left: 0 }}
      animate={{
        left: isSidebarOpen ? SIDEBAR_WIDTH : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
}
