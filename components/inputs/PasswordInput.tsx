import React from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons";
import { forwardRef, Input, InputProps } from "@heroui/react";
import { useDOMRef } from "@heroui/react-utils";

interface PasswordInputProps extends Omit<InputProps, "type" | "endContent"> {}

const PasswordInput = forwardRef<typeof Input, PasswordInputProps>(
  ({ as: Component = Input, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const domRef = useDOMRef(ref);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Component
        ref={domRef}
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...props}
      />
    );
  },
);

export default PasswordInput;
