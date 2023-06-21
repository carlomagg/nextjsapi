import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://app.scrapeak.com/v1/scrapers/zillow/listing';
  const api_key = 'd6d7920e-6535-43a6-b11c-af40604a081c';
  const listing_url = 'https://www.zillow.com/los-angeles-ca/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22north%22%3A55.89449180093996%2C%22east%22%3A-58.830708375000015%2C%22south%22%3A12.930823520220883%2C%22west%22%3A-133.537739625%7D%2C%22mapZoom%22%3A4%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12447%2C%22regionType%22%3A6%7D%2C%7B%22regionId%22%3A6181%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22sort%22%3A%7B%22value%22%3A%22days%22%7D%7D%2C%22isListVisible%22%3Atrue%7D';

  const headers = {
    Authorization: `Bearer ${api_key}`,
  };

  const params = {
    api_key: api_key,
    url: listing_url,
  };

  try {
    const response = await axios.get(url, {
      headers: headers,
      params: params,
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      const { status, data } = error.response;
      res.status(status).json({ error: data });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: 'No response received from the server' });
    } else {
      // Other errors occurred
      res.status(500).json({ error: 'An error occurred while making the request' });
    }
  }
}
