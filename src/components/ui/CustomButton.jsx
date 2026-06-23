import { Button } from "antd";

const CustomButton = ({ value, onclick, className ,type,disable}) => {
  return (
    <div>
      <Button
         disabled={disable??false}
        className={`font-semibold  !rounded-full   !border-none  !bg-[#9D6638] hover:!text-[#000000] !text-[#fff] ${className}`}
        onClick={onclick}
        type={type}
      >
        {value}
      </Button>
    </div>
  );
};
export default CustomButton;
