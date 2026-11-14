# Hướng dẫn AI thiết kế màn chơi mới cho CUỘI

Cập nhật quy chuẩn **14/11/2026**. **Surveyor 3 — Mắt Tròn là mẫu chuẩn được người dùng chọn** về cấu trúc, giao diện, cách chơi, sách và kết màn; cảnh An và bà là tham chiếu cho nhịp kể và hội thoại. Tham khảo triển khai hiện tại trong `src/content/friends/`, `src/components/friends/` và [nguồn tham khảo](../references.md). Quy định mới nhất trong `AGENTS.md` được ưu tiên khi có khác biệt với hướng dẫn này.

Mục đích: thiết kế hoặc chỉnh sửa màn chơi cùng phong cách website, giọng kể, sách, điều khiển và mạch hành trình. Các quy tắc dưới đây áp dụng cho công việc được giao; không tự cải tạo các màn khác. Những cơ chế riêng của một màn là ví dụ, không phải khuôn bắt buộc cho màn mới. Kế hoạch cũ không xác định trạng thái triển khai hiện tại; phải đối chiếu mã trước khi làm.

## 0. Quy chuẩn chung lấy từ Mắt Tròn

### 0.1. Phạm vi và những điều phải giữ

- Giữ bố cục, bảng màu, chất liệu hình ảnh và hệ điều khiển đang được chấp nhận. Chỉ thay đổi phần người dùng giao và phần phụ thuộc tối thiểu để nó hoạt động.
- Không tự thêm nút, nhãn, khung, popup, tooltip, hiệu ứng, phần thưởng hoặc tính năng với lý do “cải thiện UX/UI”. Mỗi thành phần mới phải phục vụ một yêu cầu hoặc thao tác cần thiết của màn.
- Không tự di chuyển hướng dẫn hoặc điều khiển sang vị trí khác. Nếu yêu cầu mới mâu thuẫn quy chuẩn, nêu đúng điểm mâu thuẫn để người dùng quyết định trước khi làm phần phụ thuộc.
- Đây là quy chuẩn thiết kế, không phải yêu cầu sao chép mọi hành vi đang có. Lời thoại chứa phím E, nhãn đếm chưa thống nhất hoặc mô tả tài liệu cũ không trở thành ngoại lệ mặc định.

### 0.2. Một cuộc gặp có mục đích và kết quả

Mỗi màn phải trả lời được: **Cuội gặp ai → người bạn cần giúp gì → người chơi làm gì để giúp → bạn thay đổi hoặc nhớ lại điều gì → Cuội mang theo điều gì để đi tiếp**.

Khung chuẩn:

```text
Đến gần người bạn → trò chuyện ngắn và nhận lời giúp
→ khám phá đặc điểm/công việc của bạn
→ thực hiện thử thách, nhận ảnh hoặc manh mối
→ kết nối những điều vừa tìm hiểu
→ nghe bạn kể lại → cảm ơn và nhận ánh sáng
→ ở lại khám phá hoặc theo dấu hiệu trở về lộ trình
```

Mỗi chặng phải đóng góp vào cùng một việc giúp bạn. Không chèn câu hỏi kiến thức, màn xác nhận hoặc hoạt động trang trí chỉ để tăng số bước. Số thử thách, số ảnh và chế độ di chuyển được chọn theo nội dung; không bắt buộc ba bài, ba ảnh, đào đất hay ghép thời gian như Mắt Tròn.

### 0.3. Giao diện có vai trò và vị trí ổn định

| Thành phần | Quy chuẩn |
| --- | --- |
| Thanh đầu cảnh | Tên cảnh hoặc mục tiêu ngắn; điều hướng và Gợi ý khi cần. Không lặp cùng thông tin ở nhiều khung. |
| Cảnh chơi | Thể hiện không gian, nhân vật, vật cần quan sát và hành động. Giữ chủ thể và dấu vết quan trọng nhìn thấy được. |
| Hội thoại | Tên người nói, chân dung khi có, số lượt, một nội dung ngắn và một nút tiếp tục chính. Mặc định neo vùng dưới cảnh theo mẫu An và bà/Mắt Tròn; không tự chuyển lên trên hoặc ra vị trí khác. |
| Bảng thử thách | Một mục tiêu rõ, vùng thao tác và phản hồi liên quan. Chỉ hiện điều khiển cần cho chặng đang chơi. |
| Footer của khung chơi/thử thách | Hướng dẫn thao tác: di chuyển, phím, cách chọn/kéo/nhập/nộp. Đây là vùng dưới khung chơi hoặc chân bảng thử thách, không phải footer toàn website. |
| Sách đồng hành | Kiến thức, manh mối, sơ đồ, ảnh, chú thích và nguồn; game bên trái, sách bên phải trên màn rộng, sách xuống dưới trên màn hẹp. |

Hướng dẫn thao tác phải ở footer; không đặt trong lời nhân vật, tiêu đề, thanh đầu cảnh, popup hoặc tooltip. Nhãn nút như “Tiếp theo”, “Gợi ý”, “Ghép trang nhật ký” vẫn nằm trên nút; phản hồi như “Đã chọn 2/3 ảnh” hoặc gợi ý quan sát sau đáp án sai vẫn ở vùng phản hồi. Trang manh mối trong sách mô tả điều cần quan sát, không thay cho footer điều khiển.

Giữ cảnh pixel, chân dung truyện thiếu nhi, sơ đồ nét gọn; nền xanh đêm, chữ kem, vàng dịu và giấy sách sáng. Không tự thêm hệ giao diện khác cho một thử thách. Giữ chỗ cho phản hồi và nội dung biến đổi khi phù hợp để tránh bố cục nhảy.

### 0.4. Hội thoại và nhịp chơi

Dùng nhịp An và bà: một lượt một ý, người chơi chủ động đọc. Space/Enter hoặc nút tiếp tục trước hết hiện đủ câu, lần tiếp theo mới sang câu mới; không tự chuyển câu mặc định. Nút cuối đoạn nói rõ hành động sắp tới. Giữ chữ dễ đọc, hiệu ứng nhẹ và chế độ giảm chuyển động.

Cuội chủ động hỏi và giúp; người bạn có tính cách riêng. Thoại giải thích lý do hành động và cảm xúc; kiến thức dài đưa vào sách. Menu tạm dừng, đóng menu tiếp tục đúng chặng; chuyển thoại, thử thách và ảnh không làm mất quyền điều khiển bàn phím của người đang chơi.

### 0.5. Thử thách gắn với kiến thức và tiến bộ

- Trước khi triển khai mỗi bài, xác định kiến thức cốt lõi, thao tác, điều kiện hoàn thành, phản hồi thiếu/sai/đúng và kết quả được lưu hoặc mở khóa.
- Dùng đặc điểm thật của thiết bị để tạo thao tác có ý nghĩa. Mắt Tròn là ví dụ: nhận biết dụng cụ → tìm dấu vết và ảnh → tổ chức lại sự kiện.
- Cho thử lại nhẹ nhàng, gợi điều cần quan sát; giữ phần đã đúng khi phù hợp. Không tự giải thay, không trừ tiến bộ chỉ vì thử sai.
- Đổi cách tương tác giữa các chặng khi có mục đích. Nội dung thu thập cần được dùng lại để hiểu bài tiếp, đọc sách hoặc hồi tưởng; không tạo vật phẩm vô nghĩa.
- Nếu bài cho phép khám phá tự do, không ép thứ tự chỉ vì sách kể theo một trình tự. Phân biệt thứ tự tìm thấy và thứ tự sự kiện.
- Khi nhận ảnh: tạm dừng thao tác nền, hiện ảnh, tên, mô tả ngắn, mốc/nguồn phù hợp và một nút cất hoặc tiếp tục. Sau đó trả điều khiển về chặng tiếp theo.

### 0.6. Sách đồng hành theo tiến trình

Sách có các vai trò tương ứng với màn: giới thiệu người bạn; giải thích công việc/dụng cụ; cung cấp manh mối khi cần; lưu ảnh đã nhận và nội dung đọc lại. Chỉ tạo trang phục vụ nội dung thực tế, không bắt buộc có trang nhật ký riêng nếu chưa được thiết kế và triển khai.

- Mở kiến thức, gợi ý và ảnh ở mốc phù hợp; không lộ trước nội dung cần khám phá.
- Mở khóa trang không tự lật hoặc giành focus. Giữ ID trang đang đọc khi thêm nội dung, chuyển bài hoặc đổi ngôn ngữ.
- Chỉ thao tác Gợi ý mới chủ động đưa tới trang manh mối phù hợp; người chơi có đường quay lại game trên màn hẹp.
- Không bắt buộc mở sách để thắng, trừ khi đọc/đối chiếu sách chính là cơ chế đã được chốt của bài.
- Quy tắc gợi ý tuần tự của Mắt Tròn là cơ chế riêng, không tự áp cho mọi màn. Nếu dùng khóa gợi ý, phải nêu rõ điều kiện mở và phân biệt với thứ tự hoàn thành bài.
- Văn kiến thức dùng ngôi thứ ba, ảnh có chú thích và nguồn; phân biệt tư liệu thật, mô hình minh họa và phép màu của truyện.

### 0.7. Kết màn và hậu kết

Kết màn phải trả lời được những việc người chơi vừa làm có ý nghĩa gì với người bạn. Dẫn ngắn vào hồi tưởng, dùng lại ảnh/manh mối đã nhận, kể theo thứ tự có nghĩa, rồi trở về cảnh Cuội và bạn để cảm ơn, trao ánh sáng. Không đưa một nhóm kiến thức mới không liên quan vào đoạn kết.

Phần thưởng gắn với câu chuyện và đèn ông sao theo tiến trình chung. Phân biệt số ảnh, số người bạn và số cánh đèn; không chép nhãn 1/3 hoặc 1/5 từ màn khác. Chỉ ghi nhận phần thưởng một lần.

Sau kết cho ở lại đi lại, trò chuyện với bạn, xem lại kết, chơi lại hoặc về lộ trình. Dấu hiệu bên phải gợi chặng tiếp theo và dẫn về lộ trình. Xem lại không bắt làm bài và không thưởng trùng; chơi lại giữ dấu đã hoàn thành, quyền mở khóa và chính sách lưu riêng đã được chốt.

### 0.8. Checklist nghiệm thu bắt buộc

- [ ] Mỗi chặng phục vụ việc giúp người bạn; không có thành phần ngoài phạm vi.
- [ ] Giữ cấu trúc game/sách, phong cách và vị trí điều khiển đã chốt.
- [ ] Hướng dẫn thao tác nằm ở footer; thoại, mục tiêu và phản hồi đúng vai trò.
- [ ] Mỗi bài có điều kiện hoàn thành, phản hồi sai và đường thử lại rõ.
- [ ] Ảnh/manh mối được sử dụng trong câu chuyện, sách hoặc hồi tưởng.
- [ ] Sách mở đúng mốc, giữ trang đang đọc; Gợi ý và quay lại game hoạt động.
- [ ] Kết có hồi tưởng, cảm ơn, ánh sáng và đường tiếp tục; không thưởng trùng.
- [ ] Tiếp tục, tải lại, menu, hậu kết và chơi lại giữ tiến trình đúng chính sách.
- [ ] Kiểm tra Việt/Anh, màn rộng/hẹp, phím/chuột/chạm; không che chủ thể hoặc cắt nút.
- [ ] Rà diff, loại bỏ thay đổi không liên quan; báo rõ phần chưa kiểm tra được.

Các mục tiếp theo bổ sung chi tiết triển khai. Khi ví dụ cũ khác quy chuẩn mục 0, áp dụng mục 0 trong phạm vi công việc được giao; không tự mở rộng thành sửa toàn bộ dự án.

## 1. Cách bắt đầu và phạm vi công việc

1. Đọc hướng dẫn này, [phong cách hình ảnh](visual-style.md), [tổng quan dự án](../../README.md) và ba tài liệu màn.
2. Đọc các module liên quan, xem cảnh gặp bạn, thử thách, nhận ảnh, sách, kết, hậu kết và chơi lại trên bản đang chạy.
3. Chốt thiết bị, kiến thức cốt lõi, mạch giúp bạn, ảnh có nguồn, điều kiện từng bài và chính sách lưu.
4. Viết luồng trạng thái và chia mốc có thể xem/chơi/kiểm tra; triển khai theo phạm vi người dùng giao.
5. Cập nhật một tài liệu chính của màn theo hành vi cuối cùng; hợp nhất bản bàn giao khi chúng đã trùng nội dung.

Ưu tiên yêu cầu mới nhất của người dùng → quyết định đã chốt → hành vi đã đối chiếu trong mã → kế hoạch cũ. Không coi lỗi đang có là tiêu chuẩn cần sao chép. Nếu được giao chỉ làm tài liệu hoặc chưa thực hiện, không tự sửa mã.

Không tự chọn danh tính người bạn tiếp theo từ các ý tưởng cũ. Chỉ hỏi những điểm chưa có câu trả lời và ảnh hưởng thiết kế; vẫn làm phần độc lập đã được giao.

## 2. Tinh thần và văn phong

CUỘI là game sách tranh cho trẻ tiểu học: cổ tích Việt Nam, Trung Thu và khám phá thiết bị khoa học thật. Cuội tìm chị Hằng, ghé thăm những người bạn, giúp họ và mang theo câu chuyện. Không khí ấm, tĩnh, tò mò và hơi hoài niệm; tránh đe dọa, thi đua căng thẳng hoặc lời chê khi sai.

### Hội thoại: gần gũi, có giọng riêng

- Thường xưng **mình**, gọi **bạn** hoặc **Cuội**; một lượt khoảng 1–2 câu ngắn, một ý rõ.
- Cuội chủ động hỏi, quan sát và giúp. Mắt Tròn nhớ chuyện cũ; Lấp Lánh tinh nghịch, thích đố; Tai Thính điềm tĩnh, tỉ mỉ, thích lắng nghe. Bạn mới có nét riêng nhưng vẫn nói dễ hiểu.
- Giải thích kiến thức từ việc đang làm. Ví dụ: “Tia sáng đã quay về rồi! Mình cùng tìm xem Trái Đất ở xa bao nhiêu nhé.”
- Không nhét thao tác bàn phím, mã dữ liệu, cách triển khai hoặc ghi chú biên tập vào lời nhân vật. Hướng dẫn phím nằm ở footer.
- Sai thì nhắc điều cần quan sát và mời thử lại; không trách trẻ hoặc tự hoàn thành thay trẻ.

### Sách: kể bằng ngôi thứ ba như Mắt Tròn

Sách là trang đọc về người bạn, không phải bản chép chat. Nêu tên, công việc và mốc lịch sử bằng lời ngắn, cụ thể; giải thích một ý mỗi đoạn. Có thể gọi thiết bị là “bạn” cho thân thiện nhưng người kể vẫn ở ngôi thứ ba.

| Mục đích | Ví dụ đúng giọng sách |
| --- | --- |
| Giới thiệu | “Surveyor 3 là tàu robot NASA đến Mặt Trăng tháng 4/1967.” |
| Giải thích | “Một trăm lăng kính nhỏ giúp Lấp Lánh gửi ánh sáng trở về phía Trái Đất.” |
| Công việc | “Tai Thính đo những chuyển động rất nhỏ của đất, giúp các nhà khoa học tìm hiểu Mặt Trăng.” |
| Ghi nhận sự kiện | “Năm 1969, Buzz Aldrin đặt Lấp Lánh xuống mặt đất ở Biển Yên Tĩnh.” |

Không mở trang kiến thức bằng “Mình là…” hoặc gọi người đọc làm thao tác liên tục. Nút tương tác và gợi ý mở rộng có nhãn riêng. Chú thích ảnh kể đúng chủ thể/sự kiện, kèm nguồn; không gọi ảnh NASA là ảnh Cuội vừa chụp.

### Nội dung ngắn, đủ hai ngôn ngữ

Viết cả Việt/Anh cho thoại, sách, mục tiêu, nút, phản hồi, chú thích, alt và nhãn truy cập. Bản Anh giữ cùng ý và sắc thái; kiểm tra xuống dòng riêng.

Hồi tưởng chỉ kể phần thiết yếu của từng ảnh; nội dung dài chia trang hoặc rút gọn, không ép bằng chữ nhỏ hoặc để scrollbar trong cảnh. Dùng thuật ngữ kèm lời giải thích gần gũi, tránh liệt kê số liệu không giúp trẻ hiểu.

Tên trên phần tổng hợp/giới thiệu sách thống nhất **sứ mệnh — tên thân mật**: “Surveyor 3 — Mắt Tròn”, “Apollo 11 — Lấp Lánh”, “Apollo 12 — Tai Thính”; bản Anh tương ứng Round Eyes / Sparkle / Keen Ears. Nhãn địa điểm lộ trình có thể gọn theo thiết kế hiện tại.

## 3. Cấu trúc cuộc gặp và lộ trình

Khung kể tham khảo:

```text
Lộ trình → lời dẫn chuyển vùng → khám phá/đến gần bạn
→ trò chuyện → thử thách gắn với công việc → ảnh/manh mối
→ các thử thách tiếp → hồi tưởng đúng thời gian
→ cảm ơn, thắp một cánh sao → đi lại, trò chuyện hậu kết
→ dấu hiệu ở rìa phải → về lộ trình
```

| Nội dung | Mắt Tròn | Lấp Lánh | Tai Thính |
| --- | --- | --- | --- |
| Đầu màn | Gặp Surveyor 3 | Đi vòng sáu hố rồi gặp bảng gương | Đi ngang tới cụm ALSEP |
| Bài chơi | Dụng cụ, đào ảnh, ghép nhật ký | Tìm đường, lau kính, phản xạ, đo khoảng cách | Nhận diện, phân loại, đồ thị/thời lượng, chuỗi nhịp |
| Ảnh | Ba | Hai | Ba |
| Kết | Cánh thứ nhất | Cánh thứ hai | Cánh thứ ba |
| Hậu kết | Đi có chiều sâu | Đi ngang | Đi ngang |
| Dấu hiệu bên phải | Điểm sáng gợi Lấp Lánh | Vòng gợn gợi Tai Thính | Hai vệt bánh xe gợi Bánh Lưới |

Không ấn định số bài/ảnh của màn mới bằng cách sao chép; cần mục đích rõ cho từng chặng. Tối thiểu ba ảnh là quyết định riêng của Tai Thính, không phải yêu cầu tự áp cho mọi màn. Không thêm cảnh xác nhận chỉ để kéo dài bước chuyển.

**Phân biệt số:** cảnh website Mắt Tròn 03, Lấp Lánh 04, Tai Thính 05; thứ tự người bạn là 01/02/03; bài bắt đầu T01 trong mỗi chương. Đèn có đúng năm cánh, một cánh sáng cho mỗi người bạn đã hoàn thành.

Dùng cùng `journeyStatus` cho khóa lộ trình và sách. Mắt Tròn mở đầu; Lấp Lánh sau Mắt Tròn; Tai Thính sau Lấp Lánh. Dựa vào `completedOnce` để chơi lại vẫn giữ quyền vào màn sau. Ô chưa triển khai vẫn bí ẩn, không lộ tên/chân dung/ảnh.

Khi chọn điểm dừng, chữ **Cuội ✦** theo điểm được chọn. Các vị trí không chọn vẫn dành chỗ cho nhãn này. Chọn người bạn bí ẩn thì nút vào màn ẩn và bị khóa nhưng **giữ nguyên khoảng trống**; vùng thông báo cũng giữ chiều cao cho nội dung dài nhất. Không để cả lộ trình nhảy lên/xuống khi đổi lựa chọn.

## 4. Hình ảnh, bố cục và nút

Ba lớp hình ảnh có chủ đích: **cảnh pixel 2D**, **chân dung truyện thiếu nhi chất liệu màu vẽ**, **UI/sơ đồ nét gọn**. Không thay riêng một bài bằng giao diện sci-fi neon hoặc 3D bóng.

| Vai trò | Màu tham chiếu |
| --- | --- |
| Nền website | `#101e28` |
| Bảng thoại | `#182c35` / `#10212a` |
| Viền/điểm nhấn | `#d7b875` |
| Nút chính | Nền `#dfc18a`, chữ `#20313a`, viền `#ead4a4`, bo 7px |
| Nút phụ | Nền `#293e46`, chữ `#eee5d1`, viền `#a9957080`, bo 8px |
| Chữ | Kem `#eae7dc`, phụ `#bdcecb` |
| Trang sách | `#f2ecdb` |

Nút thường tối thiểu 42px, dễ bấm/chạm, có hover/focus/disabled rõ. Nút chính dành cho việc tiếp tục/nộp; nút phụ cho xem lại/gợi ý. Vùng bấm thiết bị, thẻ ảnh và ô lau kính giữ hình thức riêng phù hợp thao tác.

**Gợi ý** ở thanh đầu cảnh cạnh **Về lộ trình** khi có trang gợi ý phù hợp, dùng kiểu nút chung hiện có. Giữ vị trí đã chốt của từng bảng; không tự di chuyển hoặc nhân đôi nút.

Dùng `EarthDialogue` cho dẫn truyện và chat: tên, chân dung nếu có, số câu, chữ hiện dần, nút tiếp. Mặc định đặt chat ở vùng dưới cảnh theo mục 0.3; với cảnh có bố cục riêng đã được chốt, giữ vị trí đó. Không che nhân vật, đèn hoặc vật cần chọn; không lặp tên địa điểm/thử thách trong nhiều khung cùng lúc.

Canvas tham chiếu **960 × 540**, góc nhìn ngang; xa nhỏ và ít tương phản hơn. Hố có lòng tối, mép sáng dịu, phối cảnh dẹt; nhân vật neo ở chân, không lơ lửng. Thiết bị giữ đặc điểm thật, không tự thêm mặt, tay chân hoặc công dụng mới.

Desktop game trái, sách phải; màn hẹp sách/panel xuống dưới theo bố cục chung. Cân theo **chiều rộng thực của vùng game**, không chỉ viewport, vì còn cột sách và workspace fit. Giữ chữ dễ đọc, chia trang hoặc rút ngắn trước khi giảm cỡ chữ. Tránh thanh cuộn trong panel/cảnh do dư khoảng trống hay văn quá dài; cuộn trang web khi xếp dọc là hành vi khác.

Sách dùng chiều cao chung, nút lật ở chân. Nền/hình tĩnh có cache và khôi phục WebGL; chỉ hiện hiệu ứng phủ khi cảnh thật đã render. Vùng sáng rìa nhạt dần vào đất, không thành mảng có biên cứng.

## 5. Phân công nội dung, gợi ý và sách

| Vị trí | Nhiệm vụ |
| --- | --- |
| Tiêu đề/mục tiêu bài | Cần đạt điều gì |
| Footer | Cách điều khiển: phím, kéo, chọn, nhập, nộp |
| Chat | Lý do giúp bạn, cảm xúc, câu hỏi, chuyển truyện |
| Sách | Kiến thức, manh mối, sơ đồ, ảnh và nguồn |
| Phản hồi bài | Đúng/sai ở đâu, nên quan sát gì tiếp |

Sách gom theo người bạn: Mắt Tròn → Lấp Lánh → Tai Thính → nhóm tiếp theo. Chèn ảnh vào nhóm đúng, không gom ảnh tất cả bạn về cuối.

Khi vào màn chọn giới thiệu của bạn đó. Sau đó giữ ID trang người đọc chọn qua thêm ảnh, đổi bài và đổi ngôn ngữ. **Mở khóa trang không tự lật sách.** Chỉ bấm Gợi ý mới chuyển tới trang cần và focus tiêu đề. Có nút trở lại game trên màn hẹp. Sơ đồ trong sách dùng cùng component/dữ liệu với bài để không lệch nguyên lý, màu hay nhịp.

Không giới hạn cứng số trang; phân trang theo ý nghĩa và chiều cao. Đặt phần giải thích dài trong sách, nhưng không biến sách thành bản hướng dẫn triển khai cho lập trình viên.

## 6. Bài chơi, điều khiển và focus

Mỗi bài có kiến thức, thao tác, điều kiện thắng và phản hồi sai xác định được. Cho thử lại nhẹ nhàng, giữ kết quả đúng trước đó. Mô phỏng phản ứng theo đầu vào, không dùng hoạt ảnh luôn dẫn tới đáp án đúng.

Chuột/chạm có vùng tương tác rõ; nút HTML hỗ trợ Tab/Enter/Space, bài kéo có lựa chọn bàn phím khi phù hợp. Phép tính cho nhập số, chọn dấu và nộp, báo thiếu/sai dễ hiểu. Bài Tai Thính chơi được khi tắt tiếng; màn mới không dùng âm thanh làm dấu hiệu duy nhất.

Quy định chế độ cho từng chặng: đi ngang, đi có chiều sâu, hoặc khóa di chuyển. Không yêu cầu hoạt ảnh Cuội chưa có; không biến đi vòng hố thành nhảy/rơi. Khi chat/ảnh/panel mở, khóa thao tác phía sau để tránh bấm xuyên lớp.

**Focus là một phần của luồng chơi:**

- Khi người dùng đang chơi, chuyển thoại → bài → ảnh → hậu kết phải tiếp tục nhận bàn phím mà không cần bấm lại canvas.
- Dùng cơ chế chung trong [game-focus.ts](../../src/focus/game-focus.ts) và điều phối của App: ưu tiên nút thoại, canvas đi bộ hoặc điều khiển đang hiển thị; bỏ qua phần tử ẩn, disabled hoặc trong `inert`.
- Nút bị gỡ/khóa có thể làm focus rơi về body; đợi DOM ổn định rồi phục hồi khi game còn giữ quyền focus, không chỉ dựa vào `focusout`.
- Không giành focus khỏi ô nhập, sách hoặc phần ngoài game. Bấm ngoài, Tab sang sách hoặc đổi cửa sổ phải nhả điều khiển. Nút quay lại game dùng cùng hàm chọn đích.
- Space/Enter hiện hết câu hoặc sang câu tiếp, tránh một nhấn làm hai việc. Không bắt phím mũi tên/Space của game khi đang nhập biểu mẫu.

Menu dừng thao tác, chữ và các đồng hồ/hiệu ứng cần tạm dừng. Tiếp tục xóa phím/đích đi cũ. Đổi chặng áp dụng chế độ ngay cả khi hai chặng đều tên `free`. Chơi lại reset vị trí, hướng, scale, tư thế, đích cũ, cảnh báo và tương tác chờ; đổi ngôn ngữ/mở sách/menu không tự reset vị trí.

Về âm thanh, tham chiếu [quy tắc âm thanh theo cảnh của v3](audio.md). Dùng bộ Web Audio chung trong `src/audio/`, chọn nhạc qua `selectMusicMood` và điều phối của App; Phaser giữ `noAudio`. Hiệu ứng phản hồi phải hoạt động cho thao tác chuột/chạm và bàn phím tương ứng, tránh phát trùng hoặc tự phát phần thưởng khi tải save. Menu phát chủ đề `home`, dừng hiệu ứng; mất tiêu điểm hoặc ẩn tab dừng toàn bộ âm thanh. Giữ hai công tắc độc lập và không dùng âm thanh làm dấu hiệu duy nhất để giải bài.

## 7. Tư liệu khoa học và ảnh kỷ niệm

Ưu tiên nguồn nhiệm vụ NASA/JPL, kho tư liệu gốc, đơn vị vận hành hoặc nghiên cứu gốc. Ghi rõ thiết bị, sứ mệnh, địa điểm, tác giả/chủ thể, mã ảnh, ngày chụp và ngày sự kiện. Ngày đăng trang không phải ngày chụp.

Mở ảnh và đối chiếu chú thích trước khi chọn. Ảnh ở trang NASA chưa chứng minh nó là đúng thiết bị: không thay Apollo 11 bằng Apollo 14, hoặc ảnh laser tới LRO bằng ảnh tới gương mặt đất. Giữ credit và kiểm tra tư liệu bên thứ ba theo [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

Lưu **thứ tự nhận** và **thứ tự lịch sử** riêng. Lấp Lánh nhận 5952 rồi 5945 nhưng kể 5945 → 5952; Tai Thính nhận/kể 6916 → 6918 → 6921. Không gắn va chạm 20/11 hoặc tắt trạm 1977 vào ảnh triển khai 19/11/1969.

Ảnh nhận dùng phong cách Mắt Tròn: khung ảnh, tên, mô tả ngắn và nút cất/tiếp tục, có alt/nguồn và xử lý lỗi. Không chỉnh nội dung ảnh tư liệu bằng AI hoặc giả ảnh trước/sau lau bụi. Ghi chú biên tập dài để trong tài liệu, không chen vào lời nhân vật.

Phân biệt lịch sử, mô hình và giả tưởng ngay trong thiết kế. Chú thích “mô hình 2D”, “minh họa/tua nhanh” khi giúp hiểu đúng. Sóng tự vẽ không là dữ liệu NASA; “ngân vang” không là âm thanh trong chân không. Khi nguồn có số khác nhau, lưu cả căn cứ và giới hạn trong tài liệu màn.

## 8. Đoạn kết, nối màn và chơi lại

1. Dẫn vào hồi tưởng, kể ảnh theo thời gian bằng trang ngắn.
2. Trở lại cảnh có Cuội và bạn, cảm ơn, trao ánh sáng tới đèn.
3. Giữ cánh cũ, thắp một cánh mới đúng một lần; dấu hoàn thành là nguồn tính sao.
4. Hết thoại cho đi lại, hiện **Xem lại đoạn kết / Chơi lại / Về lộ trình** trong vùng không che chủ thể.
5. Giữ dấu hiệu ở rìa phải và cho Cuội tới đó để về lộ trình.

Đèn theo tay, hướng và frame đi bộ; không để một đèn HTML đứng giữa cảnh khi Cuội đã đi xa. Dấu hiệu nhìn rõ nhưng nhẹ, không cản thao tác, có hình tĩnh khi giảm chuyển động. Chọn dấu hiệu gợi người bạn sau theo nội dung đã chốt; Tai Thính dùng hai vệt bánh xe song song để gợi cuộc gặp Bánh Lưới; đi tới đó vẫn về lộ trình để chọn màn.

**Nhân vật vẫn tương tác được ở hậu kết:** bấm/chạm bạn để Cuội tới hoặc đi gần nhấn E. Chat khoảng hai lượt: cảm ơn Cuội ghé trò chuyện rồi gợi nhìn dấu hiệu phía phải. Dùng giọng riêng, hợp trẻ nhỏ, có thể nghe lại. Trong chat khóa bước đi, giữ dấu hiệu trên nền và tạm ẩn nút hậu kết; đóng chat trả điều khiển. Không đổi tiến trình/phần thưởng.

| Thao tác | Hành vi |
| --- | --- |
| Xem lại đoạn kết | Xem lại ký ức, không phải làm bài lại, không nhận sao trùng |
| Chơi lại | Bắt đầu lượt mới theo chính sách từng màn; giữ dấu hoàn thành và mở khóa |
| Về lộ trình / đi tới dấu hiệu | Giữ tiến trình, không tự mở màn chưa có nội dung |

Lấp Lánh/Tai Thính giữ ảnh khi chơi lại; Mắt Tròn có checkpoint riêng. Không tự sửa các chính sách này để đồng nhất dữ liệu.

## 9. Tích hợp và tài nguyên

Mỗi màn có nội dung, tiến trình, điều kiện nhận ảnh và hoàn thành rõ; React điều phối câu chuyện, Phaser xử lý cảnh/di chuyển, không tạo thêm nguồn trạng thái truyện trong Phaser.

Giữ ổn định `LevelId`, phase, ID thoại/ảnh/trang đã lưu. Schema hiện tại v6 (Bánh Lưới M1), bộ đọc tiếp nhận v1–v5. Đổi schema/phase phải có tương thích; không reset cả hành trình để sửa save. Kết quả và chuyển chặng/ảnh cập nhật cùng lúc khi cần. Không lưu focus, hover, đích đi hoặc thời gian hiệu ứng.

Rà đầy đủ đăng ký level, `journeyStatus`, số sao, sách, tiêu đề/footer, focus, canvas, chơi lại và bản lưu. Không chỉ thêm một phần tử vào danh sách. Phạm vi CSS theo màn/component; đổi selector chung phải đối chiếu cả ba màn cũ. `freeRoam` có ý nghĩa khác ở màn đi chiều sâu và đi ngang.

Tên file thường, không dấu, gạch nối. Chân dung trong `public/images/portraits/`, sprite trong `sprites/`, tư liệu trong `memories/<id>/`. Bitmap mới ưu tiên WebP, giữ alpha khi cần; URL theo `import.meta.env.BASE_URL`. Tài nguyên cũ còn dùng giữ định dạng hiện tại. Đọc ảnh tham chiếu trước khi tạo biến thể, không dùng chân dung làm sprite thay thế.

Sprite Cuội được cắt frame thủ công, không phải lưới đều. Giữ tọa độ crop, chân neo và animation. Nền đơn giản/sơ đồ ưu tiên vẽ mã. Không xóa listener/timer cleanup, cache dự phòng hoặc phục hồi canvas để rút ngắn mã.

## 10. Bản đồ mã nguồn cần đọc

| Nhóm | File và vai trò |
| --- | --- |
| Điều phối và focus | [App.tsx](../../src/App.tsx), [game-focus.ts](../../src/focus/game-focus.ts), [EarthDialogue.tsx](../../src/components/shared/EarthDialogue.tsx) |
| Đăng ký/lưu | [friends/index.ts](../../src/content/friends/index.ts), [types.ts](../../src/content/friends/types.ts), [progress.ts](../../src/state/progress.ts) |
| Sách/lộ trình | [JourneyMap.tsx](../../src/components/journey/JourneyMap.tsx), [BookNavigation.tsx](../../src/components/book/BookNavigation.tsx) |
| Nội dung từng màn | [Quy chuẩn nội dung](../development/folder-structure.md#quy-chuẩn-tổ-chức-nội-dung), các thư mục `src/content/friends/<id>/` (`definition.ts`, `dialogue.ts`, `progress.ts`, `challenges/`) |
| Màn/ảnh/mini-game | Các component Surveyor*, Sparkle*, TaiThinh* được liên kết trong tài liệu từng màn |
| Kết và nối màn | [ending-chat.ts](../../src/content/story/ending/friend-dialogue.ts), [EndingTrail.tsx](../../src/components/shared/EndingTrail.tsx), các component *Ending |
| Cầu game và cảnh | [GameCanvas.tsx](../../src/game/GameCanvas.tsx), [PreviewScene.ts](../../src/game/scenes/preview-scene.ts), các module *scenery và *layout |
| Mô hình ánh sáng | [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [sparkle-optics.ts](../../src/game/scenes/lap-lanh/optics.ts), [SparkleBookClue.tsx](../../src/components/friends/lap-lanh/SparkleBookClue.tsx) |
| Hình ảnh/bố cục | [assets.ts](../../src/content/assets.ts), [styles.css](../../src/styles/styles.css), [useWorkspaceFit.ts](../../src/hooks/useWorkspaceFit.ts) |

## 11. Những điều cần chốt cho người bạn mới

Chỉ hỏi phần chưa có trong yêu cầu:

- Thiết bị, sứ mệnh, tên thân mật, địa điểm, tính cách và kiến thức cốt lõi?
- Cuội giúp việc gì; mỗi bài đóng góp gì; bài nào bắt buộc?
- Số ảnh, nguồn, thời điểm nhận và thứ tự kể; trang sách/manh mối mở khi nào?
- Chặng nào đi ngang/chiều sâu; đèn xuất hiện khi nào; hậu kết ra sao?
- Điều kiện mở khóa, chính sách chơi lại và dấu hiệu gợi bạn sau?

Chưa tự chọn kỹ năng hay thẻ bạn làm thưởng. Phần thưởng hiện có là ảnh/ký ức và một cánh sao khi hoàn thành. Các ý tưởng chưa duyệt phải tách rõ khỏi nội dung triển khai.

## 12. Điều kiện bàn giao và tài liệu

Kiểm tra vào lần đầu, tiếp tục/tải lại, thử sai rồi đúng, ảnh trước/sau cất, sách/Gợi ý, menu, ngôn ngữ, kết, nghe lại hậu kết, đi ra dấu hiệu, xem lại kết và chơi lại. Rà phím/chuột/chạm, focus chuyển bước và nhập số; kiểm tra ngoài game không bị bắt phím.

Xem Việt/Anh ở màn rộng/hẹp và chiều rộng game thực: chat không che chủ thể, không tràn ngang, panel/cảnh không có scroll ngoài ý muốn, sách/lộ trình không nhảy bố cục. Kiểm tra giảm chuyển động, tải ảnh lỗi, đèn theo tay và sao không nhận trùng. Sửa phần dùng chung phải rà lại ba màn.

Khi có sửa mã, chạy kiểm tra TypeScript/build phù hợp và `git diff --check`; dùng kiểm tra trực tiếp cho tương tác thay đổi. Với sửa tài liệu, kiểm tra liên kết, thông tin nhất quán và phạm vi file. Không ghi nhận kiểm tra cũ là vừa chạy mới.

Tài liệu màn mới theo mẫu Game1: **thông tin thật → bối cảnh → sách → thử thách → kết/thông điệp → bảng nguồn**, thêm ghi chú kỹ thuật/kiểm chứng khi có giá trị. Giữ nguồn ảnh, quyết định và giới hạn trong bản tổng hợp trước khi xóa kế hoạch/bàn giao trùng. Không giữ nhiều bản thoại độc lập khác nội dung trong mã, không thêm script/ảnh thử tạm vào repo.

Bảo toàn thay đổi sẵn trong workspace; không tự reset, commit hoặc sửa lịch sử Git để dọn tài liệu. Bàn giao rõ đã làm, đã kiểm tra và phần còn chờ quyết định.

## 13. Đoạn giao việc tham khảo

> Đọc quy chuẩn Mắt Tròn tại mục 0 của tài liệu này và phong cách hình ảnh; đối chiếu mã và cảnh liên quan trước khi làm. Thực hiện [yêu cầu] trong phạm vi [phạm vi]. Giữ bố cục, vị trí điều khiển và sách; hướng dẫn thao tác chỉ ở footer. Không tự thêm UI, tính năng hoặc hiệu ứng ngoài yêu cầu. Mỗi thử thách phải phục vụ việc giúp bạn; kết có hồi tưởng, cảm ơn và đường tiếp tục. Giữ bản lưu, phần thưởng và các màn trước. Trước khi bàn giao, rà checklist mục 0.8 và diff; báo đã thay đổi gì, đã kiểm tra gì và phần chưa kiểm tra được.
