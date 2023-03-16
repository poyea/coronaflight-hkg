<img align="left" width="150" height="150" src="https://user-images.githubusercontent.com/24757020/148883105-c4e44c23-fde1-40c4-8fcc-89b218004939.png" alt="Mask">

# coronaflight-hkg  ![deprecated](https://img.shields.io/badge/maintenance-deprecated-red.svg) [![Node.js crawl trial](https://github.com/poyea/coronaflight-hkg/actions/workflows/nodejs.yml/badge.svg)](https://github.com/poyea/coronaflight-hkg/actions/workflows/nodejs.yml) [![ESLint](https://github.com/poyea/coronaflight-hkg/actions/workflows/eslint.yml/badge.svg)](https://github.com/poyea/coronaflight-hkg/actions/workflows/eslint.yml)

**`coronaflight-hkg` and its generated data are now deprecated and will no longer be maintained nor updated.** Due to the evolving nature of the COVID-19 pandemic and the changes in travel restrictions and regulations, we are unable to provide accurate and up-to-date information for the Hong Kong region.

We understand that this repository has been a valuable resource for you, and we apologise for any inconvenience caused by this deprecation. However, we believe that it is important to prioritize the accuracy and reliability of the information we provide.

We encourage you to seek out alternative sources for information on travel restrictions and regulations in the Hong Kong region. We also recommend that you follow official government and health organization guidelines for COVID-19 prevention and safety.

Thank you for your understanding and support.

Sincerely,<br/>
[John Law (@poyea)](https://github.com/poyea/)

## Description

`coronaflight-hkg` is the backend for [`coronaflight.json`](https://gist.github.com/poyea/8ce06b31763379e2084cb2022b88b79a/raw), i.e. [gist 8ce06b31763379e2084cb2022b88b79a](https://gist.github.com/poyea/8ce06b31763379e2084cb2022b88b79a), **that is updated continuously**. This goes to Centre for Health Protection in Hong Kong and transforms the "dangerous" flights to JSON for future analysis/reporting. [A sister gist that contains unique history](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f), [`coronaflight-history.json`](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f/raw), for the data is also maintained, i.e. [gist fa1f2988c4f424d3e42b9284e751663f](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f). From the official description, the official piece of data is visible for only 14 days.

<hr>

## Table of Contents

  * [Setup](#setup)
  * [Cleaning raw](#cleaning-raw)
  * [Document format](#document-format)
  * [If you like this](#if-you-like-this-please)
  * [Source](#source)
  * [Disclaimer](#disclaimer)
  * [License](#license)
  

## Setup
To run locally,

```
git clone https://github.com/poyea/coronaflight-hkg.git
```

Then,

```
npm install
npm run crawl
```

Go and see your files in `out/dump` for dump and `out/json` for output. Respective latest files are in `latest.*` in the two folders. Have fun and stay safe!

## Cleaning raw

To clean your local raw data and obsolete references,

```
npm run clean
```

## Document format

In the output, there are two different types of geographical data. Since CHP used path to indicate the departure cities before, some of the data in history contains only path. When they switched to the current approach, only departure cities are recorded. Readers should assume that the destination city is always Hong Kong for those entries with `departure`.

## If you like this, please

-   Star
-   Fork
-   Contribute

## Contribution Welcome

[File an issue immediately](https://github.com/poyea/coronaflight-hkg/issues) if you find a bug. If you know how to fix it, feel free to [open a pull request](https://github.com/poyea/coronaflight-hkg/pulls). Before commiting, you should

```
npm run lintfix
```

## Source

As said, data are from [Centre for Health Protection, Hong Kong Government](https://www.chp.gov.hk/files/pdf/flights_trains_en.pdf).

## Disclaimer

The owner owns the code, but not any entry of the data. Please use the data at your own discretion and always refer to CHP's offical document for fact.

## License

MIT
