import store from "@/data/jobs.store.json";

export type Job = {
  id: string;
  title: string;
  location: string;
  mode: "Hybrid" | "Onsite" | "Remote";
  type: "Contract" | "Full-time" | "Part-time";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  posted: string; // YYYY-MM-DD
  published: boolean;
  featured: boolean;
};

// If store has jobs, use it. Otherwise fallback to a small default list (so site isn't empty).
const storedJobs = (store as any)?.jobs as Job[] | undefined;

export const jobs: Job[] = Array.isArray(storedJobs) && storedJobs.length > 0 ? storedJobs : [];
