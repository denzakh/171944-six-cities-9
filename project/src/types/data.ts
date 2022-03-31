export type AuthData = {
  login: string;
  password: string;
};

export type RoomData = {
  id: number | undefined;
};

export type SubmitCommentData = {
  comment: string,
  rating: number,
  hotelId: number,
  cb: ()=> void,
};

export type FavoriteData = {
  hotelId: number,
  status: 1 | 0,
  cb?: () => void,
};
