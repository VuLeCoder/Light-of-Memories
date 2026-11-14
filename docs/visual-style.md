# Phong cách hình ảnh — Cuội

Dùng tài liệu này khi thiết kế hoặc yêu cầu AI sinh ảnh. Đây là hướng dẫn bám theo giao diện và tài nguyên hiện có, không phải yêu cầu thay toàn bộ hình ảnh.

## Tinh thần chung

Cổ tích Việt Nam dưới ánh trăng, đêm Trung Thu yên tĩnh, ấm áp, hơi hoài niệm và có điều kỳ diệu đang chờ khám phá. Đối tượng chính là trẻ tiểu học: nhân vật dễ mến, biểu cảm rõ, hình khối dễ nhận ra. Sự vắng mặt của chị Hằng tạo tò mò, tránh không khí kinh dị hoặc u tối đe dọa.

Website đang kết hợp ba cách thể hiện có chủ đích:

- **Giao diện:** nền xanh đêm, đường viền vàng nhạt, chữ kem, bố cục thoáng như một cuốn truyện. Sách có nền giấy kem và nét trang trí nhẹ.
- **Cảnh chơi:** góc nhìn ngang 2D, nền hình khối dạng pixel; sprite viền rõ và pixel sắc nét. Phaser bật `pixelArt`, tắt khử răng cưa.
- **Chân dung:** minh họa truyện thiếu nhi có chất liệu giấy/màu vẽ, sắc độ mềm và chi tiết hơn sprite. Không dùng chân dung lớn thay thẳng cho sprite trong game.

## Bảng màu tham chiếu

| Màu | Mã | Vai trò |
| --- | --- | --- |
| Xanh đêm | `#101e28` | Nền website |
| Xanh bảng thoại | `#182c35` / `#10212a` | Hộp thoại, có độ trong suốt |
| Vàng dịu | `#d7b875` | Viền và điểm nhấn |
| Vàng nút | `#dfc18a` | Hành động chính |
| Kem | `#eae7dc` | Chữ trên nền tối |
| Xanh xám sáng | `#bdcecb` | Chữ phụ |
| Giấy sách | `#f2ecdb` | Mảng sáng cân bằng với game |
| Xám xanh Mặt Trăng | `#677484` | Bề mặt cảnh trăng |

Ánh trăng thiên lạnh; đèn ông sao và cửa sổ thiên vàng ấm. Giữ vùng phát sáng cục bộ, không phủ bloom mạnh toàn cảnh. Mái ngói, áo nâu, tre, cây đa, hiên nhà và ghế đá là các dấu hiệu nhận diện quan trọng.

## Chữ và UI

CSS khai báo Lora/Georgia cho tiêu đề, Be Vietnam Pro/sans-serif cho phần đọc và điều khiển. Hiện chưa đóng gói hoặc tải hai font đầu; máy không có font sẽ dùng dự phòng. Vì vậy không coi font hiển thị là giống tuyệt đối trên mọi máy.

Nội dung thoại thường 20px, xuống 18px ở màn hình hẹp; nút chính khoảng 18px, phần hướng dẫn khoảng 16px. Một số nhãn trang trí nhỏ hơn. Ảnh sinh mới không nên chứa chữ giao diện: để React hiển thị chữ, dễ đổi Việt/Anh và giữ độ rõ. Bo góc nhẹ, viền mảnh, không dùng khung sci-fi hoặc nút neon.

## Tài nguyên để tham chiếu

- [Cuội](../public/images/portraits/cuoi.webp): áo nâu cổ viền sáng, quần xanh sẫm, tóc đen búi, thắt lưng vải, dáng thân thiện. Dùng ảnh thực tế làm chuẩn nhận diện.
- [An](../public/images/portraits/an.webp), [Bà](../public/images/portraits/ba.webp), [Cây Đa](../public/images/portraits/cay-da.webp), [Chị Hằng](../public/images/portraits/chi-hang.webp), [Mắt Tròn](../public/images/portraits/mat-tron.webp): mở ảnh tương ứng trước khi tạo biến thể.
- [Sprite Cuội](../public/images/sprites/cuoi-spritesheet.webp): chuẩn cho tỷ lệ nhân vật và hoạt ảnh trong game.
- [Logo](../public/images/branding/light-of-memories-primary.webp): trăng lưỡi liềm ôm đèn ngôi sao vàng, nền xanh đêm, chữ Light of Memories. Khi đặt logo tiếp tục dùng file có sẵn.

## Quy cách đề xuất khi tạo ảnh mới

**Nền cảnh:** bố cục 16:9, ưu tiên 960 × 540 hoặc bản lớn cùng tỷ lệ. Góc nhìn ngang nhất quán, tránh phối cảnh isometric hoặc camera từ trên xuống. Nền xa ít tương phản hơn nhân vật. Giữ vùng đáy đủ đơn giản vì hộp thoại sẽ che một phần cảnh. Hiên nhà có An–bà bên trái và trăng phía trên bên phải; Mặt Trăng có cây đa bên trái, ghế ở giữa, đường đi ra bên phải.

**Đạo cụ:** PNG nền trong suốt cho cây, ghế, đèn tách lớp; không vẽ sẵn chữ, nút hoặc HUD. Đèn ông sao có đúng năm cánh. Cây và ghế phải có mặt tiếp đất rõ để tránh cảm giác lơ lửng.

**Sprite:** nền trong suốt, toàn thân không cắt tóc/chân/đạo cụ, giữ tỷ lệ và trang phục qua mọi frame. Cùng hướng nhìn, đường đặt chân và mức sáng. Đề xuất sheet lưới đều cho tài nguyên mới, có khoảng đệm giữa ô và ghi rõ số frame, thứ tự, kích thước ô. Sheet hiện tại được crop từng hình không đều trong `src/content/assets.ts`; không áp lưới mới lên ảnh cũ. Khi thay sheet phải đo và cập nhật tọa độ, điểm neo, scale, rồi xem hoạt ảnh thật.

**Chân dung:** minh họa vẽ tay ấm, chất liệu nhẹ, mặt dễ đọc khi thu nhỏ. Chừa khoảng an toàn quanh đầu; hộp thoại có thể crop ảnh. Chỉ dùng nền trong suốt nếu mục đích là ghép lớp; không mặc định ảnh chân dung cũ có nền trong suốt.

Tên file dùng chữ thường và dấu gạch nối. Đặt ảnh vào nhóm phù hợp trong `public/images/`, khai báo URL qua `src/content/assets.ts` để tôn trọng base path. Xem [quy ước ảnh](image-assets.md).

## Prompt mẫu

Thay phần trong ngoặc vuông và gửi kèm ảnh nhân vật hoặc sprite hiện có làm tham chiếu.

> Tạo [nền cảnh / đạo cụ / sprite] cho game cổ tích Việt Nam Cuội, dành cho trẻ tiểu học. Cảnh đêm Trung Thu yên tĩnh, hoài niệm, ấm áp và kỳ diệu. Góc nhìn ngang 2D. Phong cách pixel phù hợp sprite tham chiếu, hình khối rõ, xanh đêm và xám xanh làm nền, ánh trăng kem, điểm sáng đèn vàng dịu. Nội dung: [mô tả cụ thể]. Giữ nguyên nhận diện, trang phục và tỷ lệ nhân vật tham chiếu. [Nền 16:9 có vùng đất đi lại rõ / PNG đạo cụ nền trong suốt / sheet có N frame lưới đều]. Không chữ, không watermark, không UI, không neon, không 3D bóng nhựa, không phối cảnh isometric, không kinh dị. Không cắt chân hay đạo cụ. Vùng đáy ít chi tiết để đặt hội thoại.

Với chân dung, thay yêu cầu pixel bằng “minh họa truyện thiếu nhi vẽ tay, chất liệu giấy và màu mềm, đường nét ấm, biểu cảm rõ”; giữ các yêu cầu nhận diện và bảng màu.
