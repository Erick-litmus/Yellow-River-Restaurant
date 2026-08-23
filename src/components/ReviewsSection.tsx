'use client';

import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'David K.',
    location: 'Kilimani, Nairobi',
    rating: 5,
    date: '1 week ago',
    comment: 'Hands down the best Lanzhou hand-pulled beef noodles in Nairobi! The broth is deeply flavorful, the chili oil is aromatic, and the noodles have the perfect authentic bounce. Highly recommended!',
  },
  {
    id: 2,
    name: 'Mei-Ling W.',
    location: 'Nairobi Resident',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Authentic Chinese flavors just like home. The cumin lamb skewers were perfectly spiced and charred, and the dumpling dough is fresh and handmade daily.',
  },
  {
    id: 3,
    name: 'Sarah M.',
    location: 'Kindaruma Road Local',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Loved the cozy covered outdoor dining setup. Great portion sizes for price, fast WhatsApp ordering service, and friendly hospitality!',
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section" style={{ background: 'var(--bg-card-hover)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-title-wrap">
        <span className="section-tag">Diner Satisfaction</span>
        <h2 className="section-title">What Our Guests Say</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', color: '#ffc107' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#ffc107" color="#ffc107" />
            ))}
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>5.0 / 5.0</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(Google Reviews & Local Diners)</span>
        </div>
      </div>

      <div className="info-grid" style={{ marginTop: '2rem' }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="info-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div>
              <Quote size={28} color="var(--accent-gold)" style={{ opacity: 0.4, marginBottom: '0.75rem' }} />
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                "{review.comment}"
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', color: '#ffc107', marginBottom: '0.5rem' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {review.name}
                    <CheckCircle2 size={14} color="#4caf50" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.location}</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
