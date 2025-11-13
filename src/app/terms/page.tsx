import { LegalPageLayout } from "@/components/legal-page-layout"

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated={new Date("2025-01-12")}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Welcome to Plushify. These Terms of Service (&quot;Terms&quot;) govern
          your access to and use of our website, services, and applications
          (collectively, the &quot;Service&quot;). By accessing or using
          Plushify, you agree to be bound by these Terms.
        </p>
        <p>
          If you do not agree to these Terms, you may not access or use our
          Service. Please read these Terms carefully before using Plushify.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
        <p className="mb-4">
          Plushify provides an AI-powered service that transforms photos into
          adorable plushie-style images. Our Service includes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Photo upload and processing capabilities</li>
          <li>AI-powered image transformation</li>
          <li>Gallery storage for your generated plushies</li>
          <li>Credit-based generation system</li>
          <li>Multiple style and size options</li>
          <li>Download functionality for generated images</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of
          the Service at any time, with or without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
        <p className="mb-4">
          To use certain features of Plushify, you must create an account. When
          creating an account, you agree to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your information to keep it accurate</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized access</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Account Eligibility</h3>
        <p className="mb-4">
          You must be at least 13 years old to use Plushify. If you are under
          18, you must have permission from a parent or guardian. By creating an
          account, you represent that you meet these age requirements.
        </p>

        <h3 className="text-xl font-semibold mb-3">Account Security</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials. We are not liable for any loss or damage arising
          from your failure to protect your account information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
        <h3 className="text-xl font-semibold mb-3">Permitted Uses</h3>
        <p className="mb-4">You may use Plushify to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Upload and transform your own photos</li>
          <li>
            Upload photos for which you have obtained proper permissions or
            rights
          </li>
          <li>Create plushie images for personal or commercial use</li>
          <li>Download and share your generated plushies</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Prohibited Activities</h3>
        <p className="mb-4">You agree NOT to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Upload photos containing illegal, harmful, or offensive content
          </li>
          <li>
            Upload photos of individuals without their consent (except for
            personal use)
          </li>
          <li>
            Upload copyrighted images without proper authorization or fair use
            rights
          </li>
          <li>
            Use the Service to harass, abuse, or harm others or violate their
            privacy
          </li>
          <li>
            Attempt to reverse engineer, decompile, or extract our AI models
          </li>
          <li>
            Use automated systems (bots, scrapers) to access the Service without
            permission
          </li>
          <li>Interfere with or disrupt the Service or servers</li>
          <li>
            Circumvent any security measures or access restrictions we implement
          </li>
          <li>Resell or redistribute the Service without authorization</li>
          <li>Use the Service for any illegal purpose</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Content Guidelines</h3>
        <p className="mb-4">
          All uploaded content must comply with our content guidelines. We
          reserve the right to remove any content that violates these Terms or
          is otherwise objectionable, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Nudity, pornography, or sexually explicit content</li>
          <li>Violence, gore, or graphic content</li>
          <li>Hate speech, discrimination, or harassment</li>
          <li>Illegal activities or promotion of illegal acts</li>
          <li>Spam, malware, or phishing attempts</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <h3 className="text-xl font-semibold mb-3">
          Ownership of Generated Images
        </h3>
        <p className="mb-4">
          You retain all rights to the photos you upload. For generated plushie
          images:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            You own the generated plushie images created from your uploaded
            photos
          </li>
          <li>
            You may use generated images for personal or commercial purposes
          </li>
          <li>
            You grant Plushify a limited license to store and display your
            generated images as part of the Service
          </li>
          <li>
            We may use anonymized, aggregated data to improve our AI models
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">License to Use Service</h3>
        <p className="mb-4">
          Plushify grants you a limited, non-exclusive, non-transferable license
          to access and use the Service for your personal or commercial use,
          subject to these Terms.
        </p>

        <h3 className="text-xl font-semibold mb-3">Our Intellectual Property</h3>
        <p>
          All aspects of the Service, including but not limited to the website,
          software, AI models, algorithms, design, logos, and trademarks, are
          owned by Plushify and protected by intellectual property laws. You may
          not copy, modify, distribute, or create derivative works without our
          express written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Credits and Payments</h2>
        <h3 className="text-xl font-semibold mb-3">Credit System</h3>
        <p className="mb-4">
          Plushify operates on a credit-based system where one credit equals one
          plushie generation:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Credits are purchased through our pricing plans</li>
          <li>Credits are non-refundable once used for generations</li>
          <li>Unused credits do not expire as long as your account is active</li>
          <li>Credits are non-transferable between accounts</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Pricing and Payments</h3>
        <p className="mb-4">
          Current pricing is displayed on our{" "}
          <a href="/pricing" className="text-primary hover:underline">
            Pricing page
          </a>
          . We reserve the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Change pricing at any time with 30 days notice</li>
          <li>
            Offer promotional pricing or discounts at our discretion
          </li>
          <li>Modify credit packages and plan features</li>
        </ul>
        <p>
          All payments are processed securely through third-party payment
          providers. You agree to pay all fees and charges associated with your
          account.
        </p>

        <h3 className="text-xl font-semibold mb-3">Refunds</h3>
        <p>
          Please refer to our{" "}
          <a href="/refund" className="text-primary hover:underline">
            Refund Policy
          </a>{" "}
          for information about refunds and cancellations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
        <p className="mb-4">
          We strive to provide reliable and continuous service, but we cannot
          guarantee:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>100% uptime or uninterrupted access</li>
          <li>Error-free operation</li>
          <li>Specific generation quality or results</li>
          <li>Compatibility with all devices or browsers</li>
        </ul>
        <p>
          We may perform scheduled maintenance that temporarily interrupts
          service. We will provide advance notice when possible, but emergency
          maintenance may occur without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Limitation of Liability
        </h2>
        <h3 className="text-xl font-semibold mb-3">Disclaimer of Warranties</h3>
        <p className="mb-4">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
          AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Merchantability or fitness for a particular purpose</li>
          <li>Accuracy, reliability, or completeness of content</li>
          <li>Non-infringement of third-party rights</li>
          <li>Security or freedom from viruses or harmful components</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Liability Limits</h3>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, PLUSHIFY SHALL NOT BE LIABLE
          FOR:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Indirect, incidental, special, consequential, or punitive damages
          </li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>
            Damages arising from your use or inability to use the Service
          </li>
          <li>
            Damages resulting from unauthorized access to your account or data
          </li>
        </ul>
        <p>
          Our total liability for any claim arising from these Terms or the
          Service shall not exceed the amount you paid to Plushify in the 12
          months preceding the claim.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Plushify, its
          officers, directors, employees, and agents from any claims, damages,
          losses, liabilities, and expenses (including legal fees) arising from:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Content you upload or generate</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <h3 className="text-xl font-semibold mb-3">Termination by You</h3>
        <p className="mb-4">
          You may terminate your account at any time by:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Contacting our support team</li>
          <li>Using the account deletion feature in your profile settings</li>
        </ul>
        <p className="mb-4">
          Upon termination, your access to the Service will cease, and your data
          will be deleted according to our Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold mb-3">Termination by Plushify</h3>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account and access
          to the Service at any time, with or without notice, for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Violation of these Terms</li>
          <li>Fraudulent, abusive, or illegal activity</li>
          <li>Extended periods of inactivity</li>
          <li>Any reason at our sole discretion</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Effect of Termination</h3>
        <p>
          Upon termination, all licenses granted to you will immediately cease.
          Provisions that by their nature should survive termination (including
          intellectual property, limitation of liability, and dispute
          resolution) will continue to apply.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. When we make material
          changes, we will:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
          <li>Notify you via email (if you have opted in to notifications)</li>
          <li>Display a prominent notice on our website</li>
        </ul>
        <p>
          Your continued use of the Service after changes are posted constitutes
          your acceptance of the updated Terms. If you do not agree to the
          changes, you must stop using the Service and may terminate your
          account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
        <h3 className="text-xl font-semibold mb-3">Informal Resolution</h3>
        <p className="mb-4">
          If you have a dispute with Plushify, please contact us first at{" "}
          <a
            href="mailto:support@plushify.com"
            className="text-primary hover:underline"
          >
            support@plushify.com
          </a>{" "}
          to attempt to resolve the issue informally.
        </p>

        <h3 className="text-xl font-semibold mb-3">Arbitration</h3>
        <p>
          Any disputes that cannot be resolved informally shall be resolved
          through binding arbitration in accordance with the rules of the
          American Arbitration Association. The arbitration shall take place in
          [Your Jurisdiction], and the decision of the arbitrator shall be final
          and binding.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of law
          provisions. You agree to submit to the personal jurisdiction of the
          courts located in [Your Jurisdiction] for any legal proceedings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Miscellaneous</h2>
        <h3 className="text-xl font-semibold mb-3">Entire Agreement</h3>
        <p className="mb-4">
          These Terms, together with our Privacy Policy and any other legal
          notices published on the Service, constitute the entire agreement
          between you and Plushify.
        </p>

        <h3 className="text-xl font-semibold mb-3">Severability</h3>
        <p className="mb-4">
          If any provision of these Terms is found to be invalid or
          unenforceable, the remaining provisions shall remain in full force and
          effect.
        </p>

        <h3 className="text-xl font-semibold mb-3">Waiver</h3>
        <p className="mb-4">
          Our failure to enforce any right or provision of these Terms shall not
          constitute a waiver of such right or provision.
        </p>

        <h3 className="text-xl font-semibold mb-3">Assignment</h3>
        <p>
          You may not assign or transfer these Terms or your account without our
          written consent. We may assign these Terms without restriction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="mb-4">
          If you have questions about these Terms of Service, please contact us:
        </p>
        <ul className="list-none mb-4">
          <li className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:legal@plushify.com"
              className="text-primary hover:underline"
            >
              legal@plushify.com
            </a>
          </li>
          <li className="mb-2">
            <strong>Support:</strong>{" "}
            <a
              href="mailto:support@plushify.com"
              className="text-primary hover:underline"
            >
              support@plushify.com
            </a>
          </li>
          <li>
            <strong>Contact Form:</strong>{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact Page
            </a>
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  )
}
