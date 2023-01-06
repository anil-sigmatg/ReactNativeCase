import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/store/actions/cartActions";

export default function DetailPage({ route }) {
  const { item } = route.params;
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const addToCartButtonPress = (item) => {
    dispatch(addToCart(item.item));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.item.image }} style={styles.imageDetail} />

      <View style={styles.itemDetail}>
        <Text style={{ fontWeight: "bold" }}>{item.item.name}</Text>
        <Text numberOfLines={9}>{item.item.description}</Text>
      </View>
      <View style={styles.DetailPriceAndAdd}>
        <View>
          <Text style={{ color: "#1d56ff" }}>Price:</Text>

          <Text style={{ fontWeight: "bold" }}>{item.item.price} ₺</Text>
        </View>
        <Button
          title="Add to Cart"
          onPress={() => addToCartButtonPress(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: "5%",
    paddingHorizontal: "2%",
  },
  itemDetail: {
    margin: "5%",
  },
  imageDetail: {
    height: 300,
    width: 350,
  },
  DetailPriceAndAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
  },
});
