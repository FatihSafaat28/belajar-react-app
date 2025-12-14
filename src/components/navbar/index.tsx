import Image from "next/image";

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
            <div className="flex flex-row font-semibold">
                <div className="flex items-center px-6 hover:bg-black hover:text-white">
                    Home
                </div>
                <div className="flex items-center px-6 hover:bg-black hover:text-white">
                    Products
                </div>
                <div className="flex items-center px-6 hover:bg-black hover:text-white">
                    Profile
                </div>
            </div>
            <div className="flex items-center py-4">
                Logo2
            </div>
        </div>
    ); 
}
export default Navbar;