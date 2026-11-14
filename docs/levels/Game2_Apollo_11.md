# Câu chuyện của Apollo 11 — Lấp Lánh (màn 2)

> Cập nhật 14/11/2026 theo mã nguồn. Tổng hợp nội dung hiện có, theo cấu trúc của [màn Mắt Tròn](Game1_Surveyor_3.md). Lấp Lánh là tên trò chơi đặt cho bảng gương phản xạ laser Apollo 11. Cuội, lau bụi và ánh sáng thắp đèn thuộc truyện; thông tin thiết bị và ảnh lịch sử được ghi nguồn riêng.

## 1. Thông tin thật về thiết bị

Bảng gương phản xạ laser của **Apollo 11** được đặt ở **Biển Yên Tĩnh — Mare Tranquillitatis**, năm **1969**. Thiết bị có **100 lăng kính phản xạ góc**, giúp ánh sáng quay về phía nguồn gửi. Bảng gương không cần pin hay động cơ để phản xạ và không tự phát laser. [NASA/JPL — The Apollo Experiment That Keeps on Giving](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [ILRS — Apollo 11](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html)

Đài quan sát trên Trái Đất gửi xung laser, đo thời gian đi và về để tính khoảng cách một chiều. Khoảng cách thay đổi theo quỹ đạo; **2,56 giây và 384.000 km là dữ liệu mô phỏng làm tròn trong game**. [NIST — To the Moon and Back in 2.5 Seconds](https://www.nist.gov/history/moon-and-back-25-seconds)

Hai ảnh kỷ niệm thuộc Apollo 11: **Buzz Aldrin đặt thiết bị xuống khi còn gấp**, rồi **Neil Armstrong mở và căn chỉnh**. Thứ tự lịch sử khác thứ tự nhận ảnh trong trò chơi. [Apollo 11 Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [LRRR Clevis Fasteners](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html)

## 2. Bối cảnh dựng game

Sau Mắt Tròn, Cuội theo điểm sáng tới Biển Yên Tĩnh. Lời dẫn thể hiện chuyến đi kỳ ảo qua những miền xa, không mô tả hai địa điểm nằm cạnh nhau. Màn mở khi Mắt Tròn đã hoàn thành lần đầu.

Lấp Lánh tinh nghịch, thích đố và chơi với ánh sáng. Bạn giữ hình dáng bảng lăng kính nghiêng trên giá đỡ thấp; không thêm mắt, miệng hoặc tay chân. Chân dung có chất liệu truyện thiếu nhi vẽ tay, hình trong cảnh dùng sprite pixel. Nền vẽ bằng mã, không phải bản đồ bãi đáp.

Mạch truyện: **theo điểm sáng → vòng qua hố → gặp bạn, nhận ảnh → lau kính, nhận ảnh → căn mô hình phản xạ → đo khoảng cách → kể hai ký ức theo thời gian → thắp cánh sao thứ hai → theo vòng gợn về lộ trình**.

Đèn và bộ đếm sao không chiếm diện tích thường trực trong thử thách. Đèn trở lại ở đoạn cảm ơn, theo tay Cuội trong hậu kết. Thứ tự người bạn là **02**, số cảnh website **04**; các bài bắt đầu từ T01.

## 3. Nội dung sách đồng hành đang có

Nhóm Lấp Lánh nằm sau Mắt Tròn, trước Tai Thính. Khi đã mở đủ, trình đọc có bảy mục; phân trang responsive có thể tạo thêm lá trong một mục.

| ID | Điều kiện | Nội dung |
| --- | --- | --- |
| `lap-lanh` | Mở chương | Giới thiệu người bạn trong trò chơi |
| `sparkle-photo-0` | Có kỷ niệm chỉ số 0 | Bảng phản xạ còn gấp, AS11-40-5945 |
| `sparkle-photo-1` | Có kỷ niệm chỉ số 1 | Bảng phản xạ đã triển khai, AS11-40-5952 |
| `sparkle-repair-clue` | Đạt điều kiện bài căn gương | “Bí mật của góc gương”, mô hình phản xạ |
| `sparkle-repair-clue-reality` | Trang căn gương được đọc | “Lăng kính phản xạ Apollo 11”, kiến thức về thiết bị thật |
| `sparkle-ranging-clue` | Đạt điều kiện bài đo khoảng cách | “Một lời chào, hai lượt đi” |
| `apollo-notebook` | `completedOnce` | Tổng kết sự kiện thật của bảng phản xạ Apollo 11 |

Sách chủ động kể ảnh theo thứ tự lịch sử **5945 → 5952**, khác thứ tự game tặng ảnh **5952 → 5945**. ID trang và chỉ số kỷ niệm được giữ để tương thích; metadata ảnh sách nằm trong [sparkle-pages.ts](../../src/content/book/sparkle-pages.ts), ảnh được tặng trong [images.ts](../../src/content/friends/lap-lanh/images.ts). Trang `lap-lanh-reality` còn trong catalog nhưng được lọc khỏi trình đọc hiện tại.

Mở khóa nội dung không tự lật sách. Gợi ý T03/T04 chọn `sparkle-repair-clue` hoặc `sparkle-ranging-clue`. Trang kiến thức trình bày sự thật và nguồn; giọng nhân vật, lời đố và cảm xúc thuộc hội thoại game.

## 4. Chi tiết## 4. Chi tiết các thử thách

### T01 — Theo điểm sáng

Cuội tìm đường vòng qua **sáu hố** tới vùng sáng bên phải. Đi bằng WASD, mũi tên hoặc bấm/chạm đất; đi xa nhỏ lại, đi gần lớn hơn. Hố hiện từ lời dẫn đầu bài, có lối vòng và khoảng đệm cho vùng đích.

Chạm mép hố thì dừng, có lời Cuội nhắc; không nhảy hoặc rơi rồi xuất hiện lại ở đầu. Tới đích chuyển sang cảnh không có hố thử thách, Cuội ở trái và Lấp Lánh ở giữa. Đến gần nhấn E hoặc bấm thiết bị để trò chuyện, rồi nhận ảnh đầu tiên. [SparkleLevel.tsx](../../src/components/friends/lap-lanh/SparkleLevel.tsx), [PreviewScene.ts](../../src/game/scenes/preview-scene.ts)

### T02 — Cuội lau kính

Bấm/kéo chuột, dùng cảm ứng hoặc Tab và Enter để lau **24 ô bụi**. Đủ 100% mở nút nhận ảnh thứ hai. 24 ô là cách chia vùng thao tác, không phải số lăng kính thật.

Lau bụi là hoạt động tưởng tượng. Hai ảnh lịch sử không phải cặp trước/sau hành động của Cuội. Panel dành đủ chỗ cho thao tác, không có thanh cuộn nội bộ ngoài ý muốn. [SparkleCleaning.tsx](../../src/components/friends/lap-lanh/SparkleCleaning.tsx)

### T03 — Sửa kính phản xạ Apollo 11

Đây là **mô hình 2D**, không phải xoay lăng kính thật. Gương 1 cố định, người chơi xoay gương 2 trong khoảng **0°–180°** theo gương 1. Kéo gương hoặc dùng thanh góc bằng bàn phím rồi gửi tia để thử.

Mô phỏng tính giao điểm và phản xạ từ góc hiện tại. Thành công khi tia chạm lần lượt hai gương rồi lọt khe nhận hẹp. Hai gương vuông góc đưa hướng tia ra ngược hướng tia vào; **89°/91° trượt khe**. Không dùng kiểm tra góc đúng thay cho tính đường tia. Xoay lại xóa kết quả lần thử trước.

Sách và bài dùng cùng sơ đồ. Chú thích phân biệt mô hình hai mặt với lăng kính **ba mặt vuông góc** của thiết bị thật. [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [sparkle-optics.ts](../../src/game/scenes/lap-lanh/optics.ts), [Apache Point — Retroreflector Arrays](https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/)

### T04 — Lời chào mất bao lâu?

Gửi xung từ Trái Đất, quan sát đồng hồ đo **2,56 giây cho cả lượt đi lẫn về**. Menu tạm dừng đồng hồ. Sau phép đo, nhập số và chọn dấu:

```text
300.000 × 2,56 ÷ 2 = 384.000 km
```

Chấp nhận dấu phẩy hoặc chấm ở số thập phân. Nộp bằng nút hoặc Enter; thiếu/sai có phản hồi và được sửa. Đã đo và nộp đúng thì vào ngay lời dẫn hồi tưởng, không thêm bước xác nhận khoảng cách. [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [SparkleBookClue.tsx](../../src/components/friends/lap-lanh/SparkleBookClue.tsx)

## 5. Ảnh kỷ niệm, đoạn kết và thông điệp

| Ảnh và file trong `public/images/memories/lap-lanh/` | Nhận | Hồi tưởng |
| --- | --- | --- |
| **AS11-40-5952** · `apollo-11-deployed-as11-40-5952.webp` · Đã mở và căn chỉnh | Sau cuộc gặp, trước T02 | Thứ hai |
| **AS11-40-5945** · `apollo-11-placement-as11-40-5945.webp` · Vừa đặt xuống, còn gấp | Sau T02 | Thứ nhất |

Ảnh ghi NASA và mã tư liệu; không suy ra lượng bụi từ độ tối/sáng. Nguồn đối chiếu: [Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [ghi chú triển khai](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html). Chân dung/sprite minh họa không dùng làm ảnh lịch sử.

Sau T04, Lấp Lánh kể **5945 → 5952**. Mỗi trang kể ngắn, vừa khung, không dồn toàn bộ kiến thức và thành tích của Cuội vào một đoạn. Trở lại cảnh trăng, bạn cảm ơn và thắp **cánh sao thứ hai**. Thông điệp: một thiết bị nhỏ vẫn có thể giúp con người hiểu thêm những khoảng cách rất xa. [SparkleEnding.tsx](../../src/components/friends/lap-lanh/SparkleEnding.tsx)

Hậu kết cho đi ngang, giữ y/scale, đèn theo tay. Có **Xem lại đoạn kết / Chơi lại / Về lộ trình**. Bấm bạn để đi tới hoặc đến gần nhấn E: bạn cảm ơn Cuội ghé trò chuyện, rồi gợi nhìn **vòng gợn ở rìa phải**. Đi tới đó trở về lộ trình; vòng gợn gợi Tai Thính, thuộc cách kể kỳ ảo. Hội thoại nghe lại không trao thêm phần thưởng. [ending-chat.ts](../../src/content/story/ending/friend-dialogue.ts), [EndingTrail.tsx](../../src/components/shared/EndingTrail.tsx)

Chơi lại từ lời dẫn chuyển vùng, giữ hai ảnh và `completedOnce`; xem lại kết giữ đáp án và ảnh. Hoàn thành mở Tai Thính; xem lại/chơi lại không tăng sao trùng. Bộ đọc vẫn tiếp nhận góc cũ `repairRotation` và phase cũ theo [progress.ts](../../src/content/friends/lap-lanh/progress.ts).

## 6. Bảng đối chiếu thông tin và nguồn

| Thông tin | Trong game/sách | Nguồn chính |
| --- | --- | --- |
| Apollo 11, Biển Yên Tĩnh, 1969 | Giới thiệu, ảnh, hồi tưởng | [ILRS — Apollo 11](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html) |
| 100 lăng kính; phản xạ thụ động | Sách, thoại, T03 | [NASA/JPL](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [Apache Point](https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/) |
| Aldrin đặt xuống; Armstrong mở/căn chỉnh | Chú thích, thứ tự hồi tưởng | [Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [LRRR Clevis Fasteners](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html) |
| Thời gian khứ hồi tính khoảng cách | T04, sách | [NIST](https://www.nist.gov/history/moon-and-back-25-seconds) |
| Hai gương, khe nhận, 24 ô bụi, 2,56 giây | Bài chơi | Mô hình và số liệu minh họa của game |
| Cuội lau kính, thiết bị nói chuyện, cánh sao, vòng gợn | Kịch bản | Sáng tác của trò chơi |

## 7. Ghi chú duy trì màn

- Hội thoại: [dialogue.ts](../../src/content/friends/lap-lanh/dialogue.ts); bản lưu: [progress.ts](../../src/content/friends/lap-lanh/progress.ts); điều phối: [App.tsx](../../src/App.tsx); sách: [JourneyMap.tsx](../../src/components/journey/JourneyMap.tsx).
- Nền: [sparkle-scenery.ts](../../src/game/scenes/lap-lanh/scenery.ts). Chân dung `public/images/portraits/lap-lanh.webp`; sprite một frame nghỉ `public/images/sprites/lap-lanh-idle.webp`.
- Dùng kiểu nút, Gợi ý và giữ focus chung theo [hướng dẫn màn mới](../design/level-design-guide.md). Chat đặt theo vùng trống, không che thiết bị/đèn; màn hẹp đưa panel xuống dưới cảnh.
- Kiểm tra trước đây đã rà bố cục Việt/Anh màn rộng/hẹp, hồi tưởng ngắn, nhập số, focus và hậu kết. Đây là ghi nhận bàn giao, chưa phải đánh giá với học sinh hoặc xác nhận mọi trình duyệt.
- Ý tưởng tìm ảnh dưới hố bằng đèn, thêm ảnh đài laser hoặc LRO chưa thuộc luồng hiện tại. Không coi chúng là T03/T04 còn thiếu.

## Bảo trì và xác nhận hiện tại · 14/11/2026

Tuyến chơi gồm Mắt Tròn → Lấp Lánh → Tai Thính → Bánh Lưới → Gác Trời. Mỗi bạn đóng góp một cánh đèn; bộ lưu chung dùng schema v20 và đọc bản v1–v20. Điều kiện mở chương nằm trong [friends/index.ts](../../src/content/friends/index.ts), điều kiện trang sách trong [reading-order.ts](../../src/content/book/reading-order.ts).

Trang kiến thức dùng tiêu đề, ảnh tư liệu có chú thích khi phù hợp, đoạn văn ngắn và nguồn ở chân trang theo [references.md](../references.md). Trang “Có yếu tố trò chơi” không cần hiện nguồn. Quy định mới nhất nằm trong [AGENTS.md](../../AGENTS.md).

Hai PDF `public/books/Truyen.pdf` và `Truyen_en.pdf` được mở nguyên bản trong tab mới và phải giữ nguyên. Sách đồng hành có điều kiện mở và cách chia trang riêng, không bắt buộc khớp số trang PDF. Xem [cơ chế sách đồng hành và PDF](../README.md#sách-đồng-hành-và-pdf).

Các script `check:*` và fixture đã được gỡ. Còn `npm run typecheck`, `npm run build` và `npm run preview`. Lần cập nhật này đối chiếu mã nguồn và sửa tài liệu, không phải lượt nghiệm thu giao diện hoặc xác minh lại các website nguồn.
