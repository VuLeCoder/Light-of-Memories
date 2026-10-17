# Kiểm kê tài nguyên — Lượt 1

Ảnh gốc vẫn ở `images/`. Vite nhập file bằng URL và phát hành tên có hash trong `dist/assets/`. Không chỉnh sửa, thu nhỏ hay xóa nền các PNG gốc.

## Ảnh đã có

| Đường dẫn trong `images/` | Kích thước | Kênh | Vai trò |
| --- | --- | --- | --- |
| `portraits/an.png` | 1312 × 1199 | RGBA | Chân dung An |
| `portraits/ba.png` | 1145 × 1374 | RGBA | Chân dung bà |
| `portraits/cuoi.png` | 1024 × 1536 | RGBA | Chân dung Cuội |
| `portraits/cay-da.png` | 1312 × 1199 | RGBA | Chân dung Cây Đa, không dùng làm cây pixel |
| `portraits/mat-tron.png` | 1222 × 1287 | RGBA | Có trong danh sách, chưa sử dụng trong cảnh |
| `portraits/chi-hang.png` | 1024 × 1536 | RGBA | Có trong danh sách, chưa sử dụng trong cảnh |
| `sprites/an-spritesheet.png` | 1536 × 1024 | RGBA | 2 hàng × 6 tư thế quan sát được |
| `sprites/ba-spritesheet.png` | 2172 × 724 | RGBA | 2 hàng × 6 tư thế quan sát được |
| `sprites/cuoi-spritesheet.png` | 1536 × 1024 | RGBA | 5 hàng × 6 tư thế quan sát được |

## Frame nghỉ dùng trong bản dựng

Tọa độ tính theo pixel ảnh gốc, gốc trên trái. Frame được thêm qua `Texture.add('rest', ...)`, không dùng cách chia đều `load.spritesheet`. Điểm đặt chân tương đối so với góc trên trái của frame, dùng làm origin khi hiển thị.

| Nhân vật | x | y | Rộng | Cao | Điểm đặt chân (x, y) | Scale trong cảnh |
| --- | --- | --- | --- | --- | --- | --- |
| An | 8 | 112 | 270 | 394 | 128, 380 | 0.37 |
| Bà | 65 | 0 | 270 | 362 | 140, 352 | 0.49 |
| Cuội | 92 | 8 | 135 | 220 | 67, 216 | 0.62 |

Đã đọc kích thước/kênh bằng Pillow và xem trực tiếp bản ghép ba frame trên nền màu. Cả ba giữ đủ đầu, tay, chân, ghế/nón và đèn liên quan; không lẫn nhân vật ở frame bên cạnh. Alpha min/max: An và Cuội 0–254, bà 0–255. Vùng nền trong các frame chọn là trong suốt; không cần xử lý ảnh cho bản dựng tĩnh.

Tư thế nghỉ, nằm ngủ, thức dậy và sáu frame đi bộ của Cuội được cắt riêng trong `src/content/assets.ts` theo sprite sheet hiện tại. Các scale/điểm đặt chân là cấu hình khởi đầu; cần kiểm tra trực quan trên trình duyệt khi thay sprite sheet lần nữa.

## Tài nguyên còn thiếu

| Tài nguyên | Cách thể hiện tạm ở Lượt 1 |
| --- | --- |
| Nền hiên nhà không nhân vật | Các lớp trời, nhà mái ngói, sân và tre bằng Phaser Graphics |
| Nền Mặt Trăng không cây/ghế/Cuội | Các lớp trời, đồi, mặt đất và hố bằng Phaser Graphics |
| Cây đa pixel | Graphics riêng `tree`, không dùng chân dung minh họa thay thế |
| Ghế đá | Graphics riêng `bench`, có vùng click kiểm tra riêng |
| Đèn ông sao độc lập | Chưa dựng; đèn trên tay An nằm trong sprite gốc |
| Âm thanh | Chưa có, tắt hệ audio ở bản dựng này |

Không đưa chữ, nút hoặc hội thoại vào ảnh nền. Các vùng click là công cụ kiểm tra bố cục, chưa phải tương tác nhiệm vụ.
