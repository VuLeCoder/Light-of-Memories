import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';

// Canonical Vietnamese/English copy for the complete fourth chapter.
// Migration scope and milestones: plan/banh-luoi-pdf-milestones.md.
// Later challenges retain their existing copy until their assigned milestone.
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
  "identity.book": text("Apollo 15 — Bánh Lưới", "Apollo 15 — Mesh Wheels"),
  "identity.subtitle": text("Đi thật xa, nhớ đường về", "Explore far, remember the way home"),
  "identity.location": text("Hadley–Apennine · Apollo 15", "Hadley–Apennine · Apollo 15"),
  "identity.scene": text("06 · Bạn Bánh Lưới", "06 · Mesh Wheels"),
  "identity.friend": text("04 · Bánh Lưới", "04 · Mesh Wheels"),
  "identity.invitation": text("Lần theo dấu bánh xe", "Follow the rover tracks"),
  "identity.canvasAlt": text("Cuội cạnh xe Apollo 15 đỗ yên tại vùng Hadley–Apennine.", "Cuội beside the parked Apollo 15 rover at Hadley–Apennine."),
  "identity.portraitAlt": text("Xe Bánh Lưới với bánh lưới kim loại, hai ghế và ăng-ten hình chảo.", "Mesh Wheels with wire-mesh wheels, two seats and a dish antenna."),
  "identity.mystery": text("Người bạn bí ẩn", "A mystery friend"),
  "objective.route": text("Theo ánh đèn tới thung lũng xa", "Follow the lantern to a distant valley"),
  "objective.approach": text("Đến gần chiếc xe", "Approach the rover"),
  "objective.meeting": text("Lắng nghe Bánh Lưới", "Listen to Mesh Wheels"),
  "objective.wheels": text("T01 · Thử bánh xe", "T01 · Try the wheels"),
  "objective.photoA": text("Scott và chiếc xe Apollo 15", "Scott and the Apollo 15 rover"),
  "objective.routeIntro": text("Nhớ về một chuyến khảo sát", "Remember an exploring trip"),
  "objective.routePuzzle": text("T02 · Ghé A, B rồi về tàu", "T02 · Visit A and B, then return"),
  "objective.guideIntro": text("Cùng lên đường", "Set off together"),
  "objective.guiding": text("T03 · Hành trình lấy mẫu", "T03 · Sample journey"),
  "objective.photoB": text("Những dấu vết nhìn từ trên cao", "Tracks seen from above"),
  "objective.memoriesIntro": text("Hai bức ảnh, một câu chuyện", "Two photos, one story"),
  "objective.recallA": text("1/2 · Cùng phi hành gia, năm 1971", "1/2 · With the astronauts, 1971"),
  "objective.recallB": text("2/2 · Dấu vết còn lại, năm 2011", "2/2 · Lasting tracks, 2011"),
  "objective.farewell": text("Mang theo câu chuyện của bạn", "Carry a friend’s story"),
  "objective.gift": text("Một ánh sao từ Bánh Lưới", "A star point from Mesh Wheels"),
  "objective.finished": text("Về lộ trình để gặp Gác Trời", "Return to the route to meet Sky Watcher"),
  "footer.dialogue": text("Space/Enter hoặc nút trong khung thoại để hiện hết câu và tiếp tục.", "Use Space/Enter or the dialogue button to reveal the full line and continue."),
  "footer.guide": text("Xe tự đi theo lộ trình; A và B là hai điểm dừng. ▼ Cuội · ▰ Bánh Lưới. Mở sách hoặc menu để tạm dừng.", "The rover follows your route, stopping at A and B. ▼ Cuội · ▰ Mesh Wheels. Open the book or menu to pause."),
  "footer.walk": text("A/D, ←/→ hoặc chạm đất để đi. Đến gần xe nhấn E, hoặc chạm xe.", "Use A/D, ←/→ or touch the ground to walk. Press E near the rover, or touch it."),
  "footer.wheels": text("Thử bánh rồi tìm chiếc có ô lưới và gân chữ V. Phím mũi tên: đổi bánh · Space: thử bánh · Enter: chọn bánh này. Có thể dùng chuột hoặc chạm các nút.", "Try wheels and find the mesh with V-shaped treads. Arrow keys: switch wheels · Space: try wheel · Enter: choose this wheel. You can also click or tap the buttons."),
  "footer.route": text("Chọn ô kề để thêm bước. Mũi tên chọn ô, Enter/Space thêm; dùng nút để lùi hoặc vẽ lại.", "Choose a neighbouring cell to add a step. Arrow keys select a cell; Enter/Space adds it. Use the buttons to undo or reset."),
  "footer.photo": text("Cất ảnh để thêm vào sách và tiếp tục. Có thể mở ảnh lớn để xem chi tiết.", "Keep the photo to add it to the book and continue. Open a larger view to inspect it."),
  "footer.recall": text("Dùng Trang trước/Trang tiếp để đọc theo thời gian.", "Use Previous page/Next page to read in time order."),
  "footer.gift": text("Ánh sáng đang tới chiếc đèn. Menu có thể tạm dừng.", "The light is reaching the lantern. Menu can pause it."),
  "footer.finished": text("Đi lại hoặc trò chuyện với xe. Tới hình chiếu ảnh từ trên cao bên phải để về lộ trình.", "Walk or talk to the rover. Reach the overhead picture projection on the right to return to the route."),
  "button.confirm": text("Chọn bánh này", "Choose this wheel"),
  "button.tryWheel": text("Thử bánh", "Try wheel"),
  "button.hint": text("Gợi ý", "Hint"),
  "button.hintMore": text("Xem thêm gợi ý", "Show another hint"),
  "button.undo": text("Lùi một bước", "Undo one step"),
  "button.reset": text("Vẽ lại", "Reset route"),
  "button.routeSubmit": text("Thử lộ trình", "Try this route"),
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
  "wheels.flatExample": text("Bánh cao su nảy nhẹ", "Rubber bounces a little"),
  "wheels.closeup": text("Cận cảnh bề mặt", "Surface close-up"),
  "wheels.ready": text("Chọn một bánh, rồi bấm Thử bánh để quan sát.", "Choose a wheel, then press Try wheel to observe it."),
  "wheels.untried": text("Mình thử bánh vừa chọn trước nhé!", "Let us try this wheel first!"),
  "wheels.rubberTrial": text("Bánh cao su nảy lên rồi hơi lún khi vượt đá.", "Rubber bounces, then compresses a little over the rock."),
  "wheels.meshTrial": text("Lưới uốn ôm viên đá; gân chữ V giúp bám đất.", "Mesh flexes around the rock; V-shaped treads provide grip."),
  "wheels.stoneTrial": text("Bánh cứng không uốn; gặp đá thì nâng cả trục lên.", "The rigid wheel does not flex; a rock lifts the axle."),
  "wheels.rubberDetail": text("Bánh cao su có thể nén nhẹ khi tiếp xúc mặt đất. Đây là hình minh họa.", "Rubber can compress a little against the ground. This is an illustration."),
  "wheels.meshDetail": text("Nhiều sợi kim loại đan thành lưới; các dải gân xếp hình chữ V.", "Metal wires form a mesh, with V-shaped tread strips."),
  "wheels.stoneDetail": text("Vành kim loại cứng, không uốn ôm viên đá.", "A rigid metal rim that does not flex around the rock."),
  "wheels.empty": text("Bạn chọn một bánh để mình cùng quan sát nhé.", "Choose a wheel so we can look at it together."),
  "wheels.wrongRubber": text("Mặt lốp này kín. Bánh của mình có ô lưới; bạn thử bánh khác nhé.", "This tyre is closed. My wheels have mesh openings; try another wheel."),
  "wheels.wrongStone": text("Bánh cứng không có sợi đan. Bạn thử tìm bánh có ô lưới nhé.", "The rigid wheel has no woven wires. Try the wheel with mesh openings."),
  "wheels.correct": text("Đúng rồi! Bánh lưới uốn theo đá, gân giúp bám đất xốp. Cao su cũng có ích cho công việc khác: chọn bánh còn tùy việc nhé!", "That is right! Mesh flexes over rocks, and treads grip loose soil. Rubber is useful for other jobs too: choose wheels to suit the task!"),
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
  "photoA.title": text("Xe thám hiểm Mặt Trăng Apollo 15", "Apollo 15 Lunar Roving Vehicle"),
  "photoA.caption": text("David Scott ngồi trên xe LRV tại Hadley–Apennine năm 1971, chuẩn bị trở về tàu Falcon. Theo NASA, xe chở mẫu đá và đất thu thập trong chuyến khảo sát.", "David Scott sits in the LRV at Hadley–Apennine in 1971, preparing to return to Falcon. NASA describes the rover carrying rock and soil samples collected during the traverse."),
  "photoA.alt": text("Ảnh đen trắng David Scott ngồi trên xe LRV Apollo 15, hai bánh lưới ở phía gần máy ảnh và các dãy đồi phía sau.", "Black-and-white photograph of David Scott seated in the Apollo 15 LRV, with two mesh wheels on the near side and hills behind."),
  "photoA.credit": text("NASA/MSFC · Ảnh tư liệu 7022567 · Apollo 15, 1971", "NASA/MSFC · Image asset 7022567 · Apollo 15, 1971"),
  "photoA.zoomAlt": text("Cắt từ ảnh NASA 7022567: bánh trước ở bên phải ảnh, với lưới kim loại và các dải gân trên mặt bánh.", "Crop from NASA image 7022567: the front wheel on the right, showing wire mesh and tread strips."),
  "photoB.title": text("Ảnh quỹ đạo Apollo 15", "Apollo 15 from orbit"),
  "photoB.caption": text("Ảnh LROC năm 2011 từ độ cao khoảng 25 km: tầng dưới Falcon ở giữa, xe LRV ở bên phải. Những mũi tên đen chỉ dấu bánh xe; nhãn trắng chỉ thiết bị. Trang nguồn đăng ngày 05/03/2012, không phải ngày chụp.", "LROC image from 2011, taken about 25 km above the surface: Falcon’s descent stage is in the centre, with the LRV on the right. Black arrows mark rover tracks; white labels identify equipment. The source was published on 5 March 2012, not the capture date."),
  "photoB.alt": text("Ảnh bãi đáp Apollo 15: ALSEP ở trên trái, tầng dưới Falcon gần giữa và xe LRV bên phải; giữ nguyên nhãn và thước 50 m của nguồn.", "Apollo 15 landing site: ALSEP at upper left, Falcon’s descent stage near the centre and LRV at right, with the original labels and 50 m scale bar."),
  "photoB.credit": text("NASA / GSFC / Arizona State University · LROC NAC M175252641L,R", "NASA / GSFC / Arizona State University · LROC NAC M175252641L,R"),
  "photoB.detailCaption": text("Cắt từ cùng ảnh: mũi tên LRV chỉ xe cạnh bóng đổ, dấu bánh nối tới nơi đỗ.", "Crop from the same image: the LRV arrow marks the rover beside its shadow, with tracks leading to its parking spot."),
  "photoB.zoomAlt": text("Phần cắt bên phải ảnh M175252641L,R, giữ nhãn LRV và mũi tên chỉ xe tại nơi đỗ.", "Right-hand crop of M175252641L,R, retaining the LRV label and arrow pointing to the parked rover."),
  "photoB.lmCallout": text("Tầng dưới Falcon", "Falcon’s descent stage"),
  "photoB.roverCallout": text("Vị trí xe LRV Apollo 15", "Apollo 15 LRV location"),
  "photoB.tracksCallout": text("Những đường đi còn thấy trong ảnh", "Trails still visible in the image"),
  "photo.error": text("Ảnh chưa tải được. Bạn có thể thử lại hoặc cất để đọc chú thích và tiếp tục.", "The photo could not load. You can retry, or keep it to read the caption and continue."),
  "photo.kept": text("Ảnh đã được cất trong sách.", "The photo is now in the book."),
  "photo.alreadyKept": text("Ảnh này đã có trong sách. Mình đọc tiếp nhé.", "This photo is already in the book. Let us continue."),
  "recallA.title": text("1971 · Cùng khám phá và trở về", "1971 · Exploring and returning"),
  "recallA.body": text("Cuối tháng Bảy, đầu tháng Tám năm 1971, mình chở David Scott và James Irwin khám phá Hadley–Apennine. Họ mang về Trái Đất hơn 77 kg đá và đất. Khi họ rời đi, mình ở lại theo kế hoạch, cùng tầng dưới tàu Falcon. Đi xa thì phải nhớ đường về, Cuội nhỉ!", "In late July and early August 1971, I carried David Scott and James Irwin around Hadley–Apennine. They brought over 77 kg of rock and soil back to Earth. When they left, I stayed behind as planned, along with Falcon’s descent stage. Explore far, but remember the way home, Cuội!"),
  "recallB.title": text("2011 · Những con đường còn đó", "2011 · The trails remain"),
  "recallB.body": text("Năm 2011, hệ máy ảnh LROC trên tàu LRO chụp lại bãi đáp Apollo 15 từ quỹ đạo. Tầng dưới Falcon ở giữa ảnh, mình ở phía bên phải; những dấu bánh vẫn còn thấy. Cuội giữ giúp mình cả câu chuyện năm 1971 và tấm ảnh nhìn lại này nhé!", "In 2011, LRO’s LROC cameras photographed the Apollo 15 site from orbit. Falcon’s descent stage is in the centre and I am on the right; rover tracks remain visible. Will you keep both my 1971 story and this later view, Cuội?"),
  "status.completed": text("Cánh sao thứ tư đã sáng · 4/5", "The fourth star point is shining · 4/5"),
  "status.interact": text("E · Trò chuyện với Bánh Lưới", "E · Talk to Mesh Wheels"),
  "status.exit": text("Tới hình chiếu → Về lộ trình", "Reach the projection → Back to the route"),
  "status.zoom": text("Ảnh lớn · Có thể đóng để trở lại", "Larger photo · Close to return"),
  "status.storage": text("Chưa lưu được tiến trình. Bạn vẫn có thể chơi tiếp trong phiên này.", "Progress could not be saved. You can keep playing during this visit."),
  "status.bookLocked": text("Hoàn thành câu chuyện Tai Thính để gặp người bạn này.", "Finish Sharp Ear’ story to meet this friend."),
  "status.pause": text("Đang tạm dừng", "Paused")
} as const satisfies Record<string, LocalizedText>;

export const banBanhLuoiScript = {
  route: [
    {
      id: "banh-luoi-route-01",
      speaker: "narrator",
      vi: "Cuội tạm biệt Tai Thính ở Đại Dương Bão và mở lại lộ trình. Ba cánh sao soi sáng chặng đường đến thăm Bánh Lưới.",
      en: "Cuội says goodbye to Sharp Ear in the Ocean of Storms and opens the route again. Three star points light the journey to visit Mesh Wheels."
    },
    {
      id: "banh-luoi-route-02",
      speaker: "narrator",
      vi: "Tới vùng Hadley–Apennine, nơi Apollo 15 từng hạ cánh, Cuội thấy hai hàng dấu bánh xe in trên đất, giữa đồng bằng có núi và một khe sâu uốn lượn.",
      en: "Arriving at Hadley–Apennine, where Apollo 15 once landed, Cuội notices two rows of wheel tracks on a plain beside mountains and a winding rille."
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
      vi: "Ơ, có khách! Mình tên là Lunar Roving Vehicle, nghĩa là xe thám hiểm Mặt Trăng. Nhưng bạn cứ gọi mình là Bánh Lưới nhé, vì mình tự hào về bốn cái bánh này lắm!",
      en: "Oh, a visitor! My name is Lunar Roving Vehicle. But call me Mesh Wheels — I am very proud of these four wheels!"
    },
    {
      id: "banh-luoi-meeting-02",
      speaker: "cuoi",
      vi: "Mình là Cuội, đang đi tìm chị Hằng. Những vệt bánh kia là của bạn à? Ai lái bạn vậy?",
      en: "I am Cuội, and I am looking for Hằng. Are those your wheel tracks? Who drove you?"
    },
    {
      id: "banh-luoi-meeting-03",
      speaker: "banhLuoi",
      vi: "Đúng đấy! David Scott và James Irwin lái mình đi khám phá nơi này vào cuối tháng Bảy, đầu tháng Tám năm 1971, trong chuyến Apollo 15. Tàu đổ bộ của họ tên là Falcon. Mình không tự lái, cũng không phải robot đâu nhé! Mình là chiếc xe đầu tiên như thế đi cùng phi hành gia.",
      en: "Yes! David Scott and James Irwin drove me here in late July and early August 1971, on Apollo 15. Their lunar module was called Falcon. I did not drive myself — I am not a robot! I was the first rover of this kind to travel with astronauts."
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
      vi: "Bạn nhận ra đôi bánh rồi! Đây là Scott ngồi trên mình, chuẩn bị trở về Falcon sau chuyến lấy mẫu. Cuội cất ảnh giúp mình nhé?",
      en: "You recognised my wheels! Here is Scott sitting on me, ready to return to Falcon after collecting samples. Will you keep the photo, Cuội?"
    }
  ],
  routeIntro: [
    {
      id: "banh-luoi-routeIntro-01",
      speaker: "banhLuoi",
      vi: "Chuyến đầu với Scott và Irwin, hệ thống lái bánh trước của mình không hoạt động. Hai người vẫn lái bằng bánh sau để đi khám phá!",
      en: "On my first trip with Scott and Irwin, my front steering did not work. They still explored using rear-wheel steering!"
    },
    {
      id: "banh-luoi-routeIntro-02",
      speaker: "cuoi",
      vi: "Vậy mình thử vạch một chuyến đi tưởng tượng nhé: lấy đá ở A, lấy đất ở B rồi trở về tàu Falcon!",
      en: "Let’s plan an imaginary trip: collect rock at A and soil at B, then return to Falcon!"
    },
    {
      id: "banh-luoi-routeIntro-03",
      speaker: "banhLuoi",
      vi: "Nhớ tính cả pin xe và đường đi bộ về nhé! Oxy và nước làm mát dành cho người. Mình cần một tuyến an toàn để trở về.",
      en: "Plan for battery power and a safe walk home, too! Oxygen and cooling water are for the astronauts. We need a safe return route."
    }
  ],
  guideIntro: [
    {
      id: "banh-luoi-guideIntro-01",
      speaker: "banhLuoi",
      vi: "Cuội đã vạch được tuyến an toàn rồi! Trong chuyến đi tưởng tượng này, mình sẽ theo tuyến đã chọn, ghé hai trạm rồi cùng về tàu nhé.",
      en: "You have planned a safe route! On this imaginary trip, we’ll follow it to both stops, then return to the module."
    },
    {
      id: "banh-luoi-guideIntro-02",
      speaker: "cuoi",
      vi: "Mình cùng lấy mẫu đá ở A, quan sát ba mảng đất ở B rồi xúc một ít đất có hạt mịn xen mảnh vỡ nhỏ, mang về xe nhé.",
      en: "Let’s collect rock at A, examine three soil patches at B, then scoop some finer soil mixed with small fragments and carry it to the rover."
    },
    {
      id: "banh-luoi-guideIntro-03",
      speaker: "banhLuoi",
      vi: "Ừ, cứ theo thứ tự trên bản đồ của mình. Về tới tàu, mình sẽ cho Cuội xem những đường đi được chụp từ trên cao.",
      en: "Yes, in the order on our map. Back at the module, I will show you our tracks photographed from above."
    }
  ],
  photoBIntro: [
    {
      id: "banh-luoi-photoBIntro-01",
      speaker: "banhLuoi",
      vi: "Mình đã về tới tàu và mang đủ mẫu rồi! Phi hành gia Apollo 15 mang về Trái Đất hơn 77 kg đá và đất. Đây là ảnh người bạn bay trên cao chụp năm 2011: tầng dưới Falcon ở giữa, mình ở bên phải, dấu bánh vẫn còn đó!",
      en: "We are back with both samples! Apollo 15 brought over 77 kg of rock and soil to Earth. Our friend in orbit took this picture in 2011: Falcon’s descent stage is in the centre, I am on the right, and the tracks remain!"
    }
  ],
  memoriesIntro: [
    {
      id: "banh-luoi-memoriesIntro-01",
      speaker: "banhLuoi",
      vi: "Cuội cùng mình đọc theo thời gian nhé: tấm năm 1971 khi mình làm việc cùng phi hành gia trước, rồi tấm năm 2011 nhìn lại từ trên cao.",
      en: "Let’s read them in time order, Cuội: first 1971, when I worked with the astronauts, then the 2011 view from above."
    }
  ],
  farewell: [
    {
      id: "banh-luoi-farewell-01",
      speaker: "cuoi",
      vi: "Mình nhớ bạn rồi. Mình sẽ kể lại chuyện bạn chở Scott và Irwin đi xa, lấy mẫu rồi tìm đường về Falcon.",
      en: "I remember you. I will tell how you carried Scott and Irwin far, collected samples and found the way back to Falcon."
    },
    {
      id: "banh-luoi-farewell-02",
      speaker: "banhLuoi",
      vi: "Khi họ về, mình ở lại. Có Cuội nhớ đến, câu chuyện của mình không bị quên nữa. Xin đừng quên tên mình nhé!",
      en: "When they went home, I stayed. With you remembering, my story will not be forgotten. Please remember my name!"
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
      vi: "Cuội nhìn lên kìa! Gác Trời, người bạn LRO bay quanh Mặt Trăng, đã chụp tấm ảnh năm 2011 ấy. Hình chiếu nhỏ của chiếc đèn sẽ gợi đường để bạn đến gặp người bạn ấy nhé!",
      en: "Look up, Cuội! Sky Watcher, our friend LRO orbiting the Moon, took that 2011 picture. The lantern’s little projection will guide you towards our friend!"
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
      vi: "Mình vẫn nhớ những chuyến đi với Scott và Irwin năm 1971. Hình chiếu bên kia nhắc tấm ảnh năm 2011 của Gác Trời; theo đó để gặp người bạn bay quanh Mặt Trăng nhé!",
      en: "I still remember exploring with Scott and Irwin in 1971. That projection recalls Sky Watcher’s 2011 picture; follow it to meet our friend orbiting the Moon!"
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
      vi: "Cuội thử lần theo những dấu bánh xe kia nhé. Biết đâu phía trước có một người bạn đang chờ! Gặp rồi nhớ quay lại kể mình nghe nha!",
      en: "Try following those wheel tracks, Cuội. Maybe a friend is waiting up ahead! Come back and tell me when you meet them!"
    }
  ]
} as const satisfies Record<string, readonly AuthoredLine[]>;

export const banBanhLuoiBook = {
  "ban-banh-luoi": {
    title: text("Bánh Lưới – Người bạn mê rong ruổi", "Mesh Wheels – A friend who loves exploring"),
    paragraphs: [
      text("Bánh Lưới tự hào về bốn chiếc bánh đan lưới và rất mê rong ruổi. Cuội vừa ghé, bạn đã reo: “Ơ, có khách! Bạn đến ngắm bánh hay rủ mình đi dạo đấy?”", "Mesh Wheels is proud of those four woven wheels and loves exploring. As Cuội approaches, our friend calls out: “Oh, a guest! Admiring my wheels or inviting me for a stroll?”"),
      text("Bạn có cả kho chuyện muốn kể. Ghé chào nhé, biết đâu Bánh Lưới đang chờ Cuội cùng vạch đường cho chuyến phiêu lưu mới!", "Come say hello! There are stories to share and a new adventure to plan together.")
    ]
  },
  "ban-book-wheels": {
    title: text("Bánh xe không cần bơm hơi", "Wheels that need no air"),
    paragraphs: [
      text("Cao su bơm hơi: nảy lên rồi hơi lún khi qua đá.", "Air-filled rubber: bounces and compresses over rocks."),
      text("Kim loại cứng: gặp đá sẽ nâng cả trục bánh.", "Rigid metal: lifts the axle when it meets a rock."),
      text("Lưới kim loại — đáp án: uốn ôm đá, gân chữ V giúp bám đất. Thử bánh rồi chọn bánh này!", "Wire mesh — the answer: flexes around rocks, with V-shaped treads for grip. Try it, then choose this wheel!")
    ]
  },
  "ban-book-wheels-real": {
    title: text("Bánh xe Apollo 15", "Apollo 15 wheels"),
    paragraphs: [
      text("Lốp xe LRV Apollo 15 là lưới thép mạ kẽm, không cần bơm hơi.", "Apollo 15 LRV tyres used zinc-coated steel mesh, with no inflation."),
      text("Gân titan chữ V phủ 50% diện tích tiếp xúc để tăng độ bám. Bên trong có khung chặn bảo vệ moay-ơ.", "Titanium V-shaped treads covered half the contact area for grip. An inner frame protected the hub.")
    ]
  },
  "ban-book-route": {
    title: text("Một chuyến đi, hai trạm", "One trip, two stops"),
    paragraphs: [
      text("Từ LM, ghé A lấy mẫu đá và B lấy mẫu đất theo thứ tự bất kỳ rồi trở về. Đi qua các ô chung cạnh, tránh hố.", "Leave LM, visit A (rock) and B (soil) in either order, then return. Follow shared edges; avoid craters."),
      text("Đất bằng tốn 1 pin, dốc tốn 2; cả tuyến tối đa 12 pin. Đi lại ô cũ vẫn tính thêm.", "Flat ground: 1 battery unit; slopes: 2. Maximum: 12 per route. Revisits cost power too."),
      text("Ở mọi điểm trên tuyến, đường đi bộ ngắn nhất về LM không quá 4 bước; dốc cũng tính 1 bước.", "From every route cell, the shortest walk to LM must stay within 4 steps. Slopes count as 1.")
    ]
  },
  "ban-book-samples": {
    title: text("Hai điểm dừng, hai mẫu vật", "Two stops, two samples"),
    paragraphs: [
      text("A: Gõ hai lần đúng vùng sáng; lần hai hẹp hơn và lệch phải. Nhặt mẫu đá đã rời, mang về xe cất.", "At A, land two strikes in the marked zones. The second zone is narrower and farther right. Pick up the loose rock and store it on the rover."),
      text("B: Soi ba mảng đất. Hai mảng có đá xám vụn; mảng giữa có hạt mịn xen mảnh vỡ nhỏ. Lấy mẫu giữa, cất trên xe cạnh đá.", "At B, inspect three patches. The middle has finer grains mixed with small fragments; the others have grey rock fragments. Collect the middle sample and store it beside the rock."),
      text("A/B, vùng lực và hình phóng đại là minh họa trò chơi.", "A/B, force zones and enlarged grains are game illustrations.")
    ]
  },
  "ban-book-walkback": {
    title: text("Nếu cần đi bộ về thì sao?", "Walking home safely"),
    paragraphs: [
      text("Nếu LRV hỏng thì sao? Tuyến Apollo 15 luôn chừa đủ thời gian để đi bộ về và vào tàu Falcon.", "Apollo 15’s route always allowed a walk back into Falcon if the LRV failed."),
      text("Giới hạn đường đi tùy vào oxy, nước làm mát còn trong ba lô, tính với tốc độ đi bộ 3,3 km/giờ.", "Limits used backpack oxygen and cooling water left, assuming a 3.3 km/h walk.")
    ]
  },
  "ban-book-legacy": {
    title: text("LRV Apollo 15", "LRV Apollo 15"),
    paragraphs: [
      text("LRV là xe có người lái đầu tiên trên Mặt Trăng. David Scott và James Irwin lái xe tại Hadley–Apennine từ 31/07 đến 02/08/1971.", "Apollo 15 brought the first crewed electric rover to the Moon. From 31 July to 2 August 1971, David Scott and James Irwin used it to explore Hadley–Apennine."),
      text("LRV có thể lái bằng cả bánh trước và sau. Tuy nhiên, ngày 31/07, lái trước không hoạt động; hai phi hành gia vẫn hoàn thành chuyến đầu bằng lái bánh sau.", "The LRV could steer with both its front and rear wheels. On 31 July, front steering failed, but the astronauts completed their first traverse using rear steering."),
      text("Đến chuyến hai ngày 01/08, lái trước đã hoạt động lại. Tuy vậy, báo cáo chưa xác định chính xác thời điểm khôi phục hay nguyên nhân sự cố.", "Front steering worked again before the second traverse on 1 August. The mission report did not establish the exact recovery time or the cause of the failure."),
      text("Qua ba chuyến, xe đi gần 28 km. Kết thúc sứ mệnh, Apollo 15 mang hơn 77 kg đá và đất về Trái Đất.", "Three traverses covered nearly 28 km; Apollo 15 brought over 77 kg of rock and soil to Earth.")
    ]
  },
  "ban-photo-vip": {
    title: text("Xe thám hiểm Mặt Trăng Apollo 15", "Apollo 15 Lunar Roving Vehicle"),
    captionKey: "photoA.caption",
    altKey: "photoA.alt",
    creditKey: "photoA.credit",
    memoryId: "vip"
  },
  "ban-photo-orbit": {
    title: text("LRV Apollo 15 (tiếp)", "LRV Apollo 15 (continued)"),
    paragraphs: [
      text("Sau khi hoàn thành nhiệm vụ, xe và tầng hạ cánh Falcon ở lại Mặt Trăng theo kế hoạch.", "Their work complete, the rover and Falcon’s descent stage stayed on the Moon as planned."),
      text("Nhiều năm sau, ảnh LROC chụp năm 2011 từ độ cao khoảng 25 km vẫn cho thấy tầng hạ cánh Falcon, xe và dấu bánh.", "LROC’s 2011 image, taken from about 25 km up, still shows Falcon’s descent stage, the rover and tracks.")
    ]
  }
} as const;

export const banBanhLuoiFooterByPhase = {
  route: "footer.dialogue",
  meeting: "footer.dialogue",
  routeIntro: "footer.dialogue",
  guideIntro: "footer.dialogue",
  memoriesIntro: "footer.dialogue",
  farewell: "footer.dialogue",
  approach: "footer.walk",
  wheels: "footer.wheels",
  routePuzzle: "footer.route",
  guiding: "footer.guide",
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
