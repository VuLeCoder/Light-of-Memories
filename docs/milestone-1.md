# Bàn giao Lượt 1

## Kết quả

Đã dựng React–Phaser với hai vùng sách/game và hai cảnh thử. Thư mục tài nguyên gốc được giữ nguyên; đường dẫn, frame và dữ liệu cảnh đặt riêng trong `src/content/`. Không thực hiện các lượt 2–4.

## Kiểm tra đã thực hiện

- `npm run build`: thành công (bao gồm TypeScript); phát hành đủ 9 ảnh và bundle vào `dist/`.
- Kiểm tra ảnh: đọc đúng kích thước/RGBA, xem trực tiếp ba frame đã chọn; không cắt mất nhân vật hoặc phụ kiện.
- Kiểm tra mã vòng đời: component sở hữu instance, có cờ hủy import bất đồng bộ, hủy game/observer/listener khi unmount; callback cũ không cập nhật React.
- `git diff --check`: không báo lỗi.

Build có cảnh báo bundle Phaser khoảng 1.48 MB trước gzip (khoảng 340 KB gzip). Phaser được tải động và tách khỏi bundle giao diện. Ảnh gốc dung lượng lớn, chưa tối ưu hóa ở lượt này.

## Kiểm tra chưa hoàn tất

`npm run test:e2e` bị chặn trước khi chạy bài test vì Vite không mở được `127.0.0.1:5173` (`listen EPERM`). Thử khởi động Chromium cũng bị sandbox từ chối (`shutdown: Operation not permitted`). Vì vậy chưa có bằng chứng chạy thật về bố cục, resize, click và lỗi runtime trên trình duyệt; chưa tuyên bố nghiệm thu toàn bộ Lượt 1.

Máy có cache npm nên đã cài được các dependency ngoại tuyến. Bước kiểm tra binary của script cài esbuild gặp `spawnSync EPERM`; đã cài với `--ignore-scripts` rồi xác nhận binary hoạt động qua build thành công. `package-lock.json` dùng URL registry chuẩn, không phụ thuộc đường dẫn cache của máy này. Máy thông thường dùng `npm ci` như README.

## Checklist khi chạy trên máy người dùng

1. Chạy `npm run dev`, mở địa chỉ Vite in ra.
2. Ở 1280 × 720 và 1440 × 900: sách trái, game phải, tiêu đề/chữ rõ, nhân vật không bị cắt; cuộn dọc được nếu nội dung cao hơn cửa sổ.
3. Chọn Hiên nhà/Mặt Trăng, xác nhận mỗi cảnh chỉ có một canvas.
4. Mở **Kiểm tra bản dựng**, bật checkbox. Click giữa canvas phải báo gần x=480, y=270; đổi kích thước cửa sổ và thử lại.
5. Trong cảnh Mặt Trăng, click ghế phải báo **Ghế đá**, không bị vùng cây che mất.
6. Đổi cảnh liên tục, bật/tắt kiểm tra; xem console không có lỗi runtime và không tăng số canvas.
7. Chạy `npm run test:e2e` sau khi cài browser Playwright để tự động hóa các kiểm tra trên.

Cửa sổ nhỏ hơn 760px có thể cuộn ngang để giữ bố cục sách trái/game phải. Chưa triển khai mobile/touch. Nút chọn cảnh là công cụ xem thử, không bỏ qua hoặc thực thi mốc cốt truyện.
