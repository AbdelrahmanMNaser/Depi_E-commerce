import React from 'react';

const features = [
    {
      title: 'Chat Assist',
      description: 'Need to write something in a hurry? Just type a few keywords to achieve full productivity. Composer feature for Chat Assist requires a network connection and Samsung Account login. This feature is activated when a certain number of characters is met. Service availability may vary by language. Accuracy of results is not guaranteed.',
      imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/bacf98d7-dfc0-4a43-ba4c-7e2e5746768e.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    },
    {
      title: 'Browsing Assist',
      description: 'Find a website that you need to understand quickly? AI summarizes entire websites in a flash. Summary feature for Browsing Assist requires a network connection and Samsung Account login. Service availability may vary by language. Service may have limited functionality or unavailable on certain paid websites. Character limit applies. Accuracy of results is not guaranteed.',
      imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/38645c58-5539-4b7e-8061-498bb5066a8f.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    },
    {
      title: 'Photo Assist',
      description: 'Effortless editing, courtesy of Galaxy AI. With Photo Assist, just hold your finger down on an object to move, erase or enlarge it; adjust angles or fill backgrounds just as easily. Generative Edit feature for Photo Assist requires a network connection and Samsung Account login. Editing with Generative Edit may result in a resized photo up to 12MP. A visible watermark is overlaid on the image output upon saving in order to indicate that the image is generated by AI. The accuracy and reliability of the generated output is not guaranteed.',
      imageUrl: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/17a94716-b444-45b2-9d83-0d9c676e623a.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    },
  ];

  const FeaturesComponent = () => {
    return (
      <div className="w-full p-4 flex justify-center">
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="border-b pb-8">
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  {feature.imageUrl && (
                    <div className="w-full md:w-1/4">
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="w-full md:w-1/2 flex items-center">
                    <p className="text-xl text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  

export default FeaturesComponent;
