// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the User component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: 'User',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'firstname', type: CommonFieldTypes.SingleLineText },
      { name: 'email', type: CommonFieldTypes.SingleLineText },
      { name: 'phone', type: CommonFieldTypes.SingleLineText },
      { name: 'orderhistory', type: CommonFieldTypes.SingleLineText },
      { name: 'address', type: CommonFieldTypes.SingleLineText },
      { name: 'mobile', type: CommonFieldTypes.SingleLineText },
    ],
    /*
    If the component implementation uses the 'Placeholder' component to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
