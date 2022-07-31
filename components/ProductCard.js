import Link from "next/link";
import Image from "next/image";

export default function Product({ img, title, price }) {
  return (
    <div className="product">
      <div className="product-img">
        <Image src={img} alt="" width={300} height={200} />
        <Link href="/">Add to cart</Link>
      </div>
      <div className="product-cont">
        <h4>{title}</h4>
        <p>{price}</p>
      </div>
    </div>
  );
}
