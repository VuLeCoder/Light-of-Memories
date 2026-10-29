# Câu chuyện Apollo 17 — Bánh Lưới (màn 4)

Bản bàn giao M0–M7 và cập nhật thiết kế lại T01/T02/T03, cập nhật **30/10/2026**. Tài liệu mô tả bản đang chạy; đây là nguồn tổng hợp chính thay cho kế hoạch và bàn giao tạm trong `docs/plan/`. Lời thoại Việt/Anh lấy từ [module nội dung](../../src/content/levels/ban-banh-luoi-content.ts), không duy trì một bản thoại thứ hai trong tài liệu.

## 1. Thông tin thật

Bánh Lưới nhân cách hóa **Lunar Roving Vehicle (LRV) của Apollo 17**, chiếc xe do Eugene Cernan và Harrison Schmitt điều khiển khi khảo sát Taurus–Littrow tháng 12/1972. Đây không phải robot tự lái. Challenger là tàu đổ bộ; tọa độ khu vực hạ cánh khoảng 20,16°B, 30,77°Đ không phải tọa độ chính xác chiếc xe. [NASA — Mission Details](https://www.nasa.gov/missions/apollo/apollo-17-mission-details/).

LRV dùng bánh lưới kim loại linh hoạt, khung trong và các dải gai hỗ trợ đi trên nền đất xốp. Bài chọn bánh nói về **chiếc LRV này**, không khẳng định mọi thiết bị trên Mặt Trăng đều không thể dùng lốp bơm hơi. [NASA Glenn — Reinventing the Wheel](https://www3.nasa.gov/specials/wheels/).

Cernan đỗ xe tại **VIP Site** để camera truyền hình quan sát cuộc cất cánh. NASA ghi khoảng 158 m từ tàu; chú thích ảnh ALSJ nói khoảng 100 m phía đông. Game không dùng một trong hai số này làm tỉ lệ cho sơ đồ bài chơi. Ảnh cuối cho thấy tấm chắn bùn sửa tạm đã được tháo. [NASA — Apollo 17 Lands at Taurus-Littrow](https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/), [ALSJ — AS17-143-21933](https://apollojournals.org/alsj/a17/images17.html#21933).

Cuội, xe biết nói, ảnh ký ức và ánh sáng trao vào đèn là hư cấu. Xe đi theo Cuội ở T03 thuộc chuyến đi tưởng tượng được nói rõ trước khi chơi. Bản đồ pin/đi bộ và các mốc A/B là mô hình giáo dục, không phải quy trình bay hoặc giới hạn kỹ thuật Apollo.

## 2. Bối cảnh và phong cách

Sau Tai Thính, hai vệt bánh xe ngắn gợi cuộc gặp mới. Cuội về lộ trình để chọn Bánh Lưới; lời dẫn kể chuyến đi kỳ ảo tới một thung lũng xa, không coi hai địa điểm Apollo 12/17 nằm cạnh nhau.

Cảnh 960 × 540 có núi, bụi và dấu bánh. Xe đỗ ở cảnh gặp/hậu kết; riêng chuyến đi tưởng tượng T03 cho xe đi cùng Cuội. Xe không có mắt/miệng/tay chân; chân dung màu vẽ dùng trong sách/thoại, cảnh dùng hình pixel vẽ bằng mã. Cuội tới gần nhấn E hoặc bấm xe; nhãn trò chuyện nằm trên xe và chỉ xuất hiện trong vùng tương tác.

Mặt Trời màu kem có quầng sáng cùng phong cách Trái Đất ở các cảnh trước, khuất một phần sau núi; kích thước được phóng đại để kể chuyện, không mô phỏng kích thước góc hay vị trí Mặt Trời ở thời điểm chụp VIP. Bầu trời giữ tối. Không coi quầng sáng trang trí là tán xạ khí quyển. Tham chiếu thiết kế: [NASA SVS](https://svs.gsfc.nasa.gov/4302/), [NASA Glenn — Moon](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/moon/).

Khung thoại, nút, ảnh nhận và hồi tưởng dùng phong cách các bạn trước. Ba thử thách dùng chiều cao game chung; T03 chia hàng cho bản đồ, cảnh pixel, lời nhắc và điều khiển, giữ tỷ lệ canvas. Menu không làm co khung game và sách. Cài đặt cụ thể: [cảnh](../../src/game/banh-luoi-scenery.ts), [CSS](../../src/components/banh-luoi.css).

## 3. Sách và ảnh kỷ niệm

Gợi ý T03 hiện ngay trong khung chơi theo hoạt động hiện tại, không tự hoàn thành; sách vẫn đọc độc lập. Sách nhóm theo người bạn, chọn theo **ID trang** để thêm ảnh/chuyển bài/đổi ngôn ngữ không làm nhảy trang. Vào màn chọn trang giới thiệu; chỉ bấm Gợi ý mới tự chuyển tới trang cần và focus tiêu đề. Màn hẹp có nút quay về game.

| ID | Mở khi | Vai trò |
| --- | --- | --- |
| `ban-banh-luoi` | Mở khóa màn | Giới thiệu Apollo 17 |
| `ban-book-wheels` | T01 | Quan sát bánh lưới, có ảnh tham khảo trước khi nhận ảnh |
| `ban-photo-vip` | Cất ảnh A | Ảnh xe tại nơi đỗ cuối |
| `ban-book-route` | Cất ảnh A, trước T02 | Đường đi, pin và hai trạm |
| `ban-book-walkback` | Cùng trang đường đi | Điều kiện đi bộ về, lớp vùng an toàn khi dùng gợi ý cấp 2 |
| `ban-book-camera` | Sau T03, vào hồi tưởng cất cánh | Camera lịch sử và minh họa xe ở lại, không có bài chỉnh góc |
| `ban-photo-orbit` | Cất ảnh B | Dấu vết nhìn từ quỹ đạo |
| `ban-book-legacy` | Cất ảnh B | Những gì còn ở lại |

Xem ảnh trong sách gợi ý không nhận thưởng. Ảnh nhận có tên, alt Việt/Anh, nguồn, nút xem chi tiết và cất. Lỗi tải có nút thử lại, vẫn cho tiếp tục; ảnh phóng là phần cắt tư liệu, không phải ảnh chụp mới. [Metadata trong game](../../src/content/levels/ban-banh-luoi-memories.ts).

| Ảnh | Ngày / credit | Nhận và kể |
| --- | --- | --- |
| A · `vip` · AS17-143-21933 | 12/1972; NASA / Eugene Cernan; bản scan qua ALSJ | Sau T01; hồi tưởng thứ nhất |
| B · `orbit` · LROC NAC M168000580LR | 8/2011; NASA / GSFC / Arizona State University / LRO | Sau T03 và minh họa cất cánh; hồi tưởng thứ hai |

Ảnh B là sản phẩm LROC có chú thích và ô phóng Challenger sẵn từ nguồn, giữ nguyên các dấu ấy. Trang APOD đề ngày 8/9/2011 nói ảnh chụp tháng trước: vì vậy lưu tháng 8, không lấy ngày đăng làm ngày chụp. Chưa xác lập ngày UTC của đúng sản phẩm ghép này; ảnh A cũng giữ độ chính xác tới tháng. [NASA — Apollo 17 Site: A Sharper View](https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/).

## 4. Ba thử thách

### T01 — Giúp bánh xe sẵn sàng

Chọn cao su, lưới kim loại hoặc đá → **Thử bánh** → **Chọn bánh này**. Bánh đã chọn lăn trên một dải đất trong minh họa 1,2 giây, kèm phản hồi về hình dạng; kết quả đọc được ngay, không cần đợi hoạt ảnh. Mỗi lựa chọn giữ đúng hình dạng của nó, không tự đổi sang bánh lưới. Đây là minh họa quan sát, không đo tốc độ/độ bền và không kết luận lốp cao su không thể dùng trên Mặt Trăng. NASA Glenn mô tả cả lốp cao su của xe kéo MET Apollo 14 và bánh lưới của LRV, nên phản hồi chỉ giúp nhận ra bánh của **chiếc LRV này**.

Khi bánh dừng, hiện mẫu bề mặt phóng to riêng: cao su có rãnh và van hơi; lưới có sợi đan, ô hở và gân chữ V; đá có vân và đốm trên khối đặc. Phản hồi sau thử chỉ mô tả quan sát, không báo ngay đáp án đúng; người chơi tự đối chiếu hình rồi xác nhận. Đổi bánh bỏ mẫu cũ, thử lại phát lại hoạt ảnh. Chế độ giảm chuyển động hiện cận cảnh ngay.

Chưa chọn/chưa thử hoặc chọn sai đều có lời nhắc để sửa, không phạt. Đổi bánh xóa kết quả thử trước; tải lại giữ lựa chọn đã lưu nhưng cần thử lại. Trạng thái thử nằm cục bộ React, không thêm trường thử bánh vào bản lưu. Giảm chuyển động dùng hình kết quả tĩnh; mở menu hoặc đưa focus ra ngoài bài dừng hoạt ảnh trang trí. Bánh lưới đã thử là đáp án; xác nhận chỉ chuyển một lần sang ảnh A. Cất ảnh mới ghi `vip` đồng thời chuyển `routeIntro`, rồi đọc lời dẫn để mở T02. [Component](../../src/components/BanhLuoiWheels.tsx).

T01 dùng bảng nền kín trong chiều cao game chung, ba thẻ cùng hàng có tên ngắn và tên truy cập đầy đủ, nút/chữ chính 16px trở lên; thẻ đang chọn giữ tương phản khi hover/focus. Bản hẹp xếp đường thử và phản hồi dưới thẻ; nội dung gợi ý Việt/Anh nằm trong cùng nguồn sách/thoại, không thêm tài nguyên JSON.

### T02 — Cùng vạch đường đi

Một lưới chữ nhật 6 cột × 5 hàng, tọa độ (cột, hàng) từ 1. LM (1,1), A (1,3), B (3,1); hố (2,2), (4,2), (4,4); dốc (3,2), (2,4). Đi bốn hướng, ghé đủ A/B theo thứ tự tùy ý, trở về LM. Ô thường tốn 1 pin, dốc 2; xuất phát không tốn. Ngân sách **12 pin**. Tại mọi bước, đường đi bộ ngắn nhất tránh hố về LM không quá **4 bước**; dốc vẫn tính 1 bước đi bộ.

Hai giới hạn kiểm tra độc lập. Đường nháp vượt giới hạn vẫn được giữ để sửa; bước vào hố/nhảy ô bị từ chối. Có hoàn tác, vẽ lại và nộp; không đồng hồ hoặc tự vẽ đáp án. Mũi tên chọn ô, Enter/Space thêm bước. Gợi ý cấp 1 nhắc xem hai chỉ báo, cấp 2 hiện vùng đi bộ hợp lệ và bước vi phạm đầu tiên. Sơ đồ sách dùng cùng component/dữ liệu.

T02 chuẩn bị chuyến đi tưởng tượng cùng Cuội. Chỉ báo ghi thứ tự ghé A/B lần đầu và việc cần làm tiếp; nét đường giữ mọi đoạn lặp. Lưới hẹp 264×220px, mỗi ô 44×44px; tọa độ nằm trong nhãn truy cập. Khung phản hồi phân trang để đọc hết nhiều lỗi mà không nối dài cảnh; đóng trả focus về ô bản đồ.

Nộp tuyến đúng mới lưu `confirmedRoute: { modelVersion: 1, cells }`, là bản sao độc lập của toàn bộ nháp theo đúng thứ tự. Đi lặp, quay lại LM giữa đường và hai thứ tự A/B đều được giữ. Sửa nháp, nộp sai, mở sách/menu hoặc gợi ý không thay tuyến đã xác nhận. Nộp tuyến khác reset riêng checkpoint/gợi ý T03; nộp lại cùng tuyến tiếp tục checkpoint. Trong T03, nút **Bản đồ** mở lại T02; nút **Tiếp tục** dùng tuyến đã xác nhận ngay cả khi nháp đang sửa chưa hợp lệ.

Tuyến kiểm chứng: `(1,1) → (1,2) → (1,3) → (2,3) → (3,3) → (3,2) → (3,1) → (2,1) → (1,1)` có 8 bước, 9 pin, xa nhất 4 bước đi bộ; tuyến ngược cũng đạt. Không đòi tuyến tối ưu. Các mẫu chỉ vượt pin/chỉ vượt đi bộ nằm trong `cases` của [mô hình](../../src/content/levels/ban-banh-luoi-models.ts). [Thuật toán BFS và xác nhận](../../src/content/levels/ban-banh-luoi-route.ts).

### T03 — Hành trình lấy mẫu (đợt hai điểm dừng, M4)

**M1–M4 đã triển khai:** bản đồ hành trình trải ngang, lấy mẫu đá tại A và quan sát đất tại B có nền riêng. Nghiệm thu toàn hành trình và hồi quy toàn chương thuộc M5.

Snapshot T02 được duỗi thành thanh ngang, mỗi lần ghé ô là một node riêng. Giữ ô lặp, A/B lặp và LM trung gian; Cuội ở trên thanh, xe ở dưới. Xe tự chuyển tiếp khoảng 160ms/cạnh, dừng tại trạm đầu tiên chưa làm theo đúng tuyến (A→B hoặc B→A). Giảm chuyển động bỏ hoạt ảnh; menu, sách, mất focus và ẩn tab tạm dừng.

- **A / T03.1 (M3):** đi bằng phím trái/phải, A/D, nút hướng hoặc chạm đất. Gần đá, giữ E/nút hành động và thả trong vùng chỉ lực đánh dấu; hai lần đúng làm rời mẫu. Nhấn E/nút để nhặt, mang về gần xe và cất. Hụt không mất lượt đúng; checkpoint lưu từng lần gõ, nhặt và cất. Mất focus/gợi ý/menu hủy thao tác giữ.
- **B / T03.2 (M4):** đi tới một trong ba mảng đất, giữ E/nút 0,7 giây để xem hình phóng đại. Mảng giữa có hạt tròn cam/đen xen mảnh vỡ; các mảng còn lại là mảnh đá xám. Có hình dạng, mô tả chữ và số vạch để nhận biết ngoài màu. Chọn nhầm chỉ nhắc nhẹ; chọn đúng lấy mẫu, mang về xe và nhấn E để cất. Thẻ ngắn giải thích nguồn gốc núi lửa; hình phóng đại là minh họa, không phải xác định thành phần ngay tại chỗ. Menu/mất focus hủy giữ; Escape đóng quan sát. Gợi ý đóng quan sát để tránh thao tác chồng. Tải lại giữ mẫu đang mang/đã cất, không bắt xem lại thẻ.
- **Điểm nối kết đã có:** chỉ hai mẫu `stored` và đến LM cuối mới chuyển `launch` cùng cập nhật checkpoint. LM giữa tuyến và các lần ghé lại trạm không mở lại nhiệm vụ.

React lưu node đã đến, trạng thái từng mẫu và gợi ý từng trạm; Phaser giữ thời gian/chuyển động tạm. Reducer từ chối sự kiện cũ/lặp/sai thứ tự; reader kiểm tra checkpoint có thể đạt được trên tuyến. Đổi bản nháp hoặc xác nhận cùng tuyến giữ checkpoint; xác nhận tuyến khác reset riêng T03. [Mô hình](../../src/content/levels/ban-banh-luoi-guide.ts), [giao diện](../../src/components/BanhLuoiGuide.tsx), [cảnh](../../src/game/banh-luoi-guide.ts).

Chuỗi hồi tưởng cất cánh → ảnh B → nhật ký → sao giữ nguyên. Người có bản lưu kết cũ vẫn tiếp tục được. Hai thứ tự trạm đã nối tới LM và `launch`; nghiệm thu luồng mới tới hết phần thưởng vẫn thuộc M5.

## 5. Kết, phần thưởng và chơi lại

Hồi tưởng A (1972) → B (2011) → trở lại bên xe → cảm ơn → ánh sáng tới đèn → cánh thứ tư. Chỉ ghi `completedOnce` khi ánh sáng tới; tổng sao tính từ bốn dấu hoàn thành, tối đa **4/5**. Thông điệp: đi xa cần nhớ đường về; chiếc xe ở lại nhưng câu chuyện không bị quên.

Hậu kết cho đi ngang, trò chuyện lại khoảng hai lượt, hoặc đi tới vệt sáng mặt đất phía phải để về lộ trình. Ánh sáng trên cao gợi người bạn tiếp theo; danh tính vẫn chưa chốt. Điểm thứ năm khóa, không tự vào màn chưa làm.

- **Xem lại đoạn kết:** từ ảnh A, gồm chiếu lại phần thắp cánh thứ tư; dùng trạng thái tạm, không ghi đè lượt chơi hoặc trao thêm sao. Hết đoạn trở về hậu kết; không có nút “trở lại game” trong phần xem kết. Tải lại trở về tiến trình chính.
- **Chơi lại:** reset lời dẫn, đáp án/đường/checkpoint/gợi ý và vị trí/hướng/scale/tư thế/đích đi Cuội; giữ ảnh, trang kiến thức và dấu hoàn thành. Cất lại ảnh không tạo bản sao.
- **Về lộ trình:** giữ tiến trình. Không thêm kỹ năng hoặc thẻ bạn làm phần thưởng.

## 6. Nguồn và hồ sơ tài nguyên

| Nguồn | Dùng cho |
| --- | --- |
| [NASA Mission Details](https://www.nasa.gov/missions/apollo/apollo-17-mission-details/) | Sứ mệnh, phi hành gia, địa điểm |
| [NASA lịch sử Apollo 17](https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/) | VIP Site, xe và cất cánh |
| [NASA Glenn — Wheels](https://www3.nasa.gov/specials/wheels/) | Bánh LRV |
| [ALSJ — thư viện Apollo 17](https://apollojournals.org/alsj/a17/images17.html#21933) | Ảnh xe và chi tiết bánh, trạng thái chắn bùn |
| [NASA — ảnh quỹ đạo](https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/) | M168000580LR, dấu xe/đường đi còn lại |
| [ALSJ — walk-back](https://apollojournals.org/alsj/a11/a11.clsout.html) | Bối cảnh nguyên tắc trở về an toàn; không phải nguồn cho con số 12 pin/4 ô |
| [NASA Media Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/) | Ghi nguồn và giới hạn sử dụng tư liệu |

Ảnh runtime đặt trong `public/images/memories/ban-banh-luoi/`, URL qua [assets.ts](../../src/content/assets.ts). Không chỉnh nội dung ảnh bằng AI. Chân dung và cảnh minh họa không phải tư liệu NASA.

Hồ sơ chuyển từ bàn giao M0, giữ để tái tạo từ ảnh gốc (tọa độ cắt x1,y1,x2,y2):

| Tài nguyên | Kích thước gốc / phần cắt | SHA-256 bản tải gốc |
| --- | --- | --- |
| [AS17-143-21933HR.jpg](https://apollojournals.org/alsj/a17/AS17-143-21933HR.jpg) → `apollo-17-as17-143-21933.webp` | 2340 × 2350; bánh `(1120,1370,1460,1900)` → `apollo-17-wheel-detail.webp` | `fc4c50f729e20f41516b63bc8bfd0b784aebd8041042bc7cf3c5b5f3aded8687` |
| [apollo17area1_lro.jpg](https://assets.science.nasa.gov/content/dam/science/cds/apod/apod/2011/september/apollo17area1_lro.jpg) → `apollo-17-orbit-m168000580lr.webp` | 1600 × 1200; `(850,500,1600,1000)` → `apollo-17-orbit-detail.webp` | `ae25d91429c667c4b2d7c3c0eb5c75fc06eb831f234c508a2447382e8e7dbb53` |
| [AS17-143-21932HR.jpg](https://apollojournals.org/alsj/a17/AS17-143-21932HR.jpg), chỉ tham chiếu | So hình xe/chắn bùn; không là ảnh thưởng thứ ba | `68903907d5ca6a27cc1e7b3e6c6b6b22752065de9435932834400d97b0574694` |

Ngày giờ ALSJ GET 170:19:48 và ghi chú EVA-3 giúp xác định bối cảnh ảnh A, không tự quy ra ngày UTC. Ảnh chi tiết B chỉ giúp thấy vị trí xe, không tuyên bố phân giải cấu trúc bánh. Hash trên là hồ sơ M0, không phải kết quả tải lại ảnh gốc ở M7.

## 7. Tích hợp và bản lưu

Level ID `ban-banh-luoi`, tên Anh **Mesh Wheels**, người bạn 04/cảnh website 06. React giữ truyện, Phaser giữ chuyển động; không đổi ý nghĩa phase/ID đã lưu.

```text
route → approach → meeting → wheels → photoA
→ routeIntro → routePuzzle → guideIntro → guiding
→ launch → photoB → memoriesIntro → recallA → recallB
→ farewell → gift → finished
```

[Tiến trình màn](../../src/content/levels/ban-banh-luoi-progress.ts) kiểm tra bánh/ảnh/tuyến/checkpoint và phục hồi riêng chương. [Bộ lưu chung](../../src/state/progress.ts) ghi v13, đọc v1–v13. Save camera v6–v11 và dẫn đường v12 có tuyến hợp lệ chuyển sang `guideIntro`; tuyến hỏng về T02. Save v6–v12 từ `launch` trở đi, có bánh lưới và ảnh A, giữ chặng qua quyền tương thích `guideLegacyPassed`, không cần đáp án camera và không ép làm T03. Quyền này reset khi chơi lại/nộp tuyến mới. Checkpoint v13 hỏng hoặc khác khóa tuyến trở về lời dẫn T03; snapshot hỏng trở về T02. Giữ ảnh/sao hợp lệ, không reset các bạn trước hoặc chép tuyến mẫu. Không lưu tọa độ/focus/đồng hồ mỗi frame.

Focus đi theo chặng khi game đang giữ bàn phím, bỏ qua hidden/inert/disabled; không lấy lại từ sách khi trao sao xong. Menu dừng chữ, cất cánh và ánh sáng; tiếp tục bỏ phím/đích cũ. Chuyển ngôn ngữ không reset bài/vị trí. [App](../../src/App.tsx), [focus](../../src/focus/game-focus.ts), [cảnh Phaser](../../src/game/PreviewScene.ts).

## 8. Bàn giao M7 và phạm vi kiểm chứng

**M7 hoàn tất bàn giao nội bộ.** Các lượt kiểm tra dưới đây đã chạy trong đợt M7 ngày 24–25/10; ngày 28/10 hoàn thiện tài liệu và rà liên kết. Môi trường: Linux, **Chrome headless 155.0.8059.84**, Playwright; bàn phím, chuột và chạm giả lập. Script và ảnh kiểm tra chỉ nằm tạm ở `/tmp`, không thêm hạ tầng test vào dự án.

| Nhóm | Đã kiểm tra và đạt |
| --- | --- |
| Thuật toán T02 | Hai thứ tự ghé trạm, tuyến không tối ưu, hố/nhảy ô/đi chéo, chi phí dốc, thiếu trạm/chưa về LM; hai lỗi pin/đi bộ độc lập; đối chiếu BFS riêng ở mọi ô đi được |
| Thuật toán T03 | Các trường hợp mẫu; toàn bộ góc nguyên 0–80° tại A/B/C; mép 13/14/24/25°; giao vật cản và phục hồi dữ liệu camera hỏng |
| Bản lưu | Đọc v1–v10 và ghi v10; giữ dữ liệu/ảnh các bạn trước theo phiên bản; chặn active Bánh Lưới khi thiếu điều kiện; dữ liệu JSON hỏng; storage bị chặn; lỗi màn thứ tư phục hồi cục bộ; checkpoint trước/sau trao sao; chơi lại giữ tám trang và hai ảnh |
| Xuyên chương | Bàn phím từ lời dẫn → đi tới xe/E → ba bài → hai ảnh → hồi tưởng → sao; Gợi ý cấp 1/2 và quay lại game trên 390 px, giảm chuyển động |
| Bài trên giao diện | T01 chưa chọn/sai/đúng bằng chạm giả lập; T02 bước sai, hoàn tác/vẽ lại, hai giới hạn, tuyến ngược; T03 chưa chọn/đá che/quá gần/góc thấp-cao, chỉnh bằng phím và nút; tải lại bản nháp và gợi ý |
| Sách/ảnh | Mở khóa không tự lật sách; giữ trang qua chuyển bài; ngôn ngữ đổi theo trang đang chọn; phóng chi tiết; ảnh tải lỗi vẫn cho cất và tiếp tục; nguồn/alt đối chiếu metadata |
| Pause/focus | Menu dừng chữ, cất cánh và trao sao; đổi ngôn ngữ/Menu giữ camera; hoạt ảnh xong không giành focus khỏi sách; bàn phím tiếp tục qua các chặng và xem kết |
| Kết/chơi lại | Hồi tưởng, tải lại trước/sau trao sao, thưởng một lần, xem kết tạm và tải lại, chiếu lại cánh thứ tư, chat hậu kết, đi ra rìa phải; chơi lại rồi tải lại giữ ảnh/sao |
| Bố cục | Tám chặng × 1440/1024/390 px × Việt/Anh, không tràn ngang; Menu/tiếp tục ở các workspace ảnh/bản đồ/camera/hồi tưởng không co khung |
| Hồi quy ba màn cũ | Checkpoint dụng cụ và kết Mắt Tròn; góc gương và kết Lấp Lánh; bản ghi và kết Tai Thính; Menu/tiếp tục giữ save, hậu kết/focus; 1440/390 px × Việt/Anh |
| Lộ trình/mở đầu | Khóa Bánh Lưới trước khi xong Tai Thính, mở khi đủ điều kiện; điểm thứ năm vẫn khóa/bí ẩn; đổi lựa chọn giữ chiều cao; mở đầu vẫn nhận thao tác khi storage bị chặn |

Các lệnh kiểm chứng đã chạy: `node /tmp/ban-m7-route-model.cjs`, `node /tmp/cuoi-m4-model.cjs`, `node /tmp/ban-m7-save.cjs`, `node /tmp/ban-m7-legacy.cjs`, `node /tmp/ban-m7-regression.cjs`, `node /tmp/ban-m7-m3-ui.cjs`, `node /tmp/ban-m7-m4-ui.cjs`, `node /tmp/ban-m6.cjs`, `node /tmp/ban-m7-suite.cjs`. Đây là dấu vết kiểm tra cục bộ, không phải các file được phân phối cùng dự án. Bộ suite chạy lại kiểm tra bố cục, Menu, pause, ảnh lỗi và kết trên bản M7; không lấy kết quả M6 cũ thay cho lần chạy mới.

`npm run typecheck`, `npm run build`, `git diff --check` đạt. Build vẫn báo chunk Phaser lớn hơn 500 kB, là cảnh báo đã có; không có lỗi TypeScript/build. Các lượt browser hoàn tất nêu trên không ghi nhận lỗi runtime.

**Giới hạn bàn giao:** Chưa chơi xuyên toàn bộ ba màn cũ; hồi quy dùng các checkpoint đại diện nêu trên. Chưa xác nhận trên thiết bị cảm ứng thật, Safari/Firefox, trình đọc màn hình hoặc với học sinh. Chưa đo thời lượng thực để xác nhận mục tiêu 10–15 phút/độ tuổi 7–11. Chưa kiểm tra thủ công việc đổi cửa sổ hệ điều hành và mọi trường hợp mất/khôi phục WebGL. Ca ảnh lỗi đã xác nhận tiếp tục được, chưa xác nhận phục hồi mạng rồi tải lại thành công trong đợt M7. Đây là các giới hạn kiểm chứng, không phải tính năng đã được chứng nhận.

Bản đầu giữ ba bài, một bản đồ cố định, hai ảnh và cánh sao thứ tư. Vá chắn bùn, âm thanh, bản đồ bổ sung và người bạn thứ năm thuộc công việc sau nếu được giao. Không triển khai hosting hay tự commit trong mốc này.

T01 bổ sung minh họa vượt cùng một viên đá: cao su đàn hồi, lưới biến dạng nhiều hơn, bánh kim loại cứng nâng trục rõ hơn. Đây là minh họa định tính, không phải kết quả đo hoặc mô phỏng động lực học. Lựa chọn bánh đá được đổi thành bánh kim loại cứng; giữ khóa lưu cũ `stone` để đọc tiến trình đã lưu. Phản hồi nêu cả lợi ích và hạn chế: lốp hơi có thể xẹp nếu thủng; lưới có thể đứt sợi khi gặp vật sắc; bánh cứng ít ôm địa hình. Không cho bánh tự nổ hay mặc định hỏng khi vượt đá. Giảm chuyển động vẫn được hỗ trợ.

Cơ sở: NASA Glenn https://www3.nasa.gov/specials/wheels/ ; NASA LRV Apollo 17 mục 4.2 https://www.nasa.gov/wp-content/uploads/static/history/alsj/LRVSysHndbkA17.pdf ; NASA/JPL https://scienceandtechnology.jpl.nasa.gov/sites/default/files/documents/JPL_2016-2017_Technology_Highlights.pdf .
Kiểm tra bổ sung: TypeScript và Vite build đạt. Chưa kiểm tra lại trực quan trình duyệt cho hoạt cảnh vượt đá.

## 9. Thiết kế lại — M3/T02 ngày 29/10/2026

M3 hoàn thành với tuyến đã xác nhận độc lập và save v11, chuẩn bị dữ liệu cho Cuội dẫn đường ở M4. Chromium/Playwright kiểm tra 69 trường hợp mô hình/bản lưu và 134 lượt đo bố cục Việt/Anh, gồm stage 480px tại rộng game 320–1000px, nhiều lỗi phân trang và viewport thực 360/390/1440px: không tràn, ô bấm ≥44px, chữ nội dung/điều khiển ≥16px, không lỗi JavaScript. Đã kiểm tra tự vẽ tuyến lặp, xác nhận/tải lại, hai thứ tự A/B, đổi tuyến, gợi ý, menu/sách và bàn phím/chạm giả lập. Build/TypeScript và diff đạt; cảnh báo chunk Phaser lớn còn như trước.

Bàn giao chi tiết: [M3](../plan/Thiet_ke_lai_Banh_Luoi_M3.md). Bằng chứng tạm ở `/tmp/cuoi-m3.cjs`, `/tmp/cuoi-m3-results.json` và ảnh `/tmp/cuoi-m3-*.png`; không thêm test vào repo. Chưa kiểm Safari/thiết bị cảm ứng thật. Đây là bằng chứng lịch sử của M3, trước khi thay T03 ở M4; không dùng làm kết quả kiểm thử cho dẫn đường mới.


### T02 — Đa dạng đường đi và địa hình trực quan (lần trước)

Mở ô (2,2) thành dốc để thêm nhánh giữa; chuyển hố sang (4,4), ngoài vùng đi bộ hợp lệ. Ô (3,4) trở thành đất bằng. Giữ LM/A/B và các giới hạn 12 pin, 4 bước để bảo toàn tuyến đã xác nhận trước đây. Các tuyến 8 bước gồm đất bằng đi lại đường cũ (8 pin), vòng ngoài (9 pin), vòng qua hai dốc ở giữa (10 pin); có thể đảo thứ tự A/B. Có thêm vòng đất bằng 10 bước, 10 pin, không bắt buộc đi dài hơn để hoàn thành.

Hố có vành sáng/lòng tối; dốc có các tầng đất và biểu tượng pin kèm số 2; LM và trạm có tàu/cờ pixel. Hai vệt bánh xe nối đường đã chọn, mũi tên đánh dấu hướng bước cuối. Vào dốc hiện −2 và chuyển động leo chậm; chạm hố sáng viền và hiện lời nhắc. Hiệu ứng không chặn thao tác; chế độ giảm chuyển động bỏ chuyển động xe. Sách dùng cùng hình vẽ với bản đồ chơi.

Kiểm chứng bổ sung: 280 kiểm tra mô hình/bản lưu, bao gồm duyệt 27 tuyến 8 bước (8–11 pin) và toàn bộ 196 tuyến hợp lệ của bản cũ; 134 lượt đo bố cục Việt/Anh, ô tương tác tối thiểu 44px, không tràn khung ở các kích thước đã kiểm tra. Đã thử chuột, bàn phím, chạm mô phỏng, hiệu ứng −2, lưu/tải lại, thông báo nhiều trang; không có lỗi trình duyệt. `npm run build` và `git diff --check` đạt. Script kiểm tra tạm: `/tmp/cuoi-route-visual.cjs`; chưa kiểm tra trên thiết bị cảm ứng thật.


### T02 — Tách hai trạm và thêm hố chắn giữa

A chuyển tới (1,3), B tới (3,1), cách nhau 4 bước. Hố (2,2) chặn lối giữa; có thể vòng theo (2,3) → (3,3) → (3,2), hoặc quay qua ngã rẽ LM. Giữ lưới 6 × 5, 12 pin, giới hạn đi bộ 4 bước và hình vẽ địa hình hiện có. Cập nhật gợi ý Việt/Anh; sách tự dùng cùng mô hình.

Kiểm chứng mô hình mới: 4 tuyến hoàn thành trong 8 bước, hai thứ tự A/B, mức 8 hoặc 9 pin; tuyến đất bằng dài hơn 10 bước/10 pin cũng đạt. Các mẫu chỉ vượt pin/chỉ vượt khoảng cách đi bộ vẫn cho đúng lỗi; xác nhận/lưu/đọc lại các tuyến mẫu đạt. Bản nháp cũ gặp hố mới được cắt ở bước hợp lệ cuối theo cơ chế phục hồi hiện có; tuyến xác nhận không còn hợp lệ sẽ yêu cầu vẽ lại T02, giữ ảnh đã nhận. Không khẳng định bảo toàn mọi tuyến cũ như lần chỉnh trước. `npm run build` đạt; không thay đổi kích thước bố cục.

## 10. Thiết kế lại — M4/T03 ngày 29/10/2026

**Bằng chứng cho thiết kế cũ, đã được thay ở mục T03/M2 bên trên.** M4 hoàn thành với Cuội dẫn đường, hai hoạt động A/B, snapshot nguyên tuyến và save v12. Đã chơi hai thứ tự trạm và tuyến lặp; kiểm tra chuyển từ T01 tới T03 rồi tiếp tục tới ảnh B/nhật ký/trao sao. 519 kiểm tra mô hình/bản lưu và 38 trạng thái bố cục Việt/Anh đạt; menu/sách/gợi ý dừng điều khiển, thao tác chạm và phục hồi checkpoint đạt. Không lỗi JavaScript hoặc tràn ở các khung đo. Build và diff đạt. [Bàn giao M4](../plan/Thiet_ke_lai_Banh_Luoi_M4.md) ghi phạm vi và bằng chứng tạm. Chưa kiểm Safari/thiết bị cảm ứng thật; kiểm duyệt nội dung và hồi quy toàn bộ thuộc M5.
