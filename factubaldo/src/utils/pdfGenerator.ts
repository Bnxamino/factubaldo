import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Invoice } from '../types/invoice';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
  },
});

interface PDFProps {
  invoice: Invoice;
}

const PDFGenerator = ({ invoice }: PDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Factura #{invoice.id}</Text>
          <Text style={styles.text}>Cliente: {invoice.clientName}</Text>
          <Text style={styles.text}>Fecha: {invoice.date}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Items:</Text>
          {invoice.items.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.description} - {item.quantity} x {item.unitPrice} = {item.total}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Total: {invoice.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export const PDFDownload = ({ invoice }: PDFProps) => (
  <PDFDownloadLink document={<PDFGenerator invoice={invoice} />} fileName={`invoice_${invoice.id}.pdf`}>
    {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
  </PDFDownloadLink>
);