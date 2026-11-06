# Hành trình ba người bạn — bàn giao triển khai

Ngày: 06/11/2026.

Tuyến chính: **An và bà → Cuội tỉnh giấc → Mắt Tròn → Bánh Lưới → Gác Trời → chị Hằng → cây đa → An và bà**.

## Milestone

| Mốc | Kết quả |
| --- | --- |
| M0 | Kịch bản Việt/Anh thống nhất mục đích tìm chị Hằng. Cây đa giới thiệu ba cuộc gặp; mỗi cuộc gặp làm đèn sáng thêm. Tái sử dụng cảnh mở đầu, ảnh khoa học và chân dung. |
| M1 | Ba điểm trên lộ trình; mở khóa theo thứ tự Mắt Tròn, Bánh Lưới, Gác Trời. Bộ đếm 0/3–3/3; hình đèn vẫn năm cánh, sáng lần lượt 1–3–5 cánh. Save v16 đọc v1–v15. |
| M2 | Mắt Tròn chỉ dẫn Cuội đi tiếp tới Bánh Lưới. Ánh đèn đưa Cuội tới thung lũng mới; dấu bánh xe thuộc vùng Apollo 17. Giữ đoạn gửi ảnh qua đèn và cách về lộ trình ở mép phải sau kết Bánh Lưới. |
| M3 | Gác Trời có ghép hai ký ức, nối thứ tự hai cuộc gặp, so sánh ảnh trước/sau hố va chạm. Gợi ý mở sách; ghép đúng làm tối thẻ. Hoàn thành ba hoạt động mới nhận lần thắp sáng cuối. |
| M4 | Đi nốt đoạn đường bằng điều khiển cũ; gặp chị Hằng; trở về cây đa; khép lời kể tại hiên nhà cùng An và bà. Có xem lại kết, về lộ trình và bắt đầu hành trình mới qua xác nhận. |
| M5 | Sách đồng hành, trang gợi ý, đọc thêm, nguồn ảnh và kiểm tra lưu/tiếp tục, chơi lại, Việt/Anh, màn rộng/hẹp. |

## Kịch bản và giới hạn khoa học

Mắt Tròn giúp Cuội quan sát dấu tích; Bánh Lưới giúp nhớ đường và đường về; Gác Trời cho góc nhìn từ trên cao. Các cuộc gặp dẫn tới bước tiếp theo trong việc tìm chị Hằng, thay vì chỉ trao phần thưởng.

Gác Trời chưa nhìn thấy chị Hằng và không thể nhìn rõ mọi vật nhỏ trên ảnh. Thử thách hố va chạm giải thích việc Mặt Trăng đổi thay, không coi hố là dấu vết của chị Hằng. Thứ tự các cuộc gặp là mạch truyện; ánh đèn không phải tuyến đường địa lý giữa các bãi đáp xa nhau.

Chị Hằng đã đi ngắm những đổi thay trên Mặt Trăng rồi dừng ở sườn đồi quen thuộc. Cuội tìm thấy chị; hai người trở về cây đa để kể chuyện. Cảnh An và bà khép lại câu hỏi ban đầu của An về việc Cuội có buồn không. Cuội và chị Hằng không xuống Trái Đất gặp An.

Nguồn lời thoại chạy thực tế: `src/content/moon-dialogue.ts`, `src/components/SurveyorEnding.tsx`, `src/content/levels/ban-banh-luoi-content.ts`, `src/content/levels/gac-troi-matching.ts`, `src/content/levels/gac-troi-finale.ts`, `src/content/ending.ts`. Các ID thoại nhất quán giữa Việt và Anh.

## Dữ liệu lưu và tương thích

- Giữ ID và dữ liệu Lấp Lánh/Tai Thính. Hai bạn không xuất hiện trong lộ trình bắt buộc; kiến thức và ảnh nằm ở mục đọc thêm. Các trang đọc thêm không kể rằng Cuội đã hoàn thành thử thách của hai bạn.
- Save đang mở một trong hai chương cũ trở về lộ trình; tiến độ những chương được giữ vẫn còn. Ghép Gác Trời cũ được lọc còn Mắt Tròn/Bánh Lưới; thứ tự nối cũ bỏ qua hai ID đã rời tuyến chính.
- `EndingProgress` lưu pha `idle/walk/reunion/home/earth/finished`, lượt thoại, lần hoàn thành và cờ cảnh đang mở. Rời phần kết giữ checkpoint nhưng không chiếm lại màn hình khi tải lại ở chương khác.
- Chơi lại Gác Trời giữ ánh sáng đã kiếm được; các hoạt động của lượt mới bắt đầu lại. Xem lại đoạn kết không tăng số người bạn. Hành trình mới đặt lại toàn bộ sau xác nhận.
- Footer 96px được giữ cả khi không có chữ. CSS mới giới hạn ở Gác Trời/phần kết, không đổi bảng màu, font, khung menu hoặc quy tắc điều khiển.

## Tài nguyên

- `public/images/memories/gac-troi/impact2013-before.webp`, `impact2013-after.webp`: bản WebP đã chuẩn bị trong M0 Gác Trời, cùng khung 1600×900. Nguồn [NASA SVS 4242](https://svs.gsfc.nasa.gov/4242/); ảnh gốc và manifest tại `docs/plan/ban-gac-troi/`.
- `public/images/sprites/chi-hang-idle.webp`: ảnh mới, alpha trong suốt, 256×384, tạo bằng built-in `imagegen` theo chân dung chị Hằng và spritesheet Cuội. Hiển thị quay trái bằng Phaser, không thay chân dung hiện có.
- Prompt tạo ảnh: “Use case: illustration-story. Asset type: transparent standalone 2D game sprite, exactly ONE full-body Hằng character. Reference 1: character identity and cream/jade traditional Vietnamese áo dài, black long hair in partial bun with jade pin, gentle face. Reference 2: visual style and proportions reference ONLY; make Hằng match this warm storybook pixel-edged/chibi game style, detailed expressive eyes, handpainted shading with crisp readable outline at small size, not simplistic block art. Show Hằng standing in relaxed three-quarter profile facing LEFT toward Cuội, hands loosely together in front, feet visible. Adult feminine character slightly taller than Cuội, friendly age-appropriate children's folktale. Full body centered with narrow clear transparent margin. Muted cream, sage jade, dark brown hair; no bright saturated new colors. Genuinely transparent alpha background, no glow, no ground shadow, no text, no extra objects, no sprite sheet, no duplicates. Preserve existing character identity. Output for insertion as a 160px-tall game character.”

## Kiểm tra

```sh
npm run typecheck
npm run build
npm run check:book
npm run check:book-flow
npm run check:gac-troi
# Cần Vite dev server đang chạy; mặc định Chrome tại /usr/bin/google-chrome.
npm run check:journey-browser
```

Có thể đặt `GAME_URL` và `CHROME_PATH` cho kiểm tra trình duyệt. Script dùng các module nguồn của Vite để tạo checkpoint cũ, sau đó thực hiện các tương tác qua giao diện.

Kiểm tra dữ liệu bao gồm khóa/mở theo ba bạn, lọc save cũ, đáp án sai/đúng, chuyện chưa đọc, nối thứ tự, nhận sáng đúng một lần, chơi lại và checkpoint từng pha kết. Kiểm tra sách bao gồm 52 trang/113 khối, nguồn tư liệu và 33 checkpoint mở trang/gợi ý.

Kiểm tra trình duyệt chạy 1440px/390px, cả Việt/Anh: toàn bộ Gác Trời và phần kết; tải lại giữa ký ức, nối đường và hội thoại; menu tạm dừng; gợi ý; ảnh lỗi/thử lại; hoàn tác; reset và mở đầu mới. Đo tràn khung, chiều cao footer và chụp ảnh vào `docs/plan/three-friends/verification/` (thư mục tài liệu cục bộ được gitignore).

Giới hạn kiểm chứng: Chrome giả lập chuột/chạm và bàn phím, chưa kiểm tra trên thiết bị di động thật hoặc trình đọc màn hình. Các minigame Mắt Tròn/Bánh Lưới giữ cơ chế cũ; lượt kiểm tra mới tập trung vào đoạn nối, mở khóa và phần nội dung được thay đổi. Build có cảnh báo kích thước bundle Phaser như trước.
