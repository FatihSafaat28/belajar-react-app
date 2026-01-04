import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const isFormIncomplete =
    !formData.name || !formData.email || !formData.address;

  const getData = async () => {
    if (id) {
      const response = await fetch(
        `https://695895df6c3282d9f1d54f77.mockapi.io/articles/${id}`
      );
      const data = await response.json();
      setUser(data);
      setFormData(data);
      setLoading(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `https://695895df6c3282d9f1d54f77.mockapi.io/articles/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    setUser(data);
    alert("Data Updated");
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [id]);

  return (
    <div className="bg-black min-h-screen flex flex-row justify-center">
      <button
        onClick={() => router.back()}
        className="fixed right-[96vw] bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        X
      </button>
      <div className="max-w-md w-fit h-fit bg-gray-800 rounded-lg shadow-lg p-8">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          user && (
            <div className="flex flex-col gap-20">
              <div className="text-white flex flex-row items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-gray-400 mb-4">{user.email}</p>
                  <p className="text-lg">{user.address}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-white text-center">
                  Edit Data
                </h2>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-white">Name</label>
                    <input
                      className="p-2 rounded text-black bg-white border border-black"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white">Email</label>
                    <input
                      className="p-2 rounded text-black bg-white border border-black"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white">Address</label>
                    <input
                      className="p-2 rounded text-black bg-white border border-black"
                      value={formData.address || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isFormIncomplete}
                    className={`p-2 text-white ${
                      isFormIncomplete
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500"
                    }`}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardDetail;
