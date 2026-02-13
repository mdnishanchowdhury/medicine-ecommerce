import { Route } from "@/types/menuBar";
import {
    UserCircle,
    ShoppingBag,
    LayoutDashboard,
    Settings,
    CreditCard,
    Home,
    Truck
} from "lucide-react";

export const customerRoutes: Route[] = [
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
                url: "/customer-dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Account Management",
        items: [
            {
                title: "My Orders",
                url: "/customer-dashboard/myOrders",
                icon: ShoppingBag
            },
            {
                title: "Delivery Product",
                url: "/customer-dashboard/delivery",
                icon: Truck
            },
            {
                title: "My Profile",
                url: "/customer-dashboard/profile",
                icon: UserCircle
            },
        ],
    },
    {
        title: "Preferences",
        items: [
            {
                title: "Settings",
                url: "/customer-dashboard/settings",
                icon: Settings,
            },
        ],
    },
];