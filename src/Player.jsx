// ============================================================
// Player.jsx — waveform / vinyl / radio variants
// CSS-driven (Framer Motion entry animations weren't reliable in this env).
// ============================================================

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ------ deterministic pseudo-waveform shape (peaks per track) ------
function waveShape(seed, bars = 140) {
  const out = [];
  let s = seed;
  for (let i = 0; i < bars; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r1 = s / 233280;
    const t = i / bars;
    const env = Math.sin(t * Math.PI) ** 0.6;
    const detail = 0.55 + 0.45 * Math.sin(t * 17 + seed) * Math.cos(t * 9 + seed * 0.3);
    const v = Math.max(0.08, env * (0.45 + 0.55 * r1) * (0.7 + 0.3 * detail));
    out.push(Math.min(1, v));
  }
  return out;
}

// ------ in-browser synthesized voice-like tone ------
function useSynthAudio(seed, isPlaying) {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const analyserRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AC();
      analyserRef.current = ctxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.connect(ctxRef.current.destination);
    }
    return ctxRef.current;
  }, []);

  const start = useCallback(() => {
    const ctx = ensureCtx();
    if (ctx.state === 'suspended') ctx.resume();
    if (nodesRef.current) return;
    const base = 110 + (seed % 40);
    const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = base;
    const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = base * 1.5;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = base * 2.01;
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.25 + (seed % 5) * 0.07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    const g = ctx.createGain(); g.gain.value = 0.0001;
    g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.6);
    lfoGain.connect(g.gain);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 1400; filter.Q.value = 0.4;
    [o1, o2, o3].forEach(o => o.connect(filter));
    filter.connect(g);
    g.connect(analyserRef.current);
    o1.start(); o2.start(); o3.start(); lfo.start();
    nodesRef.current = { o1, o2, o3, lfo, g };
  }, [seed, ensureCtx]);

  const stop = useCallback(() => {
    if (!nodesRef.current || !ctxRef.current) return;
    const { o1, o2, o3, lfo, g } = nodesRef.current;
    const t = ctxRef.current.currentTime;
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(g.gain.value, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    setTimeout(() => { try { o1.stop(); o2.stop(); o3.stop(); lfo.stop(); } catch(e){} }, 300);
    nodesRef.current = null;
  }, []);

  useEffect(() => {
    if (isPlaying) start(); else stop();
    return () => stop();
  }, [isPlaying, start, stop]);

  const getLevels = useCallback(() => {
    if (!analyserRef.current) return null;
    const arr = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(arr);
    return arr;
  }, []);

  return { getLevels };
}

function TrackMeta({ track, idx, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
      <span className="mono" style={{ color: 'var(--ink-3)' }}>
        № {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <span className="mono" style={{ color: 'var(--accent)' }}>{track.category}</span>
      <span className="mono" style={{ color: 'var(--ink-3)' }}>{track.language}</span>
      <span className="mono" style={{ color: 'var(--ink-3)' }}>{track.duration}</span>
    </div>
  );
}

function PlayBtn({ playing, onClick, big = true, color }) {
  return (
    <button
      onClick={onClick}
      aria-label={playing ? 'Pause' : 'Play'}
      className="hover-scale"
      style={{
        width: big ? 64 : 48, height: big ? 64 : 48, borderRadius: '50%',
        border: '1.5px solid ' + (color || 'var(--ink)'),
        background: playing ? (color || 'var(--ink)') : 'transparent',
        color: playing ? 'var(--paper)' : (color || 'var(--ink)'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s, transform 0.15s',
      }}
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="3" width="4" height="14" fill="currentColor"/><rect x="12" y="3" width="4" height="14" fill="currentColor"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 3 L17 10 L5 17 Z" fill="currentColor"/></svg>
      )}
    </button>
  );
}

// shared playback hook
function usePlayback(track) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSec = useMemo(() => {
    const [m, s] = track.duration.split(':').map(Number);
    return m * 60 + s;
  }, [track.duration]);
  const startedAtRef = useRef(0);
  const startedProgressRef = useRef(0);
  const rafRef = useRef(null);

  useSynthAudio(track.seed, isPlaying);

  useEffect(() => { setIsPlaying(false); setProgress(0); }, [track.id]);

  useEffect(() => {
    if (!isPlaying) { cancelAnimationFrame(rafRef.current); return; }
    startedAtRef.current = performance.now();
    startedProgressRef.current = progress;
    const tick = () => {
      const elapsed = (performance.now() - startedAtRef.current) / 1000;
      const p = Math.min(1, startedProgressRef.current + elapsed / totalSec);
      setProgress(p);
      if (p >= 1) { setIsPlaying(false); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line
  }, [isPlaying, track.id]);

  return { isPlaying, setIsPlaying, progress, setProgress, totalSec, startedAtRef, startedProgressRef };
}

const fmt = (sec) => {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// ============================================================
// WAVEFORM
// ============================================================
function WaveformPlayer({ track, idx, total }) {
  const BARS = 140;
  const shape = useMemo(() => waveShape(track.seed, BARS), [track.seed]);
  const { isPlaying, setIsPlaying, progress, setProgress, totalSec, startedAtRef, startedProgressRef } = usePlayback(track);
  const [hover, setHover] = useState(null);
  const containerRef = useRef(null);

  const seek = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    setProgress(p);
    if (isPlaying) {
      startedAtRef.current = performance.now();
      startedProgressRef.current = p;
    }
  };
  const onMove = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    setHover(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };

  return (
    <div style={{ width: '100%' }}>
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', color: 'var(--ink)',
        fontWeight: 500, letterSpacing: '-0.015em'
      }}>{track.title}</h2>
      {track.titleEn && (
        <div style={{ fontStyle: 'italic', color: 'var(--ink-2)', fontSize: 18, marginBottom: 14 }}>
          “{track.titleEn}”
        </div>
      )}
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 17, lineHeight: 1.55, marginTop: 8 }}>
        {track.description}
      </p>

      <div style={{ marginTop: 28 }}>
        <div
          ref={containerRef}
          onClick={seek}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          style={{
            position: 'relative', height: 130, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 2, userSelect: 'none',
          }}
        >
          {shape.map((v, i) => {
            const barP = (i + 0.5) / BARS;
            const played = barP <= progress;
            const hovered = hover != null && barP <= hover && barP > progress;
            const wobble = isPlaying && Math.abs(barP - progress) < 0.03 ? 1.15 : 1;
            const h = Math.max(3, v * 120 * wobble);
            return (
              <div
                key={i}
                style={{
                  flex: 1, minWidth: 1, height: h,
                  background: played ? 'var(--accent)' : hovered ? 'var(--accent-deep)' : 'var(--ink-3)',
                  opacity: played ? 1 : (hovered ? 0.85 : 0.42),
                  borderRadius: 1,
                  transition: 'height 0.12s ease-out, background 0.15s, opacity 0.15s',
                }}
              />
            );
          })}
          <div
            style={{
              position: 'absolute', top: -4, bottom: -4,
              left: `${progress * 100}%`,
              width: 2, background: 'var(--ink)',
              boxShadow: '0 0 0 3px rgba(168,53,31,0.15)',
              pointerEvents: 'none',
              transition: 'left 0.05s linear',
            }}
          />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 10,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          color: 'var(--ink-3)', letterSpacing: '0.1em'
        }}>
          <span>{fmt(progress * totalSec)}</span>
          <span>−{fmt(totalSec - progress * totalSec)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22 }}>
        <PlayBtn playing={isPlaying} onClick={() => setIsPlaying(p => !p)} />
        <button
          onClick={() => setProgress(0)}
          className="mono"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-2)', padding: '6px 10px' }}
        >Restart</button>
        <div className="mono" style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>
          {isPlaying ? '● now playing' : '○ paused'}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VINYL
// ============================================================
function VinylPlayer({ track, idx, total }) {
  const { isPlaying, setIsPlaying, progress, totalSec } = usePlayback(track);
  const tonearmAngle = isPlaying ? -10 - progress * 22 : -32;
  // for spinning: use rotate accumulated via state on raf
  const [rot, setRot] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = now - last; last = now;
      setRot(r => (r + dt * 0.09) % 360); // 90deg/sec → 4s per rev
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  return (
    <div style={{ width: '100%' }}>
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', fontWeight: 500, letterSpacing: '-0.015em'
      }}>{track.title}</h2>
      {track.titleEn && (
        <div style={{ fontStyle: 'italic', color: 'var(--ink-2)', fontSize: 18, marginBottom: 14 }}>“{track.titleEn}”</div>
      )}
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 17, lineHeight: 1.55 }}>{track.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 28, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: 220, height: 220 }}>
          <div style={{ width: '100%', height: '100%', transform: `rotate(${rot}deg)`, transition: isPlaying ? 'none' : 'transform 0.6s ease' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <defs>
                <radialGradient id={`vinyl-${track.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1B1612" />
                  <stop offset="55%" stopColor="#2A211A" />
                  <stop offset="100%" stopColor="#0D0907" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="110" r="108" fill={`url(#vinyl-${track.id})`} />
              {[...Array(14)].map((_, i) => (
                <circle key={i} cx="110" cy="110" r={40 + i * 5} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              ))}
              <circle cx="110" cy="110" r="38" fill="var(--accent)" />
              <circle cx="110" cy="110" r="38" fill="none" stroke="var(--gold)" strokeWidth="1" />
              <text x="110" y="106" textAnchor="middle" fill="var(--paper)" fontFamily="Cormorant Garamond, serif" fontSize="11" fontStyle="italic">Alarmel</text>
              <text x="110" y="120" textAnchor="middle" fill="var(--paper)" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="2">SIDE A</text>
              <circle cx="110" cy="110" r="3" fill="#0D0907" />
            </svg>
          </div>
          <div
            style={{
              position: 'absolute', top: -10, right: -30, width: 110, height: 6,
              transformOrigin: '100% 50%',
              transform: `rotate(${tonearmAngle}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.3, 1.4, 0.4, 1)',
            }}
          >
            <div style={{ width: '100%', height: 4, background: 'var(--ink-3)', position: 'absolute', top: 1, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: -6, top: -4, width: 16, height: 14, background: 'var(--ink)', borderRadius: 2 }} />
            <div style={{ position: 'absolute', right: -8, top: -8, width: 18, height: 18, background: 'var(--ink-2)', borderRadius: '50%', border: '2px solid var(--ink)' }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ height: 4, background: 'var(--paper-3)', position: 'relative', marginBottom: 10 }}>
            <div style={{ position: 'absolute', inset: 0, width: `${progress * 100}%`, background: 'var(--accent)', transition: 'width 0.05s linear' }} />
          </div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-3)' }}>
            <span>{fmt(progress * totalSec)}</span><span>{track.duration}</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 24, alignItems: 'center' }}>
            <PlayBtn playing={isPlaying} onClick={() => setIsPlaying(p => !p)} />
            <span className="mono" style={{ color: 'var(--ink-3)' }}>33⅓ rpm · long play</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RADIO
// ============================================================
function RadioPlayer({ track, idx, total }) {
  const { isPlaying, setIsPlaying, progress } = usePlayback(track);
  const dialAngle = -55 + ((idx / Math.max(1, total - 1)) * 110);
  const needleLeft = 20 + (idx / Math.max(1, total - 1)) * 60;

  return (
    <div style={{ width: '100%' }}>
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', fontWeight: 500
      }}>{track.title}</h2>
      {track.titleEn && (
        <div style={{ fontStyle: 'italic', color: 'var(--ink-2)', fontSize: 18, marginBottom: 14 }}>“{track.titleEn}”</div>
      )}
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 17, lineHeight: 1.55 }}>{track.description}</p>

      <div style={{
        marginTop: 28,
        background: 'linear-gradient(180deg, #2A1F15 0%, #1B1612 100%)',
        border: '1px solid var(--ink)', borderRadius: 4, padding: 24,
        color: 'var(--paper-2)',
        boxShadow: 'inset 0 1px 0 rgba(255,220,180,0.08), 0 14px 30px -16px rgba(0,0,0,0.45)',
      }}>
        <div style={{
          background: 'radial-gradient(ellipse at center, #C9933A 0%, #8B5A1F 100%)',
          padding: 14, borderRadius: 2, position: 'relative', overflow: 'hidden',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.15em' }}>
            <span>88</span><span>92</span><span>96</span><span>100</span><span>104</span><span>108 MHz</span>
          </div>
          <div style={{ height: 30, position: 'relative', marginTop: 6 }}>
            {[...Array(40)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute', left: `${(i/39)*100}%`, top: 0,
                width: 1, height: i % 5 === 0 ? 14 : 8,
                background: 'rgba(0,0,0,0.5)'
              }} />
            ))}
            <div
              style={{
                position: 'absolute', top: -4, height: 38, width: 2,
                background: 'var(--accent)', boxShadow: '0 0 8px rgba(168,53,31,0.8)',
                left: `${needleLeft}%`,
                transition: 'left 0.6s cubic-bezier(0.3, 1.3, 0.4, 1)',
              }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(0,0,0,0.7)' }}>
            STATION {String(idx + 1).padStart(2, '0')} · ALARMEL FM · {track.category.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, marginTop: 22, alignItems: 'center' }}>
          <div style={{
            flex: 1, height: 80,
            background: 'repeating-linear-gradient(0deg, #1B1612 0px, #1B1612 2px, #3A2A1C 2px, #3A2A1C 4px)',
            borderRadius: 2, position: 'relative', overflow: 'hidden',
          }}>
            {isPlaying && (
              <div style={{ position: 'absolute', inset: 12, display: 'flex', gap: 4, alignItems: 'flex-end' }}>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="eq-bar"
                    style={{
                      flex: 1, background: 'var(--accent)', opacity: 0.7, borderRadius: 1,
                      animationDuration: `${0.5 + (i % 5) * 0.15}s`,
                      animationDelay: `${(i % 7) * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              width: 70, height: 70, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #4A3F33, #1B1612)',
              border: '2px solid #0A0805', position: 'relative',
              boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,200,140,0.1)',
              transform: `rotate(${dialAngle}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.3, 1.3, 0.4, 1)',
            }}
          >
            <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 3, height: 16, background: 'var(--gold)', borderRadius: 2 }} />
          </div>

          <PlayBtn playing={isPlaying} onClick={() => setIsPlaying(p => !p)} color="var(--gold)" />
        </div>

        <div style={{ marginTop: 18, height: 2, background: 'rgba(255,220,180,0.15)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, width: `${progress * 100}%`, background: 'var(--gold)', transition: 'width 0.05s linear' }} />
        </div>
      </div>
    </div>
  );
}

function Player({ track, idx, total, style }) {
  if (style === 'vinyl') return <VinylPlayer track={track} idx={idx} total={total} />;
  if (style === 'radio') return <RadioPlayer track={track} idx={idx} total={total} />;
  return <WaveformPlayer track={track} idx={idx} total={total} />;
}

export default Player;
