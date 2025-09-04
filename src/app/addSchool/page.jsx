"use client";
import { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddSchool() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedForm = {
      ...form,
      [name]: files ? files[0] : value,
    };
    setForm(updatedForm);

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "School name must be at least 3 characters long.";
    }
    if (
      !formData.email_id ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)
    ) {
      newErrors.email_id = "Please enter a valid email address.";
    }
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits.";
    }
    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters long.";
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    if (!formData.state) {
      newErrors.state = "State is required.";
    }
    if (!formData.image) {
      newErrors.image = "School image is required.";
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm(form);
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("School added successfully!");
        setForm({
          name: "",
          address: "",
          city: "",
          state: "",
          contact: "",
          email_id: "",
          image: null,
        });
        setErrors({});
        e.target.reset();
      } else {
        const err = await res.json();
        toast.error("Error: " + err.message);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-lg p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-sm"
      >
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
            Add New School
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Fill in the details to register a new school
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              School Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter school name"
              className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              name="email_id"
              value={form.email_id}
              onChange={handleChange}
              placeholder="school@example.com"
              type="email"
              className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
              required
            />
            {errors.email_id && (
              <p className="text-red-600 text-sm">{errors.email_id}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter complete address"
            className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
            required
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
              required
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
              required
            />
            {errors.state && (
              <p className="text-red-600 text-sm">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Contact Number
          </label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter 10-digit contact number"
            pattern="[0-9]{10}"
            className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 placeholder-slate-400"
            required
          />
          {errors.contact && (
            <p className="text-red-600 text-sm">{errors.contact}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            School Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 sm:px-4 py-3 sm:py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-slate-900 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
            required
          />
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white cursor-pointer py-3 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-slate-600 transition-colors"
        >
          Add School
        </button>
      </form>
    </div>
  );
}
