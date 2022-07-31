import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer-up">
        <div className="footer-up-div">
          <Image src={logo} alt="" />
        </div>

        <div className="footer-up-div">
          <h5>Menu</h5>
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
        </div>

        <div className="footer-up-div">
          <h5>Support</h5>
          <ul>
            <li>
              <Link href="/">FAQ</Link>
            </li>
            <li>
              <Link href="/">Shipping and return</Link>
            </li>
            <li>
              <Link href="/about">Sizing</Link>
            </li>
            <li>
              <Link href="/">Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-down">
        <p>© Love Noel. All rights reserved.</p>
      </div>
    </footer>
  );
}
