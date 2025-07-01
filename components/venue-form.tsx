'use client';
import { useState } from 'react';
import { uploadImage } from '@/utils/uploadImage';
import { useRouter } from 'next/navigation';

export default function VenueForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    venueType: 'TURF',
    address: '',
    city: '',
    state: '',
    pincode: '',
    latitude: '',
    longitude: '',
    phone: '',
    email: '',
    websiteUrl: '',
  });

  const [slots, setSlots] = useState([{ date: '', startTime: '', endTime: '' }]);

  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert('Please select an image first!');
    setUploading(true);
    try {
      const url = await uploadImage(imageFile);
      setImageUrl(url);
      alert('Image uploaded successfully!');
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSlotChange = (index: number, field: string, value: string) => {
    const updated = [...slots];
    updated[index][field as keyof typeof slots[0]] = value;
    setSlots(updated);
  };

  const addSlot = () => {
    setSlots([...slots, { date: '', startTime: '', endTime: '' }]);
  };

  const removeSlot = (index: number) => {
    if (slots.length === 1) return;
    const updated = [...slots];
    updated.splice(index, 1);
    setSlots(updated);
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!imageUrl) return alert('Please upload an image before submitting.');

    try {
      const res = await fetch('/api/venue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slots }),
      });

      const data = await res.json();

      if (data.success) {
        const venueId = data.venue.id;

        const imageRes = await fetch('/api/venueImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            venueId,
            imageUrl,
            isPrimary: true,
            caption: 'Optional Caption',
          }),
        });

        const imageData = await imageRes.json();

        if (imageData.success) {
          alert('Venue and image created successfully!');
          router.push('/uservenues');
        } else {
          alert('Venue created, but failed to save image: ' + imageData.error);
        }
      } else {
        alert('Failed to create venue: ' + data.error);
      }
    } catch (err: any) {
      alert('Error submitting form: ' + err.message);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Venue</h1>
            <p className="text-gray-600">Fill in the details to create a new venue listing</p>
          </div>

          <div className="space-y-6">
              
              <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses} htmlFor="name">Venue Name *</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter venue name"
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
                
                <div>
                  <label className={labelClasses} htmlFor="venueType">Venue Type</label>
                  <select
                    id="venueType"
                    name="venueType"
                    defaultValue="TURF"
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    {['TURF','GYM','SPORTS_COMPLEX','BADMINTON','TENNIS','BASKETBALL','SWIMMING_POOL'].map(v => (
                      <option key={v} value={v}>{v.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClasses} htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your venue..."
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                Location Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={labelClasses} htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClasses} htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="state">State</label>
                    <input
                      id="state"
                      name="state"
                      placeholder="State"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="pincode">Pincode</label>
                    <input
                      id="pincode"
                      name="pincode"
                      placeholder="Pincode"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses} htmlFor="latitude">Latitude</label>
                    <input
                      id="latitude"
                      name="latitude"
                      placeholder="e.g., 19.0760"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses} htmlFor="longitude">Longitude</label>
                    <input
                      id="longitude"
                      name="longitude"
                      placeholder="e.g., 72.8777"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses} htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="+91 9876543210"
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="venue@example.com"
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClasses} htmlFor="websiteUrl">Website URL</label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  placeholder="https://www.example.com"
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                Venue Image *
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={labelClasses} htmlFor="imageFile">Select Image</label>
                  <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={uploading || !imageFile}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Image
                    </>
                  )}
                </button>
                
                {imageUrl && (
                  <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Image uploaded successfully!</span>
                  </div>
                )}
              </div>
            </div>




            {/* Slot Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                Available Slots
              </h2>

              <div className="space-y-4">
                {slots.map((slot, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className={labelClasses}>Date</label>
                      <input
                        type="date"
                        value={slot.date}
                        onChange={(e) => handleSlotChange(index, 'date', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <label className={labelClasses}>End Time</label>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                          className={inputClasses}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="text-red-500 text-sm mt-5 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSlot}
                  className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium"
                >
                  + Add Slot
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Venue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
