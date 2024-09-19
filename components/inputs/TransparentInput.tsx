import React from "react";
import { forwardRef, Input, InputProps } from "@nextui-org/react";
import { ClassNameValue } from "tailwind-merge";
import { useDOMRef } from "@nextui-org/react-utils";

interface TransparentInputProps extends InputProps {
  isBlurred?: boolean;
}

const TransparentInput = forwardRef<typeof Input, TransparentInputProps>((
  {
    as: Component = Input,
    isBlurred,
    ...props
  }, ref) => {
  const newProps = { ...props };
  const domRef = useDOMRef(ref);

  newProps.classNames = {
    ...props.classNames,
    inputWrapper: [
      "bg-default-300/50",
      "dark:bg-default-100/50",
      "dark:hover:bg-default-200/55",
      "group-data-[focus=true]:bg-default-100/60",
      "dark:group-data-[focus=true]:bg-default-300/60",
      ...(isBlurred ? [
          "backdrop-blur-md",
          "backdrop-saturate-150"]
        : [])
    ]
  };

  newProps.classNames.inputWrapper = Array.isArray(props.classNames?.inputWrapper) ?
    [
      ...(newProps.classNames.inputWrapper as ClassNameValue[]),
      ...(props.classNames?.inputWrapper as ClassNameValue[])
    ]
    : props.classNames?.inputWrapper ?? newProps.classNames.inputWrapper;

  return (
    <Component ref={domRef} {...newProps} />
  );
});

export default TransparentInput;