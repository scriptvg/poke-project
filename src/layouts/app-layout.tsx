import { Link, Outlet } from "react-router-dom"
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


export default function AppLayout() {


  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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

      <Outlet />

    </div>
  )
}