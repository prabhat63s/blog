import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Layout from "../components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to News.Dev: Your Source for Cutting-Edge Technology and AI
          News
        </h1>
        <p className=" text-neutral-400 mb-6">
          At News.Dev, we are your go-to source for cutting-edge news on
          technology and artificial intelligence (AI). Our platform is designed
          for tech enthusiasts, innovators, and anyone fascinated by the rapidly
          evolving tech landscape.
        </p>

        <h2 className="text-xl font-bold mb-2">What We Cover</h2>
        <ul className="list-disc pl-6 mb-6 text-neutral-400">
          <li>Emerging Technologies</li>
          <li>Artificial Intelligence</li>
          <li>Innovation and Startups</li>
          <li>Tech Industry News</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Our Mission</h2>
        <p className=" text-neutral-400 mb-6">
          Our mission is to empower readers with accurate, timely, and
          insightful news and analysis that helps navigate the fast-paced world
          of technology. We strive to foster a community of knowledge-sharing
          and discussion around tech and AI developments.
        </p>

        <h2 className="text-xl font-bold mb-2">Why Choose News.Dev</h2>
        <ul className="list-disc pl-6 mb-6 text-neutral-400">
          <li>Quality Content</li>
          <li>Diverse Perspectives</li>
          <li>Up-to-Date Coverage</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Connect With Us</h2>
        <div className="flex space-x-4 mb-6">
          <a
            href="https://twitter.com/newsdev"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="https://facebook.com/newsdev"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com/company/newsdev"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className=" text-neutral-400 mb-6">
          Have a tip, story idea, or feedback? We'd love to hear from you! Reach
          out to our team at{" "}
          <a
            href="mailto:prabhat6914@gmail.com"
            className="text-blue-500 hover:underline"
          >
            prabhat6914@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-bold mb-2">Join the Conversation</h2>
        <p className=" text-neutral-400 mb-6">
          Engage with fellow tech enthusiasts in our comments section and on
          social media. Your insights and opinions are valuable to us!
        </p>

        <p className=" text-neutral-400">
          Thank you for visiting News.Dev. Explore, learn, and stay ahead with
          us in the exciting world of technology and AI.
        </p>
      </div>
    </Layout>
  );
}
