export interface HandDetails {
  rank: number;
  value: string;
}

export interface Counts {
  [key: string]: any;
}

export function compareHands(h1: string, h2: string): string {
  const details1 = getHandDetails(h1);
  const details2 = getHandDetails(h2);

  console.log('Details 1:', details1);
  console.log('Details 2:', details2);

  if (details1.rank === details2.rank) {
    if (details1.value < details2.value) {
      console.log('WIN');
      return 'WIN';
    } else if (details1.value > details2.value) {
      console.log('LOSE');
      return 'LOSE';
    } else {
      console.log('DRAW');
      return 'DRAW';
    }
  }

  console.log('Comparing ranks...');
  return details1.rank < details2.rank ? 'WIN' : 'LOSE';
}

export function getHandDetails(hand: string): HandDetails {
  const cards = hand.split(' ');
  const order = '23456789TJQKA';

  const faces = getFaces(cards);
  const counts = getCounts(faces);
  const duplicates = getDuplicates(counts);

  const flush = isFlush(cards);
  const first = faces[0].charCodeAt(0);
  const lowStraight = faces.join('') === 'AJKLM';
  faces[0] = lowStraight ? 'N' : faces[0];
  const straight =
    lowStraight || faces.every((f, index) => f.charCodeAt(0) - first === index);
  let rank =
    (flush && straight && 1) ||
    (duplicates[4] && 2) ||
    (duplicates[3] && duplicates[2] && 3) ||
    (flush && 4) ||
    (straight && 5) ||
    (duplicates[3] && 6) ||
    (duplicates[2] > 1 && 7) ||
    (duplicates[2] && 8) ||
    9;

  return { rank, value: faces.sort().join('') };
}

function getFaces(cards: string[]): string[] {
  return cards.map((a) => a[0]).sort();
}

function getCounts(faces: string[]): Counts {
  return faces.reduce((acc, value) => count(acc, value), {});
}

function getDuplicates(counts: Counts): Counts {
  return Object.values(counts).reduce(
    (acc, value) => count(acc, value),
    {}
  );
}

function byCountFirst(a: string, b: string) {
  return b.localeCompare(a);
}

function count(c: Counts, a: string) {
  c[a] = (c[a] || 0) + 1;
  return c;
}

function isFlush(cards: string[]): boolean {
  return cards.every((card) => card[1] === cards[0][1]);
}
