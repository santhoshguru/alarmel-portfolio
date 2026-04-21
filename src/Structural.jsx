// ============================================================
// Structural.jsx — alternate layouts for Hero + shared structural bits.
// (Not wired into App.jsx — retained for future template variants.)
import React from 'react';
// ============================================================
// Editorial template uses the standard <Hero> from Sections.jsx.
// Split  template uses <HeroSplit> + a <PinnedPortrait> rendered at App root.
// Stage  template uses the standard <Hero> but wraps each section with
//        scroll-snap (handled via [data-template] CSS in Portfolio.html).
// Poster template uses <HeroPoster> — dramatic overlapping composition.
// All templates also render <PageIndicator> as a floating right-side rail.
// ============================================================

// ---------- HERO: SPLIT (portrait pinned separately via PinnedPortrait) ----------
function HeroSplit() {
  return (
    <section id="top" style={{
      padding: '100px 40px 120px',
      minHeight: '82vh',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 640 }}>
        <div className="anim-up-sm">
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: 26 }}>
            ── Issue Nº 01 · Chennai · தமிழ் Voice Artist
          </div>
        </div>

        <h1 className="display anim-up d1" style={{
          fontSize: 'clamp(52px, 7.5vw, 108px)', lineHeight: 0.92,
          margin: 0, letterSpacing: '-0.025em',
        }}>
          Stories,<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>told aloud</span><br/>
          in Tamil.
        </h1>

        <p className="anim-fade d4" style={{
          marginTop: 36, fontSize: 20, lineHeight: 1.55,
          color: 'var(--ink-2)', maxWidth: 540, fontStyle: 'italic',
        }}>
          A voice shaped by a lifetime of reading, reciting, and listening. I record children's stories, audiobooks, documentary narration, commercial spots and devotional recitations — with the pacing, warmth and care the Tamil language asks for.
        </p>

        <div className="anim-up-sm d5" style={{ marginTop: 40, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
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
    </section>
  );
}

// ---------- PINNED PORTRAIT: fills right 44vw for split template ----------
function PinnedPortrait() {
  const [parallax, setParallax] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const p = Math.min(60, window.scrollY * 0.06);
      setParallax(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pinned-portrait" aria-hidden>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        overflow: 'hidden',
      }}>
        <img
          src="assets/alarmel.jpg"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            transform: `translateY(${-parallax}px) scale(1.08)`,
            transition: 'transform 0.1s linear',
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />
        {/* editorial plate label */}
        <div style={{
          position: 'absolute', top: 24, left: 24,
          fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--paper)',
          letterSpacing: '0.2em', mixBlendMode: 'difference',
        }}>
          PLATE I · ALARMEL · CHENNAI 2026
        </div>
        {/* bottom rule */}
        <div style={{
          position: 'absolute', bottom: 24, left: 24, right: 24,
          borderBottom: '1px solid rgba(255,255,255,0.5)',
          paddingBottom: 10,
          color: 'var(--paper)',
          fontSize: 13, fontStyle: 'italic',
          mixBlendMode: 'difference',
        }}>
          photographed at home · March 2026
        </div>
      </div>
    </div>
  );
}

// ---------- HERO: POSTER (dramatic full-bleed) ----------
function HeroPoster() {
  return (
    <section id="top" style={{
      position: 'relative', minHeight: '100vh',
      padding: 0, overflow: 'hidden',
    }}>
      {/* the portrait fills the right 55% */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '55%',
      }}>
        <img
          src="assets/alarmel.jpg"
          alt="Alarmel"
          className="anim-scale"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />
      </div>

      {/* meta bar top */}
      <div style={{
        position: 'absolute', top: 24, left: 40, right: 40,
        display: 'flex', justifyContent: 'space-between',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <span className="mono" style={{ color: 'var(--ink-2)' }}>ISSUE Nº 01</span>
        <span className="mono" style={{ color: 'var(--paper)', mixBlendMode: 'difference' }}>PLATE I · ALARMEL</span>
      </div>

      {/* overlapping headline — crosses over the portrait */}
      <div style={{
        position: 'absolute',
        top: '50%', left: 40,
        transform: 'translateY(-50%)',
        width: '80%',
        zIndex: 2, pointerEvents: 'none',
      }}>
        <h1 className="display anim-up d1" style={{
          fontSize: 'clamp(72px, 13vw, 220px)',
          lineHeight: 0.85,
          margin: 0,
          letterSpacing: '-0.035em',
          color: 'var(--ink)',
        }}>
          <span style={{ display: 'block' }}>Stories,</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--accent)', marginLeft: '6vw' }}>
            told aloud
          </span>
          <span style={{ display: 'block', color: 'var(--paper)', mixBlendMode: 'difference' }}>
            in Tamil.
          </span>
        </h1>
      </div>

      {/* footer strip */}
      <div style={{
        position: 'absolute', bottom: 32, left: 40, right: 40,
        display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60,
        zIndex: 3,
      }}>
        <p className="anim-fade d4" style={{
          margin: 0, fontSize: 18, lineHeight: 1.55,
          color: 'var(--ink-2)', fontStyle: 'italic', maxWidth: 520,
        }}>
          A voice shaped by a lifetime of reading, reciting, and listening. Children's stories, audiobooks, narration, and devotional work — in the pacing the Tamil language asks for.
        </p>
        <div className="anim-up-sm d5" style={{ display: 'flex', gap: 14, alignItems: 'flex-end', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <a href="#voices" style={{
            padding: '14px 22px', background: 'var(--ink)', color: 'var(--paper)',
            textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>▶ Listen</a>
          <a href="#contact" className="mono" style={{
            padding: '14px 18px', color: 'var(--paper)', textDecoration: 'none',
            mixBlendMode: 'difference',
            border: '1px solid currentColor',
          }}>Get in touch ↗</a>
        </div>
      </div>
    </section>
  );
}

// ---------- PAGE INDICATOR: floating right rail with numbered dots ----------
function PageIndicator({ sections }) {
  const [active, setActive] = React.useState(0);
  const [hoverIdx, setHoverIdx] = React.useState(-1);

  React.useEffect(() => {
    let raf;
    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let bestIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= y) bestIdx = i;
      }
      setActive(bestIdx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <div
      className="page-indicator"
      style={{
        position: 'fixed',
        right: 24, top: '50%', transform: 'translateY(-50%)',
        zIndex: 45,
        display: 'flex', flexDirection: 'column', gap: 16,
        pointerEvents: 'auto',
      }}
    >
      {sections.map((s, i) => {
        const isActive = i === active;
        const showLabel = hoverIdx === i || isActive;
        return (
          <a
            key={s.id}
            href={'#' + s.id}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', color: 'var(--ink-2)',
              justifyContent: 'flex-end',
            }}
            aria-label={s.label}
          >
            <span
              className="mono"
              style={{
                fontSize: 9,
                color: 'var(--ink)',
                opacity: showLabel ? 1 : 0,
                transform: showLabel ? 'translateX(0)' : 'translateX(6px)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                background: 'var(--paper)',
                padding: '4px 8px',
                border: '1px solid var(--rule)',
              }}
            >
              {String(i + 1).padStart(2, '0')} · {s.label}
            </span>
            <span style={{
              width: isActive ? 22 : 10,
              height: 2,
              background: isActive ? 'var(--accent)' : 'var(--ink-3)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }} />
          </a>
        );
      })}
    </div>
  );
}

// ---------- CUSTOM CURSOR (for rich-interaction templates) ----------
function Cursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [hovering, setHovering] = React.useState(false);
  React.useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const t = e.target;
      const isInteractive = t.closest('a, button, input, textarea, [role="button"]');
      setHovering(!!isInteractive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);
  return (
    <>
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y,
        width: hovering ? 44 : 14, height: hovering ? 44 : 14,
        marginLeft: hovering ? -22 : -7, marginTop: hovering ? -22 : -7,
        border: '1.5px solid var(--accent)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.2s',
        background: hovering ? 'rgba(168,53,31,0.1)' : 'transparent',
        mixBlendMode: 'difference',
      }} />
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y,
        width: 4, height: 4, marginLeft: -2, marginTop: -2,
        background: 'var(--accent)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
      }} />
    </>
  );
}

export { HeroSplit, PinnedPortrait, HeroPoster, PageIndicator, Cursor };
