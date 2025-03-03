export interface HighlightedTerm {
    term: string;
    romanization: string;
    possibleTranslations: string[];
    sourceContext: string;
  }

export interface TranslatedDocument {
  id: string;
  title: string;
  author: string;
  affiliation: string;
  date: string;
  originalText: string;
  translatedText: string;
  highlights: HighlightedTerm[];
}