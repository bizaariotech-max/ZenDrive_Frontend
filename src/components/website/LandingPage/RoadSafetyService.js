import React from 'react';
import img1 from '../../../assets/images/website/feet-owners.png';
import img2 from '../../../assets/images/website/img2.png';
import img3 from '../../../assets/images/website/img3.png';
import roadSafetyBg from "../../../assets/images/website/roadsafetyServiceBg.png";


export default function RoadSafetyService() {
  return (
    <section className="space-top">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-[var(--primary)] mb-4">
            Our Road Safety & Driving Excellence Service
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-5xl">
            We help families, organizations, schools, and fleet owners monitor driving behavior, promote safe habits, and guide drivers to become true ROAD CHAMPIONS.
          </p>
        </div>

        {/* Main Fleet Owners Section */}
        <div className="rounded-lg p-8 lg:p-9 mb-8 relative overflow-hidden items-end bg-cover bg-no-repeat bg-right  bg-gray-200"
          style={{ backgroundImage: `url(${roadSafetyBg})` }}
        >
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:gap-12 items-center">
            <div className="z-10 relative lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
                Message for Fleet Owners/<br />
                Transport Corporations
              </h3>
              <p className="text-base sm:text-lg  text-gray-700 leading-relaxed">
                Fleet owners and transport operations must ensure healthy drivers, well-maintained vehicles, and careful driving — a <span className="font-semibold">moral duty to make Indian roads safer.</span>
              </p>
            </div>

            <div className="z-10 relative ">
              <img src={img1} alt="Fleet Owners" className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Bottom Two Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section - Fleet/Schools */}
          <div className="bg-gray-100 rounded-lg p-6 lg:p-8 relative  min-h-[300px]" style={{ backgroundImage: `url(${roadSafetyBg})` }}>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Message for Parents/Spouses
              </h3>
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed mb-6">
               There is no harm in monitoring how your sons, daughters, husbands, or wives are driving. Get a report and help them become a <b>ROAD CHAMPION</b> by encouraging safe driving habits.
              </p>
              {/* SUV/Jeep illustration */}
              <div className="absolute -bottom-28 sm:-bottom-44 lg:-bottom-36 right-0 flex justify-end -z-20">
                <img src={img2} alt="Fleet Owners" className="max-w-[240px] h-auto" />
              </div>
            </div>


          </div>

          {/* Right Section - Corporate */}
          <div className="bg-gray-100 rounded-lg p-6 lg:p-8 relative min-h-[300px]" style={{ backgroundImage: `url(${roadSafetyBg})` }}>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Message for Corporate Offices/<br />
                Organizations
              </h3>
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed mb-6">
                Keep an eye on how your employees drive. Raise their awareness about safe driving and help them become a <span className="font-semibold">ROAD CHAMPION</span>.
              </p>
              {/* Luxury Car illustration */}
              <div className="absolute -bottom-32 -right-6 lg:-right-8 flex justify-end z-20">
                <img src={img3} alt="Fleet Owners" className="max-w-[240px] h-auto" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
