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
    console.log("handlecleanser clicked");
    history.push("/products/cleansers");
  };

  return (
    <div className="larger-div">
      <div className="land-wrap">
        {user && (
          <div className="hello-again">
            <div className="welcome-back">Welcome back, {user.first_name}!</div>
            <img
              //   src="https://cdn.discordapp.com/attachments/1138505164358164483/1141877895581679636/skincaresteps.png"
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1142125491826995230/Screenshot_2023-08-18_at_8.58.28_AM.png"
              alt="skincare steps"
              className="skincare-steps"
            />
          </div>
        )}

        <div className="discover">Discover fresh finds all year round! </div>
        <div className="land-imgs">
          <div className="land-div" onClick={handleCleanser}>
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863159716646952/round-lab-cleanser.webp"
              alt="cleanser"
              className="circle-imgs"
            />
            <div className="name-circle">Cleansers</div>
          </div>
          <div className="land-div">
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141866461455995021/torridencream.png"
              alt="moisterizer"
              className="circle-imgs"
            />
            <div className="name-circle">Moisterizers</div>
          </div>
          <div className="land-div">
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141869141922418829/orangeroundlab.png"
              alt="serum"
              className="circle-imgs"
            />
            <div className="name-circle">Serums</div>
          </div>
          <div className="land-div">
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863160928800819/anua-sun.png"
              alt="suncare"
              className="circle-imgs"
            />
            <div className="name-circle">Suncare</div>
          </div>
          <div className="land-div">
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1141863161260146718/romandlip.png"
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
