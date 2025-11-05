import React from 'react';
import ImageComponent from './ImageComponent';
import { imageLoader } from '../utils/imageLoader';

const ImageTest: React.FC = () => {
  const clientLogos = imageLoader.getAllClientLogos();
  const footerLogo = imageLoader.getFooterLogo();
  const heroAnimation = imageLoader.getHeroAnimation();
  const serviceIcon = imageLoader.getServiceIcon('websites3d');

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Image System Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Test Footer Logo */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Footer Logo</h2>
          <ImageComponent
            category="logos"
            imageId="footer"
            className="mx-auto"
            width={200}
            height={60}
          />
          {footerLogo && (
            <p className="text-sm text-gray-600 mt-2">
              Path: {footerLogo.suggestedPath}
            </p>
          )}
        </div>

        {/* Test Hero Animation */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Hero Animation</h2>
          <ImageComponent
            category="hero"
            imageId="animation"
            className="mx-auto"
            width={400}
            height={300}
          />
          {heroAnimation && (
            <p className="text-sm text-gray-600 mt-2">
              Path: {heroAnimation.suggestedPath}
            </p>
          )}
        </div>

        {/* Test Service Icon */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Service Icon</h2>
          <ImageComponent
            category="services"
            imageId="websites3d"
            className="mx-auto"
            width={64}
            height={64}
          />
          {serviceIcon && (
            <p className="text-sm text-gray-600 mt-2">
              Path: {serviceIcon.suggestedPath}
            </p>
          )}
        </div>

        {/* Test Client Logos Grid */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Client Logos Grid</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clientLogos.map((logo, index) => (
              <div key={logo.id} className="text-center">
                <ImageComponent
                  category="clients"
                  imageId={`clientLogo${index + 1}`}
                  className="mx-auto mb-2"
                  width={120}
                  height={80}
                />
                {logo && (
                  <p className="text-xs text-gray-600">
                    {logo.clientName || `Client ${index + 1}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Test Various Icons */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Process Icons</h2>
          <div className="flex gap-8 justify-center">
            {['discovery', 'design', 'launch', 'growth'].map((process) => (
              <div key={process} className="text-center">
                <ImageComponent
                  category="process"
                  imageId={process}
                  className="mx-auto mb-2"
                  width={48}
                  height={48}
                />
                <p className="text-xs text-gray-600 capitalize">{process}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Debug Information */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Manifest Info</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(imageLoader.getManifestInfo(), null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Image Categories</h3>
            <ul className="text-sm">
              <li>• Hero Animations</li>
              <li>• Logos ({clientLogos.length + 1} items)</li>
              <li>• Client Logos ({clientLogos.length} items)</li>
              <li>• Service Icons (2 items)</li>
              <li>• Value Icons (5 items)</li>
              <li>• Process Icons (5 items)</li>
              <li>• Team Photos (5 items)</li>
              <li>• Testimonials (3 items)</li>
              <li>• Contact Icons (2 items)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTest;