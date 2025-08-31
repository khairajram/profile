"use client"

import { ProfileCard } from "./ProfileCard";
import ProjectsSection from "./ProjectCard";
import { EducationCard } from "./EducationCard";
import { useEffect, useState } from "react";
import Header from "./header";
import { Url } from "url";

export type User = {
  id : string,
  name : string,
  email : string,
  about : string
} 

export type Skills = {
  id : string,
  name : string,
  level : string | undefined,
  profileId : string
}

export type Projects = {
  id : string,
  title : string,
  description : string,
  link : string,
  skills : Skills[]
}

export type Links = {
  id : string,
  github : Url,
  linkedin : Url,
  twitter : Url,
  profileId : Url
}

export type Educations = {
  id : string,
  level : string,
  instName : string,
  streame : string,
  year_of_passing : string,
  percentage : string,
  profileId : string
}

export default function PortfolioPage() {
  const [user,setUser] = useState<User>();
  const [projects,setProjects] = useState<Projects[]>([]);
  const [skills,setSkills] = useState<Skills[]>();
  const [education,setEducation] = useState<Educations[]>([]);
  const [links,setlinks] = useState<Links>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("./api/profile");
      const data : any = await res.json();
      
      const user = {
        id : data.id,
        name : data.name,
        email : data.email,
        about : data.about
      }

      setUser(user);
      setProjects(data.projects);
      setSkills(data.skills);
      setEducation(data.educations);
      setlinks(data.links);

    }


    fetchData();
  },[])

  console.log(links)

  return (
    <div className="max-w-screen mx-auto space-y-6 p-6">

      <Header name={user?.name} links={links}></Header>

      <div className="sm:grid grid-cols-2 gap-4 ">

        {user && skills && <ProfileCard
          user={user}        
          skills={skills}
        />}

        
        <div className=" bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 px-6 pt-4">
          <h2 className="text-2xl font-bold">Education</h2>
          {education?.map((e : Educations) => 
            <EducationCard
              key={e.id}
              education={e}
            />
          )}
        </div>
        
      </div>

      <div className=" bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 px-4">
        <ProjectsSection projects={projects} />;
      </div>   
      
    </div>
  );
}
