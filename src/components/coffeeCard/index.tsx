import Image from "next/image";

type Coffee = {
    title: string;
    subtitle: string;
    image: string;
}

type CoffeeCardProps = {
    coffee: Coffee;
    onClick: () => void;
}

const CoffeeCard = ({ coffee, onClick }: CoffeeCardProps) => {
    return (
        <div className="flex w-fit h-fit flex-col items-start px-6 hover:scale-105 hover:opacity-90 cursor-pointer" onClick={onClick}>
            <div className="flex justify-center items-center rounded-3xl overflow-clip mb-4">
                <Image
                    className="w-100 h-50 object-cover"
                    src={coffee.image}
                    alt={coffee.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                />
            </div>
            <div className="font-bold">{coffee.title}</div>
            <div className="font-normal">{coffee.subtitle}</div>
        </div>
    );
};

export default CoffeeCard;
