import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const schedule = [
  { day: 'Lunes', turnos: [{ label: 'Cerrado', type: 'closed' }] },
  { day: 'Martes', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { day: 'Miércoles', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { day: 'Jueves', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { day: 'Viernes', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { day: 'Sábado', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { day: 'Domingo', turnos: [{ label: '20:00 a 23:00 hs', type: 'open' }] },
];

const Home = () => {
  const [showHours, setShowHours] = useState(false);
  const isOpen = true;

  const categories = [
    { name: 'Pizzas', icon: '🍕', path: '/pizzas', desc: 'Artesanales al molde' },
    { name: 'Hamburguesas', icon: '🍔', path: '/hamburguesas', desc: 'Caseras con papas' },
    { name: 'Empanadas', icon: '🥟', path: '/empanadas', desc: 'Rellenos tradicionales' },
    { name: 'Milanesas', icon: '🥩', path: '/milanesas', desc: 'Al plato o en sándwich' },
    { name: 'Pastas', icon: '🍝', path: '/pastas', desc: 'Salsa y sabor casero' },
    { name: 'Guarniciones', icon: '🍟', path: '/guarniciones', desc: 'Papas, puré y ensaladas' },
  ];

  return (
    <div style={{ color: '#fff', backgroundColor: '#121212', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* 🚀 HERO BANNER PUBLICITARIO */}
      <section style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(18,18,18,1)), url("/assets/banner-hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px 60px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setShowHours(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(37, 211, 102, 0.5)',
              background: 'rgba(16, 16, 16, 0.75)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(37, 211, 102, 0.25)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', boxShadow: '0 0 10px #25D366, 0 0 18px rgba(37, 211, 102, 0.7)', display: 'inline-block' }} />
            Abierto ahora
          </button>

          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
            LO MEJOR EN <span style={{ color: '#e0ac52' }}>TU MESA</span>
          </h1>
        </div>

        <p style={{ color: '#e0ac52', fontWeight: '600', fontSize: '1.2rem', marginBottom: '15px', marginTop: '16px' }}>
          — Delivery & Take Away —
        </p>
        <p style={{ maxWidth: '600px', color: '#ccc', fontSize: '1rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Disfrutá nuestras pizzas, empanadas, pastas, milanesas y hamburguesas hechas con ingredientes frescos y todo el sabor casero que nos distingue.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => setShowHours(true)}
            style={{
              background: 'rgba(28, 28, 28, 0.88)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#e0e0e0',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Información
          </button>

          <Link to="/pizzas" style={{
            backgroundColor: '#e0ac52',
            color: '#111',
            padding: '14px 32px',
            borderRadius: '30px',
            fontWeight: '700',
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(224, 172, 82, 0.4)',
            transition: 'transform 0.2s',
          }}>
            🛒 EXPLORAR EL MENÚ
          </Link>
        </div>
      </section>

      {/* 🍕 EXPLORAR CATEGORÍAS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', textAlign: 'center', color: '#fff' }}>
          ¿Qué vas a pedir hoy?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {categories.map((cat, idx) => (
            <Link key={idx} to={cat.path} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                <div>
                  <h3 style={{ color: '#e0ac52', margin: '0 0 5px 0', fontSize: '1.2rem' }}>{cat.name}</h3>
                  <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>{cat.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {showHours && (
        <div className="modal-overlay" onClick={() => setShowHours(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setShowHours(false)} aria-label="Cerrar información">
              ×
            </button>
            <h3>Horarios de atención</h3>
            <div className="schedule-list">
              {schedule.map(({ day, turnos }) => (
                <div key={day} className="schedule-row">
                  <span className="schedule-day">{day}</span>
                  <div className="schedule-turns">
                    {turnos.map((turno, index) => (
                      <span
                        key={`${day}-${turno.label}-${index}`}
                        className={`schedule-turn ${turno.type === 'closed' ? 'schedule-turn--closed' : 'schedule-turn--open'}`}
                      >
                        {turno.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ⭐ BENEFICIOS / SERVICIOS */}
      <section style={{
        maxWidth: '1100px',
        margin: '50px auto 0',
        padding: '30px 20px',
        borderTop: '1px solid #2a2a2a',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        textAlign: 'center',
      }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛵</div>
          <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Delivery Rápido</h4>
          <p style={{ color: '#777', fontSize: '0.8rem', margin: 0 }}>Llegamos caliente a tu casa</p>
        </div>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏅</div>
          <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Calidad Garantizada</h4>
          <p style={{ color: '#777', fontSize: '0.8rem', margin: 0 }}>Recetas caseras</p>
        </div>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🍃</div>
          <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Ingredientes Frescos</h4>
          <p style={{ color: '#777', fontSize: '0.8rem', margin: 0 }}>Materia prima seleccionada</p>
        </div>
      </section>

    </div>
  );
};

export default Home;