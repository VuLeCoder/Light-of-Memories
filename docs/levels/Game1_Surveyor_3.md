# Câu chuyện của Surveyor 3 — Mắt Tròn (màn 1)

> Cập nhật 14/11/2026 theo mã nguồn. Tài liệu mô tả **nội dung đang có trong mã nguồn**, đối chiếu tư liệu NASA/JPL. “Mắt Tròn” là tên nhân vật do trò chơi đặt cho tàu Surveyor 3. Cuội, lời thoại, ký ức biết nói, việc đào ra ảnh và ánh sáng của đèn ông sao là hư cấu; các mốc lịch sử được ghi riêng ở phần dưới.

## 1. Thông tin thật về Surveyor 3

Surveyor 3 là **tàu đổ bộ robot không người lái** của NASA. Tàu phóng ngày **17/4/1967**, đáp xuống vùng **Oceanus Procellarum (Đại Dương Bão)** ngày **20/4/1967 theo giờ UT/UTC** và liên lạc lần cuối ngày **4/5/1967**. Theo hồ sơ nhiệm vụ của NASA Science, đây là tàu Surveyor thứ hai hạ cánh mềm thành công; khi xuống, tàu nảy lên hai lần rồi mới nằm yên. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)

Tàu có **máy ảnh truyền hình** và **dụng cụ lấy mẫu bề mặt dạng tay/xẻng**. Máy ảnh gửi về **6.326 ảnh**; dụng cụ lấy mẫu đào rãnh, thử sức chịu lực của đất và thao tác với vật liệu trên mặt trăng. Những phép thử này giúp các nhà khoa học đánh giá khu vực khảo sát có thể đỡ tàu đổ bộ Apollo; không thể suy rộng thành kết luận rằng mọi nơi trên Mặt Trăng đều giống nhau. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA/JPL — Surveyor 3](https://www.jpl.nasa.gov/missions/surveyor-3/)

Surveyor 3 nằm trên **sườn trong của hố Surveyor**. Tháng **11/1969**, hai phi hành gia Apollo 12 là **Pete (Charles) Conrad và Alan Bean** tới thăm con tàu đã ngừng hoạt động. Họ chụp lại tàu và những rãnh, dấu chân đế còn thấy trên đất; sau đó mang **máy ảnh, đầu xẻng và một số bộ phận khác** về Trái Đất để nghiên cứu tác động của thời gian trên Mặt Trăng. Phần tàu còn lại vẫn ở đó. [NASA — 50 Years Ago: Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA — Apollo 12: The Pinpoint Mission](https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/)

**Lưu ý về ngày:** hồ sơ nhiệm vụ NASA Science ghi ngày đáp **20/4/1967 UT**, còn [một chú thích ảnh NASA](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/) ghi 19/4/1967. Lời kể và chú thích ảnh trong game có chỗ dùng **tháng 4/1967**; trang tổng kết kiến thức hiện ghi **20/4/1967** theo hồ sơ NASA Science. Không coi cách ghi gọn theo tháng là ngày chụp của mọi ảnh. Với chuyến thăm Apollo 12, game dùng **tháng 11/1969**; các nguồn NASA cũng có cách ghi ngày của hoạt động trên Mặt Trăng khác nhau. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)

## 2. Bối cảnh dựng game

Cuội đang tìm chị Hằng. Sau phần mở đầu dưới Cây Đa, Cuội có đèn ông sao, đi theo dấu chân và nhìn thấy lộ trình năm người bạn. Người bạn đầu tiên là **Surveyor 3 — Mắt Tròn**. Cuội tới gần tàu trên Mặt Trăng và trò chuyện: Mắt Tròn chưa gặp chị Hằng, nhưng muốn Cuội giúp nhớ lại ba bức ảnh về chuyến đi của mình. Nội dung này nằm trong [cấu hình màn 1](../../src/content/friends/surveyor/definition.ts), [lời thoại gặp gỡ](../../src/content/friends/surveyor/dialogue.ts) và [luồng game](../../src/App.tsx).

Cảnh gặp gỡ và cảnh kết đều dùng nền **hố Surveyor**: bầu trời đen, nền bụi xám, vành hố thấp, tàu trên sườn trong. Đây là minh họa góc nhìn ngang do game sắp xếp để Cuội đi lại, **không phải bản đồ tọa độ hoặc ảnh hiện trạng**. Hình tàu trong cảnh hiện tại không còn máy ảnh và đầu xẻng vì Apollo 12 đã mang chúng về; hình ở T01 thể hiện **ký ức khi tàu còn đủ dụng cụ**. Cơ sở: [NASA — View of Surveyor III in Its Crater](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/), [NASA — Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/). Cách vẽ nằm trong [surveyor-scenery.ts](../../src/game/scenes/surveyor/scenery.ts).

Mạch truyện của màn 1: **gặp Mắt Tròn → nhận ra hai dụng cụ → nhận “xẻng ký ức” → tìm ba ảnh → sắp ảnh thành nhật ký → nghe Mắt Tròn kể lại → thắp sáng một cánh đèn → thấy điểm sáng xa dẫn về lộ trình**. Điểm sáng gợi người bạn tiếp theo nhưng chưa tiết lộ danh tính. Đèn sáng và dụng cụ ký ức là phép màu của truyện, không phải hoạt động thật của Surveyor 3.

## 3. Nội dung sách đồng hành đang có

Sách đứng cạnh game; số lá hiển thị có thể thay đổi theo kích thước khung. Các mục được chọn bằng ID, không lưu theo số trang. Nội dung đến từ [catalog.ts](../../src/content/book/catalog.ts), [real-world.ts](../../src/content/book/real-world.ts) và [extended.ts](../../src/content/book/extended.ts).

| ID | Thời điểm xuất hiện | Nội dung |
| --- | --- | --- |
| `surveyor` | Mục chương đầu tuyến | Giới thiệu chương và cách dùng sổ tay |
| `surveyor-reality` | Đã gặp Mắt Tròn theo tiến trình | “Surveyor 3 ngoài đời”, ảnh tư liệu, thông tin thật và nguồn |
| `surveyor-b01` | Ghép đủ hai dụng cụ T01 | “Đôi mắt và chiếc xẻng” |
| `clue-arrive`, `clue-work`, `clue-visit` | Ghép đủ hai dụng cụ; mở nội dung gợi ý tuần tự | Ba dấu vết để tìm ảnh |
| `surveyor-photos` | Đã tìm đủ ba ảnh | Album “Ba dấu mốc của Surveyor 3” |
| `surveyor-notebook`, `surveyor-notebook-visit` | `completedOnce` | Hai trang kể sự kiện thật của Surveyor 3 và chuyến ghé thăm Apollo 12 |

Người chơi được đào ảnh không theo thứ tự và không bắt buộc mở sách. Nội dung ba gợi ý được tiếp cận tuần tự: ghi nhớ gợi ý trước hoặc tìm được ảnh tương ứng để tiếp tục. Vị trí đánh dấu, hình phác và việc đào ảnh là thiết kế trò chơi.

Ba mục `photo-arrive`, `photo-work`, `photo-visit` còn trong catalog biên tập nhưng không được đưa riêng vào thứ tự sách trên trình duyệt. Bản trình duyệt dùng album `surveyor-photos`; không coi ba trang riêng hay “Nhật ký hoàn chỉnh” là những mục đang hiển thị.

## 4. Chi tiết## 4. Chi tiết các thử thách

### T01 — Khám phá Mắt Tròn

Người chơi nhìn hình Surveyor 3 **trong ký ức lúc còn hoạt động**, chọn công dụng “Chụp ảnh” hoặc “Khảo sát đất”, rồi bấm đúng vùng **máy ảnh** hoặc **chiếc xẻng khảo sát**. Có thể bấm riêng dụng cụ để nhận gợi ý; ghép sai thì thử lại, phần đã ghép đúng được giữ. Ghép đủ hai công dụng mở B01 và dẫn vào T02. Đây là bài nhận biết thiết bị dựa trên hai dụng cụ thật của tàu. [Triển khai T01](../../src/components/friends/surveyor/SurveyorLevel.tsx), [NASA Science — thiết bị của Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)

### T02 — Đào tìm ba bức ảnh ký ức

Mắt Tròn giải thích **xẻng thật đã được mang về Trái Đất**, rồi tặng Cuội một **xẻng ký ức**. Cuội di chuyển trái/phải và gần/xa bằng WASD, phím mũi tên hoặc chọn điểm trên mặt đất; kích thước nhân vật thay đổi để tạo chiều sâu giả 3D. Bấm **E** để đào ở bất cứ đâu. Nếu chưa gần dấu vết, game báo chưa thấy ảnh. Nếu gần đúng dấu vết, sau hoạt ảnh đào sẽ hiện **ảnh NASA, tên và mô tả**, rồi người chơi tiếp tục tìm ảnh khác. Ảnh được tìm theo **bất kỳ thứ tự nào**. Nút “Gợi ý” mở sách khi cần. [Triển khai đào](../../src/components/friends/surveyor/SurveyorExcavation.tsx), [dữ liệu ba dấu vết](../../src/content/friends/surveyor/challenges/excavation.ts), [cảnh di chuyển](../../src/game/scenes/preview-scene.ts)

| Dấu vết trong game | Ảnh ký ức và điều trẻ học | Cơ sở tư liệu |
| --- | --- | --- |
| **Dấu chân Mắt Tròn** ở vùng gần phía trước | Chân đế Surveyor 3 để lại dấu sau lần đáp xuống **1967**. Ảnh trong game là phần trích từ tư liệu do **Surveyor 3 chụp năm 1967**. | [NASA SP-284 — *Analysis of Surveyor 3 Material and Photographs Returned by Apollo 12*](https://ntrs.nasa.gov/citations/19720019081), [NASA Science — lần đáp](https://science.nasa.gov/mission/surveyor-3/) |
| **Những rãnh đất nhỏ** ở phía phải, xa hơn | Xẻng của Surveyor 3 đã đào rãnh **1967**; ảnh tư liệu **Apollo 12 chụp năm 1969** cho thấy các rãnh vẫn còn. | [NASA SP-284](https://ntrs.nasa.gov/citations/19720019081), [NASA — dấu rãnh còn thấy khi Apollo 12 ghé thăm](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/) |
| **Dấu bước chân** ở phía xa bên trái | Hai phi hành gia Apollo 12 đến Surveyor 3 **tháng 11/1969**; ảnh game là **Pete Conrad bên tàu**, do chuyến Apollo 12 chụp. | [NASA — bài và ảnh Apollo 12](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) |

Ba ảnh game tương ứng với `public/images/memories/surveyor/surveyor-footpad.jpg`, `surveyor-trenches.jpg` và `surveyor-apollo12.jpg`; nguồn tư liệu được đối chiếu trong bảng trên và mục 6 của tài liệu này. **Ảnh nằm dưới đất để Cuội đào lên là cách kể hư cấu**. Những dấu trong game gợi từ chân đế, rãnh xẻng và đường đi của phi hành gia; hình dáng và vị trí chúng được bố trí để dễ chơi, không phải sơ đồ khảo cổ của NASA.

### T03 — Ghép nhật ký Mắt Tròn

Ngay sau ảnh thứ ba, người chơi vào màn **xếp ba ảnh theo thứ tự thời gian**. Các thẻ hiện theo thứ tự trộn, người chơi bấm để đưa vào ba vị trí “Đầu tiên – Tiếp theo – Sau đó”, bấm lại để bỏ chọn, rồi bấm “Ghép trang nhật ký”. Đáp án: **(1) robot đến Mặt Trăng → (2) robot chụp ảnh, khảo sát đất → (3) phi hành gia ghé thăm, mang vài bộ phận về nghiên cứu**. Ghép sai được gợi ý và thử lại. [Triển khai T03](../../src/components/friends/surveyor/SurveyorChallenges.tsx), [thứ tự sự kiện](../../src/content/friends/surveyor/progress.ts), [NASA Science — lịch sử sứ mệnh](https://science.nasa.gov/mission/surveyor-3/)

## 5. Đoạn kết và thông điệp

Sau T03, Cuội và Mắt Tròn nói chuyện ngắn trên nền Mặt Trăng. Màn kể chuyện tóm tắt lần chạm đất, công việc với máy ảnh/xẻng và cuộc ghé thăm, mỗi phần đi cùng một trong ba ảnh. Trở lại cảnh Mặt Trăng, Mắt Tròn **thắp sáng cánh đầu tiên của đèn ông sao**; Cuội thấy điểm sáng ở xa và nghe gợi ý về một người bạn khác. Người chơi có thể **xem lại đoạn kết, chơi lại màn hoặc về lộ trình**; đi tới điểm sáng cũng về lộ trình. [Triển khai đoạn kết](../../src/components/friends/surveyor/SurveyorEnding.tsx), [NASA — cuộc ghé thăm của Apollo 12](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/)

Thông điệp của màn: một robot đi trước đã giúp con người hiểu thêm về Mặt Trăng; những bộ phận được mang về nghiên cứu còn phần tàu vẫn ở nơi nó hạ cánh. Tình bạn giữa Cuội và Mắt Tròn, việc “khôi phục ký ức” và cánh đèn phát sáng là cách trò chơi giúp trẻ nhớ câu chuyện, **không phải sự kiện NASA ghi nhận**.

## 6. Bảng đối chiếu thông tin và nguồn

| Thông tin được dùng | Xuất hiện ở đâu trong game/sách | Nguồn chính |
| --- | --- | --- |
| Surveyor 3 là tàu robot không người lái; đến Mặt Trăng năm 1967 | Lời gặp gỡ, B01, T01, ảnh đầu | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) |
| Vùng đáp là Đại Dương Bão; tàu nằm ở hố Surveyor | Tên và hình nền cảnh gặp/kết | [NASA — View of Surveyor III in Its Crater](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/), [NASA — Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/) |
| Máy ảnh quan sát; xẻng kiểm tra đất và đào rãnh để chuẩn bị cho các tàu đến sau | T01, B01, ảnh rãnh, T03 | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA/JPL — Surveyor 3](https://www.jpl.nasa.gov/missions/surveyor-3/) |
| Chân đế và rãnh đào còn thấy khi Apollo 12 tới | Hai ảnh đầu, gợi ý trong sách, đoạn kể cuối | [NASA — 50 Years Ago: Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA SP-284](https://ntrs.nasa.gov/citations/19720019081) |
| Pete Conrad và Alan Bean ghé thăm tháng 11/1969, mang camera, xẻng và các bộ phận khác về nghiên cứu | Ảnh thứ ba, T03, đoạn kết | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA — Apollo 12: The Pinpoint Mission](https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/) |
| Cuội đào ảnh, nhận xẻng ký ức, trò chuyện với tàu và thắp sáng đèn | Lối chơi và kịch bản màn 1 | **Sáng tác của trò chơi; không có nguồn NASA** |

## Bảo trì và xác nhận hiện tại · 14/11/2026

Tuyến chơi gồm Mắt Tròn → Lấp Lánh → Tai Thính → Bánh Lưới → Gác Trời. Mỗi bạn đóng góp một cánh đèn; bộ lưu chung dùng schema v20 và đọc bản v1–v20. Điều kiện mở chương nằm trong [friends/index.ts](../../src/content/friends/index.ts), điều kiện trang sách trong [reading-order.ts](../../src/content/book/reading-order.ts).

Trang kiến thức dùng tiêu đề, ảnh tư liệu có chú thích khi phù hợp, đoạn văn ngắn và nguồn ở chân trang theo [references.md](../references.md). Trang “Có yếu tố trò chơi” không cần hiện nguồn. Quy định mới nhất nằm trong [AGENTS.md](../../AGENTS.md).

Hai PDF `public/books/Truyen.pdf` và `Truyen_en.pdf` được mở nguyên bản trong tab mới và phải giữ nguyên. Sách đồng hành có điều kiện mở và cách chia trang riêng, không bắt buộc khớp số trang PDF. Xem [cơ chế sách đồng hành và PDF](../README.md#sách-đồng-hành-và-pdf).

Các script `check:*` và fixture đã được gỡ. Còn `npm run typecheck`, `npm run build` và `npm run preview`. Lần cập nhật này đối chiếu mã nguồn và sửa tài liệu, không phải lượt nghiệm thu giao diện hoặc xác minh lại các website nguồn.
