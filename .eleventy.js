module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addFilter("readableDate", function(dateObj) {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(dateObj);
  });

  eleventyConfig.addFilter("tagList", function(collection) {
    const tags = new Set();
    collection.forEach(function(item) {
      (item.data.tags || []).forEach(function(tag) {
        if (!["post", "posts", "all"].includes(tag)) tags.add(tag);
      });
    });
    return Array.from(tags).sort();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
