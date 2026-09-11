// ─────────────────────────────────────────────────────────────
// Vantage — Application Submission Service
// ─────────────────────────────────────────────────────────────
//
// This service is structured to connect to:
//   • Supabase Database  — store application form data
//   • Supabase Storage   — private CV/resume uploads
//   • Resend             — transactional confirmation emails
//
// TO CONFIGURE:
//   1. Create a .env file at the project root with:
//        VITE_SUPABASE_URL=https://your-project.supabase.co
//        VITE_SUPABASE_ANON_KEY=your-anon-key
//        VITE_RESEND_WEBHOOK_URL=https://your-resend-endpoint
//
//   2. Install Supabase client:
//        npm install @supabase/supabase-js
//
//   3. Uncomment the Supabase sections below and remove the
//      placeholder simulation logic.
// ─────────────────────────────────────────────────────────────

// ── TODO: Uncomment when Supabase is configured ──────────────
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );
// ─────────────────────────────────────────────────────────────

/**
 * Upload a CV file to Supabase private Storage.
 *
 * @param {File} file - The CV file to upload (PDF/DOC/DOCX)
 * @param {string} applicantEmail - Used to build a unique storage path
 * @returns {Promise<string>} - The storage path of the uploaded file
 */
export async function uploadCV(file, applicantEmail) {
  // ── TODO: Replace with real Supabase Storage upload ──────────
  // const timestamp = Date.now();
  // const ext = file.name.split(".").pop();
  // const path = `cvs/${applicantEmail.replace("@", "_at_")}_${timestamp}.${ext}`;
  //
  // const { data, error } = await supabase.storage
  //   .from("careers-cvs")                // IMPORTANT: set bucket to private
  //   .upload(path, file, { upsert: false });
  //
  // if (error) throw new Error(`CV upload failed: ${error.message}`);
  // return data.path;
  // ─────────────────────────────────────────────────────────────

  // Placeholder — simulates a delay and returns a fake path
  await new Promise((res) => setTimeout(res, 800));
  return `cvs/placeholder_${Date.now()}.${file.name.split(".").pop()}`;
}

/**
 * Submit an application to the Supabase database.
 *
 * @param {Object} formData - All form fields collected from the UI
 * @param {string} cvStoragePath - Storage path returned by uploadCV()
 * @returns {Promise<void>}
 */
export async function submitApplication(formData, cvStoragePath) {
  // ── TODO: Replace with real Supabase DB insert ───────────────
  // const payload = {
  //   ...formData,
  //   cv_storage_path: cvStoragePath,
  //   submitted_at: new Date().toISOString(),
  // };
  //
  // const { error } = await supabase
  //   .from("applications")
  //   .insert([payload]);
  //
  // if (error) throw new Error(`Application insert failed: ${error.message}`);
  //
  // ── TODO: Trigger Resend confirmation email ──────────────────
  // await fetch(import.meta.env.VITE_RESEND_WEBHOOK_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     to: formData.email,
  //     applicantName: formData.fullName,
  //     role: formData.role,
  //   }),
  // });
  // ─────────────────────────────────────────────────────────────

  // Placeholder — simulates network latency
  await new Promise((res) => setTimeout(res, 1200));
  console.log("[applicationService] Application submitted (placeholder):", {
    ...formData,
    cvStoragePath,
  });
}
