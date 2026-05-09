'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Dummy imports - we'll initialize state with these
import { webinars as initialWebinars } from '@/lib/webinairs-data';
import { workshops as initialWorkshops } from '@/lib/workshops-data';
import { mindshares as initialMindshares } from '@/lib/mindshares-data';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Local state for the items
  const [items, setItems] = useState({
    webinaires: [],
    workshops: [],
    mindshares: [],
  });

  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [webinarsRes, workshopsRes, mindsharesRes] = await Promise.all([
        fetch('/api/webinars'),
        fetch('/api/workshops'),
        fetch('/api/mindshares')
      ]);

      const [webinars, workshops, mindshares] = await Promise.all([
        webinarsRes.json(),
        workshopsRes.json(),
        mindsharesRes.json()
      ]);

      setItems({
        webinaires: webinars,
        workshops: workshops,
        mindshares: mindshares,
      });
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('admin_user');
    if (!user) {
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
    { id: 'users', label: 'Utilisateurs', icon: '👥' },
    { id: 'settings', label: 'Paramètres', icon: '⚙' },
  ];

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleCreate = () => {
    const defaultData = activeTab === 'mindshares' 
      ? { title: '', category: '', date: '', author: '', content: '' }
      : activeTab === 'workshops'
      ? { title: '', category: '', instructor: '', description: '' }
      : { title: '', category: '', date: '', speaker: '', description: '' };
    
    setEditingItem(defaultData);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const endpoint = `/api/${activeTab === 'webinaires' ? 'webinars' : activeTab}`;
    const url = isCreating ? endpoint : `${endpoint}/${editingItem.id}`;
    const method = isCreating ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        await fetchItems(); // Refresh the list
        setEditingItem(null);
        setIsCreating(false);
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Une erreur est survenue');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élément ?')) return;

    const endpoint = `/api/${activeTab === 'webinaires' ? 'webinars' : activeTab}`;
    try {
      const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchItems(); // Refresh the list
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const currentList = items[activeTab as keyof typeof items] || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#091209', color: 'rgba(245,242,236,0.8)', fontFamily: "'Jost', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: '280px', background: 'rgba(2,4,2,0.95)', borderRight: '1px solid rgba(196,153,58,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(196,153,58,0.05)' }}>
          <img src="/logo-transparent.png" alt="Logo" style={{ height: '60px', filter: 'saturate(0) brightness(0.8)', marginBottom: '1rem' }} />
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,153,58,0.6)', margin: 0 }}>Espace Admin</p>
        </div>
        
        <div style={{ flex: 1, padding: '2rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {TABS.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: activeTab === tab.id ? 'rgba(196,153,58,0.1)' : 'transparent',
                    border: 'none',
                    borderLeft: `2px solid ${activeTab === tab.id ? 'var(--gold)' : 'transparent'}`,
                    padding: '1rem 2rem',
                    color: activeTab === tab.id ? 'var(--gold)' : 'rgba(245,242,236,0.5)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding: '2rem', borderTop: '1px solid rgba(196,153,58,0.05)' }}>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_user');
              router.push('/admin/login');
            }}
            style={{ 
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.65rem', 
              color: 'rgba(255,100,100,0.7)', 
              cursor: 'pointer',
              letterSpacing: '0.15em', 
              textTransform: 'uppercase' 
            }}
          >
            ← Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative', overflowY: 'auto', height: '100vh' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(196,153,58,0.03) 0%, transparent 100%)', pointerEvents: 'none' }} />
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, color: 'var(--white)', margin: 0, lineHeight: 1.2 }}>
              {editingItem ? (isCreating ? 'Créer un nouvel élément' : 'Éditer l\'élément') : TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--faint)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>
              Gestion et administration du portail Dental Fairies
            </p>
          </div>
          {!editingItem && activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'users' && (
            <button onClick={handleCreate} style={{
              background: 'linear-gradient(135deg, #C4993A, #8B6820)',
              color: 'var(--green-void)',
              border: 'none',
              padding: '0.6rem 1.5rem',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
            }}>
              + Ajouter Nouveau
            </button>
          )}
        </header>

        {editingItem ? (
          <div style={{ background: 'rgba(2,4,2,0.6)', border: '1px solid rgba(196,153,58,0.1)', padding: '3rem', position: 'relative', zIndex: 10 }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Titre principal</label>
                  <input 
                    type="text" 
                    value={editingItem.title || ''} 
                    onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                    style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Catégorie</label>
                  <input 
                    type="text" 
                    value={editingItem.category || ''} 
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                    style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Date</label>
                  <input 
                    type="text" 
                    value={editingItem.date || ''} 
                    onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                    style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Intervenant / Auteur</label>
                  <input 
                    type="text" 
                    value={editingItem.speaker || editingItem.author || ''} 
                    onChange={e => setEditingItem({...editingItem, speaker: e.target.value, author: e.target.value})}
                    style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Image / Poster (Nom du fichier ou URL)</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {(editingItem.posterFile || editingItem.image) && (
                      <div style={{ width: '60px', height: '60px', background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.4)', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={editingItem.posterFile ? `/webinares/${editingItem.posterFile}` : editingItem.image} 
                          alt="Preview" 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} 
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <input 
                      type="text" 
                      placeholder="ex: affiche-2026.jpg ou https://..."
                      value={editingItem.posterFile || editingItem.image || ''} 
                      onChange={e => setEditingItem({...editingItem, posterFile: e.target.value, image: e.target.value})}
                      style={{ flex: 1, background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Description Complète</label>
                <textarea 
                  value={editingItem.description || editingItem.content || ''} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value, content: e.target.value})}
                  rows={6}
                  style={{ background: 'rgba(17,26,17,0.8)', border: '1px solid rgba(196,153,58,0.2)', padding: '0.8rem 1rem', color: 'var(--white)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setEditingItem(null)} style={{ background: 'transparent', border: '1px solid rgba(196,153,58,0.3)', color: 'var(--gold)', padding: '0.8rem 2rem', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.15em' }}>Annuler</button>
                <button type="submit" style={{ background: 'var(--gold)', border: 'none', color: 'var(--green-void)', padding: '0.8rem 2rem', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.15em' }}>Sauvegarder</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
                {[
                  { label: 'Webinaires', count: items.webinaires.length, color: '#9B7E2E' },
                  { label: 'Workshops', count: items.workshops.length, color: '#7A9E7A' },
                  { label: 'Mindshares', count: items.mindshares.length, color: '#6B8FA8' },
                  { label: 'Membres', count: 1250, color: '#A86B6B' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(2,4,2,0.6)', border: '1px solid rgba(196,153,58,0.1)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '4px', background: stat.color }} />
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)', margin: '0 0 1rem' }}>{stat.label}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 200, color: 'var(--white)', margin: 0, lineHeight: 1 }}>{stat.count}</p>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === 'webinaires' || activeTab === 'workshops' || activeTab === 'mindshares') && (
              <div style={{ background: 'rgba(2,4,2,0.6)', border: '1px solid rgba(196,153,58,0.1)', padding: '1px', position: 'relative', zIndex: 10 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(196,153,58,0.05)', textAlign: 'left' }}>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.1em' }}>Titre</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.1em' }}>Catégorie</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.1em' }}>Date</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.1em', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentList.map((item: any) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(196,153,58,0.05)', color: 'var(--dim)' }}>
                        <td style={{ padding: '1rem 1.5rem', color: 'var(--white)' }}>{item.title}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>{item.categoryLabel || item.category || 'Général'}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>{item.date || 'N/A'}</td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: '1px solid rgba(196,153,58,0.3)', color: 'var(--gold)', cursor: 'pointer', padding: '0.3rem 0.8rem', fontSize: '0.6rem', marginRight: '0.5rem', transition: 'background 0.3s' }}>Éditer</button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: '1px solid rgba(255,100,100,0.3)', color: 'rgba(255,100,100,0.8)', cursor: 'pointer', padding: '0.3rem 0.8rem', fontSize: '0.6rem', transition: 'background 0.3s' }}>Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'users' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', border: '1px dashed rgba(196,153,58,0.2)', color: 'var(--faint)' }}>
                Module de gestion des utilisateurs en cours de développement...
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', border: '1px dashed rgba(196,153,58,0.2)', color: 'var(--faint)' }}>
                Paramètres du site...
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
