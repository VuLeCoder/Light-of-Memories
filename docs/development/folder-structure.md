# Cấu trúc thư mục và quy ước tổ chức dự án

Tài liệu tập trung sơ đồ thư mục, vai trò các nhóm mã nguồn và quy tắc đặt file của CUỘI. Các cây chi tiết bên dưới phản ánh file hiện có; thư viện cài đặt, kết quả build và dữ liệu nội bộ Git không được liệt kê từng file.

[← Danh mục tài liệu](../README.md) · [Công nghệ sử dụng](technology-stack.md) · [Quy định dự án](../../AGENTS.md)

## Tra cứu nhanh

| Cần tìm | Xem tại |
| --- | --- |
| Điểm khởi chạy, cấu hình và API | [Tổng quan thư mục gốc](#tổng-quan-thư-mục-gốc) |
| Giao diện, nội dung và cảnh game | [Cây mã nguồn](#mã-nguồn-src) |
| PDF, ảnh, âm thanh và phông | [Cây tài nguyên](#tài-nguyên-public) |
| Tài liệu chuyên đề | [Cây tài liệu](#tài-liệu-docs) |
| Đặt tên, phân trách nhiệm và đường dẫn cũ | [Quy chuẩn tổ chức nội dung](#quy-chuẩn-tổ-chức-nội-dung) |
| URL tài nguyên và cách di chuyển file | [Quy ước tài nguyên tĩnh](#quy-ước-tài-nguyên-tĩnh) |

## Tổng quan thư mục gốc

```text
Game-2/
├── api/
│   └── visitors.js           # API bộ đếm người truy cập
├── docs/                     # Tài liệu dự án và nguồn tham khảo
├── public/                   # Tài nguyên tĩnh được phục vụ trực tiếp
├── src/                      # Mã nguồn React, Phaser và nội dung
├── .gitignore                # Loại trừ thư viện, build và file sinh tự động
├── AGENTS.md                 # Quy định bảo vệ PDF và biên tập trang đồng hành
├── README.md                 # Giới thiệu, thành viên, cài đặt và kỷ niệm nhóm
├── index.html                # Trang HTML đầu vào của Vite
├── package.json              # Thư viện và lệnh npm
├── package-lock.json         # Khóa phiên bản cho npm ci
├── tsconfig.json             # Cấu hình TypeScript
└── vite.config.ts            # Cấu hình Vite và plugin React
```

| Thư mục / file phụ trợ | Vai trò |
| --- | --- |
| `node_modules/` | Thư viện do `npm ci` cài đặt; không sửa trực tiếp, không đưa vào Git. |
| `dist/` | Kết quả `npm run build`; được tạo lại từ mã nguồn và tài nguyên. |
| `*.tsbuildinfo` | Bộ nhớ đệm TypeScript sinh khi build; đã được bỏ qua trong Git. |
| `.git/` | Lịch sử và dữ liệu quản lý phiên bản. |
| `.agents/`, `.codex/`, `.aws/` | Thư mục phụ trợ của môi trường làm việc hiện tại; không thuộc mã ứng dụng. |

`api/visitors.js` phục vụ bộ đếm trên môi trường hỗ trợ Vercel Function và Upstash Redis. Xem [cấu hình dịch vụ](technology-stack.md#dịch-vụ-cho-bộ-đếm-người-truy-cập). Hướng dẫn cài đặt và chạy nằm trong [README dự án](../../README.md#cài-đặt-và-chạy).

## Mã nguồn `src/`

```text
src/
├── audio/                                                        # Nhạc nền, hiệu ứng và cài đặt âm thanh
│   ├── game-audio.ts
│   ├── music-score.ts
│   ├── settings.ts
│   └── useGameAudio.ts
├── components/                                                   # Giao diện React và CSS theo nhóm
│   ├── book/                                                     # Hiển thị và phân trang sách
│   │   ├── BookContentLabel.tsx
│   │   ├── BookNavigation.tsx
│   │   ├── BookParagraph.tsx
│   │   ├── BookTopline.tsx
│   │   └── useBookImageLayout.ts
│   ├── ending/                                                   # Đoạn kết và giới thiệu nhóm
│   │   ├── HangFinale.tsx
│   │   ├── ProjectCredits.tsx
│   │   ├── finale-scene.css
│   │   └── hang-finale.css
│   ├── friends/
│   │   ├── ban-banh-luoi/                                        # Bánh Lưới — Apollo 15
│   │   │   ├── BanhLuoiCameraDiagram.tsx
│   │   │   ├── BanhLuoiEnding.tsx
│   │   │   ├── BanhLuoiGuide.tsx
│   │   │   ├── BanhLuoiLevel.tsx
│   │   │   ├── BanhLuoiPhoto.tsx
│   │   │   ├── BanhLuoiRoute.tsx
│   │   │   ├── BanhLuoiRouteMap.tsx
│   │   │   ├── BanhLuoiWheels.tsx
│   │   │   └── banh-luoi.css
│   │   ├── gac-troi/                                             # Gác Trời — LRO
│   │   │   ├── GacCompanion.tsx
│   │   │   ├── GacImpactPhoto.tsx
│   │   │   ├── GacLightMap.tsx
│   │   │   ├── GacRestLight.tsx
│   │   │   ├── GacTroiEnding.tsx
│   │   │   ├── GacTroiImage.tsx
│   │   │   ├── GacTroiImpact.tsx
│   │   │   ├── GacTroiLevel.tsx
│   │   │   ├── GacTroiMatching.tsx
│   │   │   ├── GacTroiTrail.tsx
│   │   │   ├── gac-trail.css
│   │   │   └── gac-troi.css
│   │   ├── lap-lanh/                                             # Lấp Lánh — Apollo 11
│   │   │   ├── SparkleBookClue.tsx
│   │   │   ├── SparkleCleaning.tsx
│   │   │   ├── SparkleEnding.tsx
│   │   │   ├── SparkleLevel.tsx
│   │   │   └── SparkleScience.tsx
│   │   ├── surveyor/                                             # Mắt Tròn — Surveyor 3
│   │   │   ├── SurveyorChallenges.tsx
│   │   │   ├── SurveyorEnding.tsx
│   │   │   ├── SurveyorExcavation.tsx
│   │   │   └── SurveyorLevel.tsx
│   │   └── tai-thinh/                                            # Tai Thính — Apollo 12
│   │       ├── TaiThinhChallenges.tsx
│   │       ├── TaiThinhEnding.tsx
│   │       ├── TaiThinhLevel.tsx
│   │       ├── TaiThinhPhoto.tsx
│   │       ├── TaiThinhRhythms.tsx
│   │       ├── TaiThinhTremors.tsx
│   │       └── tai-thinh.css
│   ├── journey/                                                  # Bản đồ hành trình
│   │   └── JourneyMap.tsx
│   ├── shared/                                                   # Thành phần dùng chung giữa các cảnh
│   │   ├── EarthDialogue.tsx
│   │   ├── EndingTrail.tsx
│   │   └── LanternGiftPause.tsx
│   └── shell/                                                    # Menu và bộ đếm người truy cập
│       ├── GameMenu.tsx
│       └── VisitorCounter.tsx
├── content/                                                      # Nội dung song ngữ, dữ liệu và quy tắc tiến trình
│   ├── book/                                                     # Danh mục, bài đọc, thứ tự đọc và liên kết PDF
│   │   ├── back-cover.ts
│   │   ├── catalog.ts
│   │   ├── ending-progress.ts
│   │   ├── ending.ts
│   │   ├── extended.ts
│   │   ├── front-cover.ts
│   │   ├── intro-copy.ts
│   │   ├── journey-copy.ts
│   │   ├── pdf-edition.ts
│   │   ├── publication.ts
│   │   ├── reading-order.ts
│   │   ├── real-world.ts
│   │   ├── restored-friends.ts
│   │   ├── sparkle-pages.ts
│   │   ├── story-pdf.ts
│   │   └── types.ts
│   ├── friends/
│   │   ├── ban-banh-luoi/                                        # Bánh Lưới — Apollo 15
│   │   │   ├── challenges/
│   │   │   │   ├── guide-copy.ts
│   │   │   │   ├── guide.ts
│   │   │   │   ├── models.ts
│   │   │   │   └── route.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── gac-troi/                                             # Gác Trời — LRO
│   │   │   ├── challenges/
│   │   │   │   ├── impact.ts
│   │   │   │   ├── light.ts
│   │   │   │   ├── matching.ts
│   │   │   │   └── shadow-watch.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── flow.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── lap-lanh/                                             # Lấp Lánh — Apollo 11
│   │   │   ├── challenges/
│   │   │   │   ├── cleaning.ts
│   │   │   │   └── science.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── surveyor/                                             # Mắt Tròn — Surveyor 3
│   │   │   ├── challenges/
│   │   │   │   ├── excavation.ts
│   │   │   │   └── journal.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── tai-thinh/                                            # Tai Thính — Apollo 12
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   └── progress.ts
│   │   ├── index.ts                                              # Đăng ký màn, thứ tự và điều kiện truy cập
│   │   └── types.ts                                              # Kiểu dữ liệu màn chơi
│   ├── levels/
│   ├── story/                                                    # Mở đầu, kết thúc và hội thoại chung
│   │   ├── ending/
│   │   │   ├── challenges/
│   │   │   │   ├── cards.ts
│   │   │   │   └── trail.ts
│   │   │   ├── credits.ts
│   │   │   ├── dialogue.ts
│   │   │   └── friend-dialogue.ts
│   │   ├── opening/
│   │   │   ├── dialogue.ts
│   │   │   ├── earth-dialogue.ts
│   │   │   ├── moon-dialogue.ts
│   │   │   └── scenes.ts
│   │   ├── dialogue.ts
│   │   ├── remembrance.ts
│   │   └── types.ts
│   ├── assets.ts                                                 # Khai báo sprite, chân dung và nhận diện
│   ├── i18n.ts                                                   # Ngôn ngữ và nhãn giao diện chung
│   ├── play-instructions.ts
│   └── scene-copy.ts
├── export/
├── focus/                                                        # Quản lý focus khi chơi
│   └── game-focus.ts
├── game/                                                         # Cầu nối React/Phaser và các cảnh
│   ├── scenes/
│   │   ├── ban-banh-luoi/                                        # Bánh Lưới — Apollo 15
│   │   │   ├── guide.ts
│   │   │   ├── rock.ts
│   │   │   ├── scenery.ts
│   │   │   └── soil.ts
│   │   ├── ending/
│   │   │   ├── backdrop.tsx
│   │   │   └── scenery.ts
│   │   ├── gac-troi/                                             # Gác Trời — LRO
│   │   │   └── scenery.ts
│   │   ├── lap-lanh/                                             # Lấp Lánh — Apollo 11
│   │   │   ├── optics.ts
│   │   │   └── scenery.ts
│   │   ├── opening/
│   │   │   └── scenery.ts
│   │   ├── surveyor/                                             # Mắt Tròn — Surveyor 3
│   │   │   └── scenery.ts
│   │   ├── tai-thinh/                                            # Tai Thính — Apollo 12
│   │   │   ├── layout.ts
│   │   │   └── scenery.ts
│   │   ├── journey-marker.ts
│   │   └── preview-scene.ts                                      # Vòng đời và điều phối cảnh Phaser
│   ├── GameCanvas.tsx
│   └── types.ts
├── hooks/                                                        # Hook dùng ở cấp ứng dụng
│   └── useWorkspaceFit.ts
├── state/                                                        # Đọc, chuyển đổi và lưu tiến trình
│   └── progress.ts
├── styles/                                                       # Phông chữ và CSS dùng chung
│   ├── fonts.css
│   ├── scene-layout.css
│   └── styles.css
├── App.tsx                                                       # Điều phối ứng dụng, màn chơi và sách
└── main.tsx                                                      # Khởi chạy React và nạp CSS
```

### Phân chia trách nhiệm

| Nhóm | Trách nhiệm |
| --- | --- |
| `components/` | Hiển thị giao diện, thao tác người dùng và trạng thái tạm. CSS riêng nằm cùng nhóm sở hữu. |
| `content/` | Hội thoại, bài đọc, gợi ý, phản hồi kiến thức, dữ liệu thử thách và quy tắc tiến trình từng màn. |
| `game/` | Vẽ cảnh, chuyển động và tương tác bằng Phaser; kết nối với React qua `GameCanvas.tsx`. |
| `state/` | Lưu và đọc hành trình; giữ tương thích với bản lưu cũ. |
| `audio/`, `focus/`, `hooks/` | Âm thanh, focus và hành vi dùng chung của ứng dụng. |
| `styles/` | CSS toàn cục; `main.tsx` nạp lần lượt `fonts.css`, `styles.css`, `scene-layout.css`. |

Hook chỉ phục vụ sách nằm trong `components/book/`; hook cấp ứng dụng nằm trong `hooks/`. Component giữ PascalCase và tên export hiện hữu, gồm các tên `Sparkle*`. Import trực tiếp module cần dùng bằng đường dẫn tương đối; không thêm alias hoặc barrel export khi chỉ sắp xếp thư mục.

## Tài nguyên `public/`

```text
public/
├── audio/
│   └── music/                                                    # Bản nhạc thu âm
│       └── five-points-of-light.mp3
├── books/                                                        # Hai PDF gốc được bảo vệ
│   ├── Truyen.pdf
│   └── Truyen_en.pdf
├── fonts/                                                        # Phông WOFF2 và giấy phép OFL
│   ├── bevietnampro/
│   │   ├── BeVietnamPro-Bold.woff2
│   │   ├── BeVietnamPro-Italic.woff2
│   │   ├── BeVietnamPro-Medium.woff2
│   │   ├── BeVietnamPro-Regular.woff2
│   │   ├── BeVietnamPro-SemiBold.woff2
│   │   └── OFL.txt
│   ├── lora/
│   │   ├── Lora-Italic-Variable.woff2
│   │   ├── Lora-Variable.woff2
│   │   └── OFL.txt
│   └── pdf/
└── images/
    ├── backgrounds/
    ├── book/                                                     # Bìa và sơ đồ sách
    │   ├── back-cover.svg
    │   ├── front-cover.svg
    │   └── reflector-array.svg
    ├── branding/                                                 # Nhận diện nhóm
    │   └── light-of-memories-primary.webp
    ├── memories/                                                 # Ảnh tư liệu theo nhân vật
    │   ├── ban-banh-luoi/                                        # Bánh Lưới — Apollo 15
    │   │   ├── apollo-15-orbit-detail.webp
    │   │   ├── apollo-15-orbit-m175252641lr.webp
    │   │   ├── apollo-15-scott-7022567.webp
    │   │   └── apollo-15-wheel-detail.webp
    │   ├── gac-troi/                                             # Gác Trời — LRO
    │   │   ├── apollo11-lro-annotated.webp
    │   │   ├── apollo11-lro.webp
    │   │   ├── apollo12-surveyor3-lro-annotated.webp
    │   │   ├── apollo12-surveyor3-lro.webp
    │   │   ├── conrad-surveyor3-as12-48-7134.webp
    │   │   ├── impact2013-after.webp
    │   │   ├── impact2013-before.webp
    │   │   └── south-pole-illumination.png
    │   ├── lap-lanh/                                             # Lấp Lánh — Apollo 11
    │   │   ├── nasa/
    │   │   ├── apollo-11-deployed-as11-40-5952.webp
    │   │   └── apollo-11-placement-as11-40-5945.webp
    │   ├── surveyor/                                             # Mắt Tròn — Surveyor 3
    │   │   ├── surveyor-apollo12.jpg
    │   │   ├── surveyor-footpad.jpg
    │   │   └── surveyor-trenches.jpg
    │   └── tai-thinh/                                            # Tai Thính — Apollo 12
    │       ├── alsep-passive-seismic.jpg
    │       ├── apollo-12-as12-47-6916.webp
    │       ├── apollo-12-as12-47-6918.webp
    │       └── apollo-12-as12-47-6921.webp
    ├── portraits/                                                # Chân dung hội thoại
    │   ├── an.webp
    │   ├── ba.webp
    │   ├── ban-banh-luoi.webp
    │   ├── cay-da.webp
    │   ├── chi-hang.webp
    │   ├── cuoi.webp
    │   ├── gac-troi.webp
    │   ├── lap-lanh.webp
    │   ├── mat-tron.webp
    │   └── tai-thinh.webp
    └── sprites/                                                  # Sprite và sprite sheet
        ├── an-spritesheet.webp
        ├── ba-spritesheet.webp
        ├── chi-hang-seated-idle.png
        ├── cuoi-spritesheet.webp
        └── lap-lanh-idle.webp
```

Hai PDF trong `public/books/` được bảo vệ tuyệt đối: không sửa, tạo lại, tối ưu, thay thế, đổi tên hoặc xóa. Quy định và mã băm chuẩn nằm trong [AGENTS.md](../../AGENTS.md); cơ chế mở sách nằm trong [hướng dẫn sách đồng hành](../README.md#sách-đồng-hành-và-pdf).

## Tài liệu `docs/`

```text
docs/
├── design/                                                       # Hình ảnh, âm thanh và thiết kế màn chơi
│   ├── audio.md
│   ├── image-assets.md
│   ├── level-design-guide.md
│   └── visual-style.md
├── development/                                                  # Cấu trúc, công nghệ và bảo trì
│   ├── folder-structure.md
│   └── technology-stack.md
├── levels/                                                       # Hồ sơ năm màn chơi
│   ├── Game1_Surveyor_3.md
│   ├── Game2_Apollo_11.md
│   ├── Game3_Apollo_12.md
│   ├── Game4_Apollo_15.md
│   └── Game5_LRO.md
├── project/                                                      # Thành viên và sử dụng AI
│   ├── ai-usage.md
│   └── team-contributions.md
├── README.md                                                     # Mục lục và hướng dẫn biên tập
└── references.md                                                 # Nguồn tham khảo khoa học
```

`README.md` ở root giới thiệu dự án và hướng dẫn chạy; `docs/README.md` là đầu mối tra cứu tài liệu. Duy trì một README trong `docs/`, không tạo README riêng trong các thư mục con, `public/` hoặc `src/`. Nguồn khoa học giữ tại `docs/references.md` để khớp quy định biên tập.

## Quy chuẩn tổ chức nội dung

Các đường dẫn như `friends/`, `story/`, `book/` trong mục này tính từ `src/content/`, trừ khi ghi rõ thư mục khác.

Nội dung vẫn là module TypeScript, có cả tiếng Việt và tiếng Anh. Các quy chuẩn dưới đây áp dụng khi duy trì nội dung; việc sắp xếp tài liệu không thay câu chữ trong game, thứ tự nội dung, điều kiện mở khóa hoặc định dạng lưu tiến trình.

### Đặt tên và phân trách nhiệm

- Thư mục người bạn dùng **ID màn hiện có**: `surveyor`, `lap-lanh`, `tai-thinh`, `ban-banh-luoi`, `gac-troi`; không trộn `sparkle`, `apollo11`, `mat-tron` làm tên thư mục mới. `tai-thinh` và `ban-banh-luoi` giữ nguyên ID lịch sử.
- File nội dung và mã cảnh dùng `kebab-case`; trong thư mục đã có ID thì dùng tên vai trò (`dialogue.ts`, `scenery.ts`), không lặp tên nhân vật vào file.
- File thử thách dùng tên nhiệm vụ: `excavation.ts`, `journal.ts`, `matching.ts`, `impact.ts`, `light.ts`, `shadow-watch.ts`, `cleaning.ts`, `science.ts`. `light.ts` giữ phần thoại/mô hình các nhánh cũ; `shadow-watch.ts` chứa lời hướng dẫn/phản hồi của mô hình vùng tối hiện tại. Nội dung cũ được giữ nguyên, không gộp hai mô hình.
- Kiểu dữ liệu/hàm tiến trình ở `progress.ts`; luồng cập nhật ở `flow.ts` nếu đã tách riêng. React gọi các module này; Phaser tiếp tục xử lý hình vẽ, chuyển động và tương tác.
- Hội thoại, hồi tưởng, gợi ý và phản hồi kiến thức đặt trong `content/`. Component giữ giao diện, trạng thái tạm và nhãn thao tác ngắn; bản dịch giao diện chung ở `i18n.ts`.
- Import trực tiếp module có trách nhiệm tương ứng. `friends/index.ts` chỉ đăng ký màn; không gom mọi module vào một barrel export gây vòng phụ thuộc.
- Giữ nguyên tên export hiện có khi chỉ di chuyển module để giảm thay đổi ngoài phạm vi. Component React tiếp tục dùng PascalCase theo quy ước sẵn có.

### Nội dung sách và hình ảnh

`book/catalog.ts` tổng hợp nội dung sách từ các bạn và các bài đọc trong `book/`. Bản web dùng `book/reading-order.ts`; PDF mở trực tiếp bản có sẵn qua `book/story-pdf.ts`. Các module `book/publication.ts` và `book/pdf-edition.ts` giữ dữ liệu biên tập và kiểm tra nội dung. Không chép lại bài đọc vào module game hay dùng thứ tự PDF để điều khiển mở khóa trên web.

Ảnh thật nằm trong `public/images/memories/<id>/`; ảnh Mắt Tròn dùng ID `surveyor` như thư mục nội dung. Khi di chuyển ảnh, cập nhật URL tại nơi khai báo, giữ nguyên file ảnh, nguồn, credit và ID ảnh. `friends/<id>/images.ts` và `challenges/` chỉ tham chiếu tài nguyên tương ứng. Sprite/chân dung chung tiếp tục khai báo trong `assets.ts`. Xem [quy ước tài nguyên](#quy-ước-tài-nguyên-tĩnh).

### Tương thích bản lưu

ID màn, ID câu thoại, ID trang sách, ID ảnh, phase, thứ tự thử thách, khóa `localStorage` và schema v20 đều giữ nguyên. ID lịch sử có tên `sparkle-*` hoặc tên nhân vật khác không đổi theo tên thư mục. Không đổi ID để làm đẹp tên; bản lưu và liên kết gợi ý đang dùng các giá trị này.

Các đường dẫn mã nguồn cũ đã được cập nhật ở nơi sử dụng; không để module trung gian ở `content/levels/` hoặc các file `*-scenery.ts` cũ.

### Tra cứu đường dẫn cũ

Đường dẫn trong bảng tính từ `src/content/`; riêng hàng cuối tính từ `src/`. Đây là bảng đối chiếu lịch sử, không phải danh sách file cần tạo lại.

| Trước refactor | Hiện tại |
| --- | --- |
| `levels/index.ts`, `levels/types.ts` | `friends/index.ts`, `friends/types.ts` |
| `levels/surveyor.ts`, `levels/gac-troi.ts` | `friends/<id>/definition.ts` |
| `levels/lap-lanh.ts` | `friends/lap-lanh/{definition,dialogue,progress,images}.ts` |
| `levels/surveyor-encounter.ts` | `friends/surveyor/dialogue.ts` |
| `levels/surveyor-dig.ts` | `friends/surveyor/challenges/excavation.ts`, `friends/surveyor/images.ts` |
| `levels/surveyor-challenges.ts` | `friends/surveyor/challenges/journal.ts` |
| `levels/gac-troi-content.ts` | `friends/gac-troi/dialogue.ts`, `friends/gac-troi/book-copy.ts` |
| `levels/gac-troi-{matching,impact,light}.ts` | `friends/gac-troi/challenges/{matching,impact,light}.ts` |
| `levels/<id>-progress.ts`, `levels/gac-troi-flow.ts` | `friends/<id>/progress.ts`, `friends/gac-troi/flow.ts` |
| `book/surveyor-copy.ts`, `book/sparkle-copy.ts` | `friends/{surveyor,lap-lanh}/book-copy.ts` |
| `earth-dialogue.ts`, `moon-dialogue.ts` | `story/opening/`, với kiểu/reducer chung trong `story/` |
| `i18n.ts` (`storyLines`) | `story/opening/dialogue.ts` |
| `levels/ending-{chat,cards}.ts`, `levels/gac-troi-trail.ts` | `story/ending/` và `story/ending/challenges/` |
| `project-credits.ts` | `story/ending/credits.ts` |
| `game/PreviewScene.ts`, `game/*-scenery.ts` | `game/scenes/preview-scene.ts`, `game/scenes/<id>/scenery.ts` |

Chạy `npm run typecheck` và `npm run build`. Các script kiểm tra riêng và fixture đã được gỡ ngày 14/11/2026; nghiệm thu trực tiếp nội dung, mở khóa, bản lưu và liên kết PDF trên trình duyệt.

Nút “Mở sách PDF” mở tab mới tới `public/books/Truyen.pdf` (VI) hoặc `Truyen_en.pdf` (EN), giữ nguyên byte nguồn. Bộ sinh PDF đã được gỡ. Quy tắc biên tập xem `AGENTS.md`; cơ chế mở bản thảo xem [PDF và sách đồng hành](../README.md#sách-đồng-hành-và-pdf).

Tuyến hiện tại có đủ năm bạn; danh sách và điều kiện truy cập nằm trong `friends/index.ts`. Nguồn khoa học tập trung tại [docs/references.md](../references.md).

## Quy ước tài nguyên tĩnh

Các đường dẫn `fonts/`, `images/`, `books/` trong mục này tính từ `public/`.

Vite sao chép nguyên cấu trúc trong `public/` sang thư mục build. Đặt file theo loại và vai trò; không dùng thư mục chung `assets/` cho tài nguyên chưa phân nhóm.

- ID thư mục từng bạn khớp `src/content/friends/` và `src/components/friends/`.
- Tài nguyên mới dùng tên chữ thường không dấu, phân tách bằng dấu gạch nối; giữ tên font/PDF và file hiện hữu để tránh đổi không cần thiết.
- Ảnh chung khai báo tại `src/content/assets.ts`; ảnh tư liệu từng bạn tại `src/content/friends/<id>/images.ts`. Các khai báo hiện hữu ở module thử thách hoặc sách giữ nguyên nơi sở hữu.
- URL trong TypeScript dùng `import.meta.env.BASE_URL` để hỗ trợ triển khai dưới đường dẫn con. Font CSS do Vite xử lý qua `src/styles/fonts.css`.
- Giữ nguyên ảnh, âm thanh, font, PDF và giấy phép khi sắp xếp thư mục. Không nén lại hoặc đổi định dạng trong một đợt chỉ refactor.
- Dùng lại ảnh đã có bằng URL, không tạo bản sao giữa `book/` và `memories/`. Giữ hồ sơ nguồn/credit cạnh nhóm ảnh hoặc trong dữ liệu nội dung hiện hữu.
- Khi di chuyển tài nguyên, cập nhật mọi tham chiếu đang dùng và tài liệu hiện hành, kiểm tra build và tải tài nguyên ở cả URL gốc lẫn đường dẫn con.

## Kiểm tra khi thay đổi cấu trúc

Sau khi di chuyển mã nguồn hoặc tài nguyên, chạy `npm run typecheck` và `npm run build`. Kiểm tra trực tiếp nội dung, điều kiện mở khóa, bản lưu, liên kết PDF và tải tài nguyên trên trình duyệt. Các script kiểm tra riêng và fixture đã được gỡ; không dùng thư mục kết quả kiểm tra cũ làm căn cứ cho phiên bản hiện tại.

Khi thêm hoặc di chuyển thư mục, cập nhật cây tương ứng trong tài liệu này và các liên kết đang sử dụng. Hướng dẫn chuyên đề về biên tập sách, xuất xứ tài nguyên và giấy phép nằm tại [README tài liệu](../README.md).
