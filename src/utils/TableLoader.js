import React from 'react';
import PropTypes from 'prop-types';
import { SIZE_HEIGHT_TABLE_ROW } from '@tokens/variables.js';
import Loader from './Loader';
import s from './TableLoader.module.scss';

const TableLoader = ({ isError, errorMessage, rowLength, colSpan, ...props }) => {
  const rowCount = isError ? 2 : rowLength || 1;
  return (
    <tr className={s["table-loader-row"]} {...props}>
      <td className={s["table-loader-column"]} colSpan={colSpan}>
        <div className="gdm-relative" style={{ height: `${rowCount * SIZE_HEIGHT_TABLE_ROW}px` }}>
          {isError ? (
            <div className={s["error-message"]}>
              <span className="gdm-label">{errorMessage || 'We have experienced an error. Please try reloading.'}</span>
            </div>
          ) : (
            <Loader fullPage={false} />
          )}
        </div>
      </td>
    </tr>
  );
};

TableLoader.propTypes = {
  rowLength: PropTypes.number,
  colSpan: PropTypes.number,
  isError: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

TableLoader.defaultProps = {
  rowLength: 1,
  colSpan: 1,
  isError: false,
  errorMessage: '',
};

export default TableLoader;
