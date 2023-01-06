import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, delToCart } from "../../src/store/actions/cartActions";

const CartPage = () => {
  const items = useSelector((state) => state.items);
  const total = useSelector((state) => state.total);
  const [itemQuantities, setItemQuantities] = useState(items.map(() => 1));
  const dispatch = useDispatch();
  const decreaseItemQuantity = (item) => {
    dispatch(delToCart(item.item));
  };

  const increaseItemQuantity = (item) => {
    dispatch(addToCart(item.item));
  };
  const renderItem = (item) => {
    return (
      <View style={styles.itemStyle}>
        <View>
          <Text key={item.item.id}>{item.item.name}</Text>
          <Text style={{ color: "#1d56ff" }}>{item.item.price}₺</Text>
        </View>
        <View style={styles.counterStyle}>
          <Button title="-" onPress={() => decreaseItemQuantity(item)}></Button>
          <Text>{item.item.count}</Text>
          <Button title="+" onPress={() => increaseItemQuantity(item)}></Button>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList key={(item) => item.id} data={items} renderItem={renderItem} />
      <View style={styles.totalPrice}>
        <View>
          <Text style={{ color: "#1d56ff" }}>Total:</Text>
          <Text style={{ fontWeight: "bold" }}>{total} ₺</Text>
        </View>
        <Button title="Complete"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "5%",
    paddingHorizontal: "2%",
  },
  itemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "5%",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  counterStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    width: 100,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
  },
});

export default CartPage;
