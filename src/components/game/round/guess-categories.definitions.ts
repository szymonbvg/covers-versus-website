import { GuessCategory } from "@/types/game";

export const GUESS_CATEGORY_DEFINITIONS: Record<number, string> = {
  [GuessCategory.GAME]: "Game",
  [GuessCategory.FRANCHISE]: "Franchise/Series",
  [GuessCategory.DEVELOPER]: "Developer",
  [GuessCategory.PUBLISHER]: "Publisher",
  [GuessCategory.RELEASE_YEAR]: "Release year",
  [GuessCategory.THEME]: "Theme",
  [GuessCategory.GENRE]: "Genre",
};
