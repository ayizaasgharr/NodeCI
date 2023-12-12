const puppeteer = require("puppeteer");

const Page = require("./helpers/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  console.log("page=", page);
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("we can launch a browser", async () => {
  //headless false means without gui
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //   });
  //   const page = await browser.newPage();
  //   page.goto("localhost:3000");
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

test("clicking login start auth flow", async () => {
  await page.click(".right a");
  const url = await page.url();
  //   console.log("url", url);
  expect(url).toMatch(/account\.google\.com/);
});

test.only("testing button after signin", async () => {
  //   const id = "657183940e4a5d351fb1bc0a";
  await page.login();
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual("Logout");
});
