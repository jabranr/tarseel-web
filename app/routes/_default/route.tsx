import { Outlet } from '@remix-run/react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto lg:container p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
