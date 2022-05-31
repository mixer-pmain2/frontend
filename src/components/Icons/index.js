import React from "react";
import {
    BsFillPersonLinesFill,
    BsClockFill,
    BsBookFill,
    BsEmojiSunglassesFill
} from "react-icons/bs";
import {
    RiParentFill,
    RiTeamFill,
    RiContactsBook2Fill,
    RiSyringeFill,
    RiMicroscopeFill,
    RiNumbersFill,
    RiDeleteBin2Fill,
    RiAddLine
} from "react-icons/ri";

export const iconsUnit = {
    1: require("assets/images/295067-3f51b5.svg"),
    2: require("assets/images/295067-3f51b5.svg"),
    1024: require("assets/images/295067-3f51b5.svg"),
    4: require("assets/images/295067-3f51b5.svg"),
    8: require("assets/images/295067-3f51b5.svg"),
    16: require("assets/images/2025726-3f51b5.svg"),
    16777216: require("assets/images/295067-3f51b5.svg"),
    33554432: require("assets/images/295067-3f51b5.svg"),
}

const Icons = {
    module: {
        dispanser: {
            visit: <BsFillPersonLinesFill/>,
            history: <BsClockFill/>,
            uchet: <BsBookFill/>,
            invalid: <BsEmojiSunglassesFill/>,
            custody: <RiParentFill/>,
            groupWork: <RiTeamFill/>,
            vaccinations: <RiSyringeFill/>,
            infection: <RiMicroscopeFill/>,
            UKL: <RiNumbersFill/>,
            prof: <RiContactsBook2Fill/>
        }
    },
    event: {
        remove: <RiDeleteBin2Fill className="btn-outline-danger"/>,
        add: <RiAddLine/>
    }
}
export default Icons
