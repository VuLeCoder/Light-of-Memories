import type { StoryLine } from '../types';

/** Stable IDs identify finale dialogue; stage numbers and turn counts remain save-compatible. */
export const finaleLines: Record<number, readonly (readonly [string, StoryLine['speaker'], string, string])[]> = {
  0: [
    ['banyan-return', 'narrator', 'Cuội trở về gốc đa. Chiếc đèn ông sao tỏa sáng, soi rõ chiếc ghế đá quen thuộc. Cuội ôm chiếc đèn, nhớ lại những người bạn đã giúp mình trên đường đi.', 'Cuội returns to the banyan. His star lantern shines on the familiar stone bench. Holding the lantern, he remembers the friends who helped him along the way.'],
    ['hang-return', 'narrator', 'Hương quế trở lại. Tiếng đàn khe khẽ vang lên. Từ giữa ánh sáng, chị Hằng hiện ra bên chiếc ghế đá.', 'The scent of cinnamon returns, with the soft sound of music. Hằng appears in the light beside the stone bench.'],
    ['found', 'cuoi', 'Chị Hằng ơi, em tìm thấy chị rồi!', 'Hằng, I found you!'],
    ['welcome', 'chiHang', 'Cuội đến rồi! Chiếc đèn của em sáng đẹp quá.', 'You are here, Cuội! Your lantern shines so beautifully.'],
    ['remembered', 'cuoi', 'Mắt Tròn, Lấp Lánh, Tai Thính, Bánh Lưới và Gác Trời đã giúp em. Em nhớ tên và câu chuyện của các bạn!', 'Round Eye, Twinkle, Sharp Ear, Mesh Wheels and Sky Watcher helped me. I remember their names and stories!'],
    ['explanation', 'chiHang', 'Chị chưa bao giờ đi đâu cả. Nhưng khi mọi người quên nhau, ánh sáng của chị mờ đi, đến mức em không nhìn thấy. Em đã nhớ lại các bạn. Nhờ vậy, chị lại hiện ra.', 'I never went away. But when people forget one another, my light fades until you cannot see me. You remembered our friends, and now I can appear again.'],
    ['homeward-thought', 'cuoi', 'Nhờ các bạn, em hiểu thêm về Mặt Trăng. Em muốn kể những điều đã học cho mọi người ở quê nhà nữa!', 'Our friends helped me learn more about the Moon. I want to share what I learned with everyone back home!'],
    ['shared-home', 'chiHang', 'Khoa học lớn lên từng ngày. Chị vui khi con người dám bay xa, dám hỏi và dám học. Nhưng hãy để khoa học đi cùng việc bảo vệ ngôi nhà chung và những người bạn xung quanh.', 'Science grows each day. I am glad people dare to fly far, ask and learn. Let science go hand in hand with caring for our shared home and the friends around us.'],
    ['cards', 'chiHang', 'Có bạn vẫn làm việc, có bạn đã nghỉ. Mình cùng xem những thẻ này và nghĩ xem mỗi chuyến đi nên để lại điều gì nhé.', 'Some friends still work; others are resting. Let us look at these cards and think about what each journey should leave behind.'],
  ],
  2: [
    ['care', 'chiHang', 'Nhớ những đóng góp đã qua. Giữ gìn Trái Đất, Mặt Trăng và những nơi mình đặt chân đến, Cuội nhé.', 'Remember past contributions. Care for Earth, the Moon and the places you visit, Cuội.'],
    ['promise', 'cuoi', 'Em sẽ nhớ và kể lại câu chuyện của các bạn!', 'I will remember and tell our friends’ stories!'],
  ],
  3: [
    ['an-sees', 'an', 'Bà ơi! Con thấy rồi! Chị Hằng ngồi cạnh chú Cuội kìa!', 'Grandma! I can see them! Hằng is sitting beside Cuội!'],
    ['grandma-smiles', 'narrator', 'Bà mỉm cười, nắm tay An thật chặt. Ngọn đèn ông sao trên hiên nhà sáng bừng.', 'Grandma smiles and holds An’s hand tightly. The star lantern shines brightly on the porch.'],
    ['real-friends', 'ba', 'Những thiết bị trong truyện là có thật, con ạ. Chúng đã giúp con người hiểu thêm về Mặt Trăng. Còn Cuội trò chuyện với các bạn là điều mình tưởng tượng.', 'The instruments in the story are real, dear. They helped people learn about the Moon. Cuội talking with them is something we imagine.'],
    ['an-promise', 'narrator', 'Đêm ấy, An viết vào cuốn sổ nhỏ: “Mỗi ngày, con sẽ làm một việc nhỏ để giữ gìn những người bạn xung quanh con.”', 'That night, An writes in a little notebook: “Every day, I will do one small thing to look after the friends around me.”'],
    ['closing', 'narrator', 'Câu chuyện của Cuội dừng ở đây, nhưng câu chuyện của em thì chưa. Em có thể cất đồ dùng cẩn thận, bỏ rác đúng chỗ và kể cho người thân nghe về một người bạn dưới trăng.', 'Cuội’s story ends here, but yours does not. You can look after your belongings, put litter in the right place and tell someone about a friend beneath the Moon.'],
  ],
};

export const conversations: Record<number, [StoryLine['speaker'], string, string][]> = Object.fromEntries(
  Object.entries(finaleLines).map(([stage, lines]) => [stage, lines.map(([, speaker, vi, en]) => [speaker, vi, en])]),
);
export const finaleDialogueLength = (stage: number) => finaleLines[stage]?.length ?? 1;
