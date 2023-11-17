import { GraphqlQueryError } from "@shopify/shopify-api";
import { shopify } from "../config/shopify/connection.js";

export default async function getProducts(session: any, body: any) {
  const { endCursor } = body;

  const client = new shopify.api.clients.Graphql({ session });

  try {
    var data = await client.query({
      data: {
        query: `query ($numProducts: Int!, $cursor: String){
          products(first: $numProducts, after: $cursor) {
            edges {
              cursor
              node {
                id
                title
                handle
                onlineStoreUrl
                totalInventory
                variants(first: 1) {
                  edges {
                    node {
                      price 
                    }
                  }
                } 
              
                featuredImage {
                    url
                    width
                    id
                    height
                } 
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        variables: {
          numProducts: 25,
          cursor: endCursor,
        },
      },
    });

    return data;
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
