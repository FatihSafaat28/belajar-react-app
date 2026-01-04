import { get } from "http";
import { useRouter } from "next/router";
import { useEffect, useState, useTransition } from "react";
import { start } from "repl";

const DashboardHome = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [userLoading, setUserLoading] = useState(false);
  const [userList, setUserlist] = useState<any>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userLoading, startTransition] = useTransition();

  const getData = async (search?: string) => {
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles?search=" +
        (search || "")
    );
    const data = await response.json();

    if (Array.isArray(data)) {
      setUserlist(data);
    } else {
      setUserlist([]);
    }

    console.log("fetch data", data);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("./");
    } else {
      setToken(localStorage.getItem("token"));
      setUserEmail(localStorage.getItem("email"));
      setLoading(true);
      // getData();
    }
  }, []);
  const doLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("./");
    }, 500);
  };

  const deleteData = async (id: string) => {
    const response = await fetch(
      `https://695895df6c3282d9f1d54f77.mockapi.io/articles/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    getData();
  };
  const createData = async () => {
    const payload = {
      address: "Jl. Merdeka No. 123",
      avatar: "https://i.pravatar.cc/150?u=123",
      createdAt: new Date().toISOString(),
      email: "fatih@example.com",
      followers: "9.999.999",
      name: "Fatih",
      status: true,
    };
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    getData();
  };
  const updateData = async () => {
    const payload = {
      address: "Jl. Merdeka No. 456",
      avatar: "https://i.pravatar.cc/150?u=456",
      createdAt: new Date().toISOString(),
      email: "messi@example.com",
      followers: "9.999.999",
      name: "Messi",
      status: false,
    };
    const response = await fetch(
      `https://695895df6c3282d9f1d54f77.mockapi.io/articles/16`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    getData();
  };

  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log("Search keyword:", search);
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 0) {
        startTransition(async () => {
          getData(search);
        });
      } else if (search === "") {
        startTransition(() => {
          getData();
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return loading ? (
    <div className="bg-black">
      <div className="max-w-100 mx-auto">
        <div className="flex flex-col justify-between items-center mt-4 mb-4">
          <label className="text-white font-bold text-3xl" htmlFor="">
            SEARCH
          </label>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-black rounded-md p-2 border-4 border-black w-full"
          />
        </div>
        <div className="flex justify-between">
          <h1 className="text-white text-3xl font-bold mb-4">User List</h1>
          <button
            onClick={doLogout}
            className="bg-red-500 px-4 py-1 rounded-4xl text-white h-fit cursor-pointer"
          >
            logout
          </button>
          {/* <button
            onClick={createData}
            className="bg-green-500 px-4 py-1 rounded-4xl text-white h-fit cursor-pointer"
          >
            Create User
          </button>
          <button
            onClick={updateData}
            className="bg-yellow-500 px-4 py-1 rounded-4xl text-white h-fit cursor-pointer"
          >
            update
          </button> */}
        </div>
        <div className="bg-black">
          <ul role="list" className="divide-y divide-white/5">
            {userList.length === 0 ? (
              <div className="h-screen">
                <div className="text-white">Data Not Found...</div>
              </div>
            ) : (
              userList.map((user: any) => (
                <div
                  onClick={() => router.push(`./dashboard/${user.id}`)}
                  className="cursor-pointer"
                >
                  <li
                    key={user.email}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={user.avatar}
                        className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-white">{user.followers}</p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div
                          className={`flex-none rounded-full p-1 ${
                            user.status ? "bg-emerald-500/30" : "bg-red-500/30"
                          }`}
                        >
                          <div
                            className={`size-1.5 rounded-full ${
                              user.status ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                        <p className="text-xs/5 text-gray-400">
                          {user.status ? "Online" : "Offline"}
                        </p>
                      </div>
                      {userEmail === "george.bluth@reqres.in" ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteData(user.id);
                          }}
                          className="bg-red-400 px-2 py-0.5 rounded-md text-white cursor-pointer hover:bg-red-700"
                        >
                          Delete User
                        </div>
                      ) : null}
                    </div>
                  </li>{" "}
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export default DashboardHome;
