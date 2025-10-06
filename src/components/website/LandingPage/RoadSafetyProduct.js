import React from 'react'
import Carousel from "react-multi-carousel";
import product1 from '../../../assets/images/website/products/p1.png'
import product2 from '../../../assets/images/website/products/p2.png'
import product3 from '../../../assets/images/website/products/p3.png'
import product4 from '../../../assets/images/website/products/p4.png'
import { Link } from 'react-router-dom';
import ShopCard from '../../../UI/ShopCard';
const RoadSafetyProduct = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
      showDots: true,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      showDots: true,
    }
  };
  const motorcycleGear = [
    {
      id: 1,
      label: "Blue Riding Gloves with Touch Screen Sensitivity at Thumb and Index Finger",
      value: "BUROC",
      brand: "Steelbird",
      price: 1724,
      oldPrice: 1999,
      img: product1
    },
    {
      id: 2,
      label: "ROYAL ENFIELD MLG Open Face with Visor Motorbike Helmet (Matt Black)",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      oldPrice: 1999,
      img: product2
    },
    {
      id: 3,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      oldPrice: 1999,
      img: product3
    },
    {
      id: 4,
      label: "Durable, non-slip riding shoes designed for comfort and safety on the road.",
      value: "BU724",
      brand: "Steelbird",
      price: 1724,
      oldPrice: 1999,
      img: product4
    }
  ];

  return (
    <>
      <section className='space-top relative'>
        <div className="container">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-6">
            Road Safety Products
          </h2>
          <div>
            <div className="">
              <Carousel
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                arrows={false}
                responsive={responsive}
                // autoPlay={false}
                // autoPlaySpeed={3000}
                // transitionDuration={2000}
                //additionalTransfrom={-20}
                //  pauseOnHover={false}
                //  centerMode={false}
                containerClass="pb-5"
                itemClass="pe-md-3 px-1"
                showDots={false}
                infinite={true}
                renderDotsOutside={true}
                partialVisible={true}
                className='ps-0 pb-3'
              >
                {motorcycleGear.map((item, index) => (
                  <Link to={`/shop/${item.id}`} key={item.id} state={item} >
                    <div className='flex flex-col'>

                      <ShopCard item={item} />
                    </div>
                  </Link>
                ))}

              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RoadSafetyProduct

