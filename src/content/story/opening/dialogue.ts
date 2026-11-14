import { banyanLegend } from '../remembrance';
import { earthDialogue } from './earth-dialogue';
import { moonAwakeningDialogue, moonTreeDialogue, moonDepartureDialogue } from './moon-dialogue';

const englishEarth: Record<(typeof earthDialogue)[number]['id'], string> = {
  'earth-01': 'On the full moon of the eighth lunar month, the moon shone like a silver plate.',
  'earth-02': 'An sat on the porch, holding a star lantern and looking up at the sky.',
  'earth-03': 'Grandma, Cuội has been sitting under the banyan tree for so long. Is he lonely?',
  'earth-04': 'Long ago, he was not lonely, dear, because Hằng was by his side.',
  'earth-05': 'But I heard that one night Cuội woke up… and Hằng was no longer there.',
  'earth-06': "The lantern in An's hand flickered softly. And that is where our story begins.",
};
const englishMoon: Record<(typeof moonAwakeningDialogue)[number]['id'], string> = {
  'moon-legend': banyanLegend.en,
  'moon-01': 'Cuội woke up. The Moon was strangely quiet.',
  'moon-02': 'The stone bench was still beside him, but Hằng was gone.',
};

const englishTree = [
  'Hằng! Where are you?',
  'Cuội waited. Hằng was nowhere to be seen.',
  'She has not gone far, my child. But the Moon has changed.',
  'While you slept, new friends arrived. They have stories to tell. Go and meet them!',
  'Five friends will help light the five points of your star lantern. Once you have met all five, its light will lead you to Hằng.',
];
const englishDeparture = [
  'Cuội looked at the unlit five-pointed star lantern, then at the strange footprints in the grey dust.',
  'This time, I must do things right. All right. Let’s go.',
];

export const storyLines = {
  vi: { earth: earthDialogue, moon: moonAwakeningDialogue, tree: moonTreeDialogue, departure: moonDepartureDialogue },
  en: {
    tree: moonTreeDialogue.map((line, i) => ({ ...line, text: englishTree[i] })),
    departure: moonDepartureDialogue.map((line, i) => ({ ...line, text: englishDeparture[i] })),
    earth: earthDialogue.map((line) => ({ ...line, text: englishEarth[line.id] })),
    moon: moonAwakeningDialogue.map((line) => ({ ...line, text: englishMoon[line.id] })),
  },
};

