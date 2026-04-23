// ============================================================
// Player.jsx — waveform / vinyl / radio variants
// Real audio playback via <audio>; the waveform is a decorative
// deterministic shape seeded per-track.
// ============================================================

import { useState, useEffect, useRef, useMemo } from 'react';

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

function TrackMeta({ track, idx, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
      <span className="mono" style={{ color: 'var(--ink-3)' }}>
        № {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <span className="mono" style={{ color: 'var(--accent)' }}>{track.category}</span>
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

function parseMS(str) {
  if (!str) return 0;
  const [m, s] = str.split(':').map(Number);
  return (Number.isFinite(m) ? m : 0) * 60 + (Number.isFinite(s) ? s : 0);
}

// Real-audio playback hook: wraps a hidden <audio> element keyed by track.id.
// Returns refs/handlers the player variants wire into their <audio> tag.
function usePlayback(track) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [totalSec, setTotalSec] = useState(() => parseMS(track.duration));

  useEffect(() => {
    setIsPlaying(false);
    setProgressState(0);
    setTotalSec(parseMS(track.duration));
  }, [track.id, track.duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, track.id]);

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const dur = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : totalSec;
    setProgressState(dur > 0 ? audio.currentTime / dur : 0);
  };
  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      setTotalSec(audio.duration);
    }
  };
  const onEnded = () => {
    setIsPlaying(false);
    setProgressState(1);
  };

  const seekToFraction = (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    setProgressState(clamped);
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = clamped * audio.duration;
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = 0;
    setProgressState(0);
  };

  return {
    audioRef,
    audioProps: {
      src: track.audioUrl,
      preload: 'metadata',
      onTimeUpdate,
      onLoadedMetadata,
      onEnded,
    },
    isPlaying, setIsPlaying,
    progress, setProgress: seekToFraction,
    totalSec,
    restart,
  };
}

const fmt = (sec) => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// ============================================================
// WAVEFORM
// ============================================================
function WaveformPlayer({ track, idx, total }) {
  const { audioRef, audioProps, isPlaying, setIsPlaying, progress, setProgress, totalSec, restart } = usePlayback(track);
  const [hover, setHover] = useState(null);
  const containerRef = useRef(null);

  // Bar count is derived from rendered width so the waveform never overflows
  // its container (140 bars + 2px gaps = 418px minimum — too wide for phones).
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width || 0;
      setContainerWidth(w);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const BARS = containerWidth >= 900 ? 140
             : containerWidth >= 600 ? 100
             : containerWidth >= 400 ? 70
             : 50;
  const shape = useMemo(() => waveShape(track.seed, BARS), [track.seed, BARS]);

  const seek = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    setProgress(p);
  };
  const onMove = (e) => {
    const r = containerRef.current.getBoundingClientRect();
    setHover(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };

  return (
    <div style={{ width: '100%' }}>
      <audio ref={audioRef} {...audioProps} />
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', color: 'var(--ink)',
        fontWeight: 500, letterSpacing: '-0.015em'
      }}>{track.title}</h2>
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 'var(--fs-body)', lineHeight: 1.55, marginTop: 8 }}>
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
            minWidth: 0, overflow: 'hidden',
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
          fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-mono)',
          color: 'var(--ink-3)', letterSpacing: '0.1em'
        }}>
          <span>{fmt(progress * totalSec)}</span>
          <span>−{fmt(totalSec - progress * totalSec)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22 }}>
        <PlayBtn playing={isPlaying} onClick={() => setIsPlaying(p => !p)} />
        <button
          onClick={restart}
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
  const { audioRef, audioProps, isPlaying, setIsPlaying, progress, totalSec } = usePlayback(track);
  const tonearmAngle = isPlaying ? -10 - progress * 22 : -32;
  const [rot, setRot] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = now - last; last = now;
      setRot(r => (r + dt * 0.09) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  return (
    <div style={{ width: '100%' }}>
      <audio ref={audioRef} {...audioProps} />
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', fontWeight: 500, letterSpacing: '-0.015em'
      }}>{track.title}</h2>
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 'var(--fs-body)', lineHeight: 1.55 }}>{track.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 28, flexWrap: 'wrap', minWidth: 0 }}>
        <div style={{ position: 'relative', width: 220, height: 220, maxWidth: '100%' }}>
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
  const { audioRef, audioProps, isPlaying, setIsPlaying, progress } = usePlayback(track);
  const dialAngle = -55 + ((idx / Math.max(1, total - 1)) * 110);
  const needleLeft = 20 + (idx / Math.max(1, total - 1)) * 60;

  return (
    <div style={{ width: '100%' }}>
      <audio ref={audioRef} {...audioProps} />
      <TrackMeta track={track} idx={idx} total={total} />
      <h2 className="display" style={{
        fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05,
        margin: '14px 0 6px 0', fontWeight: 500
      }}>{track.title}</h2>
      <p style={{ color: 'var(--ink-2)', maxWidth: 620, fontSize: 'var(--fs-body)', lineHeight: 1.55 }}>{track.description}</p>

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
          <div style={{ marginTop: 8, fontSize: 'var(--fs-mono)', color: 'rgba(0,0,0,0.7)' }}>
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
