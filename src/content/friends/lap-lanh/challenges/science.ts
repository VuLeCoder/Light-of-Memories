
export const scienceCopy = {
  vi: {
    modelNote: 'Đây là mô hình 2D đơn giản. Thiết bị Apollo 11 thật sử dụng các lăng kính có ba mặt phản xạ vuông góc.',
    repairGoal: 'Mục tiêu: Căn chỉnh gương 2 để tia phản xạ qua hai gương và về vùng nhận.',
    repairSuccess: 'Căn chỉnh đúng rồi! Tia phản xạ qua hai gương và trở về khe nhận sáng.',
    rangingSuccess: 'Đúng rồi! Mặt Trăng cách trạm khoảng 384.000 km trong lần đo này.',
    rangingIncomplete: 'Hãy nhập đủ các số đúng định dạng và chọn hai dấu trước khi nộp nhé.',
    rangingHint: 'Chưa đúng rồi. Xem lại sách: ánh sáng đi bao xa mỗi giây, và đồng hồ tính mấy lượt?',
  },
  en: {
    modelNote: 'This is a simplified 2D model. The real Apollo 11 device uses prisms with three mutually perpendicular reflecting faces.',
    repairGoal: 'Goal: keep mirror 1 fixed and align mirror 2 so light reflects off both mirrors into the station’s receiver.',
    repairSuccess: 'Aligned! The ray reflects off both mirrors and returns to the receiving slit.',
    rangingSuccess: 'Correct! The Moon is about 384,000 km from the station in this measurement.',
    rangingIncomplete: 'Enter valid numbers in every field and choose both operators before submitting.',
    rangingHint: 'Not quite. Check the book: how far does light travel per second, and how many journeys did the clock time?',
  },
} as const;
