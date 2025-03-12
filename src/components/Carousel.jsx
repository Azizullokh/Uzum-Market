import React, { useEffect, useState } from 'react'

function Carousel() {
    const Slides = [
    "https://images.uzum.uz/curg18tpb7f8r31vrhr0/main_page_banner.jpg",
    "https://images.uzum.uz/cuup0umi4n36ls3rled0/main_page_banner.jpg",
    "https://images.uzum.uz/cull61dht56sc95e81lg/main_page_banner.jpg",
    "https://images.uzum.uz/cuuot05pb7f9qcnebk9g/main_page_banner.jpg",
    "https://images.uzum.uz/cuulmdrvgbkm5ehgnih0/main_page_banner.jpg",
    "https://images.uzum.uz/cv3v6itpb7f9qcnfps9g/main_page_banner.jpg",
    "https://images.uzum.uz/cv3egidpb7f9qcnfmdag/main_page_banner.jpg",
    "https://images.uzum.uz/cv3ubkui4n36ls3t3ds0/main_page_banner.jpg",
    "https://images.uzum.uz/cv3eg7ei4n36ls3t0770/main_page_banner.jpg",
    "https://images.uzum.uz/cug7q9tht56sc95cis1g/main_page_banner.jpg",
    "https://images.uzum.uz/cv4o265pb7f9qcng1frg/main_page_banner.jpg",
    "https://images.uzum.uz/cuuoplei4n36ls3rla6g/main_page_banner.jpg",
    "https://images.uzum.uz/cuuljv3vgbkm5ehgnhcg/main_page_banner.jpg",
    ]

const [current , setCurrent] = useState(0)

useEffect(()=> {
    const interval = setInterval(() => {
        setCurrent((prev) => (prev+1) % Slides.length)
    }, 3000)
    return () => clearInterval(interval)
}, [])

return (
    <div className="relative md:w-[90%] lg:w-[85%] w-[95%] sm:w-[100%] mx-auto sm:px-[0px] px-[15px]">
      <div className="relative overflow-hidden rounded-2xl w-full">
        <img
          src={Slides[current]}
          className="w-full sm:p-[20px] h-[100x] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] md:rounded-2xl object-contain rounded-2xl transition-transform duration-700 ease-in-out"
          alt={`Slide ${current + 1}`}
        />
      </div>
      <div className="absolute inset-0 w-[100%] flex justify-between items-center px-4">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + Slides.length) % Slides.length)}
          className="bg-black/50 hover:bg-black text-white p-2 sm:p-3 md:p-4 rounded-full text-lg sm:text-xl md:text-2xl transition-all"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % Slides.length)}
          className="bg-black/50 hover:bg-black text-white p-2 sm:p-3 md:p-4 rounded-full text-lg sm:text-xl md:text-2xl transition-all"
        >
          ❯
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Slides.map((_, index) => (
          <span
            key={index}
            className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === current ? "bg-purple-600 w-5 sm:w-6" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
  
}

export default Carousel
