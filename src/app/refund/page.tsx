import { LegalPageLayout } from "@/components/legal-page-layout"

export default function RefundPage() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      lastUpdated={new Date("2025-01-12")}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          At Plushify, we strive to provide the best possible service and ensure
          your satisfaction. This Refund Policy outlines the circumstances under
          which refunds may be issued and the process for requesting a refund.
        </p>
        <p>
          We operate on a credit-based system where you purchase credits that
          are used to generate plushie transformations. Our refund policy
          reflects this model and aims to be fair to both our customers and our
          business.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Eligibility for Refunds
        </h2>
        <p className="mb-4">
          Refunds may be issued in the following circumstances:
        </p>

        <h3 className="text-xl font-semibold mb-3">Unused Credits</h3>
        <p className="mb-4">
          You may request a refund for unused credits under these conditions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Credits have not been used to generate any plushie transformations
          </li>
          <li>The refund request is made within 14 days of purchase</li>
          <li>
            You have not previously requested refunds for multiple credit
            purchases
          </li>
          <li>The purchase was made through our official website</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Technical Issues</h3>
        <p className="mb-4">
          Refunds may be issued if you experience technical problems that
          prevent you from using the Service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Repeated generation failures due to system errors (not user error)
          </li>
          <li>
            Credits deducted without successful generation completion
          </li>
          <li>Service outages that prevent access for extended periods</li>
          <li>
            Documented bugs that significantly impact your ability to use the
            Service
          </li>
        </ul>
        <p className="mb-4">
          In these cases, we will first attempt to resolve the technical issue.
          If the issue cannot be resolved within a reasonable timeframe, we may
          issue a refund or credit compensation.
        </p>

        <h3 className="text-xl font-semibold mb-3">Service Disruptions</h3>
        <p className="mb-4">
          If our Service experiences significant disruptions that prevent you
          from using your credits:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Extended downtime exceeding 48 consecutive hours</li>
          <li>
            Permanent discontinuation of the Service (with 30 days notice)
          </li>
          <li>
            Major feature removal that significantly impacts functionality
          </li>
        </ul>
        <p>
          We will provide prorated refunds or credit extensions based on the
          duration and impact of the disruption.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
        <p className="mb-4">
          The following are NOT eligible for refunds:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Used Credits:</strong> Credits that have been used to
            generate plushie transformations, regardless of satisfaction with
            the results
          </li>
          <li>
            <strong>Completed Generations:</strong> Any successfully completed
            plushie generation, even if you are not satisfied with the output
          </li>
          <li>
            <strong>User Error:</strong> Issues resulting from incorrect usage,
            such as uploading inappropriate images or selecting wrong options
          </li>
          <li>
            <strong>Subjective Quality:</strong> Dissatisfaction with the
            artistic style or quality of generated plushies (as results may vary
            based on input images)
          </li>
          <li>
            <strong>Change of Mind:</strong> Deciding you no longer want to use
            the Service after credits have been used
          </li>
          <li>
            <strong>Promotional Credits:</strong> Free credits received through
            promotions, referrals, or bonuses
          </li>
          <li>
            <strong>Expired Offers:</strong> Refund requests made after the
            14-day eligibility window
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Refund Request Process
        </h2>
        <p className="mb-4">
          To request a refund, please follow these steps:
        </p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-3">
            <strong>Contact Our Support Team:</strong> Email us at{" "}
            <a
              href="mailto:refunds@plushify.com"
              className="text-primary hover:underline"
            >
              refunds@plushify.com
            </a>{" "}
            with the subject line &quot;Refund Request&quot;
          </li>
          <li className="mb-3">
            <strong>Provide Required Information:</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Your account email address</li>
              <li>Order/transaction ID</li>
              <li>Date of purchase</li>
              <li>Amount paid</li>
              <li>Reason for refund request</li>
              <li>
                Any supporting documentation (screenshots, error messages, etc.)
              </li>
            </ul>
          </li>
          <li className="mb-3">
            <strong>Review Process:</strong> Our team will review your request
            within 3-5 business days
          </li>
          <li className="mb-3">
            <strong>Decision Notification:</strong> You will receive an email
            with our decision and next steps
          </li>
          <li className="mb-3">
            <strong>Refund Processing:</strong> If approved, refunds are
            processed within 5-7 business days
          </li>
        </ol>
        <p>
          Please note that providing complete and accurate information will help
          us process your request more quickly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Refund Method</h2>
        <h3 className="text-xl font-semibold mb-3">
          Original Payment Method
        </h3>
        <p className="mb-4">
          Approved refunds will be issued to your original payment method:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Credit/Debit Card:</strong> Refunds appear within 5-10
            business days, depending on your bank
          </li>
          <li>
            <strong>PayPal:</strong> Refunds appear within 3-5 business days
          </li>
          <li>
            <strong>Other Payment Methods:</strong> Processing time varies by
            provider
          </li>
        </ul>
        <p className="mb-4">
          Please note that we cannot control how quickly your financial
          institution processes the refund once it has been issued.
        </p>

        <h3 className="text-xl font-semibold mb-3">Credit Alternatives</h3>
        <p className="mb-4">
          In some cases, we may offer alternatives to monetary refunds:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Account Credit:</strong> Receive the refund amount as
            credits in your Plushify account (with a 10% bonus)
          </li>
          <li>
            <strong>Service Extension:</strong> Extended access to premium
            features or additional credits
          </li>
          <li>
            <strong>Plan Upgrade:</strong> Upgrade to a higher tier plan at no
            additional cost
          </li>
        </ul>
        <p>
          These alternatives are offered at our discretion and require your
          consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Partial Refunds</h2>
        <p className="mb-4">
          In certain situations, we may issue partial refunds:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Prorated Refunds:</strong> If you&apos;ve used some but not
            all of your credits, we may refund the value of unused credits
          </li>
          <li>
            <strong>Service Disruptions:</strong> Compensation for downtime or
            service issues proportional to the impact
          </li>
          <li>
            <strong>Failed Generations:</strong> Refund of credits for
            generations that failed due to system errors
          </li>
        </ul>
        <p>
          Partial refunds are calculated based on the unused portion of your
          credit purchase and the original price per credit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Service Cancellation
        </h2>
        <h3 className="text-xl font-semibold mb-3">Account Cancellation</h3>
        <p className="mb-4">
          If you decide to cancel your Plushify account:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Unused credits will remain in your account for 90 days after
            cancellation
          </li>
          <li>
            You can reactivate your account within 90 days to use remaining
            credits
          </li>
          <li>
            After 90 days, unused credits are forfeited and no refund will be
            issued
          </li>
          <li>
            To request a refund for unused credits, you must do so before
            canceling your account
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">
          Subscription Cancellation
        </h3>
        <p className="mb-4">
          If we introduce subscription plans in the future:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            You can cancel your subscription at any time through your account
            settings
          </li>
          <li>
            Cancellations take effect at the end of the current billing period
          </li>
          <li>No refunds for partial billing periods</li>
          <li>
            Credits included in subscription plans expire at the end of the
            billing period
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
        <p className="mb-4">
          We may make exceptions to this Refund Policy in special circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Medical or Emergency Situations:</strong> Documented
            personal emergencies that prevent you from using the Service
          </li>
          <li>
            <strong>Service Failures:</strong> Significant technical issues that
            we cannot resolve
          </li>
          <li>
            <strong>Billing Errors:</strong> Duplicate charges or incorrect
            amounts
          </li>
          <li>
            <strong>Unauthorized Charges:</strong> Fraudulent transactions on
            your account
          </li>
        </ul>
        <p>
          Each exception is evaluated on a case-by-case basis. Please contact
          our support team to discuss your specific situation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Chargebacks</h2>
        <p className="mb-4">
          If you initiate a chargeback with your payment provider without first
          contacting us:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your account will be immediately suspended pending investigation</li>
          <li>
            We will provide evidence to your payment provider to dispute the
            chargeback
          </li>
          <li>
            If the chargeback is found to be unjustified, your account may be
            permanently terminated
          </li>
          <li>
            You may be liable for chargeback fees and administrative costs
          </li>
        </ul>
        <p>
          We strongly encourage you to contact us first to resolve any billing
          disputes before initiating a chargeback.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to Refund Policy
        </h2>
        <p className="mb-4">
          We may update this Refund Policy from time to time. When we make
          changes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The &quot;Last Updated&quot; date will be revised</li>
          <li>
            Significant changes will be communicated via email or website notice
          </li>
          <li>
            Changes apply to purchases made after the effective date of the
            update
          </li>
          <li>
            Previous purchases are governed by the policy in effect at the time
            of purchase
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Satisfaction Guarantee
        </h2>
        <p className="mb-4">
          While we cannot guarantee specific results due to the nature of AI
          image generation, we are committed to your satisfaction:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            We continuously improve our AI models to deliver better results
          </li>
          <li>
            Our support team is available to help you get the best possible
            outcomes
          </li>
          <li>
            We offer tips and best practices for uploading photos to optimize
            results
          </li>
          <li>
            If you experience persistent issues, we will work with you to find a
            solution
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact for Refunds</h2>
        <p className="mb-4">
          For refund requests or questions about this Refund Policy, please
          contact us:
        </p>
        <ul className="list-none mb-4">
          <li className="mb-2">
            <strong>Refund Requests:</strong>{" "}
            <a
              href="mailto:refunds@plushify.com"
              className="text-primary hover:underline"
            >
              refunds@plushify.com
            </a>
          </li>
          <li className="mb-2">
            <strong>General Support:</strong>{" "}
            <a
              href="mailto:support@plushify.com"
              className="text-primary hover:underline"
            >
              support@plushify.com
            </a>
          </li>
          <li className="mb-2">
            <strong>Billing Questions:</strong>{" "}
            <a
              href="mailto:billing@plushify.com"
              className="text-primary hover:underline"
            >
              billing@plushify.com
            </a>
          </li>
          <li>
            <strong>Contact Form:</strong>{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact Page
            </a>
          </li>
        </ul>
        <p>
          Our support team typically responds within 24-48 hours during business
          days.
        </p>
      </section>
    </LegalPageLayout>
  )
}
