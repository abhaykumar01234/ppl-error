import React from 'react';
import PropTypes from 'prop-types';
import { COLOR_BASE_LIGHT, COLOR_BASE_BOX, COLOR_BASE_BRAND_PRIMARY } from '@tokens/variables';
import { VpComponents } from '@vp-components';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const SA_LOGO_URL = 'https://capterra.s3.amazonaws.com/assets/images/logos/softwareadvice-logo-286x46.png';

const styles = StyleSheet.create({
  shared: {
    fontSize: 10,
    fontWeight: 800,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'bottom',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderBottom: 1,
    borderBottomColor: COLOR_BASE_BRAND_PRIMARY,
  },
  logoWrapper: {
    width: 150,
    height: 20,
  },
  billingInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 15,
    lineHeight: 1.3,
  },
  main: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCell: {
    paddingHorizontal: 5,
    paddingVertical: 6,
  },
  dateColumn: {
    flexBasis: '10%',
  },
  activityColumn: {
    flexBasis: '33%',
  },
  invoiceColumn: {
    flexBasis: '20%',
    textAlign: 'right',
  },
  paymentColumn: {
    flexBasis: '20%',
    textAlign: 'right',
  },
  balanceColumn: {
    flexBasis: '18%',
    textAlign: 'right',
  },
  darkBgRow: {
    backgroundColor: COLOR_BASE_BOX,
  },
  lightBgRow: {
    backgroundColor: COLOR_BASE_LIGHT,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'right',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTop: 1,
    borderTopColor: COLOR_BASE_BRAND_PRIMARY,
  },
});

const PDFDocument = ({ vendor = {}, invoiceList }) => {
  const invoicesChunks = VpComponents.chunkArray(invoiceList, { size: 25 });

  return (
    <Document>
      {invoicesChunks.map((invoiceList, ind) => (
        <Page key={ind} style={styles.shared}>
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image src={SA_LOGO_URL} />
            </View>
            <Text>BILLING SUMMARY</Text>
          </View>
          {ind === 0 && (
            <View style={styles.billingInfoWrapper}>
              <View>
                <Text>Software Advice</Text>
                <Text>P.O. Box 733143</Text>
                <Text>Dallas, TX 75373-3143</Text>
              </View>
              <View>
                <View>
                  <Text>Bill to:</Text>
                  <Text>{vendor.name || ''}</Text>
                  <Text>{vendor.address1 || ''}</Text>
                  {Boolean(vendor.address2) && <Text>{vendor.address2}</Text>}
                  <Text>{`${vendor.city || ''}, ${vendor.state || ''} ${vendor.zip || ''}`}</Text>
                  <Text>{vendor.country || ''}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.main}>
            <View style={styles.tableWrapper}>
              <Text style={[styles.dateColumn, styles.tableCell, styles.darkBgRow]}>Date</Text>
              <Text style={[styles.activityColumn, styles.tableCell, styles.darkBgRow]}>Activity</Text>
              <Text style={[styles.invoiceColumn, styles.tableCell, styles.darkBgRow]}>Invoice</Text>
              <Text style={[styles.paymentColumn, styles.tableCell, styles.darkBgRow]}>Payments & Credits</Text>
              <Text style={[styles.balanceColumn, styles.tableCell, styles.darkBgRow]}>Balance</Text>
            </View>
            {invoiceList.map(({ billDate, name, billId, balance, invoices, paymentsAndCredits }, index) => (
              <View key={billId} style={[styles.tableWrapper, index % 2 !== 0 ? styles.darkBgRow : styles.lightBgRow]}>
                <Text style={[styles.dateColumn, styles.tableCell]}>{billDate}</Text>
                <Text style={[styles.activityColumn, styles.tableCell]}>{name}</Text>
                <Text style={[styles.invoiceColumn, styles.tableCell]}>{invoices}</Text>
                <Text style={[styles.paymentColumn, styles.tableCell]}>{paymentsAndCredits}</Text>
                <Text style={[styles.balanceColumn, styles.tableCell]}>{balance}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
          </View>
        </Page>
      ))}
    </Document>
  );
};

PDFDocument.propTypes = {
  invoiceList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default PDFDocument;
