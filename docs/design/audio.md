# Âm thanh theo cảnh — phiên bản v3

Tài liệu mô tả âm thanh đang được triển khai. Game có **5 bản nhạc nền**, được chọn tự động theo cảnh, và một bộ hiệu ứng phản hồi thao tác. Không có giọng đọc.

Tài liệu âm thanh được lập ngày **14/11/2026**, với ghi chú nhạc thu âm cho đoạn kết ở cuối tài liệu. Khi bảo trì, đối chiếu thêm các module trong `src/audio/`.

## Nhạc nền của từng cảnh

Tên bản dưới đây là tên mô tả trong tài liệu; người chơi không cần chọn bài trong menu. Thời lượng là một vòng nhạc, tính theo 32 ô nhịp 4/4, chưa tính đuôi ngân.

| Cảnh | Bản nhạc / mã | Nhạc cụ chủ đạo → đáp lời | Nhịp độ | Một vòng | Sắc thái |
| --- | --- | --- | --- | --- | --- |
| Mở đầu An và bà; Cuội ngủ, thức giấc; lộ trình; menu | Đồng dao dưới trăng — `home` | Sáo trúc → đàn tranh | 96 BPM | 80 giây | Vui vừa, gần gũi, câu nhạc ngắn dễ nhớ |
| Mắt Tròn — Surveyor 3 | Dấu chân trên đất nguyệt — `surveyor` | Đàn T’rưng → đàn tranh | 108 BPM | 71,1 giây | Nhún nhảy, gợi bước chân khám phá |
| Lấp Lánh — Apollo 11 | Những tia sáng nhỏ — `sparkle` | Đàn tranh → sáo trúc | 112 BPM | 68,6 giây | Tươi sáng, lanh lợi, nhanh nhất trong năm bản |
| Gác Trời — LRO | Gió qua miền trăng — `watcher` | Sáo trúc → đàn bầu | 88 BPM | 87,3 giây | Dịu hơn, thảnh thơi để quan sát |
| Gặp chị Hằng, “Bạn hay rác?”, trở về An và bà, giới thiệu thành viên đến hết đoạn kết | Trăng đưa em về — `reunion` | Sáo trúc → đàn tranh | 100 BPM | 76,8 giây | Ấm áp, vui sáng, nhắc lại mô-típ mở đầu |

Các chương của ba người bạn giữ cùng bản nhạc qua hội thoại, nhiệm vụ và chia tay trong chương. Trở về lộ trình dùng lại `home`. Xem lại đoạn kết dùng `reunion`; trở về lộ trình sau đoạn kết dùng `home`.

**Menu luôn ưu tiên `home`**, kể cả khi mở từ một màn chơi hoặc đoạn kết. Đóng menu sẽ chọn lại bản theo cảnh phía sau. Thứ tự chọn trong mã là: menu → đoạn kết chị Hằng → Mắt Tròn → Lấp Lánh → Gác Trời → `home` mặc định.

Nếu menu làm đổi chủ đề (ví dụ `surveyor` → `home` → `surveyor`), bản của màn chơi bắt đầu lại khi đóng menu. Mở/đóng menu khi cảnh đang dùng `home` giữ tiến độ vòng nhạc.

## Phong cách và phối khí

Nhạc được sáng tác và tổng hợp bằng Web Audio theo hướng đồng dao ngũ cung dành cho trẻ em. Âm sắc gợi sáo trúc, đàn tranh, đàn bầu và đàn T’rưng; đây là mô phỏng bằng dao động âm, không phải bản thu nhạc cụ thật hay bản phối của một bài dân ca có sẵn.

Mỗi bản có 4 đoạn, mỗi đoạn 8 ô nhịp, gồm câu gọi, lặp lại, biến tấu và kết câu. Những câu sáu nốt có khoảng nghỉ và một câu đáp ngắn, giúp vòng nhạc có nhịp nhún mà vẫn chừa chỗ cho lời thoại. Đàn tranh và T’rưng đệm nhẹ; riêng Gác Trời dùng thêm nền đàn bầu mềm và ít nhịp gõ hơn. Tiếng gảy/gõ tắt gọn, sáo vào tiếng nhanh và đàn bầu luyến nhẹ.

## Quy tắc phát và điều khiển

- Hai công tắc **Nhạc nền** và **Hiệu ứng âm thanh** hoạt động độc lập, mặc định bật khi chưa có cài đặt cũ. Không có nút nghe thử.
- Trình duyệt cần tương tác thật bằng chuột, chạm hoặc bàn phím trong khung game để mở âm thanh. Sau đó, nhạc nền phát cả trong menu nếu đang bật.
- Mỗi bản lặp liên tục. Khi đổi chủ đề, bản mới bắt đầu từ đầu và chuyển âm dần trong khoảng 0,5 giây. Chuyển cảnh vẫn cùng chủ đề không đặt lại vòng nhạc.
- Khi đọc hội thoại và ở các trạng thái kể chuyện/chuyển cảnh được đánh dấu, nhạc giảm âm lượng. Riêng menu phát ở mức bình thường; đoạn kết chị Hằng được giảm âm lượng trong suốt trạng thái đoạn kết.
- Mở menu tạm dừng gameplay và hiệu ứng, nhưng vẫn phát nhạc menu. Khi tab bị ẩn hoặc cửa sổ mất tiêu điểm, toàn bộ âm thanh tạm dừng; quay lại sẽ tiếp tục nếu cài đặt cho phép.
- Cài đặt lưu tại `localStorage`: `cuoi.music` và `cuoi.effects`, giá trị `on`/`off`. Nếu chưa có giá trị riêng, game kế thừa `cuoi.sound` cũ. Khi không lưu được, lựa chọn vẫn áp dụng trong phiên chơi.
- Nếu không mở được âm thanh, menu hiển thị thông báo; người chơi vẫn tiếp tục chơi được.

## Hiệu ứng âm thanh

Hiệu ứng dùng chung giữa các cảnh; không đổi theo bản nhạc nền.

| Mã | Tình huống hiện dùng | Âm sắc |
| --- | --- | --- |
| `touch` | Nút trong màn chơi, thao tác hiện hết/chuyển lời thoại bằng chuột hoặc Space/Enter | Đàn tranh, ngắn và nhẹ |
| `success` | Trả lời đúng, ghép đúng, hoàn thành thao tác hoặc nhiệm vụ | Đàn tranh, cụm nốt đi lên |
| `retry` | Chọn sai, kiểm tra chưa đúng, đào chưa trúng | Đàn tranh, một nốt nhẹ |
| `dig` | Thao tác đào ở Mắt Tròn | T’rưng, hai nốt thấp |
| `gift` | Nhận đèn, ảnh/kỷ vật, tìm được đồ vật và một số mốc đoạn kết | Đàn tranh, cụm nốt sáng |
| `lamp` | Nhận ánh sáng khi hoàn tất chương của người bạn | Đàn tranh, cụm nốt dài hơn theo chương |
| `hint` | Mở sách qua nút trong game | Đàn bầu |

Nút trong menu không phát hiệu ứng. Nút chuyển lời thoại xử lý hiệu ứng riêng để tránh phát hai lần; lời thoại tự chuyển không tạo tiếng nhấn. Bộ phát có giới hạn tần suất để tránh dồn tiếng khi thao tác nhanh.

## Mã nguồn

| Tệp | Vai trò |
| --- | --- |
| [`src/audio/music-score.ts`](../../src/audio/music-score.ts) | Năm bản nhạc, BPM, nốt nhạc, phối khí và hàm `selectMusicMood` |
| [`src/audio/game-audio.ts`](../../src/audio/game-audio.ts) | Tổng hợp âm sắc, phát vòng, chuyển nhạc, giảm âm lượng, hiệu ứng |
| [`src/audio/useGameAudio.ts`](../../src/audio/useGameAudio.ts) | Mở âm thanh sau tương tác, xử lý tiêu điểm/tab, hiệu ứng nút |
| [`src/audio/settings.ts`](../../src/audio/settings.ts) | Đọc/lưu hai công tắc âm thanh |
| [`src/App.tsx`](../../src/App.tsx) | Chuyển trạng thái cảnh thành chủ đề nhạc, tạm dừng và giảm âm lượng |

Phaser dùng `noAudio`; bộ Web Audio riêng quản lý nhạc và hiệu ứng. Không cần tải tệp nhạc bên ngoài.

## Bảo trì và tích hợp màn chơi

- Chọn chủ đề tập trung qua `selectMusicMood` và trạng thái trong `App.tsx`; không tạo bộ phát hoặc `AudioContext` riêng cho từng màn.
- Giữ hai công tắc độc lập, ưu tiên nhạc menu, tạm dừng khi mất tiêu điểm và giảm âm lượng khi kể chuyện. Không thêm nút nghe thử.
- Phát hiệu ứng tại thao tác hoặc mốc vừa xảy ra; đọc lại save hay dựng lại component không tự phát phần thưởng. Dùng bộ `SoundCue` chung và kiểm tra tránh tiếng `touch` trùng với hiệu ứng đúng/sai/phần thưởng.
- Khi đổi bản nhạc, cập nhật bảng cảnh, BPM, thời lượng và kiểm tra liên quan. Thời lượng một vòng = `steps.length × beat / 2`, với `beat = 60 / BPM` (giây).
- Việc chỉnh nhạc nền giữ nguyên hiệu ứng, giao diện và khung trò chơi, trừ khi có yêu cầu khác.

## Kiểm tra

Các script kiểm tra âm thanh tự động đã được gỡ ngày 14/11/2026. Dự án không yêu cầu Playwright hoặc đường dẫn Chrome cố định để chạy và build.

Khi nghe kiểm tra thủ công, đi lần lượt: menu → mở đầu → lộ trình → năm người bạn → chị Hằng → An và bà → giới thiệu → lộ trình. Mở/đóng menu giữa mỗi chương, thử hai công tắc riêng biệt, chuyển tab rồi quay lại, và kiểm tra chuột/chạm cùng Space/Enter ở hội thoại. Chú ý mức nhạc khi đọc, chuyển bản êm và điểm nối sau một vòng.

## Nhạc thu âm cho đoạn kết

`public/audio/music/five-points-of-light.mp3` phát từ cảnh An và bà và tiếp tục qua credits, logo. Xem lại credits bắt đầu bài từ đầu. Nhạc lặp, tuân theo công tắc nhạc nền; menu và mất tiêu điểm tạm dừng bài, quay lại tiếp tục. Lỗi tải dùng nhạc tổng hợp hiện có. Các cảnh chị Hằng và mini game giữ nhạc cũ.
