import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { useActions } from "../../hooks/useActions";
import { getArticles } from "../../api/article";
import { RouteURLS } from "../../helpers/route-urls";
import { useHistory } from "react-router-dom";

const PaginationBar: React.FC = () => {
  const { setPage, setPageSize } = useActions();
  const page = useAppSelector((state) => state.articles.page);
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  const isLoading = useAppSelector((state) => state.articles.isLoading);

  const onChangeHandler = (num: number): void => {
    setPage(num);
  };
  const onPageSizeHandler = (current: number, size: number): void => {
    setPageSize(size);
  };
  const history = useHistory();
  useEffect(() => {
    getArticles(pageSize, page);
    history.push(`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`);
  }, [page, history, pageSize]);

  return (
    <div className="pagination">
      {!isLoading && (
        <Pagination
          size="small"
          total={500}
          onChange={onChangeHandler}
          current={page}
          pageSize={pageSize}
          pageSizeOptions={["5", "10", "20"]}
          onShowSizeChange={onPageSizeHandler}
        />
      )}
    </div>
  );
};

export default PaginationBar;
