import { Route } from "@/types/menuBar";
import {
    UserCircle,
    LayoutDashboard,
    Settings,
    Home,
    Truck,
    Users,
    Pill,
    LayoutGrid
} from "lucide-react";

export const sellerRoutes: Route[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Home",
                url: "/",
                icon: Home,
            },
            {
                title: "Dashboard",
                url: "/seller-dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Account Management",
        items: [
            {
                title: "All Category",
                url: "/seller-dashboard/allCategory",
                icon: LayoutGrid
            },
            {
                title: "All Medicine",
                url: "/seller-dashboard/allMedicine",
                icon: Pill
            },
            {
                title: "Customer Orders",
                url: "/seller-dashboard/customerOrders",
                icon: Truck
            },
            {
                title: "Order History",
                url: "/seller-dashboard/orderHistory",
                icon: Truck
            },
            {
                title: "Customer Orders",
                url: "/seller-dashboard/customerOrders",
                icon: Truck
            },
            {
                title: "My Profile",
                url: "/seller-dashboard/profile",
                icon: UserCircle
            }
        ],
    },
    {
        title: "Preferences",
        items: [
            {
                title: "Settings",
                url: "/seller-dashboard/settings",
                icon: Settings,
            },
        ],
    },
];