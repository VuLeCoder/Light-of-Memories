# Rà soát hiệu năng sách — 31/10/2026

Phạm vi thay đổi: `src/components/useBookImageLayout.ts`. Giữ nguyên logic màn chơi, tiến độ lưu, nội dung sách và điều hướng gợi ý.

## Điều chỉnh

- Tìm điểm ngắt đoạn bằng tìm kiếm nhị phân thay vì thử từng từ, giảm số lần ghi DOM rồi đọc kích thước đồng bộ. Vẫn ưu tiên ngắt ở cuối câu và giữ các thẻ nội tuyến.
- ResizeObserver chỉ yêu cầu dàn lại trang khi kích thước thực sự đổi, bỏ lần thông báo ban đầu có cùng kích thước.
- Chỉ chờ và đo lại sau khi font tải xong nếu font đang tải. Khi font đã sẵn sàng, dùng kết quả đo đầu tiên.
- Giữ cơ chế gộp yêu cầu bằng requestAnimationFrame, đo trang đang mở và dọn observer/listener/frame/đoạn sao chép khi chuyển trang hoặc đóng sách.

## Đo trước và sau

Chromium headless, Vite development, viewport 390 × 800 px; khung sách 300 × 540 px, đầy đủ CSS các màn chơi và bộ tiến độ mở toàn bộ sách. Đợi ảnh và font trước khi kiểm tra mỗi trang. Mỗi phép đo gồm một lượt đọc xuôi; số liệu DevTools Performance chỉ bao gồm lượt đó. Sau đó kiểm tra đọc ngược và đối chiếu nội dung đoạn gốc với các phần hiển thị.

| Chỉ số | Việt trước | Việt sau | Anh trước | Anh sau |
| --- | ---: | ---: | ---: | ---: |
| Số lần tính bố cục | 953 | 442 | 730 | 446 |
| Tổng thời gian tính bố cục | 182 ms | 135 ms | 153 ms | 100 ms |
| Tổng thời gian JavaScript | 565 ms | 515 ms | 537 ms | 454 ms |
| Số trang sau dàn nội dung | 68 | 68 | 70 | 70 |

Sau tối ưu: không có đoạn thiếu, không có trang tràn chiều cao; nội dung khi đọc ngược khớp lượt đọc xuôi. Cập nhật lại component cha mà không đổi nội dung/kích thước rồi chờ một giây không phát sinh lần tính bố cục nào trong phép đo sách riêng.

Đây là các lượt đo cục bộ, không phải benchmark trên điện thoại thật hoặc cam kết FPS cho mọi thiết bị. Thời gian có thể dao động; số lần tính bố cục cho thấy lượng công việc đã giảm.

## Kiểm tra cùng game

Mở ứng dụng thật bằng bản lưu kiểm thử ở bốn màn Surveyor, Lấp Lánh, Tai Thính, Bánh Lưới; tiếp tục chơi, lật tối đa tám trang và thử nút gợi ý khả dụng tìm được trong màn Lấp Lánh/Tai Thính.

- Cả bốn màn: dữ liệu `cuoi.progress` không đổi sau thao tác đọc, phần tử canvas vẫn là cùng phần tử, trang sách không tràn và không có lỗi JavaScript.
- Mỗi màn lấy mẫu 120 requestAnimationFrame sau thao tác: trung vị khoảng 16,7 ms, không có khoảng khung hình vượt 50 ms. Đây là mẫu sau thao tác, không phải phép đo toàn bộ quá trình chơi hoặc chi phí từng lần lật trang.
- Không chơi lại toàn bộ câu đố trong lần rà soát này. Kiểm tra tự động `check:book-flow` xác nhận 27 mốc tiến độ, đích gợi ý, thứ tự trang, trang NASA liền sau nội dung tương ứng và trạng thái bắt đầu lại.
- `check:book`: 44 trang gốc, 99 khối nội dung, đủ Việt/Anh và xuất toàn bộ sách độc lập với bản lưu.
- Build TypeScript/Vite đạt. Cảnh báo chunk lớn vẫn có: bundle chính khoảng 503 kB và Phaser khoảng 1,48 MB trước gzip; Phaser đã được tải qua dynamic import. Lần này không thay đổi cách tải game.

Các bộ chạy Chromium được đặt trong `/tmp`, không thêm phụ thuộc hay mã kiểm thử vào ứng dụng.
