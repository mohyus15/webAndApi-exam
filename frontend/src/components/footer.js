import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10" style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f8f9fa" }}>
      <div className="text-center py-3">
        <p>my website &copy;{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
