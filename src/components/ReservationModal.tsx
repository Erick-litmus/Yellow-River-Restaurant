'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, X, Send, Utensils } from 'lucide-react';

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:30');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reservationText = 
      `🏮 *TABLE RESERVATION - YELLOW RIVER RESTAURANT* 🏮\n\n` +
      `👤 *Name:* ${name}\n` +
      `👥 *Guests:* ${guests} People\n` +
      `📅 *Date:* ${date}\n` +
      `⏰ *Time:* ${time}\n` +
      (notes ? `💬 *Special Requests:* ${notes}\n\n` : '\n') +
      `Please confirm availability for our table booking! Thank you.`;

    const encodedText = encodeURIComponent(reservationText);
    window.open(`https://wa.me/254706546644?text=${encodedText}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Utensils size={24} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
              Reserve a Table
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="admin-grid-2">
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={14} color="var(--accent-gold)" /> Number of Guests *
              </label>
              <select
                className="form-select"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6+">6+ Guests (Party)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="var(--accent-gold)" /> Reservation Date *
              </label>
              <input
                type="date"
                required
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} color="var(--accent-gold)" /> Preferred Time *
            </label>
            <input
              type="time"
              required
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Special Requests / Seating Preference</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="e.g. Outdoor covered seating, high chair needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center', padding: '0.85rem' }}>
            <Send size={18} /> Confirm via WhatsApp Reservation
          </button>
        </form>
      </div>
    </div>
  );
}
