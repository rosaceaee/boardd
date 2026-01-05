import React from "react";

interface BoxProps {
  radius: number;
  widthh: number;
  background: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className: string;
  // padding: number;
}

const Box = ({
  radius,
  background,
  children,
  style,
  widthh,
  className = "",
  ...rest
}: BoxProps) => {
  return (
    <div
      className={className}
      style={{
        width: `${widthh}px`,
        borderRadius: `${radius}px`,
        background: `#fff`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
