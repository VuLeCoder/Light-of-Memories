# Hướng dẫn AI thiết kế màn chơi mới cho CUỘI

Cập nhật **24/10/2026**, dựa trên ba màn đã triển khai: [Surveyor 3 — Mắt Tròn](done/Game1_Surveyor_3.md), [Apollo 11 — Lấp Lánh](done/Game2_Apollo_11.md), [Apollo 12 — Tai Thính](done/Game3_Apollo_12.md).

Mục đích: thiết kế người bạn tiếp theo cùng phong cách website, giọng kể, sách, điều khiển và mạch hành trình. Tai Thính đã hoàn thiện; người bạn thứ tư/thứ năm và kết gặp chị Hằng chưa được chốt. Những cơ chế riêng của một màn là ví dụ, không phải khuôn bắt buộc cho màn mới.

## 1. Cách bắt đầu và phạm vi công việc

1. Đọc hướng dẫn này, [phong cách hình ảnh](visual-style.md), [tổng quan dự án](project-overview.md) và ba tài liệu màn.
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

**Gợi ý** thường ở thanh đầu cảnh cạnh **Về lộ trình**, dùng kiểu chung Tai Thính. Chỉ có khi tồn tại trang gợi ý phù hợp; vị trí cụ thể có thể đổi để phục vụ nội dung, không ép mọi bảng giống nhau.

Dùng `EarthDialogue` cho dẫn truyện và chat: tên, chân dung nếu có, số câu, chữ hiện dần, nút tiếp. Đặt chat theo khoảng trống của cảnh, có thể trên hoặc dưới; không che nhân vật, đèn hoặc vật cần chọn. Không lặp tên địa điểm/thử thách trong nhiều khung cùng lúc.

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
- Dùng cơ chế chung trong [game-focus.ts](../src/focus/game-focus.ts) và điều phối của App: ưu tiên nút thoại, canvas đi bộ hoặc điều khiển đang hiển thị; bỏ qua phần tử ẩn, disabled hoặc trong `inert`.
- Nút bị gỡ/khóa có thể làm focus rơi về body; đợi DOM ổn định rồi phục hồi khi game còn giữ quyền focus, không chỉ dựa vào `focusout`.
- Không giành focus khỏi ô nhập, sách hoặc phần ngoài game. Bấm ngoài, Tab sang sách hoặc đổi cửa sổ phải nhả điều khiển. Nút quay lại game dùng cùng hàm chọn đích.
- Space/Enter hiện hết câu hoặc sang câu tiếp, tránh một nhấn làm hai việc. Không bắt phím mũi tên/Space của game khi đang nhập biểu mẫu.

Menu dừng thao tác, chữ và các đồng hồ/hiệu ứng cần tạm dừng. Tiếp tục xóa phím/đích đi cũ. Đổi chặng áp dụng chế độ ngay cả khi hai chặng đều tên `free`. Chơi lại reset vị trí, hướng, scale, tư thế, đích cũ, cảnh báo và tương tác chờ; đổi ngôn ngữ/mở sách/menu không tự reset vị trí.

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
| Điều phối và focus | [App.tsx](../src/App.tsx), [game-focus.ts](../src/focus/game-focus.ts), [EarthDialogue.tsx](../src/components/EarthDialogue.tsx) |
| Đăng ký/lưu | [levels/index.ts](../src/content/levels/index.ts), [types.ts](../src/content/levels/types.ts), [progress.ts](../src/state/progress.ts) |
| Sách/lộ trình | [JourneyMap.tsx](../src/components/JourneyMap.tsx), [BookNavigation.tsx](../src/components/BookNavigation.tsx) |
| Nội dung từng màn | [surveyor-progress.ts](../src/content/levels/surveyor-progress.ts), [lap-lanh.ts](../src/content/levels/lap-lanh.ts), [tai-thinh-content.ts](../src/content/levels/tai-thinh-content.ts), [tai-thinh-progress.ts](../src/content/levels/tai-thinh-progress.ts) |
| Màn/ảnh/mini-game | Các component Surveyor*, Sparkle*, TaiThinh* được liên kết trong tài liệu từng màn |
| Kết và nối màn | [ending-chat.ts](../src/content/levels/ending-chat.ts), [EndingTrail.tsx](../src/components/EndingTrail.tsx), các component *Ending |
| Cầu game và cảnh | [GameCanvas.tsx](../src/game/GameCanvas.tsx), [PreviewScene.ts](../src/game/PreviewScene.ts), các module *scenery và *layout |
| Mô hình ánh sáng | [SparkleScience.tsx](../src/components/SparkleScience.tsx), [sparkle-optics.ts](../src/game/sparkle-optics.ts), [SparkleBookClue.tsx](../src/components/SparkleBookClue.tsx) |
| Hình ảnh/bố cục | [assets.ts](../src/content/assets.ts), [styles.css](../src/styles.css), [useWorkspaceFit.ts](../src/useWorkspaceFit.ts) |

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

> Đọc hướng dẫn này, phong cách hình ảnh và ba tài liệu Game1/Game2/Game3; xem mã và các cảnh liên quan trước khi thiết kế màn tiếp theo. Giữ văn sách ngôi thứ ba như Mắt Tròn, chat ngắn và ấm, nút/Gợi ý đồng bộ Tai Thính, focus liền mạch, ảnh có nguồn và hồi tưởng đúng thời gian. Chốt phần còn thiếu theo yêu cầu, viết luồng/mốc rồi thực hiện phần được giao. Hậu kết có trò chuyện cảm ơn và dấu hiệu bên phải dẫn về lộ trình; giữ bản lưu, sao và các màn trước.
