import type { StoryLine } from '../earth-dialogue';
import type { Language } from '../i18n';
import type { GacRabbitJourney } from './gac-troi-rabbit';
export type RabbitDialogue = 'real' | 'bridge' | 'reunion' | 'farewell' | 'chat' | 'earth';
export const rabbitMemoryNames = {
  vi: { surveyor: 'Mắt Tròn', sparkle: 'Lấp Lánh', gac: 'Gác Trời' },
  en: { surveyor: 'Round Eyes', sparkle: 'Sparkle', gac: 'Sky Watcher' },
};
export const rabbitMemories = {
  vi: { surveyor: 'Mắt Tròn đã kể cho em nghe về lần có người ghé thăm. Ba bức ảnh cũ lại có người nhớ đến.', sparkle: 'Lấp Lánh gửi ánh sáng trở về phía Trái Đất. Một người bạn nhỏ vẫn nối mình với nơi rất xa.', gac: 'Gác Trời giúp em nhìn những dấu vết từ trên cao. Nhờ bạn, em đã tìm được đường tới đây.' },
  en: { surveyor: 'Round Eyes told me about a visit long ago. Someone remembers those three old photographs again.', sparkle: 'Sparkle sends light back toward Earth. A small friend connects us to somewhere very far away.', gac: 'Sky Watcher helped me notice traces from above. Our friend helped me find my way here.' },
};
export function gacRabbitDialogue(stage: RabbitDialogue, language: Language, journey?: GacRabbitJourney): StoryLine[] {
  const vi=language==='vi';
  const giftCount=journey?.gifts?.length ?? 0;
  const memory=journey?.memory ?? 'surveyor';
  const lines: Record<RabbitDialogue, [StoryLine['speaker'],string,string][]> = {
    real: [
      ['gacTroi','Camera LROC trên tàu LRO chụp ảnh Mặt Trăng từ trên cao.','The LROC camera aboard LRO takes pictures of the Moon from above.'],
      ['gacTroi','Các nhà khoa học dùng nhiều ảnh để lập bản đồ ánh sáng và bóng tối gần cực nam Mặt Trăng.','Scientists use many pictures to map light and shadow near the Moon’s south pole.'],
      ['gacTroi','Cuội cũng thử nhìn kỹ những dấu hiệu quanh mình nhé!','Cuội, try looking closely at the clues around you too!'],
    ],
    bridge: [
      ['cuoi','Kìa, có đôi tai trắng vừa khuất sau triền đất. Thỏ Ngọc đang chờ mình sao?','Two white ears just vanished behind the slope. Is Moon Rabbit waiting for me?'],
      ['gacTroi','Bạn ấy để lại những dấu chân nhỏ. Cuội nhìn kỹ nhé, mình sẽ giúp khi bạn cần.','Rabbit has left little footprints. Look closely; I can help whenever you need me.'],
      ['cuoi','Mình theo bạn ấy tới cây đa nhé. Nếu gặp những món quà Thỏ chuẩn bị, mình sẽ mang tặng chị Hằng.','Let’s follow Rabbit to the banyan. We can bring along the little gifts Rabbit has prepared for Hằng.'],
    ],
    reunion: [
      ['cuoi','Chị Hằng ơi… em tìm thấy chị rồi!','Hằng… I found you!'],
      ['chiHang','Chị thấy đèn của em từ xa rồi. Đi một đoạn đường dài, em có mệt không?','I saw your lantern from afar. Are you tired after such a long journey?'],
      ['cuoi',giftCount?'Em có mang quà Thỏ Ngọc chuẩn bị nữa! Nhưng em còn muốn kể chị nghe về những người bạn trên đường.':'Em đã gặp Mắt Tròn, Lấp Lánh và Gác Trời. Mỗi bạn đều cho em một điều để nhớ.',giftCount?'I brought gifts Rabbit prepared! And I have stories about the friends I met along the way.':'I met Round Eyes, Sparkle and Sky Watcher. Each gave me something to remember.'],
      ['chiHang','Vậy mình ngồi lại một chút nhé. Chị muốn nghe câu chuyện của em.','Then let’s sit together for a while. I would love to hear your story.'],
    ],
    farewell: [
      ['cuoi',rabbitMemories.vi[memory],rabbitMemories.en[memory]],
      ['chiHang','Chiếc đèn sáng lên vì em đã dừng lại và lắng nghe các bạn đấy.','Your lantern is shining because you stopped to listen to your friends.'],
      ['cuoi','Lúc mới tới, em cứ nghĩ nơi này chẳng có ai. Giờ em có cả một cuốn sách để mang về.','When I arrived, I thought no one was here. Now I have a whole book to take home.'],
      ['chiHang','Giữ những câu chuyện ấy nhé. Và khi tới một nơi mới, mình cùng chăm chút nơi ấy như những người bạn.','Keep those stories with you. And when we visit a new place, let’s care for it as we would a friend.'],
      ['cuoi','Em sẽ kể lại. Để dù ở xa, các bạn vẫn có người nhớ tới.','I will tell their stories. Even far away, they will have someone who remembers them.'],
    ],
    earth: [
      ['an','Bà ơi, vậy là Cuội tìm được chị Hằng rồi! Còn những người bạn thì sao ạ?','Grandma, Cuội found Hằng! What about the friends?'],
      ['ba','Các bạn vẫn có những câu chuyện của mình. Từ nay, cả Cuội và cháu đều biết những câu chuyện ấy rồi.','They still have their own stories. Now both you and Cuội know them.'],
      ['an','Lần sau nhìn trăng, cháu sẽ nhớ cả Mắt Tròn, Lấp Lánh và Gác Trời nữa.','Next time I look at the Moon, I will remember Round Eyes, Sparkle and Sky Watcher too.'],
      ['ba','Ừ. Có những chuyến đi khép lại, rồi ở lại rất lâu trong lòng mình.','Yes. Some journeys end, then stay with us for a very long time.'],
    ],
    chat: [
      ['gacTroi','Cuội và chị Hằng vẫn ở bên cây đa chứ?','Are you and Hằng still by the banyan, Cuội?'],
      ['cuoi','Có cả Thỏ Ngọc nữa; bạn ấy lại ngủ cạnh đèn rồi!','Moon Rabbit is here too, asleep beside the lantern again!'],
      ['gacTroi','Những câu chuyện vẫn ở trong sách, bạn mở xem nhé!','Our stories are still in the book, ready for you to read!'],
    ],
  };
  return lines[stage].map(([speaker,v,e],i)=>({id:`rabbit-${stage}-${i+1}`,speaker,text:vi?v:e}));
}
