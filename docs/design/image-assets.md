# Tài nguyên hình ảnh

Quy ước cho bản hiện tại; xem [phong cách hình ảnh](visual-style.md) và [nguồn tham khảo](../references.md). Vite sao chép tài nguyên trong `public/` sang `dist/`; URL dùng `BASE_URL` theo khai báo nội dung. Ảnh mới ưu tiên WebP, ảnh tư liệu giữ đúng nội dung và nguồn.

Cập nhật 14/11/2026: tuyến hiện tại gồm đủ năm bạn. Ảnh tư liệu được gom trong `public/images/memories/<id>/`, bao gồm ba JPG Mắt Tròn vừa chuyển từ `public/assets/` sang `memories/surveyor/`. Giữ nguyên định dạng, nội dung ảnh, nguồn và credit; chỉ cập nhật đường dẫn. Xem [quy ước public](../development/folder-structure.md#quy-ước-tài-nguyên-tĩnh).

- `branding/`: logo website.
- `portraits/`: chân dung hội thoại của nhân vật mở đầu, năm người bạn và Hằng.
- `sprites/`: ba sheet An/bà/Cuội, sprite nghỉ Lấp Lánh và Hằng ngồi trong cảnh kết.
- `memories/<id>/`: ảnh tư liệu của năm bạn; ID thư mục khớp nhóm nội dung (`surveyor`, `lap-lanh`, `tai-thinh`, `ban-banh-luoi`, `gac-troi`).
- `book/`: bìa, sơ đồ và ảnh dùng riêng cho nội dung sách; ảnh tư liệu đã có trong `memories/` được dùng lại qua URL, không sao chép.
- T04: ba nền, đèn sau khe đá và hai tư thế Hằng được vẽ bằng mã Phaser trong `src/game/scenes/ending/scenery.ts`; dùng chung silhouette bản đồ T03. Chân dung thoại Hằng tái dùng nguyên file, không cắt thành sprite. Các hình này là sáng tác trong truyện.
- Tên file dùng chữ thường, tiếng Việt không dấu và dấu gạch ngang.

## Ghi chú sử dụng sau này

- Lượt 1 đã định nghĩa một frame nghỉ riêng cho mỗi nhân vật trong `src/content/assets.ts`. Khung ảnh được chọn thủ công, không sửa ảnh gốc.
- An và bà có 2 hàng, Cuội có 5 hàng; mỗi hàng nhìn thấy 6 tư thế. Không mặc định chia được bằng lưới đều.
- Cả ba sheet có alpha, vùng ngoài nhân vật trong các frame đã chọn hiển thị trong suốt. RGB nền/ánh sáng trong bản xem ảnh không có nghĩa là nền bị vẽ đục. Ba frame nghỉ giữ đủ nhân vật.
- Chân dung Cây Đa là ảnh minh họa, không phải đạo cụ pixel trong cảnh.
- Nền, cây, ghế, đèn và các thiết bị Tai Thính được vẽ bằng mã theo cảnh. Không coi việc thiếu bitmap riêng là thiếu tài nguyên cần sinh thêm.
