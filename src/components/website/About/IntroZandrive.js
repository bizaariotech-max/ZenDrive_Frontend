
import React from "react";
import image1 from "../../../assets/images/website/about/ab1.png";

const IntroZandrive = () => {
  return (
    <section className="space-top">
      <div className="container">
        <div className="grid  grid-cols-1 lg:grid-cols-3 md:gap-4">
          {/* Left Content */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
              Introducing ZANDRIVE SAFE
            </h2>

            <div className="my-4 block lg:hidden">
              <img
              src={image1}
              alt="Zandrive Safe Dashboard"
              className="w-full h-auto rounded-lg "
            />
            </div>
            <p className="text-[var(--p1)] leading-relaxed text-base md:text-lg ">
              ZEN DRIVE SAFE is a unique initiative performing a 360-degree check
              on the factors causing road accidents: driver’s health and
              well-being, vehicle's health and fitness, driving behaviour, and a
              central command centre to intervene in the event of dangerous trends
              or violations. Added features include regular health check-ups,
              online support for medical emergencies, online support for vehicle
              breakdowns/failures, driver’s education, safe fleet operations
              support, service calendars/booking, vehicle insurance and warranty
              support, and online challan/support for driver’s license suspension
              revocation.
            </p>
          </div>

          {/* Right Image */}
          <div className="col-span-1 overflow-hidden rounded-lg hidden lg:flex lg:justify-end mt-4 md:mt-0">
            <img
              src={image1}
              alt="Zandrive Safe Dashboard"
              className="w-full h-auto rounded-lg "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroZandrive;



//     ```css
// /* Smooth hover and responsive refinements */
// img {
//   transition: transform 0.4s ease, box-shadow 0.4s ease;
// }

// img:hover {
//   transform: scale(1.03);
//   box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
// }
// ```
