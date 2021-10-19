import React from 'react';
import PropTypes from 'prop-types';
import { COLOR_BASE_LIGHT, COLOR_BASE_BOX, COLOR_BASE_BRAND_PRIMARY } from '@tokens/variables';
import { VpComponents } from '@vp-components';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  shared: {
    fontSize: 10,
    fontWeight: 800
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'bottom',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderBottom: 1,
    borderBottomColor: COLOR_BASE_BRAND_PRIMARY
  },
  logoWrapper: {
    width: 250
  },
  main: {
    paddingHorizontal: 40,
    paddingVertical: 15
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  tableCell: {
    paddingHorizontal: 5,
    paddingVertical: 6
  },
  dateColumn: {
    flexBasis: '15%'
  },
  leadColumn: {
    flexBasis: '45%'
  },
  sizeColumn: {
    flexBasis: '30%'
  },
  priceColumn: {
    flexBasis: '10%',
    textAlign: 'right'
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
    borderTopColor: COLOR_BASE_BRAND_PRIMARY
  }
});

const toDateString = (date, opts = { separator: '/' }) => {
  if (!date || !date instanceof Date) return date;
  return (
    `0${date.getMonth() + 1}`.slice(-2) +
    opts.separator +
    `0${date.getDate()}`.slice(-2) +
    opts.separator +
    date.getFullYear()
  );
};

const LeadsDocument = ({ leads }) => {
  const _l = VpComponents.chunkArray(leads);
  return (
    <Document>
      {_l.map((leadsArr, ind) => (
        <Page key={ind} style={styles.shared}>
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Image src="https://capterra.s3.amazonaws.com/assets/images/logos/gdm-logo-dark-2x.png" />
            </View>
            <Text>VIEW LEADS</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.tableWrapper}>
              <Text style={[styles.dateColumn, styles.tableCell]}>Date</Text>
              <Text style={[styles.leadColumn, styles.tableCell]}>Lead</Text>
              <Text style={[styles.sizeColumn, styles.tableCell]}>Size</Text>
              <Text style={[styles.priceColumn, styles.tableCell]}>Price</Text>
            </View>
            {leadsArr.map(({ leadId, dateSent, company, size, amount }, index) => (
              <View
                key={leadId}
                style={[
                  styles.tableWrapper,
                  { backgroundColor: index % 2 === 0 ? COLOR_BASE_BOX : COLOR_BASE_LIGHT }
                ]}
              >
                <Text style={[styles.dateColumn, styles.tableCell]}>
                  {toDateString(new Date(dateSent))}
                </Text>
                <Text style={[styles.leadColumn, styles.tableCell]}>{company}</Text>
                <Text style={[styles.sizeColumn, styles.tableCell]}>{size}</Text>
                <Text style={[styles.priceColumn, styles.tableCell]}>{amount}</Text>
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

LeadsDocument.propTypes = {
  leads: PropTypes.shape([]).isRequired
};

export default LeadsDocument;
