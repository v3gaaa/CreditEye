import { Link } from 'react-router-dom'
import { UserIcon, BellIcon } from '@heroicons/react/outline'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Credit Verification System</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-blue-200">
            <UserIcon className="h-6 w-6" />
          </Link>
          <button className="hover:text-blue-200">
            <BellIcon className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  )
}