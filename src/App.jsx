import { useState, useEffect } from 'react'
import { data } from './data.js'
import { Activity, Zap, StretchHorizontal, Music, Leaf, Radio, MapPin, Phone, Clock, Send, Check, Menu, X } from 'lucide-react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Dynamic icons map
  const iconMap = {
    activity: Activity,
    zap: Zap,
    'stretch-horizontal': StretchHorizontal,
    music: Music,
    leaf: Leaf,
    radio: Radio
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const closeMenu = () => setMenuOpen(false)

  const whatsappUrl = `https://wa.me/55${data.contato.whatsapp}`

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'modalidades', 'diferenciais', 'planos', 'localizacao', 'contato']
      const scrollPosition = window.scrollY + 100

      const active = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          return el.offsetTop <= scrollPosition && scrollPosition < el.offsetTop + el.offsetHeight
        }
        return false
      })

      if (active) setActiveSection(active)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav className="glass-navbar fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={data.logo} alt={data.nome} className="h-12 w-auto rounded-lg shadow-xl" />
            <div>
              <h1 className="text-2xl font-bold">{data.nome}</h1>
              <p className="text-sm opacity-90">{data.slogan}</p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1' : 'hover:text-blue-400 transition-colors font-medium'}>Início</button>
            <button onClick={() => scrollToSection('planos')} className={activeSection === 'planos' ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1' : 'hover:text-blue-400 transition-colors font-medium'}>Planos</button>
            <button onClick={() => scrollToSection('contato')} className={activeSection === 'contato' ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1' : 'hover:text-blue-400 transition-colors font-medium'}>Contato</button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-white px-6 py-2 font-semibold">Falar no WhatsApp</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg glass-navbar">
            {menuOpen ? <X className="w-6 h-6 icon-blue" /> : <Menu className="w-6 h-6 icon-blue" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={closeMenu} />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-20 left-0 right-0 z-50 md:hidden glass-navbar mx-4 rounded-xl shadow-2xl transform transition-all duration-300 translate-y-0">
            <div className="py-4">
              <button onClick={closeMenu} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all mb-2">
                <X className="w-5 h-5 icon-blue flex-shrink-0" />
                <span className="font-semibold">Fechar</span>
              </button>
              
              <button onClick={() => scrollToSection('home')} className="w-full text-left py-4 px-6 font-bold text-lg border-b border-white/10 hover:bg-white/5 transition-all duration-300 block">
                Início
              </button>
              <button onClick={() => scrollToSection('planos')} className="w-full text-left py-4 px-6 font-bold text-lg border-b border-white/10 hover:bg-white/5 transition-all duration-300 block">
                Planos
              </button>
              <button onClick={() => scrollToSection('contato')} className="w-full text-left py-4 px-6 font-bold text-lg border-b border-white/10 hover:bg-white/5 transition-all duration-300 block">
                Contato
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 text-lg rounded-lg mt-4 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-blue-600">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </>
      )}

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}}>
        
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
            TREINE COMO UM ATLETA DE VERDADE
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8">{data.slogan}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Estrutura completa em {data.localizacao.cidade}
          </p>
          <p className="text-3xl md:text-4xl font-black text-blue-400 mb-12 font-display">
            Planos a partir de R${data.planos[0].preco}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
              className="btn-primary text-xl py-4 px-10 text-lg max-w-sm mx-auto sm:mx-0 shadow-2xl hover:shadow-2xl hover:-translate-y-1">
              <Phone className="inline w-6 h-6 mr-2 icon-blue" /> Falar no WhatsApp
            </a>
            <button onClick={() => scrollToSection('planos')} 
              className="btn-primary text-xl font-semibold py-4 px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 bg-neutral-800 hover:bg-neutral-700 border-neutral-700">
              Ver Planos
            </button>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section id="modalidades" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl md:leading-tight font-black mb-6">Nossas Modalidades</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Escolha a atividade perfeita para o seu objetivo</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.modalidades.map((modalidade, index) => {
              const Icon = iconMap[modalidade.icone]
              return (
                <div key={index} className="card text-center hover:-translate-y-2 group" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="w-20 h-20 mx-auto mb-6 bg-neutral-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-10 h-10 icon-blue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{modalidade.nome}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="section-padding bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16">O que nos diferencia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.diferenciais.map((diferencial, index) => (
              <div key={index} className="card hover:-translate-y-2" style={{animationDelay: `${index * 150}ms`}}>
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-2xl flex items-center justify-center border-2 border-blue-500/30">
                  <Send className="w-8 h-8 icon-blue" />
                </div>
                <p className="text-xl font-semibold">{diferencial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="section-padding bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Nossos Planos</h2>
            <p className="text-xl opacity-90">Escolha o melhor para você</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.planos.map((plano, index) => (
              <div key={index} className={`card text-center transition-all duration-500 hover:-translate-y-6 ${plano.destaque ? 'border-2 border-blue-500 bg-neutral-900/50 md:col-span-1 md:row-span-2 shadow-2xl md:scale-[1.05]' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-black mb-4">{plano.nome}</h3>
                <div className="text-4xl md:text-5xl font-black text-blue-400 mb-8">
                  R${plano.preco}
                  <span className="text-2xl font-normal opacity-80 block">/mês</span>
                </div>
                <ul className="text-left mb-8 space-y-3">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Acesso ilimitado</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Todas as modalidades</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Horário estendido</li>
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
                  className="w-full block btn-primary font-bold">
                  Escolher Plano
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localizacao */}
      <section id="localizacao" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">Encontre-nos</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="card-icon p-3 rounded-xl mt-1 flex-shrink-0">
                    <MapPin className="w-6 h-6 icon-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Endereço</h3>
                    <p className="opacity-95">{data.localizacao.endereco}, {data.localizacao.cidade}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="card-icon p-3 rounded-xl mt-1 flex-shrink-0">
                    <Clock className="w-6 h-6 icon-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Horário</h3>
                    <p className="opacity-90"><span className="font-semibold">Seg-Sex:</span> {data.horario.semana}</p>
                    <p className="opacity-90"><span className="font-semibold">Sáb:</span> {data.horario.sabado}</p>
                    <p className="opacity-90"><span className="font-semibold">Dom:</span> {data.horario.domingo}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
                  <a href={`https://instagram.com/${data.contato.instagram}`} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2 font-bold text-lg">
                    Instagram
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2 font-bold text-lg">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card rounded-3xl overflow-hidden">
              <iframe
                src={data.localizacao.maps}
                width="100%"
                height="400"
                className="w-full"
                style={{border:0}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização ZB Fitness"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section-padding bg-gradient-to-t from-neutral-950 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Pronto para transformar seu corpo?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-lg mx-auto">Fale conosco agora mesmo e comece sua jornada.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
              className="btn-primary px-12 py-6 text-2xl rounded-2xl shadow-2xl hover:shadow-2xl hover:-translate-y-2 bg-blue-600 hover:bg-blue-500 text-white max-w-sm mx-auto sm:mx-0">
              <Phone className="inline w-8 h-8 mr-3 mb-1 icon-blue" /> Fale no WhatsApp Agora
            </a>
          </div>
          <p className="mt-12 opacity-70 text-sm font-medium">© 2026 João Amorim. Todos os direitos reservados.</p>
        </div>
      </section>

      {/* WhatsApp Floating Button - Hidden on mobile */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp hidden md:flex" title="Falar no WhatsApp">
        <Phone className="w-6 h-6" />
        <span>WhatsApp</span>
      </a>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .card-icon {
          @apply bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center;
        }
      `}</style>
    </>
  )
}

export default App
