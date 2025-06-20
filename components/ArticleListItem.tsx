import Link from "next/link";
import type { ArticleItem } from "@/types";

// Define the props before the component function so as not to clog up the declaration line
interface Props {
  category: string;
  articles: ArticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-serif text-4xl">{category}</h2>
      <div className="flex flex-col gap-2.5 text-lg font-sans-serif">
        {articles.map((article, id) => (
          <Link
            href={`/${article.id}`}
            key={id}
            className="text-cyan-600 hover:text-amber-700 transition duration-150"
          >
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
