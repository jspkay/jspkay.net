import YAML from "yaml";

import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";

import pluginTOC from "eleventy-plugin-toc";
import path from "node:path";
import * as sass from "sass";

export const config = {
  dir: {
    layouts: "_layouts"
  }
}

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("favicon.ico")
  eleventyConfig.addPassthroughCopy("logo.png")
  eleventyConfig.addPassthroughCopy("assets/js")
  eleventyConfig.addPassthroughCopy("presentations")
 
  
  eleventyConfig.addDataExtension("yaml",
    (contents) => {
      return YAML.parse(contents)
    });
  
	eleventyConfig.addExtension(["scss", "sass"], {
	  outputFileExtension: "css",

	  compile: async function(inputContent, inputPath){
	    let parsed = path.parse(inputPath);
	    if(parsed.name.startsWith("_")){
	      return;
	    }

	    let result = sass.compile(inputPath, {
	      loadPaths:[
	        "_sass",
	      ]
	    });

	    this.addDependencies(inputPath, result.loadUrls);

	    return async(data) => {
	      return result.css;
	    };
	  },
	});

	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addTemplateFormats("sass");

	eleventyConfig.setLibrary("md",
	  markdownIt({
	    html: true,
	    breaks: false,
	    linkify: true,
	  }).use(markdownItAnchor).use(markdownItFootnote)
	);

	eleventyConfig.addPlugin(
	  pluginTOC,
    {
	   tags: ['h1', 'h2', 'h3'],
	   wrapper: "aside",
	   wrapperClass: "toc",
	   ul: true,
	  }
	);
};
