const bitlyToken = "<Your Bitly Access Token>";

/**
 * Shorten url link wiht Bitly API
 *
 * @param {string} longurl The value of lonk url.
 * @return The shorten url of longurl.
 * @customfunction
 */
function shortURL(longurl) {
  const shortenEndPoint = "https://api-ssl.bitly.com/v4/shorten";

  const options = {
    "method": "POST",
    "headers": {
      "Authorization": "Bearer " + bitlyToken,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify({
      "long_url": longurl
    }),
  };

  if (isValidHttpUrl(longurl)) {
    try {
      const shorturl = JSON.parse(UrlFetchApp.fetch(shortenEndPoint, options));
      return shorturl.link;
    } catch (error) {
      return "⚠️Error From Bitly";
    };
  } else {
    return "⚠️Please Check URL";
  }
}

function isValidHttpUrl(string) {
  let resCode;

  try {
    resCode = UrlFetchApp.fetch(string).getResponseCode();
  } catch (error) {
    return false;
  }
  if (resCode === 200) return true;
}

/**
 * Get a Clicks Summary for a Bitlink wiht Bitly API
 *
 * @param {string} bitlyshortlink The short link by Bitly API.
 * @return The clicks summary.
 * @customfunction
 */
function getClicksSummary(bitlyshortlink) {
  const bitlink = bitlyshortlink.split("//")[1];
  
  const clicksSummaryEndPoint = `https://api-ssl.bitly.com/v4/bitlinks/${bitlink}/clicks/summary`;
  Logger.log(clicksSummaryEndPoint)

  const options = {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + bitlyToken,
    }
  };

  try {
    const totalClicks = JSON.parse(UrlFetchApp.fetch(clicksSummaryEndPoint, options));
    return totalClicks.total_clicks;
  } catch (error) {
    return "⚠️Error From Bitly";
  }
}
