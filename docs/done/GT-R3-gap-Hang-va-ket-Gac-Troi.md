# GT-R3 — Gặp Hằng và kết Gác Trời

Hoàn thành ngày 07/11/2026. GT-R0–GT-R2 là nền tảng; GT-R4 kiểm tra toàn diện còn lại.

## Hành vi đã triển khai

- Hoàn tất lời giải T02 → chuyện thật LROC (3 câu) → cầu nối cổ tích (3 câu) → ba chặng GT-R2 → gặp Hằng (4 câu) → cảm ơn Gác Trời (5 câu) → nghỉ dưới cây.
- Mở `gacRabbitReleased`. App chọn màn theo `rabbitJourney`, kích hoạt bản lưu hợp lệ đã qua T02. Con trỏ cũ giữ để tương thích dữ liệu; không còn quyết định màn chơi của hành trình đang hoạt động.
- Hằng xuất hiện sau sao cuối; cảnh gặp lại, chia tay và nghỉ giữ Cuội, Hằng, Thỏ và đèn dưới cây. Chuyện thật tái dùng minh họa quỹ đạo; Gác Trời nói qua chân dung trong thoại.
- Ánh sáng ghi ở lần chuyển câu chia tay 3 → 4. Hình đèn đủ năm dấu sáng theo con trỏ này; thành tựu `completedOnce` bảo toàn qua tải lại/chơi lại. Không cấp thưởng khi gọi sao hoặc khi trò chuyện lại.
- Cảnh nghỉ có Trò chuyện (3 câu, con trỏ cục bộ), Mở sách, Chơi lại Gác Trời và Về lộ trình. Không dẫn tới thẻ hay phần An–bà chưa triển khai.
- Cả Việt/Anh dùng nội dung GT-R0. Giữ cơ chế bàn phím, tạm dừng và giảm chuyển động của thoại hiện có; cảnh mới có chữ/nút trong luồng trang trên màn hẹp.
- Sách giữ ID `gac-book-light`, `gac-book-light.hint`, `gac-book-map`, `gac-book-map.landmarks`. Thay hướng dẫn hai nhánh/hai thời điểm bằng tìm Thỏ, gọi sao; bản đồ ba mốc tuyến tính. Gợi ý mở đúng trang theo hành trình mới. Nguồn NASA về bản đồ cực nam đã đối chiếu ở GT-R0 được giữ cùng ranh giới khoa học/cổ tích.

## Mã và kiểm tra

- `GacRabbitStory.tsx`, `gac-rabbit-dialogue.ts`: lời dẫn, gặp lại, chia tay và trò chuyện sau kết.
- `App.tsx`, `GacTroiLevel.tsx`, `gac-troi-flow.ts`: nối từ T02, chọn màn và khôi phục focus theo chặng.
- `GacRabbitBackdrop.tsx`: hỗ trợ nền quỹ đạo, giữ vòng đời Phaser khi đổi cảnh.
- `catalog.ts`, `reading-order.ts`, `GacLightMap.tsx`: sách và bản đồ mới.

Đã đạt:

- `npm run build` (còn cảnh báo kích thước chunk Phaser đã có).
- `check:gac-rabbit`, `check:gac-troi`, `check:ending-progress`, `check:gac-light`, `check:book`, `check:book-flow`.
- `check:gac-rabbit-release`: 4 luồng trên **App thực tế**, 360/960px × VI/EN, giảm chuyển động, tắt âm. Từ T02 tới nghỉ dưới cây; kiểm tra thứ tự gặp Hằng/thưởng, tải lại ở câu đã nhận thưởng, chat không đổi save, sách đúng trang, lộ trình/quay lại, chơi lại giữ thành tựu và không tràn ngang. Ảnh `/tmp/gac-r3-{width}-{lang}.png`.
- `check:gac-rabbit-ui`: 12 luồng tương tác 320/640/960px × VI/EN × có/giảm chuyển động, bàn phím/cảm ứng, tải lại từng thao tác, pause và nhấn lặp.
- `git diff --check`.

Hai script trình duyệt cần Playwright có sẵn và Chrome ở `/usr/bin/google-chrome`. Chúng khởi chạy Vite riêng rồi đóng sau kiểm tra; không sửa bản lưu trình duyệt của người dùng. Script release dùng bản lưu thử riêng trong browser context, không bỏ qua renderer App.

GT-R4 tiếp tục hồi quy toàn bộ hai bạn trước, tổ hợp bản lưu cũ, đổi ngôn ngữ giữa cảnh và thử với trẻ nếu có điều kiện. Chưa tuyên bố đã kiểm chứng độ dễ chơi với trẻ.

## Điều chỉnh bố cục hội thoại sau Gác Trời

Hội thoại, hướng dẫn và các nút dùng chung khung cảnh với nền, theo bảng tối trong suốt của các cảnh bạn trước. Màn hình rộng đặt bảng bên trái, phía dưới thanh điều hướng; màn hình có khung cảnh không quá 800px đặt bảng phía trên vùng tương tác trong cùng khung để chữ không che thỏ/sao. Áp dụng từ chuyện thật, theo Thỏ, ba chặng, gặp Hằng, chia tay tới nghỉ dưới cây và trò chuyện lại. Không đổi lời thoại, logic tương tác hay bản lưu. Script release kiểm tra bảng nằm trong khung và mục tiêu không bị che.
