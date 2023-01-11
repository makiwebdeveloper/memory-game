import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="h-[20vh] flex justify-center">
      <div className="w-[310px] flex items-center gap-5">
        <div className="bg-gray text-blue w-full px-4 py-3 rounded-lg flex justify-between items-center">
          <p>Time</p>
          <p className="font-semibold text-xl">0:00</p>
        </div>
        <div className="bg-gray text-blue w-full px-4 py-3 rounded-lg flex justify-between items-center">
          <p>Time</p>
          <p className="font-semibold text-xl">0</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
