import { earthDialogue } from './earth-dialogue';
import { moonAwakeningDialogue } from './moon-dialogue';

export type Language = 'vi' | 'en';
export const languageOptions = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
] as const;

const englishEarth: Record<(typeof earthDialogue)[number]['id'], string> = {
  'earth-01': 'On the full moon of the eighth lunar month, the moon shone like a silver plate.',
  'earth-02': 'An sat on the porch, holding a star lantern and looking up at the sky.',
  'earth-03': 'Grandma, Cuội has been sitting under the banyan tree for so long. Is he lonely?',
  'earth-04': 'Long ago, he was not lonely, dear, because Hằng was by his side.',
  'earth-05': 'But I heard that one night Cuội woke up… and Hằng was no longer there.',
  'earth-06': "The lantern in An's hand flickered softly. And that is where our story begins.",
};
const englishMoon: Record<(typeof moonAwakeningDialogue)[number]['id'], string> = {
  'moon-01': 'Cuội woke up. The Moon was strangely quiet.',
  'moon-02': 'The stone bench was still beside him, but Hằng was gone.',
};

export const storyLines = {
  vi: { earth: earthDialogue, moon: moonAwakeningDialogue },
  en: {
    earth: earthDialogue.map((line) => ({ ...line, text: englishEarth[line.id] })),
    moon: moonAwakeningDialogue.map((line) => ({ ...line, text: englishMoon[line.id] })),
  },
};

export const copy = {
  vi: {
    pageTitle: 'Chú Cuội · Khởi đầu một hành trình', pageDescription: 'Bản dựng cảnh mở đầu hành trình Chú Cuội, chị Hằng và những người bạn bị lãng quên.',
    brandCaption: 'CHUYỆN KỂ DƯỚI TRĂNG', edition: 'BẢN DỰNG MỞ ĐẦU', sceneControls: 'Thông tin và điều khiển cảnh', sceneArea: 'Khung cảnh game', goToScene: 'Đến khung cảnh',
    earth: { tab: 'Hiên nhà', title: 'Đêm Rằm · Câu chuyện An và bà', subtitle: 'Một hiên nhà nhỏ. Một đêm trăng tròn.', description: 'An và bà dưới mái hiên đêm Trung Thu. Cảnh thử dùng tư thế nghỉ từ sprite sheet gốc.' },
    moon: { tab: 'Mặt Trăng', title: 'Dưới bóng Cây Đa', subtitle: 'Phía bên kia của một câu chuyện.', description: 'Cuội bên gốc đa và chiếc ghế đá. Cây, ghế và mặt đất là các lớp riêng để bổ sung tương tác ở lượt sau.' },
    skip: 'Bỏ qua mở đầu', menu: '☰ Menu', moonWaking: 'Cuội đang thức dậy dưới gốc đa…', moonMove: 'Tiến lại gần chiếc ghế đá. Di chuyển bằng A/D, ←/→ hoặc bấm vào mặt đất.',
    preview: 'Xem thử cảnh', choosePreview: 'Chọn cảnh xem thử', cast: 'Nhân vật trong cảnh', debugTitle: 'Kiểm tra bản dựng', debugToggle: 'Hiện vùng kiểm tra và tọa độ click', debugClick: 'Click trong cảnh để kiểm tra tọa độ 960 × 540.', debugCanvas: 'Canvas 16:9 · Cảnh và đạo cụ tạm', debugNote: 'Đã có câu chuyện An–bà và cảnh Cuội thức dậy, di chuyển. Tương tác ghế đá và lưu tiến trình qua tải lại sẽ được bổ sung sau.',
    bookTop: 'TRANG SÁCH BÊN BẠN', bookKicker: 'MỘT CÂU CHUYỆN DƯỚI TRĂNG', bookTitle: ['Sách', 'đồng hành'], bookComing: 'Nội dung sách sẽ được bổ sung sau', bookFirst: 'TRANG ĐẦU TIÊN', bookNote: 'Trang sách đang chờ câu chuyện của bạn.',
    introLabel: 'KHỞI ĐẦU MỘT HÀNH TRÌNH', heroOne: 'Chú Cuội, chị Hằng', heroTwo: 'và những người bạn bị lãng quên', footerOne: 'MỖI CÂU CHUYỆN BẮT ĐẦU TỪ MỘT ÁNH TRĂNG', footerTwo: 'Khung cảnh mở đầu',
    menuHelpTitle: 'Cùng bắt đầu nhé!', menuRestartTitle: 'Bắt đầu lại từ hiên nhà?', menuHelpLead: 'Chọn một nút bằng chuột, hoặc nhấn Tab rồi Enter.', menuRestartLead: 'Bạn sẽ rời cảnh đang xem và trở về đêm Trung Thu cùng An và bà.', menuLead: 'Một đêm trăng tròn. Một câu chuyện đang chờ bạn khám phá.', start: 'Bắt đầu hành trình', continue: 'Tiếp tục', continueHint: 'Quay lại cảnh bạn đang xem.', startHint: 'Bắt đầu hành trình để mở nút này.', help: 'Hướng dẫn', sound: 'Âm thanh', on: 'Bật', off: 'Tắt', noMusic: 'Chưa có nhạc trong bản hiện tại.', soundNotice: 'Lựa chọn âm thanh chỉ được giữ trong lần mở menu này.', helpSteps: ['Bắt đầu hành trình: đọc câu chuyện An và bà ở hiên nhà.', 'Bấm Hiện hết câu hoặc nhấn Space / Enter để hiện đủ chữ. Bấm thêm lần nữa để sang câu tiếp theo.', 'Nhấn Menu để tạm dừng, Tiếp tục để đọc tiếp. Bỏ qua mở đầu đưa bạn tới Cuội đang ngủ.', 'Sau khi Cuội thức dậy và bạn đọc hết lời dẫn, dùng A/D, ←/→ hoặc bấm vào mặt đất để di chuyển.'], helpNote: 'Hãy đọc theo nhịp của bạn. Tương tác đồ vật và lưu hành trình qua tải lại sẽ được bổ sung sau.', backMenu: 'Về menu', restart: 'Bắt đầu lại', keepScene: 'Giữ cảnh hiện tại',
    earthDialogueTitle: 'Câu chuyện An và bà', moonDialogueTitle: 'Cuội tỉnh giấc', narrator: 'Người dẫn truyện', dialogueHint: 'Nhấn Space / Enter hoặc bấm nút bên cạnh', reveal: 'Hiện hết câu', next: 'Tiếp theo', followMoon: 'Theo ánh trăng', explore: 'Bắt đầu khám phá', portraitAlt: 'Chân dung',
    loading: 'Đang chuẩn bị cảnh…', canvasEarth: 'Cảnh pixel An và bà trên hiên nhà', canvasMoon: 'Cảnh pixel Cuội dưới gốc đa trên Mặt Trăng', canvasError: 'Không khởi tạo được cảnh. Hãy tải lại trang hoặc dùng trình duyệt hỗ trợ canvas.', imageError: 'Không tải được ảnh', reload: 'Hãy tải lại trang.', ground: 'Nền cảnh', bench: 'Ghế đá', tree: 'Cây Đa',
  },
  en: {
    pageTitle: 'Cuội · The Journey Begins', pageDescription: 'The opening scene of Cuội, Hằng, and their forgotten friends.',
    brandCaption: 'TALES BENEATH THE MOON', edition: 'OPENING CHAPTER', sceneControls: 'Scene information and controls', sceneArea: 'Game scene', goToScene: 'Go to game scene',
    earth: { tab: 'The porch', title: 'Full Moon · An and Grandma', subtitle: 'A little porch. A full moon night.', description: 'An and Grandma under the porch roof on Mid-Autumn night. This preview uses resting poses from the original sprite sheets.' },
    moon: { tab: 'The Moon', title: 'Under the Banyan Tree', subtitle: 'The other side of a story.', description: 'Cuội beside the banyan tree and stone bench. The tree, bench, and ground are separate layers for future interactions.' },
    skip: 'Skip opening', menu: '☰ Menu', moonWaking: 'Cuội is waking beneath the banyan tree…', moonMove: 'Walk toward the stone bench. Move with A/D, ←/→, or click the ground.',
    preview: 'Preview scenes', choosePreview: 'Choose a preview scene', cast: 'Characters in this scene', debugTitle: 'Preview tools', debugToggle: 'Show hit areas and click coordinates', debugClick: 'Click the scene to inspect coordinates in 960 × 540.', debugCanvas: '16:9 canvas · Temporary scenery and props', debugNote: 'The story of An and Grandma and Cuội’s wake-up and movement are ready. Bench interaction and saved progress will come later.',
    bookTop: 'YOUR COMPANION BOOK', bookKicker: 'A STORY BENEATH THE MOON', bookTitle: ['Companion', 'book'], bookComing: 'Book content is coming soon', bookFirst: 'THE FIRST PAGE', bookNote: 'Your story is waiting to be written.',
    introLabel: 'THE JOURNEY BEGINS', heroOne: 'Cuội, Hằng', heroTwo: 'and their forgotten friends', footerOne: 'EVERY STORY BEGINS WITH MOONLIGHT', footerTwo: 'Opening scene',
    menuHelpTitle: "Let's begin!", menuRestartTitle: 'Start again at the porch?', menuHelpLead: 'Choose a button with your mouse, or press Tab then Enter.', menuRestartLead: 'You will leave this scene and return to Mid-Autumn night with An and Grandma.', menuLead: 'A full moon night. A story is waiting for you.', start: 'Start the journey', continue: 'Continue', continueHint: 'Return to the scene you were viewing.', startHint: 'Start the journey to unlock this button.', help: 'How to play', sound: 'Sound', on: 'On', off: 'Off', noMusic: 'There is no music in this version yet.', soundNotice: 'Your sound setting will last only while this menu is open.', helpSteps: ['Start the journey to read An and Grandma’s story on the porch.', 'Select Show full line or press Space / Enter to reveal the whole line. Press again to continue.', 'Open Menu to pause, then Continue to return. Skip opening takes you to Cuội asleep.', 'After Cuội wakes and you finish the narration, move with A/D, ←/→, or click the ground.'], helpNote: 'Read at your own pace. Object interactions and saved progress will come later.', backMenu: 'Back to menu', restart: 'Start again', keepScene: 'Keep this scene',
    earthDialogueTitle: 'An and Grandma', moonDialogueTitle: 'Cuội wakes up', narrator: 'Narrator', dialogueHint: 'Press Space / Enter or use the button', reveal: 'Show full line', next: 'Next', followMoon: 'Follow the moonlight', explore: 'Start exploring', portraitAlt: 'Portrait of',
    loading: 'Preparing the scene…', canvasEarth: 'Pixel scene of An and Grandma on the porch', canvasMoon: 'Pixel scene of Cuội beneath the banyan tree on the Moon', canvasError: 'Could not start the scene. Reload the page or use a browser with canvas support.', imageError: 'Could not load images', reload: 'Please reload the page.', ground: 'Ground', bench: 'Stone bench', tree: 'Banyan tree',
  },
} as const;

export function readLanguage(): Language {
  try { return localStorage.getItem('cuoi.language') === 'en' ? 'en' : 'vi'; }
  catch { return 'vi'; }
}
