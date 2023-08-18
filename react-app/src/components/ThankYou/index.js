import {useSelector} from "react-redux";
import "./ThankYou.css";
import LandingPage from "../LandingPage";

export default function ThankYou() {
  const user = useSelector((state) => {
    return state.session.user;
  });

  return user ? (
    <img
      src="https://cdn.discordapp.com/attachments/1138505164358164483/1142155289219584050/Minimalist_Thank_You_Card_.png"
      className="thanks-purchase"
    />
  ) : (
    <LandingPage />
  );
}
