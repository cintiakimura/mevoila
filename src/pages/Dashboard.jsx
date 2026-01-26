import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import StatsCard from '../components/dashboard/StatsCard';
import { Megaphone, Users, Building2, Mail, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
  useEffect(() => {
    base44.auth.isAuthenticated().then(isAuth => {
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.pathname);
      }
    });
  }, []);

  const { data: campaigns = [] } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => base44.entities.Campaign.list()
  });

  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.Lead.list()
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list()
  });

  const { data: emails = [] } = useQuery({
    queryKey: ['emails'],
    queryFn: () => base44.entities.EmailMessage.list()
  });

  const { data: webinars = [] } = useQuery({
    queryKey: ['webinars'],
    queryFn: () => base44.entities.Webinar.list()
  });

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const unreadEmails = emails.filter(e => !e.is_read && e.folder === 'inbox').length;
  const upcomingWebinars = webinars.filter(w => new Date(w.start_time) > new Date()).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao Me Voilà</h1>
        <p className="text-gray-400">Gerencie seus clientes, campanhas e documentação</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Campaigns"
          value={activeCampaigns}
          icon={Megaphone}
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="Total Leads"
          value={leads.length}
          icon={Users}
          trend="up"
          trendValue="+8%"
        />
        <StatsCard
          title="Clients"
          value={clients.length}
          icon={Building2}
          trend="up"
          trendValue="+5%"
        />
        <StatsCard
          title="Unread Messages"
          value={unreadEmails}
          icon={Mail}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#005BBB]" />
            Atividade Recente
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-gray-300 text-sm">Novos leads importados</span>
              <span className="text-[#005BBB] font-medium">{leads.filter(l => l.status === 'new').length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#333333]">
              <span className="text-gray-300 text-sm">Emails enviados hoje</span>
              <span className="text-[#005BBB] font-medium">{emails.filter(e => e.folder === 'sent').length}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">Taxa de conclusão de campanha</span>
              <span className="text-[#005BBB] font-medium">87%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#005BBB]" />
            Próximos Webinars
          </h2>
          {upcomingWebinars === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum webinar agendado</p>
          ) : (
            <div className="space-y-3">
              {webinars
                .filter(w => new Date(w.start_time) > new Date())
                .slice(0, 3)
                .map(webinar => (
                  <div key={webinar.id} className="flex items-center justify-between py-2 border-b border-[#333333]">
                    <div>
                      <p className="text-white text-sm font-medium">{webinar.title}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(webinar.start_time).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-[#005BBB] text-xs">
                      {webinar.attendees?.length || 0} inscritos
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}