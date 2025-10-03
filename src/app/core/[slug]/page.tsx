"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const { slug } = params;

  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState(slug);
  const [open, setOpen] = useState({});

  const toggle = (id) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    async function fetchData() {
      if (sheet) {
        const res = await fetch(`/data/${sheet}_core.json`);
        const temp = await res.json();
        console.log(temp);
        setData(temp || []);
      }
    }
    fetchData();
  }, [sheet]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-10 text-blue-400">
          {sheet?.toUpperCase()} Sheet
        </h1>

        <section className="space-y-6">
          {data?.map((step, stepIndex) => (
            <article
              key={step.step_no}
              className="rounded-xl border border-blue-900 bg-black shadow-md overflow-hidden"
            >
              {/* Step Header */}
              <div
                onClick={() => toggle(step.step_no)}
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-blue-950 transition-colors"
              >
                <h2 className="text-2xl font-semibold">
                  <span className="text-blue-500">{step.step_no}.</span>{" "}
                  {step.topic}
                </h2>
                {open[step.step_no] ? (
                  <ChevronDown className="w-6 h-6 text-blue-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                )}
              </div>

              {/* Step Content */}
              {open[step.step_no] && (
                <div className="p-5 space-y-4 bg-black">
                  {step?.data?.map((topic, topicIndex) => (
                    <div
                      key={`${step.step_no}-${topicIndex}`}
                      className="rounded-lg border border-blue-900 bg-gray-900 p-4 transition-colors"
                    >
                      {/* Topic Header */}
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(`${step.step_no}-${topicIndex}`);
                        }}
                      >
                        <h3 className="text-lg font-medium">
                          {step.step_no}.{topic.sl_no_in_step} – {topic.title}
                        </h3>
                        {open[`${step.step_no}-${topicIndex}`] ? (
                          <ChevronDown className="w-5 h-5 text-blue-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-blue-400" />
                        )}
                      </div>

                      {/* Topic Content */}
                      {open[`${step.step_no}-${topicIndex}`] && (
                        <div
                          className="mt-3 prose prose-invert max-w-none text-gray-300"
                          dangerouslySetInnerHTML={{ __html: topic.content }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300">
          <p>Keep coding, keep growing! 🚀</p>
        </div>
      </div>
    </div>
  );
}
