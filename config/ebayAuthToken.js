// Config
require('dotenv').config();

const EbayAuthToken = require('ebay-oauth-nodejs-client');

let ebayAuthToken = new EbayAuthToken({
    filePath: '../ebay-config-sample.json'
});

ebayAuthToken = new EbayAuthToken({
    clientId: 'DPCards-dandpCon-PRD-7bd186d65-3e3673a6',
    clientSecret: 'PRD-bd186d65f510-5071-4e3f-8218-eea4',
    redirectUri: 'https://auth.ebay.com/oauth2/authorize?client_id=DPCards-dandpCon-PRD-7bd186d65-3e3673a6&response_type=code&redirect_uri=D_P_Cards-DPCards-dandpCo-ogifw&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly'
});

module.exports = ebayAuthToken;



