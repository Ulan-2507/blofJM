import React, { useState } from "react";
import cn from "classnames";
import "./favorite.scss";
import { favorite, unfavorite } from "../../api/article";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { IArticle } from "../../types/article";

type TProps = {
  favorited: boolean;
  favoritesCount: number;
  slug: string;
};

const Favorite: React.FC<TProps> = ({ favorited, favoritesCount, slug }) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const [data, setData] = useState({ favorited, favoritesCount });

  const clickHandler = () => {
    if (data.favorited) {
      unfavorite(slug).then((article: IArticle) => {
        setData({
          favorited: article.favorited,
          favoritesCount: article.favoritesCount,
        });
      });
    } else {
      favorite(slug).then((article: IArticle) => {
        setData({
          favorited: article.favorited,
          favoritesCount: article.favoritesCount,
        });
      });
    }
  };

  return (
    <button
      disabled={!isAuth}
      onClick={clickHandler}
      type="button"
      className={cn("favorite", { favorited: data.favorited })}
    >
      <span className="favorite__icon"></span>
      <span className="favorite__count">{data.favoritesCount}</span>
    </button>
  );
};

export default Favorite;
