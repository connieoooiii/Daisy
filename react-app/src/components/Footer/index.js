import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <a
        className="foot-link"
        href="https://github.com/connieoooiii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="name-logo">
          <i id="git" class="fa-brands fa-github"></i>
          <div className="footer-label">GitHub</div>
        </div>
      </a>
      <a
        className="foot-link"
        href="https://www.linkedin.com/in/connie-ooi-96333814a/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="name-logo">
          <i class="fa-brands fa-linkedin" id="git"></i>
          <div className="footer-label">LinkedIn</div>
        </div>
      </a>
    </div>
  );
}
