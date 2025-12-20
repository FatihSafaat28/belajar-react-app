import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const UserPage = () => {
  const [userList, setUsetList] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsetList(data);
    console.log("data", data);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-row font-bold">
            <div className="w-[20%]">Nama</div>
            <div className="w-[40%]">Email</div>
            <div className="w-[20%]">Phone</div>
            <div className="w-[20%]">Album</div>
          </div>
          {userList.map((user: any) => {
            return (
              <div key={user.name} className="flex flex-row mt-4">
                <div className="w-[20%]">{user.name}</div>
                <div className="w-[40%]">{user.email}</div>
                <div className="w-[20%]">{user.phone}</div>
                <div className="w-[20%]">
                  <span
                    className=" bg-blue-600 hover:bg-blue-400 text-white cursor-pointer px-4 py-1 rounded-xl"
                    onClick={() => router.push(`/users/detail/${user.id}`)}
                  >
                    Album
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UserPage;
