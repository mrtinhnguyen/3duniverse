# Quỹ đạo chuyển động của Hệ Mặt Trời

Vào từ mục "Quỹ đạo chuyển động" bên cạnh "Quỹ đạo" và "Đánh dấu" để quan sát đường đi của Mặt Trời và tám hành tinh trong một khoảng thời gian minh họa. Chế độ xem này đặt chuyển động quay của các hành tinh quanh Mặt Trời cùng với chuyển động tổng thể của Hệ Mặt Trời, giúp hiểu hệ quy chiếu thay đổi hình dạng quỹ đạo như thế nào.

## Thao tác

- **Hệ quy chiếu Ngân Hà**: Trong minh họa hệ quy chiếu Ngân Hà cục bộ, Hệ Mặt Trời chuyển động tịnh tiến về phía trước như một khối, tám hành tinh tiếp tục quay quanh Mặt Trời; quỹ đạo thể hiện sự chồng chập của hai chuyển động.
- **Hệ quy chiếu Mặt Trời**: Bám theo Mặt Trời, loại bỏ phần tịnh tiến chung, quan sát đường đi của các hành tinh so với Mặt Trời.
- **Lịch sử ngắn/dài**: Chuyển đổi khoảng thời gian nhìn ngược về quá khứ, so sánh độ cong cục bộ với hình dạng quỹ đạo dài hơn.
- **Tạm dừng và Tốc độ trôi của thời gian**: Dùng lại nút tạm dừng và các tốc độ minh họa 0.25×, 1×, 5×, 20× của giao diện chính. Khi tạm dừng vẫn có thể xoay, thu phóng hoặc đổi hệ quy chiếu để quan sát đường đi.
- **Xoay và thu phóng**: Kéo chuột để xoay, cuộn chuột để phóng to/thu nhỏ; trên màn hình cảm ứng, một ngón để xoay, chụm hai ngón để thu phóng.
- **Quay về Hệ Mặt Trời**: Thoát chế độ xem Quỹ đạo chuyển động, trở về cảnh khám phá Hệ Mặt Trời ban đầu.

## Cơ sở của hình ảnh

Hệ Mặt Trời gồm Mặt Trời và tám hành tinh; Mặt Trời chuyển động quanh tâm Ngân Hà, cả Hệ Mặt Trời cũng chuyển động theo. Tài liệu phổ biến khoa học của NASA cho biết một vòng quanh tâm Ngân Hà mất cỡ **230 triệu năm**. [NASA — Sun Facts](https://science.nasa.gov/sun/facts/), [NASA — Solar System Facts](https://science.nasa.gov/solar-system/solar-system-facts/).

Chế độ xem này dùng mô hình giản lược để biểu đạt sự chồng chập đó. Trong cùng một hệ tọa độ cục bộ:

```text
Vị trí hiển thị của hành tinh = Vị trí hiển thị của Mặt Trời + Vị trí hiển thị của hành tinh so với Mặt Trời
```

Khi chuyển sang hệ quy chiếu Mặt Trời, độ dịch chuyển của Mặt Trời tại cùng thời điểm được trừ khỏi mọi đường đi. Vì vậy, hai chế độ xem có thể cho ra hình dạng quỹ đạo khác nhau; đó là cách biểu đạt cùng một tập chuyển động minh họa trong các hệ quy chiếu khác nhau.

## Giới hạn của mô hình

- **Hệ quy chiếu Ngân Hà là minh họa cục bộ**: Hình ảnh dùng một đoạn tịnh tiến tổng thể để biểu đạt chuyển động của Hệ Mặt Trời trong Ngân Hà, không tính toàn bộ chuyển động quay quanh Ngân Hà, cũng không đại diện cho một hệ quy chiếu tuyệt đối đứng yên so với mọi thiên thể.
- **Quỹ đạo lịch sử do mô hình tính ngược**: Đường đi quá khứ thấy khi vào chế độ xem được sinh theo mô hình minh họa, không phải bản ghi quan trắc thực, không phải bản ghi tích lũy sau khi mở trình duyệt, cũng không phải lịch thiên văn có thể dùng để định vị thiên thể vào một ngày cụ thể.
- **Thời gian, kích thước và chu kỳ đã được nén**: Kích thước Mặt Trời và hành tinh, khoảng cách quỹ đạo, chu kỳ quỹ đạo và tỷ lệ tịnh tiến chung đều là điều chỉnh để trực quan hóa. Lịch sử ngắn/dài và thao tác Tốc độ trôi của thời gian tương ứng với thời gian minh họa, không thể quy đổi trực tiếp thành năm tháng hay tốc độ thực tế.
- **Hướng tịnh tiến đã được điều chỉnh bố cục**: Hướng tiến tổng thể của Hệ Mặt Trời, cách đặt mặt phẳng quỹ đạo và hướng camera dùng để giúp nhiều quỹ đạo dễ đọc, không được khớp từ vectơ vận tốc hiện tại của Mặt Trời trong Ngân Hà hay tư thế quan sát.
- **Hình xoắn ốc không phải tuyến đường thật duy nhất**: Hình dạng đường phụ thuộc vào hệ quy chiếu, góc giữa hướng tiến và mặt phẳng quỹ đạo, cùng tỷ lệ hiển thị. Không thể dựa vào một video căn theo trục hay một góc nhìn nào đó để khẳng định mọi hành tinh trong vũ trụ đều chuyển động theo hình xoắn ốc cố định đó, cũng không thể hiểu hướng tiến trong hình ảnh Mặt Trời là luôn vuông góc với mặt phẳng quỹ đạo hành tinh.
- **Không dự báo quỹ đạo chính xác**: Chế độ xem này dùng để so sánh chuyển động và hệ quy chiếu, không giải bài toán hấp dẫn nhiều vật đầy đủ, chuyển động khối tâm Hệ Mặt Trời, nhiễu loạn dài hạn hay trường hấp dẫn Ngân Hà.

## Nguồn và triển khai

Ngày đối chiếu tư liệu: 2026-09-07.

| Nguồn | Nội dung tính năng này sử dụng |
| --- | --- |
| [NASA — Sun Facts, Orbit and Rotation](https://science.nasa.gov/sun/facts/) | Mặt Trời nằm trong Ngân Hà, chuyển động quanh tâm Ngân Hà, các thiên thể khác trong Hệ Mặt Trời chuyển động theo; chu kỳ quay quanh Ngân Hà khoảng 230 triệu năm |
| [NASA — Solar System Facts](https://science.nasa.gov/solar-system/solar-system-facts/) | Hệ Mặt Trời có tám hành tinh; Hệ Mặt Trời chuyển động tổng thể quanh tâm Ngân Hà và cấp độ chu kỳ của nó |

Các nguồn trên hỗ trợ sự thật về thành phần Hệ Mặt Trời và chuyển động tổng thể trong Ngân Hà, không cung cấp kiểm chứng quan trắc cho hình xoắn ốc cụ thể, tỷ lệ, hướng tịnh tiến hay quỹ đạo tính ngược trong hình ảnh.

- `src/universe/motion-trajectories.js`: mô hình hiển thị và kết xuất quỹ đạo độc lập.
- `src/ui/trajectory-panel.js`: thao tác hệ quy chiếu, độ dài lịch sử và quay lại.
- Camera và việc điều phối ứng dụng vẫn do hệ thống điều hướng và vòng lặp chính sẵn có quản lý.
