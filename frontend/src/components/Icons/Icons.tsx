import { IoClose as IoCloseIcon } from "react-icons/io5";
import { MdEdit as MdEditIcon } from "react-icons/md";
import { FiSun as FiSunIcon, FiMoon as FiMoonIcon } from "react-icons/fi";

type IconProps = { className?: string };

export const IoClose = IoCloseIcon as React.FC<IconProps>;
export const MdEdit = MdEditIcon as React.FC<IconProps>;
export const FiSun = FiSunIcon as React.FC<IconProps>;
export const FiMoon = FiMoonIcon as React.FC<IconProps>;
