# Tổng quan dự án Cuội

Cập nhật **28/10/2026**. Đây là điểm vào tài liệu hiện tại. Mỗi màn có một bản tổng hợp chính; các kế hoạch và bàn giao Game3/Game4 đã được hợp nhất để tránh mô tả khác nhau.

## Tài liệu cần đọc

| Tài liệu | Nội dung |
| --- | --- |
| [Game1 — Surveyor 3 / Mắt Tròn](done/Game1_Surveyor_3.md) | Lịch sử, sách, dụng cụ, đào ảnh, nhật ký và đoạn kết; mẫu cấu trúc cho các màn |
| [Game2 — Apollo 11 / Lấp Lánh](done/Game2_Apollo_11.md) | T01–T04, hai ảnh, phản xạ/đo khoảng cách, cánh sao thứ hai |
| [Game3 — Apollo 12 / Tai Thính](done/Game3_Apollo_12.md) | T01–T04, ba ảnh, khoa học/nguồn, sách, trạng thái, bàn giao M0–M8 |
| [Game4 — Apollo 17 / Bánh Lưới](done/Game4_Apollo_17.md) | T01–T03, hai ảnh, bản đồ/pin/đi bộ, camera, cánh thứ tư và bàn giao M7 |
| [Hướng dẫn AI thiết kế màn mới](Huong-dan-AI-thiet-ke-man-choi-moi.md) | Quyết định chung, văn phong, UI, sách, focus, hậu kết và tích hợp |
| [Phong cách hình ảnh](visual-style.md) | Màu, nét vẽ, sprite, chân dung và bố cục |
| [Quy ước ảnh](image-assets.md), [kiểm kê tài nguyên ban đầu](assets-inventory.md) | Thư mục, tài nguyên và thông tin crop sprite |
| [Logo](logo.md) | Thiết kế nhận diện nhóm |

## Trạng thái sản phẩm

Game sách tranh cho trẻ tiểu học, kết hợp Trung Thu và thiết bị khoa học trên Mặt Trăng. Phần mở đầu gồm An/bà, Cuội thức dậy, trò chuyện với Cây Đa và nhận đèn ông sao. Sau dấu chân là **lộ trình năm ánh sao**.

Bốn màn đã triển khai: Mắt Tròn → Lấp Lánh → Tai Thính → Bánh Lưới. Mỗi màn có bài chơi, ảnh/sách và kết thắp một cánh đèn. Màn sau mở theo dấu hoàn thành lần đầu của màn trước; tối đa hiện có **4/5**. Chơi lại không làm mất quyền vào màn sau hoặc cộng thêm sao.

Lộ trình có năm điểm; điểm thứ năm còn bí ẩn. Chọn điểm nào thì nhãn Cuội theo điểm đó. Nút vào điểm chưa có nội dung ẩn nhưng vẫn dành chỗ, thông báo giữ chiều cao để bố cục không giật.

Hậu kết cả bốn màn cho Cuội đi lại và trò chuyện với bạn. Bạn cảm ơn, gợi dấu hiệu phía phải; đi tới đó về lộ trình. Mắt Tròn có điểm sáng, Lấp Lánh có vòng gợn, Tai Thính có hai vệt bánh xe gợi Bánh Lưới. Bánh Lưới gợi một người bạn trên cao, còn vệt sáng mặt đất phía phải dẫn về lộ trình. Có nút xem lại kết/chơi lại/về lộ trình; xem kết Bánh Lưới chiếu lại cả ánh sáng cánh thứ tư mà không ghi thêm phần thưởng.

Sách có nội dung theo tiến trình, nhóm theo người bạn, ảnh và nguồn; văn ngôi thứ ba như Mắt Tròn. Game và sách có đủ Việt/Anh. Công tắc âm thanh hiện lưu lựa chọn; các bài Tai Thính không phụ thuộc âm thanh.

## Công nghệ và cấu trúc

| Thành phần | Vai trò |
| --- | --- |
| React 19 / TypeScript / CSS | Giao diện, câu chuyện, sách, điều phối và focus |
| Phaser 3.90 | Canvas 960 × 540, nền pixel, sprite, di chuyển, hiệu ứng |
| Vite 6 | Dev/build; TypeScript kiểm tra trước build |
| `src/content/levels/` | Định nghĩa người bạn, nội dung Việt/Anh, tiến trình từng màn |
| `src/components/` | Thoại, lộ trình/sách, các bài và đoạn kết |
| `src/game/` | Cầu React–Phaser, input, cảnh, nền và vị trí |
| `src/focus/game-focus.ts` | Chọn đích focus chung trong game |
| `src/state/progress.ts` | Lưu/đọc và tương thích bản lưu |
| `public/images/`, `public/assets/` | Ảnh, sprite và tư liệu cục bộ |
| `api/visitors.js` | Bộ đếm truy cập dùng Upstash Redis trên Vercel |
| `docs/` | Tài liệu chính, nguồn và hướng dẫn thiết kế |

React là nguồn trạng thái truyện; Phaser xử lý chuyển động và báo tương tác. Không tạo thêm một bản tiến trình riêng trong Phaser. Cách chạy và build xem [README](../README.md).

## Bố cục, điều khiển và lưu

Desktop game bên trái, sách giấy kem bên phải; màn hẹp xếp sách/panel xuống dưới. Màu xanh đêm, vàng dịu, chân dung màu vẽ và cảnh pixel. Chữ/nút có kích thước đọc và thao tác được; nội dung dài chia trang hoặc rút ngắn.

A/D, mũi tên hoặc chạm đất để đi; các chặng có chiều sâu dùng thêm W/S hoặc lên/xuống. E hoặc bấm bạn để tương tác. Space/Enter hiện hết/tiếp tục thoại. Bài HTML dùng nút/biểu mẫu riêng; footer nêu cách điều khiển theo chặng.

Focus theo game qua chuyển thoại/bài/ảnh/hậu kết khi đang chơi, kể cả nút cũ bị gỡ hoặc khóa. Không giành focus từ ô nhập/sách; bấm ngoài, Tab ra ngoài hoặc đổi cửa sổ sẽ nhả bàn phím. Menu tạm dừng, tiếp tục bỏ phím/đích đi cũ.

Các khóa localStorage: `cuoi.language`, `cuoi.sound`, `cuoi.progress`. Schema tiến trình hiện **v10**, đọc v1–v10; lưu mốc mở đầu và tiến trình riêng từng màn, gồm phase/lượt thoại/ảnh/đáp án/dấu hoàn thành. Không đồng bộ giữa thiết bị. Không dùng reset toàn hành trình khi nâng schema.

## Phần chưa chốt và giới hạn

Người bạn thứ năm và cảnh gặp lại chị Hằng chưa được duyệt. Chưa xác nhận danh tính người bạn trên cao. Vá chắn bùn, bản đồ bổ sung và âm thanh của Bánh Lưới nằm ngoài bản đầu; không tự thêm vào điều kiện hoàn thành.

Chưa có hệ thống kỹ năng hoặc thẻ bạn. Kiểm thử triển khai chủ yếu trên Chromium, chạm giả lập và Việt/Anh màn rộng/hẹp; chưa thay cho thử với học sinh, thiết bị thật, Safari/Firefox hoặc trình đọc màn hình. Font có fallback, build có cảnh báo kích thước chunk Phaser. Phạm vi kiểm tra cụ thể nằm trong tài liệu từng màn.
