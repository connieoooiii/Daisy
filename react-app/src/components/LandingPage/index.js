import {useSelector} from "react-redux";

import "./LandingPage.css";
import "../ProductsIndex";
import ProductsIndex from "../ProductsIndex";
import Footer from "../Footer";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";

export default function LandingPage() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleCleanser = () => {
    history.push("/products/cleansers");
  };

  const handleCream = () => {
    history.push("/products/moisterizers");
  };

  const handleSerum = () => {
    history.push("/products/serums");
  };

  const handleSun = () => {
    history.push("/products/suncare");
  };

  const handleMakeup = () => {
    history.push("/products/makeup");
  };

  return (
    <div className="larger-div">
      <div className="land-wrap">
        {user && (
          <div className="hello-again">
            <div className="welcome-back">Welcome back, {user.first_name}!</div>
            <img
              //   src="https://cdn.discordapp.com/attachments/1138505164358164483/1141877895581679636/skincaresteps.png"
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1142125491826995230/Screenshot_2023-08-18_at_8.58.28_AM.png?ex=6606e540&is=65f47040&hm=bb478bd6b45e1dd3534d1c8aa0015de6ba3ef2a3f5accab3dea3b328e187fcc9&"
              alt="skincare steps"
              className="skincare-steps"
            />
          </div>
        )}

        <div className="discover">Discover fresh finds all year round! </div>
        <div className="land-imgs">
          <div className="land-div" onClick={handleCleanser}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863159716646952/round-lab-cleanser.webp?ex=6605f0f0&is=65f37bf0&hm=52788dad9c025da41da85a5b005012bf5a36b2cfca0bfe215fc0339bfd2f2595&"
              alt="cleanser"
              className="circle-imgs"
            />
            <div className="name-circle">Cleansers</div>
          </div>
          <div className="land-div" onClick={handleCream}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141866461455995021/torridencream.png?ex=6605f403&is=65f37f03&hm=5feef4c78493985216a6d6d59e812c79dee12d0e9285e3af234ef39d3484ddd3&"
              alt="moisterizer"
              className="circle-imgs"
            />
            <div className="name-circle">Moisterizers</div>
          </div>
          <div className="land-div" onClick={handleSerum}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141869141922418829/orangeroundlab.png?ex=6605f682&is=65f38182&hm=7352b44e0cba0511ed63ab42ad657dd3b42b8a80263e52fa0a51988d76e3dbf3&"
              alt="serum"
              className="circle-imgs"
            />
            <div className="name-circle">Serums</div>
          </div>
          <div className="land-div" onClick={handleSun}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863160928800819/anua-sun.png?ex=6605f0f0&is=65f37bf0&hm=eb7b4d29b1d6223c174992770f312103974955b6a4b2efbb7d81b719553ab265&"
              alt="suncare"
              className="circle-imgs"
            />
            <div className="name-circle">Suncare</div>
          </div>
          <div className="land-div" onClick={handleMakeup}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863161260146718/romandlip.png?ex=6605f0f0&is=65f37bf0&hm=055ff64fd47a21d4c2dd739c6d1c0a0a998a85dfa9f70d3efc4fd54e4a55218f&"
              alt="makeup"
              className="circle-imgs"
            />
            <div className="name-circle">Makeup</div>
          </div>
        </div>
        <div className="discover">Check out some of our favorites! </div>
      </div>
      <ProductsIndex />
      <Footer />
    </div>
  );
}
