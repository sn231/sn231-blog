module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addFilter("readableDate", function(dateObj) {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(dateObj);
  });

  eleventyConfig.addFilter("htmlDate", function(dateObj) {
    if (!dateObj || !dateObj.toISOString) return "";
    return dateObj.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("limit", function(array, n) {
    return (array || []).slice(0, n);
  });

  eleventyConfig.addFilter("tagList", function(collection) {
    const tags = new Set();
    (collection || []).forEach(function(item) {
      (item.data.tags || []).forEach(function(tag) {
        if (!["all", "post", "posts"].includes(tag)) tags.add(tag);
      });
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b, "zh-CN"));
  });

  eleventyConfig.addFilter("postsByTag", function(posts, tag) {
    return (posts || []).filter(function(post) {
      return (post.data.tags || []).includes(tag);
    });
  });

  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value ?? "");
  });

  eleventyConfig.addFilter("xmlEscape", function(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  });

  eleventyConfig.addFilter("xmlDate", function(dateObj) {
    if (!dateObj || !dateObj.toUTCString) return "";
    return dateObj.toUTCString();
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
