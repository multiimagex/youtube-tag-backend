export default async function handler(req, res) {
  // ✅ Allow only POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const cleanTitle = title.trim().toLowerCase();

    // 🔹 Simple smart tag logic
    const tags = [
      cleanTitle,
      `how to ${cleanTitle}`,
      `${cleanTitle} tutorial`,
      `${cleanTitle} guide`,
      `${cleanTitle} tips`,
      `${cleanTitle} tricks`,
      `best way to ${cleanTitle}`,
      `${cleanTitle} 2025`,
      `${cleanTitle} step by step`,
      `${cleanTitle} kaise kare`,
      `${cleanTitle} video`,
      `${cleanTitle} full guide`,
      `${cleanTitle} easy method`,
      `learn ${cleanTitle}`,
      `${cleanTitle} explained`,
      `beginner ${cleanTitle}`,
      `advanced ${cleanTitle}`,
      // 🔹 Some default SEO tags
      "youtube seo",
      "video marketing",
      "youtube growth",
      "multiimagex",
      "trending youtube tags",
      "youtube optimization",
      "viral video tags"
    ];

    // Remove duplicates
    const uniqueTags = [...new Set(tags)];

    res.status(200).json({ tags: uniqueTags });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
