import { useState } from "react";
import dynamic from "next/dynamic";

import { storeFrontRequest } from "../utils/shopify";

export default function SingleProduct({ product, products }) {
  const [variant, setVariant] = useState(product.variants.edges[0].node.id);

  const Product = dynamic(() => import("../components/ProductCard"), {
    ssr: false,
  });

  // Filter all fetched products and find the one that is currently displayed
  // Then slice the array so that the current one is removed
  const relatedProducts = products.edges
    .filter((item) => item.node.handle !== product.handle)
    .slice(0, 5);

  async function checkout() {
    const { data } = await storeFrontRequest({
      query: `
          mutation CheckoutCreate($variantId: ID!) {
            checkoutCreate(input: {lineItems: {variantId: $variantId, quantity: 1}}) {
              checkout {
                webUrl
              }
            }
          }
      `,
      variables: { variant },
    });

    // const { webUrl } = data;

    // window.location.href = webUrl;
    console.log(data);
  }

  return (
    // Single Product page
    <div className="single-product-page">
      <div className="single-product-page-wrapper">
        {/* Single Product Left Side */}
        <div className="single-product-left">
          <img
            src={product.images.edges[0].node.transformedSrc}
            alt=""
            layout="fill"
          />
        </div>
        {/* Single Product Right Side */}
        <div className="single-product-right">
          {/* Product Title */}
          <h2>{product.title}</h2>

          {/* Product Price */}
          <p>{product.priceRange.minVariantPrice.amount + " lv."}</p>

          {/* Product Tags */}
          <span>Tags: {product.tags}</span>

          <div className="single-product-devider"></div>

          {/* Product Variants */}
          <div className="single-product-color">
            <p>Choose Variant</p>
            <select
              defaultValue={product.variants.edges[0].id}
              onChange={(e) => {
                setVariant(e.target.value);
              }}
            >
              {/* Fetch all variants title into options */}
              {product.variants.edges.map((item) => {
                const variant = item.node;
                return (
                  <option key={variant.id} value={variant.id}>
                    {variant.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="single-product-devider"></div>

          {/* Checkout Button */}
          <button className="single-product-btn" onClick={checkout}>
            Buy Now
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        {/* Fetch all related products but the product that is currently displayed */}
        {relatedProducts.map((item) => {
          const product = item.node;
          const image = product.images.edges[0].node;

          return (
            <div key={product.id}>
              <a href={"/" + product.handle}>
                <Product
                  img={image.transformedSrc}
                  title={product.title}
                  price={product.priceRange.minVariantPrice.amount + " lv."}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Fetch all product's handle to bind to dynamic path
export async function getStaticPaths() {
  const { data } = await storeFrontRequest({
    query: `{
            products(first: 9) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }`,
  });

  return {
    paths: data.products.edges.map((product) => ({
      params: { handle: product.node.handle },
    })),
    fallback: false,
  };
}

// Fetch API and store in props
export async function getStaticProps({ params }) {
  // Fetch single product by handle
  const { data } = await storeFrontRequest({
    query: `
        query SingleProduct($handle: String!) {
            productByHandle(handle: $handle) {
                title
                handle
                tags
                variants(first: 15) {
                  edges {
                    node {
                      id
                      title
                    }
                  }
                }
                priceRange {
                    minVariantPrice {
                        amount
                    }
                }
                images(first: 1) {
                    edges {
                        node {
                            transformedSrc
                            altText
                        }
                    }
                }
            }
        }
    `,
    variables: { handle: params.handle },
  });

  const products = await storeFrontRequest({
    query: `{
      products(first: 6) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    variables: {},
  });

  return {
    props: {
      product: data.productByHandle,
      products: products.data.products,
    },
  };
}
