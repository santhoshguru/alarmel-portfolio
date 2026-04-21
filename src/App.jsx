// ============================================================
// App.jsx — root + Tweaks integration (theme + player style)
// ============================================================

import React from 'react';
import { Nav, Hero, Marquee, About, VoiceSamples, Range, Platforms, Testimonials, FAQ, Contact, Footer } from './Sections.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "playerStyle": "waveform",
  "theme": "editorial"
}/*EDITMODE-END*/;

const THEMES = [
  {
    key: 'editorial',
    label: 'Editorial',
    desc: 'Cream paper · serif magazine',
    swatch: ['#F2EADB', '#1B1612', '#A8351F'],
  },
  {
    key: 'craft',
    label: 'Tamil craft',
    desc: 'Ochre · maroon · kolam lattice',
    swatch: ['#F5E9CF', '#2A1410', '#8C1F1A'],
  },
  {
    key: 'dark',
    label: 'Cinematic',
    desc: 'Near-black · amber · film credits',
    swatch: ['#0E0C0A', '#EFE7D4', '#D89A56'],
  },
  {
    key: 'modern',
    label: 'Brutalist',
    desc: 'Bone · hot orange · Space Grotesk',
    swatch: ['#F4F2ED', '#0A0A0A', '#FF4D1C'],
  },
  {
    key: 'serene',
    label: 'Serene',
    desc: 'Sage · cream · forest',
    swatch: ['#EEF0E5', '#2B3526', '#5A6B3D'],
  },
];

const PLAYER_OPTS = [
  { key: 'waveform', label: 'Waveform', desc: 'Live scrubbing — editorial' },
  { key: 'vinyl', label: 'Vinyl', desc: 'Spinning record + tonearm' },
  { key: 'radio', label: 'Radio', desc: 'Vintage tuning dial' },
];

function TweaksPanel({ visible, theme, playerStyle, onTheme, onPlayer }) {
  if (!visible) return null;
  return (
    <div
      className="tweaks-panel anim-up-sm"
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        padding: 20,
        width: 320,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
        boxShadow: '0 12px 30px -12px rgba(0,0,0,0.35)',
      }}
    >
      <div className="mono" style={{ color: 'var(--accent)', marginBottom: 4 }}>§ Tweaks</div>

      {/* Theme */}
      <div className="display" style={{ fontSize: 20, fontWeight: 500, marginTop: 8, marginBottom: 12 }}>
        Theme
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 22 }}>
        {THEMES.map(t => {
          const active = t.key === theme;
          return (
            <button
              key={t.key}
              onClick={() => onTheme(t.key)}
              style={{
                textAlign: 'left', padding: '10px 12px', cursor: 'pointer',
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--paper)' : 'var(--ink)',
                border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{ display: 'flex', flexShrink: 0 }}>
                {t.swatch.map((c, i) => (
                  <span key={i} style={{
                    width: 14, height: 22, background: c,
                    border: '1px solid ' + (active ? 'var(--paper)' : 'var(--rule)'),
                    marginLeft: i === 0 ? 0 : -1,
                  }} />
                ))}
              </span>
              <span style={{ flex: 1 }}>
                <span className="display" style={{ fontSize: 16, fontWeight: 500, display: 'block' }}>{t.label}</span>
                <span className="mono" style={{ color: active ? 'var(--paper-3)' : 'var(--ink-3)', fontSize: 9, marginTop: 2, display: 'block' }}>{t.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Player style */}
      <div className="display" style={{ fontSize: 20, fontWeight: 500, marginBottom: 12, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
        Player style
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PLAYER_OPTS.map(o => {
          const active = o.key === playerStyle;
          return (
            <button
              key={o.key}
              onClick={() => onPlayer(o.key)}
              style={{
                textAlign: 'left', padding: '10px 12px', cursor: 'pointer',
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--paper)' : 'var(--ink)',
                border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
                fontFamily: 'inherit',
              }}
            >
              <div className="display" style={{ fontSize: 16, fontWeight: 500 }}>{o.label}</div>
              <div className="mono" style={{ color: active ? 'var(--paper-3)' : 'var(--ink-3)', fontSize: 9, marginTop: 2 }}>{o.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [playerStyle, setPlayerStyle] = React.useState(TWEAK_DEFAULTS.playerStyle);
  const [theme, setTheme] = React.useState(TWEAK_DEFAULTS.theme || 'editorial');
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

  // apply theme to <html>
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Tweaks protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updatePlayer = (s) => {
    setPlayerStyle(s);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { playerStyle: s } }, '*');
  };
  const updateTheme = (t) => {
    setTheme(t);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: t } }, '*');
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <VoiceSamples playerStyle={playerStyle} />
        <Range />
        <Platforms />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {tweaksVisible && (
        <TweaksPanel
          visible={tweaksVisible}
          theme={theme}
          playerStyle={playerStyle}
          onTheme={updateTheme}
          onPlayer={updatePlayer}
        />
      )}
    </>
  );
}

export default App;
