export function countWords(markdown: string): {
  englishWords: number;
  chineseChars: number;
  total: number; // englishWords + chineseChars
} {
  // Remove code blocks
  let text = markdown.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`[^`]*`/g, '');

  // Remove images and links but keep link text
// Remove images: ![alt](url)
text = text.replace(/!\[.*?\]\(.*?\)/g, '');

// Replace links: [text](url) -> text
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

  text = text.trim();
  if (!text) return { englishWords: 0, chineseChars: 0, total: 0 };

  // Count English words (a-z sequences)
  const englishWords = (text.match(/\b[a-zA-Z]+\b/g) || []).length;

  // Count CJK characters (covers common Chinese + extensions; safe for mixed text)
  // Includes:
  // - \u3400-\u4DBF (CJK Ext A)
  // - \u4E00-\u9FFF (CJK Unified Ideographs)
  // - \uF900-\uFAFF (CJK Compatibility Ideographs)
  // - \u{20000}-\u{2EBEF} (Ext B–F etc.)
  const chineseChars =
    (text.match(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g) || []).length +
    (text.match(/[\u{20000}-\u{2EBEF}]/gu) || []).length;

  return {
    englishWords,
    chineseChars,
    total: englishWords + chineseChars,
  };
}