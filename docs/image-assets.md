# Tài nguyên hình ảnh

Quy ước cho bản hiện tại; xem [phong cách hình ảnh](visual-style.md), [Game1](done/Game1_Surveyor_3.md), [Game2](done/Game2_Apollo_11.md), [Game3](done/Game3_Apollo_12.md) và [Game4](done/Game4_Apollo_17.md). Vite sao chép tài nguyên trong `public/` sang `dist/`; URL dùng `BASE_URL` theo khai báo nội dung. Ảnh mới ưu tiên WebP, ảnh tư liệu giữ đúng nội dung và nguồn.

- `branding/`: logo website.
- `portraits/`: chân dung hội thoại, gồm nhân vật mở đầu, bốn người bạn đã triển khai.
- `sprites/`: ba sheet An/bà/Cuội và sprite nghỉ Lấp Lánh.
- `memories/<id>/`: ảnh tư liệu của Lấp Lánh/Tai Thính/Bánh Lưới, có mã nhiệm vụ/ảnh trong tên file.
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

## Bánh Lưới — bản đầu M0–M7 (28/10/2026)

- [portraits/ban-banh-luoi.webp](../public/images/portraits/ban-banh-luoi.webp): chân dung mới tạo bằng `image_gen` tích hợp, 1254 × 1254 RGBA, WebP chất lượng 92, giữ alpha. Đây là minh họa, không phải ảnh NASA. Tham chiếu phong cách chân dung Tai Thính và thiết bị trong ảnh AS17-143-21933; không sửa ảnh tư liệu.
- Hai ảnh kỷ niệm và hai phần cắt chi tiết nằm trong `memories/ban-banh-luoi/`. Mã ảnh, nguồn, độ chính xác ngày chụp, tọa độ cắt và hash ảnh gốc được hợp nhất ở [hồ sơ Game4](done/Game4_Apollo_17.md#6-nguồn-và-hồ-sơ-tài-nguyên).
- Nền VIP Site và xe nghỉ vẽ trực tiếp bằng [banh-luoi-scenery.ts](../src/game/banh-luoi-scenery.ts), tách khỏi chân dung. Xe có bốn bánh lưới, hai ghế trống, chảo ăng-ten và camera, không thêm mắt/miệng/tay chân. Nền dùng cache/khôi phục WebGL chung. Khoảng cách và phối cảnh là minh họa.
- Prompt đã dùng (built-in tool, hai ảnh tham chiếu chỉ dùng cho phong cách và phần cứng):

> Use case: illustration-story. Asset type: transparent character portrait for a children's illustrated lunar game. Generate a NEW portrait of the Apollo 17 lunar roving vehicle, named Mesh Wheels. Image 1 is ONLY a watercolor/gouache style reference; image 2 is ONLY a historical hardware reference, do not edit the archive photo. Isolated complete vehicle three-quarter front view, two empty seats, four wire-mesh wheels with chevron metal treads, thin open silver chassis, gold foil equipment, large dish antenna and TV camera. Soft hand-painted watercolor paper texture and muted cream, blue-grey and antique gold as image 1. Friendly through gentle warm light, NO anthropomorphic eyes, mouth, limbs or people. Entire vehicle including antenna and wheels visible with generous padding, square composition, no scenery, no text, no insignia, no watermark, genuinely transparent background. No inflated rubber tyres, no temporary map fender repair.

## Điều chỉnh nền Bánh Lưới và dấu bánh cuối Tai Thính

- Dấu bánh cuối Tai Thính được rút ngắn, dùng hai hàng dấu rời nét pixel xám tối, viền bụi sáng nhẹ theo ảnh tham chiếu người dùng; không dùng đường liền hoặc dấu vàng phát sáng. SVG được vẽ bằng mã, không thêm bitmap.
- Nền Bánh Lưới minh họa ban ngày tại Taurus–Littrow. Mặt Trời dùng cùng ngôn ngữ hình tròn và quầng sáng bán trong suốt của Trái Đất trong `drawEarth`: đĩa trắng ngà đường kính 44 px, ba lớp sáng kem rất nhẹ, đặt thấp để sườn núi che khoảng một phần ba đĩa. Đĩa nhỏ hơn Trái Đất (bán kính 32 px ở các cảnh trước); bỏ bốn tia lóe. Vẽ trước địa hình để núi che cả đĩa và quầng sáng phía dưới. Quầng chỉ là hiệu ứng chói sáng cách điệu, không mô phỏng vành nhật hoa hoặc tán xạ khí quyển; bầu trời vẫn tối. Vị trí/kích thước là bố cục minh họa, không tái dựng góc nhìn và thời điểm thiên văn xác định, không khẳng định đang có nhật thực hay Mặt Trời bị núi che tại VIP Site.
- Tham chiếu kích thước: [NASA/CXC — Scales and Angular Measurement](https://chandra.si.edu/photo/scale.html) nêu đường kính góc Mặt Trời khoảng nửa độ. Theo phương án hình ảnh đã chốt, đĩa trong game được phóng đại để tạo điểm nhấn, không phải bản vẽ đúng tỉ lệ góc.
- Căn cứ: [NASA SVS — Apollo 17 Landing Site](https://svs.gsfc.nasa.gov/4302/) mô tả góc Mặt Trời tại bãi đáp Taurus–Littrow; [NASA Glenn — Moon](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/moon/) giải thích bầu trời vẫn đen khi bề mặt nhận nắng vì không có khí quyển đáng kể.
