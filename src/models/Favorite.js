import mongoose, { Schema } from "mongoose";

const UserFavorite = new Schema(
  {
    uid: String,
    accountID: String,
    backdrop_path: String,
    poster_path: String,
    movieID: Number,
    type: String,
  }
);

const Favorites =
  mongoose.models.Favorites || mongoose.model("Favorites", UserFavorite);
export default Favorites;
