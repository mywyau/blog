// app/routes/index.tsx

// import styles from "../app/styles/tailwind.css"; // Adjust the path as per your actual file structure

import { Link } from "@remix-run/react";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Remix!</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is a simple welcome page styled with Tailwind CSS.
      </p>
      <Link
        to="/about"
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Go to About Page
      </Link>
    </div>
  );
}
