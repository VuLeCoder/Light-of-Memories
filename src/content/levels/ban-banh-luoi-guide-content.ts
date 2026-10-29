const text = (vi: string, en: string) => ({ vi, en });
export const guideCopy = {
  travel: text('Đang đi theo lộ trình đã chọn.', 'Following your chosen route.'),
  atA: text('A · Lấy mẫu bên tảng đá', 'A · Collect a rock sample'),
  atB: text('B · Khám phá đất cam', 'B · Explore orange soil'),
  done: text('Đã về tàu cùng hai mẫu.', 'Back at the lander with both samples.'),
  waiting: text('Hoạt động tại trạm đang được xây dựng.', 'This stop’s activity is under construction.'),
  edit: text('Bản đồ', 'Map'),
  step: text('Bước', 'Step'),
  hints: {
    travel: text('Xe tự đi theo bản đồ. Chỉ dừng làm nhiệm vụ tại A và B.', 'The rover follows your map automatically, stopping for activities only at A and B.'),
    atA: text('Tại đây, Cuội sẽ lấy mẫu đá rồi mang về xe. Bạn có thể quay lại xem lộ trình.', 'Here Cuội will collect a rock and bring it to the rover. You can return to your route.'),
    atB: text('Tại đây, Cuội sẽ quan sát đất cam và mang mẫu về xe. Bạn có thể quay lại xem lộ trình.', 'Here Cuội will explore orange soil and bring a sample to the rover. You can return to your route.'),
    done: text('Cùng nghe ký ức của Bánh Lưới nhé.', 'Listen to Mesh Wheels’ memory.'),
  },
};
