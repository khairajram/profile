"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Search } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Links, Projects } from "./PortfolioPage";

export default function Header({ name, links }: { name: string | undefined; links: Links | undefined }) {
  const [query, setQuery] = useState("");
  const [project, setProject] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const linkItems = [
    { key: "github", url: links?.github ?? "/", icon: <Github className="w-4 h-4" />, label: "GitHub" },
    { key: "linkedin", url: links?.linkedin ?? "/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
    { key: "twitter", url: links?.twitter ?? "/", icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
  ];

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/query/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProject(data);
      setShowResults(true);
      setQuery("");
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md w-screen z-50 left-0 top-0  fixed">
      {/* LEFT: Avatar */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full ring-2 ring-blue-600 shadow-lg overflow-hidden">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              name || "Guest"
            )}&background=2563eb&color=fff&size=128`}
            alt={name || "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-semibold text-gray-700">{name || "Guest"}</span>
      </div>


      <div ref={searchRef} className="relative flex-1 max-w-lg mx-6">
        <div className=" items-center gap-1.5 hidden sm:flex">
          <input
            type="text"
            placeholder="Search projects, skills, education..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button
            className="rounded-full px-5 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        
        {showResults && (
          <div className="absolute top-full mt-3 w-full bg-white shadow-lg rounded-2xl border border-gray-200 overflow-y-auto z-10">
            {loading && <p className="p-4 text-gray-500 text-center">Searching...</p>}
            {!loading && project && project.length === 0 && (
              <p className="p-4 text-gray-500 text-center">No results found</p>
            )}
            {!loading && project.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {project.map((item: Projects) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium text-gray-900">{item.title}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>


      <div>
        <div className="flex gap-3 mr-2">
          {linkItems
            .filter((item) => item.url) 
            .map((item) => (
              <Button
                key={item.key}
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                  <p className="md:block hidden">{item.label}</p>
                </Link>
              </Button>
            ))}
        </div>
      </div>
    </header>
  );
}
