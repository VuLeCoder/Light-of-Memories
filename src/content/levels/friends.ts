import type { Language } from '../i18n';
import type { LevelDefinition } from './types';

export const friendIds = ['rover', 'mirror', 'flag', 'footprint'] as const;
export type FriendId = typeof friendIds[number];
export const flagMemoryArt = `${import.meta.env.BASE_URL}images/friends/flag-memory.svg`;
export const friendArt = (id: FriendId) => `${import.meta.env.BASE_URL}images/friends/${id}.svg`;
interface FriendStory {
  name: string; title: string; opening: string; reply: string; ending: string; promise: string;
  tasks: [string, string, string]; instructions: [string, string, string]; hints: [string, string, string];
  memories: [string, string, string];
}
export const friendStories: Record<Language, Record<FriendId, FriendStory>> = {
  vi: {
    rover: {
      name: 'Bánh Bụi', title: 'Những chuyến đi còn nhớ',
      opening: 'Ngày trước, mỗi chuyến đi đều có một nơi để đến. Bây giờ… mình chỉ nhớ đường, chẳng nhớ vì sao đã đi.',
      reply: 'Vậy mình cùng tìm lại những nơi bạn từng ghé nhé?',
      ending: 'Hóa ra mình không chỉ đi cho thật xa. Mỗi nơi mình đến đều mang về một điều mới.',
      promise: 'Mình sẽ nhớ những chuyến đi của bạn. Kìa, có vật gì đang lóe lên ở phía xa!',
      tasks: ['Đọc dấu bánh xe', 'Vạch đường qua bãi đá', 'Chuyến đi có ý nghĩa'],
      instructions: ['Dấu nào do những bánh xe có vân để lại?', 'Chạm ô bên cạnh để vạch đường tới lá cờ. Tránh những tảng đá.', 'Mỗi điểm dừng có một công việc. Ghép việc phù hợp với nơi chốn.'],
      hints: ['Bánh xe để lại hai vệt song song có vân lặp lại.', 'Chỉ đi lên, xuống, trái hoặc phải. Có thể lùi một bước để chọn đường khác.', 'Ngắm toàn cảnh cần máy ảnh; đá cần quan sát gần; mặt đất cần khảo sát.'],
      memories: ['Hai vệt bánh xe dẫn qua mặt đất.', 'Đường vòng cũng có thể đưa mình tới đích.', 'Mỗi điểm dừng mang về một điều mới.'],
    },
    mirror: {
      name: 'Gương Nhỏ', title: 'Một lời chào từ rất xa',
      opening: 'Cậu đang tìm hình của mình à? Còn tớ đang chờ một lời chào từ rất xa.',
      reply: 'Xa bằng từ đây về nhà không? Mình cùng gửi một lời chào nhé!',
      ending: 'Một lời chào đi rất xa vẫn có thể tìm được đường trở lại.',
      promise: 'Mình sẽ nhớ lời hồi đáp của bạn. Trong ký ức ấy, hình như có một lá cờ…',
      tasks: ['Tìm đúng người bạn', 'Gửi lời chào', 'Một chuyến đi rồi trở lại'],
      instructions: ['Di chuyển vệt sáng để tìm vật có nhiều ô gương đều nhau, rồi chọn vật đó.', 'Dùng hai thanh điều chỉnh để đặt điểm ngắm vào tâm tấm gương, rồi gửi ánh sáng.', 'Chọn ba hình theo thứ tự chuyến đi của ánh sáng. Chạm lại để bỏ chọn.'],
      hints: ['Gương Nhỏ có một bảng gồm nhiều ô nhỏ, khác với đá và mảnh kim loại.', 'Đưa vòng ngắm tới dấu cộng ở giữa bảng gương.', 'Ánh sáng được gửi đi, chạm gương, rồi trở về nơi gửi.'],
      memories: ['Một bảng gương nhỏ chờ lời chào.', 'Ánh sáng chạm gương rồi quay về phía nguồn gửi.', 'Gửi đi → chạm gương → nhận lại.'],
    },
    flag: {
      name: 'Cờ Nhỏ', title: 'Một điều thật rõ',
      opening: 'Ngày ấy có người đứng cạnh mình, có máy ảnh, có những bước chân… Rồi sao nữa nhỉ?',
      reply: 'Bạn cứ kể những gì còn nhớ. Mình sẽ giúp bạn nối lại.',
      ending: 'Cậu không cần nhớ mọi thứ đâu. Chỉ một điều thật rõ cũng đủ để kể lại câu chuyện của mình.',
      promise: 'Mình đã ghi điều ấy vào sổ. Những dấu chân trong ảnh đang dẫn mình tới một người bạn nữa.',
      tasks: ['Tìm góc chụp cũ', 'Bức ảnh bị thiếu', 'Điều mình muốn giữ'],
      instructions: ['Đổi vị trí quan sát để lá cờ và tảng đá khớp với nét vẽ trong ảnh cũ.', 'Chọn một mảnh ở khay, rồi chạm ô muốn đặt. Chạm ô đã có ảnh để lấy lại mảnh.', 'Chọn một chi tiết muốn ghi nhớ. Mỗi lựa chọn đều có một câu chuyện.'],
      hints: ['Nhìn cả lá cờ và tảng đá. Ở đúng góc, hai đường nét sẽ trùng nhau.', 'Ghép đường chân trời trước, rồi nối cột cờ và mặt đất.', 'Không có đáp án sai. Hãy chọn điều khiến bạn muốn ghi nhớ.'],
      memories: ['Một góc nhìn đưa bức ảnh cũ trở lại.', 'Những mảnh nhỏ ghép thành một cuộc gặp.', 'Mình chọn giữ lại một điều thật rõ.'],
    },
    footprint: {
      name: 'Bước Nhỏ', title: 'Có người từng ở đây',
      opening: 'Ở dưới này cơ! Mình không có bánh xe hay máy ảnh. Mình chỉ biết… đã từng có người đi qua đây.',
      reply: 'Bạn cũng có câu chuyện mà. Để mình nhìn thật gần nhé!',
      ending: 'Vậy mình cũng có điều đáng nhớ sao?',
      promise: 'Có chứ. Nhờ bạn, mình biết đã có người từng đứng ở đây và nhìn lên bầu trời.',
      tasks: ['Nhìn thật gần', 'Nối một đoạn hành trình', 'Kể lại bằng lời Cuội'],
      instructions: ['Tìm dấu giày: có mũi tròn, gót và các đường vân đế.', 'Nhìn hướng mũi giày ở cuối vệt dấu, rồi chọn hướng đi tiếp.', 'Chọn ba hình để kể lại câu chuyện theo thứ tự. Chạm lại để bỏ chọn.'],
      hints: ['Dấu giày có phần mũi và gót; đá không có các vân đế đều nhau.', 'Mũi giày tròn chỉ về phía người ấy đang đi.', 'Có người đến đây, khám phá, rồi để lại một câu chuyện.'],
      memories: ['Một dấu giày nhỏ cũng đáng được nhìn thấy.', 'Những bước chân nối thành hành trình.', 'Đã đến đây → đã khám phá → đã để lại câu chuyện.'],
    },
  },
  en: {
    rover: {
      name: 'Dusty Wheels', title: 'Journeys remembered', opening: 'Every journey once had a destination. Now I remember the roads, but not why I travelled.', reply: 'Let’s find the places you visited together!', ending: 'I did more than travel far. Every stop brought back something new.', promise: 'I will remember your journeys. Look, something is glinting in the distance!',
      tasks: ['Read the wheel tracks', 'A route through the rocks', 'A journey with a purpose'], instructions: ['Which trace was made by patterned wheels?', 'Choose an adjacent tile to draw a route to the flag. Avoid the rocks.', 'Match each stop with the work that belongs there.'], hints: ['Wheels leave two parallel tracks with repeating marks.', 'Move up, down, left or right. Undo a step to try another route.', 'Use a camera for a panorama, look closely at rocks and study the soil.'], memories: ['Two wheel tracks cross the ground.', 'A detour can still reach the destination.', 'Every stop brings back something new.'],
    },
    mirror: {
      name: 'Little Mirror', title: 'A greeting from far away', opening: 'Are you looking for your reflection? I am waiting for a greeting from very far away.', reply: 'As far as home? Let’s send a greeting together!', ending: 'A greeting can travel far and still find its way back.', promise: 'I will remember your reply. Was that a flag in your memory?',
      tasks: ['Find your friend', 'Send a greeting', 'There and back'], instructions: ['Move the light to find a panel of small, regular mirrors, then choose it.', 'Use both sliders to place the aim at the mirror’s centre, then send the light.', 'Choose the pictures in the order light travels. Select again to undo.'], hints: ['Look for a panel of small squares, rather than a rock or scrap of metal.', 'Move the aim to the cross in the mirror panel.', 'Light is sent, reaches the mirror, then returns to its source.'], memories: ['A small mirror panel awaits a greeting.', 'Light reaches the panel and returns toward its source.', 'Send → reflect → receive.'],
    },
    flag: {
      name: 'Little Flag', title: 'One clear memory', opening: 'Someone stood beside me. There was a camera, there were footsteps… What happened next?', reply: 'Tell me what you still remember. We can put it together.', ending: 'You do not need to remember everything. One clear detail is enough to tell my story.', promise: 'I have written it down. The footprints in the picture lead to another friend.',
      tasks: ['Find the old viewpoint', 'The missing photograph', 'What I want to keep'], instructions: ['Change viewpoint until the flag and rock match the outlines in the old picture.', 'Choose a piece, then choose its slot. Select an occupied slot to take the piece back.', 'Choose a detail to remember. Every choice has its own story.'], hints: ['Watch both the flag and the rock. Their outlines align at the right viewpoint.', 'Start with the horizon, then join the flagpole and the ground.', 'There is no wrong answer. Choose a detail that matters to you.'], memories: ['A viewpoint brings an old picture back.', 'Small pieces make a whole encounter.', 'I chose one clear detail to keep.'],
    },
    footprint: {
      name: 'Little Step', title: 'Someone was here', opening: 'Down here! I have no wheels or camera. All I know is that someone once walked here.', reply: 'You have a story too. Let me take a closer look!', ending: 'So I have something worth remembering too?', promise: 'Of course. You show me that someone stood here and looked up at the sky.',
      tasks: ['Look closely', 'Follow the journey', 'Tell it with Cuội'], instructions: ['Find a bootprint with a rounded toe, a heel and patterned tread.', 'Look at the toe of the last print, then choose which way to go next.', 'Choose three pictures to tell the story in order. Select again to undo.'], hints: ['A bootprint has a toe and heel; a rock has no regular tread.', 'The rounded toe points in the direction the traveller is going.', 'Someone arrived, explored and left a story behind.'], memories: ['Even a small footprint deserves to be seen.', 'Footsteps connect into a journey.', 'Arrived → explored → left a story.'],
    },
  },
};
// This is an illustrated tale, not a depiction of a named historical mission.
export const friendLevels = friendIds.map(id => ({
  id, label: friendStories.vi[id].name, portrait: friendArt(id), memoryCount: 3,
  text: Object.fromEntries((['vi', 'en'] as const).map(language => {
    const s = friendStories[language][id];
    return [language, { friend: s.name, enter: `${language === 'vi' ? 'Gặp' : 'Meet'} ${s.name}`, chapter: s.title, intro: s.reply, reply: s.opening, invitation: s.opening, memory: language === 'vi' ? 'Ba mảnh ký ức' : 'Three memories' }];
  })) as LevelDefinition['text'],
})) satisfies LevelDefinition[];
