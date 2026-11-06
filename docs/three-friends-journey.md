# Hành trình ba người bạn

Cập nhật 06/11/2026, sau M4 và đổi cách chơi T02.

Tuyến hiện tại: Mắt Tròn (Surveyor 3) → Lấp Lánh (Apollo 11) → Gác Trời (LRO).

- Bỏ Tai Thính và Bánh Lưới khỏi lộ trình, sách, gợi ý, ký ức và hội thoại đang chơi. Xóa các component thử thách và CSS riêng của hai bạn.
- Giữ cơ chế khám phá của Mắt Tròn, lau bụi / phản xạ / đo khoảng cách của Lấp Lánh, ghép ký ức / đọc chuyện của Gác Trời. Gác Trời giữ T01/T02; sau đó kể chuyện LROC, tìm Thỏ và gọi sao dậy qua ba chặng, gặp Hằng trước khi chia tay và nhận ánh sáng cuối.
- Lấp Lánh giới thiệu Gác Trời để Cuội hỏi đường tìm chị Hằng. Không còn dấu gợn dẫn tới Tai Thính hoặc ảnh Bánh Lưới gửi trong đoạn nối.
- Gác Trời ghép Mắt Tròn với Apollo 12 và Lấp Lánh với Apollo 11. Ghép đúng vẫn làm tối thẻ, mở chuyện và ghi vào sách; gợi ý mở sách.
- Sách có 26 trang, 52 khối nội dung Việt/Anh; không còn chương, ảnh hoặc nguồn tư liệu của hai bạn đã bỏ trong danh mục sách.
- Save v18 đọc v1–v18; Gác Trời dùng revision 3. Save ở cảnh đã bỏ trở về lộ trình; giữ tiến độ ba bạn còn lại. Lọc các ID cũ khỏi ký ức và thứ tự trong save Gác Trời. Save mới không ghi dữ liệu hai bạn đã bỏ.
- Giữ màu sắc, điều khiển, bố cục cảnh và footer. Lộ trình có ba điểm; đèn giữ hình năm cánh, số cánh sáng là 0/1/3/5 sau mỗi cuộc gặp. HUD đếm số bạn trên tổng ba bạn.
- Các nguồn cũ trong kho và nhánh vẽ canvas dùng chung chưa bị xóa hàng loạt để tránh ảnh hưởng đồ họa còn dùng; không có lối vào hai cảnh cũ trong game.

Game nghỉ dưới cây đa sau khi gặp Hằng và cảm ơn Gác Trời; có trò chuyện lại, sách, lộ trình và chơi lại. Không có lối vào thẻ hoặc kết An–bà. Xem [GT-R3](done/GT-R3-gap-Hang-va-ket-Gac-Troi.md). Dấu hoàn thành Gác Trời và hoàn thành toàn câu chuyện là hai trạng thái riêng.

## Kiểm tra

`npm run build`, `npm run check:book`, `npm run check:book-flow`, `npm run check:gac-troi`, `npm run check:ending-progress`, `npm run check:gac-light`, `npm run check:gac-trail`.

`node scripts/check-active-friends.cjs` cần Vite tại `http://localhost:4174` (hoặc `GAME_URL`) và Chrome/Playwright sẵn có. Kiểm tra Việt/Anh, 1440px/390px: ba điểm lộ trình, ghép hai bạn, ghi nhận chuyện, ảnh giải mã được, không tràn khung game/footer và không có tên hai bạn đã bỏ trên giao diện kiểm tra.
