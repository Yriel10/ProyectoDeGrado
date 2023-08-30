import React from "react";
import { Page, Document, Text, View, StyleSheet,Image } from "@react-pdf/renderer";
import IMG from "../Assest/imagenes/nombreFarmaciasinfondo.png";
import Cookies from "universal-cookie";

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

const PdfFactura = () => {
  const cookies = new Cookies();
  const nombres = cookies.get("nombres");
  const apellidos = cookies.get("apellidos");
  const carrito = JSON.parse(localStorage.getItem("dataCarrito"));
  const total = JSON.parse(localStorage.getItem("cartTotal"));
  const fechaActual = new Date();
  const formattedDate = `${fechaActual.getDate()}/${
    fechaActual.getMonth() + 1
  }/${fechaActual.getFullYear()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>
            <Image alt="" src={IMG} width={70} /> Jehova Rapha
          </Text>
          <Text style={styles.subheader}>FACTURA</Text>
          <Text style={styles.text}>Fecha: {formattedDate}</Text>
          <Text style={styles.text}>Comprador: {nombres + " " + apellidos}</Text>
          <Text style={styles.text}>Total: ${total}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.text}>Cantidad</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.text}>Concepto</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.text}>Precio unitario</Text>
              </View>
            </View>
            {carrito.map((item) => (
              <View style={styles.tableRow} key={item.idMedicamento}>
                <View style={styles.tableCol}>
                  <Text style={styles.text}>{item.cantidad}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.text}>{item.nombre}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.text}>${item.precio}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.text}>
            "LA ALTERACIÓN, FALSIFICACIÓN O COMERCIALIZACIÓN ILEGAL DE ESTE
            DOCUMENTO ESTÁ PENADO POR LA LEY"
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfFactura;
