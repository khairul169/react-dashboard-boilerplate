import Dottie from 'dottie';
import React, { useState, useEffect } from 'react';
import Panel from '../components/Panel';

const Table = ({
  title, headers, items, query, actions, className,
  containerClassName, indexKey = 'id', onChangePage, checked, onItemChecked,
}) => {
  const { rows, count } = items || { rows: [], count: 0 };

  const onToggleSelectAll = () => {
    if (!checked.length) {
      onItemChecked(rows.map((i) => Dottie.get(i, indexKey)));
    } else {
      onItemChecked([]);
    }
  };

  const onItemCheck = (idx, value) => {
    if (value && !checked.includes(idx)) {
      const newVal = [...checked, idx];
      onItemChecked(newVal);
    }

    if (!value && checked.includes(idx)) {
      const newVal = [...checked];
      newVal.splice(newVal.indexOf(idx), 1);
      onItemChecked(newVal);
    }
  };

  useEffect(() => {
    if (onItemChecked) {
      onItemChecked([]);
    }
  }, [rows]);

  return (
    <div className={className}>
      {title && <h2 className="mb-3 text-lg">{title}</h2>}
      <Panel className={containerClassName}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                {onItemChecked && rows?.length > 0 && (
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-5 text-left"
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={checked.length === rows.length}
                    onChange={onToggleSelectAll}
                  />
                </th>
                )}
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #
                </th>
                {headers?.map((header, idx) => (
                  <th
                    key={`header-${idx}`}
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {header.title}
                  </th>
                ))}
                {actions && (
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Action
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {!rows?.length && (
              <tr className="bg-white border-b">
                <td
                  className="px-6 py-16 whitespace-nowrap text-sm text-center font-medium text-gray-900"
                  colSpan={(headers?.length || 0) + (actions ? 2 : 1)}
                >
                  Tidak ada item.
                </td>
              </tr>
              )}
              {rows?.map((item, idx) => {
                const index = ((query?.page || 1) - 1) * (query?.limit || 10) + (idx + 1);
                const keyItem = Dottie.get(item, indexKey);

                return (
                  <tr
                    key={`table-row-${idx}`}
                    className={`${
                      idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } border-b`}
                  >

                    {onItemChecked && (
                    <td className="px-5 py-2 whitespace-nowrap text-sm font-medium text-gray-900 h-14">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={checked.includes(keyItem)}
                        onChange={(e) => onItemCheck(keyItem, e.target.checked)}
                      />
                    </td>
                    )}
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 h-14">
                      {index}
                    </td>
                    {headers?.map((header, colIdx) => {
                      let value = Dottie.get(item, header.key);

                      if (header.format) {
                        value = header.format(value, item);
                      } else if (typeof value === 'string') {
                        value = value?.length ? value : '-';
                      } else {
                        value = value == null ? '-' : value;
                      }

                      return (
                        <td
                          key={`row-${idx}-${colIdx}`}
                          className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap"
                        >
                          {value}
                        </td>
                      );
                    })}
                    {actions && (
                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap flex gap-1">
                      {actions(item, idx)}
                    </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {onChangePage && (
        <Pagination
          pages={query ? Math.ceil(count / query.limit) : 1}
          curPage={query?.page || 1}
          onChange={onChangePage}
        />
        )}
      </Panel>
    </div>
  );
};

const Pagination = ({ pages, curPage, onChange }) => {
  const paginationSize = 10;
  const offset = paginationSize / 2;

  const pageList = Array.from({ length: pages }, (_, idx) => idx + 1)
    .filter((i) => {
      if (curPage <= offset) {
        return i <= paginationSize;
      }

      if (curPage >= pages - offset) {
        return i >= pages - paginationSize;
      }

      return i >= curPage - offset && i <= curPage + offset;
    });

  return (
    <div className="flex items-center justify-center py-5 gap-1">
      {curPage > 1 && (
      <button
        type="button"
        className="btn bg-primary-400 hover:bg-primary-600 text-white w-8 h-8 rounded-md"
        onClick={() => onChange(1)}
      >
        &laquo;
      </button>
      )}

      {pageList.map((page) => (
        <button
          type="button"
          key={`page-${page}`}
          className={`btn ${
            curPage === page ? 'bg-primary-600' : 'bg-primary-400'
          } hover:bg-primary-600 text-white w-8 h-8 rounded-md`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      {curPage < pages && (
      <button
        type="button"
        className="btn bg-primary-400 hover:bg-primary-600 text-white w-8 h-8 rounded-md"
        onClick={() => onChange(pages)}
      >
        &raquo;
      </button>
      )}
    </div>
  );
};

export default React.memo(Table);
