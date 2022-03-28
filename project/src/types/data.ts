export type AuthData = {
  login: string;
  password: string;
};

export type RoomData = {
  id: string | undefined;
};

export type SubmitCommentData = {
  comment: string,
  rating: number,
  hotelId: string,
  cb: ()=> void,
};
