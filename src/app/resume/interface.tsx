"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/components/use-is-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

type InterfaceContext = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const InterfaceContext = createContext<InterfaceContext | undefined>(undefined);

export function Interface({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <InterfaceContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
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

export function InterfaceSidebar({ children }: { children: ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useInterface();
  const isMobile = useIsMobile(false);

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
          className="fixed h-full w-[300px] border-r bg-secondary print:hidden"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function InterfaceToolbar({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useInterface();
  const isMobile = useIsMobile(false);
  if (isSidebarOpen && isMobile) return null;
  return (
    <motion.header
      className="fixed right-0 top-0 z-10 flex gap-1 border-b bg-card/75 p-4 backdrop-blur lg:border-none lg:bg-transparent lg:backdrop-blur-none print:hidden"
      initial={{ left: 0 }}
      animate={{
        left: isSidebarOpen ? 300 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
}

export function InterfaceContent({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useInterface();
  const isMobile = useIsMobile(false);
  if (isSidebarOpen && isMobile) return null;
  return (
    <motion.main
      className="screen:absolute screen:right-0 screen:mt-[57px] screen:lg:mt-0"
      initial={{ left: 0 }}
      animate={{
        left: isSidebarOpen ? 300 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
}
