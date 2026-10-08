# Nhật ký thay đổi

## 2.0.0 · 2026-10-08

### Du Hành Vũ Trụ: bản tiếng Việt

- Đổi tên sản phẩm thành «Du Hành Vũ Trụ»; toàn bộ giao diện, danh mục thiên thể, dữ liệu sự kiện và tài liệu chuyển sang tiếng Việt, định dạng số và ngày theo `vi-VN`.
- Tìm kiếm điểm đến không phân biệt dấu (gõ «bac cuc» vẫn tìm được «Bắc Cực»); tên sự kiện từ nguồn tiếng Anh như «Tropical Cyclone …» hiển thị thành «Bão …».
- Sửa các sai lệch số liệu do bản dịch máy trước (khoảng cách thiên hà Andromeda, khối lượng Sgr A*, phân loại Kepler-22, tên chòm sao).
- Gỡ bỏ yêu cầu đếm lượt truy cập gửi tới máy chủ bên thứ ba, thẻ AdSense và liên kết GitHub.
- Bổ sung thẻ chia sẻ Open Graph / Twitter Card, ảnh chia sẻ 1200×630, favicon, JSON-LD, `robots.txt`, `sitemap.xml` và cấu hình triển khai Vercel cho `duhanhvutru.clbai.vn`.

## 1.9.0 · 2026-09-12

### Tàu vũ trụ và trình diễn quá trình triển khai

- Thêm mô hình trưng bày bên ngoài của Kính viễn vọng James Webb (JWST), gồm mười tám tấm gương chính màu vàng, giá đỡ gương phụ và năm lớp tấm chắn nắng; có thể bay vào từ lối «JWST», xoay, thu phóng và xem phát lại quá trình mở / thu gọn, hỗ trợ đảo chiều giữa chừng hoạt ảnh.
- Mô hình JWST giữ hướng thẳng đứng theo hệ tọa độ thế giới, dùng tương tác camera như thiên thể thông thường; vị trí luôn ở phía khuất Mặt Trời của Trái Đất, chuyển động quỹ đạo tuân theo nút tạm dừng. Phần phát lại triển khai là trình diễn phổ biến khoa học có thể đảo ngược và đã được rút gọn, không đại diện cho thao tác thu gọn trên quỹ đạo.
- Thêm Voyager 1, thể hiện ăng-ten độ lợi cao, khoang thiết bị, cần từ kế dài, nguồn điện đồng vị phóng xạ và Đĩa Vàng; có thể đến từ điểm đến thuộc Hệ Mặt Trời và Ngân Hà, công tắc «Quỹ đạo» điều khiển đường bay minh họa. Vị trí, tư thế và đường bay không phải lịch thiên văn thời gian thực, tư liệu xem [nguồn Voyager 1](docs/voyager-sources.md).

### Thêm nhiều thiên thể đã xác nhận

- Thêm 6 ngoại hành tinh: Proxima Centauri b, TRAPPIST-1 e/f/g, Kepler-186 f, Kepler-22 b, đồng thời bổ sung ba sao chủ TRAPPIST-1, Kepler-186, Kepler-22; điều hướng, quỹ đạo và chiếu sáng của hành tinh được liên kết với ngôi sao chủ.
- Thêm ba loại bề mặt hành tinh sinh theo thủ tục: đá, tông màu ôn hòa và vân băng; địa hình, mây mù, lớp băng và màu đại dương đều là minh họa nghệ thuật, không đại diện cho môi trường đã được quan trắc xác nhận. Bảng thông tin cung cấp tư liệu và giải thích từ NASA, xem [nguồn hành tinh mới](docs/milky-way-sources.md).
- Thêm 8 ngôi sao: Sao Bắc Cực A (Polaris A), Altair, Arcturus, Aldebaran, Deneb, Canopus, Antares A, Sao Barnard, kèm tên, loại, giới thiệu và nguồn uy tín, xem [tư liệu sao](docs/observed-stars-sources.md).
- Thêm 6 thiên hà: Thiên hà Xoáy Nước M51, Thiên hà Bode M81, Thiên hà Xì Gà M82, Thiên hà Mũ Rộng Vành M104, Centaurus A, M87; lần lượt thể hiện các cấu trúc nhánh xoắn, đĩa sao hẹp dài, đĩa mỏng với dải bụi, quầng elip, xem [tư liệu thiên hà](docs/observed-galaxies-sources.md).
- Phần tổng quan thiên hà đổi tên thành «Danh mục thiên hà», số thiên hà mở tăng từ 8 lên 14, ghi rõ các thiên thể mới thuộc những nhóm thiên hà khác nhau; giữ ID điều hướng `local-group`. Danh mục không gian sâu tăng lên 46 thiên thể: 27 nút sao, 5 hố đen, 10 ngoại hành tinh đã xác nhận và 4 hành tinh ngoài Ngân Hà hư cấu mang tính minh họa.

### Tìm kiếm, khung hình và tài liệu

- Điểm đến ở thanh dưới hỗ trợ tìm theo tên tiếng Việt, tên tiếng Anh và số hiệu danh lục sao, không phân biệt hoa thường, ký tự toàn độ rộng, khoảng trắng và dấu gạch nối; khi đổi phạm vi khám phá thì ô tìm kiếm được đặt lại, bố cục điện thoại có hàng tìm kiếm riêng.
- Danh mục thiên hà tính khung hình theo tỉ lệ cửa sổ và phạm vi của toàn bộ thiên hà; Thiên hà Mũ Rộng Vành và Centaurus A dùng góc vào cho thấy rõ dải bụi. Cận cảnh Voyager giữ chủ thể ở giữa, khi thu phóng và quay lại vẫn giữ đúng thuộc Hệ Mặt Trời / Ngân Hà.
- README hai ngôn ngữ, phiên bản gói và `ORBIT.version` được cập nhật đồng bộ lên 1.9.0; bổ sung nguồn tư liệu và ghi công cho mô hình JWST, đồng thời đưa vào các ghi chú thiết kế và khảo sát màn hình phụ trước đây chưa được commit.

### Kiểm chứng

- `npm test`: 308 bài kiểm thử đạt, bao gồm triển khai JWST và hướng kéo, điều hướng Voyager và giải phóng tài nguyên, danh mục thiên thể mới, tìm kiếm, khung hình và độ ổn định dưới OrbitControls thực.
- `npm run build`: tạo lại `index.html` độc lập có nhúng 15 texture.
- Kiểm chứng trên trình duyệt bao gồm tìm kiếm, vào và quay lại, chi tiết sao mới và hiển thị thiên hà trên máy tính lẫn điện thoại; không phát hiện lỗi hay cảnh báo trong console.

## 1.8.0 · 2026-09-09

### Chế độ màn hình và cài đặt chung

- Cung cấp ba chế độ màn hình «Du hành vũ trụ», «Cận cảnh thiên thể», «Bảo vệ màn hình quỹ đạo»; khi vào sẽ hiện nhanh hướng dẫn thao tác, chạm đúp hoặc nhấn `I` / `Esc` để thoát.
- Du hành vũ trụ giữ nguyên cảnh, hoạt ảnh và thao tác hiện tại; du hành và cận cảnh đều hỗ trợ bố cục trái / giữa / phải, sau khi thoát khôi phục khung hình của giao diện khám phá.
- Cận cảnh thiên thể hỗ trợ ngôi sao, cả năm hố đen và trọn một thiên hà; chạm ba lần vào chủ thể để chuyển, phím mũi tên để chuyển tới/lui, hỗ trợ tự động xoay vòng. Hoạt ảnh đĩa bồi tụ và dải sáng của hố đen cập nhật theo góc nhìn cận cảnh.
- Bên trong cận cảnh, quỹ đạo luôn ẩn, không ghi đè cài đặt quỹ đạo chung; khi thoát sẽ khôi phục trạng thái khám phá ban đầu và tiến độ chuyến bay đang dở.
- Bảo vệ màn hình quỹ đạo chỉ giữ ba cài đặt: hệ quy chiếu chuyển động, quỹ đạo dài/ngắn và vị trí tâm trái / giữa / phải. Chạm ba lần vào màn hình để xoay vòng giữa quỹ đạo dài Ngân Hà, ngắn Ngân Hà, dài Mặt Trời, ngắn Mặt Trời; hướng mặc định dùng chung một định nghĩa với trang chính.
- Hỗ trợ cài đặt chung cho màu không gian sâu, sao nền, vệ tinh nhân tạo / trạm vũ trụ và hiển thị quỹ đạo. Công tắc quỹ đạo đồng bộ với trang chính; khi tắt vệ tinh thì mô hình, tên và vùng nhấp nhãn của trạm vũ trụ cũng ẩn theo.
- Chế độ, thiên thể đã chọn, bố cục, công tắc chung và cấu hình xoay vòng được lưu trong trình duyệt hiện tại, đồng thời dọn sạch các cấu hình màn hình thủ công đã bị loại bỏ.

### Màn hình nhỏ và cử chỉ

- Tự thích ứng với kích thước cửa sổ thực và hướng ngang/dọc, không cần chọn cấu hình điện thoại, màn hình phụ hay đồng hồ; cửa sổ vuông được phủ kín theo tỉ lệ 1:1.
- Cửa sổ nhỏ mặc định thu gọn điều hướng, giới thiệu và công cụ, chỉ giữ các lối vào thường dùng; «Chi tiết thiên thể» và «Khám phá và điều khiển» mở khi cần. Chọn điểm đến sẽ tự thu lại, cửa sổ lớn khôi phục bố cục ban đầu.
- Bỏ dòng chữ «Khám phá tự do» ở phía trên; ở cửa sổ rất nhỏ, phần cài đặt và điều khiển truy cập bằng cách cuộn, tránh tràn ngang.
- Một ngón để xoay, hai ngón chỉ để thu phóng; phân biệt chạm ba lần với chạm đúp để thoát, tránh vô tình chuyển thiên thể khi thu phóng.
- Nới rộng phạm vi thu phóng chủ thể ở cận cảnh và hình nền quỹ đạo, con lăn chuột điều chỉnh theo tỉ lệ, ở mức phóng đại cao camera vẫn nằm bên ngoài chủ thể.
- Sửa lỗi cập nhật kiểu canvas ghi đè `touch-action` khiến trình duyệt phóng to cả trang; khi thu phóng chủ thể, kích thước trang và nền sao giữ ổn định.

### Kiểm chứng

- `npm test`: 230 bài kiểm thử đạt, bao gồm di chuyển cấu hình, chuyển tổ hợp quỹ đạo, cô lập quỹ đạo cục bộ, khôi phục trạng thái dựng hình hố đen, thu phóng và bố cục.
- `npm run build`: tạo HTML độc lập có 15 texture, phiên bản đồng bộ lên 1.8.0.
- Kiểm chứng trên trình duyệt gồm thao tác mở rộng ở màn hình nhỏ, ba chế độ, chạm ba lần / chạm đúp, thu phóng hai ngón, đồng bộ công tắc chung, bộ đệm và khôi phục trạng thái khám phá.
- Đã thử cửa sổ vuông 200×200, 240×240, 320×320 pixel CSS cùng điện thoại ngang/dọc và bố cục máy tính; đây là kiểm chứng viewport trình duyệt, không phải chứng nhận tương thích phần cứng đồng hồ cụ thể.

## 1.7.1 · 2026-09-08

### Điều chỉnh diện mạo hố đen

- Dựa trên tham chiếu hình ảnh, đổi góc nhìn mặc định của hố đen về gần phía cạnh; đĩa bồi tụ mảnh dài uốn liên tục ở hai bên thành dải sáng trên và dưới bao quanh lõi tối.
- Giữ phần trung tâm đen kịt, chỉ để ánh sáng đĩa tiền cảnh cực mảnh đi qua; dùng mép trong trắng ấm, texture xếp lớp vàng cam và ánh sáng mềm cục bộ để thể hiện dải sáng.
- Hướng dải sáng theo hình chiếu thực của mặt đĩa, khi xoay tự do sẽ chuyển mượt sang mặt đĩa ba chiều; cả năm hố đen thống nhất dùng phối màu nghệ thuật tông ấm.
- Bổ sung kiểm thử hướng chiếu khi camera ở trên dưới, bên cạnh, chính diện và khi đối tượng cha xoay.

## 1.7.0 · 2026-09-08

### Mới

- Thêm M32, M110 / NGC 205, Thiên hà Barnard / NGC 6822; Nhóm Địa Phương nay mở 8 thiên hà. M32 dùng lõi phình trắng ấm đậm đặc, M110 dùng đám sao elip khuếch tán, NGC 6822 dùng đám sao không đều thưa thớt.
- Thêm 8 ngôi sao: Proxima Centauri, Alpha Centauri A / B, Sirius A / B, Vega, Pollux, Rigel. Số điểm đến là sao và hệ sao không gian sâu tăng lên 16.
- Thêm 5 hố đen: Sagittarius A*, hố đen trung tâm Thiên hà Tiên Nữ, hố đen trung tâm M32, M33 X-7 và LMC X-1. Hỗ trợ nhấp, bay vào quan sát, đĩa bồi tụ nghiêng, texture chuyển động, vành photon và cung thấu kính yếu; hoạt ảnh tuân theo cài đặt tạm dừng, tốc độ thời gian và giảm chuyển động.
- Danh mục thiên thể nay gồm 29 thiên thể không gian sâu: 16 nút sao, 5 hố đen và 8 hành tinh có sẵn. Bảng tư liệu phân biệt hố đen siêu khối lượng ở trung tâm với hố đen khối lượng sao, thông số hiển thị và nguồn xem [danh mục không gian sâu và nguồn tư liệu](docs/deep-space-sources.md).

### Cải tiến và sửa lỗi

- Danh mục điểm đến ở thanh dưới, nhãn đánh dấu trong cảnh, chọn đối tượng, bảng thông tin và điều hướng quay lại hỗ trợ thiên hà và hố đen mới; số thiên hà trong nhóm được sinh động từ danh mục.
- Hố đen mặc định được tiếp cận từ góc nghiêng phía trên đĩa bồi tụ, khung hình chứa trọn mặt đĩa, đồng thời giới hạn thu phóng cự ly gần để bóng và vành sáng luôn nhìn thấy được.
- Sửa lỗi toàn cảnh thiên hà bị cắt ngang trên điện thoại; khoảng nhìn toàn cảnh xa hơn trên điện thoại vẫn giữ thiên hà chứa, không chuyển sớm sang nhóm thiên hà hay trôi camera.
- Thiên hà chưa có ngôi sao riêng giữ tâm của chính nó khi phóng to; cận cảnh hố đen không còn bị chuyển nhầm về Hệ Mặt Trời.
- Ngôi sao chưa có hành tinh sẽ ẩn lối vào «Toàn cảnh hệ sao», góc nhìn xung quanh không còn hiện chữ về quỹ đạo hành tinh.
- Hạt sao của thiên hà dùng hạt giống ngẫu nhiên riêng và số lượng hiển thị thay đổi theo khoảng cách; tài nguyên hố đen có bảo vệ chống giải phóng lặp.

### Kiểm chứng

- `npm test`: toàn bộ 220 bài kiểm thử đạt, bao gồm điều hướng thiên thể mới, khung hình điện thoại, chọn hố đen, tạm dừng, giảm chuyển động và giải phóng tài nguyên.
- `npm run build`: tạo lại `index.html` độc lập có nhúng 15 texture.
- `git diff --check`: đạt.
- Kiểm chứng trên trình duyệt: nhóm thiên hà và cận cảnh hố đen trên máy tính, cận cảnh hố đen và sao trên điện thoại 390 × 844, toàn cảnh M110; không phát hiện lỗi hay cảnh báo trong console. Góc nghiêng cuối cùng của hố đen đã được rà soát lại trên máy tính.

Bóng hố đen, đĩa bồi tụ và bề mặt sao đều là minh họa nghệ thuật; khoảng cách và kích thước thiên hà đã được nén lại. Lần này không thêm hành tinh, cũng không mô tả hố đen khối lượng sao là hố đen trung tâm của thiên hà chứa nó.
