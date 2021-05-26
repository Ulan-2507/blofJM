import React from "react";
import cn from "classnames";
import "./favorite.scss";
import { favorite, getArticles, unfavorite } from "../../../api/article";
import { useAppSelector } from "../../../hooks/useAppSelelctor";

type TProps = {
  favorited: boolean;
  favoritesCount: number;
  slug: string;
};

const Favorite: React.FC<TProps> = ({ favorited, favoritesCount, slug }) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { page, pageSize } = useAppSelector((state) => state.articles);

  const clickHandler = () => {
    if (favorited) {
      unfavorite(slug);
    } else {
      favorite(slug);
    }
    getArticles(pageSize, page);
  };

  return (
    <button
      disabled={!isAuth}
      onClick={clickHandler}
      type="button"
      className={cn("favorite", { favorited: favorited })}
    >
      <span className="favorite__icon"></span>
      <span className="favorite__count">{favoritesCount}</span>
    </button>
  );
};

export default Favorite;
