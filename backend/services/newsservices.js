const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5b20128f3d8c4a6ca5813b41f3d98ea0');

const fetchNewsFromAPI = async (location) => {
    try {
        const response = await newsapi.v2.everything({
            q: location,
            language: 'en',
            sortBy: 'relevancy',
            sources: 'bbc-news,the-verge',
            page: 1,
        });
        return relevantresponse(response.articles);
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}

const relevantresponse = (response) => {
    return response.map((article) => {
        return {
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
        }
    });
}

module.exports = {
    fetchNewsFromAPI
}
