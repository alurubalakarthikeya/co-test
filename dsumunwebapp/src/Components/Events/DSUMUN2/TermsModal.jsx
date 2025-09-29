import "../../../style/modal.css";

const TermsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Terms and Conditions</h2>
        <div className="modal-body">
          <p><strong>Terms and Conditions for ORG Foundation presents DSUMUN II, The Model United Nations Society, Dayananda Sagar University.</strong></p>
          <p><strong>Payment Policy:</strong> All payments for DSU, The Model United Nations Society, ORG Foundation 2025 are non-refundable under any circumstances.
          Payment must be made in full to secure your participation in the event.</p>
          <p><strong>Registration and Cancellation:</strong> Registration fees are non-transferable and strictly apply only to the individual whose details have been provided.
No cancellations or transfers will be accepted once registration is confirmed.
Any administrative errors or duplicate registrations will be handled at the discretion of the organizing committee.</p>
          <p><strong>Delegate Eligibility:</strong> Delegates eligible to participate in DSU, The Model United Nations Society, ORG Foundation 2025 must be enrolled in an educational institution.
          This includes students from 8th to 12th standard (schools/colleges) as well as university students.</p>
          <p><strong>Accommodation:</strong> Participants are informed that accommodation arrangements for this event are not included in the registration fee. 
          Participants requiring accommodation will be needed to contact the organizing committee. Additional charges will be applied for the same , more details on it will be provided after the registration.</p>
          <p><strong>Food:</strong> The registration fee covers lunch for all the 3 days and high tea for first 2 days of the conference.</p>
          <p><strong>Registration Confirmation:</strong> Registration is considered complete only upon successful payment.
          Participants will receive a confirmation email with further details after the payment is processed.</p>
          <p><strong>Code of Conduct:</strong>All participants are required to adhere to the event’s Code of Conduct at all times.
          Any breach of conduct, including disruptive or unethical behavior, may result in expulsion from the event without a refund, at the discretion of the organizing committee.</p>
          <p><strong>Liability and Property Damage:</strong> The organizers are not liable for any loss, injury, or damage sustained by participants during DSU, The Model United Nations Society, ORG Foundation 2025.
          Any damage to university or event property caused by a participant will be their financial responsibility. The organizing committee reserves the right to recover costs for repairs or replacements.</p>
          <p><strong>Intellectual Property & Media Release:</strong> All event materials and recordings remain the intellectual property of the organizers. Unauthorized reproduction or distribution is prohibited.
          By registering, participants grant permission for their images, videos, or likeness to be used for promotional and archival purposes.</p>
          <p><strong>Additional Policies and Dispute Resolution:</strong> Amendment of Terms: The organizers reserve the right to modify these Terms & Conditions at any time. Participants will be notified of significant changes via email or updates on the official event website.
          Force Majeure: The organizers shall not be liable for any failure or delay in performance arising out of causes beyond their reasonable control.</p>
          <p><strong>Contact Information:</strong>It is the responsibility of participants to provide accurate and up-to-date contact information during registration.
For any queries or assistance regarding these Terms & Conditions, please contact:
Email: delegate-affairs@dsumunsoc.in
Phone: 7022179550 </p>
            <p><strong>You agree to share information entered on this page with ORG Foundation, The Model United Nations Society, Dayananda Sagar University and Razorpay, adhering to applicable laws.</strong></p>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TermsModal;
