# Hành trình ba người bạn

Cập nhật 07/11/2026, bổ sung màn điều khiển Cuội sau T02.

Tuyến hiện tại: Mắt Tròn (Surveyor 3) → Lấp Lánh (Apollo 11) → Gác Trời (LRO).

- Bỏ Tai Thính và Bánh Lưới khỏi lộ trình, sách, gợi ý, ký ức và hội thoại đang chơi. Xóa các component thử thách và CSS riêng của hai bạn.
- Giữ cơ chế khám phá của Mắt Tròn, lau bụi / phản xạ / đo khoảng cách của Lấp Lánh, ghép ký ức / đọc chuyện của Gác Trời. Gác Trời giữ T01/T02; sau đó kể chuyện ánh sáng LROC và chơi “Theo bước ánh sáng”: điều khiển Cuội thắp ba đèn dẫn đường. Cuội cảm ơn Gác Trời, nhận ánh sáng cuối rồi về lộ trình. Điểm thứ tư “Đi tìm chị Hằng” chỉ hiện sau khi hoàn thành Gác Trời, dẫn tới hành trình tìm Thỏ và gọi sao qua ba chặng.
- Lấp Lánh giới thiệu Gác Trời để Cuội hỏi đường tìm chị Hằng. Không còn dấu gợn dẫn tới Tai Thính hoặc ảnh Bánh Lưới gửi trong đoạn nối.
- Gác Trời ghép Mắt Tròn với Apollo 12 và Lấp Lánh với Apollo 11. Ghép đúng vẫn làm tối thẻ, mở chuyện và ghi vào sách; gợi ý mở sách.
- Sách có 26 trang, 52 khối nội dung Việt/Anh; không còn chương, ảnh hoặc nguồn tư liệu của hai bạn đã bỏ trong danh mục sách.
- Save v18 đọc v1–v18; Gác Trời dùng revision 3. Save ở cảnh đã bỏ trở về lộ trình; giữ tiến độ ba bạn còn lại. Lọc các ID cũ khỏi ký ức và thứ tự trong save Gác Trời. Save mới không ghi dữ liệu hai bạn đã bỏ.
- Giữ màu sắc, điều khiển, bố cục cảnh và footer. Lộ trình có ba điểm người bạn và thêm điểm tìm chị Hằng sau khi hoàn thành Gác Trời; đèn giữ hình năm cánh, số cánh sáng là 0/1/3/5 sau mỗi cuộc gặp. HUD đếm số bạn trên tổng ba bạn.
- Các nguồn cũ trong kho và nhánh vẽ canvas dùng chung chưa bị xóa hàng loạt để tránh ảnh hưởng đồ họa còn dùng; không có lối vào hai cảnh cũ trong game.

Game nghỉ dưới cây đa sau khi gặp Hằng; có trò chuyện lại, sách, lộ trình và chơi lại. Không có lối vào thẻ hoặc kết An–bà. Xem [GT-R3](done/GT-R3-gap-Hang-va-ket-Gac-Troi.md). Dấu hoàn thành Gác Trời và hoàn thành toàn câu chuyện là hai trạng thái riêng.

## Màn “Theo bước ánh sáng”

- Sau lời giới thiệu T03, dùng bốn phím mũi tên hoặc WASD, giữ nút điều hướng trên màn hình hoặc chạm mặt đất để điều khiển Cuội.
- Mặt đất tối, Cuội và cả ba đèn sáng mờ. Di chuyển giả 3D với kích thước và thứ tự che khuất theo chiều sâu, tương tự màn đào hố. Đến gần từng đèn theo số, bấm “Thắp đèn” hoặc E để đèn sáng mạnh; không có thời gian giới hạn hoặc hình phạt.
- Lưu ngay mỗi đèn bằng tiến độ `routeLandmarks` hiện có; tải lại hoặc về lộ trình rồi quay lại sẽ tiếp tục từ đèn đã thắp.
- Đủ ba đèn, cảnh sáng dần rồi tự nối vào hội thoại tặng ánh sáng; kết thúc hội thoại mới về lộ trình.
- Tạm dừng và mất tiêu điểm sẽ ngừng di chuyển. Nền quỹ đạo, sprite đứng/đi của Cuội dùng lại tài nguyên có sẵn.

## Kiểm tra

`npm run build`, `npm run check:book`, `npm run check:book-flow`, `npm run check:gac-troi`, `npm run check:ending-progress`, `npm run check:gac-light`, `npm run check:gac-trail`.

`node scripts/check-active-friends.cjs` cần Vite tại `http://localhost:4174` (hoặc `GAME_URL`) và Chrome/Playwright sẵn có. Kiểm tra Việt/Anh, 1440px/390px: ba điểm lộ trình, ghép hai bạn, ghi nhận chuyện, ảnh giải mã được, không tràn khung game/footer và không có tên hai bạn đã bỏ trên giao diện kiểm tra.


### Chuyển cảnh dẫn đường sau T02

- Sau khi xem ảnh và nghe câu chuyện ánh sáng, Gác Trời mời Cuội đi tìm chị Hằng.
- `t03-walk`: người chơi điều khiển Cuội tới mép phải để sang màn thắp đèn. Lưu/tải lại giữ đúng bước này.
- `t03-map`: bầu trời và Gác Trời giữ sáng; nền chuyển mượt từ sáng qua tối tới đen ở nửa dưới. Cuội và ba đèn hiện mờ, ánh đèn dao động nhẹ chu kỳ 5 giây (tắt hiệu ứng khi giảm chuyển động).
- Thắp đủ ba đèn: cảnh sáng dần trong 1,8 giây, tự mở `gac-farewell` sau 2,2 giây, không cần bấm nút tiếp. Mở menu sẽ tạm dừng chuyển hội thoại.
- Sau cuộc trò chuyện mới về lộ trình, giữ nguyên điều kiện mở điểm đi tìm chị Hằng.
