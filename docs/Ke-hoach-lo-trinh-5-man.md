# Kế hoạch lộ trình 5 màn — Lộ trình năm ánh sao

## 1. Phạm vi và nguyên tắc

- Giữ nguyên cấu trúc giao diện trong mã nguồn hiện tại: game bên trái, sách bên phải.
- Hành trình gồm **5 màn chơi, tương ứng với 5 đối tượng**.
- **Surveyor 3 — Mắt Tròn** là đối tượng của màn đầu tiên. Bốn đối tượng còn lại sẽ được xác định sau.
- Lộ trình xuất hiện sau cảnh hiện tại, khi Cuội đi theo dấu chân, ngay trong vùng game.
- Tài liệu này mô tả kế hoạch thiết kế; các chi tiết hoạt cảnh, lời thoại và tương tác dưới đây là đề xuất triển khai.

## 2. Ý tưởng chủ đạo

“Lộ trình năm ánh sao” nối cảnh mở đầu với năm cuộc gặp trên Mặt Trăng. Chiếc đèn ông sao Cuội đã nhận trở thành dấu hiệu thể hiện tiến độ: mỗi màn hoàn thành thắp sáng thêm một ngôi sao.

Lộ trình giúp người chơi hiểu mình sẽ đi qua năm điểm dừng, biết điểm đến tiếp theo và nhận ra những chặng đã hoàn thành. Động lực xuyên suốt là cùng Cuội tìm chị Hằng bằng cách gặp gỡ và khám phá câu chuyện của các đối tượng.

## 3. Chuyển từ cảnh dấu chân sang lộ trình

1. Cuội đi đến cuối dấu chân, dừng trên một gò đất nhỏ. Phía trước hiện ra một ánh sáng yếu.
2. Đèn ông sao khẽ sáng lên; khung cảnh chỉ tăng sáng, không thu nhỏ. Sau đó lộ trình xuất hiện trong vùng game.
3. Một đường dấu chân lần lượt nối năm điểm dừng. Cuội đứng ở điểm xuất phát.
4. Điểm đầu tiên sáng rõ, hiện hình Surveyor 3 — Mắt Tròn. Bốn điểm còn lại hiện số thứ tự và bóng dáng các đối tượng; có thể dùng ký hiệu bí ẩn khi chưa chốt đối tượng.
5. Sau lời dẫn ngắn, người chơi chọn “Đến gặp Mắt Tròn” để bắt đầu màn 1.

Lần đầu xuất hiện, cả năm điểm nằm gọn trong khung game để người chơi thấy toàn bộ hành trình.

### Lời thoại gợi ý

> **Cuội:** “Năm điểm sáng… Có ai ở đó biết chị Hằng đang ở đâu không nhỉ?”
>
> **Lời dẫn:** “Hãy cùng Cuội gặp năm người bạn trên Mặt Trăng và khám phá những câu chuyện của họ.”

Lời dẫn mang tính kể chuyện. Bản đồ là minh họa lộ trình chơi, không mặc định thể hiện vị trí địa lý hoặc khoảng cách thực tế giữa các đối tượng.

## 4. Hiển thị và tương tác trên lộ trình

| Trạng thái | Cách thể hiện | Tương tác |
| --- | --- | --- |
| Màn đang chơi hoặc sẵn sàng bắt đầu | Đối tượng có màu, viền sáng nhẹ, Cuội đứng cạnh | Chọn để vào màn |
| Màn chưa mở | Số thứ tự và hình bóng mờ | Hiện “Hoàn thành điểm trước để khám phá” |
| Màn đã hoàn thành | Một ngôi sao sáng và dấu hoàn thành | Có thể chọn chơi lại |

Các màn mở lần lượt theo tiến độ. Chỉ điểm đang chọn hiển thị phần giới thiệu chi tiết để khung game dễ quan sát.

Sau khi hoàn thành Surveyor 3, người chơi có thể chọn **Chơi lại cùng bạn** ở đoạn kết hoặc trên lộ trình. Lượt chơi mới bắt đầu từ cuộc gặp Cuội–Mắt Tròn và làm lại T01–T03; gợi ý, ảnh đào và thứ tự nhật ký được khám phá lại. Ngôi sao 1/5 đã nhận vẫn sáng trên lộ trình, kể cả khi tải lại trang giữa lượt chơi.

### Nội dung điểm đầu tiên

> **01 · Surveyor 3 — Mắt Tròn**
>
> Một người bạn đang chờ Cuội đánh thức ký ức.
>
> **[Đến gặp Mắt Tròn]**

Nội dung màn 1 tham chiếu tài liệu [Surveyor 3 — Nội dung sách và game](./Surveyor-3-Noi-dung-sach-game.md). Vị trí game và sách tuân theo mã nguồn hiện tại như quy định ở mục 1 của kế hoạch này.

## 5. Phối hợp với sách

Khi giới thiệu lộ trình, vùng sách bên phải có thể mở trang “Hành trình của Cuội”, gồm một đoạn dẫn ngắn và năm ô lưu kỷ niệm.

- Khi vào màn 1, sách chuyển sang nội dung Surveyor 3.
- Khi hoàn thành một màn, ô tương ứng nhận hình hoặc dấu kỷ niệm.
- Lộ trình và sách cùng phản ánh tiến độ của người chơi trong bố cục hiện tại.

## 6. Kết nối giữa các màn

Sau mỗi màn, quay lại lộ trình trong vài giây:

1. Điểm vừa hoàn thành sáng lên và nhận dấu hoàn thành.
2. Một ngôi sao được thắp trên đèn ông sao.
3. Đường đến điểm tiếp theo hiện rõ; Cuội chuyển đến điểm đó.
4. Người chơi chọn bắt đầu màn tiếp theo.

Sau màn thứ năm, đèn có đủ năm ngôi sao sáng. Nội dung kết thúc và cách Cuội gặp chị Hằng sẽ được xác định riêng.

## 7. Các nội dung cần chốt khi triển khai

- Danh tính, thứ tự và hình ảnh của bốn đối tượng còn lại.
- Hình minh họa bản đồ, vị trí năm điểm và thời lượng hoạt cảnh.
- Lời thoại chính thức và nội dung trang sách “Hành trình của Cuội”.
- Cách mở lại lộ trình trong lúc chơi, phù hợp với các điều khiển hiện có.
- Cảnh kết thúc sau khi hoàn thành cả năm màn.

## 8. Tiến độ triển khai

- Đã có: nhận đèn, dấu chân, chuyển cảnh tăng sáng, lộ trình năm điểm và bố cục cân đối; sách độc lập có nút lật trang.
- Đã có phần 1–2 của màn Surveyor: Cuội đi bằng sprite/điều khiển như cảnh cây đa, đến gần Mắt Tròn trong hố Surveyor và bấm E hoặc bấm nhân vật để mở khung chat, nhận nhiệm vụ và T01 ghép công dụng hai dụng cụ. Có gợi ý, thử lại không mất kết quả đúng, hỗ trợ bàn phím và tiếng Việt/Anh.
- Hoàn thành T01 mở trang B01 và ba trang sổ tay gợi ý; nhận xẻng ký ức qua lời thoại. Số ký ức tính theo ba ảnh đã tìm được, chưa cộng sao lộ trình.
- Lưu phiên bản 3 giữ giai đoạn, lượt thoại và phần ghép đúng, tương thích bản lưu cũ. Bắt đầu lại xóa tiến độ màn.
- Đã thay T02 bằng khám phá giả 3D: Cuội đi trái/phải/gần/xa, đọc và ghi nhớ từng gợi ý trong sách trước khi đào ba ảnh. T03 dùng chính ba ảnh đó để ghép nhật ký theo thời gian, hoàn thành ghi nhận 1/5 người bạn. Xem [thiết kế cập nhật](./Surveyor-3-Dao-ky-uc.md).
- Tiếp theo: hoàn thiện phần thưởng “Mắt phóng to”, cảnh kết màn và cơ chế mở khóa tuần tự khi có nội dung màn 2. Bốn đối tượng còn lại chưa chốt.

Bối cảnh hố Surveyor và nguồn NASA: [ghi chú dựng cảnh](./Surveyor-3-Boicanh-NASA.md).
