import React from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { useActions } from "../../hooks/useActions";
import { getArticles } from "../../api";

const PaginationBar: React.FC = () => {
  const { setPage, setLoadStatus, setPageSize } = useActions();
  const page = useAppSelector((state) => state.articles.page);
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  const articles = useAppSelector((state) => state.articles.articles);
  const isLoading = useAppSelector((state) => state.articles.isLoading);

  const timeout = async (num: number) => {
    await setTimeout(() => {
      setLoadStatus();
    }, 300);
    setPage(num);
    setLoadStatus();
  };

  const onChangeHandler = (num: number): void => {
    if (!articles[num]) {
      getArticles(pageSize);
      setPage(num);
      return;
    }
    timeout(num);
  };
  const onPageSizeHandler = (current: number, size: number) => {
    setPageSize(size);
  };

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
