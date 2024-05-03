import Navbar from "@/components/shared/Navbar";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <Navbar />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 flex-1 flex-col gap-4 md:gap-8">
          {children}
        </main>
      </SignedIn>
    </div>
  );
}
