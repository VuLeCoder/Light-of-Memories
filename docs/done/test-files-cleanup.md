# Dọn kiểm thử và đồng bộ tài liệu — 06/11/2026

## Phạm vi

Xóa `scripts/check-gac-impact.mjs` và lệnh npm `check:gac-impact`. File này kiểm tra tọa độ, vùng đệm ảnh và mục tiêu 44 px của cách bấm đốm nhỏ đã bỏ khi đổi T02 sang chọn vùng 1–2–3.

Giữ các kiểm tra còn giá trị về mở sách T02, phục hồi bản lưu nhất quán và độ dài thoại Việt/Anh trong `scripts/check-ending-progress.mjs`. Giữ `scripts/check-gac-impact.cjs` để kiểm tra giao diện T02 mới. Các bộ trình duyệt khác vẫn có phạm vi riêng: tuyến ba bạn/T01, T03, hậu kết/bản đồ và T04. Không xóa chỉ vì chúng không nằm trong npm scripts.

Không sửa mã chạy trong `src/`, ảnh, CSS hay dữ liệu lưu. Hàm tọa độ cũ trong source chưa được dọn trong phạm vi này. Giữ nguyên các thay đổi M4/T02 đã có và trạng thái staging của chúng.

## Cách kiểm tra hiện tại

```bash
npm run check:book
npm run check:book-flow
npm run check:gac-troi
npm run check:ending-progress
npm run check:gac-light
npm run check:gac-trail
npm run build
```

Sáu bộ dữ liệu đạt; sách có 26 trang/52 khối, luồng sách 18 checkpoint. Build kiểm tra TypeScript và tạo bản phát hành. Các script `.cjs` cần Playwright và Chrome có sẵn cùng Vite chạy ở cổng 4174 hoặc biến `GAME_URL`; đợt dọn này không chạy lại trình duyệt vì không thay mã runtime. Kết quả trình duyệt trước đó nằm trong các báo cáo milestone.

README, tổng quan dự án, tuyến ba bạn và README sách được đồng bộ theo M4, T02 chọn vùng, save v18 và cổng M5/M6. Các báo cáo milestone giữ kết quả lịch sử và có chú thích chỉ sang tài liệu hiện tại.
