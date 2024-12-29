import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/halls">Halls</Link>
        </li>
        <li>
          <Link href="/maintenance">Maintenance</Link>
        </li>
        <li>
          <Link href="/volunteers">Volunteers</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
