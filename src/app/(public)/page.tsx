import { prisma } from '@/lib/prisma';
import MenuSection from '@/components/MenuSection';
import ReviewsSection from '@/components/ReviewsSection';
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

      {/* Reviews Section */}
      <ReviewsSection />

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
                <p className="info-text">Mon–Sat: 11:00 AM – 12:30 AM | Sun: 11:30 AM – 12:30 AM</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone className="info-icon" size={28} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>WhatsApp & Phone Ordering</h4>
                <p className="info-text">
                  <a href="https://wa.me/254706546644" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                    0706546644 (+254 706 546 644)
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="info-card" style={{ padding: 0, overflow: 'hidden', minHeight: '300px', background: 'var(--bg-card-hover)', position: 'relative' }}>
            <iframe
              title="Yellow River Restaurant Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790937666497!2d36.78427777496582!3d-1.2971271986905584!2m3!1f0!0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10903332467d%3A0xb5b7964b38d380e2!2sKindaruma%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px', width: '100%' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
