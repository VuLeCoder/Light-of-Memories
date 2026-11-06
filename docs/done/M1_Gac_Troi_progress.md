# M1 — Luồng và lưu tiến trình Gác Trời

Bàn giao ngày 06/11/2026, theo hợp đồng M0 tại `docs/plan/ket-truyen-m0/luu-tien-trinh.md`.

## Hành vi trong bản M1

Tuyến vẫn là Mắt Tròn → Lấp Lánh → Gác Trời. T01 giữ cơ chế ghép, chuyện sau mỗi cặp, thẻ đã ghép và Gợi ý mở sách. Tổng kết T01 nối sang hai lượt giới thiệu T02 Việt/Anh. Hết giới thiệu, Cuội nghỉ chân: có sách, chơi lại Gác Trời và về lộ trình. Chưa mở màn ảnh T02 hoặc các màn M3–M6, chưa cấp thành tích mới để giả lập vượt thử thách.

`gacPhaseAvailable` mô tả các phase đã phát hành. Checkpoint tương lai được giữ nguyên khi đọc save; giao diện hiện bảng nghỉ cho phần chưa có renderer. Các bước sau cần bổ sung renderer và mở cổng tương ứng, không dùng bảng nghỉ làm dấu hoàn thành.

## Schema và chuyển đổi

- Key vẫn là `cuoi.progress`; ghi v18, đọc v1–18. Nhánh Gác Trời dùng `revision: 2`.
- Lưu phase/turn, matched/seen của T01, t02Done, tiền tố routeLandmarks, farewellDone, tiền tố clues, reunionDone, understoodCards; tách completedOnce, storyCompletedOnce và bookUnlocks bền vững.
- Không lưu hover, vị trí Cuội từng frame, phím giữ, sách đang mở, ảnh Trước/Sau hoặc trạng thái xem thêm.
- v1–13 khởi tạo Gác Trời mới và vẫn kiểm tra mở khóa từ hai chương trước. v14–17 chuyển trực tiếp từ raw, giữ cặp đã ghép và chuyện chưa đọc. Tổng kết T01 giữ turn; các phase từ route trở đi với đủ T01 chuyển tới t02-intro.
- Route ID bạn và changeFound cũ không trở thành đáp án mới. completedOnce cũ chỉ giữ khi thỏa điều kiện reader v17; không đặt farewellDone hoặc storyCompletedOnce mới.
- Reader lọc ID lạ/trùng, giữ tiền tố mốc đúng, kẹp turn và lùi về bước còn thiếu. Không tự tạo receipt hoặc thưởng. Đọc/migration không ghi localStorage; JSON lỗi về trạng thái idle, nên effect lưu của App không ghi đè trước khi người chơi bắt đầu.
- Các hàm trong `gac-troi-flow.ts` trả một snapshot cho mỗi hành động: câu chuyện T02 xong, từng đoạn T03, lời chào Gác Trời xong, từng manh mối, reunion xong, từng lời giải được xác nhận, và home xong. Chúng là nền cho M2–M6, chưa thay thế việc kiểm tra đáp án/input trong các màn đó.

## Chơi lại và sách

Chơi lại Gác Trời xóa dữ liệu của lượt này từ meeting đến home, giữ completedOnce/storyCompletedOnce/bookUnlocks và hai chương trước. Thành tích cũ vẫn thắp đèn; farewellDone của lượt mới vẫn phải đạt để đi vào T04. Những trang T01 đã mở vẫn đọc được khi replay.

Các ID sách tương lai có allowlist để lưu nhưng chưa xuất hiện trong browser sách trước khi có nội dung catalog. Unlock không đổi trang đang đọc. Chơi lại toàn truyện tiếp tục dùng xác nhận riêng trong menu, reset các chương và sách, giữ lựa chọn tiếng/âm thanh.

Xem lại kết dùng `GacEndingReview`, chỉ chứa phase/turn; kiểu này không thể truyền vào hàm save như một `GacTroiProgress`. Con trỏ chạy reflection → return-home → home → story-end và không ghi save chính. Chưa có nút xem lại vì màn kết chưa phát hành; M6 sẽ nối renderer và nút Trở lại.

Phase home/story-end được bảo toàn trong nhánh Gác Trời; App vẫn dùng chương moon-free làm host cho các màn của chương cuối. M6 cần dựng cảnh hiên theo phase home, không chạy lại phần mở đầu Earth hoặc thay ý nghĩa `Progress.completed` (mở hành trình sau phần đầu).

## Kiểm tra

- `npm run typecheck`, `npm run build`.
- `npm run check:book`: 22 trang, 46 block, hai ngôn ngữ.
- `npm run check:book-flow`: thứ tự, đích gợi ý và sách hiện có.
- `npm run check:gac-troi`: T01, cặp sai/đúng, chuyện chưa đọc và reload.
- `npm run check:ending-progress`: fixtures v13–18, từng lượt thoại và mọi checkpoint mới, dữ liệu lỗi, chuyển đổi không ghi save, replay giữ sách/thành tích, xem kết tách save, cổng màn chưa phát hành.
- `node scripts/check-active-friends.cjs` với Vite ở port 4174 (hoặc GAME_URL): 1440/390 px × Việt/Anh. Chơi T01 bằng UI, tổng kết → giới thiệu T02 bằng bàn phím, reload giữa giới thiệu và bảng nghỉ; chuyển save v17 hoàn thành, replay giữ thành tích/sách; kiểm tra ảnh, overflow và không phục hồi bạn đã bỏ khỏi tuyến.

Kiểm thử checkpoint tương lai ở mức dữ liệu, chưa phải kiểm thử tương tác các màn M2–M6. Build vẫn có cảnh báo dung lượng gói Phaser.
