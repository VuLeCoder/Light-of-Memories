# Chỉnh nội dung và bố cục sách — 06/11/2026

## Phạm vi

Giữ 26 trang chuẩn, ID trang, điều kiện mở khóa, luồng chơi và schema lưu v18. Không sửa reducer tiến trình, cảnh Phaser hay luật thử thách. Sách còn 49 khối Việt/Anh sau khi bỏ ba khối ảnh lặp.

## Các điều chỉnh

- Tách trọng tâm ba lần nhắc Surveyor 3: sự kiện ghé thăm, mục đích nghiên cứu các bộ phận mang về, và cách phân biệt ảnh mặt đất với ảnh quỹ đạo.
- Bỏ ảnh lặp trên các trang giới thiệu thiết bị và bộ phận trở về. Giữ ảnh ký ức đã thu thập. Trang lăng kính dùng sơ đồ SVG 100 lăng kính; chú thích rõ là minh họa của trò chơi, không theo tỉ lệ, dựa trên NASA/ILRS.
- Rút gọn giải thích phản xạ, dùng tên thiết bị thật trong đoạn kiến thức và thống nhất “máy ảnh”. Sửa câu dẫn để không hứa có ảnh ở những trang đã bỏ ảnh lặp.
- Trang đo khoảng cách trình bày phương pháp trước; đáp án số nằm trong phần “Xem đáp án / Show answer”. Bộ phân trang đo lại khi mở/đóng phần này.
- Đổi nhãn thành “Có yếu tố trò chơi / hư cấu”, giữ phân loại từng khối và phần giải thích nhãn. Trang hỗn hợp vẫn hiển thị nguồn kiến thức.
- T02 đặt cặp ảnh Trước/Sau cạnh nhau trong sách, cùng chia vùng 1–2–3 như màn chơi. Mở gợi ý vẫn giữ đoạn kiến thức và ngày chụp. Trang khoanh đáp án vẫn cần điều kiện mở khóa cũ.
- T03 mở gợi ý bổ sung cho đoạn kiến thức, không thay thế đoạn đó. Nút gợi ý thể hiện trạng thái mở/đóng.
- Chân dung Gác Trời chỉ xuất hiện ở trang giới thiệu; các trang tư liệu dùng chữ căn trái. Đưa đoạn và hình thành các khối riêng để phân trang không phải đẩy cả cụm dài sang trang sau.
- Thêm mục lục chọn trang ở giữa hai nút lật trang. Dùng danh sách trang hiện có; trang bạn chưa gặp giữ tên “Người bạn bí ẩn”. Chọn trang không chuyển màn chơi hay sửa bản lưu.
- Phân biệt tên các liên kết nguồn; hiển thị ngày ảnh T02 theo ngôn ngữ thay vì ngày ISO. Dữ liệu xuất bản vẫn giữ ngày ISO và thông tin nguồn; credit ảnh va chạm cũng có trong tooltip liên kết nguồn.

## Kiểm chứng

- Sáu lệnh kiểm tra dữ liệu hiện có đều đạt: book, book-flow, gac-troi, ending-progress, gac-light, gac-trail. Book-flow kiểm tra 18 mốc, thứ tự trang, đích gợi ý, toàn bộ sách và tiến trình mới.
- TypeScript/Vite build đạt; còn cảnh báo kích thước chunk Phaser đã có trước.
- Chromium: duyệt đủ 26 trang bằng mục lục và các trang tiếp nối ở viewport rộng 390, 900, 1440 px, cao 1000 px; cả Việt và Anh. Không phát hiện tràn khung, ảnh hỏng hoặc lỗi JavaScript; bản lưu không đổi sau khi đọc. Kiểm tra mở đáp án đo khoảng cách trong các lượt này.
- Lượt đầu phát hiện cặp ảnh T02 xếp dọc tràn khung sách 390 px. Đã chuyển sang hai cột và kiểm tra lại đạt.
- Kiểm tra T02 hiện có được cập nhật theo cách hiển thị gợi ý mới, đạt tám trường hợp: khung chơi 320/360/640/860 px × Việt/Anh. Bao gồm chọn sai, mở sách, chọn đúng bằng chuột/bàn phím, tải lại từng lượt thoại và chuyển sang T03.

Không đổi thiết kế tổng thể của game. Khoảng trắng cuối trang ngắn vẫn được giữ; không thêm nội dung chỉ để lấp đầy trang. Số trang hiển thị vẫn phụ thuộc kích thước khung và phép đo phân trang. Các lượt Chromium không thay cho kiểm tra trên mọi trình duyệt hoặc thiết bị thật.
