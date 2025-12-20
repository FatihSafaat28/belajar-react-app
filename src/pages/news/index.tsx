import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const NewsPage = () => {
  const [postList, setPostList] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPostList(data);
    console.log("data", data);
  };

  return (
    <div>
      <div className="container mx-auto">
        {postList.map((post: any) => {
          return (
            <div
              key={post.title}
              className="bg-gray-100 hover:bg-gray-500 mb-5 cursor-pointer px-2 py-2 rounded-2xl"
              onClick={() => router.push(`/news/detail/${post.id}`)}
            >
              <div className="font-bold">{post.title}</div>
              <div className="font-normal">{post.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NewsPage;
