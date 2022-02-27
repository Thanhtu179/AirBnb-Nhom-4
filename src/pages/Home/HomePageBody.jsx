import React from "react";

let sizeAnhDiaDiem = "/40/40";
let diaDiem = [
  {
    hinhAnh: "https://picsum.photos/id/10" + sizeAnhDiaDiem,
    viTri: "Thành phố Hồ Chí Minh",
    khoangCach: "15 phút lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/11" + sizeAnhDiaDiem,
    viTri: "Cần Thơ",
    khoangCach: "3 giờ lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/12" + sizeAnhDiaDiem,
    viTri: "Nha Trang",
    khoangCach: "6.5 giờ lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/13" + sizeAnhDiaDiem,
    viTri: "Phú Quốc",
    khoangCach: "",
  },
  {
    hinhAnh: "https://picsum.photos/id/14" + sizeAnhDiaDiem,
    viTri: "Thành phố Tuy Hòa",
    khoangCach: "7.5 giờ lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/15" + sizeAnhDiaDiem,
    viTri: "Thành phố Biên Hòa",
    khoangCach: "45 phút lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/16" + sizeAnhDiaDiem,
    viTri: "Thị xã Thuận An",
    khoangCach: "30 phút lái xe",
  },
  {
    hinhAnh: "https://picsum.photos/id/17" + sizeAnhDiaDiem,
    viTri: "Thành phố Phan Rang-Tháp Chàm",
    khoangCach: "5 giờ lái xe",
  },
];

let sizeAnhDacDiem = "/300/300";
let dacDiem = [
  {
    hinhAnh: "https://picsum.photos/id/1040" + sizeAnhDacDiem,
    moTa: "Toàn bộ nhà",
  },
  {
    hinhAnh: "https://picsum.photos/id/257" + sizeAnhDacDiem,
    moTa: "Chỗ ở độc đáo",
  },
  {
    hinhAnh: "https://picsum.photos/id/236" + sizeAnhDacDiem,
    moTa: "Trang trại và thiên nhiên",
  },
  {
    hinhAnh: "https://picsum.photos/id/1062" + sizeAnhDacDiem,
    moTa: "Cho phép mang theo thú cưng",
  },
];

export default function HomeBody() {
  return (
    <div className="p-5">
      <h3>Khám phá những điểm đến gần đây</h3>
      <div className="row p-0">
        {diaDiem.map((loc, index) => {
          return (
            <div className="col-xl-3 col-md-4 col-6 mb-4" key={index}>
              <div className="d-flex">
                <img src={loc.hinhAnh} alt="..." />
                <div className="ml-2">
                  <h6>{loc.viTri}</h6>
                  <span>{loc.khoangCach}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h3>Ở bất cứ đâu</h3>
      <div className="row">
        {dacDiem.map((loc, index) => {
          return (
            <div className="col-xl-3 col-md-4 col-6" key={index}>
              <img src={loc.hinhAnh} alt="..." />
              <h6>{loc.moTa}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
