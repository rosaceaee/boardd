import React from "react";

interface BoxProps {
  radius: number;
  widthh: number;
  background: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  text: string;
  className: string;
}

const CircleBox = ({
  radius,
  background,
  children,
  style,
  widthh,
  text,
  className = "",
  ...rest
}: BoxProps) => {
  return (
    <div
      className={className}
      style={{
        // width: `${widthh}px`,
        width: `16px`,
        height: `16px`,
        borderRadius: `50%`,
        background: `${background}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CircleBox;
