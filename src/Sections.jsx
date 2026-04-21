// ============================================================
// Sections.jsx — Hero, About, Voices, Range, Platforms, Testimonials, Contact
// Framer Motion entry animations were unreliable in this env — using CSS keyframes.
// ============================================================

import React from 'react';
import { TRACKS, CATEGORIES } from './data.jsx';
import Player from './Player.jsx';

// ------------------------------------------------------------
// Top nav
// ------------------------------------------------------------
function Nav() {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#voices', label: 'Voice Samples' },
    { href: '#range', label: 'Range' },
    { href: '#platforms', label: 'Platforms' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--paper)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--rule)',
      padding: '14px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#top" style={{ textDecoration: 'none', color: 'var(--ink)', display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="display" style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 500 }}>Alarmel</span>
        <span className="mono" style={{ color: 'var(--ink-3)' }}>Voice Artist · Tamil</span>
      </a>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="mono" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}

// ------------------------------------------------------------
// HERO — passion-led, crisp
// ------------------------------------------------------------
function Hero() {
  return (
    <section id="top" style={{
      padding: '60px 40px 80px',
      maxWidth: 1280, margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 60, alignItems: 'center',
    }}>
      <div>
        <div className="anim-up-sm">
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 26 }}>
            ── Issue Nº 01 · Chennai · தமிழ் Voice Artist
          </div>
        </div>

        <h1
          className="display anim-up d1"
          style={{
            fontSize: 'clamp(56px, 8.5vw, 124px)',
            lineHeight: 0.92,
            margin: 0, fontWeight: 500,
            letterSpacing: '-0.025em',
          }}
        >
          Stories,<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>told aloud</span><br/>
          in Tamil.
        </h1>

        <p
          className="anim-fade d4"
          style={{
            marginTop: 36, fontSize: 21, lineHeight: 1.55,
            color: 'var(--ink-2)', maxWidth: 540,
            fontStyle: 'italic',
          }}
        >
          A voice shaped by a lifetime of reading, reciting, and listening. I record children's stories, audiobooks, documentary narration, commercial spots and devotional recitations — with the pacing, warmth and care the Tamil language asks for.
        </p>

        <div
          className="anim-up-sm d5"
          style={{ marginTop: 40, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a href="#voices" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '14px 22px', background: 'var(--ink)', color: 'var(--paper)',
            textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span style={{ fontSize: 14 }}>▶</span> Listen to her work
          </a>
          <a href="#contact" className="mono" style={{ color: 'var(--ink-2)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Get in touch →
          </a>
        </div>
      </div>

      <div className="anim-scale" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -14,
          border: '1px solid var(--rule)',
          borderRadius: 0, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: -28, left: -28,
          fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)',
          letterSpacing: '0.2em',
        }}>
          PLATE I
        </div>
        <img
          src="assets/alarmel.jpg"
          alt="Alarmel"
          style={{
            width: '100%', display: 'block',
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />
        <div style={{
          marginTop: 14, fontStyle: 'italic', fontSize: 14,
          color: 'var(--ink-3)', textAlign: 'right',
        }}>
          Alarmel, photographed at home — Chennai, March 2026.
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Marquee (Tamil-focused keywords)
// ------------------------------------------------------------
function Marquee() {
  const items = [
    'தமிழ்', '·', "Children's Stories", '·', 'Audiobooks',
    '·', 'Documentary', '·', 'Commercial', '·', 'Devotional', '·', 'Character Voices',
    '·', 'Narration', '·', 'திருப்பாவை',
  ];
  return (
    <section style={{
      borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
      padding: '22px 0', overflow: 'hidden', background: 'var(--paper-2)',
    }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 36, whiteSpace: 'nowrap', width: 'fit-content' }}>
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="display" style={{
            fontSize: 32, fontStyle: t === '·' ? 'normal' : 'italic',
            color: t === '·' ? 'var(--accent)' : 'var(--ink-2)',
            fontWeight: 400,
          }}>{t}</span>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// ABOUT — passion-led. Banker mentioned only in passing.
// ------------------------------------------------------------
function About() {
  return (
    <section id="about" style={{
      padding: '120px 40px',
      maxWidth: 1180, margin: '0 auto',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 60 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 14 }}>§ About</div>
          <h2 className="display" style={{
            fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>
            A passion,<br/><em>properly trained.</em>
          </h2>
        </div>
        <div style={{ paddingTop: 12 }}>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
            <span className="display" style={{
              float: 'left', fontSize: 92, lineHeight: 0.86,
              padding: '6px 12px 0 0', color: 'var(--accent)', fontWeight: 500,
            }}>I</span>
            have always loved the sound of a story read aloud — the pause before a surprise, the lilt of a well-placed word, the way a child leans in when a voice softens. Voice acting is the work I came to follow that love into, and I completed my professional training so I could do it with craft, not just affection.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--ink-2)', marginTop: 22 }}>
            My days now begin in a small quiet room with a microphone. I record in Tamil — children's stories mostly, but also audiobooks, documentary narration, commercials, character pieces and devotional recitation. I work slowly, listen closely, and never submit a take I wouldn't listen to twice.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--ink-2)', marginTop: 22, fontStyle: 'italic' }}>
            (Before this life in sound, I had a long and steady career in Indian banking. The patience and precision that asked of me turned out to be the same patience and precision the booth asks of me now.)
          </p>
        </div>
      </div>

      {/* facts strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        marginTop: 40,
      }}>
        {[
          ['15', 'pieces in this portfolio'],
          ['தமிழ்', 'working language'],
          ['7', 'categories of work'],
          ['∞', 'stories still to tell'],
        ].map(([n, l], i) => (
          <div key={i} style={{
            padding: '32px 24px',
            borderRight: i < 3 ? '1px solid var(--rule)' : 'none',
          }}>
            <div className="display" style={{ fontSize: 64, lineHeight: 1, fontWeight: 500, color: 'var(--ink)' }}>{n}</div>
            <div className="mono" style={{ color: 'var(--ink-3)', marginTop: 10 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* personal — interests */}
      <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 12 }}>Aside from the booth</div>
          <h3 className="display" style={{ fontSize: 36, lineHeight: 1.05, margin: 0, fontWeight: 500 }}>
            A life arranged around <em>literature, devotion, and the body in motion.</em>
          </h3>
        </div>
        <div style={{ color: 'var(--ink-2)', fontSize: 17, lineHeight: 1.7 }}>
          Her readings are shaped by the things she loves outside the studio: a long-running affection for Tamil literature; bhajans sung in the household at dawn; yoga, aerobics and a steady strength-training practice that keeps the breath disciplined; a kitchen she enjoys on weekends; and grandchildren she refuses to miss a single afternoon with.
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// VOICES — the centerpiece
// ------------------------------------------------------------
function VoiceSamples({ playerStyle }) {
  const [activeCat, setActiveCat] = React.useState("All");
  const [activeIdx, setActiveIdx] = React.useState(0);

  const filtered = React.useMemo(() =>
    activeCat === "All" ? TRACKS : TRACKS.filter(t => t.category === activeCat),
    [activeCat]
  );

  React.useEffect(() => { setActiveIdx(0); }, [activeCat]);

  const track = filtered[activeIdx] || filtered[0];

  return (
    <section id="voices" style={{
      padding: '120px 40px',
      background: 'var(--paper-2)',
      borderTop: '1px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 12 }}>§ Voice Samples · 15 Pieces</div>
            <h2 className="display" style={{ fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
              The <em>portfolio.</em>
            </h2>
          </div>
          <div style={{ maxWidth: 380, color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic' }}>
            Press play on any piece. The waveform is live — drag along it to listen anywhere in the recording.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 40 }}>
          {CATEGORIES.map(cat => {
            const active = cat === activeCat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="mono"
                style={{
                  padding: '10px 16px',
                  border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 50 }}>
          <div>
            <div className="mono" style={{ color: 'var(--ink-3)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--rule)' }}>
              Index — {filtered.length} pieces
            </div>
            <div style={{ maxHeight: 600, overflowY: 'auto' }}>
              {filtered.map((t, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '14px 12px',
                      background: active ? 'var(--paper-3)' : 'transparent',
                      border: 'none', borderBottom: '1px solid var(--rule)',
                      cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', flexDirection: 'column', gap: 4,
                      borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span className="display" style={{
                        fontSize: 16, lineHeight: 1.2,
                        fontWeight: active ? 500 : 400,
                        color: active ? 'var(--ink)' : 'var(--ink-2)',
                      }}>
                        {t.title}
                      </span>
                      <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 10, flexShrink: 0 }}>
                        {t.duration}
                      </span>
                    </div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>
                      {t.category}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={track.id + '-' + playerStyle}
            className="anim-up-sm"
            style={{
              background: 'var(--paper)',
              padding: '40px 44px',
              border: '1px solid var(--rule)',
            }}
          >
            <Player track={track} idx={activeIdx} total={filtered.length} style={playerStyle} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// RANGE (formerly Languages) — Tamil only, focus on registers
// ------------------------------------------------------------
function Range() {
  const registers = [
    { name: "Children's", kicker: 'Gentle · warm · playful', body: 'The bedtime voice — unhurried, soft at the edges, with room for mischief. Best suited to picture books, audio stories, and children\'s radio.' },
    { name: 'Literary', kicker: 'Considered · lyrical · precise', body: 'A register built for Tamil literature and audiobook narration. Careful with meter, comfortable with long sentences and felt silence.' },
    { name: 'Commercial', kicker: 'Bright · inviting · grounded', body: 'Everyday Tamil for retail, wellness, service and festive spots. Trust-building, never rushed, always in the local idiom.' },
    { name: 'Documentary', kicker: 'Observational · slow · reflective', body: 'For films and audio guides on craft, culture and place. The voice steps back so the subject can breathe.' },
    { name: 'Character', kicker: 'A range of voices', body: 'Grandmothers, neighbours, market sellers, temple priestesses — shaped from a long life of listening to how Tamil is actually spoken.' },
    { name: 'Devotional', kicker: 'Thiruppavai · bhajan cadence', body: 'Recitation rooted in a household practice. Andal, Subramanya Bharati, and the rhythms of early-morning worship.' },
  ];
  return (
    <section id="range" style={{ padding: '120px 40px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 14 }}>§ Range</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
            One language,<br/><em>many registers.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 360, color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic' }}>
          Every piece of work asks for a different Tamil. Here are the registers I work in most.
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        borderTop: '1px solid var(--rule)', borderLeft: '1px solid var(--rule)',
      }}>
        {registers.map((r, i) => (
          <div key={r.name} style={{
            padding: '34px 30px',
            borderRight: '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
          }}>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 10 }}>0{i + 1}</div>
            <h3 className="display" style={{ fontSize: 30, margin: '0 0 4px 0', fontWeight: 500 }}>{r.name}</h3>
            <div className="mono" style={{ color: 'var(--ink-3)', marginBottom: 14 }}>{r.kicker}</div>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// PLATFORMS — where her work has appeared / is available
// ------------------------------------------------------------
function Platforms() {
  const platforms = [
    { name: 'Storytel India', kind: 'Audiobook platform', note: 'Tamil children\'s titles' },
    { name: 'Audible', kind: 'Audiobook platform', note: 'Literary narration' },
    { name: 'Kuzhanthai Kadhaigal', kind: 'Podcast · Tamil', note: 'Weekly story contributor' },
    { name: 'Sun Radio', kind: 'Broadcast', note: 'Commercial spots' },
    { name: 'Pratham Books · StoryWeaver', kind: "Children's publisher", note: 'Read-aloud audio' },
    { name: 'YouTube — Tamizh Kadhai Neram', kind: 'Channel', note: 'Children\'s series' },
    { name: 'Spotify', kind: 'Streaming', note: 'Devotional recordings' },
    { name: 'Private commissions', kind: 'Direct clients', note: 'Corporate, documentary, IVR' },
  ];

  return (
    <section id="platforms" style={{
      padding: '120px 40px', background: 'var(--paper-2)',
      borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 14 }}>§ Platforms & Publications</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Where her voice <em>has travelled.</em>
            </h2>
          </div>
          <div style={{ maxWidth: 340, color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic' }}>
            A growing list. Add your platform to it — she takes new commissions throughout the year.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--rule)',
        }}>
          {platforms.map((p, i) => (
            <div key={p.name} style={{
              padding: '26px 30px',
              borderBottom: '1px solid var(--rule)',
              borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none',
              display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 20, alignItems: 'baseline',
            }}>
              <span className="mono" style={{ color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="display" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.1 }}>{p.name}</div>
                <div className="mono" style={{ color: 'var(--ink-3)', marginTop: 6 }}>{p.kind}</div>
              </div>
              <span style={{ color: 'var(--ink-2)', fontSize: 14, fontStyle: 'italic', textAlign: 'right' }}>{p.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// TESTIMONIALS — customer reviews, with an "add your own" form
// ------------------------------------------------------------
const SEED_TESTIMONIALS = [
  { name: 'Priya Ravindran', role: 'Children\'s publisher, Chennai', stars: 5, body: 'We sent her a manuscript on Thursday and had a full recording by Monday. She treats each story like it belongs to her — the care is audible.' },
  { name: 'Karthik Subramanian', role: 'Documentary producer', stars: 5, body: 'Her Tamil narration has a weight to it that our film really needed. Unhurried. Observational. The takes came in remarkably clean.' },
  { name: 'Anitha S.', role: 'Audiobook editor', stars: 5, body: 'Twelve hours of fiction, distinct characters throughout, and not a single misread of a long Tamil compound word. We will work with her again.' },
  { name: 'Rajesh Kumar', role: 'Brand manager, wellness', stars: 4, body: 'Warm, grandmotherly, trustworthy — exactly what our 30-second spot asked for. She took direction well and gave us three useable variants.' },
  { name: 'Meenakshi Iyer', role: 'Mother of two', stars: 5, body: 'My children ask for "the Alarmel paatti story" every night now. I cannot think of higher praise than that.' },
];

function Stars({ n, size = 14 }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
          <path d="M10 1.5l2.472 5.5 5.528.8-4 3.9.944 5.5L10 14.5l-4.944 2.7L6 11.7 2 7.8l5.528-.8z"
            fill={i <= n ? 'var(--accent)' : 'transparent'}
            stroke="var(--accent)" strokeWidth="1"/>
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const [reviews, setReviews] = React.useState(SEED_TESTIMONIALS);
  const [form, setForm] = React.useState({ name: '', role: '', body: '', stars: 5 });
  const [showForm, setShowForm] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.body.trim()) return;
    setReviews(r => [{ ...form }, ...r]);
    setSubmitted(true);
    setForm({ name: '', role: '', body: '', stars: 5 });
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 2000);
  };

  return (
    <section id="testimonials" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 14 }}>§ From those she's worked with</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Kind words, <em>honestly given.</em>
            </h2>
          </div>
          <button
            onClick={() => setShowForm(s => !s)}
            className="mono"
            style={{
              padding: '12px 20px',
              background: showForm ? 'transparent' : 'var(--ink)',
              color: showForm ? 'var(--ink)' : 'var(--paper)',
              border: '1px solid var(--ink)', cursor: 'pointer',
            }}
          >
            {showForm ? '× Close' : '+ Leave a review'}
          </button>
        </div>

        {/* review form */}
        {showForm && (
          <div className="anim-up-sm" style={{
            background: 'var(--paper-2)', padding: 30,
            border: '1px solid var(--rule)', marginBottom: 40,
          }}>
            {submitted ? (
              <div className="anim-up-sm" style={{ padding: 20, textAlign: 'center' }}>
                <div className="mono" style={{ color: 'var(--accent)', marginBottom: 8 }}>✓ Thank you</div>
                <div className="display" style={{ fontSize: 24, fontStyle: 'italic' }}>Your review has been added.</div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <label>
                  <span className="mono" style={{ color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Your name</span>
                  <input value={form.name} onChange={handle('name')} required
                    style={{ width: '100%', padding: '10px 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink-3)', fontFamily: 'Spectral, serif', fontSize: 17, outline: 'none' }} />
                </label>
                <label>
                  <span className="mono" style={{ color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Role / context (optional)</span>
                  <input value={form.role} onChange={handle('role')}
                    style={{ width: '100%', padding: '10px 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink-3)', fontFamily: 'Spectral, serif', fontSize: 17, outline: 'none' }} />
                </label>
                <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ color: 'var(--ink-3)' }}>Rating</span>
                  {[1,2,3,4,5].map(i => (
                    <button key={i} type="button" onClick={() => setForm(f => ({ ...f, stars: i }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                      <svg width="22" height="22" viewBox="0 0 20 20">
                        <path d="M10 1.5l2.472 5.5 5.528.8-4 3.9.944 5.5L10 14.5l-4.944 2.7L6 11.7 2 7.8l5.528-.8z"
                          fill={i <= form.stars ? 'var(--accent)' : 'transparent'}
                          stroke="var(--accent)" strokeWidth="1.2"/>
                      </svg>
                    </button>
                  ))}
                </div>
                <label style={{ gridColumn: 'span 2' }}>
                  <span className="mono" style={{ color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Your review</span>
                  <textarea value={form.body} onChange={handle('body')} required rows={4}
                    placeholder="Tell others what it was like working with her…"
                    style={{ width: '100%', padding: '10px 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink-3)', fontFamily: 'Spectral, serif', fontSize: 17, outline: 'none', resize: 'vertical' }} />
                </label>
                <button type="submit" className="submit-btn" style={{
                  gridColumn: 'span 2', justifySelf: 'start',
                  padding: '14px 28px', background: 'var(--accent)', color: 'var(--paper)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  transition: 'transform 0.15s',
                }}>Publish review →</button>
              </form>
            )}
          </div>
        )}

        {/* review grid — magazine columns */}
        <div style={{
          columnCount: 2, columnGap: 40,
        }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              breakInside: 'avoid', marginBottom: 28,
              padding: '28px 30px',
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
            }}>
              <Stars n={r.stars} />
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink)', fontStyle: 'italic', margin: '14px 0 20px 0' }}>
                “{r.body}”
              </p>
              <div className="display" style={{ fontSize: 18, fontWeight: 500 }}>{r.name}</div>
              {r.role && <div className="mono" style={{ color: 'var(--ink-3)', marginTop: 4 }}>{r.role}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// CONTACT
// ------------------------------------------------------------
function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', project: '', message: '' });
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" style={{
      padding: '120px 40px', background: 'var(--ink)', color: 'var(--paper)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>
          <div>
            <div className="mono" style={{ color: '#E8B987', marginBottom: 14 }}>§ Reach out</div>
            <h2 className="display" style={{
              fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 0.95, margin: 0,
              fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--paper)',
            }}>
              Tell me<br/>about your <em style={{ color: '#E8B987' }}>project.</em>
            </h2>
            <p style={{ color: 'var(--paper-3)', fontSize: 18, lineHeight: 1.65, marginTop: 30, fontStyle: 'italic', opacity: 0.9 }}>
              For Tamil audiobooks, children's audio, brand films, documentary narration and commercial reads. I'll reply within two working days.
            </p>

            <div style={{ marginTop: 50, borderTop: '1px solid rgba(245,239,227,0.2)', paddingTop: 30 }}>
              <div className="mono" style={{ color: 'var(--paper-3)', marginBottom: 18, opacity: 0.7 }}>Direct</div>
              {[
                ['Email', 'alarmel@example.com'],
                ['Phone', '+91 ·· ····· ····'],
                ['WhatsApp', '+91 ·· ····· ····'],
                ['Studio', 'Chennai · Tamil Nadu · India'],
                ['Hours', 'Mon–Sat · 9am – 5pm IST'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '14px 0', borderBottom: '1px solid rgba(245,239,227,0.15)',
                }}>
                  <span className="mono" style={{ color: 'var(--paper-3)', opacity: 0.7 }}>{k}</span>
                  <span style={{ color: 'var(--paper)', fontStyle: 'italic' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 14 }}>
              {['Instagram', 'LinkedIn', 'YouTube', 'Spotify'].map(s => (
                <a key={s} href="#" className="mono" style={{
                  padding: '10px 14px', border: '1px solid rgba(245,239,227,0.3)',
                  color: 'var(--paper-3)', textDecoration: 'none',
                }}>{s} ↗</a>
              ))}
            </div>
          </div>

          <div>
            {!submitted ? (
              <form onSubmit={submit} style={{
                background: 'rgba(245,239,227,0.04)', padding: 40,
                border: '1px solid rgba(245,239,227,0.2)',
                display: 'flex', flexDirection: 'column', gap: 22,
              }}>
                {[
                  { k: 'name', label: 'Your name' },
                  { k: 'email', label: 'Email', type: 'email' },
                  { k: 'project', label: "Project — e.g. Tamil children's audiobook" },
                ].map(F => (
                  <label key={F.k} style={{ display: 'block' }}>
                    <span className="mono" style={{ color: 'var(--paper-3)', display: 'block', marginBottom: 6, opacity: 0.7 }}>{F.label}</span>
                    <input
                      type={F.type || 'text'}
                      value={form[F.k]} onChange={handle(F.k)} required
                      style={{
                        width: '100%', padding: '12px 0', background: 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(245,239,227,0.3)',
                        fontFamily: 'Spectral, serif', fontSize: 18, color: 'var(--paper)',
                        outline: 'none',
                      }}
                    />
                  </label>
                ))}
                <label>
                  <span className="mono" style={{ color: 'var(--paper-3)', display: 'block', marginBottom: 6, opacity: 0.7 }}>Brief</span>
                  <textarea
                    value={form.message} onChange={handle('message')} required rows={5}
                    placeholder="Length, register, deadline…"
                    style={{
                      width: '100%', padding: '12px 0', background: 'transparent',
                      border: 'none', borderBottom: '1px solid rgba(245,239,227,0.3)',
                      fontFamily: 'Spectral, serif', fontSize: 18, color: 'var(--paper)',
                      outline: 'none', resize: 'vertical',
                    }}
                  />
                </label>
                <button type="submit" className="submit-btn" style={{
                  marginTop: 14, padding: '16px 30px',
                  background: 'var(--accent)', color: 'var(--paper)',
                  border: 'none', cursor: 'pointer', alignSelf: 'flex-start',
                  fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  transition: 'transform 0.15s',
                }}>
                  Send enquiry →
                </button>
              </form>
            ) : (
              <div className="anim-up" style={{
                background: 'var(--accent)', color: 'var(--paper)',
                padding: 60, display: 'flex', flexDirection: 'column', gap: 18,
                justifyContent: 'center',
              }}>
                <div className="mono" style={{ color: 'var(--paper)' }}>✓ Sent</div>
                <h3 className="display" style={{ fontSize: 44, margin: 0, fontWeight: 500, lineHeight: 1.05 }}>
                  Thank you, {form.name || 'friend'}.<br/>
                  <em>I will write back soon.</em>
                </h3>
                <p style={{ color: 'var(--paper)', opacity: 0.9, fontSize: 16, lineHeight: 1.6 }}>
                  In the meantime, feel free to keep listening to the portfolio. Most replies come within two working days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper-3)', padding: '30px 40px', borderTop: '1px solid rgba(245,239,227,0.15)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 20 }}>
        <div className="display" style={{ fontSize: 24, fontStyle: 'italic', color: 'var(--paper)' }}>Alarmel</div>
        <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>© 2026 · Tamil voice artist · Chennai · India</div>
      </div>
    </footer>
  );
}

export { Nav, Hero, Marquee, About, VoiceSamples, Range, Platforms, Testimonials, Contact, Footer };
