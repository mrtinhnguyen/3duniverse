# Hành tinh mới trong Ngân Hà

Ngày đối chiếu: 2026-09-12. Danh mục nằm tại `src/universe/deep-space-catalog.js`.

Sáu hành tinh mới đều là thiên thể đã được xác nhận; `modelStatus: confirmed` chỉ có nghĩa thiên thể đã được xác nhận, không có nghĩa địa hình, khí quyển hay màu sắc trên màn hình đã được quan trắc xác nhận. Bán kính và chu kỳ quỹ đạo trong bảng dưới đây lấy theo giá trị hiển thị của danh mục ngoại hành tinh NASA tại thời điểm đối chiếu. `r`, `orbitRadius`, `orbitalPeriod`, tọa độ và pha trong cảnh là tham số bố cục tương tác, không phải tỉ lệ vật lý hay lịch thiên văn.

| Hành tinh | Sao chủ | Tư liệu dùng trên bảng thông tin | Nguồn gốc |
| --- | --- | --- | --- |
| Proxima Centauri b | Proxima Centauri (đã có trong danh mục) | Công bố phát hiện năm 2016; phương pháp vận tốc xuyên tâm; chu kỳ quỹ đạo khoảng 11,2 ngày | [NASA · Proxima Centauri b](https://science.nasa.gov/exoplanet-catalog/proxima-centauri-b/) |
| TRAPPIST-1 e | TRAPPIST-1 | Bán kính 0,92 bán kính Trái Đất; chu kỳ khoảng 6,1 ngày | [NASA · TRAPPIST-1 e](https://science.nasa.gov/exoplanet-catalog/trappist-1-e/) |
| TRAPPIST-1 f | TRAPPIST-1 | Bán kính khoảng 1,05 bán kính Trái Đất; chu kỳ khoảng 9,2 ngày | [NASA · TRAPPIST-1 f](https://science.nasa.gov/exoplanet-catalog/trappist-1-f/) |
| TRAPPIST-1 g | TRAPPIST-1 | Bán kính khoảng 1,13 bán kính Trái Đất; chu kỳ khoảng 12,4 ngày | [NASA · TRAPPIST-1 g](https://science.nasa.gov/exoplanet-catalog/trappist-1-g/) |
| Kepler-186 f | Kepler-186 | Công bố phát hiện năm 2014; bán kính 1,17 bán kính Trái Đất; chu kỳ khoảng 129,9 ngày | [NASA · Kepler-186 f](https://science.nasa.gov/exoplanet-catalog/kepler-186-f/) |
| Kepler-22 b | Kepler-22 | Công bố phát hiện năm 2011; bán kính 2,1 bán kính Trái Đất; chu kỳ khoảng 289,9 ngày | [NASA · Kepler-22 b](https://science.nasa.gov/exoplanet-catalog/kepler-22b/) |

Tư liệu nền về sao chủ:

- [NASA · TRAPPIST-1](https://science.nasa.gov/exoplanets/trappist1/): bảy hành tinh cỡ Trái Đất quay quanh một sao lùn đỏ siêu lạnh; cảnh lần này chỉ mở e, f, g, không coi số lượng được mở là tổng số hành tinh của hệ.
- [NASA · Phát hiện hệ Kepler-186](https://www.nasa.gov/news-release/nasas-kepler-telescope-discovers-first-earth-size-planet-in-habitable-zone/): sao chủ là sao lùn đỏ loại M, nằm theo hướng chòm Thiên Nga; Kepler-186 f là phát hiện quan trọng về một hành tinh gần cỡ Trái Đất trong vùng có thể sống được. Ước tính bán kính cũ trong bản tin năm 2014 này không thay thế giá trị danh mục được dùng lần này.
- [NASA / JPL · Hệ Kepler-22](https://www.jpl.nasa.gov/news/nasas-kepler-confirms-its-first-planet-in-habitable-zone/): sao chủ loại G, hơi nhỏ và hơi lạnh hơn Mặt Trời; Kepler-22 b là hành tinh đầu tiên được sứ mệnh Kepler xác nhận nằm trong vùng có thể sống được. Ước tính bán kính cũ trong bản tin năm 2011 này không thay thế giá trị danh mục được dùng lần này.

`rocky-world`, `temperate-world`, `ice-world` là tên thiết kế của vật liệu sinh theo thủ tục. Bề mặt đá, vân băng, vùng màu xanh và mây mù đều là minh họa nghệ thuật, không thể suy ra rằng chỏm băng, đại dương, khả năng sống được hay sự sống đã được xác nhận. Bảng thông tin của mỗi hành tinh đều nói rõ tính không chắc chắn của diện mạo liên quan. TRAPPIST-1 e/f/g giữ thứ tự quỹ đạo từ trong ra ngoài, mỗi hành tinh liên kết điều hướng và chiếu sáng với sao chủ thực qua `parentStarId`.
