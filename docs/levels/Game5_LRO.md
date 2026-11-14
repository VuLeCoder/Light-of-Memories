# Câu chuyện LRO — Gác Trời (màn 5)

Bản tổng hợp theo mã nguồn hiện tại, cập nhật **14/11/2026**. Gác Trời là **người bạn thứ năm**, sau Mắt Tròn, Lấp Lánh, Tai Thính và Bánh Lưới. Tài liệu mô tả nội dung đã triển khai, không phải kế hoạch màn mới. Lời thoại Việt/Anh giữ tại [module nội dung](../../src/content/friends/gac-troi/dialogue.ts).

## 1. Thông tin thật về LRO

Gác Trời nhân cách hóa **Lunar Reconnaissance Orbiter (LRO)**, tàu quan sát Mặt Trăng từ quỹ đạo. Hệ máy ảnh **LROC** ghi lại bề mặt, giúp nghiên cứu địa hình và các dấu vết tại những khu vực đã được thám hiểm. Ảnh quỹ đạo không phải ảnh cận cảnh: không thể nhìn rõ mọi vật nhỏ, cũng không dùng ảnh toàn khu Apollo 11 để khẳng định đã nhìn thấy chi tiết bảng phản xạ laser.

Phần kiến thức trong game kể ba công việc: nhận ra địa điểm quen thuộc từ trên cao, so sánh ảnh để tìm thay đổi và nghiên cứu ánh sáng/bóng tối gần cực. T02 dùng ảnh trước/sau vụ va chạm ngày **17/03/2013**, với hố mới rộng khoảng **18 m** theo nội dung đang dùng. Kính thiên văn trên Trái Đất ghi nhận chớp sáng; ảnh LRO sau đó giúp tìm chiếc hố.

Cuội, tàu biết nói qua đèn, bản đồ tới chị Hằng và ánh sáng thắp đèn là hư cấu. Cuội vẫn ở trên mặt đất khi trò chuyện; cảnh quỹ đạo là minh họa không theo tỉ lệ. Ba hướng nắng ở T03 là mô hình giáo dục, không đủ chứng minh một địa điểm thật bị che nắng vĩnh viễn.

Các dữ kiện trên được tổng hợp từ nội dung và hồ sơ nguồn của dự án; lần viết tài liệu này không thực hiện xác minh độc lập trên website nguồn.

## 2. Bối cảnh dựng game

Sau Bánh Lưới, Cuội gặp người bạn bay trên cao để tìm đường tới chị Hằng. Gác Trời giới thiệu góc nhìn từ quỹ đạo, mời Cuội nhìn lại những nơi đã qua, rồi cùng quan sát một thay đổi mới và bóng tối trong miệng hố.

Cảnh dùng nền Mặt Trăng và tàu quan sát trên cao; chân dung minh họa phục vụ thoại/sách. Không dựng cuộc gặp thành việc Cuội đứng cạnh tàu trên quỹ đạo. Nội dung hình ảnh và nhãn truy cập nhắc rõ vị trí Cuội trên mặt đất và giới hạn tỉ lệ minh họa.

Luồng chính: **gặp bạn → T01 ghép ký ức → tổng kết → T02 so sánh ảnh → câu chuyện va chạm → T03 trực gác → hồi tưởng ba trang → cảm ơn, trao ánh sáng → gặp chị Hằng**. [Giao diện màn](../../src/components/friends/gac-troi/GacTroiLevel.tsx), [cảnh nền](../../src/game/scenes/gac-troi/scenery.ts).

## 3. Nội dung sách đồng hành đang có

Sách lưu kiến thức và ảnh theo ID ổn định. Mở khóa trang không đồng nghĩa tự hoàn thành thử thách; việc mở khóa không tự đổi trang đang đọc.

| ID | Mốc mở | Nội dung |
| --- | --- | --- |
| `gac-book-orbit` | Chương đã được mở | Giới thiệu Gác Trời trong trò chơi |
| `gac-book-sites` | Qua cuộc gặp hoặc đã có quyền đọc tương ứng | “Bốn người bạn, ba vùng đất”, gợi ý T01 |
| `gac-book-impact` | Bắt đầu so sánh ảnh hoặc đã có quyền đọc | “Một dấu vết mới”, hướng dẫn T02 |
| `gac-book-impact.story` | Hoàn tất T02 hoặc đã có quyền đọc | “Chớp sáng và chiếc hố”, kiến thức thật |
| `gac-book-light` | Tới bài quan sát T03 hoặc đã có quyền đọc tương ứng | “Ánh sáng và bóng tối”, gộp nội dung trang bản đồ cũ |
| `lro-notebook`, `lro-notebook-mapping` | `completedOnce` | Hai trang sự kiện thật về LRO, LROC và LOLA |

Bốn ID `gac-memory-*` vẫn có thể được ghi trong bản lưu khi ghép, nhưng không còn tạo bốn trang riêng trong sách trình duyệt. `gac-book-map` là quyền đọc tương thích; nội dung hiển thị tại `gac-book-light`, không tạo mục thứ tám. Không dùng số ID trong `bookUnlocks` làm số trang nhìn thấy.

Gợi ý T01 tới `gac-book-sites`; T02 tới trang so sánh; T03 tới `gac-book-light`. Riêng `t03-intro` sau khi xong T02 vẫn chọn `gac-book-impact.story`. Nguồn khai báo: [lời sách](../../src/content/friends/gac-troi/book-copy.ts), [tiến trình](../../src/content/friends/gac-troi/progress.ts), [thứ tự trình đọc](../../src/content/book/reading-order.ts).

## 4. Chi tiết các thử thách

### T01 — Ghép ký ức

Chọn một người bạn rồi chọn vùng đất tương ứng trong ba vùng ảnh quỹ đạo:

| Người bạn | Đáp án | Câu chuyện sau khi ghép |
| --- | --- | --- |
| Mắt Tròn — Surveyor 3 | Apollo 12 · Đại Dương Bão | Phi hành gia ghé thăm năm 1969, mang camera và một số bộ phận về nghiên cứu; ảnh Conrad cạnh Surveyor 3 |
| Lấp Lánh | Apollo 11 · Biển Yên Tĩnh | Bộ phản xạ trả ánh sáng laser về phía nguồn; ảnh quỹ đạo có chú thích khu Apollo 11 |
| Tai Thính | Apollo 12 · Đại Dương Bão | PSE thuộc cụm ALSEP, đo rung động |
| Bánh Lưới | Apollo 15 · Hadley–Apennine | Xe chở phi hành gia năm 1971, dấu vết được nhìn từ quỹ đạo |

Chỉ cặp đúng mới ghi `matched` và ghi quyền ký ức vào bản lưu; lời kể của cặp xuất hiện trong bài ghép. Người chơi phải xem xong câu chuyện của cặp vừa ghép để ghi `seen` trước khi ghép tiếp. Đủ bốn câu chuyện mới chuyển tổng kết và mở lời dẫn T02. Chọn sai không tăng tiến trình; không có điều kiện thời gian hay điểm phạt trong mô hình.

[Định nghĩa cặp và lời kể](../../src/content/friends/gac-troi/challenges/matching.ts), [giao diện](../../src/components/friends/gac-troi/GacTroiMatching.tsx).

### T02 — Đốm mới trong bức ảnh

Hai ảnh cùng vùng đất đặt cạnh nhau: **trước 12/02/2012**, **sau 28/07/2013**. Ngày va chạm 17/03/2013 được ghi riêng, không nhầm với ngày chụp. Người chơi đối chiếu ba vùng đánh số rồi chọn vùng có đốm mới; đáp án là **vùng 2**.

Nút trả lời chỉ mở khi cả hai ảnh sẵn sàng. Hover/focus đánh dấu vùng tương ứng, không ghi đáp án. Chọn sai nhắc nhìn lại vùng giữa; chọn đúng chuyển một lần sang ảnh sau có khoanh vùng và bốn lượt thoại giải thích. Đọc hết mới ghi `t02Done` và mở T03. Không yêu cầu bấm chính xác một điểm nhỏ trên ảnh.

Ảnh dùng `impact2013-before.webp`, `impact2013-after.webp`; nguồn NASA SVS 4242. [Dữ liệu](../../src/content/friends/gac-troi/challenges/impact.ts), [giao diện](../../src/components/friends/gac-troi/GacTroiImpact.tsx).

### T03 — Trực gác vùng tối

Bài hiện tại là **mặt cắt miệng hố có thanh kéo hướng nắng**, không phải bài đi thắp ba ngọn đèn hoặc chọn nhánh đường. Người chơi kéo nắng qua ba hướng, quan sát **Thềm trái / Đáy sâu / Thềm phải**, rồi chọn vùng vẫn tối qua cả ba hướng và bấm **Ghi vào sổ trực**.

Sổ lưu các hướng đã quan sát. Chưa đủ ba hướng thì chưa chọn được vùng; chưa chọn vùng thì chưa ghi sổ. Đáp án là **Đáy sâu**. Nếu chọn thềm, bài đưa về hướng nắng làm thềm ấy sáng để người chơi xem lại. Sai được sửa, không mất các hướng đã quan sát.

Ghi đúng đặt `shadowWatch.recorded`, giữ đủ ba `routeLandmarks` để tương thích điều kiện tiến trình, mở `gac-book-map`, rồi cho bấm **Tiếp tục** tới hồi tưởng. Các ID mốc đường được giữ trong bản lưu không có nghĩa người chơi vừa thực hiện bài tìm đường cũ.

Hình minh họa có thành hố che đĩa Mặt Trời và các tia dừng tại địa hình; đây là sơ đồ, không phải mô phỏng chiếu sáng của một hố thật. Hồi tưởng giải thích rằng kết luận khoa học cần nhiều ảnh và dữ liệu địa hình. [Giao diện và mô hình](../../src/components/friends/gac-troi/GacRestLight.tsx), [phản hồi](../../src/content/friends/gac-troi/challenges/shadow-watch.ts).

## 5. Đoạn kết, phần thưởng và thông điệp

Sau lời cảm ơn ca trực, Gác Trời kể lại ba trang:

1. **Những nơi quen từ trên cao:** ảnh khu Apollo 12/Surveyor 3 có chú thích; nhắc giới hạn nhìn vật nhỏ.
2. **Mặt Trăng vẫn đổi thay:** ảnh sau va chạm; nối chớp sáng quan sát từ Trái Đất với hố được tìm trên ảnh.
3. **Một ca trực vùng tối:** bản đồ chiếu sáng cực nam từ nhiều ảnh LROC; phân biệt quan sát mô hình với kết luận khoa học.

Có trang trước/trang tiếp, chú thích và credit; ảnh lỗi có nút tải lại. Sau trang cuối trở lại lời chia tay, Gác Trời gửi ánh sáng vào đèn. Hoàn tất chia tay mới ghi `farewellDone` và `completedOnce`.

Tuyến hiện tại có năm bạn, mỗi bạn đóng góp một cánh: **Mắt Tròn × 1 + Lấp Lánh × 1 + Tai Thính × 1 + Bánh Lưới × 1 + Gác Trời × 1 = 5/5**. Gác Trời thắp cánh thứ năm; `App.tsx` tính số sao từ số bạn có `completedOnce`.

Trong `App.tsx`, lần chia tay đầu kích hoạt chuyển cảnh ánh sao rồi mở cuộc gặp chị Hằng, lưu `hangArrival`. Đoạn kết tiếp nối gồm trò chuyện dưới gốc đa, mini game “Bạn hay rác?”, trở về An và bà, giới thiệu thành viên và về lộ trình. Đây là phần kết chung của câu chuyện; hoàn thành chương Gác Trời và hoàn thành toàn truyện có dấu lưu riêng.

Giao diện hậu kết Gác Trời vẫn có **Xem lại đoạn kết / Chơi lại / Về lộ trình**. Xem lại đặt phase về hồi tưởng; không phải con trỏ xem lại độc lập. Chơi lại tạo lượt mới, giữ `hangArrival`, quyền hoàn thành chương/toàn truyện và các mục sách đã mở; không cộng trùng sao. Mã T04 tìm triền đất, khe đá và cây đa vẫn tồn tại, nhưng không dùng sự hiện diện của mã đó để mô tả luồng tự động hiện tại.

Thông điệp: nhìn kỹ và đối chiếu giúp đọc được câu chuyện trong những dấu vết nhỏ; góc nhìn từ xa có ích nhưng luôn có giới hạn.

[Hồi tưởng](../../src/components/friends/gac-troi/GacTroiEnding.tsx), [nội dung ba trang](../../src/content/friends/gac-troi/ending-copy.ts), [điều phối](../../src/App.tsx), [kết chung](../../src/components/ending/HangFinale.tsx).

## 6. Bảng đối chiếu thông tin và nguồn

Các liên kết dưới đây lấy từ hồ sơ nội dung của dự án.

| Thông tin / tư liệu | Trong game | Nguồn |
| --- | --- | --- |
| LRO và hệ thiết bị | Giới thiệu, sách quỹ đạo | [NASA — Spacecraft and Instruments](https://science.nasa.gov/mission/lro/spacecraft-and-instruments/) |
| Khu Apollo 11 nhìn từ quỹ đạo | T01, ký ức Lấp Lánh | [NASA — Apollo 11 Landing Site](https://science.nasa.gov/resource/apollo-11-landing-site/) |
| Apollo 12 và Surveyor 3 nhìn từ quỹ đạo | T01, hồi tưởng | [NASA — First Look](https://science.nasa.gov/photojournal/first-look-apollo-12-and-surveyor-3/) |
| Conrad cạnh Surveyor 3, AS12-48-7134 | Câu chuyện Mắt Tròn | [NASA — Apollo 12 and Surveyor 3](https://science.nasa.gov/resource/apollo-12-and-surveyor-3/) |
| Cặp ảnh va chạm 2013 | T02 | [NASA SVS 4242](https://svs.gsfc.nasa.gov/4242/) |
| Tham chiếu địa hình/chiếu sáng | Sơ đồ T03 và hồi tưởng | [Nguồn LRO trong references.md](../references.md) |
| Khu Apollo 15 từ quỹ đạo | Cặp Bánh Lưới trong T01 | [LROC — Apollo 15](https://lroc.im-ldi.com/images/491) |
| Ba hướng nắng, ba vùng chọn, đáp án cố định | Bài chơi T03 | Mô hình giáo dục trong mã nguồn |
| Trò chuyện qua đèn, trao sáng, bản đồ tới chị Hằng | Kịch bản | Sáng tác của trò chơi |

Ảnh runtime đặt tại `public/images/memories/gac-troi/`; chân dung tại `public/images/portraits/gac-troi.webp`. Metadata ảnh có alt Việt/Anh, credit và trang nguồn trong [images.ts](../../src/content/friends/gac-troi/images.ts). Ảnh hồi tưởng thứ ba dùng `south-pole-illumination.png`.

## 7. Ghi chú duy trì màn

- Nội dung chia theo `src/content/friends/gac-troi/`; giữ lời thoại Việt/Anh ở module nguồn, tránh tạo bản thoại thứ hai trong Markdown.
- Bản lưu chương dùng `revision: 4` trong schema chung v20; reader kiểm tra thứ tự điều kiện T01, T02, T03 và đoạn sau, đồng thời đọc dữ liệu cũ. Quyền `legacyMatchingComplete` hỗ trợ bản lưu tuyến cũ; không tự tạo cặp ghép mới. Khi chưa hoàn thành chương và còn thiếu bạn, reader có thể đưa về bài ghép; chơi lại dùng đủ bốn bạn. `shadowWatch` giữ hướng đã xem, vị trí và kết quả ghi sổ.
- Các phase `t03-walk`, `t03-dark-intro`, dữ liệu nhánh đường và T04 còn phục vụ mã tương thích/lịch sử; bài mở từ lời dẫn T03 hiện đi thẳng tới `t03-map` với sơ đồ trực gác.
- Khi sửa đoạn kết, đối chiếu cả [flow.ts](../../src/content/friends/gac-troi/flow.ts), [progress.ts](../../src/content/friends/gac-troi/progress.ts) và `App.tsx`; chỉ đọc reducer sẽ bỏ sót cơ chế tự mở chị Hằng.
- Lần cập nhật này chỉ đọc mã và viết tài liệu; chưa chạy lại game, kiểm thử giao diện hoặc xác minh tư liệu trực tuyến. Không coi đây là biên bản kiểm thử mới.

## Bảo trì và xác nhận hiện tại · 14/11/2026

Tuyến chơi gồm Mắt Tròn → Lấp Lánh → Tai Thính → Bánh Lưới → Gác Trời. Mỗi bạn đóng góp một cánh đèn; bộ lưu chung dùng schema v20 và đọc bản v1–v20. Điều kiện mở chương nằm trong [friends/index.ts](../../src/content/friends/index.ts), điều kiện trang sách trong [reading-order.ts](../../src/content/book/reading-order.ts).

Trang kiến thức dùng tiêu đề, ảnh tư liệu có chú thích khi phù hợp, đoạn văn ngắn và nguồn ở chân trang theo [references.md](../references.md). Trang “Có yếu tố trò chơi” không cần hiện nguồn. Quy định mới nhất nằm trong [AGENTS.md](../../AGENTS.md).

Hai PDF `public/books/Truyen.pdf` và `Truyen_en.pdf` được mở nguyên bản trong tab mới và phải giữ nguyên. Sách đồng hành có điều kiện mở và cách chia trang riêng, không bắt buộc khớp số trang PDF. Xem [cơ chế sách đồng hành và PDF](../README.md#sách-đồng-hành-và-pdf).

Các script `check:*` và fixture đã được gỡ. Còn `npm run typecheck`, `npm run build` và `npm run preview`. Lần cập nhật này đối chiếu mã nguồn và sửa tài liệu, không phải lượt nghiệm thu giao diện hoặc xác minh lại các website nguồn.
