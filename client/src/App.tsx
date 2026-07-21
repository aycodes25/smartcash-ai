import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { StatementProvider, useStatement } from './context/StatementContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

const AppLayout: React.FC = () => {
  const { data } = useStatement();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <Header bankName={data?.bank} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <StatementProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <AppLayout />
      </StatementProvider>
    </BrowserRouter>
  );
}

export default App;