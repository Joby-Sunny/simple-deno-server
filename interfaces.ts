export interface GlossaryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: Array<string>;
}

export interface GlossaryListItem {
  id: number;
  title: string;
}
