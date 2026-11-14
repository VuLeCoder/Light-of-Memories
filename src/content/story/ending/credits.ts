export const projectCredits = {
  title: 'Light of Memories',
  heading: { vi: 'Thành viên dự án', en: 'Project team' },
  members: ['Lê Phạm Thế Vũ', 'Nguyễn Đức Mạnh', 'Nguyễn Bảo An', 'Nguyễn Thị Thanh An', 'Cao Quốc Khánh', 'Vũ Lê Đức Minh'],
};

// Acknowledgements transcribed from the published manuscripts (VI p. 52 / EN p. 53).
export const closingCredits = [
  {
    id: 'thanks-1', duration: 12000,
    heading: { vi: 'Lời cảm ơn', en: 'Acknowledgements' },
    paragraphs: [{
      vi: 'Cảm ơn NASA đã công bố những tư liệu mở về các sứ mệnh Mặt Trăng. Cảm ơn ban tổ chức NASA International Space Apps Challenge, nơi cho chúng tôi cơ hội kể câu chuyện này.',
      en: 'Thank you to NASA for publishing open material about its Moon missions. Thank you to the organizers of the NASA International Space Apps Challenge, who gave us the chance to tell this story.',
    }],
  },
  {
    id: 'thanks-2', duration: 12000,
    heading: { vi: 'Lời cảm ơn', en: 'Acknowledgements' },
    paragraphs: [{
      vi: 'Cảm ơn những người kể chuyện Trung Thu đã giữ cho Cuội, chị Hằng và cây đa sống mãi trong tuổi thơ của chúng ta. Và cảm ơn bạn đã đọc, đã nhớ tên những người bạn bị lãng quên.',
      en: 'Thank you to the Mid-Autumn storytellers who keep Cuội, Hằng and the banyan alive in our childhoods. And thank you, reader, for reading, and for remembering the names of the forgotten friends.',
    }],
  },
  {
    id: 'ai', duration: 16000,
    heading: { vi: 'AI đã đồng hành', en: 'AI tools that helped us' },
    paragraphs: [
      { vi: 'Claude AI: Lên ý tưởng, dựng nội dung truyện và game.', en: 'Claude AI: Brainstorming and developing the story and game content.' },
      { vi: 'ChatGPT: Xây dựng mã nguồn, sinh ảnh.', en: 'ChatGPT: Writing the code and generating images.' },
      { vi: 'SunoAI: Tạo dựng âm nhạc cho game.', en: 'SunoAI: Creating music for the game.' },
    ],
  },
  {
    id: 'continuation', duration: 12000,
    heading: { vi: 'Câu chuyện của chúng ta vẫn còn…', en: 'Our story continues…' },
    paragraphs: [{
      vi: 'Những cảm hứng còn đang dang dở, những hành tinh đang chờ đón chúng ta ở các tập tiếp theo.',
      en: 'Ideas are still unfolding, and planets are waiting to welcome us in the next volumes.',
    }],
  },
  {
    id: 'the-end', duration: 6000,
    heading: { vi: 'THE END', en: 'THE END' },
    paragraphs: [],
  },
] as const;

export const creditsTiming = { team: 30000, fade: 1800 } as const;
