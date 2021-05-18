export type TError = {
  body: string[];
};
export interface IAuthor {
  username: string;
  bio: null | string;
  image: string;
  following: boolean;
}

export interface IArticle {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  description: string;
  author: IAuthor;
  favorited: boolean;
  favoritesCount: number;
}

export interface ArticlesState {
  articles: IArticle[];
  article: IArticle | null;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: null | string;
}

export interface ICreateArticle {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}

export interface IUpdateArticle {
  article: {
    title?: string;
    description?: string;
    body?: string;
  };
}

export interface IComment {
  comment: {
    body: string;
  };
}

export type TArticleFormData = ICreateArticle | IComment | IUpdateArticle;
