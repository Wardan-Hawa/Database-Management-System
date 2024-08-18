import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                DataNexus{" "}
              </h6>
              <p>A tool that helps you managing your research Data</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Tools</h6>
              <p>
                <a href="#!" className="text-reset">
                  Database
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Matlab
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Researchers
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Functions
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#" className="text-reset">
                  Tables
                </a>
              </p>
              <p>
                <a href="https://www.nlm.nih.gov/" className="text-reset">
                  National Library of Medicine{" "}
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-reset"
                >
                 APIs
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                DataNexus
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@DataNexus.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> Contact Number
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> Contact Number
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="https://datanexus.com/">
          DataNexus.com
        </a>
      </div>
    </MDBFooter>
  );
}
