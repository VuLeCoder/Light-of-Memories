# CUỘI — Chú Cuội, chị Hằng và những người bạn bị lãng quên

## Giới thiệu

**CUỘI** là web-game kết hợp sách tranh của nhóm **Light of Memories**, hướng tới trẻ em tiểu học. Người chơi đồng hành cùng Cuội đi tìm chị Hằng, gặp gỡ những thiết bị bị bỏ lại trên Mặt Trăng và khám phá câu chuyện của chúng. Dự án kết hợp văn hóa Trung Thu Việt Nam với chủ đề khám phá không gian, lấy chiếc đèn ông sao làm biểu tượng cho ký ức và tình bạn.

Dự án được phát triển theo challenge **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**. Phong cách hình ảnh ấm áp, hoài niệm: cảnh game pixel art, giao diện xanh đêm, điểm nhấn vàng và trang sách màu giấy kem.

### Thành viên nhóm

- Lê Phạm Thế Vũ 
- Nguyễn Đức Mạnh
- Nguyễn Bảo An 
- Nguyễn Thị Thanh An
- Cao Quốc Khánh
- Vũ Lê Đức Minh

### Phiên bản hiện tại

Đã dựng phần mở đầu: hội thoại An và bà, chuyển cảnh lên Mặt Trăng, Cuội thức dậy, di chuyển, quan sát ghế đá, trò chuyện với Cây Đa và nhận đèn trước khi lên đường. Website có menu, chọn tiếng Việt / tiếng Anh và lưu tiến trình theo mốc trên trình duyệt.

Tuyến hiện tại gồm **Surveyor 3 — Mắt Tròn → Apollo 11 — Lấp Lánh → LRO — Gác Trời**. Hai chương đầu đã có thử thách và đoạn kết. Gác Trời giữ T01 ghép ký ức và T02 so sánh hai ảnh thật, sau đó kể chuyện bản đồ ánh sáng của LROC. Cuội tìm Thỏ Ngọc và đánh thức bốn đốm sao qua triền thấp, khe đá và cây đa; gặp Hằng rồi mới cảm ơn Gác Trời, nhận ánh sáng cuối và nghỉ dưới cây. Cảnh nghỉ có trò chuyện lại, mở sách, về lộ trình và chơi lại. Xem [bàn giao GT-R3](docs/done/GT-R3-gap-Hang-va-ket-Gac-Troi.md).

Game nằm bên trái, sách đồng hành bên phải; phần giới thiệu nằm bên dưới. Trên màn hình nhỏ, sách và panel chuyển xuống dưới game. Sách mở nội dung theo tiến trình, có gợi ý và nguồn ảnh.

## Cài đặt và chạy

### Yêu cầu

- Node.js 22.12+ (khuyến nghị dòng 22 LTS hoặc 24 LTS) và npm.
- Trình duyệt hiện đại có hỗ trợ WebGL hoặc Canvas.

Mở terminal tại thư mục gốc của dự án, nơi chứa `package.json`.

### Chạy khi phát triển

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`. Dừng server bằng `Ctrl+C`.

### Kiểm tra và tạo bản build

```bash
# Kiểm tra kiểu TypeScript
npm run typecheck

# Kiểm tra nội dung và điều hướng sách
npm run check:book
npm run check:book-flow

# Kiểm tra T01, chuyển save và checkpoint kết truyện
npm run check:gac-troi
npm run check:ending-progress
npm run check:gac-rabbit
npm run check:gac-light
npm run check:gac-trail

# Kiểm tra TypeScript và tạo bản build
npm run build

# Xem bản build trên máy, sau khi build thành công
npm run preview
```

Kiểm tra trình duyệt hành trình mới: `npm run check:gac-rabbit-ui` và `npm run check:gac-rabbit-release` (cần Playwright và Chrome tại `/usr/bin/google-chrome`; không thuộc bước build).

Bản build giao diện nằm trong `dist/`. Game có thể chạy trên hosting tĩnh; riêng bộ đếm người truy cập cần Vercel Function trong `api/` và database Upstash Redis.

## Các mục nổi bật

### Công nghệ và cấu trúc

Giao diện dùng **React 19 + TypeScript + CSS**, game dùng **Phaser 3**, công cụ phát triển và build là **Vite 6**.

| Đường dẫn | Nội dung |
| --- | --- |
| `src/App.tsx` | Bố cục website, menu và điều phối tiến trình câu chuyện |
| `src/components/` | Menu, hội thoại, sách/lộ trình, thử thách và đoạn kết |
| `api/visitors.js` | API đếm trình duyệt truy cập, lưu chung trên Redis |
| `src/game/` | Vòng đời Phaser, cảnh game, hoạt ảnh, di chuyển và tương tác |
| `src/content/` | Hội thoại, bản dịch Việt/Anh, khai báo ảnh và tọa độ cắt sprite |
| `src/state/progress.ts` | Đọc và lưu tiến trình |
| `src/styles.css` | Giao diện và bố cục theo kích thước màn hình |
| `public/images/`, `public/assets/` | Nhận diện, chân dung, sprite và ảnh tư liệu của các màn |
| `docs/` | Tài liệu kỹ thuật, hình ảnh và review mã nguồn |

Ảnh mới đặt trong `public/images/` và khai báo qua `src/content/assets.ts`. Khi thay sprite sheet, cần cập nhật tọa độ cắt frame và điểm đặt chân để hoạt ảnh không lệch vị trí. Khi thêm nội dung, bổ sung cả bản tiếng Việt và tiếng Anh.

Font **Lora** và **Be Vietnam Pro** được đóng gói trong `public/fonts/`, khai báo tại `src/fonts.css`, không cần cài font trên máy hay truy cập dịch vụ font bên ngoài. Các file WOFF2 giữ nguyên bộ ký tự của font gốc, gồm tiếng Việt và dấu tổ hợp. Giấy phép OFL và nguồn tải nằm trong thư mục font. Khi triển khai, cần đưa cả thư mục `dist/fonts/` lên hosting.

### Điều khiển và lưu hành trình

- Bấm vào game để dùng bàn phím. Game giữ focus qua hội thoại/thử thách và nhả khi chuyển sang sách hoặc bấm ra ngoài.
- **A / D** hoặc **← / →** để di chuyển; có thể bấm mặt đất để đi tới.
- **Space / Enter** để hiện hết hoặc tiếp tục hội thoại.
- **E** khi đứng gần vật hoặc người bạn để tương tác; có thể bấm trực tiếp. Các chặng đào đất/đi có chiều sâu có hướng dẫn riêng ở footer.
- Mở menu sẽ tạm dừng tương tác trong game.

Tiến trình, ngôn ngữ và lựa chọn âm thanh được lưu bằng `localStorage` trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị. Khi tải lại trang, chọn **Tiếp tục** trong menu để trở về mốc đã lưu. Tiến trình schema v18 đọc được bản v1–v18. Save Gác Trời v14–v17 giữ các cặp T01 và câu chuyện đã đọc; save đã qua T01 tiếp tục ở giới thiệu T02. Thành tích hợp lệ và các trang sách đã mở được giữ khi chơi lại Gác Trời. Lượt thoại được giữ theo quy tắc từng chặng. Xóa dữ liệu website sẽ mất bản lưu. Nếu trình duyệt chặn lưu trữ, game vẫn chơi được trong phiên.

### Những phần đang phát triển

Cập nhật 06/11/2026: **M4: T04 và gặp lại chị Hằng đã triển khai**. Xem [bàn giao M4](docs/done/M4_T04.md) và [cách chơi T02 mới](docs/done/T02_CACH_CHOI_MOI.md). Xem [bàn giao M3](docs/done/M3_T03.md). Xem [bàn giao M2](docs/done/M2_T02.md) và [manifest ảnh](docs/done/M2_T02_assets.json). Xem [bàn giao M1](docs/done/M1_Gac_Troi_progress.md) cho schema, migration, cổng phát hành và kiểm tra.

- M5–M6 sẽ triển khai thẻ câu chuyện và cảnh An–bà. Các checkpoint đã có nhưng màn chưa hoàn thiện chưa mở trong game.
- Xem lại kết truyện đã có con trỏ dữ liệu tạm riêng; giao diện xem lại được nối khi nội dung kết truyện hoàn thành.
- Sách đã có dữ liệu phân loại và thứ tự xuất bản; chưa có chức năng tải PDF.
- Có nhạc nền và hiệu ứng tự tổng hợp, lấy cảm hứng từ nhạc cụ Việt Nam. Dùng nút Âm thanh trong menu; nhạc bắt đầu sau thao tác và dừng theo menu/tab. Đây là âm mô phỏng, chưa dùng bản thu nhạc cụ thật.
- Bản build còn cảnh báo kích thước gói Phaser.

### Tài liệu tham khảo

- [Tổng quan và mục lục tài liệu](docs/project-overview.md)
- [Game1 — Mắt Tròn](docs/done/Game1_Surveyor_3.md)
- [Game2 — Lấp Lánh](docs/done/Game2_Apollo_11.md)
- [Game3 — Tai Thính (tài liệu lịch sử)](docs/done/Game3_Apollo_12.md)
- [Game4 — Bánh Lưới và bàn giao M7 (tài liệu lịch sử)](docs/done/Game4_Apollo_17.md)
- [Hướng dẫn AI thiết kế màn chơi mới](docs/Huong-dan-AI-thiet-ke-man-choi-moi.md)
- [Phong cách hình ảnh và hướng dẫn sinh ảnh cho AI](docs/visual-style.md)
- [Quy ước thư mục ảnh](docs/image-assets.md)
- [Kiểm kê ảnh và thông tin sprite](docs/assets-inventory.md)

Chi tiết đợt cập nhật: [Âm thanh và đoạn tìm chị Hằng](docs/done/am-thanh-va-doan-ket.md).
