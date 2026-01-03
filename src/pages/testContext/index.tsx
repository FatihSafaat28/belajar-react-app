import { ListNewsContext } from "@/context";
import { useContext, useEffect } from "react";

const TestContext = () => {
  const { postList, getData } = useContext(ListNewsContext);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>ini test context</h1>
      <div className="flex flex-col gap-4">
        {postList.map((post: any) => (
          <div key={post.id} className="flex flex-col px-2 py-1 bg-gray-400">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TestContext;
