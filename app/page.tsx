import ArticleItemList from "@/components/ArticleListItem";
import { getCategorizedArticles } from "@/lib/articles";

const HomePage = () => {
  const articles = getCategorizedArticles();

  console.log(articles);
  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-serif font-light text-6xl text-center">
        <h1>Welcome to the Blog</h1>
      </header>
      <section>
        {articles !== null &&
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </section>
    </section>
  );
};

export default HomePage;
