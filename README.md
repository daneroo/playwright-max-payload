# playwright-max-payload

The maximum length of a string parameter to page.evaluate(fn,stringArg) is 100MiB

`tl;dr`

This was to answer my own question on the Playwright discord.
<https://discord.com/channels/807756831384403968/1159616073059016705/1159616073059016705>

## Usage

```sh
pnpm install
pnpm exec playwright install
pnpm start
```

```txt
Hello Playwright payload maximizing tester!
roundTripSize Success: 104852480 == 104852480 bytes 99.9951 == 99.9951 MiB
roundTripSize Success: 104853504 == 104853504 bytes 99.9961 == 99.9961 MiB
roundTripSize Success: 104854528 == 104854528 bytes 99.9971 == 99.9971 MiB
roundTripSize Success: 104855552 == 104855552 bytes 99.9980 == 99.9980 MiB
roundTripSize Success: 104856576 == 104856576 bytes 99.9990 == 99.9990 MiB
roundTripSize Failure: 104857600 bytes 100 MiB
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
