# Du Hành Vũ Trụ · Khám phá vũ trụ · Cảm nhận Trái Đất

[Tiếng Việt](README.md) | [English](README_EN.md)

**Explore the Universe. Sense the Earth.**

Phiên bản hiện tại: **1.9.0**. Xem [nhật ký thay đổi](CHANGELOG.md).

Chỉ cần nhấp đúp vào tệp **index.html** trong thư mục này là dùng được. Three.js và 15 ảnh texture (gồm ảnh gốc 8K ngày/đêm của Trái Đất) đã được nhúng sẵn vào HTML, nên phần du hành vũ trụ không cần mạng, không cần cài thư viện và không cần chạy máy chủ. EarthSense chỉ kết nối mạng khi cần để lấy dữ liệu từ các nguồn công khai. Nên dùng phiên bản mới của Chrome, Edge hoặc Safari có hỗ trợ WebGL 2 và đã bật tăng tốc phần cứng.

## Video giới thiệu

[![Ảnh xem trước video giới thiệu Du Hành Vũ Trụ](demo-preview.jpg)](demo.mp4)

**[Xem video giới thiệu](demo.mp4)**

Dài 25 giây, 1920 × 1080, 25 FPS. Video được quay liền mạch từ trang web thật, lần lượt đi qua quỹ đạo chuyển động theo hệ quy chiếu Ngân Hà, Trái Đất, chế độ Cảm nhận Trái Đất, Mặt Trời, hình minh họa một hành tinh khổng lồ trong Đám mây Magellan Lớn, và kết thúc ở toàn cảnh Nhóm Địa Phương.

## Xem trước tính năng mới

Dưới đây là ảnh chụp màn hình thực tế của phiên bản v1.6.0; nhấp vào ảnh để xem kích thước gốc. Cảnh hành tinh khổng lồ ngoài Ngân Hà vẫn giữ nhãn «Minh họa sáng tạo».

| Quỹ đạo chuyển động · quy chiếu Ngân Hà | Quỹ đạo chuyển động · quy chiếu Mặt Trời |
| --- | --- |
| ![Quỹ đạo chuyển động nhiều màu của Mặt Trời và tám hành tinh kéo dài về phía trước](docs/previews/motion-galactic.jpg) | ![Đường chuyển động của tám hành tinh quanh Mặt Trời theo hệ quy chiếu Mặt Trời](docs/previews/motion-solar.jpg) |
| **Cảm nhận Trái Đất · Lớp Thời tiết và dông** | **Ngôi sao khối lượng lớn · R136a1** |
| ![Trái Đất độ phân giải cao trong EarthSense với các lớp Thời tiết, Sét và Bão](docs/previews/earthsense.jpg) | ![Cận cảnh mang tính nghệ thuật của ngôi sao có thật R136a1 trong Đám mây Magellan Lớn](docs/previews/massive-star.jpg) |
| **Hành tinh khổng lồ ngoài Ngân Hà · Minh họa sáng tạo** | **Nhóm Địa Phương · Toàn cảnh** |
| ![Bề mặt nghệ thuật của một hành tinh khổng lồ trong Đám mây Magellan Lớn, giao diện ghi rõ là minh họa sáng tạo](docs/previews/extragalactic-planet.jpg) | ![Toàn cảnh Ngân Hà, Thiên hà Tiên Nữ, Thiên hà Tam Giác và hai Đám mây Magellan Lớn, Nhỏ](docs/previews/local-group.jpg) |

## Khám phá

- Kéo chuột để xoay góc nhìn, cuộn chuột để phóng to/thu nhỏ; trên màn hình cảm ứng, dùng một ngón để xoay và chụm hai ngón để thu phóng.
- Thu nhỏ liên tục từ Trái Đất để lần lượt đi qua các thang Hệ Mặt Trời, Ngân Hà và Danh mục thiên hà; phóng to liên tục để quay về thiên thể đang theo dõi.
- Nhấp vào thiên thể ở thanh dưới cùng, thiên thể trong cảnh hoặc nhãn đánh dấu để bay mượt tới đích; ô tìm kiếm ở dưới hỗ trợ tên tiếng Việt, tên tiếng Anh và số hiệu danh lục sao.
- Danh mục thiên hà mở **14 thiên hà**: Ngân Hà, Thiên hà Tiên Nữ (Andromeda), Thiên hà Tam Giác (Triangulum), Đám mây Magellan Lớn và Nhỏ, M32, M110, NGC 6822, Thiên hà Xoáy Nước M51, Thiên hà Bode M81, Thiên hà Xì Gà M82, Thiên hà Mũ Rộng Vành M104, Centaurus A và M87. Chọn một thiên hà, thanh dưới cùng sẽ mở ra các ngôi sao, hành tinh và hố đen đã được đưa vào; dùng «Thiên hà chứa», «Toàn cảnh hệ sao» hoặc «Danh mục thiên hà» để quay lại tầm nhìn rộng hơn. Danh mục trải qua nhiều nhóm thiên hà thực tế khác nhau, xem [tư liệu thiên hà mới](docs/observed-galaxies-sources.md).
- Mở **27 mục tiêu là ngôi sao có thật ngoài Hệ Mặt Trời**. Lần này bổ sung ba sao chủ của ngoại hành tinh là TRAPPIST-1, Kepler-186, Kepler-22, cùng Sao Bắc Cực A (Polaris A), Altair, Arcturus, Aldebaran, Deneb, Canopus, Antares A và Sao Barnard. HD 5980 vẫn được thể hiện bằng một thiên thể phát sáng duy nhất đại diện cho hệ nhiều sao. Xem [tư liệu sao mới](docs/observed-stars-sources.md).
- Thêm **5 điểm đến là hố đen**: Sagittarius A* của Ngân Hà, hố đen trung tâm Thiên hà Tiên Nữ, hố đen trung tâm M32, cùng M33 X-7 trong Thiên hà Tam Giác và LMC X-1 trong Đám mây Magellan Lớn. Hai hố đen sau thuộc loại khối lượng sao; bóng, vành sáng và đĩa bồi tụ chuyển động đều là minh họa nghệ thuật.
- Mở **10 ngoại hành tinh đã được xác nhận**: HR 8799 b/c/d/e, Proxima Centauri b, TRAPPIST-1 e/f/g, Kepler-186 f, Kepler-22 b, đồng thời giữ **4 hành tinh khổng lồ ngoài Ngân Hà được ghi rõ là «hư cấu / minh họa»**. Việc ghép hành tinh hư cấu với ngôi sao có thật không đồng nghĩa với một phát hiện hay quỹ đạo thực; mọi bề mặt ngoại hành tinh đều là minh họa nghệ thuật. Xem [nguồn danh mục không gian sâu](docs/deep-space-sources.md) và [tư liệu hành tinh mới](docs/milky-way-sources.md).
- Thêm mô hình bên ngoài của **Kính viễn vọng James Webb (JWST)**, hỗ trợ phát lại quá trình mở/thu gọn mười tám tấm gương chính và năm lớp tấm chắn nắng, vẫn kéo để xoay và thu phóng như bình thường. Phần phát lại chỉ mang tính minh họa phổ biến khoa học.
- Thêm **Voyager 1**, có thể vào từ điểm đến thuộc Hệ Mặt Trời hoặc Ngân Hà để ngắm cận cảnh ăng-ten, các cần dài, khoang thiết bị và Đĩa Vàng; công tắc «Quỹ đạo» điều khiển đường bay minh họa. Xem [mô hình và nguồn tham khảo](docs/voyager-sources.md).
- Bảng bên trái của Trái Đất có hai thao tác «Ngắm ánh đèn về đêm» và «Thăm Trạm Vũ trụ Quốc tế (ISS)».
- Phía trên có lối tắt «Quỹ đạo gần Trái Đất», «Hệ Mặt Trời», «Ngân Hà», «Danh mục thiên hà».
- Có thể bật/tắt riêng quỹ đạo và nhãn đánh dấu; chuyển động thiên thể có thể tạm dừng hoặc chạy ở tốc độ 0,25×, 1×, 5×, 20×.
- Nhấp **«Quỹ đạo chuyển động»** cạnh «Quỹ đạo» và «Nhãn» để xem đường tiến của Mặt Trời và tám hành tinh; chuyển giữa quy chiếu Ngân Hà / quy chiếu Mặt Trời, lịch sử ngắn / dài, dùng chung nút tạm dừng và tốc độ thời gian, tự do xoay và thu phóng, hoặc chọn «Quay về Hệ Mặt Trời».
- Thỉnh thoảng có thiên thạch màu ấm hoặc sao chổi hai đuôi lướt qua bầu trời, mỗi lần một vật thể, cách nhau ngẫu nhiên; chúng dừng khi tạm dừng và bị ẩn trong Cảm nhận Trái Đất cũng như chế độ giảm chuyển động.
- Chế độ màn hình: phần cài đặt ở góc trên bên phải có «Du hành vũ trụ» (giữ nguyên cảnh và thao tác hiện tại, chỉ ẩn giao diện), «Cận cảnh thiên thể» (một thiên thể hoặc trọn một thiên hà) và «Bảo vệ màn hình quỹ đạo» (Quỹ đạo chuyển động của Mặt Trời và tám hành tinh). Du hành và cận cảnh đều hỗ trợ bố cục trái / giữa / phải, cận cảnh hỗ trợ tự động xoay vòng; phần cài đặt quỹ đạo chỉ giữ hệ quy chiếu chuyển động, độ dài quỹ đạo và vị trí tâm trái / giữa / phải.
- Thao tác trên màn hình: kéo bằng một ngón hoặc chuột để xoay, chụm hai ngón hoặc cuộn chuột để thu phóng. Ở chế độ cận cảnh, chạm ba lần vào thiên thể / thiên hà để chuyển sang mục tiếp theo, phím mũi tên để chuyển tới/lui; ở chế độ hình nền quỹ đạo, chạm ba lần vào màn hình để xoay vòng giữa quỹ đạo dài Ngân Hà, quỹ đạo ngắn Ngân Hà, quỹ đạo dài Mặt Trời và quỹ đạo ngắn Mặt Trời, hướng mặc định khớp với Quỹ đạo chuyển động ở trang chính. Chạm đúp vào màn hình hoặc nhấn `I` / `Esc` để khôi phục giao diện; ở cận cảnh và hình nền quỹ đạo, chạm đúp có độ trễ nhỏ để phân biệt với chạm ba lần.
- Màu không gian sâu, sao nền, vệ tinh nhân tạo / trạm vũ trụ và hiển thị quỹ đạo áp dụng chung cho chế độ khám phá và mọi chế độ màn hình; công tắc quỹ đạo đồng bộ với trang chính và điều khiển cả quỹ đạo ở chế độ hình nền. Bên trong Cận cảnh thiên thể quỹ đạo luôn ẩn, nhưng không làm thay đổi công tắc chung. Chế độ, thiên thể, màu sắc, bố cục và cấu hình xoay vòng được lưu tự động trong trình duyệt hiện tại. Mọi chế độ tự thích ứng với kích thước màn hình và hướng ngang/dọc, không cần chọn thiết bị hay cấu hình màn hình có sẵn.
- Phím tắt: `+` / `-` thu phóng, phím cách để tạm dừng, `H` về Trái Đất, `F` toàn màn hình, `I` ẩn giao diện, `?` xem hướng dẫn.

## Quỹ đạo chuyển động của Hệ Mặt Trời

«Quy chiếu Ngân Hà» thể hiện sự chồng chập giữa chuyển động tịnh tiến của cả Hệ Mặt Trời và chuyển động quay quanh Mặt Trời của các hành tinh; «Quy chiếu Mặt Trời» bám theo Mặt Trời, loại bỏ phần tịnh tiến chung để dễ so sánh đường đi của các hành tinh. Hệ Mặt Trời thực sự chuyển động quanh tâm Ngân Hà, NASA cho biết chu kỳ quay khoảng 230 triệu năm. [NASA: Thông tin về Mặt Trời](https://science.nasa.gov/sun/facts/), [NASA: Thông tin về Hệ Mặt Trời](https://science.nasa.gov/solar-system/solar-system-facts/).

Quy chiếu Ngân Hà ở đây là **minh họa cục bộ**: các đường lịch sử được mô hình tính ngược, thời gian, kích thước, chu kỳ, hướng tịnh tiến và tỉ lệ hiển thị đều đã được điều chỉnh. Hình xoắn ốc nhìn thấy từ một góc nào đó không phải là tuyến đường thực duy nhất và cũng không phải lịch thiên văn quan trắc. Xem [giải thích và nguồn của Quỹ đạo chuyển động](docs/motion-trajectories.md).

## Cảm nhận Trái Đất (EarthSense)

Nhấp «Cảm nhận Trái Đất» ở phía trên để vào chế độ này. Hiệu ứng Thời tiết và Bão được phủ lên chính quả địa cầu Three.js sẵn có và chỉ được dựng khi nhìn Trái Đất ở cự ly gần; vẫn có thể kéo, cuộn chuột hoặc chụm ngón để phóng to. Khi vào chế độ, chuyển động thiên thể tạm dừng; khi quay về «Du hành vũ trụ», góc máy, mục tiêu, chuyến bay đang dở, tốc độ và các công tắc trước đó đều được khôi phục.

- Hiện mở ba lớp **Thời tiết, Sét, Bão**, mặc định bật cả ba và có thể bật/tắt riêng.
- Nhấp vào cụm mây Thời tiết / Sét hoặc dải mây Bão để xem nguồn, thời gian, tọa độ và chỉ số; cũng có thể tìm trong danh sách sự kiện rồi bay tới vị trí tương ứng, sau đó dùng «Phóng to» để tiến sát mặt đất. Khi trời quang không có mây, hãy xem điểm lấy mẫu tương ứng từ danh sách. Danh sách ưu tiên hiển thị Bão và Sét, sau đó mới đến Thời tiết.
- Khi chuyển sang thiên thể khác hoặc thu nhỏ ra Hệ Mặt Trời, Ngân Hà, các lớp phủ Trái Đất tự động thu lại; quay về Trái Đất để xem tiếp.
- Thời tiết dùng 60 điểm lấy mẫu đều nhau của Open-Meteo, hiển thị nhiệt độ, tốc độ và hướng gió, giáng thủy, lượng mưa và độ che phủ mây, không phải trường khí tượng liên tục. Mã trời quang / gần như quang `0 / 1` không sinh mây mưa; chế độ cảm nhận tắt lớp mây trang trí cố định ban đầu. Lượng giáng thủy tích lũy được quy đổi sang mm/h theo khoảng thời gian của nguồn, điều khiển liên tục mật độ, tốc độ, độ dài và phạm vi của vệt mưa.
- Lớp Thời tiết chỉ hiển thị chớp khi có mã dông `95 / 96 / 99`; cường độ mưa càng lớn, chu kỳ chớp minh họa càng rút ngắn từ khoảng 18 giây xuống 4 giây. Đây là nhịp hoạt ảnh thể hiện mức độ mạnh yếu; nguồn dữ liệu không cung cấp từng lần sét đánh hay tần suất sét đo được.
- Mây thời tiết cục bộ trải theo mặt cầu, những sợi mây bán trong suốt trôi chậm, độ sáng tối thay đổi theo hướng Mặt Trời; chớp dông lóe lên chiếu sáng bên trong mây trong chốc lát. Hình dạng và chuyển động của mây là cách thể hiện trực quan dữ liệu thời tiết lấy mẫu.
- Bão hiện ở tâm sự kiện thực với mây mỏng, thành mắt bão thấp, mắt bão mở và các dải mây xoắn ốc rộng hẹp không đều; chi tiết dải mây trôi với nhịp khác nhau, thỉnh thoảng có ánh điện minh họa lóe sáng cục bộ. Tốc độ gió từ nguồn điều khiển liên tục bán kính hiển thị và tốc độ xoay; giá trị lớn nhất trong danh sách GDACS và giá trị quan trắc hiện tại sau khi chọn được ghi riêng. Hình dạng mây và bán kính không phải ảnh mây thực tế hay vùng gió chính thức, ánh điện không biểu thị sét quan trắc được hay tần suất sét.
- Sau khi nhấp vào một cơn Bão, ứng dụng mới tải đường đi lịch sử và dự báo thực từ bản tin GDACS tương ứng: lịch sử là nét liền, dự báo là nét đứt, có thể nhấp vào từng mốc thời gian để xem tọa độ, tốc độ gió và thời gian hiệu lực. Phần chi tiết giữ nguồn và thời điểm phát bản tin; khi không có dự báo hoặc không xác định được bản tin hiện hành, ứng dụng nói rõ và không ngoại suy đường đi. Đóng chi tiết, tắt lớp Bão, rời Trái Đất hoặc đổi chế độ sẽ hủy yêu cầu tải đường đi và xóa đường đã chọn.
- Dữ liệu Bão lấy từ cảnh báo xoáy thuận nhiệt đới của GDACS và các sự kiện bão chưa đóng của NASA EONET; EONET đọc tối đa 100 mục, các sự kiện trùng khớp ưu tiên dùng GDACS. EONET cung cấp bản ghi vị trí lịch sử, không cung cấp đường dự báo chính thức, điều này được ghi rõ trong phần chi tiết.
- Lớp «Sét» riêng giữ **6 điểm dông mô phỏng**, mặc định bật, thẻ thông tin ghi rõ là dữ liệu mô phỏng.
- Mỗi nguồn hiển thị riêng trạng thái đang tải, không có kết quả, lỗi, khả dụng một phần và dữ liệu đệm. Khi làm mới thất bại, dữ liệu cũ còn dùng được sẽ được giữ lại và đánh dấu; thoát chế độ sẽ hủy các yêu cầu đang chạy và dừng làm mới.

Nguồn dữ liệu có thể bị trễ, thời gian sự kiện lấy theo bản ghi nguồn trong phần chi tiết. Xem [nguồn dữ liệu và giao diện lập trình](docs/data-sources.md) và [biên bản kiểm chứng tái cấu trúc](docs/refactor-validation.md).

Du hành vũ trụ và Cảm nhận Trái Đất dùng chung một bộ texture Trái Đất độ phân giải cao, hình học chia nhỏ, cách tô ngày/đêm và thông số phát sáng (bloom) gốc, nên đổi chế độ không làm giảm độ nét hay thay đổi độ sáng Trái Đất. Sau khi khởi động, ứng dụng chuẩn bị texture độ phân giải cao một cách bất đồng bộ: máy tính để bàn ưu tiên **8192 × 4096**, bố cục điện thoại hoặc thiết bị báo bộ nhớ không quá 4 GB dùng **4096 × 2048**, đồng thời bị giới hạn bởi kích thước texture tối đa của GPU; nếu thiết bị không đủ khả năng hoặc tải thất bại thì giữ texture 2K ban đầu. Bản 4K được tạo lúc chạy từ ảnh gốc 8K, không sửa tệp nguồn. Lớp mây trang trí ban đầu chỉ hiện trong Du hành vũ trụ; chế độ cảm nhận hiển thị mây mưa cục bộ do dữ liệu thời tiết lấy mẫu điều khiển.

## Phạm vi triển khai

Three.js r185; Trái Đất có tô ngày/đêm, ánh đèn ban đêm, lớp mây riêng, viền khí quyển; 32 vệ tinh, mô hình đơn giản của Trạm Vũ trụ Quốc tế (ISS), Mặt Trăng; Mặt Trời, tám hành tinh, vành Sao Thổ trong suốt; quỹ đạo Hệ Mặt Trời; 14 thiên hà sinh theo thủ tục, gồm cấu trúc nhánh xoắn, quầng elip, đám sao không đều và dải bụi; năm hố đen với đĩa bồi tụ chuyển động; mô hình JWST và Voyager 1; các hệ sao độc lập, bề mặt sao và hành tinh đá / vân băng / khí sinh theo thủ tục, chiếu sáng có hướng từ sao chủ; hiển thị thiên thể và quỹ đạo theo khoảng cách; bộ đệm độ sâu logarit; hậu xử lý bloom; giao diện đáp ứng.

Đây là một sản phẩm trực quan hóa tương tác: kích thước, khoảng cách, vị trí quỹ đạo và tốc độ của thiên thể đã được điều chỉnh để dễ nhìn, không phải lịch thiên văn thời gian thực. Mô hình vệ tinh, trạm vũ trụ và tàu vũ trụ dùng tỉ lệ trình diễn; cả 14 thiên hà đều là mô hình minh họa, số lượng được mở không đại diện cho toàn bộ thành viên của bất kỳ nhóm thiên hà thực tế nào. Khoảng cách cận cảnh trên HUD được quy đổi từ đơn vị hiển thị, chỉ dùng cho mục đích trình diễn.

## Giao diện gỡ lỗi

Sau khi trang tải xong, có thể gọi `ORBIT.destinations()` trong bảng điều khiển (console) của trình duyệt để xem danh mục 14 thiên hà và 46 thiên thể ngoài Hệ Mặt Trời, trả về ID, tên, loại, thiên hà chứa, sao chủ và trạng thái mô hình. Có thể đến thẳng các tàu vũ trụ bằng `ORBIT.goTo('voyager-1')` và `ORBIT.goTo('jwst')`. Các ID điều hướng cũ vẫn tương thích.

```js
console.table(ORBIT.destinations());
ORBIT.goTo('sagittarius-a'); // Khám phá hố đen trung tâm Ngân Hà
ORBIT.goTo('m32');          // Bay tới M32
ORBIT.goTo('local-group'); // Tổng quan Danh mục thiên hà
ORBIT.goTo('andromeda');   // Bay tới Thiên hà Tiên Nữ
ORBIT.goTo('hr8799-b');    // Bay tới một hành tinh khổng lồ đã xác nhận
ORBIT.getState();          // Gồm activeGalaxyId, activeSystemId và thang khám phá hiện tại
```

Trong danh mục mới, `modelStatus: 'confirmed'` nghĩa là thiên thể có thật, `'illustration'` nghĩa là minh họa hư cấu; texture nghệ thuật, tỉ lệ cảnh và hoạt ảnh quỹ đạo của các thiên thể đã xác nhận cũng đã được điều chỉnh về mặt hình ảnh.

## Tệp tin

- `src/shell.html`: trang và các điều khiển tương tác.
- `src/style.css`: kiểu giao diện và bố cục điện thoại.
- `src/universe.js`: chỉ giữ làm điểm vào tương thích; `src/app.js` lắp ráp cảnh và điều phối từng khung hình.
- `src/core/`: đường ống dựng hình, bay camera, lắp ráp cảnh và tải texture.
- `src/universe/`: danh mục thiên thể, hành tinh, chuyển động Hệ Mặt Trời, quỹ đạo, vệ tinh, tàu vũ trụ, Danh mục thiên hà, các hệ sao không gian sâu độc lập và minh họa Quỹ đạo chuyển động.
- `src/earth/`: chiếu sáng ngày/đêm của Trái Đất, khí quyển, mây, tọa độ kinh vĩ độ và texture độ phân giải cao tải theo nhu cầu.
- `src/earthsense/`: các lớp Thời tiết, Sét, Bão hiện tại, trạng thái dữ liệu và lưu/khôi phục chế độ; `effects/` cung cấp hiệu ứng minh họa mây mưa, dông và Bão.
- `src/data/`: bộ chuyển đổi độc lập cho Open-Meteo, NASA EONET, GDACS, quy đổi đơn vị tốc độ gió và bộ đệm yêu cầu; `cyclone-track.js` tải đường đi Bão chính thức khi cần.
- `src/ui/`: điều hướng, nhãn, bảng Quỹ đạo chuyển động, bảng EarthSense, chi tiết sự kiện và kiểu bổ sung.
- `tests/`: kiểm thử điều hướng, danh mục không gian sâu và bám theo thiên thể, tọa độ địa lý, chọn đối tượng trên lớp, khôi phục chế độ, bộ đệm, hủy yêu cầu và bộ chuyển đổi dữ liệu.
- `docs/`: biên bản kiểm chứng tái cấu trúc, giải thích dữ liệu công khai, nguồn tư liệu thiên thể không gian sâu và giải thích mô hình Quỹ đạo chuyển động.
- `assets/`: texture gốc, nguồn và giấy phép.
- `build.mjs`: đóng gói engine, mã cảnh và texture vào một tệp HTML.
- `index.html`: sản phẩm build dạng một tệp.
- `public/`: ảnh chia sẻ mạng xã hội, favicon, `robots.txt`, `sitemap.xml`; được chép vào `dist/` khi build.
- `vercel.json`: cấu hình triển khai Vercel (lệnh build, thư mục `dist/`, header bảo mật và bộ nhớ đệm).
- `demo.mp4`: video giới thiệu trang web.
- `demo-preview.jpg`: ảnh xem trước video trong README.
- `docs/previews/`: ảnh chụp thực tế của Quỹ đạo chuyển động, quan sát Trái Đất, thiên thể không gian sâu và nhóm thiên hà.

## Chạy từ mã nguồn

Tải mã nguồn về máy, mở terminal tại thư mục dự án rồi chạy:

```bash
npm install     # cài đặt phụ thuộc
npm test        # chạy kiểm thử
npm run build   # build lại index.html
npm start       # chạy máy chủ tĩnh tại http://127.0.0.1:8767 (cần Python 3)
```

Kết quả build được ghi vào `index.html` trong thư mục này và vào thư mục `dist/` (bản dùng để deploy, kèm các tệp trong `public/`); mọi phụ thuộc đều nằm trong dự án.

## Triển khai lên Vercel

Dự án đã có sẵn `vercel.json`: Vercel chạy `npm ci`, `npm run build` rồi phục vụ thư mục `dist/` dưới dạng trang tĩnh. Không cần biến môi trường.

1. Trên Vercel, chọn **Add New → Project**, nhập repository này. Để Framework Preset là **Other**; các lệnh build được lấy từ `vercel.json`.
2. Sau khi deploy xong, vào **Settings → Domains** và thêm `duhanhvutru.clbai.vn`.
3. Tại nơi quản lý DNS của `clbai.vn`, tạo bản ghi `CNAME` với tên `duhanhvutru`, giá trị `cname.vercel-dns.com`. Vercel tự cấp chứng chỉ HTTPS khi DNS đã trỏ đúng.

Hoặc deploy bằng CLI: `npx vercel` (bản xem trước) và `npx vercel --prod` (bản chính thức).

Thẻ chia sẻ (Open Graph, Twitter Card), `canonical`, `robots.txt` và `sitemap.xml` đang dùng tên miền `https://duhanhvutru.clbai.vn`. Nếu đổi tên miền, cập nhật các tệp `src/shell.html`, `public/robots.txt` và `public/sitemap.xml` rồi build lại. Ảnh chia sẻ nằm ở `public/og-image.png` (1200×630).

Texture Hệ Mặt Trời lấy từ [Solar System Scope](https://www.solarsystemscope.com/textures/), theo giấy phép [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), được hiển thị qua chiếu sáng và tô bóng thời gian thực. Các thiên thể không gian sâu mới dùng bề mặt nghệ thuật sinh theo thủ tục. Danh sách đầy đủ xem tại `assets/CREDITS.md`. Three.js dùng giấy phép MIT, xem `assets/THREE-LICENSE.txt`.

Ở cửa sổ nhỏ, các điều khiển mặc định tự thu gọn: «Chi tiết thiên thể» ở dưới mở phần giới thiệu và dữ liệu, «Khám phá và điều khiển» mở điều hướng, danh sách thiên thể, các lớp và công cụ phát; sau khi chọn điểm đến sẽ tự thu lại, màn hình rộng khôi phục bố cục đầy đủ.

Đã kiểm chứng trên trình duyệt với cửa sổ vuông 200×200, 240×240, 320×320 pixel CSS. Canvas tự theo tỉ lệ cửa sổ; ở cửa sổ rất nhỏ, phần cài đặt và điều khiển truy cập bằng cách cuộn.

## Giấy phép

Du Hành Vũ Trụ là bản Việt hóa phát triển từ dự án mã nguồn mở ORBIT; thông báo ghi công của dự án gốc được giữ nguyên trong tệp [NOTICE](NOTICE) theo yêu cầu của giấy phép.

Trừ nội dung của bên thứ ba được ghi chú riêng, mã nguồn và tài liệu gốc của dự án được cấp phép theo [Apache License 2.0](LICENSE). Khi phân phối dự án hoặc sản phẩm phái sinh, cần tuân thủ Điều 4 của giấy phép và giữ lại các thông báo ghi công còn áp dụng trong tệp [NOTICE](NOTICE).

Thư viện, texture và dữ liệu bên ngoài của bên thứ ba vẫn chịu giấy phép hoặc điều khoản sử dụng riêng: CC BY 4.0 cho texture Hệ Mặt Trời xem [assets/CREDITS.md](assets/CREDITS.md), giấy phép MIT của Three.js xem [assets/THREE-LICENSE.txt](assets/THREE-LICENSE.txt), dữ liệu bên ngoài xem [docs/data-sources.md](docs/data-sources.md). Toàn bộ quyền và nghĩa vụ căn cứ theo [LICENSE](LICENSE) và các điều khoản bên thứ ba áp dụng.
