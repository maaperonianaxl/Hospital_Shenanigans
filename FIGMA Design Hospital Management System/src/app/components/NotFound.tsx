import { Link } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h2 className="mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
