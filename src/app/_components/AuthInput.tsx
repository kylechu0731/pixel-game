import React from "react";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, setValue }: Props) {
  return (
    <div className="w-full">
      <div className="bg-white text-black px-1 w-fit">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="-mt-1 bg-black border-2 border-white text-white px-2 py-[1px] w-full outline-none"
      />
    </div>
  );
}

export default AuthInput;