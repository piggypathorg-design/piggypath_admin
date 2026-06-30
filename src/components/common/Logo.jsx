import React from 'react';

const Logo = ({ className = "text-2xl" }) => {
  return (
    <div className={`inline-block font-black tracking-tight leading-none text-[#18181B] dark:text-white ${className}`}>
      {"P"}
      <span className="relative">
        {"ı"}
        {/* Green dot positioned higher to separate from the stem */}
        <span className="absolute bottom-[0.84em] left-[50%] -translate-x-[50%] w-[0.26em] h-[0.26em] bg-[#00E599] rounded-full"></span>
      </span>
      {"ggyPath"}
      {/* Purple dot as an inline-block naturally rests its bottom exactly on the baseline */}
      <span className="inline-block w-[0.28em] h-[0.28em] bg-[#8B5CF6] rounded-full ml-[0.06em]"></span>
    </div>
  );
};

export default Logo;
