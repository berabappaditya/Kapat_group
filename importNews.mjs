/**
 * importNews.mjs
 * ──────────────────────────────────────────────────────────────
 * Upserts ALL newsGroup documents into Sanity (createOrReplace).
 * Existing documents with the same _id are fully replaced so
 * you can safely re-run this script whenever the news changes.
 *
 * Usage:
 *   1. Set your token: edit the `token` field below, or set the
 *      environment variable SANITY_TOKEN before running.
 *   2. node importNews.mjs
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN || "skFBnJEbruO0XllGO2TIfAIN3esDyS8rOh1bhdAsSeIYtjyxsWSWtL8NOZPywoVEvbopdtdhonrTxYL02WSCbKUmZpIpYv5I562Ag37EBYqWOn3NhgjlXIweyFZgCuLUDgbQWzfZY5lySjoNGxxXGYHryARLI3xyErESAQStFyjNeCj54yp6";

const client = createClient({
  projectId: "vtabhoqf",
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false,
  token,
});

// All 13 semester groups, newest → oldest (order 0 = newest).
const newsGroups = [
  {
    _id: "newsGroup-spring-semester-2026",
    _type: "newsGroup",
    category: "Spring Semester 2026",
    order: 0,
    items: [
      "Asrar, Ajay, Lokesh, Prashant, Naga & Saumya presented a poster at MAGSuC-2026 held at Shiv Nadar Institution of Eminence, Delhi-NCR.",
      "Naga received the Best Poster Award at MAGSuC-2026. Many congratulations!",
      "Ajay, Lokesh & Naga presented a poster at the International Conference on Electron Spin Resonance, held at the Indian Institute of Science, Bengaluru, India, from 21st–24th March 2026. Naga received the Best Poster Award sponsored by Bruker. Many congratulations!",
      "Lokesh presented a poster at the International Symposium on Organic Free Radicals, held at University of Bologna, Italy, from 7th–10th June 2026.",
      "Asrar & Ajay presented a poster at IP3 (SNIoE), Greater Noida, 23–25th February 2026.",
      "Asrar defended his doctoral thesis on 19th March 2026. Many congratulations on this milestone!",
      "Asrar received his doctoral degree on 23rd May in the Convocation 2026.",
      "Shreya gave an excellent presentation and successfully defended her thesis work. Many congratulations!",
      "Shreya received her degree in the Convocation 2026.",
      "Tiya is going to start her summer internship at the Leibniz-Institute for Catalysis in Germany. Best wishes!",
      "Shreya is going to start her doctoral thesis work at the California Institute of Technology, USA, in the Fall Semester 2026. Best wishes!",
      "Tiya received the Student of the Year award from Shiv Nadar Institution of Eminence.",
      "Shreya is the recipient of the University Gold Medal for being batch-topper. Many congratulations!",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2025",
    _type: "newsGroup",
    category: "Monsoon Semester 2025",
    order: 1,
    items: [
      "Asrar presented a poster at the 25th Tetrahedron Symposium, held from July 1–4, 2025, in Belgium.",
      "Asrar presented a poster at JNOST (IIT-ISM), Dhanbad, 29th Oct–1st November 2025, India, and won the Best Poster Presentation Award and cash prize.",
      "Shreya joined the group to pursue her final-year thesis work. Best wishes!",
      "Tiya is the recipient of the Dean's List Award in Monsoon 2025. Many congratulations!",
      "The evaluation committee has awarded Tiya's OUR project an excellent grade.",
      "The evaluation committee has awarded Shreya's OUR project an excellent grade.",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2025",
    _type: "newsGroup",
    category: "Spring Semester 2025",
    order: 2,
    items: [
      "Lokesh, Naga & Ajay participated in a two-day hands-on training workshop on Nuclear Magnetic Resonance (NMR) & Electron Paramagnetic Resonance (EPR) Spectroscopy from 14th–15th May 2025, organised by the University Science Instrumentation Centre (USIC), University of Delhi.",
      "Naga Malleswara Rao successfully completed his candidacy and comprehensive examination in May 2025.",
      "Mansi and Manya gave excellent presentations and successfully defended their thesis work.",
      "Mansi and Manya received their B.Sc (Research) degree in the Convocation 2025.",
      "Mansi is going to join the University of KU Leuven to pursue her postgraduate studies. Many congratulations!",
      "Shreya is the recipient of the Dean's List Award in Spring 2025. Many congratulations!",
      "Shreya is the recipient of the Summer Undergraduate Research Fellowship (SURF) from the California Institute of Technology, USA.",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2024",
    _type: "newsGroup",
    category: "Monsoon Semester 2024",
    order: 3,
    items: [
      "Asrar presented a poster at the Modern Aspects of Green and Sustainable Organic Synthesis (MAGSOS) Conference from 26th–29th November 2024, organised by the Department of Chemistry, Shiv Nadar Institution of Eminence, Delhi-NCR.",
      "Lokesh, Ajay & Prashant attended the Modern Aspects of Green and Sustainable Organic Synthesis (MAGSOS) conference from 26th–29th November 2024.",
      "Asrar presented a poster at the International Conference on Renewable Energy and Sustainable Technology (ICREST), Jamia Millia Islamia, 4th–6th July 2024, India.",
      "Asrar presented a poster at the 30th International Conference on Organometallic Chemistry, JP Palace, Agra, 14th–18th July 2024.",
      "The evaluation committee has awarded Mansi's OUR project a very good grade.",
      "The evaluation committee has awarded Manya's OUR project a very good grade.",
      "Mansi and Manya joined the group to pursue final-year B.Sc (Research) thesis work.",
      "Shreya is the recipient of the Dean's List Award in Monsoon 2024. Many congratulations!",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2024",
    _type: "newsGroup",
    category: "Spring Semester 2024",
    order: 4,
    items: [
      "Lokesh, Ajay & Prashant successfully completed their candidacy and comprehensive examinations in June 2024.",
      "Lokesh successfully completed his CSIR-UGC JRF to SRF upgradation in June 2024.",
      "Asrar delivered an oral presentation at the International Conference on Chemical & Biological Sciences, 2024, Delhi University, Delhi, 27th–29th January 2024.",
      "Asrar received the Best Oral Presentation Award and a cash prize at the International Conference on Chemical & Biological Sciences, 2024, Delhi University.",
      "Asrar delivered a flash presentation at Advanced Functional Materials for Sustainable Applications, 2024, Shiv Nadar Institution of Eminence, 9th–10th February 2024, India.",
      "Asrar participated in hands-on training in Density Functional Theory Computation of Molecules using Gaussian (DFT-G), 30th April to 6th May 2024.",
      "Indu gave an excellent presentation and successfully defended her thesis work. Many congratulations!",
      "Indu received her B.Sc (Research) degree in the Convocation 2024.",
      "Shreya and Tiya joined the group as OUR students.",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2023",
    _type: "newsGroup",
    category: "Monsoon Semester 2023",
    order: 5,
    items: [
      "Mr. Naga Malleswara Rao Vampugani joined the group as a PhD student in Monsoon 2023. Welcome to the group, and good luck with your thesis work!",
      "Asrar Ahmad was promoted from SNIoE JRF to SRF.",
      "Asrar presented a poster at the Indo-French Seminar on Catalysis for Sustainability, IISER Trivandrum, Kerala, 10th–13th December 2023.",
      "Asrar presented a poster at the 60th Annual Convention of Chemists, 2023, Indian Institute of Technology, Delhi, 20th–21st December 2023.",
      "Garvisha joined as a PhD student at the University of Illinois Chicago.",
      "Mansi and Manya joined as OUR students in the group. Best wishes!",
      "Indu joined the group to pursue final-year thesis work.",
      "Saumya joined the group to pursue her M.Sc. thesis work.",
      "Indu is the recipient of the Dean's List Award in Monsoon 2023. Many congratulations!",
      "The evaluation committee has awarded Mansi's OUR project an excellent grade.",
      "The evaluation committee has awarded Manya's OUR project a very good grade.",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2023",
    _type: "newsGroup",
    category: "Spring Semester 2023",
    order: 6,
    items: [
      "EPR (X 320-JEOL) Installation was successful in July 2023! Happy researching.",
      "The JEOL team successfully completed all the tests for the new EPR spectrometer and completed the first EPR measurement.",
      "Analytical HPLC (SHIMADZU) funded by DST-SERB was successfully installed.",
      "Garvisha is the recipient of the Dean's List Award in the academic year 2022–2023. Many congratulations!",
      "Garvisha, Saumya and Abhay successfully defended their final-year B.Sc (Research) thesis presentations.",
      "Garvisha, Saumya and Abhay received their degrees in the Convocation 2023.",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2022",
    _type: "newsGroup",
    category: "Monsoon Semester 2022",
    order: 7,
    items: [
      "Mr. Naga Malleswara Rao Vampugani joined the group as a Junior Research Fellow (JRF) in Monsoon 2022. Welcome to the group!",
      "Mr. Lokesh Gupta, Mr. Ajay B. Shelke and Mr. Prashant B. Singh joined the group as PhD students in Monsoon 2022.",
      "Lokesh qualified for the CSIR-UGC JRF with AIR 94.",
      "Lokesh & Asrar participated in a five-day workshop on X-ray crystallography organized by the ASEAN-India Crystallographic School from 14th–18th November 2022 at Shiv Nadar Institution of Eminence, Delhi-NCR.",
      "The group received a second research grant from DST-SERB in October 2022. Many congratulations!",
      "Mansi and Manya joined as OUR students in the group. Best wishes!",
      "Garvisha, Saumya and Abhay joined the group for final-year thesis work.",
      "The evaluation committee has awarded Garvisha's OUR project an excellent grade.",
      "The evaluation committee has awarded Abhay's OUR project a very good grade.",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2022",
    _type: "newsGroup",
    category: "Spring Semester 2022",
    order: 8,
    items: [
      "Saumya Singh joined the group as a research intern in Spring 2022. Welcome to the group!",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2021",
    _type: "newsGroup",
    category: "Monsoon Semester 2021",
    order: 9,
    items: [
      "Mr. Prashant Singh joined the group as a JRF student in Monsoon 2021. Welcome to the group!",
      "Garvisha Mittal joined the group as an OUR student in Monsoon 2021. Welcome to the group!",
      "Abhay Dixit joined the group as an OUR student in Monsoon 2021. Warm welcome to the group!",
      "The group says farewell to Oindrila Adhikari; wish her all the best for the future.",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2021",
    _type: "newsGroup",
    category: "Spring Semester 2021",
    order: 10,
    items: [
      "Ms. Oindrila Adhikari joined the group as a JRF student in Spring 2021. Welcome to the group!",
      "The group says farewell to Dr. Garima Singh; wish her all the best for her next position.",
    ],
  },
  {
    _id: "newsGroup-monsoon-semester-2020",
    _type: "newsGroup",
    category: "Monsoon Semester 2020",
    order: 11,
    items: [
      "The group received its first research grant from DST-SERB in December 2020. Many congratulations!",
    ],
  },
  {
    _id: "newsGroup-spring-semester-2020",
    _type: "newsGroup",
    category: "Spring Semester 2020",
    order: 12,
    items: [
      "Dr. Ajoy Kapat joined Shiv Nadar University as an Assistant Professor on 1st July 2019. Welcome on board!",
      "Dr. Garima Singh joined the group as a Postdoctoral student in Spring 2020. Welcome to the group!",
      "Asrar Ahmad joined the group as a PhD student in Spring 2020. Welcome to the group, and good luck with your thesis work!",
      "Glove box (Alfa Line GS) installation was successful in July 2020! Happy researching.",
      "New fume hoods have been installed successfully in the Radical Chemistry and Catalysis Laboratory.",
    ],
  },
];

async function run() {
  console.log(`\n🚀  Importing ${newsGroups.length} news group documents into Sanity…\n`);
  let ok = 0;
  let fail = 0;

  for (const doc of newsGroups) {
    const { _id, ...fields } = doc;
    try {
      // Try to patch (update) existing document fields
      await client
        .patch(_id)
        .set(fields)
        .commit({ returnDocuments: false });
      console.log(`  ✅  ${_id} (patched)`);
      ok++;
    } catch (patchErr) {
      // Document doesn't exist yet — create it
      try {
        await client.create(doc);
        console.log(`  ✅  ${_id} (created)`);
        ok++;
      } catch (createErr) {
        console.error(`  ❌  ${_id}:`, createErr.message);
        fail++;
      }
    }
  }

  console.log(`\n✔  Done — ${ok} upserted, ${fail} failed.\n`);
}

run();
