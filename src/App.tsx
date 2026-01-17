import { AppRouter } from "@/router/app-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";


export default function App() {
  return (
      <>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppRouter />
          <Toaster position="top-left" />
        </ThemeProvider>
      </>
  )
}