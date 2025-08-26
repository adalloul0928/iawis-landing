import React, { useState, useEffect } from "react";

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);

  const options = [
    {
      title: "Oversized Hoodie",
      description: "Premium cotton blend comfort",
      image: "/product-images/image1.jpeg",
    },
    {
      title: "Knit Beanie",
      description: "Classic ribbed winter style",
      image: "/product-images/image2.jpeg",
    },
    {
      title: "Cargo Sweatpants",
      description: "Relaxed fit with utility pockets",
      image: "/product-images/image3.jpeg",
    },
    {
      title: "Denim Jacket",
      description: "Vintage-inspired distressed details",
      image: "/product-images/image4.jpeg",
    },
    {
      title: "Graphic Tee",
      description: "Bold artistic print design",
      image: "/product-images/image5.jpeg",
    },
  ];

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#222] font-sans text-white">
      <div className="h-12"></div>

      {/* Options Container */}
      <div className="options flex flex-col sm:flex-row w-full max-w-[1800px] sm:min-w-[800px] h-[600px] sm:h-[800px] mx-0 items-stretch overflow-hidden relative p-2 sm:p-10">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? "active" : ""}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? "auto 100%" : "auto 120%",
              backgroundPosition: "center",
              backfaceVisibility: "hidden",
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-60px)",
              minWidth: window.innerWidth < 640 ? "40px" : "60px",
              minHeight: window.innerWidth < 640 ? "80px" : "100px",
              margin: 0,
              borderRadius: 0,
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: activeIndex === index ? "#fff" : "#292929",
              cursor: "pointer",
              backgroundColor: "#18181b",
              boxShadow:
                activeIndex === index
                  ? "0 20px 60px rgba(0,0,0,0.50)"
                  : "0 10px 30px rgba(0,0,0,0.30)",
              flex:
                window.innerWidth < 640
                  ? activeIndex === index
                    ? "3 1 0%"
                    : "1 1 0%"
                  : activeIndex === index
                    ? "7 1 0%"
                    : "1 1 0%",
              zIndex: activeIndex === index ? 10 : 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              willChange:
                "flex-grow, box-shadow, background-size, background-position",
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? "0" : "-40px",
                height: "120px",
                boxShadow:
                  activeIndex === index
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
              }}
            ></div>

            {/* Label with info */}
            <div className="label absolute left-0 right-0 bottom-2 sm:bottom-5 flex items-center justify-start h-8 sm:h-12 z-2 pointer-events-none px-2 sm:px-4 gap-2 sm:gap-3 w-full">
              <div className="info text-white whitespace-pre relative">
                <div
                  className="main font-bold text-sm sm:text-lg transition-all duration-700 ease-in-out leading-tight"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index
                        ? "translateX(0)"
                        : "translateX(25px)",
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-xs sm:text-base text-gray-300 transition-all duration-700 ease-in-out hidden sm:block"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index
                        ? "translateX(0)"
                        : "translateX(25px)",
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
