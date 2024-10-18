const BlockHeader = () => {
  return (
    <div className="px-4 py-3 flex items-center justify-between bg-black">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-white rounded-full"></div>
        <div className="w-4 h-4 border-2 border-white rounded-full"></div>
        <div className="w-4 h-4 border-2 border-white rounded-full"></div>
      </div>
      <span className="text-[20px] leading-[24px] text-white font-bold">
        Untitled - Notepad
      </span>
      <img src="/icon.ico.svg" alt="Icon" />
    </div>
  );
};

export default BlockHeader;
