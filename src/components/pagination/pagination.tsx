import React from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { useActions } from "../../hooks/useActions";

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
