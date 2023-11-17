export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URL: string;
      PORT: number;
      SWAGGER_PORT: number;
      HOST: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      // AWS_ACCESS_KEY_ID: string;
      // AWS_SECERET_ACCESS_KEY_ID: string;
      // AWS_REGION: string;
      FROM: string;
      JWT_SECERET: string;
      // BUCKET_NAME: string;
      // SHOPIFY_API_KEY: string;
      // SHOPIFY_SECERET_KEY: string;
      HOSTNAME: string;
      MAILCHIMP_CLIENT_SECERET_KEY: string;
      MAILCHIMP_CLIENT_ID: string;
      MAILCHIMP_REDIRECT_URL: string;
    }
  }
}
