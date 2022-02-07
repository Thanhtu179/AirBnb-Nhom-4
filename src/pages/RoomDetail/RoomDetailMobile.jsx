import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_SEARCH } from "../../redux/Types/ClientSearchType";
import "./RoomDetail.css";
import { Button, Tooltip, DatePicker, Select } from "antd";
import { managerRoomsService } from "../../services/ManagerRoomsService";
import { managerReviewsService } from "../../services/ManagerReviewsService";
import formatNumber from "../../utils/formatNumber";

let checkinString = "0";
let checkoutString = "0";

export default function RoomDetailMobile(props) {
  const { id } = props.match.params;
  const { Option } = Select;
  let [place, setPlace] = useState("");
  let [checkin, setCheckin] = useState("");
  let [checkout, setCheckout] = useState("");
  let [guests, setGuests] = useState(0);
  let { searchRoom } = useSelector(
    (rootReducer) => rootReducer.ClientSearchReducer
  );
  place = searchRoom.place;
  checkin = searchRoom.checkin;
  checkout = searchRoom.checkout;
  guests = searchRoom.guests;

  let [detail, setDetail] = useState([]);
  let [review, setReview] = useState([]);
  let [visibleReview, setVisibleReview] = useState(2);

  if (place === "") place = "Bạn sắp đi đâu?";

  const dispatch = useDispatch();

  const dispatchToReducer = () => {
    if (guests == undefined) guests = 0;
    let action = {
      type: SET_SEARCH,
      data: {
        place: place,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        checkinString: checkinString,
        checkoutString: checkoutString,
      },
    };
    dispatch(action);
  };

  function onChangeCheckin(date, dateString) {
    checkin = date;
    checkinString = dateString;
    dispatchToReducer();
  }
  function onChangeCheckout(date, dateString) {
    checkout = date;
    checkoutString = dateString;
    dispatchToReducer();
  }

  function onChangeGuest(event) {
    guests = event.target.value;
    dispatchToReducer();
  }

  const getRoomDetail = (id) => {
    let promise = managerRoomsService.getRoomInfo(id);
    promise.then((result) => {
      setDetail(result.data);
    });
    promise.catch((error) => {
      console.log("Lỗi Api 18 lấy thông tin chi tiết phòng cho thuê: ", error);
    });
  };

  const getReview = (id) => {
    let promise = managerReviewsService.getReviewListByRoomId(id);
    promise.then((result) => {
      setReview(result.data);
    });
    promise.catch((error) => {
      console.log("Lỗi Api 24 lấy đánh giá theo phòng: ", error);
    });
  };

  const showReview = () => {
    return review?.map((comment, index) => {
      if (index < visibleReview)
        return (
          <div className="col-6 mb-4" key={index}>
            <div className="d-flex">
              <img
                src={
                  comment.userId
                    ? comment.userId.avatar
                    : "https://i.pravatar.cc/"
                }
                alt="..."
                className="avatar"
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{comment.userId?.name}</div>
                <div>{comment.updatedAt.split("T")[0]}</div>
              </div>
            </div>
            <span>{comment.content}</span>
          </div>
        );
    });
  };

  const countDate = () => {
    return (
      (Date.parse(checkoutString) - Date.parse(checkinString)) /
      (24 * 60 * 60 * 1000)
    );
  };

  useEffect(() => {
    getRoomDetail(id);
    getReview(id);
  }, []);

  return (
    <div className="container p-3 mobile">
      <header>
        <h3>{detail.name}</h3>
        <div className="">
          <ul className="flex_row_between">
            <li>
              <i class="fas fa-star" style={{ color: "orange" }}></i>
              <a href="" style={{ color: "black" }}>
                {" "}
                4,83 ({review.length} đánh giá)
              </a>
            </li>
            <li>
              <i class="far fa-grin-stars"></i>
              <span> Chủ nhà siêu cấp</span>
            </li>
            <li>
              <a href="" style={{ color: "black" }}>
                Thành phố Vũng Tàu
              </a>
            </li>
          </ul>

          <ul className="flex_row_between">
            <li>
              <i class="far fa-share-square"></i>
              <a href=""> Chia sẻ</a>
            </li>
            <li>
              <i class="far fa-heart"></i>
              <a href=""> Lưu</a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-6">
            <img src={detail.image} width={"100%"} height={"100%"} alt="..." />
          </div>
          <div className="col-6 flex_col_between">
            <div className="row">
              <div className="col-6">
                <img
                  src={detail.image}
                  width={"100%"}
                  height={"100%"}
                  alt="..."
                />
              </div>
              <div className="col-6">
                <img
                  src={detail.image}
                  width={"100%"}
                  height={"100%"}
                  alt="..."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <img
                  src={detail.image}
                  width={"100%"}
                  height={"100%"}
                  alt="..."
                />
              </div>
              <div className="col-6">
                <img
                  src={detail.image}
                  width={"100%"}
                  height={"100%"}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="detail">
        <div className="row">
          <div className="col-12">
            <div className="flex_row_between">
              <div>
                <h7>Toàn bộ căn hộ condo. Chủ nhà Phong</h7>
                <span>
                  {detail.guests} Khách - {detail.bedRoom} phòng ngủ -{" "}
                  {detail.bedRoom} giường - {detail.bath} phòng tắm
                </span>
              </div>
              <img src="https://i.pravatar.cc/50" alt="" className="avatar" />
            </div>
            <hr />
            <ul>
              <li className="d-flex">
                <i class="fas fa-home icon_detail"></i>
                <div>
                  <div style={{ fontWeight: "bold" }}>Toàn bộ nhà</div>
                  <div>Bạn sẽ có chung cư cao cấp cho riêng mình</div>
                </div>
              </li>

              <li className="d-flex">
                <i class="fas fa-hands-wash icon_detail"></i>
                <div>
                  <div style={{ fontWeight: "bold" }}>Vệ sinh tăng cường</div>
                  <div>
                    Chủ nhà này đã cam kết thực hiện vệ sinh tăng cường 5 bước
                    của Airbnb.
                    <a href=""> Hiển thị thêm</a>
                  </div>
                </div>
              </li>

              <li className="d-flex">
                <i class="far fa-smile icon_detail"></i>
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    Phong là chủ nhà siêu cấp
                  </div>
                  <div>
                    Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm được đánh
                    giá cao và là những người cam kết mang lại quãng thời gian ở
                    tuyệt vời cho khách
                  </div>
                </div>
              </li>

              <li className="d-flex">
                <i class="far fa-calendar-alt icon_detail"></i>
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    Miễn phí hủy trong 48 giờ
                  </div>
                </div>
              </li>
            </ul>

            <hr />
            <span>
              Căn hộ của tôi tọa lạc ở tầng trệt của chung cư Vũng Tàu. Ban công
              và 2 phòng ngủ quay mặt ra phía núi, biển và toàn bộ thành phố.
              Bạn có thể tiếp cận những tiện ích gần đó: Bãi biển, đền thờ,
              chùa, chợ hải sản, cửa hàng tiện lợi, quán cà phê, chợ đêm ...
            </span>
            <a href="" style={{ textDecoration: "underline" }}>
              Hiển thị thêm
            </a>

            <hr />

            <h6>Tiện nghi</h6>
            <div className="row">
              <div className="col-6">
                <ul>
                  <li className="d-flex">
                    <i class="fas fa-utensils icon_detail"></i>
                    <div>Bếp</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-tv icon_detail"></i>
                    <div>TV với truyền hình cáp tiêu chuẩn</div>
                  </li>
                  <li className="d-flex">
                    <i class="far fa-snowflake icon_detail"></i>
                    <div>Điều hòa nhiệt độ</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-dumpster-fire icon_detail"></i>
                    <div>Lò sưởi trong nhà</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-parking icon_detail"></i>
                    <div>Bãi đổ xe có thu phí nằm ngoài khuôn viên</div>
                  </li>
                </ul>
              </div>

              <div className="col-6">
                <ul>
                  <li className="d-flex">
                    <i class="fas fa-wifi icon_detail"></i>
                    <div>Wifi</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-sort-amount-up-alt icon_detail"></i>
                    <div>Thang máy</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-door-open icon_detail"></i>
                    <div>Sân hoặc ban công</div>
                  </li>
                  <li className="d-flex">
                    <i class="fas fa-temperature-low icon_detail"></i>
                    <div>Tủ lạnh</div>
                  </li>
                  <li className="d-flex">
                    <i class="far fa-calendar-check icon_detail"></i>
                    <div>Cho phép ở dài hạn</div>
                  </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-light">
              Hiển thị tất cả 24 tiện nghi
            </button>
          </div>
        </div>
      </section>

      <hr />

      <div className="">
        <form
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="d-flex justify-content-between m-1">
            <div>{formatNumber(detail.price)} / đêm</div>
            <div>
              <i class="fas fa-star" style={{ color: "orange" }}></i>
              <span> 4,83 ({review.length} đánh giá)</span>
            </div>
          </div>
          <div
            className="p-3"
            style={{
              border: "1px solid black",
              borderRadius: "30px",
              backgroundColor: "white",
            }}
          >
            <div className="row">
              <div
                className="col-6 d-flex flex-column"
                style={{ borderRight: "1px solid black" }}
              >
                <label>Nhận phòng</label>
                <DatePicker
                  value={checkin}
                  onChange={onChangeCheckin}
                  bordered={false}
                  className="p-0"
                  size="small"
                />
              </div>

              <div className="col-6 d-flex flex-column">
                <label>Trả phòng</label>
                <DatePicker
                  value={checkout}
                  onChange={onChangeCheckout}
                  bordered={false}
                  className="p-0"
                  size="small"
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col-12 d-flex flex-column"
                style={{ borderTop: "1px solid black" }}
              >
                <label>Khách</label>
                <input
                  type="text"
                  placeholder="Thêm khách"
                  size="15"
                  style={{ border: "none" }}
                  value={guests}
                  onChange={onChangeGuest}
                  size="small"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-danger"
            style={{ width: "100%", margin: "20px 0px" }}
          >
            Đặt phòng
          </button>
          <div className="text-center">Bạn vẫn chưa bị trừ tiền</div>
          <div className="d-flex justify-content-between">
            <div style={{ textDecoration: "underline" }}>
              {formatNumber(detail.price)} x {countDate()} đêm
            </div>
            <div>{formatNumber(detail.price * countDate())}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div style={{ textDecoration: "underline" }}>Phí dịch vụ</div>
            <div>{formatNumber(1000000)}</div>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <div>Tổng</div>
            <div>{formatNumber(detail.price * countDate() + 1000000)}</div>
          </div>
        </form>
        <div className="text-center mt-2">
          <i
            class="far fa-flag"
            style={{ color: "orange", marginRight: "10px" }}
          ></i>
          <a href="" style={{ textDecoration: "underline" }}>
            Báo cáo nhà/phòng cho thuê này
          </a>
        </div>
      </div>

      <section id="review">
        <div>
          <i class="fas fa-star" style={{ color: "orange" }}></i>
          <span> 4,83 ({review.length} đánh giá)</span>
        </div>

        <div id="progress_bar" className="row">
          <div className="col-4">Mức độ sạch sẽ</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">3.2</div>

          <div className="col-4">Độ chính xác</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">3.5</div>

          <div className="col-4">Liên lạc</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">3.8</div>

          <div className="col-4">Vị trí</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">4.1</div>

          <div className="col-4">Nhận phòng</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">4.2</div>

          <div className="col-4">Giá trị</div>
          <div className="col-4">
            <div className="progress review_bar">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="col-4">3.0</div>
        </div>
        <br />
        <div id="comment">
          <div className="row">{showReview()}</div>
          <button
            className="btn btn-light"
            onClick={() => setVisibleReview(review.length)}
          >
            Hiển thị tất cả {review.length} đánh giá
          </button>
          <br />
        </div>
      </section>
    </div>
  );
}
