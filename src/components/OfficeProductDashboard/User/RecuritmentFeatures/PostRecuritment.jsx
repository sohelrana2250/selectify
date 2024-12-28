

import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { 
  Briefcase, 
  Calendar,
  Plus,
  Trash2,
  Save
} from 'lucide-react';

const JobPostingForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      position: "Software Engineers",
      companyname: "Tech Solutions Ltd.",
      experience: "3+ years of experience in software development",
      workingtime: "FULL TIME",
      location: "Dhaka, Bangladesh",
      overview: "We are looking for a skilled software engineer to join our growing team.",
      responsibilities: [{ responsibilities: "Develop and maintain web applications" }],
      skills: [{ skills: "JavaScript" }],
      requirements: [{ requirements: "Bachelor's degree in Computer Science or a related field" }],
      salary: "negotiation",
      currency: "USD",
      startingdate: "2024-12-01",
      endtingdate: "2024-12-31"
    }
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility
  } = useFieldArray({
    control,
    name: "responsibilities"
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: "skills"
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement
  } = useFieldArray({
    control,
    name: "requirements"
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const InputGroup = ({ label, register, name, type = "text", options }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {options ? (
        <select
          {...register(name)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );

  const workingTimeOptions = [
    { value: "FULL TIME", label: "Full Time" },
    { value: "PART TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "INTERNSHIP", label: "Internship" }
  ];

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "BDT", label: "BDT - Bangladeshi Taka" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
   
  ];

  const ArrayField = ({ fields, append, remove, name, label }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={() => append({ [name]: "" })}
          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add {label}
        </button>
      
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`${name}.${index}.${name}`)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white to-green-200 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-green-700/30 p-6">
          <h1 className="text-2xl font-bold text-center animate-pulse text-white">
            Create Job Posting
          </h1>
        </div>
  
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 col-span-2">
              <Briefcase className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-800">
                Basic Information
              </h2>
            </div>
            <InputGroup label="Position" register={register} name="position" />
            <InputGroup label="Company Name" register={register} name="companyname" />
            <InputGroup label="Experience" register={register} name="experience" />
            <InputGroup
              label="Working Time"
              register={register}
              name="workingtime"
              options={workingTimeOptions}
            />
            <InputGroup label="Location" register={register} name="location" />
            <div className="grid grid-cols-2 gap-2">
              <InputGroup label="Salary" register={register} name="salary" />
              <InputGroup
                label="Currency"
                register={register}
                name="currency"
                options={currencyOptions}
              />
            </div>
          </div>
  
          {/* Overview */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Overview</label>
            <textarea
              {...register("overview")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
  
          {/* Dynamic Arrays */}
          <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
            <ArrayField
              fields={responsibilityFields}
              append={appendResponsibility}
              remove={removeResponsibility}
              name="responsibilities"
              label="Responsibilities"
            />
  
            <ArrayField
              fields={skillFields}
              append={appendSkill}
              remove={removeSkill}
              name="skills"
              label="Skills"
            />
  
            <ArrayField
              fields={requirementFields}
              append={appendRequirement}
              remove={removeRequirement}
              name="requirements"
              label="Requirements"
            />
          </div>
  
          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 col-span-2">
              <Calendar className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-800">Timeline</h2>
            </div>
            <InputGroup
              label="Starting Date"
              register={register}
              name="startingdate"
              type="datetime-local"
            />
            <InputGroup
              label="Ending Date"
              register={register}
              name="endtingdate"
              type="datetime-local"
            />
          </div>
  
          {/* Image */}
          <div>
            <label htmlFor="image" className="text-gray-700 font-semibold">
              Job Banner Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              {...register("image")}
              className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600/80 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 mt-6"
          >
            <Save className="w-5 h-5" />
            Save Job Posting
          </button>
        </div>
      </div>
    </form>
  </div>
  
  
  );
};

export default JobPostingForm;