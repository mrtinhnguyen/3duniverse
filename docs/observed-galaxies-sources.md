# Tư liệu mở rộng về các thiên hà đã quan sát

Ngày đối chiếu: 2026-09-12. Định nghĩa dữ liệu: `src/universe/observed-galaxies.js`.

Sáu thiên hà này đều đã được kính thiên văn quan sát và đều nằm ngoài Nhóm Địa Phương. `parentId: 'local-group'` chỉ dùng lại ID vùng chứa Danh mục thiên hà của ứng dụng, không biểu thị việc thuộc về nhóm thiên hà thực tế nào. Tọa độ cảnh, bán kính, góc nghiêng, màu sắc và phân bố hạt đều là minh họa nghệ thuật để tiện du hành; khoảng cách trên bảng thông tin dùng giá trị gần đúng của nguồn chính thức tương ứng, không dùng để điều khiển tọa độ cảnh. Không hư cấu thêm sao, hành tinh hay hệ thành viên có thể khám phá cho các thiên hà này.

| Đối tượng | Thông tin ổn định dùng trên bảng | Nguồn chính thức |
| --- | --- | --- |
| Thiên hà Xoáy Nước M51 | Thiên hà xoắn ốc theo hướng chòm Lạp Khuyển, cách Trái Đất khoảng 31 triệu năm ánh sáng; các nhánh xoắn chứa vùng hình thành sao, tương tác gần với NGC 5195 có thể làm nổi bật cấu trúc nhánh xoắn. | [NASA Hubble · Messier 51](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/) |
| Thiên hà Bode M81 | Thiên hà xoắn ốc theo hướng chòm Đại Hùng, cách Trái Đất khoảng 11,6 triệu năm ánh sáng; sao xanh trẻ tạo nên nhánh xoắn, các sao già hơi đỏ tập trung ở chỗ phình trung tâm. | [NASA Hubble · Messier 81](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-81/) |
| Thiên hà Xì Gà M82 | Theo hướng chòm Đại Hùng, cách Trái Đất khoảng 12 triệu năm ánh sáng; tương tác hấp dẫn với M81 thúc đẩy quá trình hình thành sao mãnh liệt, các sao trẻ tạo ra gió thiên hà. Danh mục NASA xếp hình thái của nó là thiên hà xoắn ốc, còn «bùng nổ sao» mô tả trạng thái hoạt động. | [NASA Hubble · Messier 82](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-82/) |
| Thiên hà Mũ Rộng Vành M104 | Nhìn gần như từ cạnh, bên ngoài chỗ phình sáng có dải bụi nổi bật; cách Trái Đất khoảng 30 triệu năm ánh sáng. Danh mục NASA Hubble xếp vào loại thiên hà xoắn ốc. | [NASA Webb · Sombrero Galaxy’s Disk](https://science.nasa.gov/missions/webb/nasas-webb-rounds-out-picture-of-sombrero-galaxys-disk/), [NASA Hubble · Messier 104](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-104/) |
| Centaurus A / NGC 5128 | Thiên hà elip khối lượng lớn đặc biệt theo hướng chòm Bán Nhân Mã, cách Trái Đất khoảng 12 triệu năm ánh sáng; bức xạ vô tuyến mạnh và dải bụi rộng cắt ngang ánh sao rất nổi bật, bụi, khí và sao trẻ ủng hộ giả thuyết sáp nhập thiên hà. | [ESO · A Deeper Look at Centaurus A](https://www.hq.eso.org/public/news/eso1221/) |
| M87 | Thiên hà elip khổng lồ trong cụm thiên hà Xử Nữ, cách Trái Đất khoảng 54 triệu năm ánh sáng; có rất nhiều cụm sao cầu, hoạt động của hố đen trung tâm tạo ra tia phản lực tốc độ cao. | [NASA Hubble · Messier 87](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-87/) |

## Quy ước về khoảng cách và diện mạo

- Một số trang phổ biến khoa học chính thức làm tròn khoảng cách M81 thành 12 triệu năm ánh sáng; ở đây giữ thống nhất với con số 11,6 triệu của danh mục Hubble được dẫn link.
- Danh mục Hubble cho M104 dùng 28 triệu năm ánh sáng, chuyên đề Webb được dẫn link dùng khoảng 30 triệu; ở đây dùng giá trị gần đúng của nguồn sau. `profile: 'lenticular'` điều khiển đường nét của Thiên hà Mũ Rộng Vành, không tự khẳng định phân loại thiên hà dạng thấu kính.
- Các giới thiệu chính thức khác nhau về Centaurus A cho khoảng 11 đến 13 triệu năm ánh sáng; ở đây dùng khoảng 12 triệu theo quan sát sâu của ESO được dẫn link.
- Tư liệu EHT về M87 thường ghi khoảng 55 triệu năm ánh sáng; ở đây dùng khoảng 54 triệu theo danh mục NASA Hubble được dẫn link.
- `shape: 'irregular'` của M82 chỉ chọn cách phân bố dựng hình cho ánh sao bị nhiễu động, `profile: 'cigar'` thể hiện đĩa nhìn nghiêng hẹp dài và dòng khí thoát ra. Phân loại người dùng nhìn thấy là thiên hà bùng nổ sao, phần mô tả nói rõ hình thái xoắn ốc của nó.
- Mọi tia phản lực, dải bụi, vùng hình thành sao và ánh sao dạng hạt đều là minh họa cho các đặc điểm quan sát được; mỗi hạt phát sáng trong cảnh không tương ứng với một ngôi sao riêng lẻ đã được xác nhận.
