# CUỘI — Chú Cuội, chị Hằng và những người bạn bị lãng quên

## Giới thiệu

**CUỘI** là web-game kết hợp sách tranh của nhóm **Light of Memories**, hướng tới trẻ em tiểu học. Người chơi đồng hành cùng Cuội đi tìm chị Hằng, gặp gỡ những thiết bị bị bỏ lại trên Mặt Trăng và khám phá câu chuyện của chúng. Dự án kết hợp văn hóa Trung Thu Việt Nam với chủ đề khám phá không gian, lấy chiếc đèn ông sao làm biểu tượng cho ký ức và tình bạn.

Dự án được phát triển theo challenge **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**. Phong cách hình ảnh ấm áp, hoài niệm: cảnh game pixel art, giao diện xanh đêm, điểm nhấn vàng và trang sách màu giấy kem.

Hành trình đi qua năm người bạn: **Surveyor 3 — Mắt Tròn**, **Apollo 11 — Lấp Lánh**, **Apollo 12 — Tai Thính**, **Apollo 15 — Bánh Lưới** và **LRO — Gác Trời**. Sách đồng hành mở dần theo tiến trình, kết nối câu chuyện với kiến thức và ảnh tư liệu. Website hỗ trợ **tiếng Việt / tiếng Anh**, mở truyện PDF và lưu hành trình trên trình duyệt hiện tại.

## Thành viên nhóm

- Lê Phạm Thế Vũ
- Nguyễn Đức Mạnh
- Nguyễn Bảo An
- Nguyễn Thị Thanh An
- Cao Quốc Khánh
- Vũ Lê Đức Minh

Xem [phân công và đóng góp của thành viên](docs/project/team-contributions.md). Nội dung chi tiết đang được nhóm cập nhật.

## Cài đặt và chạy

### Yêu cầu

- Node.js 22.12 trở lên và npm.
- Trình duyệt hiện đại có hỗ trợ WebGL hoặc Canvas.

Tải mã nguồn về máy và mở terminal tại thư mục gốc của dự án, nơi chứa `package.json`.

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

Bản build nằm trong `dist/` và có thể triển khai lên dịch vụ lưu trữ website tĩnh. Riêng bộ đếm người truy cập cần Vercel Function trong `api/` và Upstash Redis, với hai biến môi trường phía máy chủ `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN`. Xem [chi tiết công nghệ và triển khai](docs/development/technology-stack.md#dịch-vụ-cho-bộ-đếm-người-truy-cập).

## Nguồn, AI và công nghệ

Giao diện sử dụng **React 19, TypeScript và CSS**; cảnh game sử dụng **Phaser 3**. **Vite 6** phục vụ phát triển và build, **Web Audio API** tổng hợp nhạc nền và hiệu ứng, còn `localStorage` lưu tiến trình trên trình duyệt.

| Nội dung | Tài liệu chi tiết |
| --- | --- |
| Framework, thư viện, công cụ và dịch vụ | [Công nghệ sử dụng](docs/development/technology-stack.md) |
| Nguồn khoa học và ảnh tư liệu | [Nguồn tham khảo](docs/references.md) |
| Nguồn tài nguyên, phông chữ và giấy phép đi kèm | [Tài nguyên trong public](docs/README.md#tài-nguyên-tĩnh) |
| Công cụ AI và phạm vi hỗ trợ | [Sử dụng AI](docs/project/ai-usage.md) |

## Dấu ấn hành trình

Nơi nhóm lưu giữ những kỷ niệm trong quá trình thực hiện dự án, slide thuyết trình và video giới thiệu hoặc demo.

**Thư mục Google Drive chung:** Đang cập nhật.

<!-- Thay dòng trên bằng liên kết Drive khi có URL. Gợi ý ba thư mục con: Kỷ niệm nhóm, Slide thuyết trình, Video giới thiệu và demo. -->

## Tài liệu dự án

Xem [danh mục tài liệu trong docs/](docs/README.md) để tìm hướng dẫn cấu trúc mã nguồn, hình ảnh, âm thanh và hồ sơ năm màn chơi.
