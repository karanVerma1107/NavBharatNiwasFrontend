import React from 'react'

// Helper styles
const sectionStyle = (emoji) => ({
    color: "#1e40af",
    fontSize: "1.6vmax",
    marginTop: "2vmax",
    marginBottom: "1vmax",
    borderBottom: "2px solid #60a5fa",
    paddingBottom: "0.4vmax",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "0.5vmax"
  });
  
  const listStyle = {
    marginLeft: "2vmax",
    marginBottom: "1.5vmax",
    lineHeight: 1.6,
    listStyleType: "circle"
  };

const PP = () => {
  return (
    <div style={{marginTop:"6vmax"}}>

<div
      style={{
        maxWidth: "90%",
        margin: "4vmax auto",
        padding: "3vmax",
        background: "linear-gradient(135deg, #f0f4ff, #fffbea)",
        borderRadius: "1.5vmax",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "1.1vmax",
        lineHeight: 1.75,
        color: "#1f2937"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "2.2vmax",
          marginBottom: "1.5vmax",
          borderBottom: "3px solid #2563eb",
          paddingBottom: "0.6vmax"
        }}
      >
        🔒 Privacy Policy
      </h1>

      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        This Privacy Policy explains how we collect, use, and protect your personal data when you
        respond to our advertisements. By using the service, you consent to the data practices
        described here.
      </p>

      <h2 style={sectionStyle("📘")}>Interpretation and Definitions</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        Capitalized words have defined meanings described below. These apply regardless of singular
        or plural form.
      </p>

      <h2 style={sectionStyle("🔤")}>Definitions</h2>
      <ul style={listStyle}>
        <li><strong>Company</strong>: Refers to <span style={{ color: "#1d4ed8" }}>NavBharat Niwas</span>.</li>
        <li><strong>Device</strong>: Any device like a phone, tablet, or computer.</li>
        <li><strong>Personal Data</strong>: Any info that identifies an individual.</li>
        <li><strong>Service</strong>: The ad, website, or app you’re interacting with.</li>
        <li><strong>Service Provider</strong>: A third party who processes data for us.</li>
        <li><strong>Usage Data</strong>: Automatically collected info like IP address, browser type, etc.</li>
        <li><strong>You</strong>: The person using the service.</li>
      </ul>

      <h2 style={sectionStyle("📥")}>Data We Collect</h2>
      <ul style={listStyle}>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Location details</li>
        <li>Comments or preferences shared with us</li>
      </ul>

      <h2 style={sectionStyle("🎯")}>How We Use Your Data</h2>
      <ul style={listStyle}>
        <li>To manage and maintain our service</li>
        <li>To fulfill contracts or agreements</li>
        <li>To communicate and support you</li>
        <li>For analytics and service improvement</li>
        <li>To process business transactions</li>
      </ul>

      <h2 style={sectionStyle("🤝")}>Data Sharing</h2>
      <ul style={listStyle}>
        <li>With Service Providers we trust</li>
        <li>During business transfers</li>
        <li>With affiliates and business partners</li>
        <li>With your explicit consent</li>
      </ul>

      <h2 style={sectionStyle("🗂️")}>Data Retention & Transfer</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        We retain data as long as needed and may transfer data internationally under privacy
        safeguards.
      </p>

      <h2 style={sectionStyle("🛡️")}>Data Security</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        We use industry-standard security practices, though no system is completely secure.
      </p>

      <h2 style={sectionStyle("🔗")}>External Links</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        Our services may link to third-party sites. Their privacy policies apply.
      </p>

      <h2 style={sectionStyle("🔄")}>Policy Updates</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        We may update this Privacy Policy occasionally. Changes will be posted here.
      </p>

      <h2 style={sectionStyle("📩")}>Contact Us</h2>
      <p style={{ marginBottom: "1.2vmax", textAlign: "justify" }}>
        Questions? Email us at:{" "}
        <strong style={{ color: "#dc2626" }}>navbharatniwaspvt@gmail.com</strong>
      </p>
    </div>

    </div>
  )
}

export default PP