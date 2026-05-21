'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [items, setItems] = useState({
    webinaires: [],
    workshops: [],
    mindshares: [],
    vip: [],
    products: [],
    settings: { ccp: '', rip: '' },
  });

  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [webinarsRes, workshopsRes, mindsharesRes, vipRes, productsRes, settingsRes] = await Promise.all([
        fetch('/api/webinars'),
        fetch('/api/workshops'),
        fetch('/api/mindshares'),
        fetch('/api/vip-offers'),
        fetch('/api/products'),
        fetch('/api/settings')
      ]);

      const webinars = webinarsRes.ok ? await webinarsRes.json().catch(() => []) : [];
      const workshops = workshopsRes.ok ? await workshopsRes.json().catch(() => []) : [];
      const mindshares = mindsharesRes.ok ? await mindsharesRes.json().catch(() => []) : [];
      const vip = vipRes.ok ? await vipRes.json().catch(() => []) : [];
      const products = productsRes.ok ? await productsRes.json().catch(() => []) : [];
      const settings = settingsRes.ok ? await settingsRes.json().catch(() => ({ ccp: '', rip: '' })) : { ccp: '', rip: '' };

      setItems({
        webinaires: Array.isArray(webinars) ? webinars : [],
        workshops: Array.isArray(workshops) ? workshops : [],
        mindshares: Array.isArray(mindshares) ? mindshares : [],
        vip: Array.isArray(vip) ? vip : [],
        products: Array.isArray(products) ? products : [],
        settings: (settings && !settings.error) ? settings : { ccp: '', rip: '' },
      });
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminData = localStorage.getItem('admin_user');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    fetchItems();
  }, []);

  const TABS = [
    { id: 'overview', label: 'Vue Globale', icon: '◱' },
    { id: 'webinaires', label: 'Webinaires', icon: '🎥' },
    { id: 'mindshares', label: 'Mindshares', icon: '📝' },
    { id: 'workshops', label: 'Workshops', icon: '🛠' },
    { id: 'vip', label: 'Coaching VIP', icon: '💎' },
    { id: 'products', label: 'Comptoir Dentaire', icon: '🛒' },
    { id: 'settings', label: 'Paramètres', icon: '⚙' },
  ];

  const handleEdit = (item: any) => {
    // If it's a workshop or vip, ensure sessions/curriculum is initialized
    const preparedItem = { ...item };
    if (activeTab === 'workshops' && !preparedItem.curriculum) preparedItem.curriculum = [];
    if (activeTab === 'vip' && !preparedItem.sessions) preparedItem.sessions = [];
    
    setEditingItem(preparedItem);
    setIsCreating(false);
  };

  const handleCreate = () => {
    const defaultData = activeTab === 'mindshares' 
      ? { title: '', category: '', date: '', author: '', content: '', tags: [] }
      : activeTab === 'workshops'
      ? { title: '', category: '', instructor: '', description: '', curriculum: [], tags: [] }
      : activeTab === 'vip'
      ? { label: '', price: '', period: '/ mois', highlight: false, features: [], sessions: [] }
      : activeTab === 'products'
      ? { name: '', price: '', description: '', image: '', category: '', tags: [] }
      : { title: '', category: '', date: '', speaker: '', description: '', tags: [] };
    
    setEditingItem(defaultData);
    setIsCreating(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditingItem({
          ...editingItem,
          posterFile: data.url,
          image: data.url
        });
        alert('Fichier téléchargé avec succès');
      } else {
        alert('Erreur lors du téléchargement');
      }
    } catch (error) {
      alert('Erreur lors du téléchargement');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const token = localStorage.getItem('token');

    let endpoint = `/api/${activeTab === 'webinaires' ? 'webinars' : activeTab}`;
    if (activeTab === 'vip') endpoint = '/api/vip-offers';
    
    const url = isCreating ? endpoint : `${endpoint}/${editingItem.id}`;
    const method = isCreating ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        await fetchItems();
        setEditingItem(null);
        setIsCreating(false);
        alert('Sauvegardé avec succès');
      } else {
        const err = await response.json();
        alert(`Erreur: ${err.error || 'Erreur lors de la sauvegarde'}`);
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élément ?')) return;

    const token = localStorage.getItem('token');
    let endpoint = `/api/${activeTab === 'webinaires' ? 'webinars' : activeTab}`;
    if (activeTab === 'vip') endpoint = '/api/vip-offers';
    
    try {
      const response = await fetch(`${endpoint}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        await fetchItems();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Sub-items management (Sessions/Modules)
  const addSubItem = () => {
    if (activeTab === 'workshops') {
      const newModule = { title: '', description: '', duration: '', meetLink: '', order: editingItem.curriculum.length };
      setEditingItem({ ...editingItem, curriculum: [...editingItem.curriculum, newModule] });
    } else if (activeTab === 'vip') {
      const newSession = { title: '', date: '', meetLink: '', order: editingItem.sessions.length };
      setEditingItem({ ...editingItem, sessions: [...editingItem.sessions, newSession] });
    }
  };

  const updateSubItem = (index: number, field: string, value: any) => {
    if (activeTab === 'workshops') {
      const newCurriculum = [...editingItem.curriculum];
      newCurriculum[index] = { ...newCurriculum[index], [field]: value };
      setEditingItem({ ...editingItem, curriculum: newCurriculum });
    } else if (activeTab === 'vip') {
      const newSessions = [...editingItem.sessions];
      newSessions[index] = { ...newSessions[index], [field]: value };
      setEditingItem({ ...editingItem, sessions: newSessions });
    }
  };

  const removeSubItem = (index: number) => {
    if (activeTab === 'workshops') {
      const newCurriculum = editingItem.curriculum.filter((_: any, i: number) => i !== index);
      setEditingItem({ ...editingItem, curriculum: newCurriculum });
    } else if (activeTab === 'vip') {
      const newSessions = editingItem.sessions.filter((_: any, i: number) => i !== index);
      setEditingItem({ ...editingItem, sessions: newSessions });
    }
  };

  const activeItems = items[activeTab as keyof typeof items];
  const currentList: any[] = Array.isArray(activeItems) ? activeItems : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#091209', color: 'rgba(245,242,236,0.8)', fontFamily: "'Jost', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: '320px', background: 'rgba(2,4,2,0.95)', borderRight: '1px solid rgba(196,153,58,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(196,153,58,0.05)', textAlign: 'center' }}>
          <img src="/logo-transparent.png" alt="Logo" style={{ height: '140px', width: 'auto', filter: 'saturate(0) brightness(0.9)', marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C4993A', margin: 0, fontWeight: 300 }}>Espace Administration</p>
        </div>
        
        <div style={{ flex: 1, padding: '2rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {TABS.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                  style={{
                    width: '100%', textAlign: 'left', background: activeTab === tab.id ? 'rgba(196,153,58,0.08)' : 'transparent',
                    border: 'none', borderLeft: `3px solid ${activeTab === tab.id ? '#C4993A' : 'transparent'}`,
                    padding: '1.2rem 2.5rem', color: activeTab === tab.id ? '#C4993A' : 'rgba(245,242,236,0.4)',
                    cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: '1.2rem', transition: 'all 0.3s',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding: '2.5rem', borderTop: '1px solid rgba(196,153,58,0.05)' }}>
          <button 
            onClick={() => { localStorage.removeItem('admin_user'); localStorage.removeItem('token'); router.push('/admin/login'); }}
            style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.7rem', color: 'rgba(255,100,100,0.6)', cursor: 'pointer', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            ← Déconnexion sécurisée
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '4rem 5rem', position: 'relative', overflowY: 'auto', height: '100vh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: 'white', margin: 0 }}>
              {editingItem ? (isCreating ? 'Nouveau' : 'Modification') : TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <div style={{ width: '60px', height: '2px', background: '#C4993A', marginTop: '1rem' }}></div>
          </div>
          {!editingItem && activeTab !== 'overview' && activeTab !== 'settings' && (
            <button onClick={handleCreate} style={{
              background: 'linear-gradient(135deg, #C4993A, #8B6820)', color: 'white', border: 'none', padding: '0.8rem 2rem',
              fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 500,
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}>
              + Créer un élément
            </button>
          )}
        </header>

        {editingItem ? (
          <div style={{ background: 'rgba(2,4,2,0.6)', border: '1px solid rgba(196,153,58,0.1)', padding: '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* BASIC FIELDS */}
              {activeTab === 'vip' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>LABEL DE L'OFFRE</label>
                    <input type="text" value={editingItem.label || ''} onChange={e => setEditingItem({...editingItem, label: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>PRIX (€)</label>
                    <input type="text" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>AVANTAGES (UN PAR LIGNE)</label>
                    <textarea value={editingItem.features?.join('\n') || ''} onChange={e => setEditingItem({...editingItem, features: e.target.value.split('\n')})} rows={4} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none', resize: 'vertical' }} />
                  </div>
                </div>
              ) : activeTab === 'products' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>NOM DU PRODUIT</label>
                    <input type="text" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>PRIX (e.g. 5000 DZD)</label>
                    <input type="text" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>CATÉGORIE</label>
                    <input type="text" value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>TAGS (SÉPARÉS PAR VIRGULE)</label>
                    <input type="text" value={editingItem.tags?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',').map(t => t.trim())})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>DESCRIPTION</label>
                    <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} rows={3} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none', resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>IMAGE DU PRODUIT</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <input type="text" value={editingItem.image || ''} readOnly style={{ flex: 1, background: 'rgba(17,26,17,0.4)', border: '1px solid rgba(196,153,58,0.1)', padding: '1rem', color: 'rgba(255,255,255,0.4)', outline: 'none' }} />
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept="image/*" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} style={{ background: 'rgba(196,153,58,0.1)', border: '1px solid #C4993A', color: '#C4993A', padding: '1rem 2rem', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                        {isUploading ? 'TRANSFERT...' : 'CHOISIR IMAGE'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>TITRE</label>
                    <input type="text" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>CATÉGORIE</label>
                    <input type="text" value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>DATE / PÉRIODE</label>
                    <input type="text" value={editingItem.date || ''} onChange={e => setEditingItem({...editingItem, date: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>INTERVENANT</label>
                    <input type="text" value={editingItem.speaker || editingItem.author || editingItem.instructor || ''} onChange={e => setEditingItem({...editingItem, speaker: e.target.value, author: e.target.value, instructor: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  {activeTab !== 'mindshares' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>LIEN GOOGLE MEET (PRINCIPAL)</label>
                      <input type="text" value={editingItem.meetLink || ''} onChange={e => setEditingItem({...editingItem, meetLink: e.target.value})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>TAGS (SÉPARÉS PAR VIRGULE)</label>
                    <input type="text" value={editingItem.tags?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',').map(t => t.trim())})} style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '0.65rem', color: '#C4993A', letterSpacing: '0.2em' }}>IMAGE / POSTER</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <input type="text" value={editingItem.posterFile || editingItem.image || ''} readOnly style={{ flex: 1, background: 'rgba(17,26,17,0.4)', border: '1px solid rgba(196,153,58,0.1)', padding: '1rem', color: 'rgba(255,255,255,0.4)', outline: 'none' }} />
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept="image/*" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} style={{ background: 'rgba(196,153,58,0.1)', border: '1px solid #C4993A', color: '#C4993A', padding: '1rem 2rem', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                        {isUploading ? 'TRANSFERT...' : 'CHOISIR IMAGE'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SESSIONS / MODULES MANAGEMENT */}
              {(activeTab === 'workshops' || activeTab === 'vip') && (
                <div style={{ borderTop: '1px solid rgba(196,153,58,0.1)', paddingTop: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                      {activeTab === 'workshops' ? 'Modules du Workshop' : 'Sessions de Coaching'}
                    </h3>
                    <button type="button" onClick={addSubItem} style={{ background: 'transparent', border: '1px solid #C4993A', color: '#C4993A', padding: '0.5rem 1.2rem', fontSize: '0.65rem', cursor: 'pointer', letterSpacing: '0.1em' }}>
                      + Ajouter une session
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {(activeTab === 'workshops' ? editingItem.curriculum : editingItem.sessions).map((sub: any, idx: number) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,153,58,0.1)', padding: '1.5rem', position: 'relative' }}>
                        <button type="button" onClick={() => removeSubItem(idx)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF6464', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>TITRE DE LA SESSION</label>
                            <input type="text" value={sub.title || ''} onChange={e => updateSubItem(idx, 'title', e.target.value)} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(196,153,58,0.1)', padding: '0.8rem', color: 'white', outline: 'none' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>{activeTab === 'workshops' ? 'DURÉE' : 'DATE & HEURE'}</label>
                            <input type="text" value={sub.duration || sub.date || ''} onChange={e => updateSubItem(idx, activeTab === 'workshops' ? 'duration' : 'date', e.target.value)} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(196,153,58,0.1)', padding: '0.8rem', color: 'white', outline: 'none' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                            <label style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>LIEN GOOGLE MEET</label>
                            <input type="text" value={sub.meetLink || ''} onChange={e => updateSubItem(idx, 'meetLink', e.target.value)} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(196,153,58,0.1)', padding: '0.8rem', color: 'white', outline: 'none' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', marginTop: '2rem', borderTop: '1px solid rgba(196,153,58,0.1)', paddingTop: '2.5rem' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ background: 'transparent', border: '1px solid rgba(196,153,58,0.3)', color: '#C4993A', padding: '1rem 2.5rem', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.15em' }}>ANNULER</button>
                <button type="submit" style={{ background: '#C4993A', border: 'none', color: '#091209', padding: '1rem 3rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.2em' }}>ENREGISTRER</button>
              </div>
            </form>
          </div>
        ) : (
          /* TABLES VIEW */
          <div style={{ background: 'rgba(2,4,2,0.6)', border: '1px solid rgba(196,153,58,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            {activeTab === 'overview' ? (
              <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                {[
                  { label: 'Webinaires', count: items.webinaires.length, icon: '🎥' },
                  { label: 'Workshops', count: items.workshops.length, icon: '🛠' },
                  { label: 'Mindshares', count: items.mindshares.length, icon: '📝' },
                  { label: 'Coaching VIP', count: items.vip.length, icon: '💎' },
                  { label: 'Comptoir Dentaire', count: items.products.length, icon: '🛒' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,153,58,0.1)', padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{stat.icon}</div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(196,153,58,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>{stat.label}</p>
                    <p style={{ fontSize: '3.5rem', color: 'white', margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>{stat.count}</p>
                  </div>
                ))}
              </div>
            ) : activeTab === 'settings' ? (
              <div style={{ padding: '4rem' }}>
                <h3 style={{ color: '#C4993A', marginBottom: '3rem', fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }}>Configuration Globale</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>NUMÉRO CCP</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input type="text" defaultValue={items.settings.ccp || ''} id="ccp-input" style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                      <button onClick={async () => {
                        const val = (document.getElementById('ccp-input') as HTMLInputElement).value;
                        await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'ccp', value: val }) });
                        alert('CCP mis à jour');
                      }} style={{ background: '#C4993A', border: 'none', color: '#091209', padding: '0 2rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600 }}>MAJ</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>NUMÉRO RIP</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input type="text" defaultValue={items.settings.rip || ''} id="rip-input" style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(196,153,58,0.2)', padding: '1rem', color: 'white', outline: 'none' }} />
                      <button onClick={async () => {
                        const val = (document.getElementById('rip-input') as HTMLInputElement).value;
                        await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'rip', value: val }) });
                        alert('RIP mis à jour');
                      }} style={{ background: '#C4993A', border: 'none', color: '#091209', padding: '0 2rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600 }}>MAJ</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(196,153,58,0.08)', textAlign: 'left' }}>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#C4993A', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Titre / Label</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#C4993A', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Catégorie / Prix</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#C4993A', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Date / Période</th>
                    <th style={{ padding: '1.5rem 2.5rem', color: '#C4993A', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentList.map((item: any) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(196,153,58,0.05)', transition: 'background 0.3s' }}>
                      <td style={{ padding: '1.5rem 2.5rem', color: 'white', fontSize: '0.9rem' }}>{item.title || item.label}</td>
                      <td style={{ padding: '1.5rem 2.5rem', color: 'rgba(255,255,255,0.5)' }}>{item.category || item.price}</td>
                      <td style={{ padding: '1.5rem 2.5rem', color: 'rgba(255,255,255,0.5)' }}>{item.date || item.period}</td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'right' }}>
                        <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid rgba(196,153,58,0.3)', color: '#C4993A', padding: '0.4rem 1.2rem', fontSize: '0.65rem', marginRight: '0.8rem', cursor: 'pointer', transition: 'all 0.3s' }}>Modifier</button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: '1px solid rgba(255,100,100,0.2)', color: '#FF6464', padding: '0.4rem 1.2rem', fontSize: '0.65rem', cursor: 'pointer', transition: 'all 0.3s' }}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {currentList.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Aucun élément trouvé dans cette catégorie.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
