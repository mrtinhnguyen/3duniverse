# Kiểm chứng tái cấu trúc

Phiên bản hiện tại là **1.4.0**, EarthSense vẫn chỉ mở ba lớp **thời tiết, sét, bão nhiệt đới**. Giai đoạn một và các mục 1.1.0–1.3.0 dưới đây đều là biên bản nghiệm thu lịch sử, mô tả hành vi tại thời điểm đó; tiến độ tinh chỉnh hình ảnh hệ mây và kiểm chứng hiện tại xem mục 1.4.0 ở cuối tài liệu.

## Giai đoạn một: giữ nguyên cảnh vũ trụ gốc (lịch sử)

`src/universe.js` ban đầu là một script dày đặc 327 dòng, khoảng 36 KB, chứa dữ liệu, shader, toàn bộ phần dựng cảnh, camera, tương tác và quy trình khởi động. Hiện tệp này được giữ lại làm điểm vào tương thích; `src/app.js` chỉ đảm nhận việc lắp ráp các module và điều phối từng khung hình.

- `core/`: pipeline kết xuất, texture, điều hướng camera và lắp ráp cảnh.
- `universe/`: danh mục thiên thể, hành tinh, quỹ đạo, vệ tinh, Ngân Hà và chuyển động mô phỏng.
- `earth/`: chiếu sáng ngày đêm, lớp mây và khí quyển của Trái Đất.
- `ui/`: các điều khiển gốc, bảng giải thích, nhãn và chọn đối tượng (picking).

Texture, shader, seed, tốc độ chuyển động, ngưỡng thu phóng, độ lệch ống kính và tham số bloom gốc đều được giữ nguyên. Shell/CSS của trang gốc không thay đổi trong giai đoạn một.

### Đối chiếu tự động

Dựng cảnh riêng bằng script trước tái cấu trúc và bằng các module mới, với cùng texture, cùng seed ngẫu nhiên, chiều rộng desktop 1440 pixel, lần lượt thực hiện bốn bước: khởi tạo, chuyển động 1×, chuyển động 20×, tạm dừng. Các kết quả sau hoàn toàn trùng khớp:

- Vị trí, góc quay, tỉ lệ, fragment shader và số đối tượng con của mười thiên thể.
- Góc quay lớp mây; vị trí, góc quay và số đối tượng con của mô hình trạm vũ trụ.
- Bán kính quỹ đạo, pha, tốc độ, vị trí và quaternion của toàn bộ 32 vệ tinh.
- SHA-256 của mọi buffer Ngân Hà và sao nền, cùng buffer đỉnh của tám quỹ đạo hành tinh.

Bản build sau lần tái cấu trúc đầu tiên thành công: 13 texture nhúng, HTML tự chứa khoảng 8,81 MB.

### Ngưỡng nghiệm thu trên trình duyệt

Trước khi bắt đầu phát triển EarthSense, bản tái cấu trúc đã được nghiệm thu trên Chrome với các hạng mục dưới đây, tất cả đều đạt. Viewport nội dung desktop là 1440 × 799 (cửa sổ trình duyệt 1440 × 900).

- Mục tiêu điều hướng, tỉ lệ và khoảng cách đến nơi của Trái Đất, phía đêm Trái Đất, Trạm Vũ trụ Quốc tế, Mặt Trăng, Sao Thổ, Hệ Mặt Trời, Ngân Hà đều đúng; các nút điểm đến DOM gốc của bảy hành tinh còn lại hoạt động bình thường.
- Chẩn đoán cảnh vẫn giữ tám hành tinh, 32 vệ tinh, 65.000 điểm sao Ngân Hà; lớp phủ báo lỗi của trang được ẩn.
- Công tắc quỹ đạo và đánh dấu gốc, bốn mức tốc độ trình diễn `5 → 20 → 0.25 → 1` hoạt động bình thường; khoảng cách thu phóng được kiểm chứng là `4.65 → 3.72`.
- Chế độ đắm chìm `I`, trợ giúp `?`, hộp thoại nguồn tư liệu, `H` quay về Trái Đất, phím cách để tạm dừng và tiếp tục đều hoạt động bình thường.
- Trang độc lập kiểm chứng việc tạm dừng ban đầu khi bật reduced-motion: lúc khởi tạo và sau một giây đều ở góc nhìn Trái Đất, khoảng cách khoảng `4.65`, `paused: true`, không có chuyến bay.
- Console của bản gốc và bản tái cấu trúc đều có cùng một cảnh báo bảo mật unique-origin của `file://`, không có lỗi JavaScript hay WebGL.

Ảnh chụp từng giai đoạn được lưu tại `/private/tmp/orbit-baseline-earth.png`, `/private/tmp/orbit-refactor-earth.png` và các tệp `-paused-earth.png` tương ứng. Những ảnh này dùng để kiểm tra cảnh và hình ảnh; do thời điểm lấy mẫu khác nhau nên không dùng để đối chiếu từng pixel.

### Kiểm thử tự động điều hướng

Giai đoạn một hoàn thành 18 kiểm thử hành vi gốc trước, tất cả đạt rồi mới bắt đầu EarthSense: khoảng cách đến nơi và trạng thái được chọn của 13 điểm đến gốc, bám quỹ đạo chính xác, vị trí khi tạm dừng, giới hạn trên dưới của thu phóng, ngắt chuyến bay và xử lý điểm đến không hợp lệ.

Sau khi hoàn thành chức năng trạng thái camera ở giai đoạn hai, chạy:

```sh
node --test tests/navigation.test.js tests/picking.test.js
```

Tổng cộng 29 kiểm thử đạt, gồm 26 kiểm thử điều hướng và 3 kiểm thử chọn đối tượng. Các kiểm chứng mới bao gồm:

- Lưu và khôi phục ngay camera, mục tiêu quan sát, thiên thể được chọn và phạm vi điều khiển.
- Chuyển chế độ khi chuyến bay còn 1.950 mili giây, khôi phục sau 10 giây, vẫn tiếp tục hoàn thành chuyến bay gốc theo đúng 1.950 mili giây còn lại.
- Hướng định vị địa lý tại Greenwich, kinh độ 90° Đông, Bắc Cực và trên Trái Đất đã tự quay đều khớp với tọa độ texture hình cầu hiện có; khoảng cách nhìn gần không thấp hơn khoảng cách an toàn gốc `1.13`.
- Sau khi sự kiện thiên tai được chọn và xử lý, điều hướng Trái Đất bên dưới không bị kích hoạt thêm lần nữa; các cú nhấp chưa được xử lý vẫn giữ cơ chế chọn thiên thể gốc; thao tác kéo và cử chỉ hai ngón không kích hoạt nhầm sự kiện.

### Kiểm chứng nghiệp vụ và hình học EarthSense

`node --test tests/navigation.test.js tests/picking.test.js tests/earthsense.test.js` có tổng cộng 39 kiểm thử đạt; 10 kiểm thử EarthSense mới dùng hình học Three.js thực và nguồn dữ liệu có thể điều khiển, bao quát:

- Không có yêu cầu nào khi thoát chế độ; bật lớp và chế độ nhiều lần sẽ tái sử dụng bộ nhớ đệm còn mới, chỉ làm mới khi đã hết hạn.
- Tắt lớp hoặc thoát chế độ sẽ hủy yêu cầu; phản hồi cũ đến muộn không thể ghi đè kết quả của phiên mới.
- Khi làm mới thất bại vẫn giữ sự kiện và thời gian cập nhật của lần thành công gần nhất; thất bại lần đầu, kết quả rỗng và thành công một phần hiển thị các trạng thái khác nhau.
- Phiên chế độ khôi phục đầy đủ ảnh chụp điều hướng, thời gian bay còn lại, trạng thái tạm dừng, tốc độ và công tắc quỹ đạo/nhãn gốc.
- Các lớp được gắn dưới lưới Trái Đất hiện có, chỉ tạo đối tượng kết xuất khi đã vào cận cảnh Trái Đất và dữ liệu sẵn sàng; ẩn ngay khi ở góc nhìn Ngân Hà hoặc khi đóng chế độ.
- Hình học Trái Đất hiện có đóng vai trò vật che khuất: sự kiện ở mặt trước có thể nhấp được, sự kiện ở mặt sau không thể bị nhấp xuyên qua quả cầu.


## Nghiệm thu tích hợp 1.1.0 (lịch sử)

Ngày 2026-09-07 (UTC+8) hoàn thành `npm test`, tất cả **51 kiểm thử đạt**: 12 kiểm thử thích ứng dữ liệu và HTTP, 10 EarthSense, 26 điều hướng, 3 chọn đối tượng. `npm run build` tạo `index.html` tự chứa khoảng **8,86 MB**, vẫn nhúng 13 texture gốc.

Ngoài ra dùng Chrome headless độc lập, desktop 1440 × 900 và điện thoại 390 × 844, mở sản phẩm build thực tế qua `file://` và hoàn thành các kiểm tra tương tác thực sau:

- Open-Meteo, USGS, NASA EONET, GDACS đều trả về kết quả thành công; khi bật đồng thời thời tiết và trường gió chỉ phát một yêu cầu thời tiết 60 điểm.
- Nhấp chuột thực lên đánh dấu thiên tai trên Trái Đất mở đúng chi tiết tương ứng, camera giữ nguyên cận cảnh hiện tại, không kích hoạt hành động bay về mặc định của Trái Đất bên dưới; nút phóng to tiếp cận sự kiện gần hơn.
- Nhấp thực lên đánh dấu thời tiết hiển thị nhiệt độ, tốc độ gió, lượng mây và lượng mưa tích lũy; các đoạn đường trường gió cũng có thể nhấp để xem nguồn.
- Ô tìm kiếm sự kiện không kích hoạt phím tắt H / I / F; có thể tìm theo tên loại thiên tai bằng ngôn ngữ giao diện.
- Chuyển sang Sao Mộc sẽ thu gọn lớp Trái Đất và chi tiết; thoát chế độ cảm nhận khôi phục góc nhìn Sao Thổ, khoảng cách, trạng thái tạm dừng, tốc độ 20× và công tắc quỹ đạo/đánh dấu trước đó.
- Lần đầu vào trên điện thoại, danh sách sự kiện được thu gọn, không tràn ngang; góc nhìn Trái Đất chừa không gian phía trên cho bảng, thoát ra thì khôi phục độ lệch ống kính gốc.
- Khi toàn bộ nguồn dữ liệu mô phỏng trả về HTTP 503 sẽ hiển thị lỗi rõ ràng, không xuất hiện thiên tai giả, chế độ du hành vũ trụ vẫn khởi tạo và khôi phục bình thường.
- Khi truy cập dữ liệu công khai thực tế không có lỗi JavaScript, WebGL hay lỗi yêu cầu dữ liệu công khai; các kịch bản lỗi bổ sung cũng không có ngoại lệ JavaScript.

Khi EarthSense hiển thị, vệ tinh, trạm vũ trụ và đường quỹ đạo tạm thời được thu gọn để tránh che bề mặt; sau khi thoát sẽ khôi phục theo quy tắc hiển thị gốc. Khi phóng to sâu, ký hiệu sự kiện được thu nhỏ để giảm chồng lấn ở vùng dày đặc. Các điều chỉnh hiển thị này của EarthSense đối với cảnh hiện có đều được hoàn nguyên khi thoát chế độ.

## Nâng cấp hình ảnh EarthSense 1.2.0 (lịch sử)

Đợt này, theo phạm vi mới nhất, chỉ đăng ký ba lớp thời tiết, sét, bão nhiệt đới; danh sách hỗ trợ tìm kiếm điểm lấy mẫu thời tiết và ưu tiên sắp xếp bão, sét, thời tiết. Nguồn dữ liệu công khai lúc chạy được thu hẹp còn Open-Meteo, EONET `severeStorms`, GDACS `TC`; mã nguồn lịch sử của các lớp và adapter khác được giữ tạm, hiện không đăng ký hay gửi yêu cầu.

Trên cấu trúc Trái Đất và lớp hiện có, bổ sung các cách thể hiện sau:

- Mã thời tiết, lượng mây và dữ liệu mưa của điểm lấy mẫu thời tiết điều khiển các cụm mây cục bộ và vệt mưa; hiệu ứng sét của thời tiết thực chỉ được kích hoạt bởi mã `95 / 96 / 99`. Lớp sét độc lập vẫn là 6 điểm dông mô phỏng được ghi chú rõ ràng.
- Bão dùng tâm sự kiện thực và cấp cảnh báo của nguồn, tạo hệ mây minh họa có mắt bão, thành mắt bão, dải mây xoáy và hạt, tiếp tục hiển thị quỹ đạo từ nguồn; hình dạng và bán kính mây không thể hiện ảnh vệ tinh thực hay vùng gió chính thức.
- Texture ngày đêm 8K cùng nguồn được dùng theo nhu cầu cho chế độ cảm nhận. Desktop ưu tiên 8192 × 4096, bố cục điện thoại / thiết bị ít bộ nhớ ưu tiên 4096 × 2048, chịu ràng buộc bởi giới hạn texture GPU; khi năng lực không đủ hoặc tải thất bại thì giữ bản 2K gốc. Thoát chế độ cảm nhận khôi phục texture, hình học và tham số thể hiện gốc.

Đã hoàn tất kiểm tra tài nguyên: ảnh ngày 8K gốc chính thức nặng 4.565.076 byte, ảnh đêm 3.144.468 byte, đều là JPEG 8192 × 4096; tải về không chỉnh sửa, phóng to hay nén lại. Sau khi thêm hai bản ghi manifest, số byte và SHA-256 của toàn bộ 16 tệp texture nguồn đều khớp, các tệp 2K gốc giữ nguyên. Cấu hình build hiện nhúng 15 texture.

### Các kiểm tra tích hợp đã hoàn thành

Ngày 2026-09-07 (UTC+8) chạy `npm test` lần cuối, **69 kiểm thử đạt**, bao quát hành vi gốc cùng hiệu ứng thời tiết, hình học / chọn đối tượng bão, lựa chọn năng lực texture độ phân giải cao, khôi phục Trái Đất gốc và dự phòng khi tải thất bại. `npm run build` cuối cùng thành công, tạo HTML tự chứa khoảng **18,69 MB**, nhúng **15 texture**.

Biên bản tích hợp đợt này trên Chrome headless độc lập gồm **9 hạng mục đạt, 0 lỗi**, kết quả lưu tại `/private/tmp/orbit-three-layer-results.json`:

- Trang chỉ có ba nút lớp thời tiết, sét, bão; 60 điểm lấy mẫu Open-Meteo thực và bão tổng hợp từ GDACS / EONET đều vào trạng thái `ready`.
- Trong nhật ký yêu cầu, các endpoint dữ liệu EarthSense chỉ gồm Open-Meteo, GDACS `TC`, EONET `severeStorms`; các nguồn động đất, núi lửa, cháy rừng, lũ lụt không có yêu cầu nào.
- Desktop thực sự tải texture ngày đêm Trái Đất rộng 8192 pixel, tỉ lệ lấy mẫu kết xuất ở chế độ cảm nhận là 1,5; nhấp thực lên canvas hệ mây bão mở đúng sự kiện nguồn.
- Rời Trái Đất thì thu gọn hiệu ứng; thoát chế độ cảm nhận khôi phục mục tiêu Sao Thổ, khoảng cách camera, trạng thái tạm dừng, tốc độ 5×, thiết lập quỹ đạo và nhãn gốc, đồng thời khôi phục texture 2K và tỉ lệ lấy mẫu kết xuất gốc 1.
- Ở viewport kích thước điện thoại 390 × 844, DPR thiết bị mô phỏng là 3, thực tế dùng texture rộng 4096 pixel và tỉ lệ lấy mẫu kết xuất 2; ba công tắc nằm trên cùng một hàng, trang không tràn ngang.
- Kiểm tra thời tiết có định hướng dùng **fixture kiểm thử** đặt lần lượt mã thời tiết `95` và `61`, kiểm chứng hiệu ứng dông, mưa và hiển thị chỉ số nguồn; các điểm kiểm thử này không đại diện cho thời tiết thực tại địa phương lúc đó. Sét mô phỏng độc lập vẫn giữ cung sét tĩnh nhìn thấy được khi bật reduced-motion.
- Khi mô phỏng yêu cầu dữ liệu công khai trả về HTTP 503 sẽ hiển thị rõ trạng thái không khả dụng, chế độ du hành vũ trụ vẫn dùng được; cả truy cập nguồn thực lẫn kịch bản sự cố đều không có lỗi JavaScript hay shader.

Lấy mẫu `requestAnimationFrame` của Chrome headless trên máy này ở cả viewport desktop và kích thước điện thoại đều khoảng 60 fps. Hai viewport chạy trên cùng một máy desktop, kết quả này không đại diện cho hiệu năng phần cứng điện thoại thực.

Đã hoàn thành kiểm tra lại có định hướng trên Chrome sau lần tinh chỉnh cuối cho cụm mây và bão, `errors` trong `/private/tmp/orbit-final-effects-results.json` rỗng. Ảnh chụp hệ mây bão và các trạng thái sét lóe / nghỉ / tĩnh đã được rà soát hình ảnh: cung điện trên đỉnh mây nhìn thấy được, trạng thái lóe và nghỉ phân biệt được, reduced-motion giữ cung điện tĩnh, nhấp canvas cụm mây vẫn mở được chi tiết sự kiện.

## 1.3.0 Trái Đất độ phân giải cao dùng chung và đường đi bão chính thức (lịch sử)

Đợt này giữ ba lớp, Trái Đất Three.js gốc và các nguồn dữ liệu công khai, hoàn thành các điều chỉnh sau trên chức năng hiện có:

- Chế độ du hành vũ trụ và chế độ cảm nhận dùng chung bản đồ nền ngày đêm độ phân giải cao và hình học Trái Đất chia mịn; sau khi khởi động sẽ chuẩn bị bất đồng bộ texture 8K cho desktop / 4K cho bố cục điện thoại, khi năng lực không đủ hoặc tải thất bại thì giữ 2K. Chuyển chế độ không còn hạ cấp bản đồ nền, giữ shading ngày đêm gốc và tham số bloom gốc `.42 / .65 / 1.18`, hai chế độ dùng cùng chiến lược lấy mẫu kết xuất.
- Cận cảnh Trái Đất ở chế độ cảm nhận tắt lớp mây trang trí cố định; mã trời quang / gần như quang `0 / 1` không tạo mây, mưa hay sấm sét cục bộ, các kiểu thời tiết khác được thể hiện theo lượng mây và mã thời tiết của nguồn.
- Quy đổi mm/h từ lượng mm tích lũy và khoảng thời gian tính bằng giây của nguồn, điều khiển liên tục mật độ, tốc độ, độ dài và phạm vi vệt mưa; thiếu khoảng thời gian hợp lệ thì không tự tạo cường độ mưa. Chỉ mã dông `95 / 96 / 99` kích hoạt sét; khi cường độ mưa tăng, chu kỳ minh họa rút ngắn từ khoảng 18 giây xuống 4 giây. Đây là ánh xạ hình ảnh, không phải tần suất sét do nguồn quan trắc; lớp sét độc lập vẫn là 6 điểm mô phỏng được ghi chú rõ ràng.
- Bán kính hình ảnh và tốc độ xoay của hệ mây bão minh họa thay đổi liên tục theo km/h của nguồn. Giá trị lớn nhất trong danh sách GDACS được ghi rõ là `event-maximum`; sau khi chọn chỉ dùng timeline để cập nhật sức gió tại điểm quan trắc hiện tại được xác định rõ. `kts` của EONET nhân 1,852, `m/s` của timeline GDACS nhân 3,6; đơn vị không rõ và giá trị thiếu không được coi là tốc độ gió hợp lệ.
- Chỉ sau khi chọn một cơn bão GDACS mới yêu cầu bản tin được chọn và timeline công khai của nó; đường liền lịch sử, đường nét đứt dự báo và các mốc thời gian có thể nhấp đều giữ nguồn, thời gian bản tin, tọa độ, tốc độ gió và thời gian hiệu lực. Chỉ hiển thị dự báo mà bản tin hiện tại nêu rõ; khi thiếu mốc quan trắc hiện tại / số hiệu bản tin thì ẩn dự báo và giải thích, bản ghi ở cùng vị trí giữa bản tin cũ và bản tin hiện tại không ghi đè lẫn nhau. Không chuyển dự báo thành lịch sử theo giờ hiện tại của máy, không ngoại suy bất kỳ đoạn đường đi nào bị thiếu.
- EONET chỉ hiển thị các vị trí lịch sử từ nguồn, nói rõ không có dự báo chính thức. Các trường hợp không có đường đi, chỉ có lịch sử, đang tải và lỗi mạng được xử lý riêng.
- Đóng chi tiết, tắt lớp tương ứng, chọn sự kiện khác, rời cận cảnh Trái Đất hoặc chuyển chế độ đều hủy yêu cầu đường đi đã chọn và xóa tuyến; phản hồi đến muộn không thể mở lại chi tiết đã đóng. Sự kiện / bản tin / thời gian sự kiện cùng quyết định khóa bộ nhớ đệm của đường đi.

### Kiểm tra định hướng hợp đồng dữ liệu

Các mẫu NOAA MARIE và JTWC KROVANH thực lấy từ endpoint chính thức của GDACS ngày 2026-09-06 UTC lần lượt chứa **18 điểm lịch sử + 8 điểm dự báo** và **18 điểm lịch sử + 7 điểm dự báo**; endpoint bản tin và timeline đều trả về HTTP 200 kèm `Access-Control-Allow-Origin: *`. Tốc độ gió timeline của MARIE sau khi nhân 3,6 khớp từng điểm với biểu đồ km/h của bản tin chính thức. Các mẫu chỉ dùng cho kiểm thử, không làm dữ liệu dự phòng lúc chạy; nguồn gốc xem `tests/fixtures/README.md`.

**9 kiểm tra định hướng** của `node --test tests/cyclone-data.test.js` đều đạt, bao quát đơn vị, thời gian UTC, tách lịch sử / dự báo thực, khớp nhiều bản tin, thiếu quan trắc hiện tại, không ngoại suy khi không có dự báo, kiểm tra URL chính thức và bản tin, làm mới bộ nhớ đệm, hủy yêu cầu và lỗi truyền tải.

### Kiểm chứng tích hợp đã hoàn thành

Ngày 2026-09-07 (UTC+8) chạy `npm test`, **92 kiểm thử đạt**; `npm run build` tạo `index.html` tự chứa khoảng **18,70 MB**, nhúng **15 texture**. Con số 69 kiểm thử và 18,69 MB của mục 1.2.0 phía trên là kết quả lịch sử.

Kiểm tra tích hợp Chrome desktop **9 hạng mục đạt**, `errors` trong `/private/tmp/orbit-v13-results.json` rỗng; kiểm tra lại có định hướng cho viewport điện thoại và sét động **5 hạng mục đạt**, `errors` trong `/private/tmp/orbit-v13-final-results.json` cũng rỗng. Phạm vi kiểm tra:

- Trên desktop, hai chế độ dùng chung texture ngày đêm Trái Đất rộng 8192 pixel và tỉ lệ lấy mẫu kết xuất 1,5, giữ ánh sáng phía đêm gốc; chuyển về vũ trụ vẫn giữ độ phân giải cao và khôi phục lớp mây trang trí. Viewport điện thoại dùng texture 4K chung.
- Cận cảnh Trái Đất ở chế độ cảm nhận ẩn lớp mây trang trí; với mã trời quang / gần như quang `0 / 1`, mây thủ tục, vệt mưa và sét đều bằng không.
- Kiểm tra thời tiết có định hướng dùng **fixture kiểm thử**: dông 32 mm/h có nhiều vệt mưa hơn và chu kỳ sét minh họa ngắn hơn so với dông 0,6 mm/h, lần lượt khoảng 4,80 giây và 13,16 giây; cùng cường độ mưa nhưng thời gian tích lũy khác nhau cho cùng cường độ hiệu ứng, mưa thường không sinh sét. Các giá trị kiểm thử này không đại diện cho thực tế tại địa phương lúc đó. 6 cường độ mưa mô phỏng của lớp sét độc lập tương ứng 6 chu kỳ khác nhau, vẫn giữ nhãn mô phỏng.
- Các cơn bão GDACS đọc trực tuyến có tốc độ gió nguồn và bán kính hệ mây khác nhau. Chỉ sau khi chọn MARIE mới yêu cầu bản tin chính thức và timeline của lần đó, hiển thị 18 điểm lịch sử, 8 điểm dự báo, các thời điểm dự báo thực và nguồn; sức gió hiện tại được cập nhật từ giá trị lớn nhất của sự kiện sang giá trị quan trắc hiện tại của bản tin.
- Cả desktop và điện thoại đều nhấp canvas thực lên điểm thời gian dự báo, hiển thị thời gian hiệu lực và tốc độ gió từ nguồn của điểm đó. Lần kiểm tra lại cuối trên điện thoại còn xác nhận tọa độ phía trên ứng với đúng điểm dự báo được nhấp, thao tác phóng to dùng vị trí của điểm đó và không có lỗi JavaScript. Đóng chi tiết thì xóa đường đi, chọn lại thì tái sử dụng bộ nhớ đệm; trên điện thoại sau khi mở danh sách sự kiện vẫn chọn bão bình thường, chi tiết giữ sức gió và chú giải tuyến, đồng thời chừa không gian cho vị trí quan sát Trái Đất.
- Trình tự thời gian theo cường độ mưa mới kết xuất trên GPU lần lượt ra khung sáng khi sét và khung tối khi nghỉ; cảnh định hướng cuối cùng không có lỗi JavaScript hay shader.

Kiểm tra bố cục điện thoại chạy trên viewport kích thước điện thoại của máy desktop, không đại diện cho hiệu năng phần cứng điện thoại thực; đợt này không đưa ra kết luận về tốc độ khung hình trên điện thoại.

## 1.4.0 Tinh chỉnh hình ảnh hệ mây

Hiệu ứng thời tiết tiếp tục được đổi thành mây mỏng dạng mặt cong, mỗi điểm lấy mẫu có mây gộp ba mảnh, bổ sung nhiễu méo chuyển động liên tục, đường viền tan dần không đều, chiếu sáng theo hướng Mặt Trời và ánh sáng bên trong mây dông. Trời quang, cường độ mưa, mã dông, nhãn mô phỏng và phạm vi lấy mẫu 60 điểm giữ nguyên; không ghép các mảnh mây thành một trường mây toàn cầu liên tục chưa được quan trắc.

Bão được đổi thành hai lớp mây mỏng và thành mắt bão nhấp nhô thấp, giữ mắt bão mở; các dải mây xoắn ốc có độ rộng, độ dài và cấu trúc sự kiện khác nhau, các sợi mây bên trong chuyển động độc lập với chuyển động xoay tổng thể, kèm tia điện minh họa cục bộ thưa thớt. Tốc độ gió từ nguồn vẫn chỉ điều khiển tỉ lệ hình ảnh và tốc độ xoay; hình dạng mây, bán kính hình ảnh của hệ mây và tần suất tia điện không được khẳng định là quan trắc thực. Đường đi lịch sử / dự báo chính thức cùng thời gian, sức gió, cơ chế hủy và hợp đồng bộ nhớ đệm giữ nguyên.

Bộ kết xuất thời tiết dùng một texture nhiễu đơn kênh 256 × 256 (64 KiB) được tạo lúc khởi tạo để các mảnh mây lấy mẫu dùng chung, giảm tính hash lặp lại trên từng fragment mà vẫn giữ chuyển động của lớp mây. Điều chỉnh triển khai này không có nghĩa là đã chứng minh tốc độ khung hình tăng.

### Kiểm chứng đợt này

Ngày 2026-09-07 (UTC+8) chạy `npm test`, **93 kiểm thử đạt**; `npm run build` tạo HTML tự chứa khoảng **18,71 MB**, nhúng **15 texture**. Nhiễu thủ tục được tạo lúc chạy, không làm tăng số ảnh nguồn được nhúng.

Biên bản kiểm tra lại kết xuất cuối cùng `/private/tmp/orbit-v14-final-results.json` gồm **9 hạng mục đạt**, `errors` rỗng. Để trạng thái hình ảnh có thể tái lập, kiểm tra dùng **thời tiết kiểm thử và bản ghi bão công khai đã lưu trước đó**; nó kiểm chứng kết xuất và tương tác, không có nghĩa đợt này đã lấy được giá trị khí tượng thời gian thực mới. Các kiểm tra gồm:

- Hình ảnh động của mây mỏng thời tiết và hệ mây bão đều tạo ra thay đổi pixel giữa các khung; khi bật reduced-motion, pixel lớp mây giữa hai khung của cùng cảnh giữ nguyên.
- Nhấp canvas thực vẫn chọn được mây thời tiết dạng mặt cong; bão giữ 18 điểm lịch sử và 8 điểm dự báo từ bản ghi công khai.
- Vệt mưa và sét hiển thị đúng dưới lớp mây nông mới, đã kiểm tra riêng khung sáng và khung tối khi nghỉ.
- Viewport điện thoại dùng Trái Đất 4K, nhấp canvas vào thời tiết, bão và điểm dự báo đều dùng được, không tràn ngang.
- Cảnh tích hợp cuối cùng không có lỗi JavaScript hay shader.

Ngoài ra đã hoàn thành một kiểm tra định hướng độc lập bằng `/private/tmp/orbit-browser/cloud-v14-arm-pick.mjs`: nhấp thực lên dải mây bão phía bắc, tránh đánh dấu ở tâm, chọn đúng sự kiện GDACS, danh sách lỗi rỗng; hạng mục này không tính vào 9 hạng mục của tệp JSON nói trên.

Ảnh chụp bão trên desktop và điện thoại `/private/tmp/orbit-v14-cyclone.png`, `/private/tmp/orbit-v14-mobile-cyclone.png` đã được rà soát hình ảnh: hệ mây không còn vòng thành mắt bão trắng dày hay các gai tỏa tia như trước, giữ mắt bão mở, dải mây bán trong suốt và cấu trúc xoắn với độ rộng khác nhau. Ảnh thời tiết cận cảnh, toàn cảnh và phía đêm cũng đã được rà soát, không thấy viền cắt hình chữ nhật hay vân lưới tam giác.

Kiểm tra A/B trên Chrome headless cùng máy `/private/tmp/orbit-v14-performance.json` dùng cùng một cảnh kiểm thử: khi bật / tắt lớp mây thời tiết, cả cận cảnh và toàn cảnh đều khoảng 30 fps, không đo được sụt giảm tốc độ khung hình do bật lớp mây thời tiết mới. Đợt này không dựa vào đó để tuyên bố cải thiện hiệu năng; kiểm chứng bố cục điện thoại vẫn chạy trên viewport kích thước điện thoại của máy desktop, không thể suy ra hiệu năng phần cứng điện thoại thực.
