import {
    Calendar,
    ChevronUp,
    Home,
    Inbox,
    Plus,
    Search,
    Settings,
    Shirt,
    ShoppingBasket,
    User,
    User2,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSubButton,
    SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger } from "./ui/sheet";
import AddOrder from "./AddOrder";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
];
const AppSidebar = () => {
    return (
        <Sidebar className="" collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Image
                                    src="/logo.svg"
                                    alt="Dashboard"
                                    width={20}
                                    height={20}
                                />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                        {}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon className="size-[1.2rem] mr-2" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.title === "Inbox" && (
                                        <SidebarMenuBadge>24</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Product</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/products">
                                        <Shirt /> See All Products
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="#">
                                                    <Plus /> Add Product
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SheetTrigger>
                                        <AddProduct />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="#">
                                                    <Plus /> Add Category
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SheetTrigger>
                                        <AddCategory />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Users</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add User</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/users">
                                        <User /> See All Users
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="#">
                                                    <Plus /> Add User
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SheetTrigger>
                                        <AddUser />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Prders / Payments</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Order</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/orders">
                                        <ShoppingBasket /> See All Transactions
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="#">
                                                    <Plus /> Add Order
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SheetTrigger>
                                        <AddOrder />
                                    </Sheet>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> John Doe{" "}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Account</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
