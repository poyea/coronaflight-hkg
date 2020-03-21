This is the backend for [`coronaflight.json`](https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95), i.e. [https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95](https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95), **that is updated continuously**. This goes to Centre for Health Protection in Hong Kong and transforms the "dangerous" flights to JSON for future analysis/reporting. [A sister gist that contains unique history](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f), [`coronaflight-history.json`](https://gist.github.com/poyea/9bac75a6fba7b5ccd4cb0f89416c6f95), for the data is also maintained, i.e. [https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f](https://gist.github.com/poyea/fa1f2988c4f424d3e42b9284e751663f). From the official description, the data is visible for only 14 days.

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

## If you like this, please

-   Star
-   Fork
-   Contribute

## Contribute Welcome

[File an issue immediately](https://github.com/poyea/coronaflight-hkg/issues) if you find a bug. If you know how to fix it, feel free to [open a pull request](https://github.com/poyea/coronaflight-hkg/pulls). Before commiting, you should
```
npm run lintfix
```