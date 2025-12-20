import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserAlbum = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<any>({});
  const [albums, setalbums] = useState<any>([]);
  useEffect(() => {
    if (!router.isReady) return;

    console.log(`ini router:`, router.query.id);
    getData(router.query.id);
    getDataAlbums(router.query.id);
  }, [router.isReady]);

  const getData = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await response.json();
    setDetail(data);
    console.log("data user", data);
  };

  const getDataAlbums = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );
    const data = await response.json();
    setalbums(data);
    console.log("data album", data);
  };

  return (
    <div className="container mx-auto">
      <div className="font-bold text-2xl">User</div>
      <div className="bg-gray-300 mb-5 px-2 py-2 rounded-2xl">
        <div className="font-bold">{detail.name}</div>
        <div className="font-normal">{detail.email}</div>
      </div>
      <div>
        <div className="font-bold text-2xl">albums</div>
        <div>
          {albums.map((albums: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-gray-300 mb-5 px-2 py-2 rounded-2xl"
              >
                <div className="mb-1">
                  <span className="font-bold">{index + 1}</span>. Album Name :{" "}
                  <span className="italic font-normal">{albums.title}</span>
                  <div>{albums.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UserAlbum;
