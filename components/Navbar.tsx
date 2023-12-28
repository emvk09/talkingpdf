import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { opensans, pacifico } from "@/lib/fonts";

export default function Navbar() {
  return (
    <nav className="w-full h-16 sticky z-30 inset-x-0 top-0 border-b border-gray-200 bg-white/70 backdrop-blur-xl transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex font-semibold text-xl select-none">
            <span className={pacifico.className}>
              talking
              <span className={`${opensans.className} text-[#dc2626]`}>
                PDF.
              </span>
            </span>
          </Link>

          {/* Add mobile navbar */}

          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/pricing"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-[15px] text-gray-900",
              })}
            >
              <h4>Pricing</h4>
            </Link>
            <LoginLink
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-[15px] text-gray-900",
              })}
            >
              <h4>Sign in</h4>
            </LoginLink>
            <LogoutLink
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-[15px] text-gray-900",
              })}
            >
              <h4>Sign out</h4>
            </LogoutLink>
            <RegisterLink
              className={buttonVariants({
                variant: "default",
                size: "sm",
              })}
            >
              Get started <ArrowRight className="ml-1.5 h-5 w-5" />
            </RegisterLink>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
