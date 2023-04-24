interface Category {
  name: string;
  default: boolean;
  isAdd: boolean;
}

interface ArticleComment {
  userName: string;
  avatarUrl: string;
  message: string;
  dateTime: string;
  location: string;
  favoriteCount: number;
  isFavorite: boolean;
  children?: ArticleComment[];
}

interface Article {
  id: number;
  title: string;
  desc: string;
  tag: string[];
  dateTime: string;
  location: string;
  userId: number;
  userName: string;
  isFollow: boolean;
  avatarUrl: string;
  images: string[];
  favoriteCount: number;
  collectionCount: number;
  isFavorite: boolean;
  isCollection: boolean;
  comments?: ArticleComment[];
}