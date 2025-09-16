import React from 'react'
import { ThemeColors } from '../../../ThemeColors'
import { violations } from '../../../Data/LocalData'
import CallIcon from "@mui/icons-material/Call";
import { CiLocationOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import {IconButton,} from "@mui/material";

const DangerousDriving = () => {
  const NextArrow = ({ onClick }) => (
    <div className="slick-next-btn" onClick={onClick}>
      <IoArrowForwardCircleOutline size={30} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-prev-btn" onClick={onClick}>
      <IoArrowBackCircleOutline size={30} />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // centerMode: true,
    //  centerPadding: "70px",
    // leftPadding: '10px',
    responsive: [
      {
        breakpoint: 1024, // tablet & below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],

  };
  return (
    <>
      <section className={`pt-10 spaceBottom bg-[${ThemeColors.secondColor}] driver-custom-section relative rounded-lg mt-[60px]`}>
        <div className="container px-4">
          <h2 className="lg:text-[30px] font-bold pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Dangerous Driving</h2>
          <Slider {...settings}>
            {violations.map((item, index) => (
              <div
                key={index}
                className=" rounded-xl overflow-hidden p-3  relative driver-card-parent bg-white"
              >
                <img
                  src={item.image}
                  alt="Violation"
                  className="w-full h-atuo object-cover"
                  style={{ borderRadius: '10px 10px 0 0' }}
                />
                <div className="text-sm text-gray-700 pt-4 driver-card-content ">
                  <div>
                    <div className="flex justify-between items-center mt-2 mb-4">
                      <div className="flex items-center gap-2">
                        {/* <img
                        src={`https://i.pravatar.cc/40?img=${item.id}`}
                        alt={item.name}
                        className="w-10 h-10 rounded-full"
                      /> */}
                        <FaUserCircle size={35} />
                        <div>
                          <h3 className="text-xl">Rohit Kumar</h3>
                          <p className="text-xs text-gray-600">AC569561356</p>
                        </div>
                      </div>
                      <div className={`border-[${ThemeColors.PrimaryColor}] border-2 rounded-md `}>
                        <IconButton >
                          <CallIcon sx={{ color: `${ThemeColors.PrimaryColor}` }} />
                        </IconButton>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 ">
                      <div>
                        <p className='mb-1  text-xs text-gray-500'>Violation Type</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}>Over - speeding</p>
                      </div>
                      <div className=''>
                        <p className='mb-1  text-xs text-gray-500'>Vehicle Registration No</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}>UP16 AA 3456</p>
                      </div>
                    </div>
                    <div> 
                    <div className="grid grid-cols-2 gap-3 mb-3 ">
                      <div>
                        <p className='mb-1  text-xs text-gray-500'>Duty Conductor</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}>Prince Kumar</p>
                      </div>
                      <div className=''>
                        <p className='mb-1  text-xs text-gray-500'>Live Location</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded flex justify-between`}>

                          <div>Lucknow</div>
                          <div><CiLocationOn /></div>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 ">
                      <div>
                        <p className='mb-1  text-xs text-gray-500'>RO/Depot</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}>Ghaziabad/
                          Lucknow</p>
                      </div>
                      <div className=''>
                        <p className='mb-1  text-xs text-gray-500'>Route</p>
                        <p className={`p-2 bg-[${ThemeColors.secondColor}] rounded`}>
                          <div className='flex'>
                            <CiLocationOn />
                            <div className='ps-2'>Lucknow</div>
                          </div>
                          <div className=' border-l-2 border-dotted border-gray-500 p-4 ms-2'></div>
                          <div className='flex pt-1'>
                            <CiLocationOn />
                            <div className='ps-2'>Ghaziabad</div>
                          </div>
                        </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default DangerousDriving
