# Chương 2 — Bạn Lấp Lánh

Tài liệu tổng hợp kịch bản, thử thách, hình ảnh và hướng phát triển của màn Lấp Lánh. Cập nhật ngày **22/10/2026**, đối chiếu với nội dung đang có trong game.

**Điểm dừng hiện tại:** nhận bức ảnh thứ hai sau T02 lau bụi. T03 và phần kết chương chưa chốt; chưa trao cánh sao mới.

## Mục lục

1. [Nhân vật và vị trí trong hành trình](#nhân-vật-và-vị-trí-trong-hành-trình)
2. [Kịch bản đang triển khai](#kịch-bản-đang-triển-khai)
3. [Hai thử thách hiện tại](#hai-thử-thách-hiện-tại)
4. [Ảnh kỷ niệm và chơi lại](#ảnh-kỷ-niệm-và-chơi-lại)
5. [Bối cảnh và phong cách hình ảnh](#bối-cảnh-và-phong-cách-hình-ảnh)
6. [Tài nguyên](#tài-nguyên)
7. [Kiến thức và nguồn tham khảo](#kiến-thức-và-nguồn-tham-khảo)
8. [Ý tưởng dành cho phần tiếp theo — chưa chốt](#ý-tưởng-dành-cho-phần-tiếp-theo--chưa-chốt)
9. [Các file triển khai](#các-file-triển-khai)
10. [Phụ lục: prompt chân dung](#phụ-lục-prompt-chân-dung)

## Nhân vật và vị trí trong hành trình

- **Nhân vật:** Bạn Lấp Lánh, lấy cảm hứng từ bảng gương phản xạ laser của Apollo 11, đặt tại Biển Yên Tĩnh năm 1969.
- **Tính cách:** tinh nghịch, thích trò chơi ánh sáng và câu đố; lời chào đặc trưng “Đố bạn đoán được mình là ai!”.
- **Đặc điểm:** thiết bị phản xạ thụ động, không cần pin hay động cơ để phản xạ ánh sáng. Không tự phát tia laser.
- **Cuội:** không cầm đèn ông sao trong đoạn này; không hiển thị bộ đếm sao trên cảnh chơi.
- **Liên kết chương:** Mắt Tròn giữ đoạn kết về lộ trình. Sau khi hoàn thành Mắt Tròn, người chơi chọn Lấp Lánh từ lộ trình.
- **Đánh số:** thanh tiêu đề cảnh ghi Mắt Tròn **03**, Lấp Lánh **04**. Tên chương Lấp Lánh vẫn là **02**; T01/T02 là số thử thách trong chương.

Thông điệp: **Một vật nhỏ và đơn giản vẫn có thể giúp khoa học trong thời gian rất dài khi được thiết kế tốt.**

## Kịch bản đang triển khai

| Chặng | Nội dung | Chuyển tiếp |
| --- | --- | --- |
| Theo ánh sáng xa xăm | Người dẫn chuyện kể Cuội chào Mắt Tròn và mở bản đồ đi đến Biển Yên Tĩnh. | Đến Biển Yên Tĩnh |
| Mở đầu T01 | Cuội nhìn thấy điểm sáng phía bên kia các hố và muốn tìm đến. | Bắt đầu thử thách |
| T01 — Theo điểm sáng | Đi vòng qua sáu hố để đến vầng sáng ở bên phải. | Chạm vùng đích gần rìa phải |
| Đến nơi | Chuyển sang cảnh không có hố, Lấp Lánh bám bụi ở giữa. | Điều khiển Cuội đến gần, nhấn E hoặc bấm vào bạn |
| Gặp Lấp Lánh | Giới thiệu ngắn và tặng ảnh kỷ niệm. | Nhận ảnh thứ nhất |
| Sau ảnh thứ nhất | Cuội hỏi về lớp bụi; Lấp Lánh nhờ lau kính. | Bắt đầu T02 |
| T02 — Cuội lau kính | Lau đủ các ô bụi. | Nhận ảnh thứ hai |
| Điểm dừng tạm thời | Hiển thị ảnh thứ hai và thông tin ảnh. | Về lộ trình hoặc chơi lại đoạn Lấp Lánh |

### Lời dẫn chuyển cảnh

> **Người dẫn chuyện:** Cuội ngoảnh lại chào Mắt Tròn. Qua một gờ đất, điểm sáng khuất đi rồi lại lóe lên khi Cuội đổi góc nhìn.
>
> **Người dẫn chuyện:** Cuội mở bản đồ, tiếp tục chuyến đi đến Biển Yên Tĩnh. Ở đó, một tiếng gọi vang lên giữa những gờ đất: “Đố bạn tìm được mình!”

Đây là chuyển cảnh kể chuyện cho một hành trình dài, không mô tả hai địa điểm nằm sát nhau. Lời dẫn dùng khung chat giống các cảnh trước.

### Mở đầu T01

> **Người dẫn chuyện:** Phía bên kia những hố nhỏ, một điểm sáng đang lấp lánh trên bụi xám.
>
> **Cuội:** Có ai đang chờ mình ở đó nhỉ? Mình sẽ tìm lối đi vòng qua những hố này để đến gần hơn!

### Cuộc gặp đầu tiên

> **Cuội:** Mình tìm thấy bạn rồi! Bạn là điểm sáng phía sau những hố kia à?
>
> **Lấp Lánh:** Đố bạn đoán được mình là ai! Mình là bảng gương phản xạ laser của Apollo 11. Bạn cứ gọi mình là Lấp Lánh nhé!
>
> **Cuội:** Chào Lấp Lánh! Bạn bám bụi nhiều quá.
>
> **Lấp Lánh:** Mình ở đây lâu rồi mà! Tặng bạn một bức ảnh để nhớ cuộc gặp hôm nay nhé.

### Sau khi nhận ảnh thứ nhất

> **Cuội:** Mình cất ảnh rồi nhé! Nhưng sao những ô kính của bạn tối thế?
>
> **Lấp Lánh:** Bụi phủ lên mình mất rồi. Bạn giúp mình lau nhẹ những ô kính nhé?
>
> **Cuội:** Để mình giúp bạn sáng trở lại!

## Hai thử thách hiện tại

### T01 — Theo điểm sáng

- Sáu hố có kích thước khác nhau, thể hiện góc nhìn gần–xa và chừa lối đi vòng.
- Cuội đi bằng WASD, phím mũi tên hoặc chạm mặt đất. Đi lên phía xa thì nhỏ lại, xuống gần thì lớn hơn.
- Không nhảy, không rơi rồi xuất hiện lại, không có dấu chân gợi đường.
- Bố trí hố và giới hạn di chuyển tránh việc đi sát mép dưới để bỏ qua toàn bộ thử thách.
- Chạm hố thì Cuội dừng và nói: **“Hố này sâu quá, mình đi vào là ngã, đau lắm.”**
- Vầng hào quang nằm ở rìa phải. Vùng đích có khoảng đệm để không phải đi sát mép màn hình.
- Hoàn thành sẽ chuyển sang cảnh gặp bạn: bỏ hố, Cuội vào từ bên trái, Lấp Lánh ở giữa và sẫm màu vì bám bụi.
- Giữ focus để điều khiển trong game; người chơi bấm ra ngoài thì có thể chuyển focus ra ngoài.

Tên thử thách nằm trong khung ở đầu cảnh, theo phong cách Mắt Tròn. Hướng dẫn thao tác đặt ở footer, không lặp bằng đoạn chat hướng dẫn riêng.

### T02 — Cuội lau kính

- Panel hai cột: bên trái là bảng gương có lớp bụi, bên phải là tên thử thách, tiến độ và nút nhận ảnh.
- Có **24 ô bụi** cho thao tác chơi; đây không phải số lăng kính của thiết bị thật.
- Lau bằng bấm/kéo chuột, cảm ứng hoặc chọn ô bằng Tab rồi Enter.
- Tiến độ hiển thị theo phần trăm. Lau đủ 24 ô sẽ hiện “Sạch rồi! Bạn Lấp Lánh sáng trở lại.” và mở nút nhận ảnh thứ hai.
- Panel được bố trí để không cần thanh cuộn. Hướng dẫn thao tác chỉ nằm ở footer.
- Ghi chú trong panel: “Lau bụi là hoạt động tưởng tượng trong trò chơi.”

## Ảnh kỷ niệm và chơi lại

| Thời điểm | Tên ảnh trong game | Nội dung |
| --- | --- | --- |
| Sau cuộc gặp đầu tiên | **Lấp Lánh giữa bụi trăng** | Bảng gương trên mặt đất Mặt Trăng, cạnh dấu giày và thiết bị thám hiểm; kỷ niệm lần đầu gặp bạn. |
| Sau T02 | **Những ô gương lấp lánh** | Cận cảnh các ô kính; giới thiệu việc đưa ánh sáng trở về phía nguồn mà không cần pin hay động cơ. |

Màn nhận ảnh dùng phong cách màn nhận ảnh khi đào đất của Mắt Tròn: khung ảnh, tên, mô tả và nút tiếp tục. Hai ảnh có hai trang riêng trong sổ tay.

Hai ảnh là tư liệu minh họa do người dùng cung cấp, **không phải một cặp trước/sau lau bụi**. Chưa gán mã ảnh NASA khi chưa xác định được nguồn của từng ảnh.

- Ảnh thứ nhất: **Cất ảnh và tiếp tục** để sang lời thoại mở đầu T02.
- Ảnh thứ hai: **Cất ảnh và về lộ trình** hoặc **Chơi lại đoạn Lấp Lánh**.
- Chơi lại bắt đầu từ lời dẫn chuyển cảnh và giữ các ảnh đã nhận trong sổ tay.
- Bản lưu cũ ở các chặng sau lau bụi được đưa về màn nhận ảnh thứ hai. Các trường dữ liệu cũ còn được giữ để tương thích bản lưu.

## Bối cảnh và phong cách hình ảnh

Nền Biển Yên Tĩnh được vẽ bằng mã Phaser ở hệ tọa độ **960 × 540**, với trời xanh đen, đất xám nhiều lớp, đá nhỏ và Trái Đất trên bầu trời. Trái Đất theo phong cách cảnh Cuội thức giấc trên Mặt Trăng. Nền được lưu vào RenderTexture và dựng lại khi WebGL khôi phục.

T01 có sáu hố theo phối cảnh. Cảnh gặp bạn bỏ các hố thử thách, đặt Lấp Lánh giữa cảnh tại x=480. Sprite hiển thị 140 × 140, neo giữa cạnh dưới để chân đế tiếp đất.

Khung chat nằm dưới cảnh, dùng màu xanh xám, vàng kem và cách trình bày của Mắt Tròn. Hướng dẫn điều khiển nằm ở footer; phần chat dành cho kể chuyện và phản ứng của nhân vật.

Lấp Lánh có bảng lăng kính nghiêng, khung kem, viền vàng đồng, ô kính xanh sẫm và giá đỡ thấp. Chân dung có chất liệu màu vẽ, sprite dùng nét pixel. Không thêm mắt, miệng hoặc tay chân người; tính cách thể hiện qua lời thoại và điểm phản chiếu. Thiết bị đứng yên, không mô tả động cơ hay khả năng tự bắn tia laser.

Nền và nhân vật là hình ảnh cách điệu phục vụ câu chuyện. Không dùng địa hình làm bản đồ khảo sát Apollo 11 hoặc đếm ô kính trên sprite để suy ra cấu tạo hiện vật thật.

## Tài nguyên

| Tài nguyên | File | Quy cách |
| --- | --- | --- |
| Chân dung Lấp Lánh | [Chân dung](../public/images/portraits/lap-lanh.webp) | WebP lossless RGBA, 1254 × 1254, nền trong suốt |
| Sprite nghỉ | [Sprite idle](../public/images/sprites/lap-lanh-idle.webp) | WebP lossless RGBA, 1254 × 1254, một frame, nền trong suốt |
| Ảnh nhận khi gặp Lấp Lánh | [Thiết bị trên Mặt Trăng](../public/images/memories/lap-lanh/reflector-on-moon.webp) | WebP, giữ nguyên ảnh người dùng cung cấp |
| Ảnh nhận sau khi lau bụi | [Cận cảnh bảng gương](../public/images/memories/lap-lanh/reflector-closeup.webp) | WebP, giữ nguyên ảnh người dùng cung cấp |

Chân dung và sprite được tạo bằng `image_gen`, tham chiếu Mắt Tròn và [phong cách chung](visual-style.md). Sprite hiện có một frame nghỉ, không chia ảnh thành nhiều frame. Hai ảnh kỷ niệm giữ nguyên dữ liệu WebP từ ảnh người dùng cung cấp. Game dùng nền vẽ bằng mã, không cần ảnh nền riêng.

## Kiến thức và nguồn tham khảo

Các nguồn dưới đây được giữ từ tài liệu thiết kế trước để phục vụ biên tập nội dung khoa học.


| Chi tiết | Kết luận dùng trong game | Nguồn |
| --- | --- | --- |
| Apollo 11 đặt gương tại Biển Yên Tĩnh năm 1969 | Đúng. Bộ gương là một thí nghiệm được phi hành gia đặt trên bề mặt. | [NASA — Apollo 11 Mission Overview](https://www.nasa.gov/history/apollo-11-mission-overview/), [ILRS/NASA — Apollo 11 Reflector](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html) |
| Hình dạng và cách hoạt động | Bảng Apollo 11 có 100 lăng kính phản xạ góc; ánh sáng trở về gần hướng đã tới. Không dùng điện để phản xạ. | [NASA/JPL — Apollo Experiment That Keeps on Giving](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [ILRS/NASA — Reflector Information](https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html) |
| Dùng gương để đo khoảng cách | Đài quan sát phát xung laser và đo thời gian ánh sáng quay lại; thí nghiệm này vẫn mang lại dữ liệu khoa học sau hơn 50 năm. | [NASA/JPL — Apollo Experiment That Keeps on Giving](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [ILRS/NASA — Apollo 11](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html) |
| Mặt Trăng xa dần | Dữ liệu đo laser cho tốc độ trung bình khoảng 3,8 cm/năm. | [NASA — Laser Beams Reflected Between Earth and Moon Boost Science](https://www.nasa.gov/missions/lro/laser-beams-reflected-between-earth-and-moon-boost-science/) |
| “Mỗi đêm có người bắn tia sáng” | Cách nói quá chắc; thay bằng **“khi các đài quan sát gửi tia laser”**. | Suy luận biên tập từ mô tả quy trình đo trong [NASA/JPL](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/). |
| “Tia đi về mất 2,5 giây” | Dùng như **ví dụ làm tròn**, không coi là hằng số. Với tốc độ làm tròn 300.000 km/s, suy ra 375.000 km cho một chiều. | Phép tính từ định nghĩa tốc độ; [NASA/JPL](https://www.jpl.nasa.gov/news/apollo-11-experiment-continues-to-return-valuable-data/) nêu khoảng cách trung bình xấp xỉ 385.000 km. |

## Ý tưởng dành cho phần tiếp theo — chưa chốt

Phần này lưu các hướng đã trao đổi để thiết kế tiếp. **Không phải luồng đang chạy, chưa chốt số lượng thử thách hoặc số ảnh cuối cùng.**

| Hướng đề xuất | Cách chơi dự kiến | Nội dung/ảnh có thể khai thác |
| --- | --- | --- |
| Phản xạ và đo khoảng cách | Xoay các gương phụ để đưa tia đến đích, rồi dùng thời gian đi–về để suy ra khoảng cách. | Nguyên lý đo laser; ảnh đài quan sát. |
| Tìm ảnh dưới hố | Di chuyển đèn trên mặt phẳng và xoay hướng chiếu để tìm ba ảnh ẩn dưới các hố. | Khám phá ánh sáng và thu thập ký ức. |
| Trò chơi 2,5 giây | Tra gợi ý trong sách, canh nhịp gửi/nhận tín hiệu. | Ảnh đài quan sát Apache Point hoặc cơ sở đo laser khác có nguồn rõ ràng. |
| Mở đường bằng ánh sáng | Dẫn tia sáng tới cơ quan ở xa; kết nối kiến thức Mặt Trăng xa dần với chương kế tiếp. | Ảnh khu vực Apollo 11 do LRO chụp; liên kết Bạn Gác Trời và Bạn Tai Thính. |

Bản ý tưởng trước từng đề xuất bốn mảnh ký ức: thiết bị trên Mặt Trăng, khoảnh khắc triển khai, tia laser từ Trái Đất và bãi đáp nhìn từ LRO. Các mã `AS11-40-5952`, `AS11-40-5948`, `AS11-40-5949` chỉ là ứng viên cần đối chiếu, chưa gán cho hai ảnh hiện có.

Khi viết tiếp cần giữ các giới hạn sau:

- 2,5 giây là ví dụ làm tròn. Với 300.000 km/giây, khoảng cách một chiều là `300.000 × 2,5 ÷ 2 = 375.000 km`; không gán phép tính này thành 384.400 km.
- Dùng “khi các đài quan sát gửi tia laser”, tránh khẳng định “mỗi đêm” hoặc coi mọi đài quan sát đều thuộc NASA.
- Hình LRO có thể minh họa vị trí thiết bị; riêng ảnh không chứng minh thiết bị vẫn hoạt động.
- Xoay gương hoặc mở cổng là cơ chế hư cấu. Không mô tả bảng Apollo 11 tự xoay bằng động cơ hoặc tự phát sáng.
- T03 tìm ảnh dưới hố và đề xuất trò chơi 2,5 giây là các hướng khác nhau; cần chọn hoặc sắp xếp lại trước khi triển khai.

## Các file triển khai

| File | Vai trò |
| --- | --- |
| `src/components/SparkleLevel.tsx` | Hội thoại, nhận ảnh, chuyển chặng và chơi lại. |
| `src/components/SparkleCleaning.tsx` | Panel T02 và thao tác lau 24 ô bụi. |
| `src/content/levels/lap-lanh.ts` | Nội dung song ngữ, ảnh, tiến trình và đọc bản lưu cũ. |
| `src/game/sparkle-scenery.ts` | Nền Biển Yên Tĩnh vẽ bằng mã. |
| `src/game/PreviewScene.ts` | Hiển thị nhân vật, di chuyển, phối cảnh và tương tác trong cảnh. |
| `src/game/GameCanvas.tsx` | Kết nối React–Phaser và focus điều khiển. |
| `src/App.tsx` | Ghép màn chơi, trạng thái và hướng dẫn footer. |
| `src/components/JourneyMap.tsx` | Lộ trình và các trang ảnh trong sổ tay. |
| `src/styles.css` | Khung chat, panel lau bụi và màn nhận ảnh. |

Luồng trạng thái hiện tại:

```text
route → search-intro → search → arrival → meeting
      → dust-photo → cleaning-intro → cleaning → clean-photo
```

Tài liệu đối chiếu phong cách: [Mắt Tròn](Game1_Surveyor_3.md), [phong cách hình ảnh](visual-style.md), [danh mục tài nguyên](assets-inventory.md).

## Phụ lục: prompt chân dung

Prompt gốc được giữ để tham khảo khi dựng thêm tài nguyên. Yêu cầu 10 × 10 trong prompt không bảo đảm ảnh sinh có chính xác 100 ô; dùng nguồn khoa học cho thông tin cấu tạo.

Tham chiếu phong cách: `public/images/portraits/mat-tron.webp`.

```text
Use case: illustration-story. Create a standalone transparent full-object character portrait for Ban Lap Lanh, Apollo 11 lunar laser retroreflector, for Vietnamese children's storybook game. Match the reference Surveyor portrait's warm watercolor/gouache paper texture, ink outlines, aged cream enamel, muted brass gold edges, dark teal accents. Reference image is style only, do NOT copy the robot anatomy. Subject: a compact square panel of 100 small circular glass corner-cube prisms arranged exactly 10 rows by 10 columns, cream metal border, tilted upward on a very low triangular bracket with two short supporting feet, three-quarter front view. Silvery teal prisms with tiny cream reflected highlights; a single small playful sparkle on one prism. Passive scientific instrument, no head, no arms, no eyes or mouth, no wheels, no solar panels, no power cables, no emitted laser. Personality conveyed by inviting angle and playful reflected glint. Entire object fully visible with generous transparent margins. No ground, no background, no text watermark or UI. Square canvas. Keep squat broad silhouette, scientific instrument recognizable, handcrafted storybook look.
```
