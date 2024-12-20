import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import "pdfjs-dist/build/pdf.worker.entry";
import { useForm } from "react-hook-form";
import Select from "react-select";

const UploadCV = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        const countryOptions = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountry(countryOptions);
      })
      .catch((errors) => {
        if (errors) {
          // return <ErrorPage message={errors?.message} />;
        }
      });
  }, []);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedData, setParsedData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      website: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      tools: [],
    },
    projects: [],
    certifications: [],
    languages: [],
  });

  // Helper functions for parsing
  const extractMatch = (text, regex) => {
    if (!text || !regex) return "";
    const match = text.match(regex);
    return match && match[1] ? match[1].trim() : "";
  };

  const extractSection = (text, headers) => {
    if (!text || !headers.length === 0) return "";
    const headersPattern = headers.join("|");
    const sectionRegex = new RegExp(
      `(?:${headersPattern})\\s*(?::|\\n)([\\s\\S]*?)(?=\\n(?:education|experience|skills|projects|certifications|languages)\\s*(?::|\\n)|$)`,
      "i"
    );
    const match = text.match(sectionRegex);
    return match ? match[1].trim() : "";
  };

  const extractPersonalInfo = (text) => {
    return {
      name:
        extractMatch(text, /(?:name|full name)\s*:?\s*([^\n]+)/i) ||
        text.split("\n")[0],
      email: extractMatch(
        text,
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i
      ),
      phone:
        extractMatch(
          text,
          /(?:phone|mobile|tel|contact)\s*:?\s*([+\d\s()-]{8,})/i
        ) || extractMatch(text, /(\+?[\d\s()-]{8,})/),
      address: extractMatch(
        text,
        /(?:address|location|residing at)\s*:?\s*([^\n]+)/i
      ),
      linkedin: extractMatch(text, /(?:linkedin\.com\/[^\s]+)/i),
      github: extractMatch(text, /(?:github\.com\/[^\s]+)/i),
      website: extractMatch(text, /(?:https?:\/\/[^\s]+)/i),
    };
  };

  const extractSkills = (text) => {
    const skillsSection = extractSection(text, [
      "skills",
      "technical skills",
      "competencies",
    ]);
    const sections = {
      technical: [],
      soft: [],
      languages: [],
      tools: [],
    };

    if (skillsSection) {
      // Split by common list indicators and filter empty items
      const skillsList = skillsSection
        .split(/[•\-\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);

      // Categorize skills (basic categorization - can be enhanced)
      skillsList.forEach((skill) => {
        if (
          skill.toLowerCase().includes("programming") ||
          /^(java|python|javascript|html|css|sql|react|node)/i.test(skill)
        ) {
          sections.technical.push(skill);
        } else if (
          ["git", "docker", "aws", "kubernetes"].some((tool) =>
            skill.toLowerCase().includes(tool)
          )
        ) {
          sections.tools.push(skill);
        } else if (
          ["communication", "leadership", "teamwork", "management"].some(
            (soft) => skill.toLowerCase().includes(soft)
          )
        ) {
          sections.soft.push(skill);
        } else {
          sections.technical.push(skill);
        }
      });
    }

    return sections;
  };

  const extractExperience = (text) => {
    const experienceSection = extractSection(text, [
      "experience",
      "work experience",
      "employment history",
    ]);
    if (!experienceSection) return [];

    return experienceSection
      .split(/\n(?=[A-Z][a-zA-Z\s]+:)/)
      .map((exp) => {
        const company = extractMatch(exp, /^([^:]+):/);
        const period = extractMatch(exp, /(\d{4}\s*-\s*(?:\d{4}|present))/i);
        const role = extractMatch(
          exp,
          /(?:title|position|role)\s*:?\s*([^\n]+)/i
        );

        return {
          company: company || "",
          period: period || "",
          role: role || "",
          description: exp.replace(/^[^:]+:/, "").trim(),
        };
      })
      .filter((exp) => exp.company || exp.description);
  };

  const parseCV = (text) => {
    const parsed = {
      personalInfo: extractPersonalInfo(text),
      skills: extractSkills(text),
      experience: extractExperience(text),
      education: extractSection(text, ["education", "academic background"])
        .split("\n")
        .map((edu) => edu.trim())
        .filter(Boolean),
      projects: extractSection(text, ["projects", "project work"])
        .split("\n")
        .map((proj) => proj.trim())
        .filter(Boolean),
      certifications: extractSection(text, ["certifications", "certificates"])
        .split("\n")
        .map((cert) => cert.trim())
        .filter(Boolean),
      languages: extractSection(text, ["languages", "language proficiency"])
        .split(/[,\n]/)
        .map((lang) => lang.trim())
        .filter(Boolean),
    };

    setParsedData(parsed);
    return parsed;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);
    setText("");
    setProgress(0);

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 2 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          const image = canvas.toDataURL("image/png");
          // starting Image Analysis AI .....

          // console.log(image);

          const {
            data: { text: pageText },
          } = await Tesseract.recognize(image, "eng", {
            logger: (info) => {
              if (info.status === "recognizing text") {
                setProgress(
                  (pageNum - 1 + info.progress) * (100 / pdf.numPages)
                );
              }
            },
          });
          extractedText += pageText + "\n";
        }

        setText(extractedText);
        parseCV(extractedText);
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Failed to process the file. Please try again.");
      } finally {
        setLoading(false);
        setProgress(0);
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(parsedData);

  return (
    <>
      <br />
      <br />

      

     
            <div
  className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-50 to-gray-800 p-8"
  style={{
    backgroundImage: "url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="w-full max-w-4xl bg-white/30 shadow-md rounded-lg p-10">
    <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
      Submit Your Profile
    </h1>
    <form className="rounded-xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format",
            },
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="country">
          Country
        </label>
        <Select
          id="country"
          options={country}
          onChange={(selected) => setValue("country", selected.value)}
          className="text-black focus:outline-none"
          placeholder="Select or search country"
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* GitHub Profile */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="github">
          GitHub Profile
        </label>
        <input
          id="github"
          type="url"
          {...register("github", {
            required: "GitHub URL is required",
            pattern: {
              value: /^(https:\/\/github\.com\/[\w-]+)$/i,
              message: "Invalid GitHub URL",
            },
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.github && (
          <p className="text-red-500 text-sm mt-1">{errors.github.message}</p>
        )}
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="linkdin">
          LinkedIn Profile
        </label>
        <input
          id="linkdin"
          type="url"
          {...register("linkdin", {
            required: "LinkedIn URL is required",
            pattern: {
              value: /^(https:\/\/www\.linkedin\.com\/in\/[\w-]+)$/i,
              message: "Invalid LinkedIn URL",
            },
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.linkdin && (
          <p className="text-red-500 text-sm mt-1">{errors.linkdin.message}</p>
        )}
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="portfolio">
          Portfolio URL
        </label>
        <input
          id="portfolio"
          type="url"
          {...register("portfolio", {
            required: "Portfolio URL is required",
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.portfolio && (
          <p className="text-red-500 text-sm mt-1">
            {errors.portfolio.message}
          </p>
        )}
      </div>

      <h1 className="text-2xl font-bold text-blue-700 font-serif text-center mb-6">
              CV Parser
            </h1>
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="block w-full text-sm text-black file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />

              {loading && (
                <div className="w-full mt-6">
                  <p className="text-sm text-gray-700 text-center mb-2">
                    Processing PDF... Please wait.
                  </p>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute h-2 bg-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {parsedData.personalInfo.name && (
                <div className="w-full mt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Personal Information
                      </h2>
                      <div className="space-y-2">
                        {Object.entries(parsedData.personalInfo).map(
                          ([key, value]) =>
                            value && (
                              <p key={key} className="text-sm">
                                <span className="font-medium capitalize">
                                  {key}:
                                </span>{" "}
                                {value}
                              </p>
                            )
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Skills
                      </h2>
                      {Object.entries(parsedData.skills).map(
                        ([category, skills]) =>
                          skills.length > 0 && (
                            <div key={category} className="mb-3">
                              <h3 className="text-sm font-medium capitalize mb-1">
                                {category}:
                              </h3>
                              <p className="text-sm text-gray-600">
                                {skills.join(", ")}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {parsedData.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-blue-500 pl-4"
                        >
                          <p className="font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.role}</p>
                          <p className="text-sm text-gray-500">{exp.period}</p>
                          <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {parsedData.education.map((edu, index) => (
                        <p key={index} className="text-sm">
                          {edu}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {parsedData.projects.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                          Projects
                        </h2>
                        <div className="space-y-2">
                          {parsedData.projects.map((project, index) => (
                            <p key={index} className="text-sm">
                              {project}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {parsedData.certifications.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                          Certifications
                        </h2>
                        <div className="space-y-2">
                          {parsedData.certifications.map((cert, index) => (
                            <p key={index} className="text-sm">
                              {cert}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {text && (
                <div className="w-full mt-8 bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Raw Extracted Text:
                  </h2>
                  <div className="overflow-y-auto max-h-96 p-4 bg-gray-100 border border-gray-300 rounded-md text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap">{text}</pre>
                  </div>
                </div>
              )}
            </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-200/30 text-black font-semibold rounded-md hover:bg-teal-700 transition-shadow shadow-lg"
        >
          Submit Profile
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default UploadCV;
