import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import {
    SignedOut,
    SignInButton,
    SignedIn,
    UserButton,
    SignUpButton,
} from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
            {/* Left */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="TrendLama"
                    width={36}
                    height={36}
                    className="w-6 h-6 md:w-9 md:h-9"
                />
                <p className="hidden md:block text-md font-medium uppercase tracking-wider">
                    TrendLama.
                </p>
            </Link>
            {/* Right */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/" className="text-sm font-medium">
                    <Home className="size-4 text-gray-600" />
                </Link>
                <Bell className="size-4 text-gray-600" />
                <ShoppingCartIcon />
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <ProfileButton />
                </SignedIn>
            </div>
        </nav>
    );
};
export default Navbar;
