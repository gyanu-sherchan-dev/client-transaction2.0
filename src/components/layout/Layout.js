import React from "react";
import { Header } from "./Header";
import Container from "react-bootstrap/esm/Container";

const Layout = ({ children, registerbg }) => {
  return (
    <div className={registerbg ? "layout-register" : "layout-login"}>
      <Header registerbg={registerbg} />
      <Container className="rounded-4 p-5 mt-5" style={{ minHeight: "66vh" }}>
        {children}
      </Container>

      <footer
        className={
          registerbg
            ? "text-center text-light p-5 mt-5"
            : "text-center text-dark p-5 mt-5 "
        }
      >
        &copy; All right reserved 2023 || Gyanu
      </footer>
    </div>
  );
};

export default Layout;
