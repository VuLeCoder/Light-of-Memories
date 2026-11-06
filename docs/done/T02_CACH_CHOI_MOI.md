# T02 — So sánh hai ảnh theo vùng

> Cập nhật hồ sơ 06/11/2026: mô tả và kết quả bên dưới thuộc thời điểm bàn giao. Trạng thái hiện tại xem [tổng quan](../project-overview.md). `check:gac-impact` đã bỏ; kiểm tra dữ liệu T02 chuyển vào `check:ending-progress`, còn hồi quy giao diện ở `scripts/check-gac-impact.cjs`.
Thay thao tác đổi ảnh và bấm đốm nhỏ bằng hai ảnh Trước/Sau hiển thị đồng thời, cùng chia ba vùng đánh số. Trên khung nhỏ, ảnh xếp trên–dưới. Người chơi chọn một trong ba nút lớn; rê chuột hoặc focus làm nổi cùng vùng trên cả hai ảnh.

Chọn nhầm có lời gợi ý nhìn vùng 2, không trừ điểm. Chọn đúng chuyển sang ảnh sau khoanh hố mới và bốn lượt thoại hiện có. Chỉ kết thúc thoại mới ghi hoàn thành T02 và mở T03. Giữ ảnh NASA, nội dung khoa học, ID thoại và định dạng lưu hiện tại. Cập nhật lời dẫn và gợi ý trong sách bằng VI/EN.

Kiểm tra: build và diff check đạt; check:ending-progress, check:book, check:gac-impact đạt. Bộ trình duyệt check-gac-impact.cjs đạt 8 trường hợp (khung 320/360/640/860 × VI/EN): hai ảnh, vùng đánh số, thử lại, sách gợi ý, chuột/bàn phím, tải lại từng lượt thoại và chuyển T03. Ảnh kiểm tra lưu tạm tại /tmp/cuoi-t02-redesign. Chưa kiểm thử trực tiếp với trẻ em.
