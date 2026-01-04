import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between px-6 text-black bg-white">
      <div className="py-4 flex-col">
        <Image
          className="light:invert w-16.25 h-auto"
          src="https://www.shutterstock.com/image-vector/natural-coffee-aroma-logo-beans-600nw-2650987891.jpg"
          alt="Next.js logo"
          width={0}
          height={0}
          sizes="100vw"
          priority
        />
      </div>
      <div className="flex flex-row font-semibold flex-wrap justify-center">
        <Link
          href="/dashboard"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Dashboard
        </Link>
        <Link
          href="/product"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Products
        </Link>
        <Link
          href="/profile"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Profile
        </Link>
        <Link
          href="/news"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          News
        </Link>
        <Link
          href="/users"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Users
        </Link>
        <Link
          href="/promo"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Promo
        </Link>
        <Link
          href="/counter"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Counter
        </Link>
        <Link
          href="/testContext"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Test Context
        </Link>
        <Link
          href="/mockAPI"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Mock API
        </Link>
      </div>
      <div className="flex flex-row font-semibold">
        <Link
          href="/register"
          className="flex items-center px-6 hover:bg-black hover:text-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
