"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { searchArticles } from "@/lib/api";
import { safeStringify } from "@/lib/utils";
import ArticleCard from "@/app/components/ArticleCard";

type Article = {
  _id: any;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

const SearchComponent: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryParam) {
      const fetchArticles = async () => {
        setLoading(true);
        try {
          const result = await searchArticles(queryParam);
          setArticles(result);
        } catch (error) {
          console.error("Failed to search articles:", error);
          setArticles([]);
        } finally {
          setLoading(false);
        }
      };
      fetchArticles();
    } else {
      setArticles([]);
    }
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search_query") as string;
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/search.svg"
              alt="Search Icon"
              width={20}
              height={20}
            />
          </span>
          <input
            type="text"
            name="search_query"
            placeholder="Search articles..."
            className="w-full p-2 pl-10 border-2 border-gray-300 rounded"
            defaultValue={queryParam}
          />
        </div>
      </form>
      

      {loading ? (
        <div></div>
        // <p className="text-center mt-8">Loading...</p>
      ) : (
        
        <div className="mt-8 mx-8">
          {queryParam && <h1 className="text-2xl font-medium p-2 text-gray-600">"{ safeStringify(queryParam) }"の検索結果</h1> }
          {articles.map((article) => (
            <div key={safeStringify(article._id)} className="my-4">
                <ArticleCard article={article} showAuthor={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchPage = () => (
　　<SearchComponent />
);


export default SearchPage;
