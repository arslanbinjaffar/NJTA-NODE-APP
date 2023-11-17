// import { ApiVersion } from "@shopify/shopify-api";
// import { restResources } from "@shopify/shopify-api/rest/admin/2023-01";
// import { shopifyApp } from "@shopify/shopify-app-express";
// import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";

// const mongoDbUrl = new URL("mongodb://127.0.0.1:27017/qubiodb");

// export const sessionStorage = new MongoDBSessionStorage(mongoDbUrl, "qubiodb");

// export const shopify = shopifyApp({
//   api: {
//     apiVersion: ApiVersion.January23,
//     restResources,
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_SECERET_KEY,
//     scopes: ["read_products"],
//     hostName: process.env.HOSTNAME,
//     billing: undefined, // or replace with billingConfig above to enable example billing
//   },
//   auth: {
//     path: "/api/v1/shopify/auth",
//     callbackPath: "/api/v1/shopify/auth/callback",
//   },
//   webhooks: {
//     path: "/api/webhooks",
//   },
//   sessionStorage: sessionStorage,
// });
