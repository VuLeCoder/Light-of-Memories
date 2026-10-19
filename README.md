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

Game nằm bên trái, sách đồng hành bên phải; phần giới thiệu nằm bên dưới. Trên màn hình nhỏ, sách chuyển xuống dưới game. Nội dung sách, chương tiếp theo và âm thanh vẫn đang chờ phát triển.

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
| `src/components/` | Menu và hộp hội thoại |
| `api/visitors.js` | API đếm trình duyệt truy cập, lưu chung trên Redis |
| `src/game/` | Vòng đời Phaser, cảnh game, hoạt ảnh, di chuyển và tương tác |
| `src/content/` | Hội thoại, bản dịch Việt/Anh, khai báo ảnh và tọa độ cắt sprite |
| `src/state/progress.ts` | Đọc và lưu tiến trình |
| `src/styles.css` | Giao diện và bố cục theo kích thước màn hình |
| `public/images/` | Toàn bộ ảnh, chia thành `branding/`, `portraits/`, `sprites/` |
| `docs/` | Tài liệu kỹ thuật, hình ảnh và review mã nguồn |

Ảnh mới đặt trong `public/images/` và khai báo qua `src/content/assets.ts`. Khi thay sprite sheet, cần cập nhật tọa độ cắt frame và điểm đặt chân để hoạt ảnh không lệch vị trí. Khi thêm nội dung, bổ sung cả bản tiếng Việt và tiếng Anh.

### Điều khiển và lưu hành trình

- Bấm vào màn hình game trước khi dùng bàn phím.
- **A / D** hoặc **← / →** để di chuyển; có thể bấm mặt đất để đi tới.
- **Space / Enter** để hiện hết hoặc tiếp tục hội thoại.
- **E** khi đứng gần ghế đá để tương tác; có thể bấm trực tiếp vào ghế.
- Mở menu sẽ tạm dừng tương tác trong game.

Tiến trình, ngôn ngữ và lựa chọn âm thanh được lưu bằng `localStorage` trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị. Khi tải lại trang, chọn **Tiếp tục** trong menu để trở về mốc đã lưu; hội thoại đang dở bắt đầu lại từ đầu đoạn. Xóa dữ liệu website sẽ mất bản lưu. Nếu trình duyệt chặn lưu trữ, game vẫn chơi được trong phiên.

### Hành trình năm người bạn

- Mắt Tròn: khám phá dụng cụ, đào ba ảnh ký ức và ghép nhật ký.
- Bánh Bụi: nhận diện dấu bánh xe, vạch đường qua bãi đá và ghép công việc.
- Gương Nhỏ: quét ánh sáng, ngắm tia sáng và sắp xếp hành trình phản xạ.
- Cờ Nhỏ: tìm góc nhìn, ghép sáu mảnh ảnh và chọn kỷ niệm riêng.
- Bước Nhỏ: nhận diện dấu giày, đọc hướng bước chân và kể lại câu chuyện.

Bốn chương mới là truyện minh họa tương tác với nhân vật hư cấu. Hoàn thành từng chương thắp một cánh đèn và mở người bạn kế tiếp. Đủ năm cánh sao sẽ mở cuộc gặp chị Hằng. Sổ tay giữ các ký ức và lựa chọn của người chơi; tiến trình cũ được nâng cấp khi đọc.

Chạy `npm test` để kiểm tra tiến trình và quy tắc thử thách; chạy `npm run build` để kiểm tra TypeScript và build. [Kịch bản và ghi chú triển khai](docs/Kich-ban-bon-nguoi-ban-con-lai.md).

### Những phần đang phát triển

- Công tắc âm thanh hiện chỉ lưu lựa chọn, chưa phát nhạc hoặc hiệu ứng.
- Font sử dụng bộ có sẵn trên máy và font dự phòng, nên có thể khác nhau giữa thiết bị.
- Bản build còn cảnh báo kích thước gói Phaser; các hạn chế khác được ghi trong tài liệu review bên dưới.

### Tài liệu tham khảo

- [Cấu hình bộ đếm người truy cập trên Vercel](docs/visitor-counter.md)
- [Tổng quan công nghệ, tính năng và bố cục](docs/project-overview.md)
- [Phong cách hình ảnh và hướng dẫn sinh ảnh cho AI](docs/visual-style.md)
- [Quy ước thư mục ảnh](docs/image-assets.md)
- [Kiểm kê ảnh và thông tin sprite](docs/assets-inventory.md)
- [Kết quả review mã nguồn và các điểm cần cải thiện](docs/code-review.md)
