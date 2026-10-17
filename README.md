# Chú Cuội, chị Hằng và những người bạn bị lãng quên

Bản dựng mở đầu theo [kế hoạch](Ke-hoach-Codex-Mo-dau-game-Cuoi.md). React + TypeScript + Vite dựng giao diện; Phaser dựng cảnh pixel 960 × 540.

## Chạy cục bộ

Dùng Node.js 22.12+ hoặc 24 LTS và npm:

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`). Nếu đã có `node_modules` từ phiên triển khai, có thể chạy ngay `npm run dev`.

```bash
npm run typecheck
npm run build
npm run preview
```

`dist/` là bản build tĩnh. Không cần backend hoặc biến môi trường. Font dùng bộ có sẵn trên máy với serif/sans-serif dự phòng, không tải Google Fonts.

## Phần đã dựng

- Game bên trái, sách placeholder bên phải, tỉ lệ cột 70/30 (trừ khoảng cách). Section giới thiệu nằm bên dưới.
- Chọn **Tiếng Việt / English** trên thanh đầu trang. Giao diện, menu, hội thoại, lời dẫn và nhãn kiểm tra cảnh đổi ngay mà không khởi động lại hành trình; lựa chọn được lưu trong trình duyệt.
- Menu mở khi vào web: Bắt đầu hành trình, Tiếp tục trong phiên, Hướng dẫn và lựa chọn âm thanh. Bắt đầu mở cảnh hiên nhà; nút Menu cho phép quay lại và bắt đầu lại có xác nhận. Lựa chọn âm thanh được lưu nếu localStorage khả dụng; chưa có tài nguyên nhạc.
- Hai nút **Hiên nhà / Mặt Trăng** để xem cảnh thử, không phải menu hoặc chuyển cảnh cốt truyện.
- An và bà dùng frame nghỉ; Cuội có các frame ngủ, thức dậy, đứng nghỉ và đi bộ được cắt thủ công từ sprite sheet. Chân dung dùng ảnh minh họa gốc.
- Nền hiên nhà, Mặt Trăng, cây đa và ghế đá được vẽ tạm bằng các lớp Phaser độc lập.
- Canvas giữ tỉ lệ 16:9; ResizeObserver cập nhật Scale Manager khi container đổi kích thước.
- Mục **Kiểm tra bản dựng** bật vùng kiểm tra và tọa độ click trong không gian 960 × 540. Khi Cuội đã thức dậy, click mặt đất còn đặt đích di chuyển.
- Một component sở hữu vòng đời Phaser; hủy instance, observer và listener khi đổi cảnh hoặc unmount. Hỗ trợ React StrictMode bằng hủy khởi tạo bất đồng bộ đã lỗi thời.

Đã có sáu lượt kể chuyện An–bà, chữ hiện dần, chân dung người nói, tiếp tục bằng chuột hoặc Space/Enter. Mở menu tạm dừng câu hiện tại; Tiếp tục khôi phục trong phiên. Câu cuối chờ xác nhận trước hiệu ứng chuyển cảnh; Bỏ qua mở đầu cũng đưa tới Cuội ngủ. Xem [bàn giao hội thoại](docs/dialogue-an-ba.md).

Ở Mặt Trăng, Cuội thức dậy rồi người chơi xác nhận hai câu dẫn trước khi điều khiển bằng A/D, ←/→ hoặc click mặt đất. Menu tạm dừng di chuyển. Chưa triển khai tương tác ghế đá/Cây Đa, lưu tiến trình qua tải lại hoặc nội dung sách.

## File chính

| File | Vai trò |
| --- | --- |
| `src/App.tsx`, `src/styles.css` | Bố cục sách–game và giao diện xem thử |
| `src/game/GameCanvas.tsx` | Vòng đời Phaser, scale, thông báo lỗi tải |
| `src/game/PreviewScene.ts` | Nạp frame, hoạt ảnh Cuội, di chuyển và kiểm tra click |
| `src/game/scenery.ts` | Nền và đạo cụ pixel tạm, có thể thay riêng từng lớp |
| `src/content/assets.ts` | Đường dẫn 9 ảnh, kích thước/frame/điểm đặt chân |
| `src/content/scenes.ts`, `src/content/i18n.ts` | Mã cảnh, bản dịch giao diện và hội thoại |
| `docs/assets-inventory.md` | Kiểm kê, tọa độ frame và hạn chế |
| `docs/milestone-1.md` | Kết quả kiểm tra và checklist nghiệm thu |

## Kiểm thử trình duyệt

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright tự mở Vite. Bài kiểm thử kiểm tra tỉ lệ canvas, sách bên phải, không tràn ngang ở 1280 × 720 / 1440 × 900 / 900 × 720, ánh xạ click sau resize, luồng kể chuyện, di chuyển, chuyển cảnh liên tục không nhân đôi canvas, lỗi runtime và thông báo khi ảnh không tải được.

Phiên triển khai hiện tại đã build thành công nhưng **chưa chạy được kiểm thử trình duyệt**: sandbox từ chối mở cổng localhost (`listen EPERM`) và khởi động Chromium (`Operation not permitted`). Không coi việc có bài kiểm thử là bằng chứng bài kiểm thử đã đạt.
