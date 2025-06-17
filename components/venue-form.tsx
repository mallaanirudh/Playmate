'use client';
import { useState } from 'react';
import { uploadImage } from '@/utils/uploadImage';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFile(e.target.files[0]);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/venue', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      alert('Venue created!');
    } else {
      alert('Error creating venue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" onChange={handleChange} placeholder="Venue Name" required />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <select name="venueType" onChange={handleChange} defaultValue="TURF">
        <option>TURF</option>
        <option>GYM</option>
        <option>SPORTS_COMPLEX</option>
        <option>BADMINTON</option>
        <option>TENNIS</option>
        <option>BASKETBALL</option>
        <option>SWIMMING_POOL</option>
      </select>
      <input name="address" onChange={handleChange} placeholder="Address" />
      <input name="city" onChange={handleChange} placeholder="City" />
      <input name="state" onChange={handleChange} placeholder="State" />
      <input name="pincode" onChange={handleChange} placeholder="Pincode" />
      <input name="latitude" onChange={handleChange} placeholder="Latitude" />
      <input name="longitude" onChange={handleChange} placeholder="Longitude" />
      <input name="phone" onChange={handleChange} placeholder="Phone" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="websiteUrl" onChange={handleChange} placeholder="Website" />
      <button type="submit">Create Venue</button>
    </form>
  );
}
