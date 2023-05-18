interface IFavorate {
  id: number;
  userName: string;
  avatarUrl: string;
  favoriteCount: number;
  image: string;
  isFavorite: boolean;
  title: string;
}

interface IRenderItem {
  item: IFavorate;
  index: number;
}

interface ISideMenuItem {
  icon: any,
  name: string
}

interface ISideMenuRef {
  show: () => void
  hide: () => void
}