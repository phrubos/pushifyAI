import { LegalPageLayout } from "@/components/legal-page-layout"

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated={new Date("2025-01-12")}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Welcome to Plushify. We are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you use our service to transform photos into adorable
          plushie designs.
        </p>
        <p>
          By using Plushify, you agree to the collection and use of information
          in accordance with this policy. If you do not agree with our policies
          and practices, please do not use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Information We Collect
        </h2>
        <h3 className="text-xl font-semibold mb-3">User Account Information</h3>
        <p className="mb-4">
          When you create an account with Plushify, we collect:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name and email address</li>
          <li>Profile picture (optional)</li>
          <li>Account credentials (encrypted password)</li>
          <li>Subscription plan and credit balance</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Uploaded Images</h3>
        <p className="mb-4">
          To provide our plushie generation service, we collect and process:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Original photos you upload for transformation</li>
          <li>Generated plushie images</li>
          <li>Metadata associated with your generations (date, style, size)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Usage Data</h3>
        <p className="mb-4">
          We automatically collect certain information when you use our service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Device information (browser type, operating system)</li>
          <li>IP address and location data</li>
          <li>Pages visited and features used</li>
          <li>Time and date of visits</li>
          <li>Generation history and preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the collected information for various purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Service Provision:</strong> To process your images and
            generate plushie transformations
          </li>
          <li>
            <strong>Account Management:</strong> To create and maintain your
            account, manage credits, and process payments
          </li>
          <li>
            <strong>Improvement and Analytics:</strong> To analyze usage
            patterns, improve our AI models, and enhance user experience
          </li>
          <li>
            <strong>Communication:</strong> To send you service updates,
            promotional offers, and respond to your inquiries
          </li>
          <li>
            <strong>Security:</strong> To detect and prevent fraud, abuse, and
            security incidents
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with legal obligations
            and enforce our terms of service
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Data Storage and Security
        </h2>
        <p className="mb-4">
          We take the security of your data seriously and implement appropriate
          technical and organizational measures:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Data is stored on secure servers with encryption at rest and in
            transit
          </li>
          <li>Access to personal data is restricted to authorized personnel</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Industry-standard SSL/TLS encryption for data transmission</li>
          <li>Secure payment processing through certified payment providers</li>
        </ul>
        <p>
          While we strive to protect your personal information, no method of
          transmission over the internet is 100% secure. We cannot guarantee
          absolute security but continuously work to improve our security
          measures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Image Handling</h2>
        <p className="mb-4">
          Your uploaded images are handled with special care:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Processing:</strong> Images are processed by our AI system
            to generate plushie transformations
          </li>
          <li>
            <strong>Storage:</strong> Original and generated images are stored
            in your gallery for your convenience
          </li>
          <li>
            <strong>Duration:</strong> Images are retained as long as your
            account is active or until you delete them
          </li>
          <li>
            <strong>Deletion:</strong> You can delete any image from your
            gallery at any time, and it will be permanently removed from our
            servers within 30 days
          </li>
          <li>
            <strong>Training:</strong> We do not use your uploaded images to
            train our AI models without your explicit consent
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="mb-4">
          We may share your information with trusted third-party service
          providers who assist us in operating our service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>AI Processing Partners:</strong> For image transformation
            and generation
          </li>
          <li>
            <strong>Payment Processors:</strong> For secure payment processing
            (Stripe, PayPal)
          </li>
          <li>
            <strong>Analytics Services:</strong> For usage analytics and service
            improvement (Google Analytics)
          </li>
          <li>
            <strong>Cloud Storage Providers:</strong> For secure data storage
            and backup
          </li>
          <li>
            <strong>Email Services:</strong> For sending transactional and
            marketing emails
          </li>
        </ul>
        <p>
          These third parties are contractually obligated to protect your
          information and use it only for the purposes we specify.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the following rights regarding your personal data:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold
            about you
          </li>
          <li>
            <strong>Correction:</strong> Update or correct inaccurate personal
            information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal data
            and account
          </li>
          <li>
            <strong>Export:</strong> Download your data in a portable format
          </li>
          <li>
            <strong>Opt-out:</strong> Unsubscribe from marketing communications
          </li>
          <li>
            <strong>Restriction:</strong> Request limitation of data processing
            in certain circumstances
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:privacy@plushify.com"
            className="text-primary hover:underline"
          >
            privacy@plushify.com
          </a>
          . We will respond to your request within 30 days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to enhance your
          experience:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Essential Cookies:</strong> Required for authentication and
            basic functionality
          </li>
          <li>
            <strong>Preference Cookies:</strong> Remember your settings (theme,
            language)
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how you use
            our service
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Used to deliver relevant
            advertisements
          </li>
        </ul>
        <p>
          You can control cookie preferences through your browser settings. For
          more details, see our{" "}
          <a href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Children&apos;s Privacy
        </h2>
        <p>
          Plushify is not intended for children under 13 years of age. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and believe your child has provided us with
          personal information, please contact us, and we will delete such
          information from our systems.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Posting the updated policy on this page</li>
          <li>Updating the &quot;Last Updated&quot; date</li>
          <li>
            Sending an email notification for significant changes (if you have
            opted in)
          </li>
        </ul>
        <p>
          Your continued use of Plushify after changes are posted constitutes
          your acceptance of the updated Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us:
        </p>
        <ul className="list-none mb-4">
          <li className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:privacy@plushify.com"
              className="text-primary hover:underline"
            >
              privacy@plushify.com
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
