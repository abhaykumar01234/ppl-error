import React, { Children, cloneElement, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import { pdf } from '@react-pdf/renderer';
import { AlertMessage, Button } from '@arubaito';
import { blobToFile } from '@ppl/utils/download';
import setIsLoading from '@ppl/redux/actions/set_is_loading';
import cx from 'classnames';
import s from './export_buttons.module.scss';

const ExportButtons = ({ children }) => {
  const [error, setError] = useState({ isError: false, message: null });

  return (
    <div className="gdm-m-bottom-md">
      <div className={cx('gdm-flex gdm-m-top-md', s['export-wrapper'])}>
        <div className={cx('gdm-flex gdm-m-bottom-sm', s['button-wrapper'])}>
          {Children.map(children, (child, i) => (
            <div key={i}>{cloneElement(child, { setError })}</div>
          ))}
        </div>
        <div>
          {error.isError && (
            <AlertMessage status="error">
              {error.message ||
                'We have experienced an error while downloading CSV/PDF, please try again.'}
            </AlertMessage>
          )}
        </div>
      </div>
    </div>
  );
};

const PDF = ({ children, disabled, documentView, fileName, setError, errorMessage, ...props }) => {
  const dispatch = useDispatch();
  const downloadPdf = () => {
    const toPdf = async () => {
      blobToFile(await pdf(documentView).toBlob(), fileName);
    };

    dispatch(setIsLoading(true));

    toPdf()
      .then(() => {
        setError({ isError: false, message: null });
      })
      .catch(() => {
        setError({ isError: true, message: errorMessage });
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  return (
    <Button variant="secondary" disabled={disabled} onClick={downloadPdf} {...props}>
      {children}
    </Button>
  );
};

const CSV = ({ children, headers, data, disabled, fileName, setError, errorMessage, ...props }) => {
  const csvRef = useRef();
  const downloadCSV = () => {
    try {
      csvRef.current.link.click();
      setError({ isError: false, message: null });
    } catch (err) {
      setError({ isError: true, message: errorMessage });
    }
  };

  return (
    <>
      <CSVLink ref={csvRef} headers={headers} data={data} filename={fileName} />
      <Button variant="secondary" disabled={disabled} onClick={downloadCSV} {...props}>
        {children}
      </Button>
    </>
  );
};

CSV.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fileName: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  setError: PropTypes.func,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};
CSV.defaultProps = {
  disabled: false,
  errorMessage: null,
  setError: () => {}
};

PDF.propTypes = {
  fileName: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  setError: PropTypes.func,
  documentView: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool
};
PDF.defaultProps = {
  disabled: false,
  errorMessage: null,
  setError: () => {}
};

ExportButtons.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

ExportButtons.CSV = CSV;
ExportButtons.PDF = PDF;

export default ExportButtons;
