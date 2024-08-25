import React from 'react';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Navbar />

      <H1 id={"terms-of-service"} message={"Terms Of Service"} />

      <div className="flex-grow container mx-auto p-4">

        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/3">
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="mb-10">
                Welcome to my personal blog! This blog is created for personal use only, where I share my thoughts, experiences, and other content I find interesting. By accessing or using this blog, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <h2 className="text-2xl font-semibold mb-4">1. Personal Use Only</h2>
              <p className="mb-8">
                This blog is intended for personal use only. The content provided on this blog is for informational and entertainment purposes. I reserve the right to update or change the content of the blog at any time without notice.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Content Ownership</h2>
              <p className="mb-8">
                All content on this blog, including text, images, and other media, is the property of the blog owner unless otherwise stated. You may not reproduce, distribute, or use the content for commercial purposes without explicit permission from the owner.
              </p>

              <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
              <p className="mb-8">
                While commenting on or interacting with the blog, users are expected to conduct themselves respectfully and lawfully. Any inappropriate, offensive, or illegal behavior may result in the removal of comments and/or blocking of users.
              </p>

              <h2 className="text-2xl font-semibold mb-4">4. Privacy</h2>
              <p className="mb-8">
                Your privacy is important to me. Any personal information you provide, such as through comments or subscriptions, will be handled with care and will not be shared with third parties without your consent unless required by law.
              </p>

              <h2 className="text-2xl font-semibold mb-4">5. External Links</h2>
              <p className="mb-8">
                This blog may contain links to external websites that are not controlled or operated by me. I am not responsible for the content or practices of these external sites. Visiting these links is at your own risk.
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
              <p className="mb-8">
                The content provided on this blog is for informational purposes only and reflects my personal opinions and experiences. I make no representations or warranties regarding the accuracy or completeness of the content. The blog is provided on an "as-is" basis, and I disclaim any liability for any errors or omissions.
              </p>

              <h2 className="text-2xl font-semibold mb-4">7. Changes to the Terms</h2>
              <p className="mb-8">
                I reserve the right to modify these terms of service at any time. Any changes will be posted on this page, and your continued use of the blog constitutes acceptance of the updated terms.
              </p>

              {/* <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p className="mb-8">
                If you have any questions or concerns about these terms of service, please feel free to contact me at [Your Contact Information].
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default TermsOfService;
