import React, { useState } from "react";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/394c6c50-b13b-11ed-844c-ed21665ad413"; // TODO - fill on the later step

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="mt-0 mb-2">Thank you!</h1>
            <p>We'll be in touch soon.</p>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    
    <div className="row mb-3 d-flex align-items-center" >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="mt-0 mb-2">Contact us</h1>
            <p>if you have any inquiries don't hesitate to contact us.</p>
          </div>
        </div>
      </div>
      <form
        className="row mb-3 d-flex align-items-center"
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
    >
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Your name"
          name="name"
            required
            style={{
              width: "400px",
              height: "40px"}}
        />
      </div>
      <div className="mb-3 pt-0">
          <input
            style={{
              width: "400px",
            height: "40px"}}

          type="email"
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className="mb-3 pt-0">
          <textarea
                        style={{width:"400px"}}

          placeholder="Your message"
          name="message"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <button
            className="btn btn-info"
            type="submit"
        >
          Send a message
        </button>
      </div>
      </form>
      </div>
  );
};

export default ContactForm;