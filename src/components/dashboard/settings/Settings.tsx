import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'InfiniSoft',
    siteDescription: 'IT Solutions and Equipment Provider',
    contactEmail: 'info@infinisoft.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Tech Boulevard, Silicon Valley, CA 94043',
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: 'https://facebook.com/infinisoft',
    twitter: 'https://twitter.com/infinisoft',
    linkedin: 'https://linkedin.com/company/infinisoft',
    instagram: 'https://instagram.com/infinisoft',
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save general settings
    alert('General settings saved!');
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save social media settings
    alert('Social media settings saved!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h2>
          <form onSubmit={handleGeneralSubmit}>
            <div className="mb-4">
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                id="siteName"
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
              <textarea
                id="siteDescription"
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                value={generalSettings.contactEmail}
                onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="text"
                id="contactPhone"
                value={generalSettings.contactPhone}
                onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                id="address"
                value={generalSettings.address}
                onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                rows={2}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
            >
              Save General Settings
            </button>
          </form>
        </div>

        {/* Social Media Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h2>
          <form onSubmit={handleSocialSubmit}>
            <div className="mb-4">
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="url"
                id="facebook"
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
              <input
                type="url"
                id="twitter"
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                value={socialMedia.linkedin}
                onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="url"
                id="instagram"
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
            >
              Save Social Media Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
