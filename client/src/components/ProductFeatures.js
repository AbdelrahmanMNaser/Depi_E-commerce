import React from 'react';

  const FeaturesComponent = ({features}) => {
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
