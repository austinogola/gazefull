import React from 'react';
import '../styles/PrivacyPolicy.css';

const Privacy = () => {
    return (
        <div className="privacy-container">
            <h1>GazeGuard Privacy Policy</h1>
            <p><strong>Last Updated: 16th November, 2024</strong></p>

            <section className="policy-section">
                <h2>1. Information We Collect</h2>
                <p>We do <strong>not</strong> collect or store any personal information, images, videos, or other media content from our users. All processing of content, such as identifying and blurring NSFW content or identifying gender, occurs locally on your device.</p>
            </section>

            <section className="policy-section">
                <h2>2. How Our Extension Works</h2>
                <p>Our extension operates entirely on your local machine. The extension scans media (images and videos) displayed on websites to identify content that may be inappropriate or NSFW based on user settings. The process is as follows:</p>
                <ul>
                    <li>The extension does <strong>not</strong> send any data to external servers.</li>
                    <li>We do <strong>not</strong> track, monitor, or log any browsing history or media content.</li>
                    <li>All media scanning and processing happen in real time on your device, ensuring your data remains private.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>3. Third-Party Services</h2>
                <p>We do not integrate or use any third-party analytics, tracking, or data-collection services in our extension.</p>
            </section>

            <section className="policy-section">
                <h2>4. User Control and Consent</h2>
                <p>You maintain full control over the operation of the extension:</p>
                <ul>
                    <li>You can enable or disable the blurring feature at any time through the extension’s settings.</li>
                    <li>The extension only processes media content displayed in your browser, and you can configure specific conditions such as NSFW or gender-based blurring.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>5. Security</h2>
                <p>Since no data is transmitted to external servers, there is minimal risk of data breaches or external access to your media. Your content stays on your device, protected by your system’s security protocols.</p>
            </section>

            <section className="policy-section">
                <h2>6. Your Rights</h2>
                <p>As we do not store any personal information or media content, there is no need for concerns regarding access, modification, or deletion of such data. You have full control over the extension, and you can uninstall it at any time, stopping all functionality immediately.</p>
            </section>

            <section className="policy-section">
                <h2>7. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy to reflect changes in our practices or legal obligations. Any updates will be posted on this page, and the date of the latest revision will be indicated at the top.</p>
            </section>

            <section className="policy-section">
                <h2>8. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy or the functionality of our extension, please contact us at [email/contact form].</p>
            </section>
        </div>
    );
};

export default Privacy;
