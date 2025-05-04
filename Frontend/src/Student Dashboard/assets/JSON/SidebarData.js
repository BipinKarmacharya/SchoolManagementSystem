import { LuLayoutDashboard, LuClipboardPen } from "react-icons/lu";

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
        menuLink : ["/student-dashboard"],
    },   
    {
        id : 2,
        menuTitle : "Attendance",
        menuIcon : RiUserFollowLine,
        subMenu : [ "View Attendance"],
        menuLink : ["/student-dashboard"],
    },
    {
        id : 3,
        menuTitle : "Assignment",
        menuIcon : LuClipboardPen,
        subMenu : ["Submit Assignment"],
        menuLink : ["/student-dashboard"],
    },
    {
        id : 4,
        menuTitle : "Exam",
        menuIcon : LuClipboardPen,
        subMenu : ["view Routine"],
        menuLink : ["/student-dashboard"],
    },
    {
        id : 5,
        menuTitle : "Results",
        menuIcon : PiExam,
        subMenu : ["view result"],
        menuLink : ["/student-dashboard"],
    },
    {
        id : 6,
        menuTitle : "Timetable",
        menuIcon : SlCalender,
        subMenu : ["For class"],
        menuLink : ["/student-dashboard"],
    },
    {
        id : 7,
        menuTitle : "Notice",
        menuIcon : FaPaperPlane,
        subMenu : [],
        menuLink : ["/student-dashboard"],
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