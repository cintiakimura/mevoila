import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Mail, Phone } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    servico: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.servico) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create lead
      await base44.entities.Lead.create({
        full_name: formData.full_name,
        email: formData.email,
        company: formData.whatsapp,
        status: 'new',
        language_preference: 'Portuguese',
        notes: `Serviço solicitado: ${formData.servico}`
      });

      // Send welcome email sequence
      await base44.integrations.Core.SendEmail({
        to: formData.email,
        subject: 'Bem-vindo à Me Voilà! 🇫🇷',
        body: `Olá ${formData.full_name},\n\nObrigado por entrar em contato com a Me Voilà!\n\nRecebemos sua solicitação sobre: ${formData.servico}\n\nEntraremos em contato em breve para ajudá-lo com sua regularização na França.\n\nAtenciosamente,\nEquipe Me Voilà\ncontact@agencemevoila.fr\n+33 6 67 49 45 39`
      });

      setSubmitted(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/Dashboard';
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005BBB] via-[#212121] to-[#009C3B]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-white space-y-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697720d9ac80e49b9161ae75/0a23e8a37_Screenshot2026-01-26at091227.png" 
              alt="Me Voilà" 
              className="h-24 w-auto mb-8"
            />
            <h1 className="text-5xl font-bold leading-tight">
              Chegou na França e tá perdido com papéis?
            </h1>
            <h2 className="text-3xl font-bold text-[#DA291C]">
              Me Voilà resolve pra você
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Regularização, impostos, empresa, residência, naturalização — tudo em português, sem estresse
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3 bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#009C3B] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Troca de Carteira</h3>
                  <p className="text-sm text-gray-200">Conversão da CNH brasileira para francesa</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#009C3B] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Declaração de Impostos</h3>
                  <p className="text-sm text-gray-200">Assistência completa com impostos franceses</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#009C3B] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Abertura de Empresa</h3>
                  <p className="text-sm text-gray-200">Suporte completo para empreendedores</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white bg-opacity-10 p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#009C3B] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Naturalização</h3>
                  <p className="text-sm text-gray-200">Cidadania francesa sem complicação</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-[#009C3B] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Obrigado!</h3>
                <p className="text-gray-600">Entraremos em contato em breve.</p>
                <p className="text-sm text-gray-500 mt-4">Redirecionando para o painel...</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Fale Conosco</h3>
                <p className="text-gray-600 mb-6">Preencha o formulário e descubra como podemos ajudar você</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-gray-700 mb-2">Nome Completo *</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      placeholder="Seu nome"
                      className="bg-gray-50"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2">Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="bg-gray-50"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2">WhatsApp</Label>
                    <Input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      placeholder="+33 6 XX XX XX XX"
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2">Qual serviço? *</Label>
                    <Select 
                      value={formData.servico} 
                      onValueChange={(val) => setFormData({...formData, servico: val})}
                    >
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="troca_carteira">Troca de Carteira de Motorista</SelectItem>
                        <SelectItem value="impostos">Declaração de Impostos</SelectItem>
                        <SelectItem value="empresa">Abertura de Empresa</SelectItem>
                        <SelectItem value="residencia">Cartão de Residência</SelectItem>
                        <SelectItem value="naturalizacao">Naturalização</SelectItem>
                        <SelectItem value="outro">Outro Serviço</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#005BBB] hover:bg-[#004499] text-white font-medium py-6 text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Quero Ajuda Agora!'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#005BBB]" />
                    <span>contact@agencemevoila.fr</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#005BBB]" />
                    <span>+33 6 67 49 45 39</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}