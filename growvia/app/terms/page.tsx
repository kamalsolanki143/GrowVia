import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Growvia",
  description: "Terms and conditions for using the Growvia Career OS.",
};

export default function TermsAndConditionsPage() {
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
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Growvia ("we", "our", or "us"), you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 13 years of age to create an account and use Growvia. By creating an account, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Account Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you create an account, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Maintaining the confidentiality of your login credentials (email, phone OTPs, passwords).</li>
              <li>Ensuring the information on your Talent Passport is accurate, truthful, and up-to-date.</li>
              <li>All activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Acceptable Use Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use the platform to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Submit false academic credentials, fake internships, or fraudulent project links.</li>
              <li>Harass, abuse, or harm other users, mentors, or partner companies.</li>
              <li>Interfere with or disrupt the integrity or performance of the platform, including attempting to bypass our security measures.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Violation of this policy may result in immediate suspension or termination of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality on Growvia (including but not limited to the AI Career Coach, UI/UX designs, and proprietary algorithms) are owned by Growvia and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of the data you input into your Talent Passport.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Growvia provides career guidance, roadmap generation, and opportunity matching on an "as is" and "as available" basis. While we strive for accuracy, we do not guarantee specific career outcomes, job placements, or internship acceptances. In no event shall Growvia be liable for any indirect, incidental, or consequential damages arising out of your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of India, specifically in compliance with the Information Technology (IT) Act 2000 and its subsequent amendments, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any legal inquiries regarding these Terms & Conditions, please reach out to us at:
              <br />
              <a href="mailto:legal@growvia.in" className="text-brand-primary hover:underline font-medium mt-2 inline-block">legal@growvia.in</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
