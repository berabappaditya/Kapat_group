import { createClient } from "@sanity/client";

// Configure a dedicated WRITE client
const writeClient = createClient({
  projectId: "vtabhoqf", // Replace with your actual project ID
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false,                // MUST be false for writing/importing
  token: "skKQvuu7fLnq9TlWFjY4erqILhCf1rnZeFQRM2X2UEkngBmc88LLqfpxp8sKQOGxG7khZX05d1ZQ8d0gHjWNh7bl11mkC4PKQLEAYFvOZXRepztjC05xTTkU7dRxuH3iGmkXjoiXKAJRR72Vwc93xiRmy6F21LXUIXTCSTkzwNcbbaOqMCV8",   // You must generate this in manage.sanity.io
});

const myDataset = [
  { _type: "post", title: "Test Post 1" }, // Replace "_type" with your actual schema type
  { _type: "post", title: "Test Post 2" }
];

async function runImport() {
  console.log("Starting import...");

  for (const item of myDataset) {
    try {
      const result = await writeClient.create(item);
      console.log(`✅ Created document: ${result._id}`);
    } catch (error) {
      console.error(`❌ Failed to create document:`, error.message);
    }
  }

  console.log("Import complete!");
}

runImport();