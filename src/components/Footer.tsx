export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>黄河人餐厅 Yellow River Restaurant</p>
        <p>Kindaruma Rd, Kilimani, Nairobi, Kenya</p>
        <p>© {new Date().getFullYear()} Yellow River Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}
