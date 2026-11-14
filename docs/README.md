# Tài liệu dự án CUỘI

Tài liệu được gom theo công việc để nhóm dễ tra cứu và bảo trì. [README dự án](../README.md) giữ phần giới thiệu, thành viên, cài đặt và kỷ niệm của nhóm. Đây là README duy nhất ngoài root; không tạo README riêng trong `public/`, `src/` hoặc thư mục con của `docs/`.

Quy định mới nhất trong [AGENTS.md](../AGENTS.md) được ưu tiên, gồm bảo vệ hai PDF và cách trình bày trang kiến thức. Ghi chú lịch sử không thay thế quy định hiện hành.

## Mục lục theo nhóm

### Dự án và thành viên — `project/`

- [Phân công và đóng góp](project/team-contributions.md) — đang chờ nhóm bổ sung.
- [Sử dụng AI](project/ai-usage.md) — các công cụ và vai trò trong nội dung, sách PDF gốc, hình ảnh, mã nguồn và âm thanh.

### Phát triển và bảo trì — `development/`

- [Công nghệ sử dụng](development/technology-stack.md).
- [Cấu trúc mã nguồn và tài liệu](development/folder-structure.md).
- [Quy chuẩn tổ chức nội dung](#quy-chuẩn-tổ-chức-nội-dung).
- [Sách đồng hành và PDF](#sách-đồng-hành-và-pdf).

### Thiết kế và tài nguyên — `design/`

- [Tài nguyên hình ảnh](design/image-assets.md).
- [Phong cách hình ảnh](design/visual-style.md).
- [Âm thanh](design/audio.md).
- [Hướng dẫn thiết kế màn chơi](design/level-design-guide.md).
- [Tài nguyên tĩnh, nguồn gốc và giấy phép](#tài-nguyên-tĩnh).
- [Nguồn tham khảo khoa học](references.md) — giữ ở cấp `docs/` để khớp quy định biên tập.

### Hồ sơ năm màn chơi — `levels/`

- [Mắt Tròn — Surveyor 3](levels/Game1_Surveyor_3.md).
- [Lấp Lánh — Apollo 11](levels/Game2_Apollo_11.md).
- [Tai Thính — Apollo 12](levels/Game3_Apollo_12.md).
- [Bánh Lưới — Apollo 15](levels/Game4_Apollo_15.md).
- [Gác Trời — LRO](levels/Game5_LRO.md).

Các hồ sơ mô tả luồng và dữ liệu đang triển khai; không thay thế nghiệm thu trên thiết bị thật.

[Ghi chú lịch sử sách đồng hành](#ghi-chú-lịch-sử-sách-đồng-hành) nằm cuối tài liệu này.

## Quy chuẩn tổ chức nội dung

Xem [cấu trúc thư mục và quy ước tổ chức dự án](development/folder-structure.md) để tra cứu cây thư mục gốc, mã nguồn, tài nguyên và tài liệu. Các quy tắc đặt tên, phân chia trách nhiệm, tương thích bản lưu và bảng đối chiếu đường dẫn cũ được tập trung tại đó.

## Sách đồng hành và PDF

Các đường dẫn module trong mục này tính từ `src/content/book/`. Tuyến hiện tại có năm bạn; danh sách và điều kiện truy cập nằm trong `src/content/friends/index.ts`.

### Nội dung và xuất bản

- Nội dung sách và gợi ý riêng của từng bạn nằm trong `src/content/friends/<id>/book-copy.ts`, ảnh trong `images.ts`, nội dung thử thách trong `challenges/`. `catalog.ts` tổng hợp dữ liệu; không sao chép nội dung sang component.
- `catalog.ts` ghép danh mục với bài đọc trong `extended.ts`, các trang kết trong `ending.ts` và dữ liệu các bạn được khôi phục trong `restored-friends.ts`.
- Nhãn `kind` phân biệt `fact`, `game`, `fiction`; `publication` phân loại `main` hoặc `appendix` độc lập. Khi không chỉ định vị trí, `fact` mặc định vào phần chính, `game` và `fiction` vào phụ lục; các mục có khai báo riêng giữ nguyên lựa chọn trong dữ liệu.
- `publication.ts` giữ thứ tự biên tập. `getReadingBook(language)` không nhận tiến trình, trả nội dung đầy đủ cùng nguồn đã loại trùng. Quy tắc phần chính/phụ lục của bản đọc không điều khiển mở khóa sách trên trình duyệt và không tạo lại hai PDF gốc.
- Nội dung và chú thích có tiếng Việt và tiếng Anh. Nguồn NASA/JPL/ILRS được giữ trong dữ liệu; trạng thái `recorded` ghi nhận xuất xứ, không tự xác nhận toàn bộ nội dung đã được thẩm định.

### Thứ tự đọc và điều kiện mở

`reading-order.ts` xác định thứ tự sách trên trình duyệt. Các bài kiến thức được chèn cạnh nội dung liên quan bằng `insertRealWorldPages` và `insertExtendedPages`; giữ nguyên điều kiện mở chương và vị trí gợi ý. ID trang được chọn phải ổn định khi người chơi nhận thêm ảnh hoặc mở thêm nội dung.

Mở khóa đoạn kết dựa trên `ending-progress.ts`, stage của `HangFinale` và số thẻ đã hiểu. Các ID đã nhận được giữ trong `bookUnlocks`, bổ sung khi đọc bản lưu cũ và giữ khi chơi lại. Đối chiếu logic cụ thể trong module thay vì dùng các phase kết thúc đã ngừng sử dụng. Cả hai bìa luôn có sẵn; đọc sách không làm thay đổi tiến trình trò chơi.

### Bố cục và phân trang

- Ảnh Tai Thính và Bánh Lưới đi cùng phần kể chuyện ở thân bài; mô tả ảnh dùng cho alt, chú thích hiển thị nguồn, mã ảnh và ngày tháng. Tranh và sơ đồ đứng trước đoạn giải thích liên quan.
- Đoạn ngắn dùng ảnh căn giữa; đoạn dài có thể để ảnh bên trái và chữ chảy cạnh rồi xuống dưới. Mỗi trang con chọn bố cục sau khi ảnh/phông tải xong và khi đổi kích thước.
- Phân trang đo các mảnh đoạn văn cùng ảnh, ưu tiên tách ở ranh giới câu và giữ định dạng, nhãn phân loại. Không để ảnh đứng lẻ, tràn khung, mất hoặc lặp nội dung.
- Trang giới thiệu ngắn dùng `book-prose--intro`, ảnh và chữ căn giữa kể cả trên màn hình nhỏ. Danh sách bạn căn giữa toàn khối, với cột ngôi sao cố định và tên căn trái.
- Trang kiến thức theo mẫu “Surveyor 3 ngoài đời”: tiêu đề, ảnh tư liệu phù hợp có chú thích nếu có, đoạn văn ngắn và nguồn ở chân trang từ [references.md](references.md). Trang “Có yếu tố trò chơi” không cần hiển thị nguồn. Không đổi điều kiện mở hoặc thêm/bớt trang trong một đợt chỉnh tài liệu.
- Theo dõi thay đổi của phần nội dung thu gọn/mở rộng để tính lại phân trang. Bộ chọn mục lục dùng ID trang và điều kiện hiện có; số trang hiển thị phụ thuộc bố cục đo được.

### Mở PDF gốc

`story-pdf.ts` chọn `public/books/Truyen.pdf` (VI) hoặc `public/books/Truyen_en.pdf` (EN) theo ngôn ngữ và base URL của ứng dụng. Nút “Mở sách PDF” / “Open book PDF” mở tab mới với `noopener noreferrer`, không có thuộc tính tải xuống. Thao tác này không sinh PDF, không đọc hoặc sửa tiến trình.

Bộ sinh PDF cũ, bộ xuất sơ đồ, thư viện jsPDF và phông PDF riêng đã được gỡ. `publication.ts`, `pdf-edition.ts` còn giữ dữ liệu biên tập và tiện ích kiểm tra; `getParagraphBlocks` còn được sách web sử dụng. Cách chia trang và mở khóa sách web độc lập với bản thảo PDF cố định. Mã băm và quy định bảo vệ nằm ở [mục PDF được bảo vệ](#pdf-truyện-gốc-được-bảo-vệ).

### Kiểm tra khi sửa sách

Chạy `npm run typecheck` và `npm run build` khi sửa mã nguồn. Kiểm tra trực tiếp tiến trình, đích gợi ý, vị trí trang kiến thức, tải lại, chơi lại, giữ mở khóa và các mốc đoạn kết. Xem cả tiếng Việt/Anh ở kích thước máy tính và điện thoại; việc đọc không được thay đổi bản lưu. Kiểm tra PDF mở tab mới với đúng ngôn ngữ và byte gốc, cả khi triển khai dưới đường dẫn con. Các script kiểm tra chuyên biệt và fixture trình duyệt đã được gỡ ngày 14/11/2026.

## Tài nguyên tĩnh

Xem [cây thư mục public/](development/folder-structure.md#tài-nguyên-public) và [quy ước tổ chức tài nguyên](development/folder-structure.md#quy-ước-tài-nguyên-tĩnh). Các đường dẫn `fonts/`, `images/`, `books/` trong mục này tính từ `public/`; thông tin xuất xứ và giấy phép được giữ bên dưới.

### Phông chữ

Các phông được tải từ Google Fonts ngày 14/11/2026:

- [Lora](https://github.com/google/fonts/tree/main/ofl/lora): độ đậm biến thiên từ 400 đến 700, kiểu đứng và nghiêng, nằm trong `fonts/lora/`.
- [Be Vietnam Pro](https://github.com/google/fonts/tree/main/ofl/bevietnampro): kiểu đứng với độ đậm 400, 500, 600, 700 và kiểu nghiêng 400, nằm trong `fonts/bevietnampro/`.

Các tệp TTF gốc được chuyển sang WOFF2 bằng fontTools, giữ đầy đủ ký tự và hình dạng chữ. Cả hai họ phông hỗ trợ tiếng Việt. Mỗi thư mục phông chứa giấy phép SIL Open Font License gốc trong `OFL.txt`.

Khai báo phông nằm ở `src/styles/fonts.css`. Khi cập nhật, cần giữ đầy đủ bộ ký tự; bản rút gọn chỉ có chữ Latin cơ bản sẽ thiếu nguyên âm và dấu tiếng Việt.

### Minh họa sách đồng hành

Tài nguyên hiện có trong `images/book/` ngày 14/11/2026:

- `front-cover.svg` và `back-cover.svg`: tranh trang trí tự thiết kế cho sách trên trình duyệt, gồm trời đêm, Mặt Trăng và đèn ông sao Việt Nam. Chữ trên bìa được hiển thị riêng theo tiếng Việt hoặc tiếng Anh.
- `reflector-array.svg`: sơ đồ nhìn từ trên xuống minh họa 100 lăng kính của bộ phản xạ Apollo 11, không theo tỉ lệ thực. Được dùng trong `src/content/book/real-world.ts`; nguồn khoa học được ghi trong [danh mục tham khảo](references.md).

Ảnh tư liệu trên các trang đồng hành được dùng lại từ `images/memories/`. Nguồn và thông tin ghi công được giữ trong các mô-đun nội dung tương ứng. Những bản ảnh tư liệu trong `images/book/` không còn được dùng đã được gỡ ngày 14/11/2026.

### Bản đồ chiếu sáng cực nam Mặt Trăng

Tệp `images/memories/gac-troi/south-pole-illumination.png` là bản đồ chiếu sáng tổng hợp từ nhiều thời điểm của NASA LROC, tải ở chiều rộng 1.000 điểm ảnh và giữ định dạng PNG gốc.

Trong phần Gác Trời, ảnh tư liệu này minh họa nội dung về ánh sáng và bóng tối, đồng thời xuất hiện trong hồi tưởng cuối màn. Đây là bản đồ từ nhiều ảnh LROC, không phải một bức ảnh chụp mô hình trò chơi. Mô hình quan sát bóng tối trong trò chơi không tái tạo quy trình xử lý bản đồ khoa học.

- Ghi công: NASA/GSFC/Arizona State University.
- [Trang nguồn của NASA](https://science.nasa.gov/resource/illumination-map-of-the-moons-south-pole/).
- [Ảnh PNG đã tải](https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/l/lunar_south_pole_lroc.png?fit=clip&w=1000).

### PDF truyện gốc được bảo vệ

Hai bản thảo trong `books/` là tài liệu cố định. Không sửa, tạo lại, tối ưu, thay thế, đổi tên hoặc xóa các tệp này:

| Tệp | SHA-256 |
| --- | --- |
| `books/Truyen.pdf` | `856e77f59d739e0f9a6a436576612f13b46575fa5918515c7e5107e8da42cc4e` |
| `books/Truyen_en.pdf` | `045212a3497522d4badcac36b3a4cf065180fc51498073cf9a680124f46c6213` |

Xem quy định đầy đủ trong [AGENTS.md](../AGENTS.md). Nội dung đồng hành được điều chỉnh quanh các bản thảo này.

## Ghi chú lịch sử sách đồng hành

Các ghi chú sau được hợp nhất từ README sách cũ. Số lượng trang, tài nguyên, quy tắc xuất PDF và mô tả các tuyến ít bạn hơn chỉ phản ánh thời điểm ghi nhận; không dùng làm tiêu chí cho bản hiện tại. Tên Apollo 17 dưới đây thuộc nguồn tư liệu lịch sử, không phải tên thiết bị của màn Bánh Lưới — Apollo 15.

### Tư liệu và biên tập ngày 14/11/2026

Bản cũ chèn các trang thực tế song ngữ sau trang kể chuyện/thử thách tương ứng, với kiểu ảnh `above` hoặc `wrap`. `useBookImageLayout` đo lại sau khi tải ảnh/phông và thay đổi kích thước; trang dài chuyển ảnh sang trái để chữ chảy cạnh và dưới ảnh. Hai bài mẫu đá đi liên tiếp: đá, rồi đất cam.

Hồ sơ nguồn ảnh thời điểm đó gồm:

- `images/book/apollo17-route.jpg`: NASA, bản đồ tuyến đi Apollo 17, bài *50 Years Ago: Apollo 17 Lands at Taurus-Littrow*.
- `images/book/nansen-rock.jpg`: NASA AS17-137-20901, cùng bài trên.
- `images/book/orange-soil.jpg`: NASA ARES Lunar Disk 80, ảnh EDDISK 80_Page_4_Image_0001.jpg.
- `images/book/apollo12-seismogram.png`: [NASA Apollo 12 Mission Report](https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf), trang in 3-10, hình 3-8, trang PDF 19; trích xuất giữ nguyên trục, thang thời gian và chú thích. Báo cáo nêu khoảng 50 phút, tư liệu lịch sử ALSEP nêu hơn 55 phút. Đây là dữ liệu thật, khác đồ thị minh họa trong trò chơi.

Các đường dẫn trên là hồ sơ xuất xứ cũ, không phải danh sách tài nguyên còn tồn tại. Ảnh khác dùng lại tư liệu NASA của dự án; tranh nhân vật hư cấu không được trình bày như ảnh thiết bị thật. Một đợt cũ dùng sáu ảnh lưu trữ: bốn ảnh tải mới và hai ảnh tái sử dụng. Các bản không còn dùng đã được gỡ ngày 14/11/2026; xem [tài nguyên hiện có](#minh-họa-sách-đồng-hành).

Đợt biên tập ngày 14/11/2026 bỏ tám trang trùng: dụng cụ Surveyor, đo khoảng cách laser, thiết bị ALSEP, nguồn rung, rung do va chạm, bánh xe, giới hạn đi bộ về và di sản xe. Giải thích được đưa vào trang gốc, gồm ảnh dụng cụ/ALSEP, độ mềm bánh, giới hạn hỗ trợ sự sống, thủy triều và nhiệt. Nguồn NASA về bánh xe và đi bộ về Apollo 17 được giữ cho bản web và danh mục.

Phần mở chương giới thiệu người bạn tưởng tượng rồi dẫn sang thiết bị thật; hướng dẫn sửa kính dẫn đến trang lăng kính, nhiệm vụ lấy mẫu dẫn đến hai trang mẫu. Trang địa chấn ký giải thích ba hướng đo và thang thời gian thay vì lặp định nghĩa cảm biến. Chú thích ảnh giữ ngữ cảnh nhận diện. Bản biên tập khi ấy từng có 44 trang, sau đó tuyến ba bạn có 26 trang; phần hư cấu và hướng dẫn game từng được xếp vào phụ lục của bản đọc.

### Rà soát ngày 14/11/2026

- Giữ 26 ID và điều kiện mở thời điểm đó; bỏ ba khối ảnh lặp, còn 49 khối song ngữ.
- Phân biệt chuyến thăm Apollo 12, nghiên cứu vật liệu mang về và quan sát từ quỹ đạo. Thay ảnh kính phản xạ lặp bằng SVG gốc nhìn từ trên xuống, có nhãn rõ.
- Giải thích cách đo trước, chỉ lộ đáp án số khi được yêu cầu. Các trang pha trộn lúc đó giữ nguồn; quy ước hiển thị nguồn mới nhất tuân theo `AGENTS.md`.
- Giữ kiến thức T02/T03 khi mở gợi ý. T02 hiển thị cả hai ảnh có ngày và đánh số phần ba; phần đáp án chú giải chờ hoàn thành.
- Chân dung Gác Trời và đoạn căn giữa dành cho trang giới thiệu. Mục lục không tự mở khóa hoặc thay đổi bản lưu; mở phần trả lời phải tính lại phân trang.

Bản PDF sinh tự động từng dùng các khung lặp, sau đó chuyển sang bản đọc ưu tiên kiến thức. Những bộ sinh này đã bị gỡ. Mô tả cũ về bìa dùng chung giữa web/PDF, không có chân trang chạy và bìa sau là trang PDF cuối chỉ thuộc bộ sinh cũ.

### Các bản cập nhật ngày 14/11/2026

Ngày 14/11/2026, README cũ ghi 40 mục chuẩn gồm hai bìa và 95 khối song ngữ, trong tuyến mở đầu, Surveyor 3, Apollo 11, LRO và đoạn kết. Bản đó mô tả mỗi chương có hai bài chuyện thật có ảnh, đã bỏ bảy mục mở rộng hư cấu và bỏ chỉ tiêu số từ từng chương. Các số lượng này không đại diện cho tuyến năm bạn hiện nay.

Bìa trước luôn mở đầu khi vào tuyến đọc; lối vào từ chương hoặc gợi ý chọn trang liên quan. Bìa sau có bảng màu đêm riêng và không có khối kể chuyện. Cả hai bìa luôn truy cập được; nội dung mới xuất hiện giữa hai bìa. Các ID mở khóa bìa cũ vẫn tương thích nhưng không giới hạn việc đọc bìa.

Ghi chú ngày 14/11/2026 bổ sung cách đo từng mảnh đoạn văn cùng ảnh và giữ định dạng khi phân trang, áp dụng cho ảnh Tai Thính/Bánh Lưới. Một số ghi chú cũ còn mô tả xuất PDF theo tiến trình; bản hiện tại chỉ mở hai bản thảo cố định trong tab mới, theo [quy định PDF](#mở-pdf-gốc).
