const fetch = require("node-fetch");

async function load() {
  const response = await fetch(
    "https://f19ec6b8-1892-4244-880c-a03b031b59f1.staging-gatsbyjs.io/page-data/index/page-data.json",
    {
      headers: {
        "Fastly-Debug": "1",
        Accept: "*/*",
        Pragma: "no-cache",
        Referer:
          "https://f19ec6b8-1892-4244-880c-a03b031b59f1.staging-gatsbyjs.io/",
        "Cache-Control": "no-cache",
        Host: " f19ec6b8-1892-4244-880c-a03b031b59f1.staging-gatsbyjs.io",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15",
        "Accept-Language": "en-gb",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: " keep-alive",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch resource: ${response.status}`);
  }
  const json = await response.json();
  const nodeTitle = json.result.data.allDatoCmsWork.edges[0].node.title;
  console.log({ title: nodeTitle });
  // process.stdout.write(".");
  const match = /Flyer \d\d\d/.test(nodeTitle);
  if (!match) {
    console.log(`Headers: `, JSON.stringify(response.headers.raw()));
    throw new Error(`Title didn't match. Got ${nodeTitle}`);
  }
}

async function main() {
  while (true) {
    await Promise.all([load(), load(), load(), load()]);
  }
}

main();
