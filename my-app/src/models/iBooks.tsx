export interface IBookListPropsItem {
  _id: string;
  name: string;
  description: string;
  picture?: string;
}
export interface IFavoritesBooksProps {
  favorite: {
    dataUser: [IFavoritesBooksPropsItem];
  };
}
export interface IFavoritesBooksLibProps {
  favorite: {
    dataLib: [IFavoritesBooksPropsItem];
  };
}
export interface IFavoritesBooksPropsItem {
  _id: string;
  name: string;
  description: string;
  picture?: string;
}
export interface IBookListProps {
  books: {
    data: [IBookListPropsItem];
  };
}
