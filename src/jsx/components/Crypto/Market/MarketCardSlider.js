import React from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Swiper, SwiperSlide } from "swiper/react";
//import { Autoplay } from "swiper";

import "swiper/css";

const MarketBarChartRound = loadable(() =>
  pMinDelay(import("./MarketBarChartRound"), 1000)
);
const MarketlineChartRunning = loadable(() =>
  pMinDelay(import("./MarketlineChartRunning"), 1000)
);
const MarketlineChartRadial = loadable(() =>
  pMinDelay(import("./MarketlineChartRadial"), 1000)
);

const MarketCardSlider = () => {
  return (
    <>
      <Swiper
        className="swiper overflow-hidden"
        speed={1500}
        slidesPerView={4}
        spaceBetween={20}
        loop={false}
        //autoplay= {{
        //delay: 1200,
        //}}
        //modules={[ Autoplay ]}
        breakpoints={{
          1600: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
          360: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="overflow-hidden custome-tooltip">
                  <MarketBarChartRound />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box icon-box-sm  bg-primary me-3">
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.203 14.9885C22.7459 14.1867 23.0601 13.2521 23.1119 12.2852C23.1638 11.3183 22.9512 10.3556 22.4972 9.50037C22.0431 8.64515 21.3647 7.92976 20.5347 7.43103C19.7047 6.9323 18.7546 6.66907 17.7863 6.6696V5.33626C17.7863 4.98264 17.6458 4.6435 17.3958 4.39345C17.1457 4.14341 16.8066 4.00293 16.453 4.00293C16.0993 4.00293 15.7602 4.14341 15.5102 4.39345C15.2601 4.6435 15.1196 4.98264 15.1196 5.33626V6.6696H12.453V5.33626C12.453 4.98264 12.3125 4.6435 12.0624 4.39345C11.8124 4.14341 11.4733 4.00293 11.1196 4.00293C10.766 4.00293 10.4269 4.14341 10.1768 4.39345C9.92677 4.6435 9.7863 4.98264 9.7863 5.33626V6.6696H8.45296C8.09934 6.6696 7.7602 6.81007 7.51015 7.06012C7.2601 7.31017 7.11963 7.64931 7.11963 8.00293C7.11963 8.35655 7.2601 8.69569 7.51015 8.94574C7.7602 9.19579 8.09934 9.33626 8.45296 9.33626H9.7863V22.6696H8.45296C8.09934 22.6696 7.7602 22.8101 7.51015 23.0601C7.2601 23.3102 7.11963 23.6493 7.11963 24.0029C7.11963 24.3566 7.2601 24.6957 7.51015 24.9457C7.7602 25.1958 8.09934 25.3363 8.45296 25.3363H9.7863V26.6696C9.7863 27.0232 9.92677 27.3624 10.1768 27.6124C10.4269 27.8625 10.766 28.0029 11.1196 28.0029C11.4733 28.0029 11.8124 27.8625 12.0624 27.6124C12.3125 27.3624 12.453 27.0232 12.453 26.6696V25.3363H15.1196V26.6696C15.1196 27.0232 15.2601 27.3624 15.5102 27.6124C15.7602 27.8625 16.0993 28.0029 16.453 28.0029C16.8066 28.0029 17.1457 27.8625 17.3958 27.6124C17.6458 27.3624 17.7863 27.0232 17.7863 26.6696V25.3363H20.453C21.7124 25.3395 22.9321 24.8959 23.895 24.0842C24.858 23.2726 25.5018 22.1456 25.7118 20.9038C25.9218 19.662 25.6845 18.386 25.042 17.3029C24.3994 16.2197 23.3935 15.3996 22.203 14.9885V14.9885ZM12.453 9.33626H17.7863C18.4935 9.33626 19.1718 9.61722 19.6719 10.1173C20.172 10.6174 20.453 11.2957 20.453 12.0029C20.453 12.7102 20.172 13.3885 19.6719 13.8885C19.1718 14.3886 18.4935 14.6696 17.7863 14.6696H12.453V9.33626ZM20.453 22.6696H12.453V17.3363H20.453C21.1602 17.3363 21.8385 17.6172 22.3386 18.1173C22.8387 18.6174 23.1196 19.2957 23.1196 20.0029C23.1196 20.7102 22.8387 21.3885 22.3386 21.8885C21.8385 22.3886 21.1602 22.6696 20.453 22.6696Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 className="fs-16 font-w400 mb-0">Bitcoin</h4>
              </div>
              <div className="d-block">
                <h2 className="count-num mb-2 mb-0">$ 33,568.60</h2>
                <span className="fs-14 font-w500 text-success">
                  <i className="bi bi-caret-up-fill pe-2"></i>+ 2.0%
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-box">
            <div className="card-body">
              <div className="overflow-hidden custome-tooltip">
                <MarketlineChartRunning />
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box icon-box-sm  bg-primary me-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.5335 16.2879C24.5454 16.1922 24.5454 16.0955 24.5335 15.9999C24.5445 15.9077 24.5445 15.8146 24.5335 15.7225C24.5352 15.687 24.5352 15.6514 24.5335 15.6159C24.5166 15.5677 24.4952 15.5213 24.4695 15.4772L17.0028 2.67719C16.9724 2.61508 16.9287 2.56044 16.8748 2.51719C16.7748 2.4072 16.653 2.31931 16.517 2.25917C16.3811 2.19903 16.2341 2.16797 16.0855 2.16797C15.9368 2.16797 15.7898 2.19903 15.6539 2.25917C15.518 2.31931 15.3961 2.4072 15.2961 2.51719C15.2422 2.56044 15.1985 2.61508 15.1681 2.67719L7.70146 15.4772C7.67575 15.5213 7.65432 15.5677 7.63746 15.6159C7.63568 15.6514 7.63568 15.687 7.63746 15.7225C7.56784 15.8065 7.51039 15.8999 7.46679 15.9999C7.45573 16.092 7.45573 16.1851 7.46679 16.2772C7.46502 16.3127 7.46502 16.3483 7.46679 16.3839C7.48366 16.432 7.50509 16.4784 7.53079 16.5225L14.9975 29.3225C15.0919 29.4817 15.2261 29.6135 15.387 29.7051C15.5478 29.7967 15.7297 29.8449 15.9148 29.8449C16.0999 29.8449 16.2818 29.7967 16.4426 29.7051C16.6034 29.6135 16.7377 29.4817 16.8321 29.3225L24.2988 16.5225C24.3245 16.4784 24.3459 16.432 24.3628 16.3839C24.4225 16.3572 24.4796 16.325 24.5335 16.2879ZM11.2428 15.9999L14.9335 14.4212V17.6212L11.2428 15.9999ZM14.9335 12.0959L11.0828 13.7492L14.9335 7.14652V12.0959ZM17.0668 14.4212L20.7575 15.9999L17.0668 17.5785V14.4212ZM17.0668 12.0959V7.14652L20.9175 13.7492L17.0668 12.0959ZM16.0001 26.6665L11.0828 18.2292L15.5841 20.1599C15.7157 20.2156 15.8572 20.2443 16.0001 20.2443C16.1431 20.2443 16.2845 20.2156 16.4161 20.1599L20.9175 18.2292L16.0001 26.6665Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 className="fs-16 font-w400 mb-0">Ethereumn</h4>
              </div>
              <div className="d-block">
                <h2 className="count-num mb-2">$ 33,568.60</h2>
                <span className="fs-14 font-w500 text-danger">
                  <i className="bi bi-caret-down-fill pe-2"></i>+ 2.0%
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-box">
            <div className="card-body align-items-center flex-wrap">
              <div className="d-flex align-items-center justify-content-between">
                <div className="overflow-hidden custome-tooltip">
                  <MarketBarChartRound />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box icon-box-sm  bg-primary me-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 22.6668H14.6667C14.335 22.6685 14.0146 22.5464 13.7681 22.3246C13.5215 22.1027 13.3665 21.7968 13.3334 21.4668L13.76 17.0668L17.6934 16.0001C18.047 15.9047 18.3482 15.6726 18.5307 15.3551C18.7133 15.0375 18.7622 14.6604 18.6667 14.3068C18.5712 13.9532 18.3392 13.652 18.0216 13.4694C17.7041 13.2869 17.327 13.238 16.9734 13.3335L14.0534 14.1601L14.6667 8.13348C14.7021 7.77986 14.5955 7.42667 14.3705 7.15162C14.1454 6.87656 13.8203 6.70217 13.4667 6.66681C13.1131 6.63145 12.7599 6.73801 12.4848 6.96305C12.2098 7.1881 12.0354 7.51319 12 7.86681L11.2934 15.0001L7.64004 16.0001C7.28642 16.0479 6.96625 16.2341 6.74995 16.5179C6.53366 16.8018 6.43897 17.1599 6.48671 17.5135C6.53445 17.8671 6.72071 18.1873 7.00451 18.4036C7.28832 18.6199 7.64642 18.7146 8.00004 18.6668C8.11926 18.6862 8.24083 18.6862 8.36004 18.6668L11.0267 17.9068L10.6667 21.3335C10.6667 22.3943 11.0881 23.4118 11.8383 24.1619C12.5884 24.9121 13.6058 25.3335 14.6667 25.3335H24C24.3537 25.3335 24.6928 25.193 24.9429 24.943C25.1929 24.6929 25.3334 24.3538 25.3334 24.0001C25.3334 23.6465 25.1929 23.3074 24.9429 23.0573C24.6928 22.8073 24.3537 22.6668 24 22.6668Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 className="fs-16 font-w400 mb-0">Litecoin</h4>
              </div>
              <div className="d-block">
                <h2 className="count-num mb-2">$ 33,568.60</h2>
                <span className="fs-14 font-w500 text-success">
                  <i className="bi bi-caret-up-fill pe-2"></i>+ 2.0%
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-box">
            <div className="card-body align-items-center flex-wrap">
              <div className="d-flex justify-content-between align-items-center">
                <MarketlineChartRadial />
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box icon-box-sm  bg-primary me-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6664 17.9996C22.0944 18.0082 21.5274 18.1072 20.9864 18.2929L19.0664 15.9996L20.9864 13.7063C21.5274 13.892 22.0944 13.991 22.6664 13.9996C23.8897 14.0056 25.0778 13.5908 26.0317 12.8249C26.9855 12.059 27.647 10.9885 27.9054 9.79276C28.1638 8.59706 28.0032 7.34889 27.4507 6.25748C26.8982 5.16607 25.9873 4.29778 24.8707 3.79814C23.7541 3.29851 22.4997 3.19791 21.3177 3.51322C20.1358 3.82852 19.0981 4.54056 18.3787 5.52997C17.6593 6.51938 17.302 7.72602 17.3665 8.94761C17.431 10.1692 17.9135 11.3315 18.7331 12.2396L16.7064 14.6663H14.4797C14.1552 13.4094 13.3834 12.314 12.3091 11.5855C11.2347 10.8569 9.93148 10.5452 8.64373 10.7088C7.35598 10.8724 6.17209 11.5 5.31397 12.474C4.45585 13.448 3.98242 14.7015 3.98242 15.9996C3.98242 17.2977 4.45585 18.5513 5.31397 19.5253C6.17209 20.4993 7.35598 21.1269 8.64373 21.2904C9.93148 21.454 11.2347 21.1423 12.3091 20.4138C13.3834 19.6852 14.1552 18.5898 14.4797 17.3329H16.7064L18.7331 19.7596C17.9135 20.6678 17.431 21.83 17.3665 23.0516C17.302 24.2732 17.6593 25.4798 18.3787 26.4693C19.0981 27.4587 20.1358 28.1707 21.3177 28.486C22.4997 28.8013 23.7541 28.7007 24.8707 28.2011C25.9873 27.7015 26.8982 26.8332 27.4507 25.7417C28.0032 24.6503 28.1638 23.4022 27.9054 22.2065C27.647 21.0108 26.9855 19.9402 26.0317 19.1743C25.0778 18.4084 23.8897 17.9937 22.6664 17.9996ZM9.33307 18.6663C8.80565 18.6663 8.29008 18.5099 7.85155 18.2169C7.41301 17.9239 7.07122 17.5074 6.86939 17.0201C6.66755 16.5328 6.61474 15.9967 6.71764 15.4794C6.82053 14.9621 7.07451 14.4869 7.44745 14.114C7.82039 13.7411 8.29554 13.4871 8.81283 13.3842C9.33011 13.2813 9.86629 13.3341 10.3536 13.5359C10.8408 13.7378 11.2573 14.0796 11.5503 14.5181C11.8433 14.9566 11.9997 15.4722 11.9997 15.9996C11.9997 16.7069 11.7188 17.3851 11.2187 17.8852C10.7186 18.3853 10.0403 18.6663 9.33307 18.6663ZM22.6664 5.99961C23.1938 5.99961 23.7094 6.15601 24.1479 6.44903C24.5865 6.74205 24.9282 7.15852 25.1301 7.64579C25.3319 8.13306 25.3847 8.66924 25.2818 9.18652C25.1789 9.7038 24.925 10.179 24.552 10.5519C24.1791 10.9248 23.7039 11.1788 23.1866 11.2817C22.6694 11.3846 22.1332 11.3318 21.6459 11.13C21.1586 10.9281 20.7422 10.5863 20.4491 10.1478C20.1561 9.70927 19.9997 9.1937 19.9997 8.66628C19.9997 7.95904 20.2807 7.28076 20.7808 6.78066C21.2809 6.28057 21.9592 5.99961 22.6664 5.99961ZM22.6664 25.9996C22.139 25.9996 21.6234 25.8432 21.1849 25.5502C20.7463 25.2572 20.4046 24.8407 20.2027 24.3534C20.0009 23.8662 19.9481 23.33 20.051 22.8127C20.1539 22.2954 20.4078 21.8203 20.7808 21.4473C21.1537 21.0744 21.6289 20.8204 22.1462 20.7175C22.6634 20.6146 23.1996 20.6674 23.6869 20.8693C24.1742 21.0711 24.5906 21.4129 24.8836 21.8514C25.1767 22.29 25.3331 22.8055 25.3331 23.3329C25.3331 24.0402 25.0521 24.7185 24.552 25.2186C24.0519 25.7187 23.3736 25.9996 22.6664 25.9996Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 className="fs-16 font-w400 mb-0">Ripplecoin</h4>
              </div>
              <div className="d-block">
                <h2 className="count-num mb-2">$ 33,568.60</h2>
                <span className="fs-14 font-w500 text-danger">
                  <i className="bi bi-caret-down-fill pe-2"></i>+ 2.0%
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
};
export default MarketCardSlider;
