'use client';

import { useState, useEffect } from 'react';

export default function OpenStatusBadge() {
  const [status, setStatus] = useState<{ isOpen: boolean; text: string }>({
    isOpen: true,
    text: 'Checking hours...',
  });

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Nairobi',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      let hour = 0;
      let minute = 0;
      let weekday = '';

      parts.forEach((p) => {
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
        if (p.type === 'weekday') weekday = p.value;
      });

      const currentMinutes = hour * 60 + minute;
      const openMinutes = weekday === 'Sun' ? 11 * 60 + 30 : 11 * 60;

      // Open if past opening time OR before 0:30 AM after midnight
      const isOpen = currentMinutes >= openMinutes || currentMinutes <= 30;

      if (isOpen) {
        setStatus({ isOpen: true, text: 'Open Now • Closes 12:30 AM' });
      } else {
        const nextOpenTime = weekday === 'Sun' ? '11:30 AM' : '11:00 AM';
        setStatus({ isOpen: false, text: `Closed • Opens at ${nextOpenTime}` });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.35rem 0.8rem',
        borderRadius: '20px',
        fontSize: '0.82rem',
        fontWeight: 600,
        background: status.isOpen ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
        color: status.isOpen ? '#66bb6a' : '#ef5350',
        border: `1px solid ${status.isOpen ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: status.isOpen ? '#66bb6a' : '#ef5350',
          boxShadow: status.isOpen ? '0 0 8px #66bb6a' : 'none',
          display: 'inline-block',
        }}
      />
      <span>{status.text}</span>
    </div>
  );
}
