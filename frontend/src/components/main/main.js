import "./main.css"
import bigphoto from "../../assets/bigphoto.jpg";

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


function Main() {
  return (
    <div className="main-container">
      <Pic />
      <RightText />
    </div>
  );
}



export default Main;