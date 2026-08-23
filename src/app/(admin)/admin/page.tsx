'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Utensils } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  chineseName?: string | null;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
};

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
            resolve(dataUrl);
          } else {
            reject(new Error('Canvas context failed'));
          }
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const compressedDataUrl = await compressImage(file);
      
      const blob = await (await fetch(compressedDataUrl)).blob();
      const data = new FormData();
      data.append('file', blob, file.name || 'dish.jpg');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const json = await res.json();
        return json.imageUrl;
      }
      return compressedDataUrl;
    } catch (err) {
      console.error(err);
      try {
        return await compressImage(file);
      } catch {
        alert('Error processing image from phone.');
        return null;
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCreateImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      setFormData(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url && editingItem) {
      setEditingItem(prev => prev ? { ...prev, imageUrl: url } : null);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    chineseName: '',
    description: '',
    price: '',
    category: 'Noodles',
    imageUrl: '/images/lanzhou_beef_noodles.png',
  });

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          name: '',
          chineseName: '',
          description: '',
          price: '',
          category: 'Noodles',
          imageUrl: '/images/lanzhou_beef_noodles.png',
        });
        setShowAddForm(false);
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const res = await fetch(`/api/menu/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setEditingItem(null);
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAvailable = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !item.isAvailable }),
      });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Menu Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Add, update, or manage dishes shown on the public restaurant menu.
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingItem(null);
          }}
        >
          <Plus size={18} /> {showAddForm ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form className="admin-form-card" onSubmit={handleCreate}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--accent-gold)' }}>Add New Menu Item</h3>
          <div className="admin-grid-2">
            <div className="form-group">
              <label className="form-label">English Name *</label>
              <input
                className="form-input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Braised Beef Noodle Soup"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Chinese Name</label>
              <input
                className="form-input"
                type="text"
                value={formData.chineseName}
                onChange={(e) => setFormData({ ...formData, chineseName: e.target.value })}
                placeholder="e.g. 红烧牛肉面"
              />
            </div>
          </div>

          <div className="admin-grid-3">
            <div className="form-group">
              <label className="form-label">Price (KSh) *</label>
              <input
                className="form-input"
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1200"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Noodles">Noodles</option>
                <option value="Dim Sum & Appetizers">Dim Sum & Appetizers</option>
                <option value="Main Dishes">Main Dishes</option>
                <option value="Barbecue">Barbecue</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Dish Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {formData.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.imageUrl} alt="Preview" style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                )}
                <div style={{ position: 'relative', flexGrow: 1 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCreateImageUpload}
                    style={{ display: 'none' }}
                    id="add-image-file"
                  />
                  <label 
                    htmlFor="add-image-file" 
                    className="btn-secondary" 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.9rem', width: '100%', textAlign: 'center' }}
                  >
                    {uploading ? 'Uploading...' : '📷 Upload / Take Photo from Phone'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the dish ingredients and flavor profile..."
            />
          </div>

          <button type="submit" className="btn-primary">Save Item</button>
        </form>
      )}

      {/* Edit Form */}
      {editingItem && (
        <form className="admin-form-card" onSubmit={handleUpdate} style={{ borderColor: 'var(--accent-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }}>Edit: {editingItem.name}</h3>
            <button type="button" onClick={() => setEditingItem(null)} style={{ background: 'none', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
          <div className="admin-grid-2">
            <div className="form-group">
              <label className="form-label">English Name</label>
              <input
                className="form-input"
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Chinese Name</label>
              <input
                className="form-input"
                type="text"
                value={editingItem.chineseName || ''}
                onChange={(e) => setEditingItem({ ...editingItem, chineseName: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-grid-2">
            <div className="form-group">
              <label className="form-label">Price (KSh)</label>
              <input
                className="form-input"
                type="number"
                value={editingItem.price}
                onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
              >
                <option value="Noodles">Noodles</option>
                <option value="Dim Sum & Appetizers">Dim Sum & Appetizers</option>
                <option value="Main Dishes">Main Dishes</option>
                <option value="Barbecue">Barbecue</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Dish Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {editingItem.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editingItem.imageUrl} alt="Preview" style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              )}
              <div style={{ position: 'relative', flexGrow: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  style={{ display: 'none' }}
                  id="edit-image-file"
                />
                <label 
                  htmlFor="edit-image-file" 
                  className="btn-secondary" 
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.9rem', width: '100%', textAlign: 'center' }}
                >
                  {uploading ? 'Uploading...' : '📷 Change / Upload Photo from Phone'}
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ background: 'var(--accent-gold)', color: '#000' }}>
            Update Menu Item
          </button>
        </form>
      )}

      {/* Items Table */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading menu items...</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    {item.chineseName && <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{item.chineseName}</div>}
                  </td>
                  <td>{item.category}</td>
                  <td>KSh {item.price.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleToggleAvailable(item)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: item.isAvailable ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                        color: item.isAvailable ? '#81c784' : '#e57373',
                      }}
                    >
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => { setEditingItem(item); setShowAddForm(false); }}
                        style={{ background: 'none', color: 'var(--accent-gold)', padding: '0.4rem' }}
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ background: 'none', color: 'var(--primary-red)', padding: '0.4rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
