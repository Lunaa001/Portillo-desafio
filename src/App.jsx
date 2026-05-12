import { useState, useEffect } from 'react'
import './App.css'
import ElevationChart from './components/ElevationChart'

function App() {
  // Datos de elevación para 14km
  const elevation14km = [
    { km: 0, elevation: 2534 },
    { km: 1, elevation: 2558 },
    { km: 2, elevation: 2600 },
    { km: 3, elevation: 2670 },
    { km: 4, elevation: 2780 },
    { km: 5, elevation: 2930 },
    { km: 6, elevation: 3110 },
    { km: 7, elevation: 3310 },
    { km: 7.5, elevation: 3440 }, // Punto máximo
    { km: 8, elevation: 3310 },
    { km: 9, elevation: 3110 },
    { km: 10, elevation: 2930 },
    { km: 11, elevation: 2780 },
    { km: 12, elevation: 2670 },
    { km: 13, elevation: 2600 },
    { km: 14, elevation: 2558 },
    { km: 14.5, elevation: 2534 }
  ];

  // Datos de elevación para 24km
  const elevation24km = [
    { km: 0, elevation: 2533 },
    { km: 1, elevation: 2562 },
    { km: 2, elevation: 2625 },
    { km: 3, elevation: 2730 },
    { km: 4, elevation: 2860 },
    { km: 5, elevation: 3020 },
    { km: 6, elevation: 3190 },
    { km: 7, elevation: 3370 },
    { km: 8, elevation: 3530 },
    { km: 9, elevation: 3680 },
    { km: 10, elevation: 3810 },
    { km: 11, elevation: 3905 },
    { km: 12, elevation: 3924 }, // Punto máximo
    { km: 13, elevation: 3905 },
    { km: 14, elevation: 3810 },
    { km: 15, elevation: 3680 },
    { km: 16, elevation: 3530 },
    { km: 17, elevation: 3370 },
    { km: 18, elevation: 3190 },
    { km: 19, elevation: 3020 },
    { km: 20, elevation: 2860 },
    { km: 21, elevation: 2730 },
    { km: 22, elevation: 2625 },
    { km: 23, elevation: 2562 },
    { km: 24, elevation: 2533 },
  ];

  // Datos de elevación para 28km
  const elevation28km = [
    { km: 0, elevation: 2600 },
    { km: 2, elevation: 2730 },
    { km: 4, elevation: 2910 },
    { km: 6, elevation: 3130 },
    { km: 8, elevation: 3390 },
    { km: 10, elevation: 3680 },
    { km: 12, elevation: 3990 },
    { km: 13, elevation: 4180 },
    { km: 14, elevation: 4357 }, // Punto máximo
    { km: 15, elevation: 4180 },
    { km: 16, elevation: 3990 },
    { km: 18, elevation: 3680 },
    { km: 20, elevation: 3390 },
    { km: 22, elevation: 3130 },
    { km: 24, elevation: 2910 },
    { km: 26, elevation: 2730 },
    { km: 28, elevation: 2600 }
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carrusel infinito con JavaScript
  useEffect(() => {
    const carousel = document.querySelector('.gallery-carousel');
    if (!carousel) return;

    let animationFrame;
    let offset = 0;

    const animate = () => {
      const itemsContainer = carousel.children.length;
      const firstChild = carousel.children[0];
      if (!firstChild) return;

      const itemWidth = firstChild.offsetWidth + 24; // item width + gap
      const totalWidth = itemWidth * (itemsContainer / 2); // Primera mitad

      offset += 2; // Velocidad de scroll

      // Resetear cuando lleguemos a la mitad
      if (offset >= totalWidth) {
        offset = 0;
      }

      carousel.style.transform = `translateX(-${offset}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Cerrar menú al hacer click
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="/video promocional 3 distancias.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="video-overlay"></div>

      {/* Header/Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="logo">Desafío al Portillo</div>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a onClick={() => scrollToSection('inicio')}>Inicio</a></li>
            <li><a onClick={() => scrollToSection('sobre')}>El Evento</a></li>
            <li><a onClick={() => scrollToSection('distancias')}>Distancias</a></li>
            <li><a onClick={() => scrollToSection('inscripcion')}>Inscripción</a></li>
            <li><a onClick={() => scrollToSection('contacto')}>Contacto</a></li>
          </ul>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
        )}
      </header>

      {/* Hero Section */}
<section id="inicio" className="hero">
  <div className="hero-content">
    <p className="hero-subtitle">14 de Marzo 2027</p>
    <h1 className="hero-title">
      Desafío
      <span className="highlight">al Portillo</span>
    </h1>
    <p className="hero-description">
      Carrera de Montaña, Reserva Natural Portillo-Piuquenes, Mendoza
    </p>

    <div className="hero-info">
      <div className="info-item">
        <div className="icon">
          <img src="/FluentEmojiHighContrastPushpin.png" alt="Ubicación" />
        </div>
        <h3>Tunuyán</h3>
        <p>Mendoza</p>
      </div>
      <div className="info-item">
        <div className="icon">
          <img src="/MingcuteMountain2Line.png" alt="Montaña" />
        </div>
        <h3>4.357m</h3>
        <p>Altura Máxima</p>
      </div>
      <div className="info-item">
        <div className="icon">
          <img src="/MdiHumanGreetingVariant.png" alt="Participantes" />
        </div>
        <h3>100</h3>
        <p>Participantes</p>
      </div>
    </div>

  </div>
</section>


{/* Sobre el Evento */}
<section id="sobre" className="section">
  <div className="container">
    <h2 className="section-title">El Evento</h2>
    <div className="about-card">
      <div className="about-content">
        <div className="about-item">
          <h3>Historia y Significancia</h3>
          <p>
            <strong>Desafío del Portillo</strong> es mucho más que una carrera de trail running: es una experiencia que conecta deporte, naturaleza e historia en uno de los escenarios más emblemáticos de la cordillera mendocina.
          </p>
          <p>
            La competencia se desarrolla en la <strong>Reserva Natural Portillo Piuquenes</strong>, territorio que formó parte del histórico Cruce de los Andes realizado por el Ejército Libertador comandado por José de San Martín. Este paso cordillerano fue uno de los caminos estratégicos de la Gesta Sanmartiniana y, años más tarde, escenario del regreso triunfal del General San Martín a la patria.
          </p>
          <p>
            Cada sendero, valle y ascenso guarda la memoria de una de las mayores hazañas de la historia. Hoy, esos mismos caminos vuelven a desafiar el espíritu humano, transformándose en el escenario perfecto para vivir una aventura única en alta montaña.
          </p>
          <p>
            Si bien la reserva recibe cada año excursiones vinculadas al Cruce de los Andes, tanto a caballo como en modalidad trekking, <strong>Desafío al Portillo</strong> es la única carrera de trail running que se desarrolla dentro de este entorno histórico y natural, ofreciendo a sus participantes la posibilidad de recorrer estos caminos desde una experiencia deportiva inédita.
          </p>
        </div>
        <div className="about-item">
          <h3>Segunda Edición</h3>
          <p>
            Tras el éxito de su primera edición, <strong>Desafío al Portillo</strong> regresa reafirmando su identidad como una carrera que combina exigencia física, conexión con la naturaleza y un profundo valor histórico.
          </p>
          <p>
            Con <strong>cupos limitados para 100 corredores</strong>, esta nueva edición invita a atravesar paisajes imponentes, recorrer antiguos caminos sanmartinianos y vivir una experiencia inolvidable en el corazón de la cordillera de Mendoza.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Distancias */}
      <section id="distancias" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Distancias Disponibles</h2>
          <div className="distances-intro">
            <p><strong>Ambas distancias partirán desde el Refugio Portinari, ubicado a 2.600 metros sobre el nivel del mar.</strong></p>
          </div>
          <div className="distances-grid">
            
            {/* Bifurcación */}
            <div className="distance-card">
              <div className="distance-header">
                <h3>14 KM</h3>
                <span className="distance-badge">40 Cupos</span>
              </div>
              <div className="distance-route">
                <span className="distance-route-stop">Ref. Portinari</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Bifurcación</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Ref. Portinari</span>
              </div>
              
              <ElevationChart 
                distance={14}
                data={elevation14km}
                maxElevation={3440}
                minElevation={2533}
              />
              
              <div className="distance-specs">
                <div className="spec-item">
                  <span className="spec-label">Desnivel</span>
                  <span className="spec-value">950 m</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Altura Máx</span>
                  <span className="spec-value">3.440 m</span>
                </div>
              </div>
              
              <p style={{fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '1rem', lineHeight: '1.5'}}>
                <strong>Ruta:</strong> Camino de vehículos y mulas. Camino marcado para la carrera.
              </p>
            </div>
            
            {/* Hotel Abandonado */}
            <div className="distance-card">
              <div className="distance-header">
                <h3>24 KM</h3>
                <span className="distance-badge">30 Cupos</span>
              </div>
              <div className="distance-route">
                <span className="distance-route-stop">Ref. Portinari</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Hotel Abandonado</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Ref. Portinari</span>
              </div>
          
              <ElevationChart 
                distance={24}
                data={elevation24km}
                maxElevation={4000}
                minElevation={2533}
              />
              
              <div className="distance-specs">
                <div className="spec-item">
                  <span className="spec-label">Desnivel</span>
                  <span className="spec-value">1500 m</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Altura Máx</span>
                  <span className="spec-value">3950 m</span>
                </div>
              </div>
              
              <p style={{fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '1rem', lineHeight: '1.5'}}>
                <strong>Ruta:</strong> Camino de vehículos y mulas. Requiere orientación básica. ⏱ Tiempos de corte por seguridad.
              </p>
            </div>

            {/* Portillo */}
            <div className="distance-card">
              <div className="distance-header">
                <h3>28 KM</h3>
                <span className="distance-badge">30 Cupos</span>
              </div>
              <div className="distance-route">
                <span className="distance-route-stop">Ref. Portinari</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Portillo</span>
                <span className="distance-route-arrow">↓</span>
                <span className="distance-route-stop">Ref. Portinari</span>
              </div>
              
              <ElevationChart 
                distance={28}
                data={elevation28km}
                maxElevation={4400}
                minElevation={2533}
              />
              
              <div className="distance-specs">
                <div className="spec-item">
                  <span className="spec-label">Desnivel</span>
                  <span className="spec-value">1.871 m</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Altura Máx</span>
                  <span className="spec-value">4.350 m</span>
                </div>
              </div>
              
              <p style={{fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '1rem', lineHeight: '1.5'}}>
                <strong>Ruta:</strong> Camino de vehículos y mulas. Requiere orientación básica. ⏱ Tiempos de corte por seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inscripción y Requisitos */}
      <section id="inscripcion" className="section">
        <div className="container">
          <h2 className="section-title">Inscripción y Requisitos</h2>
          <div className="inscription-grid">
            {/* Columna Inscripción */}
            <div className="inscription-column">
              <div className="inscription-card">
                <h3>Detalles de Inscripción</h3>
                <div className="inscription-content">
                  <div className="price-section">
                    <p className="price-label">Valor Inscripción</p>
                    <div className="price-amount">$100.000</div>
                  </div>
                  <div style={{background: 'rgba(255, 215, 0, 0.15)', padding: '1rem', borderLeft: '3px solid var(--color-primary)', marginBottom: '1rem'}}>
                    <p style={{fontSize: '0.95rem', margin: '0', color: 'var(--color-accent)', lineHeight: '1.6'}}>
                      <strong>Kit incluido:</strong> Remera de la carrera
                    </p>
                    <p style={{fontSize: '0.9rem', margin: '0.5rem 0 0 0', color: '#888'}}>Completar inscripción: certificado médico + comprobante de pago</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                    <a href="https://forms.gle/Y5piLHPRM7Q8p46k7" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="cta-button inscription-button">
                      Completar Inscripción
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Requisitos */}
            <div className="inscription-column">
              <div className="inscription-card">
                <h3>Requisitos para Participar</h3>
                <div className="requirements-list">
                  <div className="requirement-item">
                    <div className="requirement-icon">✓</div>
                    <div className="requirement-text">
                      <p className="requirement-title">Edad Mínima</p>
                      <p>18 años al día de la carrera</p>
                    </div>
                  </div>
                  <div className="requirement-item">
                    <div className="requirement-icon">✓</div>
                    <div className="requirement-text">
                      <p className="requirement-title">Certificado Médico</p>
                      <p>Obligatorio y vigente</p>
                    </div>
                  </div>
                  <div className="requirement-item">
                    <div className="requirement-icon">✓</div>
                    <div className="requirement-text">
                      <p className="requirement-title">Preparación Física</p>
                      <p>Conciencia de exigencias físicas y mentales</p>
                    </div>
                  </div>
                  <div className="requirement-item">
                    <div className="requirement-icon">✓</div>
                    <div className="requirement-text">
                      <p className="requirement-title">Aceptación de Riesgos</p>
                      <p>Conocimiento pleno de los riesgos asociados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Punto de Partida */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Punto de Partida</h2>
          <div className="start-point-card">
            <div className="start-point-info">
              <img src="/FluentEmojiHighContrastPushpin.png" alt="Ubicación" className="start-point-icon" />
              <div>
                <p className="start-point-name">Refugio Portinari</p>
                <p className="start-point-address">Manzano Histórico, Tunuyán, Mendoza</p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/4Bk3t56AMkGL83o3A"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section id="requisitos" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Información Adicional</h2>
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-header">
                <img src="/IconTrophy.svg" alt="Premiación" className="info-card-icon" />
                <h3>Categorías y Premiación</h3>
              </div>
              <ul className="info-card-list">
                <li>3 primeros generales femenino</li>
                <li>3 primeros generales masculino</li>
                <li>Medalla finisher para todos</li>
                <li>Reconocimiento especial al esfuerzo</li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-header">
                <img src="/IconMapPin.svg" alt="Cupos" className="info-card-icon" />
                <h3>Distancias y Cupos</h3>
              </div>
              <ul className="info-card-list">
                <li>28 km: máximo 30 corredores</li>
                <li>14 km: máximo 40 corredores</li>
                <li>Cupos limitados - Inscripción prioritaria</li>
                <li>Segunda edición</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Primera Edición - Galería */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Primera Edición - Momentos Destacados</h2>
          <p style={{textAlign: 'center', color: 'var(--color-accent)', marginBottom: '2rem', fontSize: '1.05rem'}}>
            Revive los momentos más intensos y emocionantes de la edición anterior
          </p>
          <div className="gallery-wrapper">
            <div className="gallery-carousel">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={`/imagenes/im${num}.jpeg`} alt={`Momento de la carrera ${num}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="section">
        <div className="container">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-grid">
            <a
              href="https://www.instagram.com/desafioalportillo/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <div className="contact-info">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@desafioalportillo</span>
              </div>
            </a>

            <a
              href="mailto:desafioalportillo@gmail.com"
              className="contact-card"
            >
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">desafioalportillo@gmail.com</span>
              </div>
            </a>

            <a
              href="https://wa.me/5492622353377"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div className="contact-info">
                <span className="contact-label">WhatsApp</span>
                <span className="contact-value">+54 9 2622 353377</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 style={{color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Bebas Neue'}}>
              Desafío al Portillo
            </h3>
            <p>Carrera de montaña en la Reserva Natural Portillo-Piuquenes</p>
            <p>Tunuyán, Mendoza - Argentina</p>
          </div>
          <p style={{marginTop: '2rem', color: '#888', fontSize: '0.9rem'}}>
            © 2025 Desafío al Portillo. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
