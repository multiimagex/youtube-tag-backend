export default async function handler(req, res) {
  try {
    // ✅ Allow CORS for all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // ✅ Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // ✅ Allow only POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // ✅ Parse body safely
    let title = "";
    try {
      title = req.body.title || "";
    } catch (err) {
      const buffers = [];
      for await (const chunk of req) buffers.push(chunk);
      const data = Buffer.concat(buffers).toString();
      const parsed = JSON.parse(data);
      title = parsed.title || "";
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const cleanTitle = title.trim().toLowerCase();

    // 🔹 Smart tag generation
    const tags = [
      cleanTitle,
      `how to ${cleanTitle}`,
      `${cleanTitle} tutorial`,
      `${cleanTitle} guide`,
      `${cleanTitle} tips`,
      `${cleanTitle} tricks`,
      `${cleanTitle} step by step`,
      `${cleanTitle} kaise kare`,
      `easy ${cleanTitle} method`,
      `best way to ${cleanTitle}`,
      `complete ${cleanTitle} process`,
      `${cleanTitle} video`,
      `${cleanTitle} 2025`,
      `learn ${cleanTitle}`,
      `${cleanTitle} in hindi`,
      `${cleanTitle} explained`,
      `youtube seo`,
      `video marketing`,
      `multiimagex`,
      `trending youtube tags`,
      `youtube optimization`,
      `viral video tags`
    ];

    const uniqueTags = [...new Set(tags)];

    // ✅ Return tags
    res.status(200).json({ tags: uniqueTags });
  } catch (error) {
    console.error("❌ Server crash:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
