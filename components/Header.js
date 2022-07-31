import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo.png";
import user from "../assets/user.png";
import cart from "../assets/cart.png";
import search from "../assets/search.png";
import heart from "../assets/heart.png";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </div>
      <div className="icons">
        <Image src={search} alt="" />
        <Image src={heart} alt="" />
        <Image src={user} alt="" />
        <Image src={cart} alt="" />
      </div>
    </header>
  );
}
