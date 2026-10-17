# Review mã nguồn — 17/10/2026

Phạm vi: luồng React–Phaser, hội thoại, lưu tiến trình, input/focus, CSS, bản dịch, đường dẫn ảnh và tài liệu. Đây là review mã nguồn kèm build và xác minh logic lưu; chưa xác nhận toàn bộ hành vi bằng trình duyệt hoặc thiết bị thật.

## Phát hiện đã xử lý

| Mức độ | Vấn đề và tác động | Thay đổi |
| --- | --- | --- |
| Vừa | Tải lại trong hai câu dẫn sau khi Cuội tỉnh dậy: `moon-story` bị lưu thành `awake`, tiếp tục sẽ vào di chuyển ngay và mất lời dẫn chưa đọc | Thêm mốc `moon-story` vào bộ đọc/ghi trong `src/state/progress.ts`. Giữ schema 1 và đọc được các mốc cũ |
| Nhẹ | `menuButton` chỉ được gán ref, không có nơi đọc; `missingAssets` là danh sách không được dùng | Bỏ hai khai báo trong App và assets |
| Nhẹ | CSS `.scene-tabs`, `.preview-label`, `.scene-caption` thuộc các bố cục cũ, không còn phần tử sử dụng | Xóa các rule tương ứng, giữ rule chung còn dùng như `.scene-number` |
| Nhẹ | README dẫn tới `docs/dialogue-an-ba.md` không tồn tại; chú thích sprite chỉ mô tả mốc đầu dù đã có hoạt ảnh | Sửa liên kết và chú thích, thêm mục lục tài liệu bàn giao |

## Các điểm còn cần chú ý

### Vừa — Bàn phím trong menu và bảng kết thúc chưa được bao phủ đầy đủ

Ở `src/App.tsx`, handler trên `.game-stage` chỉ chặn phím khi `event.target === event.currentTarget`. `GameCanvas` và `EarthDialogue` có handler riêng, nhưng `GameMenu` và bảng hoàn thành chưa có. Khi focus vào heading menu hoặc nút bên trong, phím mũi tên có thể cuộn trang; Space trên heading cũng chưa bị chặn.

Đây là khoảng trống so với yêu cầu chặn tác động lên web khi focus game. Cần handler dành cho menu/bảng kết thúc: giữ Enter/Space kích hoạt nút chuẩn, chặn cuộn trang không mong muốn, vẫn cho Tab rời game. Menu có `overflow:auto`, nên cần xác minh trên màn hình nhỏ để không làm mất khả năng cuộn nội dung menu bằng bàn phím. Chưa thay hành vi này trong đợt dọn mã và viết tài liệu.

### Nhẹ — CSS tích lũy nhiều lớp ghi đè

`src/styles.css` vẫn có các khai báo `.book-sheet`, `.dialogue`, `.introduction` ở nhiều đoạn. Một số là breakpoint hợp lệ; một số là cấu hình cũ được ghi đè phía sau. Điều này làm khó xác định quy tắc thực sự có hiệu lực. Đợt này chỉ bỏ selector chắc chắn không còn dùng; nên gom theo component ở lần refactor riêng, đối chiếu ảnh trước/sau trên các kích thước màn hình.

### Nhẹ — Chiều cao sách và game chỉ khớp trong bố cục canvas chuẩn

Trang sách dùng aspect ratio để khớp canvas ở tỉ lệ cột 7:3. Menu đặt `min-height` từ 420 đến 640px tùy breakpoint, còn hướng dẫn được thêm dưới canvas. Vì vậy không thể coi sách luôn bằng toàn bộ panel game. Đây là giới hạn hiện có cần thống nhất nếu muốn căn bằng trong mọi trạng thái.

### Nhẹ — Font và chi phí tải

- CSS gọi Lora và Be Vietnam Pro nhưng không có font file hoặc nguồn tải; máy không có các font này dùng font dự phòng. Hình dáng chữ và xuống dòng có thể khác nhau giữa thiết bị.
- Build hiện báo Phaser khoảng 1.48 MB minified, khoảng 340 KB gzip. Đã tách chunk; đây là cảnh báo kích thước, không phải lỗi build. Cần đo tải trên thiết bị/mạng mục tiêu trước khi đổi cách đóng gói.

### Bảo trì nội dung

`EarthDialogue` thực tế dùng cho mọi đoạn thoại; `PreviewScene` đã xử lý gameplay thật. Tên hiện tại chưa làm sai chức năng nhưng có thể đổi khi refactor. Bản dịch Anh của đoạn Cây Đa/lên đường đang ghép theo chỉ số mảng, dễ lệch khi thêm hoặc đổi thứ tự câu; nên chuyển sang ánh xạ theo `id` như đoạn An–bà. Một vài nhãn cũ như `earth.tab`, `moon.tab`, `ground`, `bench`, `tree` chưa có nơi hiển thị; không ảnh hưởng gameplay.

## Các phần chưa dựng, không phải mã thừa

- Sách là placeholder, chưa có nội dung theo chương.
- Công tắc âm thanh lưu lựa chọn nhưng chưa phát nhạc; giao diện đã báo rõ.
- Chỉ báo đèn 0/5 và kết thúc trước Mắt Tròn là phạm vi mở đầu, chưa có hệ thống thu thập tiếp theo.
- Chân dung Chị Hằng và Mắt Tròn vẫn giữ để làm nội dung kế tiếp; không xóa chỉ vì chưa xuất hiện trong cảnh chơi hiện tại.

## Kết quả xác minh

- `npm run build`: đạt, gồm kiểm tra TypeScript và Vite build; còn cảnh báo kích thước chunk Phaser.
- Chạy kiểm tra logic lưu trực tiếp trong bộ nhớ: vòng đọc/ghi các chặng, `moon-story`, giữ hoàn thành khi khám phá tiếp, tương thích mốc cũ, JSON hỏng, phiên bản lạ, localStorage bị chặn: đạt.
- `git diff --check`: đạt.
- Không thêm file test vào mã nguồn. Chưa chạy xác minh tương tác/ảnh chụp trình duyệt; kết quả build không thay thế đánh giá bố cục, cảm giác điều khiển hay khả năng đọc trên điện thoại.
