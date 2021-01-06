const fetch = require("node-fetch");

const SITE_ID = process.env.SITE_ID;

async function load() {
  const response = await fetch(
    `https://${SITE_ID}.staging-gatsbyjs.io/page-data/index/page-data.json`,
    {
      headers: {
        "Fastly-Debug": "1",
        Accept: "*/*",
        Pragma: "no-cache",
        Referer: `https://${SITE_ID}.staging-gatsbyjs.io/`,
        "Cache-Control": "no-cache",
        Host: `${SITE_ID}.staging-gatsbyjs.io`,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15",
        "Accept-Language": "en-gb",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: " keep-alive",
      },
    }
  );
  if (!response.ok) {
    console.log(`Error:`, await response.text());
    throw new Error(`Failed to fetch resource: ${response.status}`);
  }
  const json = await response.json();
  const nodeTitle = json.result.data.allDatoCmsWork.edges[0].node.title;
  console.log({
    title: nodeTitle,
    server: response.headers.get("x-served-by"),
  });
  const match = /Flyer \d\d\d/.test(nodeTitle);
  if (!match) {
    console.log(
      `\nTitle: ${nodeTitle}, Headers: `,
      JSON.stringify(response.headers.raw(), null, 2)
    );
    throw new Error(`Title didn't match. Got ${nodeTitle}`);
  }
}

async function main() {
  let running = true;
  setTimeout(() => {
    running = false;
  }, 5 * 60 * 1000);

  while (running) {
    await Promise.all([load(), load(), load(), load()]);
  }

  console.log("Could not repro");
}

main();
