
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-slate-900 to-background">
      <Navbar />
      <main className="flex-grow container py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
  