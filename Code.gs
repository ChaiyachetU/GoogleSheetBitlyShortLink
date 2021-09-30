/**
 * Shorten url link wiht Bitly API
 *
 * @param {url} input The value of lonk url.
 * @return The shorten url.
 * @customfunction
 */
function shortURL(longurl) {
  const bitlyToken = "<Your Bitly Token>";
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