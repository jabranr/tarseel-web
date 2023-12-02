import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react';
import { LinksFunction } from '@remix-run/cloudflare';
import tailwindCss from '~/tailwind.css';
import { useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCss }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className="mx-auto p-4 md:container min-h-[35vh]">
          {isRouteErrorResponse(error) ? (
            <div>
              <h1 className="text-2xl font-semibold my-4">Not found</h1>
              <p>Sorry, the page you requested could not be found.</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold my-4">
                Oops! something went wrong
              </h1>
              <p>An error occurred while processing your request.</p>
              <pre className="whitespace-pre-wrap bg-tarseel-gray-light rounded-md my-8 p-4">
                {JSON.stringify(error, null, 2)}
              </pre>
            </>
          )}
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
