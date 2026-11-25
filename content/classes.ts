// Class styles, levels, teachers, rooms and term fees. Validated by tests/content.test.ts.
// IDs are stable and URL-safe: they appear in anchors (/classes/#ballet), timetable IDs and filters.

export type LevelId = 'petite' | 'junior' | 'inter' | 'senior' | 'adult';
export type StyleId = 'ballet' | 'contemporary' | 'jazz' | 'tap' | 'hip-hop' | 'musical-theatre';
export type RoomId = 'mirror-room' | 'sprung-box';

export interface Level {
  id: LevelId;
  name: string;
  /** Youngest age in years. */
  minAge: number;
  /** Oldest age in years, or null when open-ended (adults). */
  maxAge: number | null;
  /** Allowed class lengths in minutes; every timetable entry must use one of these. */
  durations: number[];
  /** Ballet/contemporary leotard colour; hex null means "own choice". */
  leotard: { name: string; hex: string | null };
  blurb: string;
}

export interface Style {
  id: StyleId;
  name: string;
  tagline: string;
  description: string;
  /** Who the style suits, one line. */
  suits: string;
  /** Tempo in beats per minute for the count strip (40–180). */
  bpm: number;
  signatureStep: string;
  /** Level IDs this style is offered at. */
  levels: LevelId[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  /** Style IDs this teacher teaches; timetable entries are checked against it. */
  styles: StyleId[];
  bio: string;
}

export interface Room {
  id: RoomId;
  name: string;
  short: string;
  description: string;
}

export const levels: Level[] = [
  { id: 'petite', name: 'Petite', minAge: 3, maxAge: 5, durations: [30], leotard: { name: 'Tulle Pink', hex: '#F4C9D3' },
    blurb: 'Story-led classes with props, music games and first steps in ballet, tap and hip-hop.' },
  { id: 'junior', name: 'Junior', minAge: 6, maxAge: 8, durations: [45], leotard: { name: 'Lilac', hex: '#C9B2E8' },
    blurb: 'Real technique, taught with play: posture, rhythm and the first full routines.' },
  { id: 'inter', name: 'Intermediate', minAge: 9, maxAge: 12, durations: [60], leotard: { name: 'Violet', hex: '#7E57C2' },
    blurb: 'Stronger technique, longer phrases and a first taste of choreographing.' },
  { id: 'senior', name: 'Senior', minAge: 13, maxAge: 18, durations: [60, 90], leotard: { name: 'Plum', hex: '#4A1E5C' },
    blurb: 'Advanced technique, pointe readiness, performance work and The Lab.' },
  { id: 'adult', name: 'Adult Open', minAge: 18, maxAge: null, durations: [60], leotard: { name: 'Own choice', hex: null },
    blurb: 'Beginners and returners together. Drop in, or join for the term.' },
];

export const styles: Style[] = [
  { id: 'ballet', name: 'Ballet', tagline: 'Line, lift and quiet strength.', bpm: 88, signatureStep: 'Pirouette en dehors',
    description: 'The foundation of everything we teach: posture, turnout and musicality, built at the barre and tested in the centre. Seniors work towards pointe when their teacher says they’re ready.',
    suits: 'Anyone who loves music, precision and a good long stretch.',
    levels: ['petite', 'junior', 'inter', 'senior', 'adult'] },
  { id: 'contemporary', name: 'Contemporary', tagline: 'Weight, breath and the floor as a partner.', bpm: 76, signatureStep: 'Spiral fall and recovery',
    description: 'Grounded, release-based movement that uses the floor, gravity and breath. Every term ends with a phrase the dancers help choreograph.',
    suits: 'Expressive movers and ballet dancers who want to let go.',
    levels: ['junior', 'inter', 'senior', 'adult'] },
  { id: 'jazz', name: 'Jazz', tagline: 'Sharp lines, big energy, full stage presence.', bpm: 126, signatureStep: 'Jazz walk into a kick-ball-change',
    description: 'Isolations, turns, leaps and kicks set to music with a beat you can feel. Expect strong technique and plenty of performance.',
    suits: 'Performers who like to be seen from the back row.',
    levels: ['junior', 'inter', 'senior', 'adult'] },
  { id: 'tap', name: 'Tap', tagline: 'Your feet are the drum kit.', bpm: 132, signatureStep: 'Shuffle-ball-change',
    description: 'Rhythm you can hear, from first shuffles to syncopated time steps. Classes are set to swing, funk and pop.',
    suits: 'Drummers at heart, puzzle lovers and anyone who taps their feet anyway.',
    levels: ['petite', 'junior', 'inter', 'adult'] },
  { id: 'hip-hop', name: 'Hip-Hop', tagline: 'Groove first, then the tricks.', bpm: 96, signatureStep: 'Bounce, rock and the six-step',
    description: 'Foundations of grooves, footwork and freestyle, with a routine built each term. Clean indoor sneakers, loose clothes and good energy.',
    suits: 'Movers who feel the bass before the melody.',
    levels: ['petite', 'junior', 'inter', 'senior', 'adult'] },
  { id: 'musical-theatre', name: 'Musical Theatre', tagline: 'Dance, sing and sell the story.', bpm: 116, signatureStep: 'Step-touch with a song on top',
    description: 'Broadway-style jazz, acting through song and ensemble numbers. Classes finish each term with a short in-studio sharing.',
    suits: 'Storytellers, singers and natural hams.',
    levels: ['junior', 'inter', 'senior'] },
];

export const teachers: Teacher[] = [
  { id: 'odile-marchetti', name: 'Odile Marchetti', role: 'Artistic Director', styles: ['ballet', 'contemporary'],
    bio: 'Danced twelve seasons in company work before opening the studio in 2014.' },
  { id: 'jaye-okafor', name: 'Jaye Okafor', role: 'Hip-Hop & Jazz Lead', styles: ['hip-hop', 'jazz'],
    bio: 'A battle-scene regular who teaches musicality before tricks, every single class.' },
  { id: 'wren-castellanos', name: 'Wren Castellanos', role: 'Contemporary Lead', styles: ['contemporary'],
    bio: 'Makes new work with dancers rather than on them; runs the spring Lab.' },
  { id: 'benny-lund', name: 'Benny Lund', role: 'Tap & Musical Theatre', styles: ['tap', 'musical-theatre'],
    bio: 'Ex-touring ensemble member with very loud shoes and a very patient ear.' },
  { id: 'priya-anand', name: 'Priya Anand', role: 'Early Years & Jazz', styles: ['ballet', 'jazz'],
    bio: 'Teaches Petite classes with props, stories and a lot of jumping.' },
];

export const rooms: Room[] = [
  { id: 'mirror-room', name: 'Studio A · The Mirror Room', short: 'Mirror Room', description: 'Sprung maple, a mirrored wall and barres.' },
  { id: 'sprung-box', name: 'Studio B · The Sprung Box', short: 'Sprung Box', description: 'Black marley floor, sound system and tap boards.' },
];

/** USD per 10-week term, keyed by class length in minutes. Whole dollars only. */
export const fees = {
  currency: 'USD',
  termWeeks: 10,
  byLength: [
    { minutes: 30, price: 150 },
    { minutes: 45, price: 195 },
    { minutes: 60, price: 235 },
    { minutes: 90, price: 320 },
  ],
  /** Adult Open classes only. */
  adultDropIn: 24,
  /** Percent off the second and later dancers in a family. */
  siblingDiscountPercent: 10,
} as const;

export function styleById(id: string): Style | undefined { return styles.find(style => style.id === id); }
export function levelById(id: string): Level | undefined { return levels.find(level => level.id === id); }
export function teacherById(id: string): Teacher | undefined { return teachers.find(teacher => teacher.id === id); }
export function roomById(id: string): Room | undefined { return rooms.find(room => room.id === id); }

/** "3–5", "18+" */
export function ageRange(level: Level): string {
  return level.maxAge === null ? `${level.minAge}+` : `${level.minAge}–${level.maxAge}`;
}

export function feeFor(minutes: number): number | undefined {
  return fees.byLength.find(entry => entry.minutes === minutes)?.price;
}
