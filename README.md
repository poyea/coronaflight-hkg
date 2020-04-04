This is the backend for [`coronaflight.json`](https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95/raw), i.e. [https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95](https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95), **that is updated continuously**. This goes to Centre for Health Protection in Hong Kong and transforms the "dangerous" flights to JSON for future analysis/reporting. [A sister gist that contains unique history](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f), [`coronaflight-history.json`](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f/raw), for the data is also maintained, i.e. [https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f). From the official description, the official piece of data is visible for only 14 days.

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
