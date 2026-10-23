# Tài nguyên hình ảnh

Quy ước cho bản hiện tại; xem [phong cách hình ảnh](visual-style.md), [Game1](done/Game1_Surveyor_3.md), [Game2](done/Game2_Apollo_11.md) và [Game3](done/Game3_Apollo_12.md). Vite sao chép tài nguyên trong `public/` sang `dist/`; URL dùng `BASE_URL` theo khai báo nội dung. Ảnh mới ưu tiên WebP, ảnh tư liệu giữ đúng nội dung và nguồn.

- `branding/`: logo website.
- `portraits/`: chân dung hội thoại, gồm nhân vật mở đầu và ba người bạn.
- `sprites/`: ba sheet An/bà/Cuội và sprite nghỉ Lấp Lánh.
- `memories/<id>/`: ảnh tư liệu của Lấp Lánh/Tai Thính, có mã nhiệm vụ/ảnh trong tên file.
- `public/assets/`: ba ảnh ký ức JPG của Mắt Tròn vẫn đang dùng; không tự di chuyển khi chỉ dọn tài liệu.
- Tên file dùng chữ thường, tiếng Việt không dấu và dấu gạch ngang.

## Ánh xạ tên cũ và mới

| File gốc | Đường dẫn mới | Nhân vật |
| --- | --- | --- |
| `b377a535-03d8-424b-acb4-8a2784f1bd7e.png` | [portraits/an.webp](../public/images/portraits/an.webp) | An |
| `3d688093-d2e0-4db5-8d79-87d29c150224.png` | [portraits/ba.webp](../public/images/portraits/ba.webp) | Bà |
| `d9cea09f-8caf-481f-8088-3e0ccb295905.png` | [portraits/cuoi.webp](../public/images/portraits/cuoi.webp) | Cuội |
| `9bbe160c-c04c-42e1-986f-98141d4a9b66.png` | [portraits/cay-da.webp](../public/images/portraits/cay-da.webp) | Cây Đa |
| `4b807ae3-0b65-4c60-8230-596cd2847b36.png` | [portraits/mat-tron.webp](../public/images/portraits/mat-tron.webp) | Mắt Tròn |
| `92ed1303-9e21-4e09-8ff4-3c163fdd77fa.png` | [portraits/chi-hang.webp](../public/images/portraits/chi-hang.webp) | Chị Hằng |
| `f3663f4d-d4f6-4733-80b1-acaea4b3350b.png` | [sprites/an-spritesheet.webp](../public/images/sprites/an-spritesheet.webp) | An |
| `3b59ca5d-ef72-4aad-b185-f3a065fe4609.png` | [sprites/ba-spritesheet.webp](../public/images/sprites/ba-spritesheet.webp) | Bà |
| `0c0fbcc4-65e9-471b-b587-e4ef504cccb1.png` | [sprites/cuoi-spritesheet.webp](../public/images/sprites/cuoi-spritesheet.webp) | Cuội |

## Ghi chú sử dụng sau này

- Lượt 1 đã định nghĩa một frame nghỉ riêng cho mỗi nhân vật trong `src/content/assets.ts`. Khung ảnh được chọn thủ công, không sửa ảnh gốc.
- An và bà có 2 hàng, Cuội có 5 hàng; mỗi hàng nhìn thấy 6 tư thế. Không mặc định chia được bằng lưới đều.
- Cả ba sheet có alpha, vùng ngoài nhân vật trong các frame đã chọn hiển thị trong suốt. RGB nền/ánh sáng trong bản xem ảnh không có nghĩa là nền bị vẽ đục. Ba frame nghỉ giữ đủ nhân vật.
- Chân dung Cây Đa là ảnh minh họa, không phải đạo cụ pixel trong cảnh.
- Nền, cây, ghế, đèn và các thiết bị Tai Thính được vẽ bằng mã theo cảnh. Không coi việc thiếu bitmap riêng là thiếu tài nguyên cần sinh thêm.

## Tài nguyên ba màn đã tích hợp (24/10/2026)

- `portraits/tai-thinh.webp`: chân dung minh họa PSE, 1024 × 683, RGBA; tạo mới bằng image_gen tích hợp, WebP chất lượng 92. [Nhận diện và tham chiếu](done/Game3_Apollo_12.md#7-tiến-trình-tài-nguyên-và-bàn-giao).
- `memories/tai-thinh/apollo-12-as12-47-6916.webp`, `...6918.webp`, `...6921.webp`: ba ảnh NASA/Alan Bean đã kiểm tra, tối đa 1280 px, WebP chất lượng 90, giữ toàn khung. Đây là bản tối ưu để hiển thị, không phải chuyển lossless của ảnh gốc. [Nguồn và chú thích](done/Game3_Apollo_12.md#5-ảnh-kỷ-niệm-đoạn-kết-và-thông-điệp).
- Nền và ba thiết bị trong cảnh được vẽ bằng `src/game/tai-thinh-scenery.ts`, không dùng chân dung làm sprite. URL bitmap qua `src/content/assets.ts`, có `BASE_URL`.
- Các ảnh Tai Thính đã dùng trong game chính, nhận sau T01/T02/T04 và được lưu vào sách. `/design/tai-thinh.html` chỉ là bản xem dev, không ghi tiến trình.
- Lấp Lánh dùng `portraits/lap-lanh.webp`, `sprites/lap-lanh-idle.webp` và hai ảnh Apollo 11 AS11-40-5952/5945. Chi tiết nguồn và thứ tự kể xem [Game2](done/Game2_Apollo_11.md).
- Không xóa hoặc sửa ảnh trong lần hợp nhất tài liệu. File ảnh tham khảo bổ sung chỉ được đưa vào gameplay sau khi kiểm tra chủ thể, nguồn và vai trò.
