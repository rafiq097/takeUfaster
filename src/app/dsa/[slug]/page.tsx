"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

const Logos = {
  lc: "💻",
  gfg: "🟢",
  cs: "🔵",
  plus: "🐧",
};

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
        const res = await fetch(`/data/${sheet}_sheet.json`);
        const temp = await res.json();
        setData(temp || []);
      }
    }
    fetchData();
  }, [sheet]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {sheet?.toUpperCase()} Sheet
          </h1>
          <p className="text-blue-300 text-lg">
            Master Data Structures & Algorithms
          </p>
        </div>

        {/* Sheet Content */}
        <div className="space-y-6">
          {data?.map((step, stepIndex) => (
            <div
              key={step.step_no}
              className="bg-black rounded-xl shadow-md border border-blue-900 overflow-hidden"
            >
              {/* Step Header */}
              <div
                className="p-5 bg-black cursor-pointer hover:bg-blue-950 transition-colors"
                onClick={() => toggle(step.step_no)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    <span className="text-blue-500">{step.step_no}.</span>{" "}
                    {sheet === "a2z" ? step.step_title : step.head_step_no}
                  </h2>
                  {open[step.step_no] ? (
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                  )}
                </div>
              </div>

              {/* Step Content */}
              {open[step.step_no] && (
                <div className="p-5">
                  {sheet !== "a2z" ? (
                    // Regular sheet format
                    <div className="overflow-hidden rounded-lg">
                      {/* Table Header */}
                      <div className="grid grid-cols-6 gap-4 p-3 text-sm font-semibold border-b border-blue-900">
                        <div>Name</div>
                        <div>Article</div>
                        <div>GFG</div>
                        <div>CN</div>
                        <div>LC</div>
                        <div>Topics</div>
                      </div>
                      {/* Table Rows */}
                      <div>
                        {step?.topics?.map((topic, topicIndex) => {
                          let parsedTopics = [];
                          try {
                            parsedTopics = JSON.parse(topic.ques_topic);
                          } catch (error) {
                            console.error("Error parsing ques_topic:", error);
                          }

                          return (
                            <div
                              key={`${step.step_no}-${topicIndex}`}
                              className="grid grid-cols-6 gap-4 p-3 text-sm hover:bg-blue-950 transition-colors"
                            >
                              {/* Problem Name */}
                              <div className="font-medium">{topic.title}</div>

                              {/* Article */}
                              <div>
                                {topic.post_link ? (
                                  <a
                                    href={topic.post_link}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    📄
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              {/* GFG */}
                              <div>
                                {topic.gfg_link ? (
                                  <a
                                    href={topic.gfg_link}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {Logos.gfg}
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              {/* CN */}
                              <div>
                                {topic.cs_link ? (
                                  <a
                                    href={topic.cs_link}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {Logos.cs}
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              {/* LeetCode (normal + plus) */}
                              <div className="space-x-2">
                                {topic.lc_link ? (
                                  <>
                                    <a
                                      href={topic.lc_link}
                                      className="hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {Logos.lc}
                                    </a>

                                    <a
                                      href={topic.lc_link.replace(
                                        "leetcode.com",
                                        "leefcode.vercel.app"
                                      )}
                                      className="hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {Logos.plus}
                                    </a>
                                  </>
                                ) : (
                                  "-"
                                )}
                              </div>

                              {/* Topics */}
                              <div className="flex flex-wrap gap-1">
                                {parsedTopics?.length > 0
                                  ? parsedTopics.map((t, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-0.5 bg-blue-950 rounded text-xs border border-blue-900"
                                      >
                                        {t.label}
                                      </span>
                                    ))
                                  : "-"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {step?.sub_steps?.map((subStep, subStepIndex) => (
                        <div
                          key={`${step.step_no}-${subStepIndex}`}
                          className="rounded-lg border border-blue-900 overflow-hidden"
                        >
                          <div
                            className="p-4 bg-black cursor-pointer hover:bg-blue-950 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(`${step.step_no}-${subStepIndex}`);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                {step.step_no}.{subStep.sub_step_no} -{" "}
                                {subStep.sub_step_title}
                              </h3>
                              {open[`${step.step_no}-${subStepIndex}`] ? (
                                <ChevronDown className="w-5 h-5 text-blue-400" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-blue-400" />
                              )}
                            </div>
                          </div>

                          {/* Sub Step Content */}
                          {open[`${step.step_no}-${subStepIndex}`] && (
                            <div className="p-4">
                              <div className="rounded-lg overflow-hidden">
                                {/* Header */}
                                <div className="grid grid-cols-6 gap-4 p-3 text-sm font-semibold border-b border-blue-900">
                                  <div>Name</div>
                                  <div>Article</div>
                                  <div>GFG</div>
                                  <div>CN</div>
                                  <div>LC</div>
                                  <div>Topics</div>
                                </div>

                                {/* Rows */}
                                <div>
                                  {subStep?.topics?.map((item, itemIndex) => {
                                    let parsedTopics = [];
                                    try {
                                      parsedTopics = JSON.parse(
                                        item.ques_topic
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error parsing ques_topic:",
                                        error
                                      );
                                    }

                                    return (
                                      <div
                                        key={`${step.step_no}-${itemIndex}`}
                                        className="grid grid-cols-6 gap-4 p-3 text-sm hover:bg-blue-950 transition-colors"
                                      >
                                        <div className="font-medium">
                                          {item.question_title}
                                        </div>
                                        <div>
                                          {item.post_link ? (
                                            <a
                                              href={item.post_link}
                                              className="hover:underline"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              📄
                                            </a>
                                          ) : (
                                            "-"
                                          )}
                                        </div>
                                        <div>
                                          {item.gfg_link ? (
                                            <a
                                              href={item.gfg_link}
                                              className="hover:underline"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {Logos.gfg}
                                            </a>
                                          ) : (
                                            "-"
                                          )}
                                        </div>
                                        <div>
                                          {item.cs_link ? (
                                            <a
                                              href={item.cs_link}
                                              className="hover:underline"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {Logos.cs}
                                            </a>
                                          ) : (
                                            "-"
                                          )}
                                        </div>
                                        <div className="space-x-2">
                                          {item.lc_link ? (
                                            <>
                                              <a
                                                href={item.lc_link}
                                                className="hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {Logos.lc}
                                              </a>
                                              <a
                                                href={item.lc_link.replace(
                                                  "leetcode.com",
                                                  "leefcode.vercel.app"
                                                )}
                                                className="hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {Logos.plus}
                                              </a>
                                            </>
                                          ) : (
                                            "-"
                                          )}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {parsedTopics?.length > 0
                                            ? parsedTopics.map((t, idx) => (
                                                <span
                                                  key={idx}
                                                  className="px-2 py-0.5 bg-blue-950 rounded text-xs border border-blue-900"
                                                >
                                                  {t.label}
                                                </span>
                                              ))
                                            : "-"}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300">
          <p>Keep coding, keep growing! 🚀</p>
        </div>
      </div>
    </div>
  );
}
