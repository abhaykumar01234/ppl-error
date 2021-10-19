/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { VpComponents } from '@vp-components';
import { COLOR_BASE_BRAND_PRIMARY } from '@tokens/variables';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const SA_LOGO_URL =
  'https://capterra.s3.amazonaws.com/assets/images/logos/softwareadvice-logo-286x46.png';

const styles = StyleSheet.create({
  shared: {
    fontSize: 10,
    fontWeight: 800
  },
  main: {
    paddingHorizontal: 40,
    paddingVertical: 15
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
    width: 150,
    height: 20
  },
  paymentInfoWrapper: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 15,
    lineHeight: 1.5
  },
  paymentInfoHeader: {
    fontStyle: 'italic',
    marginTop: '30px',
    marginBottom: '10px'
  },
  paymentInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  infoBlocks: {
    display: 'block',
    width: '50%'
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  paymentInfoField: {
    width: '35%'
  },
  paymentInfoValue: {
    maxWidth: '50%'
  }
});

const PDFDocument = ({ vendorName, paymentInfo }) => {
  const { contact, amount, vendorId, creationDay, name, purchaseOrder } = paymentInfo || {};
  const paymentDetails = [
    {
      'Received From:': vendorName || '',
      'Customer #:': vendorId || '',
      'Busniess Contact:': contact ? contact.fullName : '',
      'Purchase Order:': purchaseOrder || ''
    },
    {
      'Date:': creationDay || '',
      'Payment Method:': name ? name.split('Payment - ')[1] : '',
      'Amount(US$)': amount ? VpComponents.formatCurrency(amount) : ''
    }
  ];

  return (
    <Document>
      <Page style={styles.shared}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image src={SA_LOGO_URL} />
          </View>
          <Text>RECEIPT FOR PAYMENT</Text>
        </View>
        <View style={styles.paymentInfoWrapper}>
          <View>
            <Text>Software Advice</Text>
            <Text>P.O. Box 733143</Text>
            <Text>Dallas, TX 75373-3143</Text>
          </View>
          <View>
            <Text style={styles.paymentInfoHeader}>Payment for lead generation services</Text>
            <View style={styles.paymentInfo}>
              {paymentDetails.map((payment, i) => (
                <View key={i} style={styles.infoBlocks}>
                  {Object.entries(payment).map(([key, value], i) => (
                    <View key={i} style={styles.fieldRow}>
                      <Text style={styles.paymentInfoField}>{key}</Text>
                      <Text style={styles.paymentInfoValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

PDFDocument.propTypes = {
  vendorName: PropTypes.string.isRequired,
  paymentInfo: PropTypes.shape({
    vendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    creationDay: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    paymentOrder: PropTypes.number,
    contact: PropTypes.shape({
      fullName: PropTypes.string
    })
  }).isRequired
};

export default PDFDocument;
