import "./header.css";
import logo1 from "../../assets/logo1.jpg";

// function DiscountBanner(){
//   return(
//       <div className="discount-banner">
//         ✨ Navratri Special Discount: Get 25% Off On All Products! ✨
//       </div>
//   );
// }

function Navitems({children}){
  return(
    <li><a href="https://google.com">{children}</a></li>
  );
}

function Navbar(){
  return(
        <nav>
          <ul>
            <Navitems>Home</Navitems>
            <Navitems>New Arrivals</Navitems>
            <Navitems>Collections</Navitems>
            <Navitems>Contact</Navitems>
          </ul>
        </nav>
  );
}

function Logotxt() {
  return (
    <div className="logo">
      <a href="https://google.com">
        <img src={logo1} alt="RADHESHYAM ARTISANRY Logo" />
        <span className="logo-text">
          <span className="l1"><span className="first-letter">R</span>ADHESHYAM</span>
          <span className="l2">ARTISANRY</span>
        </span>
      </a>
    </div>
  );
}


function Header() {
  return (
    <div>
      <header>
        <Logotxt/>
        <Navbar/>
      </header>
    </div>
  );
}

export default Header;
