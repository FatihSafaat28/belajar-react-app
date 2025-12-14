import Image from "next/image";
import ListName from "@/components/listName";
import { useState } from "react";

const Profile =() => {
  // const userName = "Fatih"
  const [userName, setUserName] = useState<string>("Fatih Safaat");
  const [urutan, setUrutan] = useState<number>(0);
  const changeUserName = (userData: string,urutan:number)=>{
    setUserName(userData)
    setUrutan(urutan)
  }
  const arrayOfNama = [`Gilang`, `Fatih`, `Apif`, `Safaat`]


  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Ini Profile, {userName} {urutan !== 0 && `urutan ke ${urutan}`}
          </h1>
          <div>List Nama User</div>
          <div id="listNama">
            {arrayOfNama.map((nama,index) => {
              return <ListName key={nama} userName={nama} index={index} changeFunction={()=> changeUserName(nama,index+1)}/>
            })}  
          </div>
          <div id="btn-nama" className="cursor-pointer bg-red-900 p-4 hover:bg-red-400" onClick={() => changeUserName('FATIH PARAMETER',100)}> Ganti Username!</div>
          
          
          
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Profile