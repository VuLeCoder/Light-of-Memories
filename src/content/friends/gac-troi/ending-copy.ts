import { gacImage } from './images';
import { impactPhoto } from './challenges/impact';
export const copy = {
  vi: {
    title: 'Câu chuyện của Gác Trời',
    headings: ['Những nơi quen từ trên cao', 'Mặt Trăng vẫn đổi thay', 'Một ca trực vùng tối'],
    stories: [
      'Mình là LRO, người bạn bay quanh Mặt Trăng. Qua những bức ảnh, Cuội đã tìm lại vùng đất của Mắt Tròn, Lấp Lánh, Tai Thính và Bánh Lưới. Mình ghi lại dấu vết từ trên cao, nhưng không nhìn rõ được mọi vật nhỏ đâu nhé!',
      'Cuội đã đối chiếu hai ảnh cùng một vùng đất và tìm thấy dấu vết mới. Kính thiên văn trên Trái Đất thấy chớp sáng của vụ va chạm; ảnh mình chụp sau đó giúp tìm ra chiếc hố. Mặt Trăng vẫn có những đổi thay để khám phá!',
      'Trong ca trực của chúng mình, đáy sâu vẫn tối vì thành hố che nắng. Gần cực Mặt Trăng, nắng chiếu thấp nên một số nơi luôn khuất nắng. Nhưng ba hướng trong mô hình chưa đủ để kết luận: các nhà khoa học cần nhiều ảnh và dữ liệu địa hình.',
    ],
    captions: ['Khu Apollo 12 và Surveyor 3 nhìn từ quỹ đạo', 'Ảnh sau va chạm · 28/07/2013', 'Bản đồ chiếu sáng cực nam từ nhiều ảnh LROC'],
    note: 'Ảnh và kiến thức đã có trong sách của Cuội.',
  },
  en: {
    title: 'Sky Watcher’s story',
    headings: ['Familiar places from above', 'The Moon keeps changing', 'A watch over the shadows'],
    stories: [
      'I am LRO, your friend orbiting the Moon. In my pictures, you found the places where Round Eye, Twinkle, Sharp Ear and Mesh Wheels live. I record traces from above, but I cannot see every tiny object clearly!',
      'You compared two pictures of the same place and found a new trace. A telescope on Earth saw the impact flash; my later pictures helped locate the crater. There are still changes on the Moon to discover!',
      'During our watch, the deep floor stayed dark because the walls blocked sunlight. Near the lunar poles, low sunlight leaves some places always in shadow. Three directions in our model cannot prove this: scientists need many images and terrain data.',
    ],
    captions: ['Apollo 12 and Surveyor 3 seen from orbit', 'After the impact · 28 Jul 2013', 'South pole illumination map from many LROC images'],
    note: 'The pictures and facts are in Cuội’s book.',
  },
};
export const photos = [gacImage('apollo12-surveyor3-lro-annotated').src, impactPhoto('after'), `${import.meta.env.BASE_URL}images/memories/gac-troi/south-pole-illumination.png`];

