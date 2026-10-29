const text = (vi: string, en: string) => ({ vi, en });
export const guideCopy = {
  travel: text('Cùng đi sang phải, theo đoạn đường đã vẽ.', 'Walk right together along this part of your route.'),
  observeA: text('A · Đi trước quan sát lối sau tảng đá.', 'A · Walk ahead and look beyond the rock.'),
  reportA: text('Đã thấy lối! Quay lại bên xe để báo cho bạn.', 'The way is clear! Return to the rover to tell your friend.'),
  chooseB: text('B · Tìm nền bằng để gọi Bánh Lưới tới.', 'B · Find level ground and call Mesh Wheels over.'),
  callB: text('Bánh Lưới đang tới chỗ Cuội. Cùng chờ bạn nhé.', 'Mesh Wheels is coming to Cuội. Wait for your friend.'),
  done: text('Cả hai đã về tàu. Cùng nghe ký ức của bạn nhé.', 'You are both home. Listen to your friend’s memory.'),
  slope: text('Chỗ này còn nghiêng. Cuội tìm nền bằng hơn nhé.', 'This spot slopes. Look for more level ground, Cuội.'),
  observe: text('Quan sát', 'Look ahead'),
  report: text('Báo lối', 'Share the way'),
  flat: text('Gọi bạn', 'Call rover'),
  interact: text('Tương tác', 'Interact'),
  edit: text('Bản đồ', 'Map'),
  step: text('Đoạn', 'Leg'),
  hints: {
    travel: text('Đi về cờ bên phải. Mỗi đoạn ngang là một bước trên bản đồ nhỏ.', 'Walk toward the flag on the right. Each side-view leg is one step on the small map.'),
    observeA: text('Đi sang phải, đến lá cờ cạnh tảng đá rồi quan sát.', 'Walk right to the flag beside the rock, then look ahead.'),
    reportA: text('Đi sang trái về cạnh xe, rồi báo lối vừa tìm thấy.', 'Walk left back beside the rover, then share the way you found.'),
    chooseB: text('Mốc bên trái nghiêng; mốc bên phải có vạch đất nằm ngang. Đến nền bằng rồi gọi bạn.', 'The left spot slopes; the right spot has a horizontal ground line. Stand by the level spot and call your friend.'),
    callB: text('Ở lại trong vùng chơi để bạn đi tới. Mở sách hay menu sẽ tạm dừng chuyến đi.', 'Stay in the play area while your friend comes over. Opening the book or menu pauses the trip.'),
    done: text('Chuyến đi đã xong.', 'The trip is complete.'),
  },
};
