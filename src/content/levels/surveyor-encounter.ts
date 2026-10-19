import type { StoryLine } from '../earth-dialogue';

export const surveyorEncounterCopy = {
  vi: {
    title: 'Gặp Mắt Tròn', subtitle: 'Hố Surveyor · Đại Dương Bão',
    goal: 'Đến gần Mắt Tròn để trò chuyện', interact: 'E · Trò chuyện với Mắt Tròn',
    controls: '← → / A D để di chuyển · Bấm Mắt Tròn để Cuội đi đến trò chuyện.',
    canvas: 'Cuội đi trong hố Surveyor, đến gần Surveyor 3 và bấm E để trò chuyện.',
    source: 'Bối cảnh minh họa theo tư liệu NASA', back: 'Về lộ trình', begin: 'Tìm đúng dụng cụ',
    description: 'Surveyor 3 nằm trên sườn bên trong hố Surveyor ở vùng Đại Dương Bão. Cảnh được minh họa theo tư liệu NASA; góc nhìn và khoảng cách được điều chỉnh cho trò chơi.',
  },
  en: {
    title: 'Meet Round Eyes', subtitle: 'Surveyor crater · Ocean of Storms',
    goal: 'Approach Round Eyes to talk', interact: 'E · Talk to Round Eyes',
    controls: '← → / A D to move · Click Round Eyes to walk over and talk.',
    canvas: 'Cuội walks inside Surveyor crater. Approach Surveyor 3 and press E to talk.',
    source: 'Scenery illustrated from NASA references', back: 'Back to the route', begin: 'Find the right tools',
    description: 'Surveyor 3 rests on the inner slope of Surveyor crater in the Ocean of Storms. This scene is illustrated from NASA references, with the viewpoint and distances adapted for play.',
  },
};

// Keep the four saved dialogue turns stable for existing version-3 saves.
export const surveyorEncounterLines = {
  vi: [
    { id: 'surveyor-01', speaker: 'cuoi', text: 'Bạn là ai mà đứng đây một mình thế?' },
    { id: 'surveyor-02', speaker: 'matTron', text: 'Mình là Surveyor 3. Cứ gọi mình là Mắt Tròn nhé! Mình đến đây năm 1967.' },
    { id: 'surveyor-03', speaker: 'matTron', text: 'Máy ảnh và chiếc xẻng của mình đã được mang về Trái Đất. Cuội giúp mình nhớ lại lúc chúng còn ở đây nhé?' },
    { id: 'surveyor-04', speaker: 'cuoi', text: 'Mình sẽ giúp bạn! Bắt đầu với ký ức về máy ảnh và chiếc xẻng nhé.' },
  ],
  en: [
    { id: 'surveyor-01', speaker: 'cuoi', text: 'Who are you, standing here all alone?' },
    { id: 'surveyor-02', speaker: 'matTron', text: 'I am Surveyor 3. You can call me Round Eyes! I arrived here in 1967.' },
    { id: 'surveyor-03', speaker: 'matTron', text: 'My camera and scoop were taken back to Earth. Will you help me remember when they were still here?' },
    { id: 'surveyor-04', speaker: 'cuoi', text: 'I will help! Let’s start with your memories of the camera and scoop.' },
  ],
} as const satisfies Record<'vi' | 'en', readonly StoryLine[]>;
