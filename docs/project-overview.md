# Tổng quan dự án Cuội

Tài liệu mô tả mã nguồn hiện tại, cập nhật ngày 17/10/2026. Đọc tiếp [phong cách hình ảnh](visual-style.md), [review mã nguồn](code-review.md) và [kiểm kê ảnh](assets-inventory.md).

## Công nghệ

| Thành phần | Công nghệ / vai trò |
| --- | --- |
| Giao diện | React 19, TypeScript, CSS thuần; không dùng thư viện component |
| Game | Phaser 3.90; canvas 960 × 540, tỉ lệ 16:9, tự co theo container |
| Công cụ | Vite 6; TypeScript kiểm tra kiểu trước khi build |
| Nội dung | Dữ liệu hội thoại và bản dịch Việt/Anh trong các module TypeScript |
| Lưu trữ | Tiến trình lưu localStorage; bộ đếm người truy cập lưu chung trên Upstash Redis qua `api/visitors.js` |
| Triển khai | Giao diện từ `dist/`, ảnh từ `public/`; API bộ đếm chạy trên Vercel Functions |

Phiên bản trên là dòng phiên bản khai báo trong `package.json`; `package-lock.json` khóa bộ cài. Chạy `npm ci`, `npm run dev`; xác minh bằng `npm run typecheck`, `npm run build`. Phaser được tách thành chunk riêng và khởi tạo sau khi component mount.

## Các phần đã dựng

- Menu đầu game: bắt đầu, tiếp tục, hướng dẫn, bắt đầu lại có xác nhận. Mở menu tạm dừng tương tác.
- Hiên nhà Trung Thu: An và bà, sáu lượt thoại, chân dung người nói, chữ hiện dần, nút hiện hết/tiếp theo và bỏ qua mở đầu.
- Chuyển cảnh sang Mặt Trăng; Cuội ngủ, thức dậy, đọc hai câu dẫn rồi được di chuyển.
- Di chuyển bằng A/D, trái/phải hoặc bấm mặt đất. Bấm ghế để đi tới tương tác hoặc đến gần rồi nhấn E.
- Hội thoại Cây Đa, trao đèn ông sao, chỉ báo 0/5, lời lên đường và dấu chân dẫn sang phải.
- Kết thúc mở đầu: thông báo hành trình Mắt Tròn sắp tới, ở lại khám phá hoặc về menu.
- Chọn Việt/Anh ngay trong phiên; đổi tiêu đề trang, nội dung và nhãn hỗ trợ tiếp cận.
- Lưu theo mốc, khôi phục qua menu khi tải lại; báo khi trình duyệt không cho lưu. Đoạn thoại đang dở bắt đầu lại từ đầu đoạn.
- Xử lý focus bàn phím trong canvas/hội thoại và giữ focus khi chuyển cảnh. Có chữ dành cho trình đọc màn hình và hỗ trợ giảm chuyển động.

Sách đồng hành vẫn là giao diện chờ nội dung. Chưa có chương Mắt Tròn, thu thập đủ năm cánh sao, âm thanh thật hay nội dung sách theo tiến trình. Công tắc âm thanh hiện chỉ lưu lựa chọn; Phaser đang dùng `noAudio: true`.

## Bố cục website

```text
Header: logo + CUỘI                    Ngôn ngữ + nhãn bản dựng
────────────────────────────────────────────────────────────
Số cảnh + tên cảnh + Bỏ qua / Menu     TRANG SÁCH BÊN BẠN
Game (cột 7 phần)                     Sách (cột 3 phần)
  Nền + nhân vật                       Trang giấy kem
  Menu / thoại / mục tiêu               Hình trang trí
  Thông báo theo chặng                  Ghi chú dưới sách
Nhân vật + mô tả cảnh
────────────────────────────────────────────────────────────
Section giới thiệu                    Logo nhóm
Footer
```

Khung ngoài tối đa 1600px. Desktop dùng CSS Grid hai cột 7:3; toolbar và nhãn sách chung hàng. Khung canvas 16:9, trang sách 16:21 nhằm khớp chiều cao canvas khi hai cột giữ tỉ lệ này. Chiều cao menu có mức tối thiểu riêng, nên lúc mở menu sách không nhất thiết cao bằng toàn bộ game. Các dòng hướng dẫn và mô tả dưới canvas cũng không nằm trong chiều cao đối chiếu của trang sách.

Dưới 760px, sách chuyển xuống dưới game, tiếp đó là giới thiệu. Trang sách có thể cuộn khi nội dung dài. Độ rộng tối thiểu toàn trang hiện là 360px. Hội thoại nằm đè ở đáy canvas; menu và bảng kết thúc cũng nằm bên trong khung game.

## Cấu trúc mã nguồn

| Đường dẫn | Trách nhiệm |
| --- | --- |
| `src/main.tsx` | Mount React và nạp CSS |
| `src/App.tsx` | Bố cục, trạng thái hành trình, menu, ngôn ngữ, điều phối focus và lưu |
| `src/components/GameMenu.tsx` | Menu chính, hướng dẫn, xác nhận bắt đầu lại |
| `src/components/EarthDialogue.tsx` | Hộp thoại dùng chung cho cả Trái Đất và Mặt Trăng, dù tên còn là Earth |
| `src/game/GameCanvas.tsx` | Tạo/hủy Phaser, nạp module, resize, cầu nối callback React–Phaser |
| `src/game/PreviewScene.ts` | Nạp sprite, hoạt ảnh, di chuyển, tương tác ghế, điều kiện kết thúc |
| `src/game/scenery.ts` | Vẽ nền và đạo cụ bằng Phaser Graphics |
| `src/game/types.ts` | Kích thước canvas và kiểu giao tiếp game |
| `src/content/` | Hội thoại, bản dịch, thông tin cảnh và tọa độ crop ảnh |
| `src/state/progress.ts` | Đọc/ghi mốc lưu, kiểm tra phiên bản và xử lý dữ liệu lỗi |
| `src/styles.css` | Toàn bộ giao diện và breakpoint |
| `public/images/` | `branding/`, `portraits/`, `sprites/` |
| `docs/` | Tài liệu kỹ thuật, hình ảnh và review |

React giữ trạng thái câu chuyện; Phaser giữ vị trí, hoạt ảnh và nhận input. Phaser báo về React qua `onAwake`, `onInteract`, `onExit`; React truyền lại chế độ ngủ/thức/thoại/tự do/tạm dừng. Không nên tự tạo một bộ trạng thái câu chuyện thứ hai trong Phaser.

## Lưu tiến trình

Các khóa: `cuoi.language`, `cuoi.sound`, `cuoi.progress`. Tiến trình có dạng `{ version: 1, milestone }`, không lưu vị trí pixel hay từng chữ đang gõ.

| Mốc | Tiếp tục tại |
| --- | --- |
| `earth` | Đầu đoạn thoại An–bà |
| `moon` | Cuội thức dậy |
| `moon-story` | Hai câu dẫn sau khi thức dậy |
| `awake` | Tự do di chuyển, nhiệm vụ quan sát ghế |
| `tree` | Đầu đoạn thoại Cây Đa |
| `lantern` | Đã nhận đèn, đầu đoạn lời lên đường |
| `trail` | Theo dấu chân |
| `complete` | Bảng hoàn thành mở đầu |

Mốc `moon-story` được bổ sung trong lần review này; dữ liệu phiên bản 1 với các mốc cũ vẫn đọc được. Không thể biết một bản lưu `awake` cũ từng bỏ qua lời dẫn hay đã đọc xong, nên vẫn giữ cách hiểu cũ cho mốc đó.
