import Layout from "../components/layout/Layout";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import {toast} from "sonner";

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gdgixjk",
        "template_5t5nz3q",
        form.current,
        "_9yNk3LSpKuacUBbk"
      )
      .then(
        () => {
          form.current.reset();
          toast.success("Message sent successfully!");
        },
        (error) => {
          toast.error("Error in sending message!", error.message);
        }
      );
  };

  return (
    <Layout>
      {" "}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">News Tips</h2>
          <p className="text-neutral-400 mb-4">
            Got a news tip or inside information about a topic we covered? We’d
            love to hear from you. Please drop us a note at{" "}
            <a
              href="mailto:prabhat6914@gmail.com"
              className="text-blue-500 hover:underline"
            >
              prabhat6914@gmail.com
            </a>
            .
          </p>
          <p className="text-neutral-400 mb-4">
            If you prefer to remain anonymous,{" "}
            <a href="/anonymous" className="text-blue-500 hover:underline">
              click here
            </a>{" "}
            to contact us using SecureDrop or encrypted messaging apps.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Events Related Inquiries</h2>
          <p className="text-neutral-400 mb-4">
            If you have a question related to our events, please contact{" "}
            <a
              href="mailto:prabhat6914@gmail.com"
              className="text-blue-500 hover:underline"
            >
              prabhat6914@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Advertising & Sponsorships</h2>
          <p className="text-neutral-400 mb-4">
            For advertising and sponsorship opportunities, please complete{" "}
            <a
              href="/advertising-form"
              className="text-blue-500 hover:underline"
            >
              this form
            </a>{" "}
            and an account executive will get back to you quickly.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">TC+ Related Inquiries</h2>
          <p className="text-neutral-400 mb-4">
            For account and payment issues related to TC+, please contact{" "}
            <a
              href="mailto:prabhat6914@gmail.com"
              className="text-blue-500 hover:underline"
            >
              prabhat6914@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Other Inquiries</h2>
          <form className="space-y-4 text-black" ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="from_name"
                placeholder="Full name"
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Email"
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="What is your enquiry about?"
              className="border p-2 rounded-lg w-full h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="w-fit text-black bg-white hover:bg-neutral-500 gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
