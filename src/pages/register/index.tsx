import { useEffect, useState } from "react";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<any>({
    email: "",
    password: "",
  });
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
  };
  const [registerStatus, setRegisterStatus] = useState<string>("");
  const [userList, setUserList] = useState<any>([]);
  const [totalList, setTotalList] = useState<any>([]);
  const pagination = [1, 2];
  const [page, setPage] = useState<number>(1);

  const getData = async (page: number) => {
    const response = await fetch(`https://reqres.in/api/users/?page=${page}`, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    setUserList(data.data);
    setTotalList(data);
    console.log("data =", data);
  };
  useEffect(() => {
    getData(page);
  }, [page]);

  const submitRegister = async () => {
    const payload = {
      email: registerData.email,
      password: registerData.password,
    };
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.token) {
      setRegisterStatus("Berhasil register");
    } else {
      setRegisterStatus("Gagal register");
    }
    console.log("register =", data);
  };
  const submitLogin = async () => {
    const payload = {
      email: registerData.email,
      password: registerData.password,
    };
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.token) {
      setRegisterStatus("Berhasil login");
    } else {
      setRegisterStatus("Gagal login");
    }
    console.log("login = ", data);
  };

  //      REGISTER
  //     "email": "qatestuser29@gmail.com",
  //     "password": "pistol"

  //   LOGIN
  //  Email : lindsay.ferguson@reqres.in

  return (
    <div className="container mx-auto">
      <div className="font-bold">REGISTER</div>
      <div className="flex gap-4 mb-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Email"
            onChange={(e: any) => {
              setRegisterData({ ...registerData, email: e.target.value });
            }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Password"
            onChange={(e: any) => {
              setRegisterData({ ...registerData, password: e.target.value });
            }}
            required
          />
        </div>
      </div>
      <div>
        <div
          onClick={() => submitRegister()}
          className="w-fit cursor-pointer bg-blue-600 rounded-2xl text-white font-bold px-6 py-2"
        >
          Register
        </div>
      </div>
      <div>{registerStatus}</div>
      {/* LOGIN! */}
      <div className="mt-10 font-bold">LOGIN</div>
      <div>
        <div className="flex gap-4 mb-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Email"
              onChange={(e: any) => {
                setRegisterData({ ...registerData, email: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Password"
              onChange={(e: any) => {
                setRegisterData({ ...registerData, password: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div>
          <div
            onClick={() => submitLogin()}
            className="w-fit cursor-pointer bg-blue-600 rounded-2xl text-white font-bold px-6 py-2"
          >
            Login
          </div>
        </div>
        <div>{registerStatus}</div>
      </div>
      <div>
        <div className="font-bold mt-10">LIST USER</div>
        <div>Total list = {totalList.total}</div>
        <div className="flex flex-row mt-4">
          <div className="w-[20vw] font-bold">Nama</div>
          <div className="w-[80vw] font-bold">Email</div>
        </div>
        {userList.map((user: any) => {
          return (
            <div key={user.id} className="flex flex-row mt-4">
              <div className="w-[20vw]">{user.first_name}</div>
              <div className="w-[80vw]">{user.email}</div>
            </div>
          );
        })}
        <div className="flex flex-row mt-4 gap-4">
          {pagination.map((page: any) => {
            return (
              <div
                onClick={() => {
                  setPage(page);
                }}
                className={`${
                  totalList.page === page
                    ? "bg-blue-700 text-white"
                    : "text-black"
                } rounded px-2 py-1 max-w-fit cursor-pointer`}
              >
                {page}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
