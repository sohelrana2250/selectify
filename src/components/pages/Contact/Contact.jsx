
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(150, "Message must be less than 150 characters"),
});

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setFormStatus("success");
    setTimeout(() => setFormStatus(null), 3000); // Clear status after 3 seconds
  };

  return (
    <div className="min-h-screen  text-gray-100 p-3">
     


      {/* Google Map Section */}
      <section className="mt-16">
        <div className="flex justify-center items-center">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.810222157101!2d90.410783!3d23.736174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85f9b50b70b%3A0x1060bab3d93adc1e!2sHotel%20Victory!5e0!3m2!1sen!2sbd!4v1696054791454!5m2!1sen!2sbd"
            className="w-full h-[300px] md:h-[600px] border-2 border-gray-300 rounded-lg shadow-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <header className="text-center my-10">
        <h1 className="text-4xl font-serif text-black sm:text-5xl font-extrabold mb-5">Get in Touch</h1>
        <p className="text-lg sm:text-xl text-black">
          We'd love to hear from you! Fill out the form below or reach out directly.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <section className="p-6 bg-gray-950 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <ul className="space-y-4 font-serif">
            <li>
              <strong>Email:</strong> hello@ollyo.com
            </li>
            <li>
              <strong>Phone:</strong> +880 17 4293 3775
            </li>
            <li>
              <strong>Address:</strong> 1 Quantum Drive, Patira, Dhaka - 1229
            </li>
            <li>
              <strong>Social:</strong>
              <ul className="flex space-x-4 mt-2 mb-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                     < CiFacebook className="text-4xl"/>
                  </a>
                </li>
                <li>
                 
                  <a href="#" className="hover:text-blue-400">
                     < FaLinkedin className="text-4xl"/>
                  </a>
                  
                </li>
                <li>
                <a href="#" className="hover:text-blue-400">
                     < FaXTwitter className="text-4xl"/>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <section >
        <div className="flex justify-center items-center">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.810222157101!2d90.410783!3d23.736174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85f9b50b70b%3A0x1060bab3d93adc1e!2sHotel%20Victory!5e0!3m2!1sen!2sbd!4v1696054791454!5m2!1sen!2sbd"
            className="w-full h-[150px] md:h-[350px] border-2 border-gray-300 rounded-lg shadow-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
        </section>

        {/* Contact Form */}
        <section className="p-6 bg-gray-950 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Contact Us</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  {...register("first_name")}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 ${
                    errors.first_name ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  type="text"
                  aria-invalid={!!errors.first_name}
                />
                {touchedFields.first_name && errors.first_name && (
                  <span className="text-red-400 text-sm">{errors.first_name.message}</span>
                )}
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  {...register("last_name")}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 ${
                    errors.last_name ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  type="text"
                  aria-invalid={!!errors.last_name}
                />
                {touchedFields.last_name && errors.last_name && (
                  <span className="text-red-400 text-sm">{errors.last_name.message}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register("email")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                type="email"
                aria-invalid={!!errors.email}
              />
              {touchedFields.email && errors.email && (
                <span className="text-red-400 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                {...register("subject")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 ${
                  errors.subject ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                type="text"
                aria-invalid={!!errors.subject}
              />
              {touchedFields.subject && errors.subject && (
                <span className="text-red-400 text-sm">{errors.subject.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                {...register("message")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 focus:ring-2 ${
                  errors.message ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                rows={5}
                aria-invalid={!!errors.message}
              ></textarea>
              {touchedFields.message && errors.message && (
                <span className="text-red-400 text-sm">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold transition duration-300"
            >
              Submit
            </button>

            {formStatus === "success" && (
              <p className="text-green-400 text-center mt-4">
                Your message has been sent successfully!
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
