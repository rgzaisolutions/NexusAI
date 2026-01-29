import React, { useState, useMemo } from 'react';
import toolsData from './data/tools.json';
import siteLogo from './assets/logo.png';

// Simple SVG Icons for categories
const Icons = {
  AgenticAI: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.1 12.1" /><path d="M12 12l9.9-0.1" /><circle cx="12" cy="12" r="3" /><path d="M14.5 9l4.5-4.5" /><path d="M9.5 9L5 4.5" /><path d="M14.5 15l4.5 4.5" /><path d="M9.5 15L5 19.5" /></svg>
  ),
  LLM: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  Video: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
  ),
  Images: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
  ),
  Marketing: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
  ),
  ThreeD: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
  ),
  Audio: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
  ),
  Infrastructure: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6" y2="6" /><line x1="6" y1="18" x2="6" y2="18" /></svg>
  ),
  Research: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  )
};

const CATEGORIES = [
  { id: 'All', name: 'Todas', icon: null },
  { id: 'Agentes', name: 'Agentes', icon: <Icons.AgenticAI /> },
  { id: 'LLM', name: 'LLM', icon: <Icons.LLM /> },
  { id: 'Video', name: 'Video', icon: <Icons.Video /> },
  { id: 'Imágenes', name: 'Imágenes', icon: <Icons.Images /> },
  { id: 'Avatares', name: 'Avatares', icon: <Icons.Marketing /> },
  { id: '3D', name: '3D', icon: <Icons.ThreeD /> },
  { id: 'Audio', name: 'Audio', icon: <Icons.Audio /> },
  { id: 'Dev', name: 'Dev', icon: <Icons.Infrastructure /> },
  { id: 'Investigación', name: 'Investigación', icon: <Icons.Research /> }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);

  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div className="brand" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="NexusAI Logo" className="logo-img" />
        </div>
        <nav className="nav">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="nav-icon">{cat.icon}</span>
              <span className="nav-label">{cat.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="header">
          <div className="search-container glass">
            <Icons.Research />
            <input
              type="text"
              placeholder="Buscar herramientas, agentes, modelos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="grid-container">
          <div className="bento-grid">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.name}
                className={`tool-card glass neon-shadow-${index % 2 === 0 ? 'cyan' : 'purple'}`}
                onClick={() => setSelectedTool(tool)}
              >
                <div className="card-header">
                  <div className="tool-logo-container">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`}
                      alt={tool.name}
                      className="tool-icon-img"
                      loading="lazy"
                      onError={(e) => {
                        // Si el favicon de Google falla, intentar Clearbit, y si no, UI Avatars
                        if (!e.target.src.includes('clearbit')) {
                          e.target.src = tool.logo || `https://logo.clearbit.com/${new URL(tool.url).hostname}`;
                        } else {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&color=fff&bold=true`;
                        }
                      }}
                    />
                  </div>
                  <span className="category-tag">{tool.category}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="card-footer">
                  <span className="pricing-tag">{tool.pricing}</span>
                  <button className="view-btn">Ver más</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedTool(null)}>&times;</button>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="tool-logo-container large">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(selectedTool.url).hostname}&sz=128`}
                    alt={selectedTool.name}
                    className="tool-icon-img"
                    onError={(e) => {
                      if (!e.target.src.includes('clearbit')) {
                        e.target.src = selectedTool.logo || `https://logo.clearbit.com/${new URL(selectedTool.url).hostname}`;
                      } else {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTool.name)}&background=random&color=fff&bold=true`;
                      }
                    }}
                  />
                </div>
                <div>
                  <h2 style={{ margin: 0 }}>{selectedTool.name}</h2>
                  <span className="category-tag">{selectedTool.category}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <section>
                <h4>Descripción</h4>
                <p>{selectedTool.description}</p>
              </section>

              <div className="stats-grid">
                <div className="stat-item glass">
                  <label>Precio</label>
                  <span>{selectedTool.pricing}</span>
                </div>
                <div className="stat-item glass">
                  <label>Acceso</label>
                  <span>{selectedTool.name}</span>
                </div>
              </div>

              <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                Visitar Herramienta
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
