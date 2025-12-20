import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailPost = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<any>({});
  const [comment, setComment] = useState<any>([]);
  useEffect(() => {
    if (!router.isReady) return;

    console.log(`ini router:`, router.query.id);
    getData(router.query.id);
    getDataComment(router.query.id);
  }, [router.isReady]);

  const getData = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    setDetail(data);
    console.log("data", data);
  };

  const getDataComment = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const data = await response.json();
    setComment(data);
    console.log("data", data);
  };

  return (
    <div className="container mx-auto">
      <div className="font-bold text-2xl">Post</div>
      <div className="bg-gray-300 mb-5 px-2 py-2 rounded-2xl">
        <div className="font-bold">{detail.title}</div>
        <div className="font-normal">{detail.body}</div>
      </div>
      <div>
        <div className="font-bold text-2xl">Comments</div>
        <div>
          {comment.map((comment: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-gray-300 mb-5 px-2 py-2 rounded-2xl"
              >
                <div className="mb-1">
                  <span className="font-bold">{comment.name}</span> by{" "}
                  <span className="italic text-gray-500">{comment.email}</span>
                  <div>{comment.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DetailPost;
