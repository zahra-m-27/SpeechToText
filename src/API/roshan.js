const BASE_URL = "/api/roshan/api";
const TOKEN = import.meta.env.VITE_API_TOKEN;

// Upload a file to Roshan for transcription
export const transcribeFileAPI = async (file) => {
  const formData = new FormData();
  formData.append("media", file);

  const res = await fetch(`${BASE_URL}/transcribe_files/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to upload file");
  }

  return await res.json();
};

// Submit a URL for transcription
export const transcribeUrlAPI = async (url) => {
  const res = await fetch(`${BASE_URL}/transcribe_files/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ media_urls: [url] }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to upload URL");
  }

  return await res.json();
};

// Optional: fetch request results later if needed
export const fetchTranscriptStatus = async (id) => {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch transcript status");
  }

  return await res.json();
};

// List all transcription requests (use pagination if needed)
export const listAllTranscripts = async () => {
  const res = await fetch(`${BASE_URL}/requests/`, {
    method: "GET",
    Authorization: `Token ${TOKEN}`,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to list transcripts");
  }

  return await res.json();
};

// Delete a transcription by ID
export const deleteTranscript = async (id) => {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "DELETE",
    Authorization: `Token ${TOKEN}`,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete transcript");
  }

  return true;
};
