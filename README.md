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

Ba màn đã hoàn thiện: **Surveyor 3 — Mắt Tròn**, **Apollo 11 — Lấp Lánh**, **Apollo 12 — Tai Thính**, gồm thử thách, ảnh tư liệu, sách và đoạn kết. Mỗi người bạn thắp một cánh đèn; hai người bạn cuối còn bí ẩn.

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

# Kiểm tra TypeScript và tạo bản build
npm run build

# Xem bản build trên máy, sau khi build thành công
npm run preview
```

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

### Điều khiển và lưu hành trình

- Bấm vào game để dùng bàn phím. Game giữ focus qua hội thoại/thử thách và nhả khi chuyển sang sách hoặc bấm ra ngoài.
- **A / D** hoặc **← / →** để di chuyển; có thể bấm mặt đất để đi tới.
- **Space / Enter** để hiện hết hoặc tiếp tục hội thoại.
- **E** khi đứng gần vật hoặc người bạn để tương tác; có thể bấm trực tiếp. Các chặng đào đất/đi có chiều sâu có hướng dẫn riêng ở footer.
- Mở menu sẽ tạm dừng tương tác trong game.

Tiến trình, ngôn ngữ và lựa chọn âm thanh được lưu bằng `localStorage` trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị. Khi tải lại trang, chọn **Tiếp tục** trong menu để trở về mốc đã lưu. Tiến trình schema v5 lưu riêng từng màn và đọc được bản v1–v4; lượt thoại được giữ theo quy tắc từng chặng. Xóa dữ liệu website sẽ mất bản lưu. Nếu trình duyệt chặn lưu trữ, game vẫn chơi được trong phiên.

### Những phần đang phát triển

- Người bạn thứ tư/thứ năm và cảnh gặp lại chị Hằng chưa được chốt. Hiện có ba cánh sao qua ba màn đã triển khai.
- Chưa có phần thưởng kỹ năng hoặc thẻ bạn.
- Công tắc âm thanh hiện chỉ lưu lựa chọn, chưa phát nhạc hoặc hiệu ứng.
- Font sử dụng bộ có sẵn trên máy và font dự phòng, nên có thể khác nhau giữa thiết bị.
- Bản build còn cảnh báo kích thước gói Phaser; các giới hạn đã biết được ghi trong tài liệu từng màn.

### Tài liệu tham khảo

- [Tổng quan và mục lục tài liệu](docs/project-overview.md)
- [Game1 — Mắt Tròn](docs/done/Game1_Surveyor_3.md)
- [Game2 — Lấp Lánh](docs/done/Game2_Apollo_11.md)
- [Game3 — Tai Thính](docs/done/Game3_Apollo_12.md)
- [Hướng dẫn AI thiết kế màn chơi mới](docs/Huong-dan-AI-thiet-ke-man-choi-moi.md)
- [Phong cách hình ảnh và hướng dẫn sinh ảnh cho AI](docs/visual-style.md)
- [Quy ước thư mục ảnh](docs/image-assets.md)
- [Kiểm kê ảnh và thông tin sprite](docs/assets-inventory.md)
