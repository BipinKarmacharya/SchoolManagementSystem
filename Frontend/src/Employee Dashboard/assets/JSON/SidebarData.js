import { LuLayoutDashboard, LuClipboardPen } from "react-icons/lu";

import { TfiRulerPencil } from "react-icons/tfi";
import { RiUserFollowLine } from "react-icons/ri";

import { PiExam } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaPaperPlane } from "react-icons/fa";

export const SidebarData = [
    {
        id : 1,
        menuTitle : "Dashboard",
        menuIcon : LuLayoutDashboard,
        subMenu : [],
        menuLink : ["/"],
    }, 
 
    {
        id : 2,
        menuTitle : "Classes",
        menuIcon : TfiRulerPencil,
        subMenu : ["All Classes"],
        menuLink : [],
    },
   
    {
        id : 3,
        menuTitle : "Attendance",
        menuIcon : RiUserFollowLine,
        subMenu : [ "Take attendence"],
        menuLink : [],
    },
    {
        id : 4,
        menuTitle : "Assignment",
        menuIcon : LuClipboardPen,
        subMenu : ["Check Assignment"],
        menuLink : ["/"],
    },
    {
        id : 5,
        menuTitle : "Exam",
        menuIcon : LuClipboardPen,
        subMenu : ["POst routine","Add exam","Add question"],
        menuLink : [],
    },
    {
        id : 6,
        menuTitle : "Results",
        menuIcon : PiExam,
        subMenu : ["Add result"],
        menuLink : [],
    },
    {
        id : 7,
        menuTitle : "Timetable",
        menuIcon : SlCalender,
        subMenu : ["Add timetable"],
        menuLink : [],
    },
    {
        id : 8,
        menuTitle : "Notice",
        menuIcon : FaPaperPlane,
        subMenu : ["Add notice"],
        menuLink : [],
    },
   
    // {
    //     id : 17,
    //     menuTitle : "Others",
    //     menuIcon : "",
    //     subMenu : [],
    //     menuLink : [],
    // },
    // {
    //     id : 18,
    //     menuTitle : "Profile",
    //     menuIcon : "",
    //     subMenu : [],
    //     menuLink : [],
    // },
    // {
    //     id : 19,
    //     menuTitle : "Logout",
    //     menuIcon : "",
    //     subMenu : [],
    //     menuLink : [],
    // },
]