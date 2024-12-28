import React from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  GraduationCap,
  Code,
  FileText,
  Users,
  ArrowRight,
} from "lucide-react";

const MyAllRecruitmentPost = () => {
  const jobPostings = [
    {
      companyapplyId: "675fac5e3ce4bc2248d47ed7",
      position: "Softwere Engineers",
      companyname: "Tech Solutions Ltd.",
      experience: "3+ years of experience in software development",
      workingtime: "FULL TIME",
      location: "Dhaka, Bangladesh",
      overview:
        "We are looking for a skilled software engineer to join our growing team.",
      responsibilities: [
        {
          responsibilities: "Develop and maintain web applications",
        },
        {
          responsibilities:
            "Collaborate with cross-functional teams to define, design, and ship new features",
        },
      ],
      skills: [
        {
          skills: "JavaScript",
        },
        {
          skills: "Node.js",
        },
        {
          skills: "React.js",
        },
      ],
      requirements: [
        {
          requirements:
            "Bachelor's degree in Computer Science or a related field",
        },
        {
          requirements: "Strong problem-solving and communication skills",
        },
      ],
      salary: "negotiation",
      currency: "USD",
      startingdate: "2024-12-01",
      endtingdate: "2024-12-31",
      image:
        "https://contentstatic.timesjobs.com/photo/76432558/trending/tech-mahindra-wipro-and-other-multinationals-hiring-software-engineers.jpg",
    },
    {
      companyapplyId: "675fac5e3ce4bc2248d47ed7",
      position: "Full Stack Web Developer",
      companyname: "Tech Solutions Ltd.",
      experience: "3+ years of experience in software development",
      workingtime: "FULL TIME",
      location: "Dhaka, Bangladesh",
      overview:
        "We are looking for a skilled software engineer to join our growing team.",
      responsibilities: [
        {
          responsibilities: "Develop and maintain web applications",
        },
        {
          responsibilities:
            "Collaborate with cross-functional teams to define, design, and ship new features",
        },
      ],
      skills: [
        {
          skills: "JavaScript",
        },
        {
          skills: "Node.js",
        },
        {
          skills: "React.js",
        },
      ],
      requirements: [
        {
          requirements:
            "Bachelor's degree in Computer Science or a related field",
        },
        {
          requirements: "Strong problem-solving and communication skills",
        },
      ],
      salary: "negotiation",
      currency: "USD",
      startingdate: "2024-12-01",
      endtingdate: "2024-12-31",
      image:
        "https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/how-much-a-software-engineer-earn.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {jobPostings.map((job, index) => (
          <div
            key={job.companyapplyId + index}
            className="bg-gradient-to-br from-white to-green-200 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Title Section */}
            <div className="space-y-1 p-6 border-b">
              <h1 className="text-2xl font-bold text-center">{job.position}</h1>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Image Section */}
            <div className="p-6 border-b bg-gradient-to-b from-blue-50 to-white rounded-md shadow-md">
              <div className="relative overflow-hidden rounded-md">
                <img
                  className="w-full h-52 object-cover"
                  src={job.image}
                  alt="Job Posting"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md"></div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Job Details */}
            <div className="p-6 space-y-6">
              {/* Header Section */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                  <Briefcase className="text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-900">
                    {job.position}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>{job.companyname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{job.workingtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span>
                      Salary: {job.salary} ({job.currency})
                    </span>
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Overview
                </h3>
                <p className="text-gray-600 pl-6">{job.overview}</p>
              </div>

              {/* Responsibilities Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="text-blue-600" />
                  Responsibilities
                </h3>
                <ul className="list-disc pl-10 text-gray-600 space-y-1">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp.responsibilities}</li>
                  ))}
                </ul>
              </div>

              {/* Required Skills Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Code className="text-blue-600" />
                  Required Skills
                </h3>
                <div className="pl-6 flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill.skills}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="text-blue-600" />
                  Requirements
                </h3>
                <ul className="list-disc pl-10 text-gray-600 space-y-1">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req.requirements}</li>
                  ))}
                </ul>
              </div>

              {/* Application Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-600" />
                  <span className="font-medium">Application Timeline:</span>
                  <span className="text-gray-600">
                    {job.startingdate} - {job.endtingdate}
                  </span>
                </div>
              </div>

              {/* Apply Now Button */}
              <button className="w-full py-3 btn-sm  bg-gradient-to-br from-yellow-300 to-blue-700 text-white font-semibold text-lg rounded-sm shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllRecruitmentPost;
