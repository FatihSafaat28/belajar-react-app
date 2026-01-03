import { useEffect, useState } from "react";

const mockAPIPage = () => {
  const [mockData, setMockData] = useState<any>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch(
      `https://6958a2d86c3282d9f1d56ac1.mockapi.io/fatih-belajar/tasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMockData(data);
    console.log("data =", data);
  };

  const [tittle, setTittle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const submitData = async () => {
    const payload = {
      title: tittle,
      completed: completed,
    };
    const response = await fetch(
      `https://6958a2d86c3282d9f1d56ac1.mockapi.io/fatih-belajar/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log("Submit =", data);
    if (!data.error) {
      getData();
    }
  };

  const deleteData = async (id: any) => {
    const response = await fetch(
      `https://6958a2d86c3282d9f1d56ac1.mockapi.io/fatih-belajar/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("delete data =", data);
    getData();
  };

  const changeStatus = async (id: any, status: boolean) => {
    const payload = { completed: !status };
    const response = await fetch(
      `https://6958a2d86c3282d9f1d56ac1.mockapi.io/fatih-belajar/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log("change data =", data);
    getData();
  };
  return (
    <div className="container mx-auto">
      <div className="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-fit">
        <h2 className="font-bold">Create New Task</h2>
        <div className="flex gap-4">
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              onChange={(e) => setTittle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Completed</label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              defaultValue="false"
              onChange={(e) => setCompleted(e.target.value === "true")}
            >
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Create</label>
            <button
              onClick={submitData}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-fit">
        {mockData.map((item: any, index: number) => {
          return (
            <div
              key={item.id}
              className="p-4 border border-gray-300 rounded-lg w-fit"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">No : {index + 1}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteData(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Delete Data
                  </button>
                  <button
                    onClick={() => changeStatus(item.id, item.completed)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Change Status
                  </button>
                </div>
              </div>
              <div className="font-semibold w-[50vw]">Title: {item.title}</div>
              <div className="text-gray-600 mt-4">
                Status:{" "}
                {item.completed ? (
                  <span className="text-green-400">Completed</span>
                ) : (
                  <span className="text-red-400">Not Completed</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default mockAPIPage;
