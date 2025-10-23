const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { title, count } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    let tags = [
      "youtube seo","video marketing","youtube growth","youtube tag generator",
      "multiimagex","free youtube tools","best youtube tags","trending tags",
      "youtube optimization","viral video tags"
    ];

    const titleLower = title.toLowerCase();

    // Split into words
    const words = titleLower.split(/\s+/).filter(w => w.length > 1);

    // Phrase-level templates
    let phrases = [];

    if(words.length>1){
      // Original order
      phrases.push(titleLower);

      // How-to pattern
      phrases.push(`how to ${words.join(' ')}`);

      // Hindi style variations
      if(words.some(w=>/[^\x00-\x7F]/.test(w))){
        phrases.push(words.join(' ')); // original Hindi
        phrases.push(`${words[1]} ${words[0]} ${words.slice(2).join(' ')}`); // swap first two
      }

      // Permutations (simple swaps)
      if(words.length>=3){
        phrases.push(`${words[1]} ${words[0]} ${words[2]}`);
        phrases.push(`${words[2]} ${words[0]} ${words[1]}`);
      }
    } else {
      phrases.push(words[0]);
      phrases.push(`how to ${words[0]}`);
    }

    // Add optional extra words
    const extras = ['latest', 'free', 'online', 'HD', '2025', 'tips', 'guide'];
    extras.forEach(e=> phrases.push(`${e} ${words.join(' ')}`));

    // Fetch related words from Datamuse
    const promises = words.map(w =>
      axios.get(`https://api.datamuse.com/words?ml=${encodeURIComponent(w)}&max=3`)
    );
    const results = await Promise.all(promises);
    results.forEach(r=> r.data.forEach(obj=> phrases.push(obj.word)));

    tags = [...new Set([...tags, ...phrases])].slice(0, count || 50);

    res.status(200).json({ tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
