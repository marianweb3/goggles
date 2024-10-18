import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-2 flex items-center justify-between relative">
      <img src="/logo.png" alt="Logo" className="max-w-[100px] md:max-w-full" />
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-black rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`nav-shadow bg-[#FFFFFF] px-4 py-2 flex flex-col lg:flex-row items-center gap-4 lg:gap-[30px] rounded-[12px] border-[3px] border-[#000000] max-w-[854px] w-full z-50 absolute left-0 right-0 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "top-full opacity-100 visible"
            : "-top-full opacity-0 invisible lg:opacity-100 lg:visible lg:static"
        } lg:flex`}
      >
        <nav className="w-full lg:w-auto">
          <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
            <li className="text-[16px] lg:text-[20px] leading-[28.96px]">
              About
            </li>
            <li className="text-[16px] lg:text-[20px] leading-[28.96px]">
              How to buy
            </li>
            <li className="text-[16px] lg:text-[20px] leading-[28.96px]">
              Tokenomics
            </li>
            <li className="text-[16px] lg:text-[20px] leading-[28.96px]">
              Contacts
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <img
            src="/tg.svg"
            alt="Telegram"
            className="w-6 h-6 lg:w-auto lg:h-auto"
          />
          <img src="/x.svg" alt="X" className="w-6 h-6 lg:w-auto lg:h-auto" />
        </div>
        <button className="py-[9.5px] w-full max-w-[175px] bg-[#FF8C24] border-2 border-black button-shadow rounded-full text-[18px] lg:text-[24px] leading-[18.17px]">
          BUY NOW!
        </button>
      </div>
    </header>
  );
};

export default Header;
