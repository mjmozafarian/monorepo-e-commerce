import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/AppLineChart";
import { auth, User } from "@clerk/nextjs/server";

const getData = async (id: string): Promise<User | null> => {
    const { getToken } = await auth();
    const token = await getToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVICE_URL}/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching users:", error);
        return null;
    }
};
const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await getData(id);
    if (!data) {
        return <div>User not found</div>;
    }
    return (
        <div className="">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {data.firstName + " " + data.lastName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* CONTAINER */}
            <div className="mt-4 flex flex-col xl:flex-row gap-8">
                {/* LEFT */}
                <div className="w-full xl:w-1/3 space-y-6">
                    {/* USER BADGES CONTAINER */}
                    <div className="bg-primary-foreground p-4 rounded-lg ">
                        <h1 className="text-xl font-semibold">User Badges</h1>
                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck
                                        size={36}
                                        className="rounded-full bg-blue-500/30 border border-blue-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">
                                        Verified User
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been verified by the
                                        Admin.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Shield
                                        size={36}
                                        className="rounded-full bg-green-800/30 border border-green-800/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">User</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Admin users have access to all features
                                        and can manage other users.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Candy
                                        size={36}
                                        className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Awarded</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been awarded for their
                                        contributions.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Citrus
                                        size={36}
                                        className="rounded-full bg-orange-500/30 border border-orange-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Popular</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been popular in the
                                        community.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    {/* USER CARD CONTAINER */}
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-4 ">
                        <div className="flex items-center gap-2">
                            <Avatar className="size-12">
                                <AvatarImage
                                    src={
                                        data.imageUrl ||
                                        "https://avatars.githubusercontent.com/u/1486366"
                                    }
                                />
                                <AvatarFallback>
                                    {data?.firstName?.charAt(0) ||
                                        data?.lastName?.charAt(0) ||
                                        "-"}
                                </AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-semibold">
                                {data.firstName + " " + data.lastName}
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Animi quidem eaque suscipit rerum nisi
                            molestias sapiente tempora magni, vel minima placeat
                            accusamus eveniet officia soluta eligendi a iure
                            enim ea?
                        </p>
                    </div>
                    {/* INFORMATION CONTAINER */}
                    <div className="bg-primary-foreground p-4 rounded-lg ">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold">
                                User Information
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        Edit User
                                    </Button>
                                </SheetTrigger>
                                <EditUser />
                            </Sheet>
                        </div>
                        <div className="space-y-4 mt-4">
                            <div className="flex flex-col gap-2 mb-8">
                                <p className="text-sm text-muted-foreground">
                                    Profile Completion
                                </p>
                                <Progress value={33} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Fullname:</span>
                                <span>
                                    {data.firstName + " " + data.lastName}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Email:</span>
                                <span>
                                    {data?.emailAddresses?.at(0)?.emailAddress}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Phone:</span>
                                <span>
                                    {data?.phoneNumbers?.at(0)?.phoneNumber ||
                                        "-"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Role:</span>
                                <span>
                                    {String(data?.publicMetadata?.role) ||
                                        "User"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Status:</span>
                                <span>{data.banned ? "Banned" : "Active"}</span>
                            </div>

                            <p className="text-sm text-muted-foreground mt-4">
                                Joined on{" "}
                                {new Date(data.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div className="w-full xl:w-2/3 space-y-6">
                    {/* CHART CONTAINER */}
                    <div className="bg-primary-foreground p-4 rounded-lg ">
                        <h1 className="text-xl font-semibold">
                            User Activities
                        </h1>
                        <AppLineChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
