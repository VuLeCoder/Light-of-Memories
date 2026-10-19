# Bối cảnh gặp Mắt Tròn — hố Surveyor

## Cơ sở tư liệu

Đối chiếu ngày 19/10/2026:

1. [NASA — Lunar Encore Leads to First Precision Extraterrestrial Landing](https://www.nasa.gov/humans-in-space/lunar-encore-leads-to-first-precision-extraterrestrial-landing/): Surveyor 3 nằm trên sườn một hố nông trong vùng Ocean of Storms (Đại Dương Bão); các ảnh Apollo 12 cho thấy nền bụi, đá nhỏ và vành hố thoải.
2. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/): tàu đáp tại Oceanus Procellarum; các phi hành gia Apollo 12 đã lấy máy ảnh, chiếc xẻng và một số bộ phận về nghiên cứu. Phần tàu còn lại là đối tượng Cuội gặp.
3. [NASA APOD — Apollo 12: Surveyor 3 and Intrepid](https://science.nasa.gov/image-article/apod-1999-april-08-apollo-12-surveyor-3-and-intrepid/): mô tả sườn trong hố, đất bụi, chân đế và các bộ phận được thu hồi.
4. [Ảnh NASA/Alan Bean, AS12-48-7133](https://www.nasa.gov/wp-content/uploads/2019/11/apollo_12_eva2_conrad_at_surveyor_3_as12-48-7133hr.jpg): tham khảo trực quan nền đất, độ thoải đường chân trời, thân ba chân và cột tấm pin. Ảnh chụp trong chuyến ghé thăm năm 1969, trước khi tháo các dụng cụ; không phải ảnh mới chụp hiện trạng.

## Cách thể hiện trong game

- Vẽ trực tiếp bằng Phaser tại độ phân giải game **960 × 540**, giữ phong cách minh họa sẵn có.
- Bầu trời tối, vành hố thấp, sườn thoải, nền đất bụi xám, đá và hố nhỏ. Độ cao chân Cuội thay đổi theo đường đi xuống lòng hố rồi lên sườn.
- Mắt Tròn ở phía phải, trên sườn bên trong. Thân tàu có ba chân, hộp thiết bị và cột pin; không vẽ máy ảnh hay đầu xẻng còn gắn trên tàu ở cảnh gặp gỡ.
- T01 vẫn thể hiện máy ảnh và xẻng trong **ký ức lúc tàu còn hoạt động**. Lời thoại nối hai cảnh giải thích việc các dụng cụ đã được mang về Trái Đất.
- Hướng nhìn, tỉ lệ tàu/Cuội, đường đi, vị trí từng viên đá và ánh sáng được bố trí phục vụ trò chơi. Đây là minh họa dựa trên tư liệu, không phải bản tái dựng trắc địa hay ảnh hiện trạng chính xác.
- Không đưa tàu Apollo 12 nguyên vẹn hay phi hành gia vào khung cảnh hiện tại. Cảnh chưa cần kể cuộc ghé thăm T03.

## Điều khiển và hội thoại

- Dùng lại sprite Cuội, tốc độ và hoạt ảnh đi bộ của cảnh cây đa.
- Phím ← → / A D hoặc bấm mặt đất để đi; bấm Mắt Tròn sẽ đi đến gần rồi mở chat. Bấm E khi ở gần cũng mở chat; khi ở xa E không kích hoạt.
- Dùng chung `EarthDialogue`: chân dung, chữ hiện dần, bấm tiếp tục, tạm dừng khi mở menu, chuyển tiếng Việt/Anh.
- Lưu lượt thoại để tải lại tiếp tục đúng đoạn; hoàn tất chat chuyển T01. Bản lưu đang ở T01 hoặc đã hoàn thành vẫn tiếp tục bình thường.
- Nền và tàu tĩnh được cache một lần tại đầy đủ độ phân giải, tái tạo khi WebGL khôi phục. Nhân vật và đèn cập nhật riêng.

Mã chính: `src/game/surveyor-scenery.ts`, `src/content/levels/surveyor-encounter.ts`, `src/game/PreviewScene.ts` và `src/App.tsx`.

## Ảnh cuộc ghé thăm trong T03

`public/assets/surveyor-apollo12.jpg` là ảnh NASA AS12-48-7133, Pete Conrad bên Surveyor 3 trong chuyến Apollo 12 tháng 11/1969. Ảnh giữ nguyên, dùng trong lời kể ký ức; không phải ảnh hiện trạng. Nguồn: https://www.nasa.gov/wp-content/uploads/2019/11/apollo_12_eva2_conrad_at_surveyor_3_as12-48-7133hr.jpg
