const fs = require("fs");

// Mappa categoria → emoji
const categoryEmoji = {
    coding:     "💻",
    literature: "🪶",
    life:       "💫",
    humor:      "🎭",
    music:      "🎸",
    movie:      "🎬",
    default:    "💬",
};

const quotes = JSON.parse(fs.readFileSync("quotes.json", "utf8"));
const random = quotes[Math.floor(Math.random() * quotes.length)];

const emoji = categoryEmoji[random.category] || categoryEmoji.default;

const encodedQuote = encodeURIComponent(random.quote);
const encodedAuthor = encodeURIComponent(random.author);

const imageUrl = `https://quotes-github-readme.vercel.app/api?type=horizontal&quoteColor=1d3557&authorColor=457b9d&backgroundColor=f1faee&symbolColor=1d3557&border=true&quote=${emoji}%20${encodedQuote}&author=${encodedAuthor}`;

let readme = fs.readFileSync("README.md", "utf8");

readme = readme.replace(
    /<!-- QUOTE-START -->[\s\S]*?<!-- QUOTE-END -->/,
    `<!-- QUOTE-START -->\n<img src="${imageUrl}" Quote"/>\n<!-- QUOTE-END -->`
);

fs.writeFileSync("README.md", readme);
console.log(`[${random.category}] ${emoji} "${random.quote}" — ${random.author}`);
