# Tài nguyên hình ảnh

Phân loại theo mục 4 của [kế hoạch mở đầu game Cuội](../Ke-hoach-Codex-Mo-dau-game-Cuoi.md).
Ảnh gốc được giữ nguyên trong `public/images/`. Vite sao chép tài nguyên sang `dist/images/` khi build; đường dẫn được quản lý tại `src/content/assets.ts`.

- `branding/`: logo website.
- `portraits/`: 6 ảnh minh họa nhân vật dùng cho chân dung hội thoại.
- `sprites/`: 3 sprite sheet thiết kế cho An, bà và Cuội.
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
- Chưa có ảnh nền hiên nhà, ảnh nền Mặt Trăng, cây đa pixel, ghế đá và đèn ông sao tách riêng. Lượt 1 dùng các lớp đồ họa Phaser tạm cho nền, cây và ghế; chưa có đèn ông sao độc lập.
