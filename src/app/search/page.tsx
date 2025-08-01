"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { searchArticles } from "@/lib/api";
import ArticleCard from "@/app/components/ArticleCard";
import { ArticleResponse, ApiError, ApiErrorType } from "@/lib/types";

const SearchComponent: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (queryParam) {
      searchArticles(queryParam).then((articles) => {
        if (articles instanceof ApiError) {
          switch (articles.errorType) {
            case ApiErrorType.FAILED_VALIDATION:
                return <div>failed response validation</div>;
            case ApiErrorType.NOT_FOUND:
                return <div>記事がありません</div>;
            default:
                setArticles([]);
          }
        } else {
          setArticles(articles as ArticleResponse[]);
        }
      });
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
          {queryParam && <h1 className="text-2xl font-medium p-2 text-gray-600">"{ queryParam }"の検索結果</h1> }
          {articles.length > 0 ? (
            articles.map((article: ArticleResponse) => (
              <div key={article.id} className="my-4">
                  <ArticleCard article={article} showAuthor={true} />
              </div>
            ))
          ) : (
            <p className="text-center mt-8">No articles found</p>
          )}
        </div>
      )}
    </div>
  );
};

const SearchPage = () => (
  <Suspense fallback={<div></div>}>
    <SearchComponent />
  </Suspense>);


export default SearchPage;
