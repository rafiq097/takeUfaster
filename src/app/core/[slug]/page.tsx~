"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const { slug } = params;
   
  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState(slug);
  const [open, setOpen] = useState([]);

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
    <>
      <div>
        <select onChange={(e) => setSheet(e.target.value)}>
          <option value="os">OS</option>
          <option value="dbms">DBMS</option>
          <option value="cn">CN</option>
        </select>
      </div>
      <main className="p-6">
        <h1 className="text-center text-red-600 text-3xl font-bold mb-6">
          {sheet.toUpperCase()} Sheet
        </h1>

        <section>
          {console.log(data)}
          {data?.map((step, stepIndex) => (
            <article key={step.step_no} className="mb-8 border-b pb-4">
              <h2 className="text-2xl font-semibold italic text-blue-700 mb-2">
                {step.step_no}. {step.topic}
              </h2>

              {step?.data?.map((topic, topicIndex) => {
                return (
                  <div
                    key={`${step.step_no}-${topicIndex}`}
                    className="mb-4 p-4 bg-gray-50 rounded-md shadow"
                  >
                    <h3 className="text-xl font-medium text-gray-800 mb-2">
                      {step.step_no}.{topic.sl_no_in_step} -- {topic.title}
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: topic.content }}
                    ></div>
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
