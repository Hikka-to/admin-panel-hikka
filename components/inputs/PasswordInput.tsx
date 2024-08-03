import {InputProps} from "@nextui-org/input";
import React from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {Input} from "@nextui-org/react";

interface PasswordInputProps extends InputProps {
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const newProps = {...props};

    const toggleVisibility = () => setIsVisible(!isVisible);

    if (props.endContent === undefined) {
        newProps.endContent =
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                    aria-label="toggle password visibility">
                {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                )}
            </button>
    }
    if (props.type === undefined)
        newProps.type = isVisible ? "text" : "password";

    return (
        <Input {...newProps}/>
    )
};

export default PasswordInput;