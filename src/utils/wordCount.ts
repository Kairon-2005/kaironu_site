/**
 * Strips markdown syntax and counts words from plain text
 */
export function countWords(markdown: string): number {
  // Remove code blocks
  let text = markdown.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`[^`]*`/g, '');

  // Remove images and links but keep link text
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Remove markdown formatting
  text = text.replace(/#{1,6}\s*/g, ''); // headers
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2'); // bold
  text = text.replace(/(\*|_)(.*?)\1/g, '$2'); // italic
  text = text.replace(/~~(.*?)~~/g, '$1'); // strikethrough
  text = text.replace(/>\s*/g, ''); // blockquotes
  text = text.replace(/[-*+]\s+/g, ''); // unordered lists
  text = text.replace(/\d+\.\s+/g, ''); // ordered lists
  text = text.replace(/---+/g, ''); // horizontal rules
  text = text.replace(/\n+/g, ' '); // newlines to spaces

  // Split on whitespace and filter empty strings
  const words = text.split(/\s+/).filter(word => word.length > 0);

  return words.length;
}
