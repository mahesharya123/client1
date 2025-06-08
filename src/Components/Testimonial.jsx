import React from 'react'
import { useEffect } from 'react';
const Testimonial = () => {
     useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apps.elfsight.com/p/platform.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className='bg-[#F6F9FC]  flex flex-col items-center px-6 md:px-16 lg:px-24  pt-20 pb-30'>
      
            <div class="elfsight-app-29a56edc-5a59-4db6-90c4-35943911a84b" data-elfsight-app-lazy></div>
                       
    </div>
  )
}

export default Testimonial