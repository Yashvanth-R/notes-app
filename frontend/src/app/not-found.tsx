import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto animate-bounce-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">404</span>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h1>
          <p className="text-slate-600 mb-6">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex space-x-3">
            <Link href="/" className="flex-1">
              <Button variant="primary" className="w-full">
                Go Home
              </Button>
            </Link>
            <Link href="/signin" className="flex-1">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}