# Vehicle Advert Builder

Put the key vehicle facts, price and viewing details into an advert that is easy for a buyer to read.

**For independent car dealers. No coding knowledge needed.**

[Open the free tool](https://car-dealer-web-design.github.io/stock-lens/) · [See a fictional worked example](https://car-dealer-web-design.github.io/stock-lens/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Build my vehicle advert** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A copyable vehicle advert and a publication check for your stock team.

## What to expect

Use verified details for one vehicle. The preview will clearly show whether it is available, reserved or sold.

This creates advert copy from your information. It does not check vehicle history, stock availability or legal and finance disclosures.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Car Dealer Web Design](https://cardealerwebdesign.uk/). The tool is maintained by Car Dealer Web Design, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Car-Dealer-Web-Design/stock-lens/discussions/1).
