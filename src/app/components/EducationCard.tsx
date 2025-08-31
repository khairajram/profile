import { GraduationCap } from "lucide-react";
import { Educations } from "./PortfolioPage";
import { toUpperCase, uppercase } from "zod";

export function EducationCard({ education }: { education: Educations }) {
  return (
    <div className="relative pl-6 border-l-4 border-blue-500 bg-white rounded-lg shadow-md p-5 mb-6 hover:shadow-lg transition">
    
      <div className="absolute -left-5 top-5 bg-blue-500 text-white p-2 rounded-full shadow-md">
        <GraduationCap size={18} />
      </div>

      <h4 className="text-xl font-semibold text-gray-900">{education.level}</h4>

      <p className="text-gray-700 font-medium">{ education.instName?.toUpperCase() }</p>

      {education.level === "B.Tech" && (
        <p className="text-gray-600 text-sm mt-1">{education.streame}</p>
      )}

      <div className="flex items-center gap-3 mt-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
          Year: {education.year_of_passing}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
          {education.percentage}
          {education.level === "B.Tech" ? " CGPA" : "%"}
        </span>
      </div>
    </div>
  );
}
