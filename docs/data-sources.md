# Nguồn dữ liệu và hợp đồng dữ liệu của EarthSense

EarthSense **1.4.0** chỉ đăng ký ba lớp **Thời tiết, Sét, Bão**, mặc định bật cả ba và có thể bật/tắt độc lập. Các lớp này chồng dữ liệu thời tiết/bão công khai cùng dữ liệu sét minh họa được đánh dấu rõ ràng lên bề mặt Trái Đất sẵn có của ORBIT. Bộ chuyển đổi dữ liệu nằm trong `src/data/`, lớp hiển thị và trạng thái yêu cầu nằm trong `src/earthsense/`; mô-đun dữ liệu không phụ thuộc Three.js hay giao diện trang.

Trên bề mặt Trái Đất, ký hiệu định vị Thời tiết/Sét và ký hiệu tâm bão được ẩn đi; người dùng có thể nhấp vào cụm mây, dải mây bão hoặc danh sách sự kiện để xem chi tiết. Khi trời quang không có cụm mây, chọn điểm lấy mẫu thời tiết tương ứng từ danh sách. Sau khi chọn một cơn bão, các mốc thời gian trên đường đi lịch sử/dự báo vẫn hiển thị và có thể nhấp được.

## Giao diện công khai

| Nguồn và lớp | Giao diện | Nội dung đọc |
| --- | --- | --- |
| [Tài liệu chính thức Open-Meteo](https://open-meteo.com/en/docs): Thời tiết | [/v1/forecast](https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=GMT&timeformat=unixtime&forecast_days=1&cell_selection=nearest) | Trường `current` trả về hàng loạt cho nhiều tọa độ; đơn vị dùng mặc định của giao diện. Liên kết là ví dụ yêu cầu một điểm, ứng dụng thực tế yêu cầu hàng loạt 60 điểm. |
| [Tài liệu NASA EONET v3](https://eonet.gsfc.nasa.gov/docs/v3): Bão | [/api/v3/events?status=open&category=severeStorms&limit=100](https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category=severeStorms&limit=100) | Đọc tối đa 100 cơn bão chưa đóng trong `events` cùng `geometry` được ghi theo thời gian. |
| [Tài liệu API chính thức GDACS](https://www.gdacs.org/gdacsapi/swagger/index.html): Cảnh báo bão | [geteventlist/MAP?eventtype=TC](https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP?eventtype=TC) | Tâm sự kiện, cấp báo cáo, tốc độ gió cực đại theo nguồn và các đoạn quỹ đạo trong `FeatureCollection`. |
| GDACS: bản tin của cơn bão được chọn | [Ví dụ getepisodedata](https://www.gdacs.org/gdacsapi/api/events/getepisodedata?eventtype=TC&eventid=1001317&episodeid=18) | Đọc bản tin theo `eventid` và `episodeid` được chọn, dùng liên kết đường đi công bố trong `properties.impacts[].resource.timeline`. |
| GDACS: lịch sử và dự báo chính thức | [Ví dụ gettimeline](https://www.gdacs.org/gdacsapi/api/export/gettimeline?id=793141) | Với mỗi điểm trong `channel.item[]`: `actual`, `current`, số hiệu bản tin, tọa độ, tốc độ gió và thời gian hiệu lực UTC. ID nội bộ trong liên kết được đọc từ chính bản tin đó, không mã hóa cứng. |

Yêu cầu thời tiết dùng `timezone=GMT&timeformat=unixtime&cell_selection=nearest`. Các trường gồm `temperature_2m`, `relative_humidity_2m`, `precipitation`, `rain`, `weather_code`, `cloud_cover`, `wind_speed_10m`, `wind_direction_10m`.

## Định dạng sự kiện thống nhất

Các lệnh gọi mạng cho danh sách là `loadWeather(options)`, `loadEonet('severeStorms', options)`, `loadGdacs('TC', options)`. Khi chọn một cơn bão, gọi `loadCycloneTrack(event, options)` trong `src/data/cyclone-track.js` để trả về đường đi của bản tin đó. `options` hỗ trợ `signal`, `force` và `fetchImpl` dùng cho kiểm thử; lỗi truyền tải hoặc lỗi định dạng sẽ ném ra ngoại lệ. Sét được trả về qua hàm cục bộ `loadSimulatedLightning()` dưới dạng bản ghi minh họa, không gửi yêu cầu dữ liệu.

```js
{
  id, layer, title,
  lat, lon,                 // WGS84; vĩ độ [-90, 90], kinh độ [-180, 180]
  time,                     // Thời gian sự kiện theo nguồn, chuỗi ISO UTC
  source, sourceUrl,         // Tên nguồn; chỉ cho phép liên kết chi tiết HTTPS
  severity,                 // high / medium / low / unknown
  description,
  metrics: [{ label, value }],
  track: [[lon, lat], ...],  // Tùy chọn: đường quan trắc liên tục của EONET, sắp theo thời gian
  paths: [[[lon, lat], ...], ...], // Tùy chọn: các đoạn độc lập kiểu GDACS cũ, không dùng để phân biệt lịch sử/dự báo
  cyclone: {                // Chỉ cho bão; thiếu tốc độ gió thì là null
    windSpeedKmh,
    windBasis,              // observation / event-maximum / unavailable
    validTime               // Thời gian ISO UTC của quan trắc hiện tại; giá trị cực đại sự kiện thì là null
  },
  gdacs: { eventId, episodeId, eventType, source }, // Định danh bản tin GDACS
  trackData: {              // EONET có sẵn lịch sử; GDACS tải theo nhu cầu sau khi được chọn
    history: [{ lon, lat, time, validTime, windSpeedKmh, source, sourceUrl }],
    forecast: [{ lon, lat, time, validTime, windSpeedKmh, source, sourceUrl }],
    current,                // Điểm quan trắc GDACS đánh dấu rõ là hiện tại, nếu không thì null
    source, sourceUrl, dataUrl, issuedAt,
    status,                 // ready / history-only / unavailable
    message
  },
  weather: {                // Chỉ cho sự kiện thời tiết; giá trị quan trắc thiếu giữ là null
    temperature, windSpeed, windDirection,
    precipitation, cloudCover, interval,
    rain, humidity, code
  }
}
```

Tọa độ, thời gian không hợp lệ hoặc hình học không phù hợp sẽ bị lọc bỏ; bản ghi trùng cùng ID nguồn giữ lại bản mới hơn. Lỗi định dạng cấp cao nhất, lỗi HTTP, JSON không hợp lệ và hết thời gian chờ đều không bị ngụy trang thành mảng sự kiện rỗng. Tiêu đề và mô tả là văn bản bên ngoài, giao diện hiển thị bằng `textContent`, không coi nội dung nguồn là HTML.

`severity` dùng để phân cấp nhãn cảnh báo: GDACS dùng `episodealertlevel` của báo cáo hiện tại, thẻ đồng thời giữ `alertlevel` tổng thể của sự kiện. Khi EONET không cung cấp cấp tương ứng thì là `unknown`. Bán kính và tốc độ xoay của hệ mây bão đọc từ `cyclone.windSpeedKmh` riêng, không suy tốc độ gió từ màu cảnh báo.

## Thời gian, đơn vị và phạm vi bao phủ

- **Thời tiết**: Các vĩ độ −60°, −30°, 0°, 30°, 60°, mỗi vĩ tuyến lấy mẫu mỗi 30° kinh độ, tổng cộng 60 điểm; đây là ước tính từ mô hình thời tiết hiện tại, **không phải trường khí tượng toàn cầu liên tục hay số liệu đo thực của trạm khí tượng mặt đất**. Hướng gió là hướng gió thổi đến, đơn vị độ; tốc độ gió tính bằng km/h, nhiệt độ bằng °C, lượng mây và độ ẩm bằng phần trăm.
- **Lượng mưa tích lũy và cường độ mưa**: `current.time` của Open-Meteo là giây Unix, `current.interval` là số giây của khoảng tích lũy. `precipitation` gồm lượng mưa, mưa rào và tuyết, `rain` là lượng mưa, cùng đơn vị mm. Thẻ giữ khoảng tích lũy thực, ví dụ "15 phút gần nhất". Hiệu ứng hình ảnh lấy giá trị lớn hơn giữa `rain` / `precipitation` hợp lệ, quy đổi sang mm/h theo `lượng tích lũy mm × 3600 / interval`; ví dụ tích lũy 1 mm trong 15 phút tương ứng 4 mm/h. Khoảng thiếu hoặc không hợp lệ thì không bịa cường độ mưa, chỉ có thể minh họa định tính vệt mưa theo mã thời tiết; các mã tuyết không tạo vệt mưa.
- **Giản lược mây khi mưa nhỏ**: Theo [mã thời tiết Open-Meteo](https://open-meteo.com/en/docs), nhận diện mưa phùn nhẹ, mưa nhỏ, mưa băng nhẹ và mưa rào nhẹ (51, 56, 61, 66, 80); các điểm này không tạo cụm mây, chỉ giữ các sợi mưa sẵn có, kể cả khi lượng mây theo nguồn cao. Dữ liệu lấy mẫu, giá trị lượng mây, danh sách sự kiện và phép tính cường độ mưa giữ nguyên; mưa vừa, mưa to và dông vẫn dùng lớp mây cũ.
- **Bão EONET**: Đọc tối đa 100 sự kiện `severeStorms` được nguồn đánh dấu là `open`. Đây là danh mục sự kiện đã qua biên tập; chưa đóng không có nghĩa là vừa mới xảy ra, cũng không đảm bảo bao phủ mọi cơn bão. Thời gian lấy `geometry.date` hợp lệ mới nhất, không thay bằng thời gian hiện tại. Point được định vị trực tiếp, Polygon dùng tâm minh họa tính bằng trung bình trên mặt cầu và có ghi chú trong mô tả. Các Point lịch sử của bão được sắp theo thời gian để tạo đường đi; `kts` trong `magnitudeValue` được nhân 1.852 để đổi sang km/h. EONET không cung cấp điểm cuối dự báo chính thức, nên trả về `history-only` kèm giải thích rõ; tập rỗng bình thường nghĩa là lần này nguồn không có sự kiện khớp.
- **GDACS**: Chỉ tính `Point_Centroid` là sự kiện; vòng gió, đa giác, nón dự báo và quỹ đạo không được tính là thảm họa mới. `todate` là thời điểm kết thúc sự kiện/báo cáo theo nguồn, `datemodified` dùng để phân biệt bản sửa đổi; các thời gian nguồn không kèm múi giờ này được xử lý theo UTC. Lớp Bão đồng thời đọc bão từ EONET; sự kiện trùng tên ưu tiên giữ GDACS, vì vậy tổng số không phải là phép cộng đơn giản số lượng của hai nguồn.
- **Lớp Sét độc lập**: Giữ 6 địa điểm dông mô phỏng được đánh dấu rõ, `simulated: true`, `time: null`, nguồn hiển thị "Dữ liệu mô phỏng", mặc định bật. `loadSimulatedLightning()` là điểm thay thế để sau này kết nối dịch vụ sét thực; cụm mây, vệt mưa và tia sét tại các địa điểm này không biểu thị dông thực sự xảy ra ở đó.

Thời gian "Cập nhật" trên giao diện là thời điểm lần này lấy dữ liệu thành công, còn thời gian trên thẻ sự kiện đến từ nguồn dữ liệu; hai giá trị có ý nghĩa khác nhau. Tốc độ trôi thời gian minh họa của vũ trụ không làm thay đổi thời gian sự kiện. Các lớp dùng cho khám phá và phổ biến khoa học; vị trí lấy mẫu, đường đi và phân cấp không thể thay thế giám sát chính thức, thông tin phòng tránh hay quyết định ứng phó khẩn cấp. Việc dùng dữ liệu vẫn phải tuân theo giấy phép và hạn mức gọi của từng nguồn.

## Bản tin và đường đi của bão

`severitydata.severity` trong danh sách GDACS là **tốc độ gió cực đại của sự kiện**, đơn vị được quy đổi theo trường nguồn; hệ mây ban đầu được co giãn theo giá trị này, và dùng `windBasis: 'event-maximum'` cùng `validTime: null` để phân biệt rõ với quan trắc hiện tại. Sau khi chọn bão, bộ chuyển đổi yêu cầu bản tin cụ thể mà danh sách trỏ tới, kiểm tra số hiệu sự kiện và bản tin trả về có khớp không, rồi đọc liên kết timeline chính thức do bản tin đó công bố. Chỉ chấp nhận địa chỉ HTTPS `gettimeline` của GDACS, không đoán đường viền hình học hay nón dự báo thành đường đi của tâm bão.

Trong timeline, `actual: 'True'` là quan trắc lịch sử, `actual: 'False'` là dự báo chính thức; chỉ khi `current: 'true'` và `actual: 'True'` cùng đúng mới là quan trắc hiện tại. `advisory_datetime` được phân tích theo `DD Mon YYYY HH:mm` thành UTC, giữ làm `time` / `validTime` của từng điểm. Thời gian quan trắc hiện tại được lưu vào `issuedAt` của đường đi lần đó, giao diện ghi là "Thời điểm dự báo"; trường này không phải thời gian đăng trên trang web, và `datemodified` cũng không thay thế nó. Chỉ hiển thị các điểm dự báo chính thức khớp số hiệu bản tin hiện tại và có thời gian hiệu lực muộn hơn quan trắc đó. Khi thiếu quan trắc hiện tại rõ ràng hoặc số hiệu bản tin, giữ lịch sử, ẩn dự báo và giải thích lý do, không được trộn dự báo của bản tin cũ vào đường đi hiện tại. Việc phân loại thời gian đến từ các trường của bản tin, không thay đổi theo giờ hiện tại của máy; giao diện có thể đánh dấu riêng khi giai đoạn dự báo của bản tin đã kết thúc.

Tốc độ gió duy trì `wind_speed` trong timeline có đơn vị m/s, nhân 3.6 để đổi sang km/h; đã đối chiếu từng điểm với [biểu đồ km/h trong bản tin MARIE chính thức của GDACS](https://www.gdacs.org/Cyclones/report.aspx?eventid=1001317&episodeid=18&eventtype=TC). Chỉ tốc độ gió của quan trắc hiện tại rõ ràng nói trên mới được dùng để cập nhật hệ mây sau khi chọn; tốc độ gió dự báo chỉ hiển thị trong chi tiết điểm dự báo. Giá trị không hợp lệ, số âm hoặc đơn vị không rõ được để trống, không dùng giá trị thiếu đo để tạo sức gió.

Trên Trái Đất chỉ hiển thị đường đi của cơn bão đang được chọn: lịch sử dùng nét liền, dự báo dùng nét đứt, mốc thời gian của hai loại nguồn đều có thể nhấp riêng. Khi không có dự báo chính thức thì chỉ hiển thị lịch sử khả dụng, không kéo dài quỹ đạo quan trắc; khi không có đường đi khả dụng thì hiển thị `unavailable`. Đã kiểm tra thực tế: bản tin MARIE của NOAA trả về 18 điểm lịch sử và 8 điểm dự báo, bản tin KROVANH của JTWC trả về 18 và 7 điểm; bản tin mẫu và ngày thu thập xem tại [hồ sơ nguồn gốc fixture](../tests/fixtures/README.md).

## Ý nghĩa hình ảnh của Thời tiết và Bão

Mây thời tiết dùng các lớp mây mỏng bán trong suốt áp sát mặt cầu, ba mảnh hình học của mỗi điểm lấy mẫu có mây được gộp lại để kết xuất; nhiễu biến dạng tạo các sợi mây trôi chậm và mép tan dần, hướng Mặt Trời điều khiển sáng tối ngày đêm, xung dông thoáng chiếu sáng bên trong mây. Hình dạng mây, độ trôi và phạm vi che phủ cục bộ là minh họa theo chương trình, không thể dùng để suy ra trường mây liên tục ở vùng không lấy mẫu.

Khi khởi tạo, bộ kết xuất mây thời tiết sinh một kết cấu nhiễu đơn kênh 256 × 256 (64 KiB) để nhóm mảnh mây dùng chung khi lấy mẫu, giảm tính toán nhiễu lặp lại cho từng fragment; đây là kết cấu theo chương trình, không phải dữ liệu khí tượng mới hay ảnh nền vệ tinh.

`src/earthsense/effects/weather-state.js` chuyển bản ghi lấy mẫu thời tiết thực thành hiệu ứng minh họa cục bộ: mã trời quang/gần như quang `0 / 1` không tạo mây, mưa hay sét, kể cả khi các trường khác mâu thuẫn; với các loại thời tiết còn lại, lượng mây điều khiển mật độ cụm mây, cường độ mưa điều khiển liên tục số lượng, tốc độ, độ dài và phạm vi khuếch tán của vệt mưa. Cường độ mưa được ánh xạ mượt và đạt giới hạn hoạt ảnh ở 50 mm/h. **Lớp Thời tiết chỉ hiển thị sét dông khi mã Open-Meteo là `95`, `96`, `99`**; mưa thường hay lượng mây cao không bị nâng thành dông. Chu kỳ sét minh họa trong dông rút ngắn từ khoảng 18 giây xuống 4 giây khi cường độ mưa tăng, độ sáng cũng thay đổi theo; nhịp này không phải tần suất sét đo thực từ nguồn, API không cung cấp dữ liệu từng lần sét đánh.

Hệ mây bão được định vị theo kinh vĩ độ thực của sự kiện EONET / GDACS. `effects/cyclone-scale.js` ánh xạ liên tục km/h từ nguồn sang bán kính hình ảnh và tốc độ xoay; ánh xạ hiện tại đạt giới hạn hình ảnh ở 280 km/h, giá trị thiếu đo dùng kích thước minh họa trung tính rõ ràng. Hai lớp mây mỏng dạng mặt cong tạo thành thành mắt bão thấp, mắt bão mở và các dải mây xoắn ốc dài ngắn, rộng hẹp khác nhau; cấu trúc thay đổi theo hạt giống của sự kiện, chi tiết dải mây và chuyển động xoay tổng thể dùng nhịp trôi khác nhau; hai bán cầu Bắc và Nam xoay ngược chiều. Ánh chớp cục bộ trong mây là minh họa theo chương trình, cường độ và tần suất không đại diện cho quan trắc nguồn. **Bán kính minh họa do tốc độ gió điều khiển vẫn không phải ranh giới mây vệ tinh hay vòng gió/nón dự báo chính thức**. Lớp Sét độc lập tái sử dụng bộ kết xuất hiệu ứng thời tiết, nhưng luôn giữ danh tính mô phỏng của 6 điểm nói trên.

## Ảnh nền Trái Đất độ phân giải cao

Ảnh nền ngày/đêm của Trái Đất lấy từ [kết cấu chính thức của Solar System Scope](https://www.solarsystemscope.com/textures/), theo giấy phép CC BY 4.0; nguồn, kích thước và giá trị kiểm tra của các tệp 8K gốc xem tại [ghi công tư liệu](../assets/CREDITS.md) và [manifest](../assets/manifest.json). Đây là kết cấu tái dựng hình ảnh tĩnh, không phải quan trắc vệ tinh hiện tại; dữ liệu thời tiết và thời gian thảm họa do các giao diện công khai độc lập cung cấp.

`src/earth/detail-textures.js` sau khi ứng dụng khởi động sẽ chuẩn bị bất đồng bộ cùng một cặp ảnh nguồn **8192 × 4096**, dùng chung cho chế độ du hành vũ trụ và chế độ cảm nhận: máy tính để bàn ưu tiên 8K, bố cục điện thoại hoặc thiết bị báo bộ nhớ không quá 4 GB thì ưu tiên 4K, kích thước cuối cùng còn bị giới hạn bởi kích thước kết cấu tối đa của GPU. 4K là kết quả giảm mẫu khi chạy, không phải phiên bản tải xuống chính thức khác; tệp gốc không bị lấy mẫu lại hay ghi đè. Khi không dùng được kết cấu lớn hơn 2K hoặc tải thất bại, tiếp tục dùng ảnh nền 2K gốc. Hai chế độ dùng chung hình học Trái Đất chia mịn, cách tô ngày đêm sẵn có, hiệu ứng bloom sẵn có và cùng chiến lược lấy mẫu khi kết xuất, nên chuyển chế độ không làm giảm chất lượng ảnh hay làm sáng lại Trái Đất.

Lớp mây trang trí cố định chỉ hiển thị trong chế độ du hành vũ trụ; chế độ cảm nhận tắt lớp này khi cận cảnh Trái Đất, chỉ hiển thị hệ mây thời tiết/bão cục bộ do dữ liệu điều khiển. Vì vậy điểm lấy mẫu trời quang sẽ không bị lớp mây trang trí cố định che phủ. Cả hai kiểu mây đều không đại diện cho ảnh mây vệ tinh thời gian thực.

## Bộ nhớ đệm, hủy yêu cầu và trạng thái lỗi

`src/data/http.js` gộp các yêu cầu đồng thời cùng URL, chỉ lưu đệm khi thành công và vượt qua kiểm tra định dạng; TTL của giao diện danh sách và giao diện bản tin/đường đi bão đều là 15 phút. 60 điểm lấy mẫu thời tiết dùng một yêu cầu hàng loạt. Thời gian chờ của mỗi yêu cầu là 18 giây, tùy chọn `force` bỏ qua bộ nhớ đệm còn hiệu lực.

Chỉ khi chế độ EarthSense đang bật và lớp được bật thì lớp đó mới được lập lịch. Bộ lập lịch kiểm tra mỗi phút xem đã đến hạn chưa, bỏ qua thăm dò tự động khi trang bị ẩn; thoát chế độ hoặc tắt lớp sẽ hủy yêu cầu tương ứng. Hủy một bên tiêu thụ không làm dừng yêu cầu dùng chung mà lớp khác vẫn đang dùng, chỉ khi bên tiêu thụ cuối cùng hủy thì yêu cầu bên dưới mới bị dừng. Sau khi thoát chế độ, dữ liệu đã lấy thành công và trạng thái bật/tắt vẫn được giữ; lớp phủ GPU chỉ hiển thị khi góc nhìn Trái Đất vào cận cảnh.

Đường đi của bão được quản lý bởi trạng thái chọn riêng, khóa bộ nhớ đệm gồm ID sự kiện, số hiệu bản tin và thời gian sự kiện. Khi đổi sự kiện được chọn, đóng chi tiết, tắt lớp tương ứng, rời cận cảnh Trái Đất hoặc chuyển chế độ, yêu cầu đường đi lần đó bị hủy và đường đi đã chọn bị xóa; phản hồi cũ đến muộn không thể mở lại chi tiết hay ghi đè lựa chọn mới. Trong khi tải đường đi dùng `loading`, lỗi mạng hiển thị `error`; hai giá trị này là trạng thái giao diện, không lẫn với `history-only` / `unavailable` do nguồn xác định rõ.

| Trạng thái | Ý nghĩa |
| --- | --- |
| `idle` / `loading` | Chưa đọc / đang đọc; trong lúc làm mới có thể tiếp tục giữ hiệu ứng sự kiện hiện có. |
| `ready` / `empty` | Lấy được sự kiện hợp lệ / nguồn trả về thành công nhưng không có sự kiện nào để hiển thị. |
| `partial` | Một phần nguồn GDACS / EONET của lớp Bão thất bại; hiển thị dữ liệu từ nguồn thành công lần này, đồng thời ghi chú nguồn thất bại. |
| `error` | Lần đọc đầu tiên thất bại, chưa có kết quả thành công để tái sử dụng. |
| `stale` | Làm mới thất bại, giữ dữ liệu và thời gian cập nhật của lần thành công trước, thông báo rõ là chưa cập nhật được. |

Thất bại và thất bại một phần sẽ được thử lại sau khoảng một phút. Việc hủy yêu cầu không bị coi là sự cố nguồn; lỗi thông thường không kích hoạt thảm họa giả hay dữ liệu "thời gian thực" tĩnh dự phòng.

## Triển khai tĩnh và kiểm chứng

`npm run build` vẫn tạo ra `index.html` tự chứa gồm Three.js, mã nguồn, CSS và 15 kết cấu, trong đó có hai ảnh Trái Đất 8K gốc. Bản thân ảnh nền độ phân giải cao không cần tải thêm qua mạng. Chế độ du hành vũ trụ vẫn dùng được ngoại tuyến, còn dữ liệu công khai của EarthSense cần kết nối mạng; không cần proxy phía máy chủ, khóa API hay engine Trái Đất bổ sung. Mở trực tiếp qua `file://` hay triển khai lên dịch vụ lưu trữ trang tĩnh đều dùng yêu cầu CORS của trình duyệt.

Ngày 2026-09-06 UTC, các giao diện danh sách được đo thực tế trả về `Access-Control-Allow-Origin: *`, bao gồm thử nghiệm với `Origin: null` và nguồn gốc từ trang lưu trữ tĩnh; các yêu cầu bản tin và timeline GDACS NOAA / JTWC mới thêm cũng được đo trong cùng ngày, đều trả về HTTP 200 kèm header CORS đó. Mọi yêu cầu dùng `credentials: 'omit'`, không cần tài khoản hay proxy. GDACS nên dùng `/gdacsapi/api/events/geteventlist/MAP` trong bảng; địa chỉ khác là `/xml/gdacsTC.geojson` khi đo thực tế thiếu header CORS nên không được ứng dụng dùng. Nếu sau này nguồn thay đổi CORS hoặc dịch vụ không khả dụng, trang sẽ hiển thị lỗi dữ liệu tương ứng, phần kết xuất vũ trụ vẫn tiếp tục hoạt động.

`node --test tests/data.test.js tests/cyclone-data.test.js` dùng các phản hồi thực cỡ nhỏ có ghi ngày thu thập trong `tests/fixtures/`, bao phủ đơn vị, dữ liệu rỗng, định dạng lỗi, ngày UTC, tọa độ, liên kết nguồn, loại trùng sự kiện, khớp dự báo chính thức với bản tin hiện tại, thiếu quan trắc hiện tại, bộ nhớ đệm, hết thời gian chờ và hủy yêu cầu. Fixtures chỉ dùng cho kiểm thử, không được đóng gói thành dữ liệu thực tế khi chạy.

Mã nguồn các mô-đun Gió, Động đất, Núi lửa, Cháy rừng và Lũ lụt của các phiên bản trước cùng bộ chuyển đổi/kiểm thử của chúng tạm thời được giữ lại; `layers.js` hiện tại không đăng ký các lớp này và không yêu cầu dữ liệu tương ứng. Các mô-đun độc lập không được điểm vào hiện tại tham chiếu sẽ không nằm trong đồ thị phụ thuộc khi build; việc giữ các loại cũ trong kiểm thử không có nghĩa là sản phẩm vẫn mở các lớp này.
