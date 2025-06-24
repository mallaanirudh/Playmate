'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { uploadImage } from '@/utils/uploadprofileimage';
import { Camera, Edit3, Save, X, User, Phone, Users, Briefcase } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    avatarUrl: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Preload user data
  useEffect(() => {
    if (user) {
      fetch(`/api/profile/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name || '',
            phone: data.phone || '',
            gender: data.gender || '',
            avatarUrl: data.avatarUrl || '',
            role: data.role || 'CUSTOMER',
          });
        });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
    } catch (err) {
      console.error('Image upload failed', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsEditing(false); // Exit edit mode after saving
      } else {
        console.error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile', err);
    }
    setLoading(false);
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'VENUE_OWNER':
        return 'Venue Owner';
      case 'CUSTOMER':
        return 'Customer';
      default:
        return role;
    }
  };

  const getGenderDisplay = (gender: string) => {
    switch (gender) {
      case 'MALE':
        return 'Male';
      case 'FEMALE':
        return 'Female';
      case 'OTHER':
        return 'Custom';
      default:
        return 'Not specified';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {!isEditing ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center relative">
                <div className="relative inline-block">
                  {formData.avatarUrl ? (
                    <Image
                      src={formData.avatarUrl}
                      alt="Profile Picture"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-lg mx-auto"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mt-4 mb-2">
                  {formData.name || 'Your Name'}
                </h1>
                <p className="text-blue-100 text-lg">
                  {getRoleDisplay(formData.role)}
                </p>
              </div>

              {/* Profile Details */}
              <div className="px-8 py-8">
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-lg text-gray-900">{formData.name || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Phone className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-lg text-gray-900">{formData.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-lg text-gray-900">{getGenderDisplay(formData.gender)}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="text-lg text-gray-900">{getRoleDisplay(formData.role)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-8">
                <h1 className="text-2xl font-bold text-white text-center">Edit Profile</h1>
              </div>

              {/* Edit Form */}
              <div className="px-8 py-8 space-y-6">
                {/* Avatar Upload */}
                <div className="text-center">
                  <div className="relative inline-block">
                    {formData.avatarUrl ? (
                      <Image
                        src={formData.avatarUrl}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click camera to change photo</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="VENUE_OWNER">Venue Owner</option>
                      {/** ADMIN role is intentionally not included */}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}