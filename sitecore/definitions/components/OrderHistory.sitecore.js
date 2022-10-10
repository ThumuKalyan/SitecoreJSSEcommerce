// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the OrderHistory component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'OrderHistory',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'disclaimer', type: CommonFieldTypes.RichText },
      { name: 'purchasHistory', type: CommonFieldTypes.RichText },
      { name: 'Order', type: CommonFieldTypes.SingleLineText },
      { name: 'ProductImage', type: CommonFieldTypes.SingleLineText },
      { name: 'ProductName', type: CommonFieldTypes.SingleLineText },
      { name: 'Quantity', type: CommonFieldTypes.SingleLineText },
      { name: 'Total', type: CommonFieldTypes.SingleLineText },
      { name: 'PurchaseDate', type: CommonFieldTypes.SingleLineText },
    ],
    /*
    If the component implementation uses the 'Placeholder' component to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
