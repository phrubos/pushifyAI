import { LegalPageLayout } from "@/components/legal-page-layout"

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated={new Date("2025-01-12")}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
        <p className="mb-4">
          Cookies are small text files that are placed on your device (computer,
          smartphone, or tablet) when you visit a website. They are widely used
          to make websites work more efficiently and provide information to
          website owners.
        </p>
        <p>
          Cookies help us understand how you use our Service, remember your
          preferences, and improve your overall experience. This Cookie Policy
          explains what cookies we use, why we use them, and how you can manage
          your cookie preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
        <p className="mb-4">
          Plushify uses cookies for several important purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Authentication:</strong> To keep you logged in and verify
            your identity
          </li>
          <li>
            <strong>Preferences:</strong> To remember your settings such as
            theme (light/dark mode), language, and display options
          </li>
          <li>
            <strong>Analytics:</strong> To understand how visitors interact with
            our Service and identify areas for improvement
          </li>
          <li>
            <strong>Performance:</strong> To monitor and improve the speed and
            functionality of our Service
          </li>
          <li>
            <strong>Security:</strong> To detect and prevent fraudulent activity
            and protect your account
          </li>
          <li>
            <strong>Marketing:</strong> To deliver relevant content and
            advertisements based on your interests
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types of Cookies</h2>

        <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
        <p className="mb-4">
          These cookies are necessary for the Service to function properly. They
          enable core functionality such as security, authentication, and
          accessibility. The Service cannot function properly without these
          cookies, and they cannot be disabled.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left">
                  Cookie Name
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">
                  auth_token
                </td>
                <td className="border border-border px-4 py-2">
                  Maintains your login session
                </td>
                <td className="border border-border px-4 py-2">30 days</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">csrf_token</td>
                <td className="border border-border px-4 py-2">
                  Protects against cross-site request forgery attacks
                </td>
                <td className="border border-border px-4 py-2">Session</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  cookie_consent
                </td>
                <td className="border border-border px-4 py-2">
                  Remembers your cookie preferences
                </td>
                <td className="border border-border px-4 py-2">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Functional Cookies</h3>
        <p className="mb-4">
          These cookies enable enhanced functionality and personalization. They
          may be set by us or by third-party providers whose services we use.
          The Service will still function if you disable these cookies, but some
          features may not work as intended.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left">
                  Cookie Name
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">theme</td>
                <td className="border border-border px-4 py-2">
                  Remembers your theme preference (light/dark mode)
                </td>
                <td className="border border-border px-4 py-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">language</td>
                <td className="border border-border px-4 py-2">
                  Stores your language preference
                </td>
                <td className="border border-border px-4 py-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  gallery_view
                </td>
                <td className="border border-border px-4 py-2">
                  Remembers your gallery display preferences
                </td>
                <td className="border border-border px-4 py-2">6 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Analytics Cookies</h3>
        <p className="mb-4">
          These cookies help us understand how visitors use our Service by
          collecting and reporting information anonymously. This helps us
          improve the Service and user experience.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left">
                  Cookie Name
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">_ga</td>
                <td className="border border-border px-4 py-2">
                  Google Analytics - distinguishes users
                </td>
                <td className="border border-border px-4 py-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">_gid</td>
                <td className="border border-border px-4 py-2">
                  Google Analytics - distinguishes users
                </td>
                <td className="border border-border px-4 py-2">24 hours</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">_gat</td>
                <td className="border border-border px-4 py-2">
                  Google Analytics - throttles request rate
                </td>
                <td className="border border-border px-4 py-2">1 minute</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3">Marketing Cookies</h3>
        <p className="mb-4">
          These cookies track your online activity to help advertisers deliver
          more relevant advertising or limit how many times you see an ad. They
          may be set by us or by third-party advertising partners.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left">
                  Cookie Name
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Purpose
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">_fbp</td>
                <td className="border border-border px-4 py-2">
                  Facebook Pixel - tracks conversions and retargeting
                </td>
                <td className="border border-border px-4 py-2">3 months</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">ads_prefs</td>
                <td className="border border-border px-4 py-2">
                  Stores advertising preferences
                </td>
                <td className="border border-border px-4 py-2">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
        <p className="mb-4">
          We use services from trusted third-party providers who may set cookies
          on your device when you use our Service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Google Analytics:</strong> Helps us analyze website traffic
            and user behavior
          </li>
          <li>
            <strong>Stripe:</strong> Processes payments securely (sets cookies
            during checkout)
          </li>
          <li>
            <strong>Facebook Pixel:</strong> Enables advertising and conversion
            tracking
          </li>
          <li>
            <strong>Cloudflare:</strong> Provides security and performance
            optimization
          </li>
        </ul>
        <p>
          These third parties have their own privacy policies and cookie
          policies. We recommend reviewing their policies to understand how they
          use cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
        <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
        <p className="mb-4">
          Most web browsers allow you to control cookies through their settings.
          You can:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>View and delete cookies</li>
          <li>Block all cookies</li>
          <li>Block third-party cookies only</li>
          <li>Clear cookies when you close your browser</li>
          <li>Set exceptions for specific websites</li>
        </ul>
        <p className="mb-4">
          Here&apos;s how to manage cookies in popular browsers:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Chrome:</strong> Settings → Privacy and security → Cookies
            and other site data
          </li>
          <li>
            <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
            and Site Data
          </li>
          <li>
            <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
          </li>
          <li>
            <strong>Edge:</strong> Settings → Cookies and site permissions →
            Cookies and site data
          </li>
        </ul>
        <p className="mb-4">
          Please note that blocking or deleting cookies may affect your ability
          to use certain features of our Service. Essential cookies cannot be
          disabled as they are necessary for the Service to function.
        </p>

        <h3 className="text-xl font-semibold mb-3">Opt-Out Options</h3>
        <p className="mb-4">
          You can opt out of specific types of cookies:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Google Analytics:</strong>{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
          </li>
          <li>
            <strong>Advertising Cookies:</strong>{" "}
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Your Online Choices
            </a>{" "}
            or{" "}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Digital Advertising Alliance
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookie Consent</h2>
        <p className="mb-4">
          When you first visit Plushify, we display a cookie consent banner that
          explains our use of cookies. By clicking &quot;Accept&quot; or
          continuing to use the Service, you consent to our use of cookies as
          described in this policy.
        </p>
        <p>
          You can change your cookie preferences at any time through your
          browser settings or by contacting us. Your consent preferences are
          stored in a cookie so we can remember your choice on future visits.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Do Not Track Signals
        </h2>
        <p>
          Some browsers include a &quot;Do Not Track&quot; (DNT) feature that
          signals to websites that you do not want your online activity tracked.
          Currently, there is no industry standard for how to respond to DNT
          signals. At this time, Plushify does not respond to DNT browser
          settings or signals.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to Cookie Policy
        </h2>
        <p className="mb-4">
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. When we make changes, we will:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
          <li>Notify you through our Service or by email</li>
          <li>Request your consent again if required by law</li>
        </ul>
        <p>
          We encourage you to review this Cookie Policy periodically to stay
          informed about how we use cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">More Information</h2>
        <p className="mb-4">
          For more information about how we handle your personal data, please
          see our{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <p>
          If you would like to learn more about cookies in general, visit{" "}
          <a
            href="https://www.allaboutcookies.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.allaboutcookies.org
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have questions about our use of cookies or this Cookie Policy,
          please contact us:
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
