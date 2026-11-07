# Tổng quan dự án Cuội

Cập nhật **06/11/2026**, sau M4 và thay cách chơi T02. Đây là điểm vào tài liệu hiện tại; hồ sơ Game3/Game4 trong `done/` mô tả các màn lịch sử đã rời tuyến chơi.

## Trạng thái sản phẩm

Game sách tranh cho trẻ tiểu học, kết hợp Trung Thu và thiết bị khoa học trên Mặt Trăng. Phần mở đầu có An và bà, Cuội thức dậy, trò chuyện với Cây Đa và nhận đèn ông sao.

Tuyến hiện tại gồm **Mắt Tròn / Surveyor 3 → Lấp Lánh / Apollo 11 → Gác Trời / LRO**. Đèn giữ hình năm cánh, sáng lần lượt 0/1/3/5 cánh; HUD đếm ba người bạn. Tai Thính và Bánh Lưới không có lối vào trong game hiện tại.

- Mắt Tròn: nhận biết dụng cụ, đào ảnh ký ức, nhật ký và kết riêng.
- Lấp Lánh: lau bụi, phản xạ, đo khoảng cách và kết riêng.
- Gác Trời: giữ T01 ghép ký ức và T02 chọn vùng có đốm mới; tiếp theo là chuyện thật LROC lập bản đồ ánh sáng, rồi cầu nối cổ tích.
- Hành trình Thỏ Ngọc: tìm Thỏ và đánh thức bốn sao qua triền thấp, khe đá, cây đa; gặp Hằng (4 lượt), cảm ơn Gác Trời (5 lượt), nhận ánh sáng cuối ở lượt 3 → 4.
- Cảnh nghỉ dưới cây có Chat (3 lượt, không đổi save), sách, lộ trình và chơi lại. Không dẫn vào thẻ hay kết An–bà. Xem [GT-R3](done/GT-R3-gap-Hang-va-ket-Gac-Troi.md); kiểm tra toàn diện GT-R4 còn lại.

Sách hiện có **26 trang chuẩn, 49 khối nội dung Việt/Anh**; phân trang theo màn hình có thể tạo thêm trang hiển thị. Sách mở theo tiến trình, có gợi ý, nguồn ảnh và dữ liệu xuất bản độc lập bản lưu. Gợi ý không tự giải thử thách. Mục lục cho phép chọn nhanh trang; đáp án đo khoảng cách chỉ hiện khi mở phần xem đáp án. Xem [đợt chỉnh sách](done/book-content-review.md).

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

A/D, mũi tên hoặc chạm đất để đi; E hoặc bấm vật để tương tác; Space/Enter tiếp tục thoại. Các bài HTML có nút riêng và hướng dẫn theo chặng. Menu tạm dừng; bấm sách hoặc ra ngoài nhả bàn phím game. Giữ chiều cao màn chơi ổn định khi mở/đóng menu: menu lấy đúng chiều cao game trước khi tạm dừng; phản hồi tương tác không được làm giãn màn chơi.

Các khóa localStorage là `cuoi.language`, `cuoi.sound`, `cuoi.progress`. Schema **v18** đọc v1–v18; Gác Trời revision 3. Save cảnh đã bỏ trở về lộ trình và giữ thành tích hợp lệ. Chơi lại Gác Trời giữ thành tích và sách đã mở, nhưng lượt chơi mới vẫn phải hoàn thành các bước của hành trình Thỏ Ngọc. Không đồng bộ giữa thiết bị.

Nút **Tải PDF** ở mép phải dòng “Trang sách bên bạn” tải toàn bộ 26 trang nội dung gốc (49 khối, số trang PDF tùy cách dàn), kể cả nội dung chưa mở, theo ngôn ngữ đang chọn. Phần kiến thức ở trước; trò chơi, hư cấu, gợi ý và đáp án ở phụ lục, sau đó là nguồn tham khảo. PDF dàn theo khung hình–lời dẫn, đọc từ trái sang phải và từ trên xuống, có bìa minh họa, ảnh, sơ đồ, mục lục và số trang. Mỗi khung giữ liền lời dẫn, hình và chú thích. Thao tác này không đổi tiến độ hoặc các trang sách đã mở; bộ tạo PDF và font chỉ tải khi bấm nút.

## Công việc còn lại và giới hạn

M5 triển khai thẻ câu chuyện; M6 khép lại hành trình và cảnh An–bà. Các hàm dữ liệu cho checkpoint sau M4 đã có, nhưng giao diện chưa mở. Xem lại kết truyện mới có con trỏ dữ liệu riêng. Công tắc âm thanh chỉ lưu lựa chọn, chưa phát nhạc/hiệu ứng. Build còn cảnh báo kích thước chunk Phaser và bộ tạo PDF tải riêng.

Các báo cáo trình duyệt dùng Chromium, bàn phím và chạm giả lập; chưa thay cho thử với trẻ em, thiết bị thật, Safari/Firefox hoặc trình đọc màn hình. Kết quả lịch sử trong hồ sơ từng milestone không phải lượt kiểm tra mới cho mọi thay đổi sau đó.

## Tài liệu chính

- [Kế hoạch âm thanh bằng nhạc cụ truyền thống Việt Nam](plan/am-thanh-nhac-cu-viet-nam.md) — ý tưởng và milestones AT-0–AT-3, chưa triển khai.
- [Tuyến ba người bạn](three-friends-journey.md)
- [M1: tiến trình](done/M1_Gac_Troi_progress.md), [M2: T02 ban đầu](done/M2_T02.md), [T02 hiện tại](done/T02_CACH_CHOI_MOI.md)
- [M3: T03 và kết Gác Trời](done/M3_T03.md), [M4: T04 và gặp chị Hằng](done/M4_T04.md)
- [Mắt Tròn](done/Game1_Surveyor_3.md), [Lấp Lánh](done/Game2_Apollo_11.md)
- [Sách đồng hành](../src/content/book/README.md), [hướng dẫn thiết kế màn](Huong-dan-AI-thiet-ke-man-choi-moi.md)
- [Phong cách hình ảnh](visual-style.md), [quy ước ảnh](image-assets.md), [kiểm kê ban đầu](assets-inventory.md)
- [Dọn kiểm thử và cập nhật tài liệu](done/test-files-cleanup.md)

## Tìm chị Hằng — tương tác với đá (prompt 2)

Mỗi chặng có bốn tảng đá: một giấu Thỏ Ngọc, một có quà, hai tảng còn lại phản hồi nhẹ nhàng khi tìm. Điều khiển Cuội bằng WASD/mũi tên rồi nhấn E ở tảng gần nhất; trên cảm ứng, chạm đá để Cuội đi tới và tìm. Không bắt buộc nhận gợi ý để tìm được Thỏ. Nút Gợi ý/phím H cho lời chỉ vị trí Thỏ; sau khi tìm được Thỏ, Gác Trời chỉ quà còn lại hoặc hướng đi tiếp. Thỏ cũng nhắc chỗ giấu quà khi được tìm thấy. Quà tùy chọn, lấy trước hoặc sau khi gặp Thỏ; người chơi phải đi sang phải và tương tác để sang chặng tiếp theo. Lưu vẫn dùng v18, giữ tương thích lượt chơi cũ. Hoạt ảnh chạy của Thỏ chờ prompt 3.

Kiểm tra prompt 2: build và `node scripts/check-rabbit-peekaboo.mjs` đạt (gợi ý tùy chọn, quà trước/sau/bỏ qua, sự kiện lặp/sai chặng, lưu/đọc và chơi lại). Chromium kiểm tra ba chặng ở 960px/VI và 360px/EN: đá trống, tìm trực tiếp, quà, chủ động đi tiếp và chiều cao ổn định. Toàn ứng dụng kiểm tra mở/đóng menu và hiện gợi ý ở 1440/760/390px, chiều cao giữ nguyên. `check:ending-progress` còn lỗi kỳ vọng cũ tại dòng 81: chờ `t03-map` thay vì bước `t03-walk` đang có; chưa cập nhật bài kiểm tra tuyến cũ trong prompt này.

Hướng dẫn tìm sau đá nằm ở footer; nút Gợi ý (phím H) mở hội thoại Gác Trời. Khi tìm thấy Thỏ, người chơi đọc lời Thỏ rồi nhấn Tiếp tục để Thỏ chạy; Cuội tạm dừng trong hội thoại. Giữ hàng hội thoại trên màn hình nhỏ để chiều cao game/menu không đổi.
