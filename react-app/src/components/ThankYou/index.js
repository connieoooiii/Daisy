import {useSelector} from "react-redux";
import "./ThankYou.css";
import LandingPage from "../LandingPage";

export default function ThankYou() {
  const user = useSelector((state) => {
    return state.session.user;
  });

  return user ? (
    <img
      src="https://cdn.discordapp.com/attachments/1138505164358164483/1142155289219584050/Minimalist_Thank_You_Card_.png?ex=66070101&is=65f48c01&hm=2523ffad22cb64be75aa2c80b2ce621704c2968f8a6192c3418bd7ac279c1d0a&"
      className="thanks-purchase"
    />
  ) : (
    <LandingPage />
  );
}
