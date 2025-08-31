/* eslint-disable @next/next/no-img-element */

import { Mail } from "lucide-react";
import { Skills, User } from "./PortfolioPage";
import { SkillTag } from "./SkillTag";

export function ProfileCard({ user,skills }: { user : User,skills : Skills[] }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
     
      <div className="h-28 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name ?? "User"
              )}&background=2563eb&color=fff&size=128`}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pt-16 pb-6">
        
        <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
        <div className="flex items-center text-gray-600 mt-1">
          <FileText size={18} className="mr-2 text-blue-500" />
          <Link href="/Khairaj Student CV Resume.pdf" target="_blank">
            <span className="text-blue-700 underline">
              Resume
            </span> 
            </Link>
        </div>
        
        <div className="flex items-center text-gray-600 mt-1">
          <Mail size={18} className="mr-2 text-blue-500" />
          <span>{user?.email}</span>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">{user?.about}</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills?.map((s: Skills) => (
              <SkillTag key={s.id} name={s.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
