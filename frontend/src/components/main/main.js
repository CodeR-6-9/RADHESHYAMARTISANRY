import "./main.css"
import bigphoto from "../../assets/bigphoto.jpg";
import productImage1 from "../../assets/image1.jpg";
import productImage2 from "../../assets/image2.jpg";
import productImage3 from "../../assets/image3.jpg";
import productImage4 from "../../assets/image4.jpg";


function Pic() {
  return <img src={bigphoto} alt="Description" className="my-photo" />;
}

function Navitems({children}){
  return(
    <li className="feat">{children}</li>
  );
}

function Navbar(){
  return(
        <nav>
          <ul>
            <Navitems>High Quality</Navitems>
            <Navitems>Premium Design</Navitems>
            <Navitems>Veratile</Navitems>
            <Navitems>Learn More </Navitems>
          </ul>
        </nav>
  );
}
function RightText() {
  return (
    <div className="rt">
        <div className="right-text">
        Timeless Design,
        </div>
        <div className="right-text2">
        Premium Material
        </div>
        <div className="right-text3">
        Whether you love modern minimalism, timeless
        </div>
        <div className="right-text4">
        classics, or bold statement pieces.
        </div>
        <div className="navi">
            <Navbar/>
        </div>
    </div>

  );
}



const products = [
  {
    id: 1,
    imgSrc: productImage1,
    imgAlt: "something Hara hara",
    title: "JIMMY",
    details: "₹999 (Originally ₹1332)"
  },
  {
    id: 2,
    imgSrc: productImage2,
    imgAlt: "yellow yellow",
    title: "PAGAL",
    details: "₹799 (Originally ₹1066)"
  },
  {
    id: 3,
    imgSrc: productImage3,
    imgAlt: "Stylish Ethnic Wear 3",
    title: "KUTTA",
    details: "₹999 (Originally ₹1332)" 
  }
];

// --- A reusable component for a single product card ---
function ProductCard({ imgSrc, imgAlt, title, details }) {
  return (
    <div className="product-card">
      <img src={imgSrc} alt={imgAlt} />
      <div className="product-info">
        <h3>{title}</h3>
        {/* A new p tag for the second line of text */}
        <p className="product-details">{details}</p>
      </div>
    </div>
  );
}

function PicGrid() {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          imgSrc={product.imgSrc}
          imgAlt={product.imgAlt}
          title={product.title}
          details={product.details}
        />
      ))}
    </div>
  );
}


function Main() {
  return (
    // We can use a React Fragment <> since we don't need a wrapper div here
    <>
      <header className="hero-section">
        <Pic />
        <RightText />
      </header>
      
      <main>
        <PicGrid />
      </main>
    </>
  );
}




export default Main;