import React, { useState } from 'react';
import bannerImg from '../assets/banner-martita.png';

const HORARIOS = [
  { dia: 'Lunes', turnos: [{ label: 'Cerrado', type: 'closed' }] },
  { dia: 'Martes', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { dia: 'Miércoles', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { dia: 'Jueves', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { dia: 'Viernes', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { dia: 'Sábado', turnos: [{ label: '11:30 a 14:00 hs', type: 'open' }, { label: '20:00 a 23:00 hs', type: 'open' }] },
  { dia: 'Domingo', turnos: [{ label: '20:00 a 23:00 hs', type: 'open' }] },
];

const CategoryBanner = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isOpen = true;

  return (
    <div className="category-banner">
      <div className="category-banner__frame">
        <img className="category-banner__image hero-banner-img" src={bannerImg} alt="Lo de Martita" />

        <div className="category-banner__meta">
          <div className="category-banner__title-group">
            <button
              type="button"
              className="status-badge status-badge--floating"
              onClick={() => setShowInfo(true)}
              aria-label="Ver horarios de atención"
            >
              <span className={`status-dot ${isOpen ? 'status-dot--open' : 'status-dot--closed'}`} />
              Abierto ahora
            </button>
            <h2 className="category-banner__title">Lo de Martita</h2>
          </div>

          <div className="category-banner__controls">
            <button className="info-trigger-btn" type="button" onClick={() => setShowInfo(true)}>
              Información
            </button>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="modal-overlay" onClick={() => setShowInfo(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setShowInfo(false)} aria-label="Cerrar información">
              ×
            </button>

            <h3>Horarios de atención</h3>
            <div className="schedule-list">
              {HORARIOS.map(({ dia, turnos }) => (
                <div key={dia} className="schedule-row">
                  <span className="schedule-day">{dia}</span>
                  <div className="schedule-turns">
                    {turnos.map((turno, index) => (
                      <span
                        key={`${dia}-${turno.label}-${index}`}
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
    </div>
  );
};

export default CategoryBanner;
