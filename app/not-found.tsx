// app/404.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Custom404Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect to a different page after a short delay
    setTimeout(() => {
      router.push("/"); // Redirect to home page after 3 seconds
    }, 3000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="text-center">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">Sorry, the page you are looking for does not exist. You will be redirected to the homepage shortly.</p>
      </div>
    </div>
  );
};

export default Custom404Page;
