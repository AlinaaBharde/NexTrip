const { fetchNewsFromAPI } = require('../services/newsservices.js');
require('dotenv').config();


const newsController = {
    fetchNews: async (req, res) => {
        try {
            const { CityToVisit, pageNumber } = req.body;
            const news = await fetchNewsFromAPI(CityToVisit, pageNumber);

            if (news === null) {
                return res.status(500).json({ error: "Error fetching news" });
            }
            res.status(200).json(news);
        } catch (err) {
            console.error("Fetching news error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchNews: newsController.fetchNews,
}