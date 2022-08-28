import React from "react";
import {
    BsFillPersonLinesFill,
    BsClockFill,
    BsBookFill,
    BsEmojiSunglassesFill,
    BsReddit,
    BsSearch
} from "react-icons/bs";
import {
    RiParentFill,
    RiTeamFill,
    RiContactsBook2Fill,
    RiSyringeFill,
    RiMicroscopeFill,
    RiNumbersFill,
    RiDeleteBin2Fill,
    RiAddLine,
    RiSubtractLine,
    RiPassportFill,
    RiEditFill,
    RiArrowRightSFill,
    RiArrowRightSLine,
    RiFilePaper2Fill,
    RiRedditLine
} from "react-icons/ri";
import {
    GiPistolGun
} from "react-icons/gi"
import {SiSalesforce} from "react-icons/si"
import {
    FaRegClock
} from "react-icons/fa";
import {
    MdDownloadForOffline,
    MdErrorOutline,
    MdOutlineCleaningServices
} from "react-icons/md";


export const iconsUnit = {
    1: require("assets/images/295067-3f51b5.svg"),
    2: require("assets/images/295067-3f51b5.svg"),
    4: require("assets/images/295067-3f51b5.svg"),
    8: require("assets/images/295067-3f51b5.svg"),
    16: require("assets/images/2025726-3f51b5.svg"),
    512: require("assets/images/295067-3f51b5.svg"),
    1024: require("assets/images/295067-3f51b5.svg"),
    2048: require("assets/images/295067-3f51b5.svg"),
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
            prof: <RiContactsBook2Fill/>,
            section23: <GiPistolGun/>,
            passport: <RiPassportFill/>,
            section22: <RiFilePaper2Fill/>,
            ood: <BsReddit/>,
            forced: <SiSalesforce/>
        }
    },
    event: {
        remove: <RiDeleteBin2Fill className="btn-outline-danger"/>,
        add: <RiAddLine/>,
        delete: <RiSubtractLine/>,
        edit: <RiEditFill/>,
        arrowRight: <RiArrowRightSFill/>,
        arrowRightLine: <RiArrowRightSLine/>,
        information: <MdErrorOutline/>,
        search: <BsSearch/>,
        clean: <MdOutlineCleaningServices/>,
    },
    status: {
        NEW: <FaRegClock/>,
        PROGRESS: <FaRegClock/>,
        ERROR: <MdErrorOutline/>,
        DONE: <MdDownloadForOffline/>
    }
}
export default Icons
