"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Code2, 
  ChevronRight,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Users,
  Star
} from "lucide-react";

export default function DSAPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sheets = [
    {
      id: "79",
      name: "Striver's 79 Sheet",
      description: "Essential coding problems handpicked by Striver for quick interview preparation",
      problems: 79,
      difficulty: "Intermediate to Advanced",
      timeToComplete: "2-3 weeks",
      bestFor: "Quick interview prep, coding experts",
      topics: ["Arrays", "Strings", "Linked Lists", "Trees", "Dynamic Programming", "Graphs"],
      features: [
        "Curated Sheet for revision",
        "Perfect for revising DSA",
        "Most frequently asked interview questions",
      ],
      color: "blue",
      popularity: "Most Popular"
    },
    {
      id: "sde",
      name: "SDE Sheet",
      description: "Comprehensive problem set covering all major topics for Software Development Engineer interviews",
      problems: 191,
      difficulty: "Intermediate to Advanced", 
      timeToComplete: "8-10 weeks",
      bestFor: "SDE interviews, experienced developers",
      topics: ["Arrays", "Binary Search", "Heaps", "Recursion", "Backtracking", "Tries", "Graphs", "Dynamic Programming"],
      features: [
        "Complete coverage of SDE interview topics",
        "Medium to hard difficulty problems",
        "Advanced algorithmic concepts"
      ],
      color: "blue",
      popularity: "Interview Focused"
    },
    {
      id: "a2z",
      name: "A to Z DSA",
      description: "Complete DSA roadmap from absolute basics to advanced topics with systematic learning approach",
      problems: 450,
      difficulty: "Beginner to Expert",
      timeToComplete: "12-14 weeks",
      bestFor: "Complete mastery, coding beginners",
      topics: ["Sorting", "Binary Search", "Strings", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Tries", "Advanced Topics"],
      features: [
        "Systematic learning from A to Z",
        "450+ problems with solutions",
        "Complete theoretical foundation",
      ],
      color: "blue",
      popularity: "Most Comprehensive"
    }
  ];

  const handleSheetClick = (sheetId) => {
    router.push(`/dsa/${sheetId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-400">takeUfaster</h1>
                <p className="text-gray-400 text-sm">DSA Problem Sheets</p>
              </div>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={`container mx-auto px-6 py-12 text-center transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          DSA Problem
          <span className="block text-blue-400">Sheets</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Choose your learning path with our curated problem sheets designed for different skill levels and goals
        </p>
      </section>

      {/* Sheets Grid */}
      <section className={`container mx-auto px-6 py-16 transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className="relative p-8 border border-gray-800 rounded-2xl hover:border-blue-600 transition-all duration-300 cursor-pointer group transform hover:scale-105 bg-gray-900/50"
              onClick={() => handleSheetClick(sheet.id)}
            >
              {/* Popularity Badge */}
              <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                {sheet.popularity}
              </div>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {sheet.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {sheet.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-black/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{sheet.problems}</div>
                  <div className="text-gray-400 text-xs">Problems</div>
                </div>
                <div className="text-center p-3 bg-black/50 rounded-lg">
                  <div className="text-sm font-semibold text-white">{sheet.timeToComplete}</div>
                  <div className="text-gray-400 text-xs">Duration</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">Best For:</span>
                  </div>
                  <p className="text-sm text-gray-400 pl-6">{sheet.bestFor}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">Difficulty:</span>
                  </div>
                  <p className="text-sm text-gray-400 pl-6">{sheet.difficulty}</p>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Key Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {sheet.topics.slice(0, 4).map((topic, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                  {sheet.topics.length > 4 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                      +{sheet.topics.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Features:</h4>
                <ul className="space-y-2">
                  {sheet.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleSheetClick(sheet.id)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25"
              >
                <span>Start Solving</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className={`container mx-auto px-6 py-16 transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Why Choose Our DSA Sheets?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-blue-600/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Curated by Experts</h3>
              <p className="text-gray-400 text-sm">Problems selected by industry professionals and competitive programmers</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-600/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Interview Focused</h3>
              <p className="text-gray-400 text-sm">Questions frequently asked in top tech company interviews</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-600/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Structured Learning</h3>
              <p className="text-gray-400 text-sm">Progressive difficulty levels for systematic skill development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center border-t border-gray-800 mt-16">
        <div className="text-gray-400">
          Ready to accelerate your coding journey? Choose a sheet and start solving!
        </div>
      </footer>
    </div>
  );
}
