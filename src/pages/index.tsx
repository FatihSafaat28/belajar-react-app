import router from "next/router";
import { useEffect, useState } from "react";
interface FormState {
  email: string;
  password: string;
}
const Home = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [resultForm, setResultForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(form);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
    };
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", form.email);
    console.log("Token saved to localStorage", data.token);
    router.push("/dashboard");
  };

  const [userList, setUserList] = useState<any[]>([]);
  useEffect(() => {
    const getUserList = async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
      };
      const response = await fetch("https://reqres.in/api/users?per_page=12", {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      console.log(data);
      setUserList(data.data);
    };
    getUserList();
  }, []);

  return (
    <main className="container mx-auto mt-10 p-4 flex flex-col gap-4 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex flex-col gap-2">
          <label htmlFor="">email</label>
          <input
            className="border-black border-2 rounded-md px-2 py-1"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">password</label>
          <input
            className="border-black border-2 rounded-md px-2 py-1"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="border-black hover:bg-gray-400 cursor-pointer border-2 rounded-md px-2 py-1"
        >
          Submit
        </button>
      </form>
      <div>
        <h1 className="mt-4 text-2xl font-bold">Daftar Akun</h1>
        <div className="grid grid-cols-3">
          {userList.map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 rounded-md p-4 m-2"
            >
              <p>Email: {user.email}</p>
              <p>First Name: {user.first_name}</p>
              <p>Last Name: {user.last_name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Home;
