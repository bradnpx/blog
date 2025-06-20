// This library module is responsible for processing the markdown files and returning the data to the application.
// Then the Article Component will take over the rendering.

import fs from 'fs'; // file system module
import path from 'path'; // setting paths
import matter from 'gray-matter'; // parsing metadata in markdown files
import moment from 'moment'; // for date formatting
import { remark } from 'remark'; // markdown processing library
import html from 'remark-html'; // converting markdown to HTML

// Importing the type definition for articles
import { ArticleItem } from '@/types';

// Look for the articles in '/articles'
const articlesDirectory = path.join(process.cwd(), 'articles');


const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory);
    
    const allArticlesData = fileNames.map((fileName) => {
        // The article id will be generated from the file name since it's unique
        const id = fileName.replace(/\.md$/, ''); // remove the file extension

        // Read the file content
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // Process the metadata with matter
        const matterResult = matter(fileContents);

        return {
            id,
            title: matterResult.data.title as string,
            date: matterResult.data.date as string,
            category: matterResult.data.category as string
        }
    })

    // When we return the articles, we're gonna sort them first by date then by category

    // Date sorting
    return allArticlesData.sort((a, b) => {
        const format = 'MM-DD-YYYY';
        const dateA = moment(a.date, format);
        const dateB = moment(b.date, format);
        if (dateA.isBefore(dateB)) {
            return -1; // a comes before b
        } else if (dateA.isAfter(dateB)) {
            return 1; // a comes after b
        } else {
            return 0; // dates are equal, no change in order
        }
    });
}

// Sort by category then export module
export const getCategorizedArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getSortedArticles();
    const categorizedArticles: Record<string, ArticleItem[]> = {}
    sortedArticles.forEach((article) => {
        if(!categorizedArticles[article.category]) {
            categorizedArticles[article.category] = []
        }
        categorizedArticles[article.category].push(article);
    });

    return categorizedArticles;
}

// Export the data from the article
export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: moment(matterResult.data.date, 'MM-DD-YYYY').format('MMMM Do YYYY')
    }
}