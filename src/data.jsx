// Data: tracks + bio content (Tamil-focused)
export const TRACKS = [
  // Children stories in Tamil — the heart of the portfolio
  { id: 1, title: "மாயக் காட்டின் ரகசியம்", titleEn: "The Secret of the Magical Forest", category: "Children's Story", language: "Tamil", duration: "2:48", description: "A folk tale about a curious girl who discovers a hidden grove where every tree tells a story." },
  { id: 2, title: "சின்னக் காகம் கற்றுக் கொண்ட பாடம்", titleEn: "The Little Crow's Lesson", category: "Children's Story", language: "Tamil", duration: "3:12", description: "A retelling of the classic crow and pitcher tale — with warmth and gentle humour." },
  { id: 3, title: "தாத்தாவின் கதை பெட்டி", titleEn: "Grandfather's Box of Tales", category: "Children's Story", language: "Tamil", duration: "2:34", description: "Stories whispered on a verandah at dusk — fireflies, full moons, and wise elders." },
  { id: 4, title: "மழை நாள் சாகசம்", titleEn: "A Rainy Day Adventure", category: "Children's Story", language: "Tamil", duration: "3:05", description: "Two siblings, one paper boat, and a monsoon afternoon that turns into something magical." },
  { id: 5, title: "வண்ணத்துப்பூச்சியின் பயணம்", titleEn: "The Butterfly's Journey", category: "Children's Story", language: "Tamil", duration: "2:22", description: "A small butterfly's flight across a garden becomes a meditation on courage." },
  { id: 6, title: "புத்திசாலி அணில்", titleEn: "The Clever Squirrel", category: "Children's Story", language: "Tamil", duration: "2:55", description: "A trickster tale from the Panchatantra, voiced with mischief and affection." },
  { id: 7, title: "ஆலமரத்தின் கீழ்", titleEn: "Under the Banyan Tree", category: "Children's Story", language: "Tamil", duration: "3:30", description: "An elderly storyteller gathers village children for an evening of stories under an ancient banyan." },
  { id: 8, title: "சிறு குருவியின் கனவு", titleEn: "The Little Sparrow's Dream", category: "Children's Story", language: "Tamil", duration: "2:18", description: "A sparrow dreams of singing for the king — and learns the worth of her own voice." },

  // Demo reels — all Tamil
  { id: 9, title: "நீண்ட விவரிப்பு — Long-form Narration", titleEn: "Narration Demo", category: "Narration", language: "Tamil", duration: "2:40", description: "A measured, contemplative Tamil read suited to documentary, museum audio guides, and corporate films." },
  { id: 10, title: "விளம்பரம் — Wellness Brand", titleEn: "Commercial Demo", category: "Commercial", language: "Tamil", duration: "0:48", description: "A warm, trust-building 30-second read for a wellness brand. Conversational, knowing, unhurried." },
  { id: 11, title: "சில்லறை விளம்பரம்", titleEn: "Retail Commercial", category: "Commercial", language: "Tamil", duration: "0:52", description: "A festive, brisk Tamil retail spot. Bright, inviting, and grounded in the local idiom." },
  { id: 12, title: "ஒலி நூல் — புனைவு", titleEn: "Audiobook — Fiction", category: "Audiobook", language: "Tamil", duration: "3:18", description: "An excerpt from a literary Tamil novel — distinct character voices, careful pacing, intimate close-mic delivery." },
  { id: 13, title: "ஆவணப்படம் — காஞ்சிபுரம்", titleEn: "Documentary — Kanchipuram", category: "Documentary", language: "Tamil", duration: "2:04", description: "A reflective documentary read on the textiles of Kanchipuram. Slow, observational, lyrical." },
  { id: 14, title: "கதாபாத்திரத் தொகுப்பு", titleEn: "Character Reel", category: "Character", language: "Tamil", duration: "1:55", description: "A range piece — a stern grandmother, a mischievous neighbour, a market vendor, a temple priestess." },
  { id: 15, title: "திருப்பாவை — பாசுரம்", titleEn: "Devotional Recitation", category: "Devotional", language: "Tamil", duration: "2:36", description: "A passage from the Thiruppavai, recited in the cadence of the bhajan tradition." },
];

TRACKS.forEach((t, i) => { t.seed = (i + 1) * 17.3; });

export const CATEGORIES = ["All", "Children's Story", "Narration", "Commercial", "Audiobook", "Documentary", "Character", "Devotional"];
