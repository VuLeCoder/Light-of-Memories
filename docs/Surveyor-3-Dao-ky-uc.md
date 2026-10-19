# Surveyor 3: đọc sổ tay, đào ảnh, ghép nhật ký

Thiết kế này thay phần T02 chọn đáp án/đào tự động và T03 thẻ chữ của bản trước.

- T01: khám phá máy ảnh và xẻng; ghép đúng công dụng. Mở ba trang gợi ý và trang giới thiệu dụng cụ. Mắt Tròn trao chiếc xẻng ký ức qua khung chat.
- T02: Cuội di chuyển bằng WASD/mũi tên hoặc chạm mặt đất. Đi xa thì nhân vật, bóng và dụng cụ nhỏ hơn; đi gần thì lớn hơn. Khu vực chân tàu có giới hạn tránh đi xuyên tàu. Ba điểm được bố trí ở gần/trung/xa, là bố trí nghệ thuật chứ không phải tọa độ khảo sát NASA.
- Sách: mỗi điểm có hình phác dấu vết, mô tả hướng và nút “Ghi nhớ điểm cần kiểm tra”. Phải đọc và ghi nhớ gợi ý tương ứng mới đào được khi đứng gần. Không có nhãn vị trí từ xa. Nút xem sách đưa người chơi tới gợi ý chưa tìm thấy; vẫn có thể lật trước/sau độc lập.
- Ba điểm: dấu chân đế → ảnh chân tàu; rãnh khảo sát → ảnh rãnh; dấu chân phi hành gia → ảnh Apollo 12 thăm Surveyor 3. Tìm theo thứ tự bất kỳ. Đào 1,8 giây, hiện ảnh và mô tả; lưu ngay từng ảnh. Tạm dừng/tải lại giữa lượt đào sẽ trở về chờ đào, không tự trao ảnh.
- T03: sử dụng đúng ba ảnh đã thu thập; bấm để xếp vào ba ô, bấm ảnh đã xếp để gỡ. Sai có gợi ý, được thử lại. Thứ tự sự kiện: hạ cánh tháng 4/1967 → khảo sát đất → Apollo 12 đến thăm tháng 11/1969. Xếp theo sự kiện được mô tả, không theo ngày ảnh chụp.
- Hoàn thành: nhật ký theo đúng thứ tự trong game và trong sách; ghi nhận 1/5 người bạn. Các màn còn lại giữ trạng thái chưa có nội dung.
- Lưu tiến độ v3 bổ sung `clues`, `found`; bản cũ đã hoàn thành giữ thành tích, bản cũ đang làm T02/T03 chuyển về khám phá. Giữ bố cục game–sách và canvas 960×540. Điều khiển T02 đặt dưới canvas để không che điểm đào.

## Tư liệu và phần hư cấu

Đào ra ảnh và xẻng ký ức là hư cấu. Surveyor 3 thật không tặng dụng cụ; xẻng của tàu đã được Apollo 12 mang về Trái Đất. Dấu vết và sự kiện dùng làm nền kể chuyện dựa trên NASA.

Nguồn: NASA SP-284, *Analysis of Surveyor 3 Material and Photographs Returned by Apollo 12*, 1972: https://ntrs.nasa.gov/citations/19720019081

- `public/assets/surveyor-footpad.jpg`: trích hình 1, trang in 115 (trang PDF 127), ảnh Surveyor 3 chụp chân đế ngày 21/4/1967. Chỉ trích vùng hình từ trang báo cáo, không tạo thêm chi tiết.
- `public/assets/surveyor-trenches.jpg`: trích hình 2, trang in 174 (trang PDF 186), ảnh Apollo 12 AS12-48-7108 chụp ngày 20/11/1969, ghi lại rãnh Surveyor 3 đào năm 1967. Mô tả game nêu rõ hai mốc thời gian.
- `public/assets/surveyor-apollo12.jpg`: Pete Conrad bên Surveyor 3, tháng 11/1969, NASA AS12-48-7133. Nguồn: https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/

Thông tin nhiệm vụ: https://science.nasa.gov/mission/surveyor-3/
