// This is a dynamic file as noted by its place in the bracketed directory

import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { getArticleData } from "@/lib/articles"

// remember your syntaxing and explicit type defining. 
const Article = async ({params}: {params: { slug: string } }) => {
    const articleData = await getArticleData(params.slug);

    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between font-sans-serif">
                <Link href={"/"}>
                    <ArrowLeftIcon width={20} />
                    <p>back to home</p>
                </Link>
                <p>{articleData.date.toString()}</p>
            </div>
            <article dangerouslySetInnerHTML={{__html: articleData.contentHtml}} />
        </section>
    )
}

export default Article;