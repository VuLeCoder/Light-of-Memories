# Âm thanh và đoạn tìm chị Hằng

Triển khai trên nhánh `v2`, nơi có Gác Trời → Thỏ Ngọc → Hằng → An và bà. Không thay đổi các thử thách của những người bạn hay quy tắc đèn 1/3/5 cánh.

## Âm thanh

- Ba câu nhạc ngũ cung tự tạo: khám phá, ú òa với Thỏ, đoàn tụ. Giai điệu đoàn tụ nhắc lại câu nhạc khám phá.
- Tổng hợp trực tiếp bằng Web Audio: âm hơi mềm gợi sáo, dây gảy gợi đàn tranh, luyến gợi đàn bầu, tiếng gõ gợi T’rưng. **Đây là âm sắc mô phỏng, không phải bản thu nhạc cụ thật.**
- Không dùng giai điệu hoặc bản thu tải từ bên thứ ba. Dữ liệu nốt và thiết kế âm nằm trong `src/audio/game-audio.ts`; không có yêu cầu tải mẫu nhạc hay ghi công bản thu bên ngoài.
- Hiệu ứng tương tác, hoàn thành, thắp đèn, tìm thấy Thỏ, nhặt quà; bổ sung tiếng gợi ý, thử lại nhẹ và đào đất.
- Dùng nút âm thanh và khóa lưu `cuoi.sound` hiện có. Chỉ mở AudioContext sau thao tác thật của người chơi; một context và một bộ lập lịch trong ứng dụng.
- Hạ nhạc khi đọc thoại, tạm dừng khi mở menu, chuyển tab hoặc cửa sổ mất focus. Tắt tiếng dừng các nốt đang phát, không chỉ chặn nốt tiếp theo. Chuyển nhóm cảnh ngắt câu nhạc cũ bằng giảm âm ngắn rồi bắt đầu câu mới.
- Các hiệu ứng phần thưởng dựa vào tiến trình tăng; không phát lại khi tải save, đổi ngôn ngữ hoặc mở lại màn. Tương tác Thỏ và quà chỉ phát khi hành động thực sự đổi trạng thái.
- Nếu Web Audio không dùng được, menu báo ngắn và game vẫn chơi được. Không thêm lồng tiếng; mọi câu đố tiếp tục giải được khi tắt tiếng.

## Tìm chị Hằng

- Ba chặng có bố cục đá khác nhau và dấu chân nhỏ hướng về chỗ Thỏ trốn.
- Tên chặng kể hành trình: vệt chân bên triền đất → đôi tai sau khe đá → bóng đa ở cuối đường.
- Giỏ quà cho thấy cà rốt, bánh trăng và hoa đã nhặt. Quà luôn tùy chọn, không chặn hoàn thành.
- Lời gợi ý và lời Thỏ ngắn hơn; hướng dẫn thao tác nằm ở phần điều khiển. Sau khi Thỏ chạy đi, có nút theo Thỏ; vẫn giữ thao tác đi sang phải và E.
- Không còn hộp lời nhắn có scrollbar. Cảnh, giỏ quà và lời nhắn thành các hàng riêng, giữ nhân vật và điểm cần chọn nhìn thấy.

## Đoàn tụ và khép lại

- Cuội đứng gần Hằng dưới cây đa. Quà đã nhặt xuất hiện trong cảnh và được nhắc trong hội thoại; lượt không nhặt quà vẫn có lời thoại phù hợp.
- Cuội chọn kể chuyện Mắt Tròn, Lấp Lánh hoặc Gác Trời. Lựa chọn `rabbitJourney.memory` được lưu; save cũ không có trường này vẫn đọc được.
- Cuộc trò chuyện tiếp tục ở cùng gốc đa, sau đó trở về An và bà dưới mái hiên. Câu chuyện khép lại bằng việc nhớ người bạn, thay cho một khẩu hiệu đứng riêng.
- Đoạn An–bà do người chơi bấm tiếp, không tự chạy. Màn cuối giữ lời nhớ về người bạn đã chọn, nút đọc sách, chơi lại hành trình và xem lại cuộc gặp.
- Lựa chọn không cấp thêm cánh sao. Chơi lại tìm Hằng xóa lựa chọn của lượt tìm mới nhưng giữ thành tích Gác Trời và sổ tay.

## Kiểm tra

- `npm run check:audio`: chặn phát trước thao tác, một context, mute/pause, chống hiệu ứng trùng, âm thành công không bị tiếng bấm nuốt, cleanup và trường hợp không hỗ trợ.
- `npm run check:gac-rabbit`: giữ save cũ, tải lại từng bước, hành động lặp/cũ, lựa chọn câu chuyện, đoạn về nhà và không cấp lại cánh sao.
- `npm run check:book` và `npm run check:book-flow`: danh mục Việt/Anh, luồng sách và dữ liệu xuất PDF.
- Kiểm tra trình duyệt với đồng hồ đo tín hiệu âm: có tín hiệu khi bật, về 0 khi tắt/tạm dừng. Kiểm tra thủ công tìm Thỏ, nhặt quà, chuyển chặng, chọn chuyện, đoạn An–bà và bố cục hẹp.
- Script `check:ending-progress` hiện còn kỳ vọng cũ `t03-map` trong khi luồng v2 đã vào `t03-walk`; phần này không được thay đổi bởi đợt âm thanh/đoạn kết.

Chưa kiểm tra trên thiết bị iOS/Android thật; cần nghe thử với loa/tai nghe mục tiêu để tinh chỉnh âm sắc, âm lượng. Có thể thay bộ tổng hợp bằng bản thu có quyền sử dụng khi có tài nguyên phù hợp.
