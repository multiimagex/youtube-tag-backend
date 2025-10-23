const axios = require('axios');

module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  
  try {
    const { title, count } = req.body;
    if(!title) return res.status(400).json({error:'Title required'});

    let tags = [
      "youtube seo","video marketing","youtube growth","youtube tag generator",
      "multiimagex","free youtube tools","best youtube tags","trending tags",
      "youtube optimization","viral video tags"
    ];

    let words = title.toLowerCase().split(/\s+/).filter(w => w.length>1);

    words.forEach(w => {
      tags.push(w);
      tags.push(w+" tutorial");
      tags.push("how to "+w);
      tags.push(w+" tips");
      tags.push(w+" guide");
      tags.push(w+" hack");
      if(/[^\x00-\x7F]/.test(w)){tags.push(w+" kaise"); tags.push(w+" kaise kare");}
    });

    const promises = words.map(w =>
      axios.get(`https://api.datamuse.com/words?ml=${encodeURIComponent(w)}&max=5`)
    );
    const results = await Promise.all(promises);
    results.forEach(r => r.data.forEach(obj => tags.push(obj.word)));

    tags = [...new Set(tags)].slice(0, count || 50);

    res.status(200).json({tags});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'Server error'});
  }
};
