import { IntlProvider } from "react-intl";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/header";
import { MotionLoader } from "./components/motion-loader";
import { queryClient } from "./lib/api/client";
import { type Locale, messages } from "./lib/i18n";

export function useLocale(): Locale {
  return useRouteLoaderData<typeof loader>("root")?.locale ?? "zh-TW";
}

export const meta: Route.MetaFunction = ({ location }) => [
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:url",
    content: `https://awscmd.tw${location.pathname}${location.search}`,
  },
  {
    tagName: "link",
    rel: "canonical",
    href: `https://awscmd.tw${location.pathname}${location.search}`,
  },
];

export function loader({ params }: Route.LoaderArgs) {
  if (params.locale && params.locale in messages)
    return {
      messages: messages[params.locale as Locale],
      locale: params.locale as Locale,
    };

  return {
    messages: messages["zh-TW"],
    locale: "zh-TW" as Locale,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <IntlProvider locale={loaderData.locale} messages={loaderData.messages}>
      <QueryClientProvider client={queryClient}>
        <MotionLoader>
          <Header />
          <Outlet />
        </MotionLoader>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
