// ============================================================
// Sections.jsx — Hero, About, Voices, Testimonials, FAQ, Contact
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
    { href: '#voices', label: 'Portfolio' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className="nav-wrap" style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--paper)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--rule)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 10,
    }}>
      <a href="#top" style={{ textDecoration: 'none', color: 'var(--ink)', display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="display" style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>Alarmel Mangai</span>
        <span className="mono" style={{ color: 'var(--ink-3)' }}>Voice Artist · Tamil</span>
      </a>
      <div className="nav-links" style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
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
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="hero-grid"
      style={{
        padding: '36px var(--section-px) 52px',
        maxWidth: 1280, margin: '0 auto',
      }}
    >
      <div>
        <div className="anim-up-sm">
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 18 }}>
            Chennai · தமிழ் Voice Artist
          </div>
        </div>

        <h1
          id="hero-heading"
          className="display anim-up d1"
          style={{
            fontSize: 'clamp(44px, 7vw, 100px)',
            lineHeight: 0.95,
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
            marginTop: 22, fontSize: 'var(--fs-body-lg)', lineHeight: 1.5,
            color: 'var(--ink-2)', maxWidth: 520,
            fontStyle: 'italic',
          }}
        >
          A Tamil voice shaped by a lifetime of reading, reciting, and listening. I record audiobooks, children's stories, documentary and commercial work from a studio in Chennai.
        </p>

        <div
          className="anim-up-sm d5"
          style={{ marginTop: 26, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a href="#voices" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 20px', background: 'var(--ink)', color: 'var(--paper)',
            textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-mono)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span style={{ fontSize: 'var(--fs-caption)' }}>▶</span> Listen to the portfolio
          </a>
          <a href="#contact" className="mono" style={{ color: 'var(--ink-2)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Get in touch →
          </a>
        </div>
      </div>

      <div className="anim-scale" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -10,
          border: '1px solid var(--rule)',
          borderRadius: 0, pointerEvents: 'none',
        }} />
        <img
          src="assets/alarmel.jpg"
          alt="Alarmel Mangai, Tamil voice artist and audiobook narrator, photographed at home in Chennai"
          loading="eager"
          width="520"
          height="650"
          style={{
            width: '100%', height: 'auto', display: 'block',
            maxHeight: '62vh', objectFit: 'cover',
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />
        <div style={{
          marginTop: 10, fontStyle: 'italic', fontSize: 'var(--fs-caption)',
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
      padding: '16px 0', overflow: 'hidden', background: 'var(--paper-2)',
    }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap', width: 'fit-content' }}>
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="display" style={{
            fontSize: 'var(--fs-marquee)', fontStyle: t === '·' ? 'normal' : 'italic',
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
    <section id="about" aria-labelledby="about-heading" className="section-wrap">
      <div className="two-col-about" style={{ marginBottom: 36 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 10 }}>§ About</div>
          <h2 id="about-heading" className="display" style={{
            fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1, margin: 0, fontWeight: 500,
            letterSpacing: '-0.02em',
          }}>
            A craft,<br/><em>long in the ear.</em>
          </h2>
        </div>
        <div style={{ paddingTop: 6 }}>
          <p style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-2)', margin: 0 }}>
            <span className="display" style={{
              float: 'left', fontSize: 'clamp(52px, 7vw, 72px)', lineHeight: 0.86,
              padding: '4px 10px 0 0', color: 'var(--accent)', fontWeight: 500,
            }}>I</span>
            loved the sound of a story read aloud long before I recorded one — the pause before a surprise, the lilt of a well-placed word, the way a child leans in when a voice softens. Voice acting is the work I came to follow that love into, studied formally so affection could be met by craft.
          </p>
          <p style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-2)', marginTop: 14 }}>
            My days now begin in a small quiet room with a microphone. I record in Tamil — children's stories mostly, but also audiobooks, documentary narration, commercials, character pieces and devotional recitation. I work slowly, listen closely, and never submit a take I wouldn't listen to twice.
          </p>
          <p style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-2)', marginTop: 14, fontStyle: 'italic' }}>
            (Before this life in sound, I spent a long, steady career in Indian banking. The patience it asked of me turned out to be the same the booth asks now.)
          </p>
          <p style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-2)', marginTop: 14 }}>
            Recent work includes the audiobook narration of Jeyamohan's <em>Yaanai Doctor</em> and <em>Kattidam Sollum Kadhai</em>, commercials for Thangamayil Jewellery, the <em>Smart Salem</em> documentary, and a full recitation of the <em>Thirukural</em>.
          </p>
        </div>
      </div>

      {/* personal — interests */}
      <div className="two-col-even" style={{ marginTop: 44 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 10 }}>Aside from the booth</div>
          <h3 className="display" style={{ fontSize: 'var(--fs-h3)', lineHeight: 1.1, margin: 0, fontWeight: 500 }}>
            A life arranged around <em>literature, devotion, and the body in motion.</em>
          </h3>
        </div>
        <div style={{ color: 'var(--ink-2)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)' }}>
          My readings are shaped by the things I love outside the studio: Tamil literature read slowly; bhajans sung in the household at dawn; yoga, aerobics and strength work that keep the breath in order; weekend cooking; and grandchildren whose afternoons I keep for myself.
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
    <section id="voices" aria-labelledby="voices-heading" className="section-wrap--full" style={{
      background: 'var(--paper-2)',
      borderTop: '1px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: 8 }}>§ Voice Samples · {TRACKS.length} Pieces</div>
            <h2 id="voices-heading" className="display" style={{ fontSize: 'clamp(32px, 4.6vw, 60px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
              The <em>portfolio.</em>
            </h2>
          </div>
          <div style={{ maxWidth: 340, color: 'var(--ink-2)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.5, fontStyle: 'italic' }}>
            Press play on any piece. The waveform is live — drag to scrub.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {CATEGORIES.map(cat => {
            const active = cat === activeCat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="mono"
                style={{
                  padding: '8px 14px',
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

        <div className="voices-grid">
          <div>
            <div className="mono" style={{ color: 'var(--ink-3)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--rule)' }}>
              Index — {filtered.length} pieces
            </div>
            <div style={{ maxHeight: 460, overflowY: 'auto' }}>
              {filtered.map((t, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '10px 10px',
                      background: active ? 'var(--paper-3)' : 'transparent',
                      border: 'none', borderBottom: '1px solid var(--rule)',
                      cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', flexDirection: 'column', gap: 3,
                      borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span className="display" style={{
                        fontSize: 'var(--fs-body-sm)', lineHeight: 1.2,
                        fontWeight: active ? 500 : 400,
                        color: active ? 'var(--ink)' : 'var(--ink-2)',
                      }}>
                        {t.title}
                      </span>
                      <span className="mono" style={{ color: 'var(--ink-3)', flexShrink: 0 }}>
                        {t.duration}
                      </span>
                    </div>
                    <div className="mono" style={{ color: 'var(--ink-3)' }}>
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
              padding: '28px 30px',
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
// TESTIMONIALS — customer reviews, with an "add your own" form
// ------------------------------------------------------------
const TESTIMONIALS = [
  { name: 'Priya Ravindran', role: 'Children\'s publisher, Chennai', stars: 5, body: 'We sent her a manuscript on Thursday and had a full recording by Monday. She treats each story like it belongs to her — the care is audible.' },
  { name: 'Karthik Subramanian', role: 'Documentary producer', stars: 5, body: 'Her Tamil narration has a weight to it that our film really needed. Unhurried. Observational. The takes came in remarkably clean.' },
  { name: 'Rajesh Kumar', role: 'Brand manager, wellness', stars: 4, body: 'Warm, grandmotherly, trustworthy — exactly what our 30-second spot asked for. She took direction well and gave us three useable variants.' },
  { name: 'Meenakshi Iyer', role: 'Mother of two', stars: 5, body: 'My children ask for "the Alarmel paatti story" every night. That is the review.' },
];

function Stars({ n, size = 13 }) {
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
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section-wrap">
      <div style={{ marginBottom: 24 }}>
        <div className="mono" style={{ color: 'var(--accent)', marginBottom: 10 }}>§ From people I've worked with</div>
        <h2 id="testimonials-heading" className="display" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>
          Notes from <em>the booth.</em>
        </h2>
      </div>

      <div className="testimonials-cols">
        {TESTIMONIALS.map((r, i) => (
          <div key={i} style={{
            breakInside: 'avoid', marginBottom: 16,
            padding: '18px 22px',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
          }}>
            <Stars n={r.stars} />
            <p style={{ fontSize: 'var(--fs-body)', lineHeight: 1.55, color: 'var(--ink)', fontStyle: 'italic', margin: '10px 0 14px 0' }}>
              “{r.body}”
            </p>
            <div className="display" style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 500 }}>{r.name}</div>
            {r.role && <div className="mono" style={{ color: 'var(--ink-3)', marginTop: 3 }}>{r.role}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// CONTACT
// ------------------------------------------------------------
// Light obfuscation: email + phone are assembled at runtime so simple
// scrapers grepping for "@gmail.com" or contiguous phone digits miss them.
// Determined scrapers that execute JS still see the assembled values.
const EMAIL_PARTS = ['alarmel', 'gmail.com'];
const PHONE_PARTS = ['98408', '63730'];
function Contact() {
  const email = EMAIL_PARTS.join('@');
  const phoneDisplay = '+91 ' + PHONE_PARTS.join(' ');
  const phoneIntl = '91' + PHONE_PARTS.join('');
  const whatsappHref = 'https://wa.me/' + phoneIntl + '?text=' +
    encodeURIComponent("Hi Alarmel, I'd like to reach out about voice-over work.");
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-wrap--full" style={{
      background: 'var(--ink)', color: 'var(--paper)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="mono" style={{ color: '#E8B987', marginBottom: 10 }}>§ Reach out</div>
        <h2 id="contact-heading" className="display" style={{
          fontSize: 'clamp(32px, 4.6vw, 60px)', lineHeight: 0.95, margin: 0,
          fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--paper)',
        }}>
          Send a <em style={{ color: '#E8B987' }}>brief.</em>
        </h2>
        <p style={{ color: 'var(--paper-3)', fontSize: 'var(--fs-body)', lineHeight: 1.55, marginTop: 18, fontStyle: 'italic', opacity: 0.9 }}>
          For Tamil audiobooks, children's audio, brand films, documentary narration and commercial reads. I'll reply within two working days.
        </p>

        <div style={{ marginTop: 28, borderTop: '1px solid rgba(245,239,227,0.2)', paddingTop: 18 }}>
          <div className="mono" style={{ color: 'var(--paper-3)', marginBottom: 10, opacity: 0.7 }}>Direct</div>
          {[
            ['Email', email, 'mailto:' + email],
            ['WhatsApp', phoneDisplay, whatsappHref],
            ['Studio', 'Chennai · Tamil Nadu · India'],
          ].map(([k, v, href]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid rgba(245,239,227,0.15)',
            }}>
              <span className="mono" style={{ color: 'var(--paper-3)', opacity: 0.7 }}>{k}</span>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{
                  color: 'var(--paper)', fontStyle: 'italic',
                  textDecoration: 'underline', textUnderlineOffset: 4,
                }}>{v} ↗</a>
              ) : (
                <span style={{ color: 'var(--paper)', fontStyle: 'italic' }}>{v}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/alarmel_voiceartist/' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alamelu-mangai-voice-artist/' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono" style={{
              padding: '8px 12px', border: '1px solid rgba(245,239,227,0.3)',
              color: 'var(--paper-3)', textDecoration: 'none',
            }}>{s.label} ↗</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FAQ — common questions (paired with FAQPage JSON-LD in index.html)
// ------------------------------------------------------------
function FAQ() {
  const faqs = [
    {
      q: 'What languages do you record in?',
      a: "Tamil — across literary, commercial, documentary, children's, character and devotional registers. Direction and correspondence can be in English or Tamil.",
    },
    {
      q: 'Do you take remote voiceover work?',
      a: 'Yes. I record from a home setup in Chennai and deliver broadcast-quality WAV or MP3 files — typically within two working days for short projects. Remote sessions across time zones by arrangement.',
    },
    {
      q: 'What kinds of projects do you take on?',
      a: "Tamil audiobooks, children's stories, audio drama, documentary narration, commercial spots, corporate films, IVR, devotional recitation, and dubbing for short-form and long-form media.",
    },
    {
      q: 'Do you narrate long-form audiobooks?',
      a: 'Yes. Full-length Tamil fiction and non-fiction, with distinct character voices, careful pacing, and clean, broadcast-ready takes. Prior titles are available on Storytel India and Audible.',
    },
    {
      q: 'Where are you based?',
      a: 'Chennai, Tamil Nadu, India. Remote clients worldwide by arrangement.',
    },
    {
      q: 'How do I commission a voiceover or request a demo?',
      a: 'Email the brief — length, register, deadline, and any reference voices — via the contact details on this site. Most enquiries receive a reply within two working days.',
    },
  ];

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-wrap">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 10 }}>§ Frequently asked</div>
          <h2 id="faq-heading" className="display" style={{
            fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1, margin: 0, fontWeight: 500, letterSpacing: '-0.02em',
          }}>
            Common <em>questions.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 320, color: 'var(--ink-2)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.5, fontStyle: 'italic' }}>
          The usual questions, answered.
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--rule)' }}>
        {faqs.map((f, i) => (
          <details key={i} style={{
            borderBottom: '1px solid var(--rule)',
            padding: '14px 4px',
          }}>
            <summary className="display" style={{
              fontSize: 'var(--fs-summary)', fontWeight: 500, cursor: 'pointer',
              listStyle: 'none', display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', gap: 16,
            }}>
              <span>{f.q}</span>
              <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 'var(--fs-caption)', flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ marginTop: 10, fontSize: 'var(--fs-body)', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 780 }}>
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper-3)', padding: '20px var(--section-px)', borderTop: '1px solid rgba(245,239,227,0.15)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
        <div className="display" style={{ fontSize: 20, fontStyle: 'italic', color: 'var(--paper)' }}>Alarmel Mangai</div>
        <div className="mono" style={{ opacity: 0.7 }}>© 2026 · Tamil voice artist · Chennai · India</div>
      </div>
    </footer>
  );
}

export { Nav, Hero, Marquee, About, VoiceSamples, Testimonials, FAQ, Contact, Footer };
