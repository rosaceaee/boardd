import React from "react";

interface BoxProps {
  radius: number;
  background: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className: string;
}

const Box = ({
  radius,
  background,
  children,
  style,
  className = "",
  ...rest
}: BoxProps) => {
  return (
    <div
      className={className}
      style={{
        borderRadius: `${radius}px`,
        background: "#ffffff",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
