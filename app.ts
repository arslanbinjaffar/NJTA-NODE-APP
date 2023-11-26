import express from "express";
import cors from "cors";
import logger from "morgan";
import "dotenv/config";
import indexRouter from "./routes/index.js";
import userRouterV1 from "./routes/user.js";
import tenantRouterV1 from "./routes/tenant.js";
import qrCodeRouterV1 from "./routes/qrCode.js";
import {
  pageRoutesV1,
  headingRoutesV1,
  logoRoutesV1,
  socialRoutesV1,
  bioRoutesV1,
  appLinkRoutesV1,
  linkRouteV1,
  textRoutesV1,
  clipboardButtonRoutesV1,
  audioRoutesV1,
  carouselRoutesV1,
  // shopifyRouterV1,
  contactCardRoutesV1,
  contactFormRoutesV1,
  linkToPageRoutesV1,
  videoRoutesV1,
  imageRoutesV1,
  emailSubscribeRoutesV1
} from "./routes/page.js";
import globalRouterV1 from "./routes/global.js";
import contentBlockRouterV1 from "./routes/contentBlock.js";
import seedRouter from "./handlers/apis/seeder.js";
import error404 from "./routes/error404.js";
import mongodbConnection from "./config/db/connection.js";
// import { shopify } from "./config/shopify/connection.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
// import setupSwagger from "./config/swaggerDocumentation/swagger.js";
import querystring from "querystring";
import bodyParser from "body-parser";
// import fetch from "node-fetch";
import { URLSearchParams } from "url";
import mailchimp from "@mailchimp/mailchimp_marketing";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// MongoDB Connections
mongodbConnection();

// Using middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Swagger setup
// setupSwagger(app, process.env.SWAGGER_PORT);

// Api routes
app.use("/", indexRouter);
app.use("/seed-db", seedRouter);
app.use("/api/v1/user", userRouterV1);
app.use("/api/v1/tenant", tenantRouterV1);
app.use("/api/v1/qr", qrCodeRouterV1);
app.use("/api/v1/page", pageRoutesV1);
app.use("/api/v1/heading", headingRoutesV1);
app.use("/api/v1/logo", logoRoutesV1);
app.use("/api/v1/bio", bioRoutesV1);
app.use("/api/v1/social", socialRoutesV1);
app.use("/api/v1/app-link", appLinkRoutesV1);
app.use("/api/v1/link", linkRouteV1);
app.use("/api/v1/text", textRoutesV1);
app.use("/api/v1/clipboard-button", clipboardButtonRoutesV1);
app.use("/api/v1/audio", audioRoutesV1);
app.use("/api/v1/carousel", carouselRoutesV1);
app.use("/api/v1/contact-card", contactCardRoutesV1);
app.use("/api/v1/contact-form", contactFormRoutesV1);
app.use("/api/v1/link-to-page", linkToPageRoutesV1);
app.use("/api/v1/video", videoRoutesV1);
app.use("/api/v1/image", imageRoutesV1);
app.use("/api/v1/email-subscribe", emailSubscribeRoutesV1);
app.use("/api/v1/globals", globalRouterV1);
app.use("/api/v1/content-block", contentBlockRouterV1);
// app.use("/api/v1/shopify", shopifyRouterV1);

// // Shopify routes
// app.get(shopify.config.auth.path, shopify.auth.begin());
// app.get(
//   shopify.config.auth.callbackPath,
//   shopify.auth.callback(),
//   shopify.redirectToShopifyOrAppRoot()
// );
// app.use(shopify.cspHeaders());

app.all("*", error404);

// Error handler
app.use(errorHandler);

// Listening server
app.listen(process.env.PORT, () => {
  console.log("Server listening on", process.env.PORT);
});

export default app;
