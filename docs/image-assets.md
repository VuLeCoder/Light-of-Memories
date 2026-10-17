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
| `b377a535-03d8-424b-acb4-8a2784f1bd7e.png` | [portraits/an.png](../public/images/portraits/an.png) | An |
| `3d688093-d2e0-4db5-8d79-87d29c150224.png` | [portraits/ba.png](../public/images/portraits/ba.png) | Bà |
| `d9cea09f-8caf-481f-8088-3e0ccb295905.png` | [portraits/cuoi.png](../public/images/portraits/cuoi.png) | Cuội |
| `9bbe160c-c04c-42e1-986f-98141d4a9b66.png` | [portraits/cay-da.png](../public/images/portraits/cay-da.png) | Cây Đa |
| `4b807ae3-0b65-4c60-8230-596cd2847b36.png` | [portraits/mat-tron.png](../public/images/portraits/mat-tron.png) | Mắt Tròn |
| `92ed1303-9e21-4e09-8ff4-3c163fdd77fa.png` | [portraits/chi-hang.png](../public/images/portraits/chi-hang.png) | Chị Hằng |
| `f3663f4d-d4f6-4733-80b1-acaea4b3350b.png` | [sprites/an-spritesheet.png](../public/images/sprites/an-spritesheet.png) | An |
| `3b59ca5d-ef72-4aad-b185-f3a065fe4609.png` | [sprites/ba-spritesheet.png](../public/images/sprites/ba-spritesheet.png) | Bà |
| `0c0fbcc4-65e9-471b-b587-e4ef504cccb1.png` | [sprites/cuoi-spritesheet.png](../public/images/sprites/cuoi-spritesheet.png) | Cuội |

## Ghi chú sử dụng sau này

- Lượt 1 đã định nghĩa một frame nghỉ riêng cho mỗi nhân vật trong `src/content/assets.ts`. Khung ảnh được chọn thủ công, không sửa ảnh gốc. Chưa kiểm thử hoạt ảnh trong game.
- An và bà có 2 hàng, Cuội có 5 hàng; mỗi hàng nhìn thấy 6 tư thế. Không mặc định chia được bằng lưới đều.
- Kiểm tra thực tế: cả ba sheet có alpha, vùng ngoài nhân vật trong các frame đã chọn hiển thị trong suốt. RGB nền/ánh sáng trong bản xem ảnh không có nghĩa là nền bị vẽ đục. Đã kiểm tra trực tiếp ba frame nghỉ giữ đủ nhân vật; các frame còn lại chưa được nghiệm thu.
- Chân dung Cây Đa là ảnh minh họa, không phải đạo cụ pixel trong cảnh.
- Chưa có ảnh nền hiên nhà, ảnh nền Mặt Trăng, cây đa pixel, ghế đá và đèn ông sao tách riêng. Lượt 1 dùng các lớp đồ họa Phaser tạm cho nền, cây và ghế; chưa có đèn ông sao độc lập.
