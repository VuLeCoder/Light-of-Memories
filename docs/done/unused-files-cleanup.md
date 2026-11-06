# Dọn tài nguyên không còn dùng — 06/11/2026

Xóa 12 ảnh khỏi `public/`, tổng cộng **3.937.313 byte (3,75 MiB)**. Không sửa mã chạy, CSS, cấu hình, dependency hoặc định dạng save.

## Căn cứ

- Tuyến đang đăng ký chỉ gồm Surveyor 3, Lấp Lánh và Gác Trời. Catalog sách hiện có 26 trang, không còn chương Tai Thính/Bánh Lưới.
- Kiểm tra tên file trong toàn bộ mã nguồn và các đường dẫn ghép động, gồm metadata ảnh Gác Trời, catalog sách và ảnh T02. Không có ảnh bị xóa nào còn được gọi.
- Kế hoạch kết truyện M0 không dùng lại bộ ảnh Tai Thính/Bánh Lưới/Apollo 17. Giữ chân dung Hằng và tài nguyên phục vụ các mốc tiếp theo.
- Tất cả module TypeScript hiện vẫn có đường import từ entry point. Giữ nguyên các module vẽ cảnh cũ và chân dung còn được khai báo; loại chúng đòi hỏi sửa mã chạy và nằm ngoài lượt dọn thận trọng này.
- Giữ tài liệu thiết kế, hồ sơ nguồn ảnh, ảnh chụp bàn giao, kiểm thử và giấy phép font. Những tham chiếu ảnh cũ trong hồ sơ lịch sử không có nghĩa là ảnh còn trong bản phát hành.

## File đã xóa

Các đường dẫn dưới đây tính từ `public/`:

| Nhóm | File |
| --- | --- |
| Ảnh sách của chương cũ | `images/book/apollo12-seismogram.png` |
| | `images/book/apollo17-route.jpg` |
| | `images/book/nansen-rock.jpg` |
| | `images/book/orange-soil.jpg` |
| Bánh Lưới | `images/memories/ban-banh-luoi/apollo-17-as17-143-21933.webp` |
| | `images/memories/ban-banh-luoi/apollo-17-orbit-detail.webp` |
| | `images/memories/ban-banh-luoi/apollo-17-orbit-m168000580lr.webp` |
| | `images/memories/ban-banh-luoi/apollo-17-wheel-detail.webp` |
| Tai Thính | `images/memories/tai-thinh/apollo-12-as12-47-6916.webp` |
| | `images/memories/tai-thinh/apollo-12-as12-47-6918.webp` |
| | `images/memories/tai-thinh/apollo-12-as12-47-6921.webp` |
| Ảnh Gác Trời không còn trong metadata | `images/memories/gac-troi/apollo17-lro.webp` |

Nguồn và mô tả lịch sử vẫn ở [Game3](Game3_Apollo_12.md), [Game4](Game4_Apollo_17.md), [ghi chú sách](../../src/content/book/README.md) và lịch sử Git.

## Kiểm chứng

- Build trước/sau: đúng 12 ảnh biến mất; **43 file còn lại trong `dist/` có cùng SHA-256**, gồm HTML, các bundle JavaScript/CSS, font và toàn bộ ảnh còn giữ. Không tên file đã xóa nào xuất hiện trong HTML/CSS/JS thành phẩm.
- `npm run build`, `npm run typecheck`: đạt. Cảnh báo kích thước chunk Phaser đã có từ trước.
- `npm run check:book`, `check:book-flow`, `check:gac-troi`, `check:ending-progress`, `check:gac-impact`, `check:gac-light`: đạt.
- `node scripts/check-active-friends.cjs`: đạt cả 4 trường hợp 1440/390 px × Việt/Anh; kiểm tra lộ trình, T01, T02, chuyển save cũ, chơi lại, ảnh lỗi và tràn khung; không lỗi JavaScript.
- `git diff --check`: đạt.
