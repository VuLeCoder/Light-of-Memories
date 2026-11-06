# Tổng quan dự án Cuội

Cập nhật **06/11/2026**, sau M4 và thay cách chơi T02. Đây là điểm vào tài liệu hiện tại; hồ sơ Game3/Game4 trong `done/` mô tả các màn lịch sử đã rời tuyến chơi.

## Trạng thái sản phẩm

Game sách tranh cho trẻ tiểu học, kết hợp Trung Thu và thiết bị khoa học trên Mặt Trăng. Phần mở đầu có An và bà, Cuội thức dậy, trò chuyện với Cây Đa và nhận đèn ông sao.

Tuyến hiện tại gồm **Mắt Tròn / Surveyor 3 → Lấp Lánh / Apollo 11 → Gác Trời / LRO**. Đèn giữ hình năm cánh, sáng lần lượt 0/1/3/5 cánh; HUD đếm ba người bạn. Tai Thính và Bánh Lưới không có lối vào trong game hiện tại.

- Mắt Tròn: nhận biết dụng cụ, đào ảnh ký ức, nhật ký và kết riêng.
- Lấp Lánh: lau bụi, phản xạ, đo khoảng cách và kết riêng.
- Gác Trời: T01 ghép ký ức; T02 xem đồng thời hai ảnh Trước/Sau, chọn vùng 1–2–3 có đốm mới; T03 đối chiếu hai thời điểm để ghi ba mốc đường; tạm biệt và thắp đủ đèn.
- T04: đi theo triền thấp, nhận ra khối đá và ngọn đèn thấp, đến cây đa và gặp chị Hằng. Năm lượt thoại gặp lại được lưu theo checkpoint.
- Sau cuộc gặp, game nghỉ tại `cards-intro`. M5 thẻ câu chuyện và M6 cảnh kết An–bà chưa triển khai. Hoàn thành Gác Trời không đồng nghĩa hoàn thành toàn câu chuyện.

Sách hiện có **26 trang chuẩn, 52 khối nội dung Việt/Anh**; phân trang theo màn hình có thể tạo thêm trang hiển thị. Sách mở theo tiến trình, có gợi ý, nguồn ảnh và dữ liệu xuất bản độc lập bản lưu. Gợi ý không tự giải thử thách.

## Công nghệ và cấu trúc

| Thành phần | Vai trò |
| --- | --- |
| React 19 / TypeScript / CSS | Giao diện, sách, hội thoại, tiến trình và focus |
| Phaser 3.90 | Canvas 960 × 540, cảnh pixel, sprite, di chuyển |
| Vite 6 | Dev/build và tải module cho kiểm tra dữ liệu |
| `src/App.tsx` | Điều phối cảnh, menu, lộ trình và tiến trình |
| `src/content/levels/` | Nội dung Việt/Anh, luật và trạng thái từng màn |
| `src/content/book/` | Catalog, phân loại và thứ tự đọc/xuất bản |
| `src/components/` | Hội thoại, thử thách, sách và T04 |
| `src/game/` | Cầu React–Phaser, input, cảnh và hiệu ứng |
| `src/focus/game-focus.ts` | Điều phối focus trong game |
| `src/state/progress.ts` | Đọc/lưu và chuyển phiên bản bản lưu |
| `public/` | Ảnh, sprite và font cục bộ |
| `api/visitors.js` | Bộ đếm truy cập dùng Upstash Redis trên Vercel |
| `scripts/` | Kiểm tra dữ liệu và hồi quy trình duyệt |

React giữ trạng thái câu chuyện; Phaser xử lý chuyển động và báo tương tác. Không lưu tọa độ hoặc đồng hồ mỗi frame vào tiến trình. Cách chạy và build xem [README](../README.md).

## Bố cục, điều khiển và lưu

Game bên trái, sách giấy kem bên phải; màn hẹp xếp sách xuống dưới. Cảnh pixel, chân dung màu vẽ, nền xanh đêm và điểm nhấn vàng. T02 xếp hai ảnh trên–dưới khi hẹp; T04 giữ cảnh 16:9 và đặt chữ/nút phía dưới trong luồng trang.

A/D, mũi tên hoặc chạm đất để đi; E hoặc bấm vật để tương tác; Space/Enter tiếp tục thoại. Các bài HTML có nút riêng và hướng dẫn theo chặng. Menu tạm dừng; bấm sách hoặc ra ngoài nhả bàn phím game.

Các khóa localStorage là `cuoi.language`, `cuoi.sound`, `cuoi.progress`. Schema **v18** đọc v1–v18; Gác Trời revision 2. Save cảnh đã bỏ trở về lộ trình và giữ thành tích hợp lệ. Chơi lại Gác Trời giữ thành tích và sách đã mở, nhưng lượt chơi mới vẫn phải hoàn thành các bước để vào T04. Không đồng bộ giữa thiết bị.

## Công việc còn lại và giới hạn

M5 triển khai thẻ câu chuyện; M6 khép lại hành trình và cảnh An–bà. Các hàm dữ liệu cho checkpoint sau M4 đã có, nhưng giao diện chưa mở. Xem lại kết truyện mới có con trỏ dữ liệu riêng. Chưa có tải PDF; công tắc âm thanh chỉ lưu lựa chọn, chưa phát nhạc/hiệu ứng. Build còn cảnh báo kích thước chunk Phaser.

Các báo cáo trình duyệt dùng Chromium, bàn phím và chạm giả lập; chưa thay cho thử với trẻ em, thiết bị thật, Safari/Firefox hoặc trình đọc màn hình. Kết quả lịch sử trong hồ sơ từng milestone không phải lượt kiểm tra mới cho mọi thay đổi sau đó.

## Tài liệu chính

- [Tuyến ba người bạn](three-friends-journey.md)
- [M1: tiến trình](done/M1_Gac_Troi_progress.md), [M2: T02 ban đầu](done/M2_T02.md), [T02 hiện tại](done/T02_CACH_CHOI_MOI.md)
- [M3: T03 và kết Gác Trời](done/M3_T03.md), [M4: T04 và gặp chị Hằng](done/M4_T04.md)
- [Mắt Tròn](done/Game1_Surveyor_3.md), [Lấp Lánh](done/Game2_Apollo_11.md)
- [Sách đồng hành](../src/content/book/README.md), [hướng dẫn thiết kế màn](Huong-dan-AI-thiet-ke-man-choi-moi.md)
- [Phong cách hình ảnh](visual-style.md), [quy ước ảnh](image-assets.md), [kiểm kê ban đầu](assets-inventory.md)
- [Dọn kiểm thử và cập nhật tài liệu](done/test-files-cleanup.md)
