import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'cwjtbne7',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-09',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: process.env.SANITY_API_TOKEN,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchData() {
  console.log('🏗️  Starting build-time data fetch...');

  try {
    // 1. Fetch Collection (Plans)
    const plansQuery = `*[_type == "plan"]{
      _id,
      _type,
      title,
      price,
      category,
      slug,
      exteriorGallery,
      specs { sqft, beds, baths, width, depth },
      "technicalPlansUrl": technicalPlans.asset->url,
      floorPlanPreviews
    }`;

    // 2. Fetch Portfolio (Projects)
    const portfolioQuery = `*[_type == "project"] | order(_createdAt desc){
      _id,
      projectName,
      "gallery": gallery,
      shortDescription,
      linkedPlan->{ _id, category, title }
    }`;

    // 3. Fetch Architects
    const architectsQuery = `*[_type == "architect"]`;

    const [plans, projects, architects] = await Promise.all([
      client.fetch(plansQuery),
      client.fetch(portfolioQuery),
      client.fetch(architectsQuery).catch(() => []) // Fallback in case type doesn't exist
    ]);

    const data = {
      plans,
      projects,
      architects,
      timestamp: new Date().toISOString()
    };

    // Ensure directory exists
    const outDir = path.resolve(__dirname, '../public/data');
    if (!fs.existsSync(outDir)){
        fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = path.join(outDir, 'content.json');
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));

    console.log(`✅ Data fetched successfully`);

  } catch (error) {
    console.error('❌ Error fetching data:', error);
    process.exit(1);
  }
}

fetchData();