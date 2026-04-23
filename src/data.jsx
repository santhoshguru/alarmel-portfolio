import tracks from './tracks.json';

export const TRACKS = tracks;

const uniqueCategories = [];
for (const t of tracks) {
  if (!uniqueCategories.includes(t.category)) uniqueCategories.push(t.category);
}
export const CATEGORIES = ["All", ...uniqueCategories];
