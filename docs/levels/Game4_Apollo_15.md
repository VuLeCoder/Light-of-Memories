# Câu chuyện Apollo 15 — Bánh Lưới (màn 4)

Cập nhật **14/11/2026** theo mã nguồn. Tên file khớp thiết bị đang dùng: **LRV Apollo 15 tại Hadley–Apennine năm 1971**. Các mô tả Taurus–Littrow, VIP Site Apollo 17, Nansen, Shorty và đất cam thuộc phiên bản trước.

## 1. Thiết bị và giới hạn mô hình

Bánh Lưới là nhân vật của trò chơi dựa trên Lunar Roving Vehicle (LRV), xe do phi hành gia điều khiển trên Mặt Trăng. Nội dung hiện tại nói về xe Apollo 15, bánh lưới kim loại, việc mang mẫu về tàu Falcon và dấu vết nhìn từ quỹ đạo. Nguồn khoa học được tập hợp trong mục Apollo 15 của [references.md](../references.md).

Xe biết nói, đi theo Cuội và trao ánh sáng là hư cấu. Lưới 6×5, pin và số bước đi bộ là luật giáo dục, không phải số liệu kỹ thuật Apollo. Hai điểm A/B là vị trí trong bài chơi; không phải tọa độ hai trạm lịch sử. Trang đi bộ về tàu giải thích giới hạn liên quan vật tư hệ hỗ trợ sự sống, tách khỏi luật 4 bước của game.

## 2. Vị trí trong hành trình

Bánh Lưới đứng sau Tai Thính và trước Gác Trời. Lời dẫn kể chuyến đi kỳ ảo tới Hadley–Apennine, không nối các bãi đáp bằng một đường xe thật. Mở chương theo [friends/index.ts](../../src/content/friends/index.ts).

Luồng chính: **gặp xe → T01 chọn và thử bánh → cất ảnh A → T02 vẽ tuyến → T03 đi theo tuyến, lấy hai mẫu, về LM → cất ảnh B → hồi tưởng hai ảnh → chia tay, trao cánh thứ tư → hậu kết**.

Cuội, xe và địa hình được dựng trong [scenery.ts](../../src/game/scenes/ban-banh-luoi/scenery.ts). Chân dung minh họa giữ hình dáng thiết bị, không thêm mắt, miệng hay tay chân. Nhạc chương dùng chủ đề `surveyor`; hiệu ứng theo công tắc chung.

## 3. Nội dung sách đồng hành

Khi mở đủ có chín mục; số lá có thể thay đổi theo kích thước sách. Điều kiện nằm trong [progress.ts](../../src/content/friends/ban-banh-luoi/progress.ts), lời sách trong [dialogue.ts](../../src/content/friends/ban-banh-luoi/dialogue.ts).

| ID | Điều kiện | Nội dung |
| --- | --- | --- |
| `ban-banh-luoi` | Mở chương | “Bánh Lưới – Người bạn mê rong ruổi” |
| `ban-book-wheels` | Từ bài bánh xe, có ảnh A hoặc đã hoàn thành | “Bánh xe không cần bơm hơi”, hướng dẫn bài chơi |
| `ban-book-wheels-real` | Cùng điều kiện với trang bánh xe | “Bánh xe Apollo 15”, thông tin và ảnh chi tiết thật |
| `ban-photo-vip` | Cất ảnh A (`vip`) | “Xe thám hiểm Mặt Trăng Apollo 15” |
| `ban-book-route` | Có ảnh A | “Một chuyến đi, hai trạm”, sơ đồ mô hình |
| `ban-book-walkback` | Có ảnh A | “Nếu cần đi bộ về thì sao?”, kiến thức thật |
| `ban-book-samples` | Có ảnh A | “Hai điểm dừng, hai mẫu vật”, gợi ý lấy mẫu |
| `ban-book-legacy` | Cất ảnh B (`orbit`) | “LRV Apollo 15” |
| `ban-photo-orbit` | Có ảnh B | “LRV Apollo 15 (tiếp)”, ảnh quỹ đạo |

Tên chương nội bộ `apollo17`, khóa ảnh `vip` và khóa mẫu `orange` được giữ để tương thích. Chúng không mô tả sứ mệnh hoặc màu đất trong nội dung hiện tại. Gợi ý dẫn tới trang bánh, tuyến/đi bộ hoặc mẫu tùy phase; `photoB`/`memoriesIntro` chọn trang tổng kết khi đã có ảnh B.

## 4. Ba thử thách

### T01 — Giúp bánh xe sẵn sàng

Chọn giữa bánh cao su, bánh lưới và bánh đá; thử lựa chọn trên đường mô phỏng trước khi xác nhận. Đáp án là bánh lưới. Đổi bánh xóa kết quả thử cục bộ; tải lại cần thử lại. Sai có phản hồi và được sửa. Chỉ cất ảnh A mới ghi `vip` rồi chuyển lời dẫn T02. [Giao diện bánh xe](../../src/components/friends/ban-banh-luoi/BanhLuoiWheels.tsx).

### T02 — Cùng vạch đường đi

Lưới 6 cột × 5 hàng, tọa độ (cột, hàng) từ 1. LM ở (1,1), A ở (1,3), B ở (3,1); hố ở (2,2), (4,2), (4,4); dốc ở (3,2), (2,4). Đi bốn hướng, ghé A và B theo thứ tự tùy ý rồi về LM. Ô thường tốn 1 pin, dốc 2; xuất phát không tốn. Ngân sách 12 pin. Tại mỗi bước, đường đi bộ ngắn nhất tránh hố về LM không quá 4 bước; dốc tính 1 bước đi bộ.

Giới hạn pin và đi bộ được xét độc lập. Có hoàn tác, vẽ lại, gợi ý và nộp tuyến; không có đồng hồ hay tự điền đáp án. Nộp đúng mới tạo `confirmedRoute: { modelVersion: 1, cells }`. Bản nháp không thay tuyến đã xác nhận. Nộp cùng tuyến giữ checkpoint, tuyến khác reset riêng T03.

Ví dụ tuyến hợp lệ: `(1,1) → (1,2) → (1,3) → (2,3) → (3,3) → (3,2) → (3,1) → (2,1) → (1,1)`: 8 bước, 9 pin, xa nhất 4 bước đi bộ. Không bắt buộc tuyến tối ưu. [Mô hình](../../src/content/friends/ban-banh-luoi/challenges/models.ts), [thuật toán](../../src/content/friends/ban-banh-luoi/challenges/route.ts), [giao diện](../../src/components/friends/ban-banh-luoi/BanhLuoiRoute.tsx).

### T03 — Hai điểm dừng, hai mẫu vật

Xe đi theo toàn bộ tuyến đã xác nhận, giữ cả thứ tự A/B và đoạn lặp. Tại A, Cuội tới tảng đá, giữ rồi thả trong vùng lực để gõ; hai lần đúng làm rời mẫu. Vùng lực lần hai hẹp hơn và lệch phải. Nhặt mẫu, mang về xe rồi cất.

Tại B, quan sát ba mảng đất, chọn mảng giữa có hạt mịn xen mảnh vỡ nhỏ rồi mang mẫu về xe. Đất có sắc xám; bài không yêu cầu tìm đất cam Shorty. Trở về LM cùng đủ hai mẫu mới chuyển tới ảnh B và hồi tưởng.

Checkpoint lưu theo tuyến và trạng thái mẫu; vị trí/đồng hồ hoạt ảnh là trạng thái tạm. Reader và reducer xử lý dữ liệu sai/lặp theo điều kiện chặng. [Checkpoint](../../src/content/friends/ban-banh-luoi/challenges/guide.ts), [hướng dẫn](../../src/content/friends/ban-banh-luoi/challenges/guide-copy.ts), [giao diện](../../src/components/friends/ban-banh-luoi/BanhLuoiGuide.tsx), [cảnh](../../src/game/scenes/ban-banh-luoi/guide.ts).

## 5. Ảnh, hồi tưởng và phần thưởng

| Khóa | Tư liệu hiện dùng | Mốc nhận |
| --- | --- | --- |
| `vip` | NASA asset 7022567, ảnh LRV Apollo 15, năm 1971, NASA/MSFC | Sau T01 |
| `orbit` | LROC NAC M175252641L,R, khu Apollo 15 từ quỹ đạo, năm 2011, NASA/GSFC/ASU | Sau T03 |

Metadata, chú thích, ảnh chi tiết và nguồn nằm trong [images.ts](../../src/content/friends/ban-banh-luoi/images.ts). Ảnh thật nằm trong `public/images/memories/ban-banh-luoi/`; không dùng AI sửa ảnh tư liệu.

Sau hai trang hồi tưởng, Cuội trở lại bên xe, nghe chia tay rồi nhận cánh đèn thứ tư. Hoàn tất trao sáng mới lưu hoàn thành. Hậu kết có xem lại kết, chơi lại và về lộ trình; trò chuyện lại không cộng sao. Gác Trời là người bạn tiếp theo. [Kết chương](../../src/components/friends/ban-banh-luoi/BanhLuoiEnding.tsx), [điều phối](../../src/App.tsx).

## 6. Bản lưu và nguồn duy trì

Bộ lưu chung ghi schema v20, đọc v1–v20. `readBanhLuoi` còn nhận các phase camera/launch cũ và quyền tương thích `guideLegacyPassed`; không suy ra rằng các màn camera/cất cánh vẫn đang chơi. Chơi lại giữ ảnh và `completedOnce`, tạo lại lượt hiện tại. Không đổi ID chỉ để khớp tên Apollo 15.

Nguồn khoa học trong [references.md](../references.md) gồm NASA/NSSDCA về LRV, NASA/MSFC về ảnh Apollo 15, báo cáo nhiệm vụ Apollo 15, tài liệu Surface Procedures về walk-back và LROC về ảnh quỹ đạo. Các biên bản M0–M7 và số assertion cũ không được dùng làm kết quả nghiệm thu hiện tại.


## Bảo trì và xác nhận hiện tại · 14/11/2026

Tuyến chơi gồm Mắt Tròn → Lấp Lánh → Tai Thính → Bánh Lưới → Gác Trời. Mỗi bạn đóng góp một cánh đèn; bộ lưu chung dùng schema v20 và đọc bản v1–v20. Điều kiện mở chương nằm trong [friends/index.ts](../../src/content/friends/index.ts), điều kiện trang sách trong [reading-order.ts](../../src/content/book/reading-order.ts).

Trang kiến thức dùng tiêu đề, ảnh tư liệu có chú thích khi phù hợp, đoạn văn ngắn và nguồn ở chân trang theo [references.md](../references.md). Trang “Có yếu tố trò chơi” không cần hiện nguồn. Quy định mới nhất nằm trong [AGENTS.md](../../AGENTS.md).

Hai PDF `public/books/Truyen.pdf` và `Truyen_en.pdf` được mở nguyên bản trong tab mới và phải giữ nguyên. Sách đồng hành có điều kiện mở và cách chia trang riêng, không bắt buộc khớp số trang PDF. Xem [cơ chế sách đồng hành và PDF](../README.md#sách-đồng-hành-và-pdf).

Các script `check:*` và fixture đã được gỡ. Còn `npm run typecheck`, `npm run build` và `npm run preview`. Lần cập nhật này đối chiếu mã nguồn và sửa tài liệu, không phải lượt nghiệm thu giao diện hoặc xác minh lại các website nguồn.
