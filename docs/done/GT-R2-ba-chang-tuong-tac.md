# GT-R2 — Ba chặng tương tác

Ngày bàn giao: 06/11/2026. Triển khai theo [GT-R0](../plan/gt-r0-kich-ban-va-bo-cuc.md), dùng giao dịch/bản lưu [GT-R1](GT-R1-luong-va-ban-luu.md).

## Phần đã triển khai

- Ba chặng triền đất → khe đá → cây đa: ba lần tìm Thỏ, bốn sao theo thứ tự 1 + 2 + 1. Chỉ một mục tiêu tiến trình hoạt động; không cần chọn đường, đi bộ hay mở sách để qua chặng.
- Thỏ lộ tai/đuôi, nhảy ra; ở khe đá có nét mặt hắt hơi. Sao ngủ mắt khép, khi thức có mắt mở, ngáp/vươn vai; đường chấm sáng và Hằng chỉ hiện sau sao cuối tại cây đa. Cuội giữ đèn ông sao, đi một đoạn ngắn khi chuyển chặng.
- Nội dung nhắc, gợi ý, thành công và chạm nhầm đủ VI/EN theo GT-R0. Gợi ý ở thanh đầu ngay trước Về lộ trình; viền sáng giữ tới thao tác đúng, không nhấp nháy. Ready ẩn nút gợi ý và hiện Đi tiếp/Gặp chị Hằng.
- Nút HTML hỗ trợ chuột, cảm ứng, Tab, Enter, Space. Mục tiêu mới/nút tiếp nhận focus sau phản ứng. Phản hồi dùng role=status; nền trống không báo lỗi.
- Vùng chạm tối thiểu 48 CSS px, hình mục tiêu tối thiểu 32 CSS px. ResizeObserver tắt vật phụ khi khoảng cách giữa vùng chạm không đạt 8 px; ưu tiên mục tiêu chính.
- Lưu giao dịch trước phản ứng, chặn thao tác lặp trong 600/700/1000 ms. Tải lại hiển thị tư thế đã lưu, không phát lại phản ứng. Giảm chuyển động chuyển ngay tới tư thế cuối; không phụ thuộc âm thanh.
- Nền tái dùng drawGacTrail với tùy chọn riêng cho hành trình Thỏ: bỏ sao lớn cũ và sổ/thẻ, tách Hằng ra khỏi nền. Mặc định của các cảnh cũ được giữ nguyên.

## Điểm nối GT-R3

`GacRabbitTrail` nhận language/progress/onChange/onBack/paused; chỉ mount khi rabbitJourney.active và stage là slope/rock/banyan. `onChange` phải lưu toàn bộ tiến trình như những màn hiện tại. Khi paused, phản ứng/gợi ý tạm thời được xóa, receipt vẫn giữ.

`GacTroiTrail` đã chuyển tới thành phần mới nếu nhận một stop đang active. Cổng `gacRabbitReleased` **vẫn false**. App chưa tự bắt đầu hành trình mới: GT-R3 cần chọn renderer theo rabbitJourney, nối real/bridge và reunion/farewell/free, cập nhật thoại/sách/phần thưởng rồi mở cổng. Không bật cổng sớm chỉ để thử màn này.

Không dùng phase/turn cũ để đọc tiến trình của hành trình Thỏ. Nút cuối cây đa chỉ lưu stage=reunion; không tự mở thoại. GT-R2 không thay nội dung kết truyện hay trao thưởng.

## Kiểm tra

- `npm run build`: đạt; còn cảnh báo kích thước chunk Phaser hiện có.
- `npm run check:gac-rabbit`, `check:gac-trail`, `check:gac-troi`, `check:gac-light`, `check:ending-progress`: đạt các assertion dữ liệu/luồng cũ và mới. Một số script SSR hiện có phát log Vite dep-scan khi đóng server; không có assertion thất bại.
- `npm run check:gac-rabbit-ui`: trang dựng riêng dùng thành phần thật, 12 hành trình đầy đủ ở 320/640/960 px × VI/EN × chuyển động thường/giảm chuyển động. Kiểm tra bàn phím/cảm ứng, focus, gợi ý, chạm nhầm, vùng chạm, tràn ngang, pause và tải lại mỗi receipt, tải lại trong phản ứng, chặn nhấn lặp; ba chặng đi tới reunion và không có lỗi JavaScript.
- Kiểm tra ảnh chụp màn 320 và 960 px: cảnh đủ 16:9, nội dung/nút nằm ngoài cảnh, Hằng và đường sáng hiện đúng ở cuối. Ảnh kiểm tra tạm ở `/tmp/gac-rabbit-*.png`, không thêm vào tài nguyên game.
- `git diff --check`: đạt.

Script UI cần Playwright và Chrome tại `/usr/bin/google-chrome` đang có trong môi trường kiểm tra; chúng không phải phụ thuộc chạy game. Fixture chỉ được phục vụ bởi máy chủ kiểm tra, không có đường dẫn trong bản build sản phẩm.

Đây là kiểm tra thành phần ba chặng sau cổng phát hành. Hồi quy toàn ứng dụng với sách/lộ trình thật, đổi ngôn ngữ tại chỗ, điều khiển chung và chơi thử với trẻ thuộc GT-R3–GT-R4; chưa tuyên bố đã kiểm chứng độ vui/dễ hiểu với trẻ.
