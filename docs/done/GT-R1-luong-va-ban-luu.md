# GT-R1 — Luồng và bản lưu

Hoàn thành ngày 06/11/2026, theo `docs/plan/gac-troi-tho-ngoc-anh-sao.md` và đặc tả GT-R0.

## Phần đã triển khai

- Revision dữ liệu Gác Trời tăng từ 2 lên 3. Phiên bản bao lưu toàn trò chơi vẫn là 18: bộ đọc hiện tại hỗ trợ revision chương, không cần đổi định dạng ngoài.
- `gac-troi-rabbit.ts` chứa luồng mới: chuyện thật → cầu nối → triền đất → khe đá → cây đa → gặp Hằng → chia tay → ở lại. `rabbitJourney` lưu chặng, lượt thoại, số chặng xong, đã tìm Thỏ, số sao thức và hoàn thành gặp/chia tay.
- Mỗi thao tác trả ngay bản lưu mới. Mã chặng, số sao và số lượt thoại trong action giúp bỏ qua thao tác lặp hoặc tới muộn. Chặng chỉ chuyển khi đủ Thỏ và sao, qua nút đi tiếp riêng.
- Ba Thỏ, bốn sao (1+2+1). Tìm kiếm không phụ thuộc chia tay. Chỉ đặt `completedOnce` lúc chuyển farewell-03 sang farewell-04; không trao thưởng khi gọi sao. Replay giữ ánh sáng, sách và quyền xem kết truyện đã có, xóa tương tác của lượt chơi.
- Bản lưu revision 2 được chuẩn hóa bằng quy tắc cũ trước khi tạo con trỏ hành trình: T03/chia tay cũ về chuyện thật; T04 về đúng địa điểm với tương tác chưa làm; đang gặp Hằng về đầu cuộc gặp; đã gặp xong về cảnh tự do đã hoàn thành. Bảo toàn trạng thái ánh sáng, sách và các checkpoint phần kết cũ.
- `readGacRabbit` kiểm tra dữ liệu, chặn bỏ qua địa điểm và kẹp số sao/lượt thoại. Đọc/migration không tự ghi localStorage.

## Cổng phát hành và bàn giao

`gacRabbitReleased = false`. `startGacRabbitJourney` là điểm kích hoạt được bảo vệ bởi cổng và hoàn thành T02. Khi mở cổng, nó lấy địa điểm từ tiến trình cũ mới nhất, tránh dùng snapshot migration đã cũ trong thời gian trẻ vẫn chơi bản hiện hành; đồng thời mở sách chuyện ánh sáng.

Trong GT-R1, `phase`, `turn` và các receipt cũ tiếp tục phục vụ màn chơi hiện hành. `rabbitJourney` là con trỏ riêng của luồng mới; khi đã active, bộ điều khiển mới dùng nó làm nguồn cho cảnh, thoại và gợi ý. Không chuyển con trỏ mới thành phase T03/T04 cũ. Các checkpoint kết truyện cũ vẫn được bảo toàn độc lập.

GT-R2 nối `applyGacRabbitAction` qua cập nhật state và đường saveProgress hiện có, dựng cảnh từ `rabbitObjective`. Gửi action theo đúng mục tiêu/line được render; lưu trước animation. Mở sách, lộ trình hoặc đổi ngôn ngữ không reset journey.

GT-R3 chuyển renderer/điều kiện HUD, cảnh tự do và tiến trình thoại sang con trỏ mới, nối nội dung sách; khi đủ mọi cảnh mới mở cổng. Cờ hoàn thành chia tay và gặp Hằng của lượt mới nằm trong journey, còn `completedOnce` là ánh sáng đã nhận qua mọi lượt. Không dùng `enterGacTrail`/`keepGacClue` cũ để chuyển luồng mới. Không dẫn cảnh tự do mới vào thẻ.

## Kiểm chứng

- `npm run check:gac-rabbit`: migration T03, ba địa điểm T04, kết truyện cũ; luồng đủ 3 Thỏ/4 sao; tải lại qua saveProgress/readProgress sau từng hành động và lượt thoại; nhấn lặp/nhấn sai thứ tự; thưởng đúng câu; replay; sửa dữ liệu lỗi; cổng đóng.
- Các check hiện hành: `check:ending-progress`, `check:gac-troi`, `check:gac-light`, `check:gac-trail`, `check:book`, `check:book-flow` đều đạt.
- `npm run build` và `git diff --check` đạt. Build có cảnh báo chunk Phaser lớn hiện hữu.
- Chưa dựng hoặc kiểm thử giao diện hành trình mới; thuộc GT-R2–GT-R4. Các màn hiện hành giữ nguyên.
