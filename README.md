# playwright-max-payload

The maximum length of a string parameter to page.evaluate(fn,stringArg) is 100MiB

`tl;dr``

This was to answer my own question on the Playwright discord.
<https://discord.com/channels/807756831384403968/1159616073059016705/1159616073059016705>

## Usage

```sh
pnpm install
pnpm start
```

```txt
Hello Playwright payload maximizing tester!
roundTripSize Success: 103809024 == 103809024 bytes 99.00 == 99.00 MiB
roundTripSize Success: 103911424 == 103911424 bytes 99.10 == 99.10 MiB
roundTripSize Success: 104013824 == 104013824 bytes 99.20 == 99.20 MiB
roundTripSize Success: 104116224 == 104116224 bytes 99.29 == 99.29 MiB
roundTripSize Success: 104218624 == 104218624 bytes 99.39 == 99.39 MiB
roundTripSize Success: 104321024 == 104321024 bytes 99.49 == 99.49 MiB
roundTripSize Success: 104423424 == 104423424 bytes 99.59 == 99.59 MiB
roundTripSize Success: 104525824 == 104525824 bytes 99.68 == 99.68 MiB
roundTripSize Success: 104628224 == 104628224 bytes 99.78 == 99.78 MiB
roundTripSize Success: 104730624 == 104730624 bytes 99.88 == 99.88 MiB
roundTripSize Success: 104833024 == 104833024 bytes 99.98 == 99.98 MiB
roundTripSize Failure: 104935424 bytes 100.07421875 MiB
Error: page.evaluate: Target closed
```

## Answer

The maximum length of a string parameter to page.evaluate(fn,stringArg) is 100MiB

## Question

I am invoking page.evaluate with a function, and am passing in a very large string.

This is working great

```js
const roundTripSizeInBytes = await page.evaluate(async (randomString) => {
  const roundTripSizeInBytes = randomString.length;
  return roundTripSizeInBytes;
}, randomString);
```

But in a few cases, I am getting:

```txt
Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
```

It seems to be related to the payload size.

Is there a maximum size to the passed parameter, in my case it seem to fail at about 100MiB.

roundTripSize Failure: 104935424 bytes 100.07421875 MiB
