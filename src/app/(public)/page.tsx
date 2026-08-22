import { prisma } from '@/lib/prisma';
import MenuSection from '@/components/MenuSection';
import { MapPin, Clock, Star, Phone, Utensils } from 'lucide-react';

export const revalidate = 0; // Dynamic data

export default async function HomePage() {
  const items = await prisma.menuItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <span className="hero-badge">⭐ 5.0 Rated Chinese Restaurant in Kilimani</span>
          <h1 className="hero-title">
            <span style={{ color: 'var(--primary-red)' }}>黄河人餐厅</span>
            <br />
            Yellow River Restaurant
          </h1>
          <p className="hero-subtitle">
            Authentic Lanzhou Hand-Pulled Beef Noodles & Classic Chinese Cuisine in the heart of Nairobi.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="btn-primary">Explore Our Menu</a>
            <a href="#location" className="btn-secondary">Visit Us Today</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-title-wrap">
          <span className="section-tag">Our Heritage</span>
          <h2 className="section-title">Authentic Flavors, Handcrafted Daily</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <Utensils className="info-icon" size={32} />
            <h3 className="info-title">Lanzhou Hand-Pulled Noodles</h3>
            <p className="info-text">
              Prepared fresh every day by master chefs using traditional techniques. Perfectly chewy noodles served in a rich, slow-simmered beef broth topped with homemade chili oil.
            </p>
          </div>
          <div className="info-card">
            <Star className="info-icon" size={32} />
            <h3 className="info-title">Outdoor Dining & Atmosphere</h3>
            <p className="info-text">
              Enjoy a relaxed dining experience with comfortable covered outdoor seating, perfect for lunch with friends, family dinners, or quick delicious bites.
            </p>
          </div>
          <div className="info-card">
            <MapPin className="info-icon" size={32} />
            <h3 className="info-title">Prime Location</h3>
            <p className="info-text">
              Conveniently located on Kindaruma Rd, Nairobi (near Panda Mart). Easy access and welcoming hospitality every day of the week.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuSection initialItems={JSON.parse(JSON.stringify(items))} />

      {/* Location & Hours Section */}
      <section id="location" className="section">
        <div className="section-title-wrap">
          <span className="section-tag">Plan Your Visit</span>
          <h2 className="section-title">Location & Opening Hours</h2>
        </div>
        <div className="info-grid">
          <div className="info-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MapPin className="info-icon" size={28} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Address</h4>
                <p className="info-text">Kindaruma Rd, Kilimani, Nairobi, Kenya</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Clock className="info-icon" size={28} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Opening Hours</h4>
                <p className="info-text">Open Daily from 11:00 AM onwards</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone className="info-icon" size={28} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Dine-In & Takeaway</h4>
                <p className="info-text">Walk-ins and group reservations welcome</p>
              </div>
            </div>
          </div>

          <div className="info-card" style={{ padding: 0, overflow: 'hidden', minHeight: '280px', background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <MapPin size={48} color="var(--primary-red)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Kindaruma Rd, Nairobi</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Near Panda Mart & Ngong Road Junction</p>
              <a
                href="https://maps.google.com/?q=Kindaruma+Rd+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
