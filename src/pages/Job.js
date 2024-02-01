import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Base from "../components/Base";

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 3 },
// };

const items = [
  <img
    src="https://www.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447.jpg"
    className="item"
    data-value="1"
    style={{ width: "100%", height: "550px" }}
  />,
  <img
    src="https://spmrf.org/wp-content/uploads/2019/03/Diwakar-Jhurani.jpg"
    className="item"
    data-value="1"
    style={{ width: "100%", height: "550px" }}
  />,
  <img
    src="https://m.economictimes.com/thumb/msid-98614934,width-1200,height-900,resizemode-4,imgsize-49934/jobs-new.jpg"
    className="item"
    data-value="1"
    style={{ width: "100%", height: "550px" }}
  />,
  <img
    src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg?size=1200:675"
    className="item"
    data-value="1"
    style={{ width: "100%", height: "550px" }}
  />,
];

const Job = () => (
  <Base>
    <AliceCarousel
      //   mouseTracking
      items={items}
      //   responsive={responsive}
      //   controlsStrategy="alternate"
      disableButtonsControls
      disableDotsControls
      autoPlay
      infinite
      autoPlayControls
        autoPlayStrategy="none"
        autoPlayInterval={1000}
        animationDuration={1000}
    />
  </Base>
);
export default Job;
