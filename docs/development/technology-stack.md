# Framework, thư viện và công nghệ của CUỘI

Tài liệu được đối chiếu với `package.json`, `package-lock.json` và mã nguồn ngày 14/11/2026. Cột phiên bản bên dưới ghi phiên bản được khóa trong `package-lock.json`; các khoảng phiên bản cho phép được khai báo trong `package.json`.

## Thư viện chạy trong ứng dụng

| Thư viện | Phiên bản khóa | Vai trò trong dự án |
| --- | --- | --- |
| React | 19.2.8 | Xây dựng giao diện website, menu, hội thoại, thử thách và sách đồng hành bằng component và hook. |
| React DOM | 19.2.8 | Gắn cây component React vào trang HTML qua `createRoot` tại `src/main.tsx`. |
| Phaser | 3.90.0 | Game engine cho cảnh chơi 2D, hiển thị nhân vật, hoạt ảnh, di chuyển và tương tác. Được tải động tại `src/game/GameCanvas.tsx`. |

## Ngôn ngữ và công cụ phát triển

| Công cụ / gói | Phiên bản khóa | Vai trò trong dự án |
| --- | --- | --- |
| TypeScript | 5.9.3 | Viết mã có kiểu dữ liệu trong `src/`, kiểm tra kiểu trước khi build; cấu hình bật `strict`. |
| Vite | 6.4.4 | Chạy máy chủ phát triển, phục vụ tài nguyên và tạo bản build website trong `dist/`. Cấu hình tách Phaser thành chunk riêng. |
| `@vitejs/plugin-react` | 4.7.0 | Tích hợp React với Vite, hỗ trợ xử lý JSX/TSX và Fast Refresh khi phát triển. |
| `@types/react` | 19.2.18 | Khai báo kiểu TypeScript cho React. |
| `@types/react-dom` | 19.2.7 | Khai báo kiểu TypeScript cho React DOM. |

HTML và CSS thuần đảm nhiệm cấu trúc trang, giao diện và bố cục theo kích thước màn hình. JavaScript dùng cho API. Node.js chạy Vite và TypeScript; npm quản lý gói và các lệnh trong `package.json`. Hướng dẫn cài đặt hiện tại yêu cầu Node.js 22.12 trở lên, xem [README](../../README.md#cài-đặt-và-chạy).

## API trình duyệt và tài nguyên giao diện

Các thành phần sau dùng trực tiếp khả năng của trình duyệt, không phải thư viện npm riêng:

| Thành phần | Cách sử dụng |
| --- | --- |
| Web Audio API | Tổng hợp nhạc nền và hiệu ứng trong `src/audio/`; bộ âm thanh riêng quản lý phát nhạc và cài đặt. |
| `localStorage` | Lưu tiến trình, ngôn ngữ và lựa chọn âm thanh trên trình duyệt. Logic tiến trình nằm tại `src/state/progress.ts`. |
| Fetch API | Gửi yêu cầu HTTP, bao gồm kết nối API đếm người truy cập. |
| SVG | Vẽ sơ đồ, minh họa và một số thành phần giao diện trực tiếp trong component. |
| Font Lora và Be Vietnam Pro | Font được đóng gói trong `public/fonts/`, khai báo tại `src/styles/fonts.css`; giấy phép và nguồn font nằm trong thư mục font. |
| Tệp PDF tĩnh | Hai bản truyện Việt/Anh trong `public/books/` được mở qua liên kết; đây là tài nguyên truyện, không phải thư viện đọc PDF. |

## Dịch vụ cho bộ đếm người truy cập

| Thành phần | Vai trò |
| --- | --- |
| Vercel Function | Chạy endpoint `api/visitors.js` khi triển khai trên môi trường tương ứng. |
| Upstash Redis REST API | Lưu tập mã trình duyệt và trả tổng số người truy cập. API gọi Redis bằng `fetch` và lệnh Lua để thêm mã rồi đếm phần tử. |

Bộ đếm cần hai biến môi trường `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` ở phía máy chủ. Mã hiện tại gọi REST trực tiếp, không khai báo Redis SDK trong `package.json`. Phần giao diện và game được build thành tài nguyên tĩnh; bộ đếm là phần cần dịch vụ máy chủ riêng.

## Kiểm tra và build

Các script kiểm tra riêng và fixture trình duyệt đã được gỡ ngày 14/11/2026; Playwright và Google Chrome không còn là công cụ bắt buộc của dự án. TypeScript kiểm tra kiểu bằng `npm run typecheck` và trong bước build.

Các lệnh chính đã có trong `package.json`:

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Trước khi triển khai, nghiệm thu trực tiếp game, sách và âm thanh trên các trình duyệt và thiết bị mục tiêu; xem thêm [hướng dẫn nghe kiểm tra](../design/audio.md#kiểm-tra).

## Căn cứ đối chiếu trong repository

- [package.json](../../package.json): phụ thuộc trực tiếp và lệnh chạy.
- [package-lock.json](../../package-lock.json): phiên bản gói được khóa, gồm cả phụ thuộc gián tiếp.
- [vite.config.ts](../../vite.config.ts) và [tsconfig.json](../../tsconfig.json): cấu hình build và TypeScript.
- [src/main.tsx](../../src/main.tsx) và [src/game/GameCanvas.tsx](../../src/game/GameCanvas.tsx): khởi tạo React và Phaser.
- [src/audio/game-audio.ts](../../src/audio/game-audio.ts): bộ âm thanh Web Audio.
- [api/visitors.js](../../api/visitors.js): API bộ đếm và kết nối Redis.

Tài liệu tập trung vào phụ thuộc trực tiếp và những công nghệ được mã nguồn sử dụng rõ ràng. Các gói gián tiếp do Vite, Phaser hoặc công cụ khác kéo theo được lưu đầy đủ trong lockfile.
