import { auth, type User } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<{ data: User[]; totalCount: number }> => {
    const { getToken } = await auth();
    const token = await getToken();
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_AUTHENTICATION_SERVICE_URL}/users`,
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
        return { data: [], totalCount: 0 };
    }
};
const UsersPage = async () => {
    const res = await getData();
    return (
        <div>
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">Users</h1>
            </div>
            <DataTable data={res.data} columns={columns} />
        </div>
    );
};

export default UsersPage;
