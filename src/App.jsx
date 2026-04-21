// ============================================================
// App.jsx — root + Tweaks panel (player style only)
// ============================================================

import React from 'react';
import { Nav, Hero, Marquee, About, VoiceSamples, Testimonials, FAQ, Contact, Footer } from './Sections.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "playerStyle": "waveform"
}/*EDITMODE-END*/;

const PLAYER_OPTS = [
  { key: 'waveform', label: 'Waveform', desc: 'Live scrubbing — editorial' },
  { key: 'vinyl', label: 'Vinyl', desc: 'Spinning record + tonearm' },
  { key: 'radio', label: 'Radio', desc: 'Vintage tuning dial' },
];

function TweaksPanel({ visible, playerStyle, onPlayer }) {
  if (!visible) return null;
  return (
    <div
      className="tweaks-panel anim-up-sm"
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        padding: 20,
        width: 300,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
        boxShadow: '0 12px 30px -12px rgba(0,0,0,0.35)',
      }}
    >
      <div className="mono" style={{ color: 'var(--accent)', marginBottom: 4 }}>§ Tweaks</div>

      <div className="display" style={{ fontSize: 20, fontWeight: 500, marginTop: 8, marginBottom: 12 }}>
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
  const [tweaksVisible, setTweaksVisible] = React.useState(false);

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

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <VoiceSamples playerStyle={playerStyle} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {tweaksVisible && (
        <TweaksPanel
          visible={tweaksVisible}
          playerStyle={playerStyle}
          onPlayer={updatePlayer}
        />
      )}
    </>
  );
}

export default App;
