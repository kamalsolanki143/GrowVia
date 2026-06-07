import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Growvia",
  description: "Learn how Growvia protects your data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Growvia, your privacy is our priority. This Privacy Policy outlines what data we collect, how we use it, and your rights regarding your information. By using our Career Operating System, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. What Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We only collect data necessary to provide you with the best career guidance and opportunity matching:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Basic Profile Info:</strong> Name, email address, phone number.</li>
              <li><strong>Academic Info:</strong> College/university name, degree, graduation year.</li>
              <li><strong>Career Preferences:</strong> Skills, interests, past achievements, and role preferences.</li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
              <strong>Strict No-Biometrics Policy:</strong> Growvia does NOT collect, process, or store any face data, facial recognition data, or biometric information of any kind.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your data is used strictly to enhance your experience:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Personalization:</strong> Building your Career DNA and tailoring the platform to your strengths.</li>
              <li><strong>Opportunity Matching:</strong> Recommending internships, hackathons, and jobs that fit your profile.</li>
              <li><strong>AI Recommendations:</strong> Generating personalized career missions and coaching through our AI.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Sharing Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>We do not sell your data.</strong> We may share your verified Talent Passport with partner companies and colleges <em>only</em> when you explicitly apply for an opportunity or give us permission to do so. We use secure third-party services (like Supabase) solely for authentication and database hosting under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You are in full control of your data. You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Access and Export:</strong> Request a copy of all data we hold about you.</li>
              <li><strong>Update:</strong> Edit or correct your profile information at any time.</li>
              <li><strong>Delete Account:</strong> Permanently delete your account and all associated data from our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact our data protection team at:
              <br />
              <a href="mailto:privacy@growvia.in" className="text-brand-primary hover:underline font-medium mt-2 inline-block">privacy@growvia.in</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
