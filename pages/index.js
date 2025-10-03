import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  async function fetchProxy() {
    try {
      const resp = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      const text = await resp.text();
      setContent(text);
    } catch (err) {
      setContent("Error: " + err.toString());
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Securly, Where Everything is Blocked!</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={fetchProxy} style={{ marginLeft: "1rem" }}>Fetch</button>
      <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
