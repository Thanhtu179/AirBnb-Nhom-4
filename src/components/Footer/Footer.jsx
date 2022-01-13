import React from "react";
import "./Footer.css";
export default function Footer() {
  let footer = [
    {
      name: "GIỚI THIỆU",
      link: [
        "Phương thức hoạt động của Airbnb",
        "Trang tin tức",
        "Nhà đầu tư",
        "Airbnb Plus",
        "Airbnb Luxe",
        "HotelTonight",
        "Airbnb for Work",
        "Nhờ có host, mọi điều đều có thể",
        "Cơ hội nghề nghiệp",
        "Thư của nhà sáng lập",
      ],
    },
    {
      name: "CỘNG ĐỒNG",
      link: [
        "Sự đa dạng và cảm giác thân thuộc",
        "Tiện nghi phù hợp cho người khuyết tật",
        "Đối tác liên kết Airbnb",
        "Chỗ ở cho tuyến đầu",
        "Lượt giới thiệu của khách",
        "Airbnb.org",
      ],
    },
    {
      name: "ĐÓN TIẾP KHÁCH",
      link: [
        "Cho thuê nhà",
        "Tổ chức trãi nghiệm trực tuyến",
        "Tổ chức trãi nghiệm",
        "Đón tiếp khách có trách nhiệm",
        "Trung tâm tài nguyên",
        "Trung tâm cộng đồng",
      ],
    },
    {
      name: "HỖ TRỢ",
      link: [
        "Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi",
        "Trung tâm trợ giúp",
        "Các tùy chọn hủy",
        "Hỗ trợ khu dân cư",
        "Tin cậy và an toàn",
      ],
    },
  ];

  return (
    <div className="p-5" style={{ backgroundColor: "gray" }}>
      <div className="row">
        {footer.map((hd, index) => {
          return (
            <div className="col-xl-3 col-md-6 col-12">
              <h3>{hd.name}</h3>
              <ul>
                {hd.link.map((tp, index) => {
                  return (
                    <li key={index}>
                      <a href="#" className="link">
                        {tp}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="row">
        <div className="col-xl-6 col-md-8 col-12 justify-content-around">
          <ul className="d-flex flex-row justify-content-around">
            <li>© 2022 Airbnb, Inc. All rights reserved</li>
            <li>
              <a href="#" className="link">
                Quyền riêng tư
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Điều khoản
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Sơ đồ trang web
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xl-6 col-md-4 col-12">
          <ul className="d-flex flex-row justify-content-end">
            <li className="social">
              <i class="fas fa-globe"></i>
              <a href="#" className="link">
                Tiếng Việt(VN)
              </a>
            </li>
            <li className="social">
              $
              <a href="#" className="link">
                USD
              </a>
            </li>
            <li className="social">
              <a href="#" className="link">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="social">
              <a href="#" className="link">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li className="social">
              <a href="#" className="link">
                <i class="fab fa-instagram-square"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
