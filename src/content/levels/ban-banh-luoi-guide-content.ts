const text = (vi: string, en: string) => ({ vi, en });
export const guideCopy = {
  travel: text('Đang đi theo lộ trình đã chọn.', 'Following your chosen route.'),
  atA: text('A · Lấy mẫu bên tảng đá', 'A · Collect a rock sample'),
  atB: text('B · Khám phá đất cam', 'B · Explore orange soil'),
  done: text('Đã về tàu cùng hai mẫu.', 'Back at the lander with both samples.'),
  edit: text('Bản đồ', 'Map'),
  step: text('Bước', 'Step'),
  soilHints: [
    text('Đi tới một mảng đất và giữ E để xem hình hạt. Tìm hạt tròn cam và đen xen các mảnh nhỏ.', 'Walk to a patch and hold E to see its grains. Look for round orange and black grains mixed with fragments.'),
    text('Quan sát mảng giữa, có hai vạch. Chọn lấy mẫu, rồi đi về xe bên trái và nhấn E để cất.', 'Inspect the middle patch, marked with two strokes. Collect it, then walk left to the rover and press E to store it.'),
  ],
  rockHints: [
    text('Đi tới tảng đá bên phải. Giữ E hoặc nút hành động, rồi thả trong vùng sáng. Hai lần gõ đúng sẽ làm rời một mẫu.', 'Walk to the rock on the right. Hold E or the action button, then release in the marked zone. Two good hits loosen a sample.'),
    text('Đến vòng sáng dưới đá. Giữ khoảng một giây rồi thả; nhấn E để nhặt mẫu đã rời. Mang mẫu về xe bên trái và nhấn E để cất.', 'Reach the ring below the rock. Hold for about a second, then release; press E to pick up the loose sample. Carry it left to the rover and press E to store it.'),
  ],
  hints: {
    travel: text('Xe tự đi theo bản đồ. Chỉ dừng làm nhiệm vụ tại A và B.', 'The rover follows your map automatically, stopping for activities only at A and B.'),
    atA: text('Tại đây, Cuội sẽ lấy mẫu đá rồi mang về xe. Bạn có thể quay lại xem lộ trình.', 'Here Cuội will collect a rock and bring it to the rover. You can return to your route.'),
    atB: text('Tại đây, Cuội sẽ quan sát đất cam và mang mẫu về xe. Bạn có thể quay lại xem lộ trình.', 'Here Cuội will explore orange soil and bring a sample to the rover. You can return to your route.'),
    done: text('Cùng nghe ký ức của Bánh Lưới nhé.', 'Listen to Mesh Wheels’ memory.'),
  },
};
