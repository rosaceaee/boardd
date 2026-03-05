import React from "react";

interface BoxProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className: string;
  // padding: number;
}

const BoxVulChk = ({ children, style, className = "", ...rest }: BoxProps) => {
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BoxVulChk;
