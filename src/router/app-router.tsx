import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages/home";
import Pokemon from "@/pages/pokemon";
import NotFound from "@/pages/not-found";

import AppLayout from "@/layouts/app-layout";
import DocLayout from "@/layouts/doc-layout";
import Docs from "@/pages/docs";
import DocPage from "@/pages/doc-page";

const APP_ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "pokemon/:slug",
        element: <Pokemon />
      }
    ]
  },
  {
    path: "/docs",
    element: <DocLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Docs />
      },
      {
        path: "*",
        element: <DocPage />
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={APP_ROUTER} />;
}
