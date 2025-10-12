import * as React from "react";

// tiny helper to merge classes without extra deps
function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

type ContainerProps = {
  children?: React.ReactNode;
  className?: string; // <-- allow className
};

/** Centers content with responsive horizontal padding */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
