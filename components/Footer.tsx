import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-gray-200 bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shop</h2>
          <p className="text-sm">
            We offer only the freshest and highest quality products, ensuring
            every meal is special.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link
                href="/"
                className="hover:text-neutral-500  transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <a className="hover:text-neutral-500 transition-colors">
                Catalog
              </a>
            </li>
            <li className="mb-2">
              <a className="hover:text-neutral-500 transition-colors">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a className="hover:text-neutral-500 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Email: info@shop.com</p>
          <div className="flex space-x-4 mt-4">
            <a className="hover:text-neutral-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.005 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.878C18.343 21.128 22 17.005 22 12z" />
              </svg>
            </a>
            <a className="hover:text-neutral-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.27 4.27 0 0 0-7.29 3.9 12.13 12.13 0 0 1-8.8-4.46 4.27 4.27 0 0 0 1.32 5.7 4.22 4.22 0 0 1-1.93-.54v.05a4.27 4.27 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.92.07 4.27 4.27 0 0 0 3.98 2.96A8.56 8.56 0 0 1 2 19.54 12.07 12.07 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0 0 22.46 6z" />
              </svg>
            </a>
            <a className="hover:text-neutral-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}
