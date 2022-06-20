import './articles.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { nextPage } from '../../servises/ArticlesReducer';

import Item from './item';

import 'antd/dist/antd.css';

export default function Articles() {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();

  return (
    // eslint-disable-next-line react/no-array-index-key
    <>
      <ul>
        {articles.map((item) => (
          <Item
            item={item}
            key={Date.now() + Math.random() * 10 + Math.random}
          />
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total="50"
          onChange={(page) => {
            dispatch(nextPage(page));
          }}
        />
      </div>
    </>
  );
}
