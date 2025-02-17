import { LuLayoutDashboard, LuClipboardPen } from "react-icons/lu";
import { TbSettingsCog, TbCertificate } from "react-icons/tb";
import { TfiRulerPencil } from "react-icons/tfi";
import { GiBookPile } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaUserShield } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import { HiBriefcase } from "react-icons/hi";
import { PiExam } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaPaperPlane } from "react-icons/fa";

export const SidebarData = [
    {
        id : 1,
        menuTitle : "Dashboard",
        menuIcon : LuLayoutDashboard,
        subMenu : [],
        menuLink : ["/admin-dashboard"],
    }, 
    {
        id : 2,
        menuTitle : "General Settings",
        menuIcon : TbSettingsCog,
        subMenu : ["Institute Profile", "Fee Structure", "Marks Grading"],
        menuLink : ["/admin-dashboard/institute-profile", "/admin-dashboard/fee-structure", "/admin-dashboard/marks-grading"],
    },
    {
        id : 3,
        menuTitle : "Classes",
        menuIcon : TfiRulerPencil,
        subMenu : ["All Classes", "Add Classes"],
        menuLink : ["/admin-dashboard/all-classes", "/admin-dashboard/add-classes"],
    },
    {
        id : 4,
        menuTitle : "Subjects",
        menuIcon : GiBookPile,
        subMenu : ["All Subjects", "Add Subjects"],
        menuLink : ["/admin-dashboard/all-subjects", "/admin-dashboard/add-subjects"],
    },
    {
        id : 5,
        menuTitle : "Students",
        menuIcon : PiStudentFill,
        subMenu : ["All Students", "Add Student", "Student ID Card", "Upgrade Student", "Login Portal"],
        menuLink : ["/admin-dashboard/all-students", "/admin-dashboard/add-students", "", "", "std-login-portal"],
    },
    {
        id : 6,
        menuTitle : "Employee",
        menuIcon : FaUserShield,
        subMenu : ["All Employee", "Add Employee", "Employee ID Card", "Login Portal"],
        menuLink : ["/admin-dashboard/all-employee", "/admin-dashboard/add-employee", "", "emp-login-portal"],
    },
    {
        id : 7,
        menuTitle : "Attendance",
        menuIcon : RiUserFollowLine,
        subMenu : ["Employee Attendance", "Student Attendance"],
        menuLink : ["employee-attendance", "search"],
    },
    {
        id : 8,
        menuTitle : "Account",
        menuIcon : HiBriefcase,
        subMenu : ["All Accounts", "Add Account"],
        menuLink : ["link1", "link2"],
    },
    {
        id : 9,
        menuTitle : "Exam",
        menuIcon : LuClipboardPen,
        subMenu : [],
        menuLink : [],
    },
    {
        id : 10,
        menuTitle : "Results",
        menuIcon : PiExam,
        subMenu : [],
        menuLink : [],
    },
    {
        id : 11,
        menuTitle : "Timetable",
        menuIcon : SlCalender,
        subMenu : [],
        menuLink : [],
    },
    {
        id : 12,
        menuTitle : "Notice",
        menuIcon : FaPaperPlane,
        subMenu : ["New Notice", "Published Notice"],
        menuLink : ["/admin-dashboard/new-notice", "/admin-dashboard/prev-notice"],
    },
    {
        id : 13,
        menuTitle : "Certificates",
        menuIcon : TbCertificate,
        subMenu : ["T/C Certificate"],
        menuLink : ["/admin-dashboard/students-list"],
    },
    //admin-dashboard/ {
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