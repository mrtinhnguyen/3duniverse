# Khảo sát hình nền Du Hành Vũ Trụ cho màn hình nhỏ và màn hình phụ mặt sau của Xiaomi

Ngày khảo sát: 2026-09-08. Phạm vi: màn hình phụ mặt sau của Xiaomi 17 Pro / Pro Max, đồng thời tính đến điện thoại thông thường và các màn hình nhỏ khác. Model máy và phiên bản hệ thống chưa được người dùng xác nhận. Tài liệu này là đề xuất về sản phẩm và triển khai, chưa được kiểm chứng trên máy Xiaomi thật; đợt này không sửa đổi chức năng của ứng dụng.

## Đề xuất

Giữ "Ẩn giao diện" hiện có làm chế độ xem trước thuần, bổ sung "Tạo hình nền": chọn màn hình đích → điều chỉnh thiên thể và bố cục → xem trước vùng hiển thị → xuất ảnh hoặc video ngắn → đặt làm hình nền trong hệ thống điện thoại.

Ưu tiên triển khai xuất ảnh và bố cục theo model máy, sau đó mới triển khai xuất video ngắn. Việc chạy toàn bộ trang web Du Hành Vũ Trụ theo thời gian thực trên màn hình phụ mặt sau là một hướng thử nghiệm riêng, không phải bước bắt buộc với người dùng thông thường.

## Các thông số thiết bị đã xác minh

| Thiết bị | Kích thước màn hình phụ mặt sau chính thức | Độ phân giải chính thức | Ảnh hưởng đến Du Hành Vũ Trụ |
| --- | --- | --- | --- |
| Xiaomi 17 Pro | 2,7 inch, đường chéo hình chữ nhật tiêu chuẩn | 904 × 572 | Preset riêng, không thể dùng thẳng ảnh chụp màn hình dọc của điện thoại |
| Xiaomi 17 Pro Max | 2,9 inch, đường chéo hình chữ nhật tiêu chuẩn | 976 × 596 | Preset riêng, không thể chỉ đổi tên tệp ảnh của bản Pro |

Trang thông số chính thức của cả hai model đều ghi rằng vùng hiển thị thực tế nhỏ hơn hình chữ nhật tiêu chuẩn. Ảnh sản phẩm chính thức cho thấy cụm camera ở bên trái, vùng hiển thị chính ở bên phải. Độ phân giải hình chữ nhật đầy đủ không thể coi là canvas không bị che khuất, và cách ánh xạ xoay / cắt khi nhập ảnh vẫn cần xác nhận trên máy thật. Các thông số được đọc sau khi trang chính thức tải động xong, không chỉ dựa vào đoạn tóm tắt của công cụ tìm kiếm. [Thông số chính thức Pro](https://www.mi.com/prod/xiaomi-17-pro/specs), [Thông số chính thức Pro Max](https://www.mi.com/prod/xiaomi-17-pro-max/specs)

Theo tin tức công nghệ ngày 2025-12-10, Xiaomi đã chính thức ra mắt hình nền màn hình phụ mặt sau dạng ảnh động / video, đường dẫn là "Cài đặt → Màn hình phụ mặt sau → Cá nhân hóa màn hình phụ → Hình nền tùy chỉnh" (tên mục có thể khác tùy ngôn ngữ hệ thống). Vì vậy, các hướng dẫn cũ kiểu thay thế tệp không nên trở thành quy trình cài đặt mặc định của ORBIT. Bằng chứng này đến từ bài báo tường thuật thông báo chính thức, chưa tìm được bài đăng gốc chính thức có thể truy cập độc lập.

Hiện chưa xác minh được thời lượng video tối đa, giới hạn dung lượng tệp, giới hạn tốc độ khung hình, chính sách tự lặp, hành vi tiếp tục phát khi tắt màn hình và quy tắc cắt áp dụng thống nhất cho mọi phiên bản hệ thống. Không thể hứa hẹn "tự lặp suốt cả ngày" hay "áp dụng một chạm trên mọi hệ thống". Một module tăng cường của cộng đồng (REAREye) liệt kê rõ các chức năng gỡ giới hạn thời lượng video, giới hạn tốc độ khung hình và ép lặp, cho thấy các hành vi này thực sự khác nhau giữa các hệ thống, nhưng đó không phải tài liệu thông số của nhà sản xuất.

## Đánh đổi giữa ba hướng

| Hướng | Thao tác của người dùng | Chi phí chính | Đề xuất |
| --- | --- | --- | --- |
| Ảnh PNG | Tải về, chọn từ thư viện ảnh hệ thống làm hình nền màn hình phụ mặt sau | Bố cục, thích ứng cắt ảnh | Phương án mặc định giai đoạn một |
| Video MP4 không tiếng | Tải về, nhập vào hình nền video tùy chỉnh của hệ thống | Tương thích mã hóa, mối nối của đoạn ngắn, giới hạn thời lượng của hệ thống | Giai đoạn hai, gần nhất với hiệu ứng thiên thể xoay chậm |
| Trang web thời gian thực / ứng dụng gốc cho màn hình phụ | Ứng dụng bổ sung hoặc tích hợp hệ thống | Quyền, vòng đời, tiêu thụ pin, thích ứng phiên bản | Khám phá riêng, không phải điều kiện tiên quyết của chức năng hình nền |

Trình duyệt có thể tạo và chia sẻ tệp, nhưng đợt này không tìm thấy giao diện công khai nào cho trang web thông thường để đặt trực tiếp hình nền màn hình phụ mặt sau của Xiaomi. Menu chia sẻ không tương đương với giao diện cài đặt cho màn hình phụ. [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)

WallpaperService của Android là điểm vào gốc cho hình nền động, nhưng điều đó không tự động chứng minh màn hình phụ mặt sau của Xiaomi sẽ chấp nhận dịch vụ hình nền thông thường của bên thứ ba. Tài liệu thích ứng Flip công khai của Xiaomi có phương pháp nhận diện thiết bị có màn hình phụ, nhưng chủ yếu dành cho việc thích ứng ứng dụng trên thiết bị gập, không thể coi là SDK hình nền màn hình phụ của 17 Pro. [Android WallpaperService](https://developer.android.com/reference/android/service/wallpaper/WallpaperService), [Tài liệu thích ứng Xiaomi Flip](https://dev.mi.com/xiaomihyperos/documentation/detail?pId=2026)

Để tham khảo tính khả thi: MiRearScreenSwitcher dùng Shizuku để chuyển ứng dụng sang màn hình phụ mặt sau; dự án đã được lưu trữ (archived) vào 2026-04-30. Công cụ tạo thẻ REAREye thì dựa vào module LSPosed / Xposed để nhập thẻ MAML. Chúng cho thấy cộng đồng có giải pháp hiển thị thời gian thực, đồng thời cũng cho thấy đây không phải vấn đề có thể giải quyết chỉ bằng bố cục responsive của một trang web thông thường.

## Giao diện phù hợp với Du Hành Vũ Trụ

Giữ lối vào gốc để ẩn toàn bộ giao diện bằng một chạm, thêm lối vào "Tạo hình nền", tránh buộc người chỉ muốn duyệt ở chế độ đắm chìm phải vào trình chỉnh sửa.

Bảng tạo hình nền chỉ giữ bốn nhóm thao tác:

1. Màn hình: điện thoại dọc, màn hình phụ mặt sau 17 Pro, màn hình phụ mặt sau 17 Pro Max, hình vuông, chiều rộng / chiều cao tùy chỉnh.
2. Nội dung: thiên thể hiện tại; đợt đầu đề xuất Trái Đất, Mặt Trăng, Sao Thổ và hố đen.
3. Bố cục: giữa, lệch phải, cận cảnh cục bộ; có thể kéo vị trí, thu phóng chủ thể, chuyển giữa nền đen tuyền / ít sao.
4. Xuất: lưu ảnh; thiết bị vượt qua kiểm tra năng lực được cung cấp thêm video ngắn. Sau khi tải xong hiển thị đường dẫn cài đặt trong hệ thống.

Vùng xem trước hiển thị vùng tránh camera, góc bo và chỗ giữ chỗ đồng hồ tùy chọn; tệp xuất ra không chứa các hình phụ trợ này, không chứa điều khiển, chữ hay watermark của ORBIT. Chỗ giữ chỗ đồng hồ chỉ dùng để bố cục, thời gian thực do hệ thống điện thoại đảm nhận.

"Lệch phải" nghĩa là thiên thể nằm ở tâm vùng hiển thị phía bên phải, không phải sát mép phải của toàn bộ ảnh. Cấu hình thiết bị phải ghi riêng kích thước canvas đầy đủ, hướng, vùng camera che khuất, vùng nội dung hiển thị và vùng tránh đồng hồ; tọa độ chính xác được đánh dấu là minh họa cho đến khi hiệu chỉnh trên máy thật, và cho phép điều chỉnh.

Đề xuất các preset hình ảnh đợt đầu:

- Phía đêm Trái Đất: quả cầu rõ nét với ánh đèn thành phố, khí quyển mỏng, ít hoặc không có sao nền.
- Sao Thổ: giữ trọn vành đai, bố cục theo đường kính ngoài của vành đai, tránh chỉ căn giữa theo quả cầu khiến vành đai bị cắt.
- Mặt Trăng: ánh sáng bên mềm, phù hợp với hình tĩnh rõ nét ở kích thước nhỏ.
- Hố đen: đảm bảo đĩa bồi tụ sáng không bị cháy sáng, giữ khoảng không gian xung quanh.

Preset màn hình phụ mặt sau mặc định ẩn đường quỹ đạo thông thường, vệ tinh, sao băng ngẫu nhiên, nhãn và lớp sự kiện thời tiết; riêng hình nền quỹ đạo chuyển động chuyên dụng vẫn giữ bản thân quỹ đạo. Vệ tinh quanh Trái Đất trong mô hình hiện tại dùng tỉ lệ minh họa được phóng to, thu nhỏ xuống màn hình phụ dễ tạo thành các vạch đen gây nhiễu. Trên đây là cấu hình hiển thị dành riêng cho hình nền, sau khi thoát sẽ khôi phục trạng thái khám phá ban đầu.

## Đề xuất xuất tệp và cơ sở triển khai

### Ảnh tĩnh

Ưu tiên xuất PNG, giữ dải chuyển màu vùng tối, điểm sao và đường viền; có thể cung cấp tùy chọn JPEG để tương thích. Kết xuất trực tiếp theo kích thước pixel đích, không dùng ảnh chụp màn hình của trình duyệt, không cắt cứng ảnh chụp màn hình dọc thành ảnh ngang. Trước tiên kiểm chứng việc nhập vào hệ thống ở độ phân giải gốc, kích thước 2 lần là tùy chọn về sau, thay vì coi "4K" là thước đo thay thế cho chất lượng trên màn hình nhỏ. [Canvas toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

`src/ui/wallpaper.js` của dự án hiện chỉ ẩn DOM và xử lý khôi phục bằng nhấp đúp, chưa có khả năng xuất. Bố cục camera của `src/core/renderer.js` vẫn chừa chỗ cho giao diện trình duyệt, kích thước đầu ra cũng gắn với cửa sổ; vòng lặp hoạt ảnh của `src/app.js` dùng thời gian thực. Nên bổ sung module bố cục và xuất hình nền độc lập, tái sử dụng thiên thể và vật liệu, tránh thay đổi góc nhìn khám phá hiện có.

Việc chụp ảnh tĩnh phải lấy khung hình sau khi một lần kết xuất hậu kỳ đầy đủ đã hoàn tất. Tài liệu chính thức của Three.js cho biết đọc canvas WebGL vào thời điểm bất kỳ có thể nhận được ảnh trống, khuyến nghị kết xuất trước rồi mới gọi toBlob. Không thay đổi hành vi xóa màn hình trên toàn cục chỉ vì chức năng chụp ảnh, để tránh sinh bóng mờ. [Hướng dẫn chụp ảnh của Three.js](https://threejs.org/manual/en/tips.html)

### Video động

Đề xuất bản đầu dùng MP4 H.264 không tiếng, 5 giây, 30 fps làm cấu hình xuất mặc định chờ kiểm chứng. Đây là lựa chọn sản phẩm của Du Hành Vũ Trụ, không phải thông số bắt buộc đã được xác nhận của Xiaomi; sau khi qua kiểm tra trên máy thật mới bổ sung các thời lượng khác.

Khung hình đầu tiên phải là thiên thể hoàn chỉnh, không thêm đoạn mở đầu, hiệu ứng hiện dần hay chuyến bay camera. Trên màn hình nhỏ chỉ dùng chuyển động nhẹ, ổn định, không thể cắt thẳng đoạn trình diễn du hành 25 giây của dự án. Với tư liệu cần lặp, phải kiểm tra trạng thái đầu và cuối của mọi thành phần nhìn thấy như texture, lớp mây, bầu trời sao, ánh sáng; không thể chỉ cho thiên thể quay một vòng rồi tuyên bố là liền mạch.

Có thể chọn chuyển động camera tuần hoàn nhẹ hoặc hoạt ảnh lặp chuyên dụng. Tự quay trọn một vòng trong năm giây thường quá nhanh; giữa tự quay chậm một chiều và vòng lặp ngắn liền mạch tuyệt đối có sự đánh đổi, cần thể hiện rõ trong phần xem trước. Việc hệ thống có phát lặp lại hay không vẫn do thiết bị quyết định.

Canvas captureStream có thể cung cấp luồng video của canvas; khả năng mã hóa của MediaRecorder phải được kiểm tra lúc chạy, và ngay cả khi kiểm tra đạt vẫn có thể thất bại do thiếu tài nguyên. Không được đổi phần mở rộng của WebM thành MP4. Khi không hỗ trợ video động thì giữ chức năng xuất ảnh tĩnh, về sau có thể đánh giá thêm phương án mã hóa độc lập. [captureStream](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream), [Kiểm tra hỗ trợ MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported_static)

Để tránh vấn đề về cảm quan của các bản quay màn hình trước đây, tệp xuất nên lấy trực tiếp từ kết quả kết xuất, tránh quay màn hình trung gian chất lượng thấp rồi nén lại; tổ chức xuất chất lượng cao theo lấy mẫu thời gian cố định. Hướng MediaRecorder thời gian thực vẫn cần kiểm tra rớt khung, không thể coi requestFrame tương đương với việc kiểm soát trục thời gian mã hóa. Sau khi mã hóa cần rà lại vùng tối, các đường mảnh, khung lặp và mối nối đầu cuối.

Ưu tiên tải về, chia sẻ tệp qua hệ thống là phần tăng cường. Web Share cần ngữ cảnh bảo mật được hỗ trợ và thao tác kích hoạt từ người dùng; việc người dùng hủy chia sẻ không được báo nhầm thành xuất thất bại. Khi điện thoại truy cập qua HTTP trong mạng LAN, không nên giả định khả năng chia sẻ giống như khi dùng HTTPS trực tuyến. [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)

## Hiệu chỉnh trên máy thật và tiêu chuẩn bàn giao

Trước khi đánh dấu một cấu hình là "đã thích ứng", cần thực hiện ít nhất một lần trên model tương ứng:

1. Nhập ảnh hiệu chỉnh có đánh dấu bốn góc, đường tâm và lưới tọa độ, xác nhận hướng tệp, tỉ lệ, vùng cắt và biên hiển thị bên phải.
2. Kiểm tra riêng việc nhập ảnh và nhập video, chúng chưa chắc dùng cùng một cách cắt.
3. Bật và tắt đồng hồ hệ thống, thông báo, xác nhận phạm vi che khuất chủ thể; kiểm tra thêm góc bo và mép ốp điện thoại.
4. Nhập đoạn video mặc định, kiểm tra các thời lượng có thể chọn, hệ thống có nén lại lần hai hay không, tốc độ khung hình phát thực tế và hiển thị khung đầu tiên.
5. Kiểm tra hành vi khi phát xong, tắt màn hình và đánh thức, nêu rõ đâu là giới hạn của hệ thống.
6. Kiểm chứng việc lưu ảnh, xuất MP4, hủy và khôi phục sau lỗi trên Mi Browser và Chrome.
7. Sau khi thoát bảng tạo hình nền, thiên thể, camera, tốc độ phát, các lớp và trạng thái Trái Đất ở chế độ cảm nhận của chế độ khám phá đều được khôi phục.

## Thứ tự phát triển

Giai đoạn một: preset màn hình có thể cấu hình + bố cục lệch phải + xem trước vùng tránh + xuất PNG + hướng dẫn áp dụng trong hệ thống.

Giai đoạn hai: xuất video ngắn + kiểm tra mã hóa + kiểm tra chất lượng lặp và nén + hiệu chỉnh thông số trên máy thật.

Giai đoạn ba: tùy nhu cầu thực tế mà lập riêng phương án ứng dụng thời gian thực cho màn hình phụ mặt sau, đánh giá điều kiện tích hợp công khai và bảo trì.

Bằng chứng hiện có đủ để chọn hướng "tạo trên web, áp dụng trong hệ thống". Tiếp tục thu thập các hướng dẫn rời rạc không thể thay thế việc kiểm chứng trên máy thật về cách cắt, thời lượng và chính sách phát; ba hạng mục này là công việc kiểm chứng có giá trị nhất ở bước tiếp theo.
