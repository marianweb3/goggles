import React from "react";
import EditImage from "./components/app/edit-image";
import VideImage from "./components/app/view-image";
import Header from "./components/header";

function App() {
  return (
    <div className="relative min-h-screen">
      <img
        src="/background.png"
        alt="Background Color"
        className="w-full h-full object-cover fixed top-0 left-0 "
      />
      <div className="relative max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8">
        <Header />

        <div className="min-h-[calc(100vh-79.17px)] flex items-center justify-center text-center flex-col max-w-[1361px] mx-auto w-full gap-8 md:gap-[54px] py-8">
          <img src="/title.png" alt="Title" className="max-w-full h-auto" />

          <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <VideImage />
            <EditImage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
