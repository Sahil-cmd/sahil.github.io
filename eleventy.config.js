export default function (eleventyConfig) {
  // Passthrough copy for static assets (glob by extension)
  eleventyConfig.addPassthroughCopy({ "src/css/**/*.css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/img/**/*.{png,webp}": "img" });
  eleventyConfig.addPassthroughCopy({
    "src/projects/**/*.{png,webp}": "projects",
  });
  eleventyConfig.addPassthroughCopy({ "src/publication/": "publication/" });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");

  // Custom date filter for sitemap
  eleventyConfig.addFilter("isoDate", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

  // Build-time year for footer copyright
  eleventyConfig.addGlobalData("buildYear", new Date().getFullYear());

  // Case study collection (tagged pages sorted by date descending)
  eleventyConfig.addCollection("caseStudies", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("case-study")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
