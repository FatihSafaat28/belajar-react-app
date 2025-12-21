import { useEffect, useState } from "react";

const PromoPage = () => {
  const [productList, setProductlist] = useState<any>([]);
  const [limit, setLimit] = useState<number>(10);

  const getData = async (limit: number) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}`
    );
    const data = await response.json();
    setProductlist(data.products);
    console.log("Cek Data = ", data);
  };
  useEffect(() => {
    getData(limit);
  }, [limit]);
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="font-bold mb-5 text-xl flex-3">List Product</div>
          <div className="flex-1">
            <select
              onChange={(e: any) => setLimit(e.target.value)}
              className="block w-full px-3 py-2 bg-neutral-secondary-medium border font-bold"
              id="countries"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PromoPage;
