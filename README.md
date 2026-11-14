# CUỘI — Chú Cuội, chị Hằng và những người bạn bị lãng quên

## Giới thiệu

**CUỘI** là web-game kết hợp sách tranh của nhóm **Light of Memories**, hướng tới trẻ em tiểu học. Người chơi đồng hành cùng Cuội đi tìm chị Hằng, gặp gỡ những thiết bị bị bỏ lại trên Mặt Trăng và khám phá câu chuyện của chúng. Dự án kết hợp văn hóa Trung Thu Việt Nam với chủ đề khám phá không gian, lấy chiếc đèn ông sao làm biểu tượng cho ký ức và tình bạn.

Dự án được phát triển theo challenge **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**. Phong cách hình ảnh ấm áp, hoài niệm: cảnh game pixel art, giao diện xanh đêm, điểm nhấn vàng và trang sách màu giấy kem.

### Thành viên nhóm

- Lê Phạm Thế Vũ 
- Nguyễn Đức Mạnh
- Nguyễn Bảo An 
- Nguyễn Thị Thanh An
- Cao Quốc Khánh
- Vũ Lê Đức Minh

### Phiên bản hiện tại

Đã dựng phần mở đầu: hội thoại An và bà, chuyển cảnh lên Mặt Trăng, Cuội thức dậy, di chuyển, quan sát ghế đá, trò chuyện với Cây Đa và nhận đèn trước khi lên đường. Website có menu, chọn tiếng Việt / tiếng Anh và lưu tiến trình theo mốc trên trình duyệt.

Tuyến hiện tại gồm **Surveyor 3 — Mắt Tròn → Apollo 11 — Lấp Lánh → LRO — Gác Trời**. Gác Trời có T01 ghép ký ức, T02 so sánh hai ảnh thật và T03 trực gác vùng tối. Sau khi nhận ánh sáng cuối, Cuội gặp chị Hằng tại nơi thức giấc, trò chuyện và chơi mini game “Bạn hay rác?”. Câu chuyện trở về An và bà ở Trái Đất, chạy phần giới thiệu thành viên rồi về lộ trình. Người chơi có thể xem lại giới thiệu hoặc chơi lại toàn bộ đoạn kết. Luồng tìm Thỏ Ngọc cũ đã được loại bỏ; các ghi chú trong `docs/done/` lưu lại lịch sử thiết kế.

Game nằm bên trái, sách đồng hành bên phải; phần giới thiệu nằm bên dưới. Trên màn hình nhỏ, sách và panel chuyển xuống dưới game. Sách mở nội dung theo tiến trình, có gợi ý và nguồn ảnh.

## Cài đặt và chạy

### Yêu cầu

- Node.js 22.12+ (khuyến nghị dòng 22 LTS hoặc 24 LTS) và npm.
- Trình duyệt hiện đại có hỗ trợ WebGL hoặc Canvas.

Mở terminal tại thư mục gốc của dự án, nơi chứa `package.json`.

### Chạy khi phát triển

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`. Dừng server bằng `Ctrl+C`.

### Kiểm tra và tạo bản build

```bash
# Kiểm tra kiểu TypeScript
npm run typecheck

# Kiểm tra nội dung và điều hướng sách
npm run check:book
npm run check:book-flow

# Kiểm tra T01, chuyển save và checkpoint kết truyện
npm run check:gac-troi
npm run check:gac-light
npm run check:gac-trail

# Kiểm tra bộ phát, cài đặt và tích hợp âm thanh
npm run check:audio
npm run check:audio-ui

# Kiểm tra TypeScript và tạo bản build
npm run build

# Xem bản build trên máy, sau khi build thành công
npm run preview
```

Kiểm tra sách và tiến trình: `npm run check:book`, `npm run check:book-flow` và `npm run check:gac-troi`. Các script kiểm tra hành trình Thỏ Ngọc cũ đã được loại bỏ.

`check:audio-ui` cần Playwright và Google Chrome tại `/usr/bin/google-chrome`; script tự mở Vite trên cổng trống. Xem phạm vi và giới hạn kiểm tra trong [tài liệu âm thanh](docs/audio.md#kiểm-tra).

Bản build giao diện nằm trong `dist/`. Game có thể chạy trên hosting tĩnh; riêng bộ đếm người truy cập cần Vercel Function trong `api/` và database Upstash Redis.

## Các mục nổi bật

### Công nghệ và cấu trúc

Giao diện dùng **React 19 + TypeScript + CSS**, game dùng **Phaser 3**, công cụ phát triển và build là **Vite 6**.

| Đường dẫn | Nội dung |
| --- | --- |
| `src/App.tsx` | Bố cục website, menu và điều phối tiến trình câu chuyện |
| `src/components/` | Giao diện chia theo `friends/<id>/`, `book/`, `journey/`, `ending/`, `shared/`, `shell/` |
| `api/visitors.js` | API đếm trình duyệt truy cập, lưu chung trên Redis |
| `src/game/` | Vòng đời Phaser, cảnh game, hoạt ảnh, di chuyển và tương tác |
| `src/audio/` | Bản nhạc theo cảnh, tổng hợp Web Audio, hiệu ứng và cài đặt âm thanh |
| `src/content/friends/<id>/` | Thông tin từng bạn, hội thoại, gợi ý, thử thách và tiến trình |
| `src/content/story/` | Hội thoại mở đầu, kết truyện và kiểu dữ liệu hội thoại chung |
| `src/content/book/` | Danh mục sách, nội dung đọc và cấu hình PDF |
| `src/game/scenes/<id>/` | Mã vẽ cảnh, bố trí thiết bị và tương tác Phaser |
| `src/content/` | Bản dịch giao diện, khai báo ảnh và tọa độ cắt sprite |
| `src/state/progress.ts` | Đọc và lưu tiến trình |
| `src/styles/` | Font, CSS toàn cục và bố cục theo kích thước màn hình |
| `src/hooks/` | Hook dùng ở cấp ứng dụng |
| `scripts/checks/` | Kiểm tra chia theo `audio/`, `book/`, `friends/`, `journey/` |
| `scripts/fixtures/` | Fixture trình duyệt dùng cho kiểm tra |
| `public/images/` | Nhận diện, chân dung, sprite và ảnh tư liệu theo nhóm; xem [quy ước public](public/README.md) |
| `docs/` | Tài liệu kỹ thuật, hình ảnh và review mã nguồn |

Quy chuẩn thư mục giao diện, mã nguồn và kiểm tra được ghi trong [cấu trúc thư mục](docs/folder-structure.md). Quy chuẩn đặt tên và vị trí nội dung được ghi trong [hướng dẫn nội dung](src/content/README.md).

Ảnh mới đặt trong `public/images/` và khai báo qua `src/content/assets.ts`. Khi thay sprite sheet, cần cập nhật tọa độ cắt frame và điểm đặt chân để hoạt ảnh không lệch vị trí. Khi thêm nội dung, bổ sung cả bản tiếng Việt và tiếng Anh.

Font **Lora** và **Be Vietnam Pro** được đóng gói trong `public/fonts/`, khai báo tại `src/styles/fonts.css`, không cần cài font trên máy hay truy cập dịch vụ font bên ngoài. Các file WOFF2 giữ nguyên bộ ký tự của font gốc, gồm tiếng Việt và dấu tổ hợp. Giấy phép OFL và nguồn tải nằm trong thư mục font. Khi triển khai, cần đưa cả thư mục `dist/fonts/` lên hosting.

### Điều khiển và lưu hành trình

- Bấm vào game để dùng bàn phím. Game giữ focus qua hội thoại/thử thách và nhả khi chuyển sang sách hoặc bấm ra ngoài.
- **A / D** hoặc **← / →** để di chuyển; có thể bấm mặt đất để đi tới.
- **Space / Enter** để hiện hết hoặc tiếp tục hội thoại.
- **E** khi đứng gần vật hoặc người bạn để tương tác; có thể bấm trực tiếp. Các chặng đào đất/đi có chiều sâu có hướng dẫn riêng ở footer.
- Mở menu sẽ tạm dừng tương tác trong game.

Tiến trình, ngôn ngữ và lựa chọn âm thanh được lưu bằng `localStorage` trên trình duyệt hiện tại, chưa đồng bộ giữa thiết bị. Khi tải lại trang, chọn **Tiếp tục** trong menu để trở về mốc đã lưu. Tiến trình schema v19 đọc được bản v1–v19. Save Gác Trời v14–v17 giữ các cặp T01 và câu chuyện đã đọc; save đã qua T01 tiếp tục ở giới thiệu T02. Thành tích hợp lệ và các trang sách đã mở được giữ khi chơi lại Gác Trời. Lượt thoại được giữ theo quy tắc từng chặng. Xóa dữ liệu website sẽ mất bản lưu. Nếu trình duyệt chặn lưu trữ, game vẫn chơi được trong phiên.

### Những phần đang phát triển

Các báo cáo milestone cũ và bài kiểm tra cho giao diện đã thay thế đã được dọn. Mã nguồn là căn cứ cho luồng hiện tại; giữ quy chuẩn thiết kế và hồ sơ nguồn ảnh. T03 hiện là mô phỏng mặt cắt hố với thanh kéo hướng nắng; đoạn kết Gác Trời có hồi tưởng và tổng kết kiến thức.
- Sách có 38 mục nội dung Việt/Anh và hai trang bìa trước/sau. Hai bìa luôn có sẵn từ đầu, kể cả khi chưa bắt đầu game: bìa trước ở đầu sách, bìa sau ở cuối sách; nội dung mở dần được chèn ở giữa. Phần mở rộng chỉ bổ sung kiến thức và hai chuyện thật cho mỗi người bạn, có ảnh tư liệu cùng nguồn; ba mục kết truyện được giữ (đã bỏ “Những điều ở lại”). Các trang dẫn và chia tay hư cấu thêm trong đợt mở rộng đã được bỏ theo phạm vi biên tập mới.
- Giữ nguyên khung sách cạnh game; nội dung dài được chia thành nhiều trang. Chuyện thật cuối chương mở khi hoàn thành chương. Đoạn kết mở theo cuộc gặp chị Hằng, từng thẻ đã hiểu, hội thoại An–bà và kết thúc giới thiệu; trang đã mở được giữ khi chơi lại.
- Nút **Tải truyện PDF** cung cấp nguyên bản `docs/Truyen.pdf` hoặc `docs/Truyen_en.pdf` theo ngôn ngữ đang chọn. Truyện đầy đủ có năm bạn; game hiện có ba bạn. Hai bản được đóng gói tại `public/books/`, không phụ thuộc save. Bộ xuất PDF động cũ được giữ trong mã nhưng không được giao diện gọi.
- Nội dung game lấy hai PDF làm chuẩn, giữ tuyến ba bạn và cách trao cánh sao hiện tại. Đoạn kết trở về gốc đa, có lời giải thích của Hằng và lời hứa của An. Xem [bảng đối chiếu và ngoại lệ chuyển thể](docs/story-sync.md).
- Menu có hai công tắc **Nhạc nền** và **Hiệu ứng âm thanh**, mặc định bật. Nhạc tự phát sau tương tác chuột/chạm/bàn phím đầu tiên trong khung game, kể cả ở menu. Menu tạm dừng gameplay và hiệu ứng; chuyển tab/cửa sổ tạm dừng toàn bộ âm thanh.
- Nhạc ngũ cung tổng hợp bằng Web Audio gồm năm bản đồng dao vui tươi, mỗi vòng 32 ô nhịp (69–88 giây): Đồng dao dưới trăng (menu, mở đầu, thức giấc, lộ trình), Dấu chân trên đất nguyệt (Mắt Tròn), Những tia sáng nhỏ (Lấp Lánh), Gió qua miền trăng (Gác Trời), Trăng đưa em về (chị Hằng đến hết). Phối khí gợi sáo trúc, đàn tranh, đàn bầu và đàn T’rưng; chuyển chủ đề trong 0,5 giây, giảm âm lượng khi đọc. Hiệu ứng phản hồi các bài chơi, kỷ vật, đèn/sao và đoạn kết, không có giọng đọc.
- Lựa chọn lưu riêng ở `cuoi.music` và `cuoi.effects`; lần đầu kế thừa cài đặt `cuoi.sound` cũ. Không dùng tệp thu âm bên ngoài. Phaser tiếp tục dùng `noAudio`; bộ Web Audio riêng quản lý cả hai loại.
- Kiểm tra: `npm run check:audio` (bộ máy và cài đặt), `npm run check:audio-ui` (Chrome, menu và sự kiện v3).
- Bản build còn cảnh báo kích thước gói Phaser.

### Tài liệu tham khảo

- [Âm thanh theo cảnh — nhạc nền, nhạc cụ và quy tắc phát](docs/audio.md)
- [Game1 — Mắt Tròn](docs/done/Game1_Surveyor_3.md)
- [Game2 — Lấp Lánh](docs/done/Game2_Apollo_11.md)
- [Game3 — Tai Thính (tài liệu lịch sử)](docs/done/Game3_Apollo_12.md)
- [Game4 — Bánh Lưới và bàn giao M7 (tài liệu lịch sử)](docs/done/Game4_Apollo_17.md)
- [Game5 — Gác Trời (LRO, người bạn thứ ba trong tuyến hiện tại)](docs/done/Game5_LRO.md)
- [Hướng dẫn AI thiết kế màn chơi mới](docs/Huong-dan-AI-thiet-ke-man-choi-moi.md)
- [Phong cách hình ảnh và hướng dẫn sinh ảnh cho AI](docs/visual-style.md)
- [Quy ước thư mục ảnh](docs/image-assets.md)
- [Kiểm kê ảnh và thông tin sprite](docs/assets-inventory.md)
