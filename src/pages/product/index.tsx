import Image from "next/image";
import { useEffect, useState } from "react";
import CoffeeCard from "@/components/coffeeCard";
import coffeeList from "@/helpers";

const ProductList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [testEffect, setTestEffect] = useState<any>();
  const [selectedCoffee, setSelectedCoffee] = useState<
    (typeof coffeeList)[0] | null
  >(null);
  useEffect(() => {
    if (searchText.length > 4) {
      setTestEffect(`Isi sudah lebih dari 4 karakter`);
    } else {
      setTestEffect(`Isi sudah kurang dari 4 karakter`);
    }
  }, [searchText]);

  return (
    <div className="flex flex-col overflow-clip">
      <div className="px-4 py-2">
        <input
          type="text"
          className="border border-black rounded-xl px-4 py-2"
          onChange={(e: any) => {
            setSearchText(e.target.value);
            console.log(e);
          }}
        />
        <div>use effect Massage = {testEffect}</div>
        <div>isi dari search text = {searchText}</div>
      </div>

      <div className="py-6 px-6 font-bold text-5xl">Coffee List</div>
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {coffeeList.map((coffee, index) => {
          return (
            <CoffeeCard
              key={index}
              coffee={coffee}
              onClick={() => setSelectedCoffee(coffee)}
            />
          );
        })}
      </div>
      {selectedCoffee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedCoffee(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-lg w-full relative flex flex-col items-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden mb-6 w-full flex justify-center">
              <Image
                className="w-full h-64 object-cover"
                src={selectedCoffee.image}
                alt={selectedCoffee.title}
                width={500}
                height={300}
              />
            </div>
            <div className="text-3xl text-black font-bold mb-2 text-center">
              {selectedCoffee.title}
            </div>
            <div className="text-lg text-black font-normal text-center">
              {selectedCoffee.subtitle}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;
