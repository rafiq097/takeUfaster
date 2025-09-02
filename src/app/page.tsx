"use client"
import { useState, useEffect } from "react";
//import data from "@/data/sde_sheet.json";

export default function Home() {
  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState("79");
  
  useEffect(() => {
    async function fetchData() {
        if(sheet)
        {
            const res = await fetch(`./data/${sheet}_sheet.json`);
            console.log(res);
            setData(res || []);
        }
    }
    
    fetchData();
  }, [sheet]);
  
  return (
  <>
    <div>
        <select onChange={(e) => setSheet(e.target.value)}>
            <option value="79">79</option>
            <option value="sde">SDE</option>
            <option value="a2z">AtoZ</option>
        </select>
    </div>
    <main className="p-6">
      <h1 className="text-center text-red-600 text-3xl font-bold mb-6">{sheet} Sheet</h1>

      <section>
        {data?.map((step, stepIndex) => (
          <article key={step.step_no} className="mb-8 border-b pb-4">
            <h2 className="text-2xl font-semibold italic text-blue-700 mb-2">
              {step.step_no}. {step.head_step_no}
            </h2>

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
                  className="mb-4 p-4 bg-gray-50 rounded-md shadow"
                >
                  <h3 className="text-xl font-medium text-gray-800 mb-2">{topic.title}</h3>

                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>
                      <strong>LC Link:</strong>{" "}
                      <a href={topic.lc_link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                        {topic.lc_link}
                      </a>
                    </li>
                    <li>
                      <strong>GFG Link:</strong>{" "}
                      <a href={topic.gfg_link} className="text-green-600 underline" target="_blank" rel="noopener noreferrer">
                        {topic.gfg_link}
                      </a>
                    </li>
                    <li>
                      <strong>CS Link:</strong>{" "}
                      <a href={topic.cs_link} className="text-purple-600 underline" target="_blank" rel="noopener noreferrer">
                        {topic.cs_link}
                      </a>
                    </li>
                  </ul>

                  {parsedTopics?.length > 0 && (
                    <div className="mt-2">
                      <strong>Topics:</strong>
                      <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                        {parsedTopics.map((t, idx) => (
                          <li key={idx}>{t.label}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </article>
        ))}
      </section>
    </main>
   </>
  );
}

