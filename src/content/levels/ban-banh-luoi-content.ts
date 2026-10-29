import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';

// Canonical Vietnamese/English copy for the complete fourth chapter.
// Sources and handover: docs/done/Game4_Apollo_17.md.
const text = (vi: string, en: string) => ({ vi, en });
type LocalizedText = ReturnType<typeof text>;
export type BanBanhLuoiSpeaker = StoryLine['speaker'];
type AuthoredLine = LocalizedText & { id: string; speaker: BanBanhLuoiSpeaker };

export const banBanhLuoiIdentity = {
  levelId: "ban-banh-luoi",
  friendNumber: "04",
  websiteScene: "06",
  speakerId: "banhLuoi",
  englishName: "Mesh Wheels"
} as const;

export const banBanhLuoiCopy = {
  "identity.name": text("Bánh Lưới", "Mesh Wheels"),
  "identity.book": text("Apollo 17 — Bánh Lưới", "Apollo 17 — Mesh Wheels"),
  "identity.subtitle": text("Đi thật xa, nhớ đường về", "Explore far, remember the way home"),
  "identity.location": text("Taurus–Littrow · Apollo 17", "Taurus–Littrow · Apollo 17"),
  "identity.scene": text("06 · Bạn Bánh Lưới", "06 · Mesh Wheels"),
  "identity.friend": text("04 · Bánh Lưới", "04 · Mesh Wheels"),
  "identity.invitation": text("Lần theo dấu bánh xe", "Follow the rover tracks"),
  "identity.canvasAlt": text("Cuội cạnh xe Apollo 17 đỗ yên giữa thung lũng Taurus–Littrow.", "Cuội beside the parked Apollo 17 rover in the Taurus–Littrow valley."),
  "identity.portraitAlt": text("Xe Bánh Lưới với bánh lưới kim loại, hai ghế và ăng-ten hình chảo.", "Mesh Wheels with wire-mesh wheels, two seats and a dish antenna."),
  "identity.mystery": text("Người bạn bí ẩn", "A mystery friend"),
  "objective.route": text("Theo ánh đèn tới thung lũng xa", "Follow the lantern to a distant valley"),
  "objective.approach": text("Đến gần chiếc xe", "Approach the rover"),
  "objective.meeting": text("Lắng nghe Bánh Lưới", "Listen to Mesh Wheels"),
  "objective.wheels": text("T01 · Thử bánh xe", "T01 · Try the wheels"),
  "objective.photoA": text("Một bức ảnh ở nơi đỗ cuối", "A photo at the final parking spot"),
  "objective.routeIntro": text("Nhớ về một chuyến khảo sát", "Remember an exploring trip"),
  "objective.routePuzzle": text("T02 · Ghé A, B rồi về tàu", "T02 · Visit A and B, then return"),
  "objective.cameraIntro": text("Chuẩn bị góc nhìn cuối cùng", "Prepare the final view"),
  "objective.camera": text("T03 · Chọn chỗ đỗ và góc camera", "T03 · Choose a parking spot and camera angle"),
  "objective.launch": text("Hồi tưởng 1972 · Minh họa 2D", "Remembering 1972 · 2D illustration"),
  "objective.photoB": text("Những dấu vết nhìn từ trên cao", "Tracks seen from above"),
  "objective.memoriesIntro": text("Hai bức ảnh, một câu chuyện", "Two photos, one story"),
  "objective.recallA": text("1/2 · Nơi đỗ cuối, năm 1972", "1/2 · The final parking spot, 1972"),
  "objective.recallB": text("2/2 · Dấu vết còn lại, năm 2011", "2/2 · Lasting tracks, 2011"),
  "objective.farewell": text("Mang theo câu chuyện của bạn", "Carry a friend’s story"),
  "objective.gift": text("Một ánh sao từ Bánh Lưới", "A star point from Mesh Wheels"),
  "objective.finished": text("Ngước nhìn phía trời bên phải", "Look up at the sky on the right"),
  "footer.dialogue": text("Space/Enter hoặc nút trong khung thoại để hiện hết câu và tiếp tục.", "Use Space/Enter or the dialogue button to reveal the full line and continue."),
  "footer.walk": text("A/D, ←/→ hoặc chạm đất để đi. Đến gần xe nhấn E, hoặc chạm xe.", "Use A/D, ←/→ or touch the ground to walk. Press E near the rover, or touch it."),
  "footer.wheels": text("Chọn → Thử bánh → Chọn bánh này. Dùng chuột/chạm hoặc Tab và Enter/Space.", "Select → Try wheel → Choose this wheel. Use mouse/touch or Tab and Enter/Space."),
  "footer.route": text("Chọn ô kề để thêm bước. Mũi tên chọn ô, Enter/Space thêm; dùng nút để lùi hoặc vẽ lại.", "Choose a neighbouring cell to add a step. Arrow keys select a cell; Enter/Space adds it. Use the buttons to undo or reset."),
  "footer.camera": text("Chọn A/B/C rồi chỉnh góc bằng thanh trượt hoặc nút −/+. Bấm Thử góc nhìn.", "Choose A/B/C, then adjust the angle with the slider or −/+ buttons. Select Try this view."),
  "footer.photo": text("Cất ảnh để thêm vào sách và tiếp tục. Có thể mở ảnh lớn để xem chi tiết.", "Keep the photo to add it to the book and continue. Open a larger view to inspect it."),
  "footer.recall": text("Dùng Trang trước/Trang tiếp để đọc theo thời gian.", "Use Previous page/Next page to read in time order."),
  "footer.launch": text("Xem minh họa rồi tiếp tục. Menu tạm dừng; giảm chuyển động dùng hình tĩnh.", "Watch the illustration, then continue. Menu pauses it; reduced motion uses a still image."),
  "footer.gift": text("Ánh sáng đang tới chiếc đèn. Menu có thể tạm dừng.", "The light is reaching the lantern. Menu can pause it."),
  "footer.finished": text("Đi lại hoặc trò chuyện với xe. Tới vệt sáng mặt đất bên phải để về lộ trình.", "Walk or talk to the rover. Reach the ground glow on the right to return to the route."),
  "button.confirm": text("Chọn bánh này", "Choose this wheel"),
  "button.tryWheel": text("Thử bánh", "Try wheel"),
  "button.hint": text("Gợi ý", "Hint"),
  "button.hintMore": text("Xem thêm gợi ý", "Show another hint"),
  "button.undo": text("Lùi một bước", "Undo one step"),
  "button.reset": text("Vẽ lại", "Reset route"),
  "button.routeSubmit": text("Thử lộ trình", "Try this route"),
  "button.cameraSubmit": text("Thử góc nhìn", "Try this view"),
  "button.keep": text("Cất ảnh và tiếp tục", "Keep the photo and continue"),
  "button.zoom": text("Xem ảnh lớn", "View larger photo"),
  "button.wheelDetail": text("Xem chi tiết bánh", "Inspect the wheel"),
  "button.closeZoom": text("Đóng ảnh lớn", "Close larger photo"),
  "button.retry": text("Thử tải lại ảnh", "Retry photo"),
  "button.source": text("Nguồn ảnh", "Photo source"),
  "button.next": text("Tiếp theo", "Next"),
  "button.previousPage": text("Trang trước", "Previous page"),
  "button.nextPage": text("Trang tiếp", "Next page"),
  "button.back": text("Về lộ trình", "Back to the route"),
  "button.replayEnding": text("Xem lại đoạn kết", "Replay the ending"),
  "button.replay": text("Chơi lại", "Play again"),
  "button.talk": text("Trò chuyện với Bánh Lưới", "Talk to Mesh Wheels"),
  "button.lookUp": text("Ngước nhìn", "Look up"),
  "button.decreaseAngle": text("Hạ góc camera một độ", "Lower the camera by one degree"),
  "button.increaseAngle": text("Nâng góc camera một độ", "Raise the camera by one degree"),
  "wheels.rubber": text("A · Lốp cao su bơm hơi", "A · Air-filled rubber tyre"),
  "wheels.mesh": text("B · Bánh lưới kim loại", "B · Wire-mesh wheel"),
  "wheels.stone": text("C · Bánh kim loại cứng", "C · Rigid metal wheel"),
  "wheels.title": text("Giúp bánh xe sẵn sàng", "Get the wheels ready"),
  "wheels.instruction": text("Thử bánh rồi tìm chiếc có ô lưới và gân chữ V nhé.", "Try a wheel, then find the mesh with V-shaped treads."),
  "wheels.options": text("Ba lựa chọn bánh xe", "Three wheel choices"),
  "wheels.rubberShort": text("Cao su", "Rubber"),
  "wheels.meshShort": text("Lưới", "Mesh"),
  "wheels.stoneShort": text("Cứng", "Rigid"),
  "wheels.trialModel": text("Minh họa vượt đá", "Illustrated rock crossing"),
  "wheels.flatExample": text("Nếu bị thủng…", "If punctured…"),
  "wheels.closeup": text("Cận cảnh bề mặt", "Surface close-up"),
  "wheels.ready": text("Chọn một bánh, rồi bấm Thử bánh để quan sát.", "Choose a wheel, then press Try wheel to observe it."),
  "wheels.untried": text("Mình thử bánh vừa chọn trước nhé!", "Let us try this wheel first!"),
  "wheels.rubberTrial": text("Êm nhờ hơi. Nếu thủng, khí thoát ra và lốp có thể xẹp.", "Air cushions bumps. If punctured, air escapes and the tyre can go flat."),
  "wheels.meshTrial": text("Lưới uốn theo đá; vật sắc có thể đứt sợi.", "Mesh flexes over rocks; sharp edges can break wires."),
  "wheels.stoneTrial": text("Giữ hình dạng; xóc hơn khi vượt đá.", "Keeps its shape; bumps more over rocks."),
  "wheels.rubberDetail": text("Minh họa nếu bị thủng: khí thoát ra, vỏ lốp xẹp sát đất nhưng vành vẫn tròn.", "Conditional puncture example: air escapes and the tyre collapses against the ground while the rim stays round."),
  "wheels.meshDetail": text("Nhiều sợi kim loại đan thành lưới; các dải gân xếp hình chữ V.", "Metal wires form a mesh, with V-shaped tread strips."),
  "wheels.stoneDetail": text("Vành kim loại cứng, không uốn ôm viên đá.", "A rigid metal rim that does not flex around the rock."),
  "wheels.empty": text("Bạn chọn một bánh để mình cùng quan sát nhé.", "Choose a wheel so we can look at it together."),
  "wheels.wrongRubber": text("Mặt lốp này kín. Bánh của mình có ô lưới; bạn thử bánh khác nhé.", "This tyre is closed. My wheels have mesh openings; try another wheel."),
  "wheels.wrongStone": text("Bánh cứng không có sợi đan. Bạn thử tìm bánh có ô lưới nhé.", "The rigid wheel has no woven wires. Try the wheel with mesh openings."),
  "wheels.correct": text("Đúng rồi! Lưới kim loại có thể hơi uốn, còn các dải gân giúp bánh bám đất.", "That is right! The metal mesh can flex a little, and the tread strips help it grip the ground."),
  "wheels.hint1": text("Những đường nhỏ trên bánh là ô lưới hay mặt lốp kín nhỉ?", "Are those little lines mesh openings or a closed tyre?"),
  "wheels.hint2": text("Nhìn ảnh phóng to: các sợi kim loại đan nhau, bên ngoài có những gân hình chữ V.", "Look at the close-up: metal wires cross each other, with V-shaped treads on the outside."),
  "route.hud": text("T02 · Cùng vạch đường đi", "T02 · Plan our trip"),
  "route.title": text("Đi xa, nhớ đường về", "Explore and find the way home"),
  "route.shortRule": text("Ghé A, B → LM · Pin ≤12 · Đi bộ về ≤4 bước.", "A, B → LM · Battery ≤12 · Walk home ≤4 steps."),
  "route.visited": text("Trạm đã ghé và mục tiêu tiếp theo", "Visited stops and next goal"),
  "route.nextStops": text("Còn ghé {stops}", "Still to visit: {stops}"),
  "route.return": text("Trở về LM nhé", "Back to LM next"),
  "route.ready": text("Thử lộ trình nhé", "Check our trip"),
  "route.review": text("Xem lại giới hạn", "Check limits"),
  "route.undoShort": text("Lùi", "Undo"),
  "route.resetShort": text("Vẽ lại", "Reset"),
  "route.messages": text("Lời nhắc về lộ trình", "Route feedback"),
  "route.rule": text("Vạch đường cho Cuội và Bánh Lưới: ghé A, B rồi về LM. Tối đa 12 pin; mỗi ô cách tàu không quá 4 bước đi bộ.", "Plan a trip for Cuội and Mesh Wheels: visit A, B, then LM. At most 12 battery units; every cell within 4 walking steps of home."),
  "route.model": text("Bản đồ mô phỏng · Không theo tỉ lệ địa hình thật", "Model map · Not to the scale of real terrain"),
  "route.lm": text("LM · Tàu đổ bộ", "LM · Lunar module"),
  "route.stationA": text("A · Trạm lấy mẫu đá", "A · Rock sample stop"),
  "route.stationB": text("B · Trạm lấy mẫu đất", "B · Soil sample stop"),
  "route.flat": text("Đất bằng · 1 pin", "Flat ground · 1 battery unit"),
  "route.slope": text("Dốc · 2 pin", "Slope · 2 battery units"),
  "route.crater": text("Hố · Không đi qua", "Crater · Blocked"),
  "route.safe": text("Trong giới hạn đi bộ", "Within walking range"),
  "route.unsafe": text("Ngoài giới hạn đi bộ", "Beyond walking range"),
  "route.battery": text("Pin đã dùng: {used}/12", "Battery used: {used}/12"),
  "route.walk": text("Đi bộ về từ ô này: {steps}/4 bước", "Walk home from here: {steps}/4 steps"),
  "route.cell": text("Cột {x}, hàng {y}: {terrain}. {state}", "Column {x}, row {y}: {terrain}. {state}"),
  "route.step": text("Bước {index}: cột {x}, hàng {y}", "Step {index}: column {x}, row {y}"),
  "route.empty": text("Mình đang ở LM. Chọn một ô kề để bắt đầu nhé.", "We are at LM. Choose a neighbouring cell to begin."),
  "route.notAdjacent": text("Ô này chưa kề bước cuối. Mình đi từng ô chung cạnh nhé.", "This cell is not next to the last step. Follow cells that share a side."),
  "route.blocked": text("Ở đây có hố. Mình chọn một ô kề khác nhé.", "There is a crater here. Choose another neighbouring cell."),
  "route.missing": text("Mình còn chưa ghé {stops}. Thử nối thêm đường nhé.", "We still need to visit {stops}. Try adding to the route."),
  "route.notHome": text("Đã ghé đủ trạm rồi. Mình còn cần về ô LM nữa.", "We have visited both stops. We still need to return to LM."),
  "route.overBattery": text("Đường này dùng {used} pin, nhiều hơn 12. Thử bớt một đoạn vòng nhé.", "This route uses {used} battery units, more than 12. Try removing a detour."),
  "route.overWalk": text("Ở bước {index}, đường đi bộ về LM dài {steps} bước. Mình tìm đường gần tàu hơn nhé.", "At step {index}, the walk back to LM is {steps} steps. Let us stay closer to the module."),
  "route.correct": text("Ghé đủ hai trạm rồi về nhà! Xe đủ pin, và mọi chặng đều có đường đi bộ trong giới hạn.", "Both stops visited and safely home! The rover has enough battery, and every step stays within walking range."),
  "route.hint1": text("A và B ở hai phía của hố. Thử vòng qua mép hố hoặc quay lại ngã rẽ gần tàu. Có thể ghé trạm nào trước cũng được; nhớ nhìn pin và đường về nhé.", "A and B lie on opposite sides of the crater. Go around its rim or return to the junction near the module. Visit either stop first; watch the battery and the walk home."),
  "route.hint2": text("Vùng có viền chấm gồm những ô đi bộ về LM trong 4 bước. Đi vào dốc tốn 2 pin; ô khác tốn 1.", "Cells with dotted borders are within 4 walking steps of LM. Entering a slope costs 2 battery units; other cells cost 1."),
  "route.firstViolation": text("Bước đầu cần xem lại: bước {index}, cột {x}, hàng {y}. Xem lý do cạnh hai chỉ báo nhé.", "First step to review: step {index}, column {x}, row {y}. Check the reason beside the two indicators."),
  "route.noViolation": text("Các bước đã vẽ vẫn trong hai giới hạn. Nhớ ghé cả A, B và trở về LM nhé.", "Your steps are within both limits. Remember to visit A and B and return to LM."),
  "route.resetStatus": text("Đã xóa đường nháp. Xe trở lại LM; pin đã dùng là 0.", "Draft route cleared. The rover is back at LM with 0 battery units used."),
  "route.undoStatus": text("Đã lùi một bước. Hai chỉ báo đã được tính lại.", "One step undone. Both indicators have been recalculated."),
  "camera.rule": text("Giữ tầng bay lên và vùng trời có viền chấm trong khung, không bị đá che.", "Keep the ascent stage and dotted sky region in the frame, without a rock blocking the view."),
  "camera.model": text("Mô hình góc nhìn · Không phải thông số camera Apollo", "View model · Not Apollo camera specifications"),
  "camera.parking": text("Chỗ đỗ {spot}", "Parking spot {spot}"),
  "camera.angle": text("Góc camera: {angle}°", "Camera angle: {angle}°"),
  "camera.frame": text("Khung camera hiện tại", "Current camera frame"),
  "camera.required": text("Vùng cần nhìn thấy", "Region to keep in view"),
  "camera.rock": text("Đá che tầm nhìn", "Rock blocking the view"),
  "camera.none": text("Chọn một chỗ đỗ để xem khung camera nhé.", "Choose a parking spot to see the camera frame."),
  "camera.blocked": text("Tảng đá nằm giữa camera và tàu. Đổi chỗ đỗ để nhìn thoáng hơn nhé.", "The rock is between the camera and the module. Try a spot with a clear view."),
  "camera.tooClose": text("Chỗ này gần quá: khung không chứa đủ tàu và khoảng trời phía trên. Thử lùi xa hơn nhé.", "This spot is too close: the frame cannot hold both the stage and the sky above it. Try farther away."),
  "camera.low": text("Chỗ đỗ đã thoáng rồi. Thử nâng góc để thấy cả vùng trời có viền chấm nhé.", "The parking spot has a clear view. Try raising the camera to include the dotted sky region."),
  "camera.high": text("Camera đang nhìn cao quá, mất phần dưới của vùng cần nhìn. Thử hạ góc một chút nhé.", "The camera is looking too high and misses the bottom of the required region. Try lowering it a little."),
  "camera.correct": text("Góc nhìn đã đủ rồi! Mình cùng nhớ lại lúc Challenger rời Mặt Trăng nhé.", "The view is ready! Let us remember Challenger leaving the Moon."),
  "camera.hint1": text("Đừng chỉ nhìn gần: xem cả khoảng trời phía trên chiếc tàu nữa.", "Do not just look nearby: include the sky above the module, too."),
  "camera.hint2": text("Tìm chỗ không bị đá chắn và đủ xa để vùng có viền chấm nằm trọn trong khung. Sau đó chỉnh góc.", "Find a clear spot far enough away to fit the dotted region in the frame. Then adjust the angle."),
  "photoA.title": text("Bánh Lưới ở nơi đỗ cuối", "Mesh Wheels at the final parking spot"),
  "photoA.caption": text("Eugene Cernan chụp xe Apollo 17 tại VIP Site, tháng 12/1972. Các gân hình chữ V hiện rõ trên bánh.", "Eugene Cernan photographed the Apollo 17 rover at the VIP Site in December 1972. V-shaped treads show clearly on its wheels."),
  "photoA.alt": text("Ảnh đen trắng xe Apollo 17 có bánh lưới với gân chữ V; tàu đổ bộ và núi ở phía sau.", "Black-and-white photo of the Apollo 17 rover with V-shaped mesh-wheel treads; the lunar module and mountains are behind it."),
  "photoA.credit": text("NASA / Eugene Cernan · AS17-143-21933 · Apollo Lunar Surface Journal", "NASA / Eugene Cernan · AS17-143-21933 · Apollo Lunar Surface Journal"),
  "photoA.zoomAlt": text("Chi tiết bánh gần giữa ảnh AS17-143-21933, thấy ô lưới và gân chữ V.", "Detail of the wheel near the centre of AS17-143-21933, showing mesh and V-shaped treads."),
  "photoB.title": text("Dấu vết nhìn từ quỹ đạo", "Tracks seen from orbit"),
  "photoB.caption": text("Ảnh LROC tháng 8/2011 cho thấy tầng dưới Challenger, vị trí xe và những đường đi. Bản có nhãn được NASA đăng ngày 8/9/2011.", "An August 2011 LROC image shows Challenger’s descent stage, the rover’s position and trails. NASA published this labelled version on 8 September 2011."),
  "photoB.alt": text("Ảnh nhìn từ trên cao của bãi đáp Apollo 17; nhãn và mũi tên chỉ tầng dưới Challenger, xe LRV và khu thí nghiệm ALSEP.", "Overhead view of the Apollo 17 landing site, with labels and arrows marking Challenger’s descent stage, the LRV and the ALSEP experiments."),
  "photoB.credit": text("NASA / GSFC / Arizona State University / LRO · LROC NAC M168000580LR", "NASA / GSFC / Arizona State University / LRO · LROC NAC M168000580LR"),
  "photoB.detailCaption": text("Xe là dấu nhỏ cạnh bóng đổ.", "Rover beside its shadow."),
  "photoB.zoomAlt": text("Vùng phóng vị trí xe ở bên phải ảnh quỹ đạo; xe là một dấu nhỏ cạnh bóng đổ.", "Enlarged rover location at the right of the orbital image; the rover is a small mark beside its shadow."),
  "photoB.lmCallout": text("Tầng dưới Challenger", "Challenger’s descent stage"),
  "photoB.roverCallout": text("Vị trí xe Bánh Lưới", "Mesh Wheels’ location"),
  "photoB.tracksCallout": text("Những đường đi còn thấy trong ảnh", "Trails still visible in the image"),
  "photo.error": text("Ảnh chưa tải được. Bạn có thể thử lại hoặc cất để đọc chú thích và tiếp tục.", "The photo could not load. You can retry, or keep it to read the caption and continue."),
  "photo.kept": text("Ảnh đã được cất trong sách.", "The photo is now in the book."),
  "photo.alreadyKept": text("Ảnh này đã có trong sách. Mình đọc tiếp nhé.", "This photo is already in the book. Let us continue."),
  "recallA.title": text("1972 · Một chỗ đứng để nhìn theo", "1972 · A place to watch from"),
  "recallA.body": text("Trong tháng 12/1972, Cernan chụp chiếc xe tại nơi đỗ cuối. Trước khi các nhà du hành rời Mặt Trăng, camera trên xe truyền hình ảnh Challenger cất cánh; người điều khiển ở Trái Đất chỉnh camera nhìn theo.", "In December 1972, Cernan photographed the rover at its final parking spot. Before the astronauts left the Moon, its camera sent back pictures of Challenger lifting off; an operator on Earth aimed the camera to follow it."),
  "recallB.title": text("2011 · Những con đường còn đó", "2011 · The trails remain"),
  "recallB.body": text("Nhiều năm sau, camera từ quỹ đạo ghi lại bãi đáp Apollo 17. Chiếc xe chỉ là một dấu nhỏ, nhưng vị trí của bạn và những đường đi vẫn còn thấy trong ảnh.", "Years later, a camera in lunar orbit recorded the Apollo 17 site. The rover is only a tiny mark, but its position and the trails can still be seen in the image."),
  "status.completed": text("Cánh sao thứ tư đã sáng · 4/5", "The fourth star point is shining · 4/5"),
  "status.interact": text("E · Trò chuyện với Bánh Lưới", "E · Talk to Mesh Wheels"),
  "status.exit": text("Theo vệt sáng → Về lộ trình", "Follow the glow → Back to the route"),
  "status.zoom": text("Ảnh lớn · Có thể đóng để trở lại", "Larger photo · Close to return"),
  "status.storage": text("Chưa lưu được tiến trình. Bạn vẫn có thể chơi tiếp trong phiên này.", "Progress could not be saved. You can keep playing during this visit."),
  "status.bookLocked": text("Hoàn thành câu chuyện Tai Thính để gặp người bạn này.", "Finish Keen Ears’ story to meet this friend."),
  "status.pause": text("Đang tạm dừng", "Paused")
} as const satisfies Record<string, LocalizedText>;

export const banBanhLuoiScript = {
  route: [
    {
      id: "banh-luoi-route-01",
      speaker: "narrator",
      vi: "Cánh sao thứ ba soi những vệt song song trên mặt đất. Cuội tạm biệt Tai Thính ở Đại Dương Bão.",
      en: "The third star point lights parallel marks on the ground. Cuội says goodbye to Keen Ears in the Ocean of Storms."
    },
    {
      id: "banh-luoi-route-02",
      speaker: "narrator",
      vi: "Ánh đèn đưa Cuội vượt qua những miền đất xa, tới thung lũng Taurus–Littrow. Đây là nơi Apollo 17 từng hạ cánh.",
      en: "The lantern carries Cuội across distant lands to the Taurus–Littrow valley, where Apollo 17 once landed."
    },
    {
      id: "banh-luoi-route-03",
      speaker: "cuoi",
      vi: "Dấu bánh xe này dẫn tới đâu nhỉ? Mình thử tới gần chiếc xe kia xem!",
      en: "Where do these wheel tracks lead? Let me go closer to that rover!"
    }
  ],
  meeting: [
    {
      id: "banh-luoi-meeting-01",
      speaker: "banhLuoi",
      vi: "Có bạn ghé chơi rồi! Mình là Bánh Lưới, chiếc xe của Apollo 17.",
      en: "A visitor! I am Mesh Wheels, the Apollo 17 rover."
    },
    {
      id: "banh-luoi-meeting-02",
      speaker: "cuoi",
      vi: "Mình là Cuội, đang đi tìm chị Hằng. Những vệt bánh kia là của bạn à?",
      en: "I am Cuội, and I am looking for Hằng. Are those your wheel tracks?"
    },
    {
      id: "banh-luoi-meeting-03",
      speaker: "banhLuoi",
      vi: "Đúng đấy! Cernan và Schmitt từng lái mình qua thung lũng để tìm đá và đất. Giờ mình đỗ lại ở đây.",
      en: "Yes! Cernan and Schmitt drove me through the valley to look for rocks and soil. Now I stay parked here."
    },
    {
      id: "banh-luoi-meeting-04",
      speaker: "banhLuoi",
      vi: "Cuội thử lăn những bánh minh họa này nhé. Chiếc nào có ô lưới giống bánh của mình?",
      en: "Try rolling these illustrated wheels, Cuội. Which one has mesh openings like mine?"
    }
  ],
  photoAIntro: [
    {
      id: "banh-luoi-photoAIntro-01",
      speaker: "banhLuoi",
      vi: "Bạn nhận ra đôi bánh rồi! Mình còn giữ bức ảnh Cernan chụp ở nơi đỗ cuối. Cuội cất giúp mình nhé?",
      en: "You recognised my wheels! I have a photo Cernan took at my final parking spot. Will you keep it, Cuội?"
    }
  ],
  routeIntro: [
    {
      id: "banh-luoi-routeIntro-01",
      speaker: "banhLuoi",
      vi: "Ngày trước, mình thích những chuyến đi xa lắm! Cuội cùng mình vạch đường cho một chuyến đi trong tưởng tượng nhé.",
      en: "I loved those long trips! Cuội, let us plan an imaginary trip together."
    },
    {
      id: "banh-luoi-routeIntro-02",
      speaker: "cuoi",
      vi: "Mình ghé hai trạm rồi về tàu. Nhưng nếu xe dừng giữa đường thì sao?",
      en: "We visit two stops, then return to the module. But what if the rover stops along the way?"
    },
    {
      id: "banh-luoi-routeIntro-03",
      speaker: "banhLuoi",
      vi: "Phải còn đường đi bộ về nữa! Pin cho xe và nguồn sống cho người là hai chuyện khác nhau.",
      en: "We need a way to walk home, too! The rover’s battery and the astronauts’ life-support supplies are different things."
    }
  ],
  cameraIntro: [
    {
      id: "banh-luoi-cameraIntro-01",
      speaker: "banhLuoi",
      vi: "Có đường về rồi! Mình còn một công việc cuối: đứng ở nơi camera nhìn rõ chiếc tàu.",
      en: "We have a way home! I had one last job: to stand where my camera could see the module clearly."
    },
    {
      id: "banh-luoi-cameraIntro-02",
      speaker: "cuoi",
      vi: "Bạn ở lại để nhìn theo các nhà du hành sao?",
      en: "You stayed behind to watch the astronauts leave?"
    },
    {
      id: "banh-luoi-cameraIntro-03",
      speaker: "banhLuoi",
      vi: "Ừ. Người ở Trái Đất điều khiển camera. Mình cùng thử tìm chỗ đỗ và góc nhìn trong mô hình này nhé.",
      en: "Yes. People on Earth controlled the camera. Let us try a parking spot and viewing angle in this model."
    }
  ],
  photoBIntro: [
    {
      id: "banh-luoi-photoBIntro-01",
      speaker: "banhLuoi",
      vi: "Mình đã ở lại, nhưng những chuyến đi không biến mất. Có cả một bức ảnh nhìn từ trên cao nữa!",
      en: "I stayed behind, but the journeys did not disappear. There is even a picture from high above!"
    }
  ],
  memoriesIntro: [
    {
      id: "banh-luoi-memoriesIntro-01",
      speaker: "banhLuoi",
      vi: "Hai bức ảnh cách nhau nhiều năm. Cuội cùng mình đọc từ tấm cũ trước nhé.",
      en: "These two photos were taken many years apart. Let us start with the older one, Cuội."
    }
  ],
  farewell: [
    {
      id: "banh-luoi-farewell-01",
      speaker: "cuoi",
      vi: "Bạn đã chở các nhà du hành đi xa, rồi còn giúp mọi người nhìn thấy chuyến bay trở về.",
      en: "You carried the astronauts far, then helped everyone see their flight home."
    },
    {
      id: "banh-luoi-farewell-02",
      speaker: "banhLuoi",
      vi: "Mình vui chứ! Chỉ đôi lúc, giữa thung lũng vắng, mình tự hỏi có ai còn nhớ không.",
      en: "I am glad! Only sometimes, in this quiet valley, I wonder if anyone remembers."
    },
    {
      id: "banh-luoi-farewell-03",
      speaker: "cuoi",
      vi: "Mình sẽ nhớ. Mình sẽ kể cả chuyện đi xa và chuyện tìm đường về của bạn.",
      en: "I will remember. I will tell your story of exploring far and finding the way home."
    },
    {
      id: "banh-luoi-farewell-04",
      speaker: "banhLuoi",
      vi: "Vậy cho một chút ký ức của mình đi cùng bạn nhé. Mong ánh sao soi đường Cuội tìm chị Hằng!",
      en: "Then let a little of my memory travel with you. May this star point light your search for Hằng!"
    }
  ],
  giftAfter: [
    {
      id: "banh-luoi-giftAfter-01",
      speaker: "cuoi",
      vi: "Cánh sao thứ tư sáng rồi! Cảm ơn bạn, Bánh Lưới.",
      en: "The fourth star point is shining! Thank you, Mesh Wheels."
    },
    {
      id: "banh-luoi-giftAfter-02",
      speaker: "banhLuoi",
      vi: "Này Cuội, thử ngước nhìn phía trời bên phải nhé. Có một chấm sáng nhỏ ở trên cao kìa!",
      en: "Cuội, look up at the sky on the right. There is a little light high above!"
    }
  ],
  endingChat: [
    {
      id: "banh-luoi-endingChat-01",
      speaker: "banhLuoi",
      vi: "Bạn lại ghé rồi! Có Cuội nghe chuyện, thung lũng cũng vui hơn.",
      en: "You are back! The valley feels brighter with you here to listen."
    },
    {
      id: "banh-luoi-endingChat-02",
      speaker: "banhLuoi",
      vi: "Chấm sáng vẫn ở phía trời bên phải đấy. Cứ theo vệt sáng dưới đất để đi tiếp nhé.",
      en: "The little light is still in the sky on the right. Follow the glow on the ground to continue."
    }
  ],
  taiThinhConnector: [
    {
      id: "banh-luoi-taiThinhConnector-01",
      speaker: "taiThinh",
      vi: "Cảm ơn Cuội lại ghé nghe chuyện. Mình rất vui.",
      en: "Thank you for coming back to listen, Cuội. I am glad."
    },
    {
      id: "banh-luoi-taiThinhConnector-02",
      speaker: "taiThinh",
      vi: "Cuội nhìn phía bên phải kìa! Hai vệt song song ấy giống dấu bánh xe đấy. Biết đâu một người bạn thích khám phá đang chờ? Bạn theo dấu vết xem nhé, rồi ghé kể mình nghe nha!",
      en: "Look to the right, Cuội! Those two parallel marks look like wheel tracks. Perhaps a friend who loves exploring is waiting? Follow the tracks, then come back and tell me!"
    }
  ]
} as const satisfies Record<string, readonly AuthoredLine[]>;

export const banBanhLuoiBook = {
  "ban-banh-luoi": {
    title: text("Apollo 17 — Bánh Lưới", "Apollo 17 — Mesh Wheels"),
    paragraphs: [
      text("Xe LRV của Apollo 17 chở Eugene Cernan và Harrison Schmitt đi khảo sát thung lũng Taurus–Littrow vào tháng 12/1972.", "The Apollo 17 LRV carried Eugene Cernan and Harrison Schmitt on exploring trips in the Taurus–Littrow valley in December 1972."),
      text("Hai phi hành gia lái chiếc xe chạy bằng pin. Sau chuyến đi cuối, xe ở lại gần tàu đổ bộ Challenger.", "The two astronauts drove the battery-powered rover. After its last trip, it stayed near the lunar module Challenger.")
    ]
  },
  "ban-book-wheels": {
    title: text("Bánh xe không cần bơm hơi", "Wheels that need no air"),
    paragraphs: [
      text("Bánh LRV đan bằng dây kim loại, có gân chữ V và không cần bơm hơi.", "LRV wheels use wire mesh and V-shaped treads. They need no air."),
      text("Lưới có thể uốn nhưng vật sắc vẫn có thể làm đứt sợi. Minh họa chuyển động được giản lược.", "Mesh can flex, but sharp objects can break wires. Motion is simplified.")
    ]
  },
  "ban-book-route": {
    title: text("Một chuyến đi, hai trạm", "One trip, two stops"),
    paragraphs: [
      text("Cuội và Bánh Lưới chuẩn bị một chuyến đi tưởng tượng. Tuyến từ LM ghé A, B theo thứ tự bất kỳ rồi về tàu, qua các ô chung cạnh và tránh hố.", "Cuội and Mesh Wheels plan an imaginary trip. Their route starts at LM, visits A and B in either order, then returns home, along shared cell edges and around craters."),
      text("Vào đất bằng tốn 1 pin, dốc tốn 2. Cả tuyến dùng tối đa 12 pin; đi lại ô cũ vẫn tính thêm.", "Entering flat ground costs 1 battery unit; a slope costs 2. Use at most 12. Revisiting a cell still adds to the cost.")
    ]
  },
  "ban-book-walkback": {
    title: text("Nếu cần đi bộ về thì sao?", "Walking home safely"),
    paragraphs: [
      text("Nếu xe hỏng, phi hành gia cần đi bộ về tàu. Oxy và nước làm mát cho người khác với pin của xe.", "If the rover failed, astronauts needed to walk home. Their oxygen and cooling water were separate from its battery."),
      text("Mọi ô trên tuyến cần đường về LM trong 4 bước, tránh hố. Dốc cũng tính 1 bước. Các số 4 và 12 chỉ là luật mô phỏng.", "Every route cell needs a walk home within 4 steps, avoiding craters. Slopes also count as 1 step. The numbers 4 and 12 are model rules only.")
    ]
  },
  "ban-book-camera": {
    title: text("Một chỗ đứng để nhìn theo", "A place to watch from"),
    paragraphs: [
      text("Cernan đỗ xe ở VIP Site, phía đông Challenger. Người ở Trái Đất điều khiển camera quay tàu cất cánh.", "Cernan parked at the VIP Site, east of Challenger. People on Earth controlled the camera to film liftoff."),
      text("Trong mô hình, tránh đá và đừng đỗ quá gần. Chỉnh góc để vùng viền chấm nằm trọn trong khung.", "In the model, avoid the rock and do not park too close. Aim to fit the dotted region inside the frame.")
    ]
  },
  "ban-book-legacy": {
    title: text("Dấu vết và ký ức", "Tracks and memories"),
    paragraphs: [
      text("Tầng bay lên của Challenger rời Mặt Trăng ngày 14/12/1972. Xe và tầng dưới tàu đổ bộ ở lại.", "Challenger’s ascent stage left the Moon on 14 December 1972. The rover and the descent stage stayed behind."),
      text("Năm 2011, ảnh từ quỹ đạo vẫn cho thấy vị trí xe và các đường đi. Còn trong câu chuyện, Cuội mang ký ức của Bánh Lưới đi cùng chiếc đèn.", "In 2011, an orbital image still showed the rover’s position and trails. In the story, Cuội carries Mesh Wheels’ memories with his lantern.")
    ]
  },
  "ban-photo-vip": {
    title: text("Bánh Lưới ở nơi đỗ cuối", "Mesh Wheels at the final parking spot"),
    captionKey: "photoA.caption",
    altKey: "photoA.alt",
    creditKey: "photoA.credit",
    memoryId: "vip"
  },
  "ban-photo-orbit": {
    title: text("Dấu vết nhìn từ quỹ đạo", "Tracks seen from orbit"),
    captionKey: "photoB.caption",
    altKey: "photoB.alt",
    creditKey: "photoB.credit",
    memoryId: "orbit"
  }
} as const;

export const banBanhLuoiFooterByPhase = {
  route: "footer.dialogue",
  meeting: "footer.dialogue",
  routeIntro: "footer.dialogue",
  cameraIntro: "footer.dialogue",
  memoriesIntro: "footer.dialogue",
  farewell: "footer.dialogue",
  approach: "footer.walk",
  wheels: "footer.wheels",
  routePuzzle: "footer.route",
  camera: "footer.camera",
  launch: "footer.launch",
  photoA: "footer.photo",
  photoB: "footer.photo",
  recallA: "footer.recall",
  recallB: "footer.recall",
  gift: "footer.gift",
  finished: "footer.finished"
} as const satisfies Record<string, keyof typeof banBanhLuoiCopy>;

export type BanBanhLuoiScriptId = keyof typeof banBanhLuoiScript;
export type BanBanhLuoiPhase = keyof typeof banBanhLuoiFooterByPhase;
export type BanBanhLuoiCopyKey = keyof typeof banBanhLuoiCopy;
export const banBanhLuoiDialogue = (language: Language, group: BanBanhLuoiScriptId) =>
  banBanhLuoiScript[group].map(row => ({ id: row.id, speaker: row.speaker, text: row[language] }));

// Shared authored data for the storyboard and migration verification.
export const banBanhLuoiContent = {
  status: 'integrated',
  identity: banBanhLuoiIdentity,
  copy: banBanhLuoiCopy,
  dialogue: banBanhLuoiScript,
  book: banBanhLuoiBook,
  footerByPhase: banBanhLuoiFooterByPhase,
} as const;
