import { exit } from "node:process";
import { chromium } from "playwright";
import { randomBytes } from "node:crypto";

try {
  await main();
  exit(0);
} catch (error) {
  console.error("Error:", error);
  exit(1);
}

async function main() {
  console.log("Hello Playwright payload maximizing tester!");
  const browser = await chromium.launch(/*{ headless: false, slowMo: 50 }*/);

  const kiB = 1024;
  const MiB = kiB * kiB;
  const start = 100 * MiB - 5 * kiB;
  const end = 100 * MiB + 5 * kiB;
  const increment = 1 * kiB;
  for (let size = start; size <= end; size += increment) {
    try {
      const roundTripSize = await trySize(size, browser);
      console.log(
        `roundTripSize Success: ${size} == ${roundTripSize} bytes ${toMiB(
          size
        )} == ${toMiB(roundTripSize)} MiB`
      );
    } catch (error) {
      console.log(
        `roundTripSize Failure: ${size} bytes ${size / 1024 / 1024} MiB`
      );
      console.error("Error:", error.message);
      exit(1);
    }
  }
  await browser.close();
}

function toMiB(bytes) {
  return (bytes / 1024 / 1024).toFixed(4);
}

async function trySize(size, browser) {
  const randomString = generateRandomString(size);
  // console.log(
  //   ` nodejs:debug:randomString ${randomString.length}b ${
  //     randomString.length / 1024 / 1024
  //   } MiB`
  // );

  const page = await browser.newPage();
  page.on("console", (msg) => {
    const concat = msg
      .args()
      .map((arg) => `${arg}`)
      .join(" ");
    console.log(concat);
  });
  await page.goto("about:blank");

  // await page.waitForFunction(() => typeof ePub !== "undefined");
  const roundTripSizeInBytes = await page.evaluate(async (randomString) => {
    // console.log(
    //   `browser:debug:randomString ${randomString.length}b ${
    //     randomString.length / 1024 / 1024
    //   }MiB`
    // );

    const roundTripSizeInBytes = randomString.length;
    return roundTripSizeInBytes;
  }, randomString);
  return roundTripSizeInBytes;
}

function generateRandomString(size) {
  const byteSize = Math.ceil((size * 3) / 4);
  return randomBytes(byteSize).toString("base64").slice(0, size);
}
