import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Mail, 
  Calendar, 
  BarChart3, 
  Megaphone,
  LogOut
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = React.useState(null);
  const [language, setLanguage] = React.useState('PT');

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const tabs = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(user?.role === 'manager' || user?.role === 'admin' ? [{ id: 'ManagerDashboard', label: 'Manager', icon: Users }] : []),
    { id: 'Campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'Leads', label: 'Leads', icon: Users },
    { id: 'Clients', label: 'Clients', icon: Building2 },
    { id: 'Webmail', label: 'Webmail', icon: Mail },
    { id: 'Calendar', label: 'Calendar', icon: Calendar },
    { id: 'Statistics', label: 'Statistics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-[#212121]">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/akkurat');

        :root {
          --primary-blue: #005BBB;
          --accent-red: #DA291C;
          --secondary-green: #009C3B;
          --highlight-pink: #C8102E;
          --dark-bg: #212121;
          --dark-secondary: #2a2a2a;
          --dark-tertiary: #333333;
        }
        
        * {
          font-family: 'Akkurat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        body {
          background: #212121;
        }
        
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #2a2a2a;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #005BBB;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #0066CC;
        }
      `}</style>

      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-[#333333] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697720d9ac80e49b9161ae75/0a23e8a37_Screenshot2026-01-26at091227.png" 
                alt="Me Voilà" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-white font-bold text-xl">Me Voilà</h1>
                <p className="text-gray-400 text-xs">Conseil | Accompagnement | Gestion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['PT', 'FR', 'EN', 'ES'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-1 text-xs font-medium transition-colors ${
                      language === lang
                        ? 'text-[#005BBB] border-b-2 border-[#005BBB]'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={() => base44.auth.logout()}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-[#005BBB] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="max-w-[1600px] mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-custom">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentPageName === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`/${tab.id}`}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-[#005BBB] text-[#005BBB]'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] border-t border-[#333333] mt-16">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Me Voilà</h3>
              <p className="text-gray-400 text-sm">Conseil | Accompagnement | Gestion</p>
              <p className="text-gray-400 text-sm mt-2">Regularização de brasileiros na França</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contato</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>contact@agencemevoila.fr</p>
                <p>+33 6 67 49 45 39</p>
                <p>www.agencemevoila.fr</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Informações Legais</h3>
              <p className="text-gray-400 text-sm">SIRET 877 489 823 000 30</p>
            </div>
          </div>
          <div className="border-t border-[#333333] mt-8 pt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Me Voilà. Todos os direitos reservados.
          </div>
        </div>
      </footer>
      </div>
  );
}