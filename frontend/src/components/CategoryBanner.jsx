import React, { useState } from 'react';
import bannerImg from '../assets/banner-martita.png';
import { BUSINESS_HOURS, isBusinessOpen } from '../data/businessHours.js';

const CategoryBanner = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isOpen = isBusinessOpen();

  return (
    <div className="category-banner">
      <div className="category-banner__frame">
        <img className="category-banner__image hero-banner-img" src={bannerImg} alt="Lo de Martita" />

        <div className="category-banner__meta">
          <div className="category-banner__title-group">
            <button
              type="button"
              className={`status-badge status-badge--floating ${isOpen ? 'status-badge--open' : 'status-badge--closed'}`}
              onClick={() => setShowInfo(true)}
              aria-label="Ver horarios de atención"
            >
              <span className={`status-dot ${isOpen ? 'status-dot--open' : 'status-dot--closed'}`} />
              {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
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
              {BUSINESS_HOURS.map(({ day, shifts }) => (
                <div key={day} className="schedule-row">
                  <span className="schedule-day">{day}</span>
                  <div className="schedule-turns">
                    {(shifts.length ? shifts : [{ from: 'Cerrado', to: '', type: 'closed' }]).map((shift, index) => (
                      <span
                        key={`${day}-${shift.from}-${shift.to}-${index}`}
                        className={`schedule-turn ${shift.type === 'closed' ? 'schedule-turn--closed' : 'schedule-turn--open'}`}
                      >
                        {shift.type === 'closed' ? shift.from : `${shift.from} a ${shift.to} hs`}
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
