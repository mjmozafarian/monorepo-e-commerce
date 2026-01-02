"'use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
    const { signOut } = useAuth();
    return (
        <div className="flex items-center justify-center">
            <h1>You do not have permission to view this page.</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default Page;
