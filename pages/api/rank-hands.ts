// /pages/api/rank-hands.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Counts, getHandDetails } from '../../utils/poker';
import { HandDetails } from '../../utils/poker';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { hands } = req.body;
    const result = getWinner(hands[0].join(' '), hands[1].join(' '));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing hands:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  function getWinner(hand1: string, hand2: string) {
    try {
      const details1 = getHandDetails(hand1);
      const details2 = getHandDetails(hand2);

      if (details1.rank === details2.rank) {
        const result = compareValues(details1, details2);
        return {
          winner: result === 'WIN' ? hand1 : hand2,
          loser: result === 'WIN' ? hand2 : hand1,
        };
      }

      return {
        winner: details1.rank < details2.rank ? hand1 : hand2,
        loser: details1.rank < details2.rank ? hand2 : hand1,
      };
    } catch (error) {
      console.error('Error getting hand details:', error);
      throw error;
    }
  }

  function compareValues(details1: HandDetails, details2: HandDetails): string {
    if (details1.rank === 1 || details1.rank === 5) {
      return details1.value.localeCompare(details2.value) === -1
        ? 'LOSE'
        : details1.value.localeCompare(details2.value) === 1
        ? 'WIN'
        : 'DRAW';
    } else if (details1.rank === 4) {
      for (let i = 4; i >= 0; i--) {
        if (details1.value[i] !== details2.value[i]) {
          return details1.value[i].localeCompare(details2.value[i]) === -1
            ? 'LOSE'
            : details1.value[i].localeCompare(details2.value[i]) === 1
            ? 'WIN'
            : 'DRAW';
        }
      }
      return 'DRAW';
    } else if (
      details1.rank === 2 ||
      details1.rank === 3 ||
      details1.rank === 6 ||
      details1.rank === 7 ||
      details1.rank === 8
    ) {
      const countDiff = compareCounts(details1.value, details2.value);
      if (countDiff === 0) {
        return compareKickers(details1.value, details2.value);
      } else {
        return countDiff === -1 ? 'LOSE' : 'WIN';
      }
    } else {
      const countDiff = compareCounts(details1.value, details2.value);
      if (countDiff === 0) {
        return compareKickers(details1.value, details2.value);
      } else {
        return countDiff === -1 ? 'LOSE' : 'WIN';
      }
    }
  }

  function compareCounts(value1: string, value2: string): number {
    const counts1 = getCounts(value1);
    const counts2 = getCounts(value2);

    for (let i = 0; i < value1.length; i++) {
      if (counts1[value1[i]] !== counts2[value1[i]]) {
        return counts1[value1[i]] - counts2[value1[i]];
      }
    }

    return 0;
  }

  function compareKickers(value1: string, value2: string): string {
    for (let i = value1.length - 1; i >= 0; i--) {
      if (value1[i] !== value2[i]) {
        return value1[i].localeCompare(value2[i]) === -1 ? 'LOSE' : 'WIN';
      }
    }
    return 'DRAW';
  }

  function getCounts(value: string): Counts {
    const counts: Counts = {};
    for (let i = 0; i < value.length; i++) {
      counts[value[i]] = (counts[value[i]] || 0) + 1;
    }
    return counts;
  }
};
