import { Link, Outlet, useLocation } from "react-router-dom"
import { DOCS_CONTENT } from "@/data/docs-content"
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu"




function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

function ThemeToggle({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      {...props}
    >
      {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const sidebarItems = [
  {
    title: "Arquitectura & Core",
    items: [
      { title: "Arquitectura de Sistemas", href: "/docs/introduction" },
      { title: "Patrones de Diseño", href: "/docs/architecture/patterns" },
      { title: "Performance & Scale", href: "/docs/performance/optimization" },
    ],
  },
  {
    title: "Internal Engine",
    items: [
      { title: "Rendering Lifecycle", href: "/docs/engine/rendering-lifecycle" },
      { title: "CSS & Design Tokens", href: "/docs/engine/css-architecture" },
      { title: "Data Normalization", href: "/docs/engine/data-normalization" },
      { title: "State Management", href: "/docs/engine/state-management" },
    ],
  },
  {
    title: "Ingeniería Avanzada",
    items: [
      { title: "Resiliencia & Errores", href: "/docs/engineering/resilience" },
      { title: "Gestión de Memoria", href: "/docs/engineering/memory" },
      { title: "Estrategia de Testing", href: "/docs/engineering/qa-strategy" },
    ],
  },
  {
    title: "Biblioteca de Componentes",
    items: [
      { title: "Infinite Grid Engine", href: "/docs/components/pokemon-grid" },
      { title: "Search System", href: "/docs/components/search-system" },
      { title: "Pokemon Card", href: "/docs/components/pokemon-card" },
      { title: "Type Badges", href: "/docs/components/pokemon-type" },
      { title: "Stats Visualization", href: "/docs/components/pokemon-stats" },
      { title: "Abilities Engine", href: "/docs/components/pokemon-abilities" },
      { title: "Evolution Chain", href: "/docs/components/evolution" },
      { title: "Metadata / Info", href: "/docs/components/pokemon-info" },
      { title: "Weakness Analysis", href: "/docs/components/pokemon-weakness" },
    ],
  },
  {
    title: "API & Reference",
    items: [
      { title: "Pokemon Service", href: "/docs/services/pokemon-service" },
      { title: "Custom Hooks API", href: "/docs/hooks/pokemon-hooks" },
    ],
  },
];

export default function DocLayout() {
  const { pathname } = useLocation();

  // Extract slug from pathname (e.g., /docs/introduction -> introduction)
  const slug = pathname.startsWith("/docs/")
    ? pathname.replace("/docs/", "").replace(/\/+$/, "")
    : pathname === "/docs" ? "introduction" : "";
  const currentDoc = DOCS_CONTENT[slug];

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <nav className="container flex h-16 items-center justify-between px-8 mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Composable Pokedex</h1>
          </div>

          <div className="flex items-center gap-4">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-2">
                <ListItem title="Home" href="/" />
                <ListItem title="Pokedex" href="/pokedex" />
                <ListItem title="Contact" href="/contact" />
                <ListItem title="Docs" href="/docs/introduction" />
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Grid Container */}
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_250px] container px-8 mx-auto">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto  md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            {sidebarItems.map((item) => (
              <div key={item.title} className="mb-8">
                <Label className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {item.title}
                </Label>
                <ul className="mt-3 space-y-1">
                  {item.items.map((subItem) => {
                    const isActive = pathname === subItem.href;
                    return (
                      <li key={subItem.title}>
                        <Link
                          to={subItem.href}
                          className={cn(
                            "flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 md:px-8 lg:py-10">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>

        {/* Table of Contents - Hidden on small screens */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto lg:sticky lg:block">
          <div className="sticky top-16 py-6 lg:py-10">
            {currentDoc && currentDoc.sections.length > 0 && (
              <div className="space-y-4">
                <Label className="text-sm font-semibold tracking-tight">En esta página</Label>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {currentDoc.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-foreground cursor-pointer transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      <footer className="mt-32 p-4 border-t flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div className="flex gap-6 lg:gap-12 items-center justify-between w-full container px-8 mx-auto">
          <p>© {new Date().getFullYear()} Allan Velez - Composable Pokedex Architecture Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <Button variant="link">
               <a href="https://github.com/scriptvg/poke-project" target="_blank" className="hover:text-foreground transition-colors">Github</a>
            </Button>
            <Button variant="link">
               <a href="www.linkedin.com/in/allan-josé-vélez-gonzález" target="_blank" className="hover:text-foreground transition-colors">LinkedIn</a>
            </Button>
            <Button variant="link">
               <Link to="/docs/introduction" className="hover:text-foreground transition-colors">Docs</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
