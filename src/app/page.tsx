"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="text-2xl font-bold m-10">Users</div>
      <div className="flex flex-col gap-10 m-10 border border-gray-200 p-10">
        <Link href="/articles/furakuta" className="text-xl font-bold hover:text-blue-500">furakutaの記事一覧</Link>
        <Link href="/articles/akkey" className="text-xl font-bold hover:text-blue-500">akkeyの記事一覧</Link>
      </div>
    </>
  );
}
