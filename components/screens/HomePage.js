import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getLocalData } from "../../src/store/actions/cartActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomMultiPicker from "react-native-multiple-select-list";
import RadioGroup from "react-native-radio-buttons-group";

export default function HomePage({ navigation, route }) {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const items = useSelector((state) => state.items);
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1",
      label: "Old to new",
      value: "Oldtonew",
    },
    {
      id: "2",
      label: "New to old",
      value: "Newtoold",
    },
    {
      id: "3",
      label: "Price hight to low",
      value: "Pricehighttolow",
    },
    {
      id: "4",
      label: "Price low to hight",
      value: "Pricelowtohight",
    },
  ]);

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  };

  const applyFilters = () => {
    let filteredData = initialData;
    if (radioButtons[0].selected) {
      filteredData = filteredData.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    if (radioButtons[1].selected) {
      filteredData = filteredData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (radioButtons[2].selected) {
      filteredData = filteredData.sort((a, b) => b.price - a.price);
    }
    if (radioButtons[3].selected) {
      filteredData = filteredData.sort((a, b) => a.price - b.price);
    }
    setData(filteredData);
    setModalVisible(false);
  };

  const getLocalStorage = async () => {
    const value = (await AsyncStorage.getItem("items")) ?? null;
    if (value !== null) {
      dispatch(getLocalData(JSON.parse(value)));
    }
  };

  useEffect(() => {
    fetchData();
    getLocalStorage();
  }, []);

  const pressHandler = (item) => {
    navigation.navigate("Detail", { item });
  };

  const addToCartButtonPress = async (item) => {
    dispatch(addToCart(item.item));
    await AsyncStorage.setItem("items", JSON.stringify(items));
  };

  const handleSearchChange = (text) => {
    setSearchText(text);

    setData(
      initialData.filter((item) =>
        item.name.toUpperCase().includes(text.toUpperCase())
      )
    );
  };
  const getMoreItem = () => {
    setInterval(() => {
      setData(initialData.slice(0, data.length + 12));
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => pressHandler(item)}>
          <Image source={{ uri: item.item.image }} style={styles.image} />

          <View style={styles.item}>
            <Text>{item.item.price} ₺</Text>
            <Text>{item.item.name}</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Add to Cart"
          onPress={() => addToCartButtonPress(item)}
        />
      </View>
    );
  };

  const fetchData = () => {
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((resp) => {
        setData(resp.data.slice(0, 12));
        setInitialData(resp.data);
        setBrands({
          ...resp.data
            .map((value) => {
              return value.brand;
            })
            .filter((value, index, self) => self.indexOf(value) === index),
        });
        setModels({
          ...resp.data
            .map((value) => {
              return value.model;
            })
            .filter((value, index, self) => self.indexOf(value) === index),
        });
      });
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={false}
        onEndReached={getMoreItem}
        ListHeaderComponent={
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <SearchBar
              placeholder="Search"
              lightTheme
              round
              onChangeText={handleSearchChange}
              value={searchText}
            />
            <View style={styles.filterModalLoc}>
              <Text style={{ fontSize: 24 }}>Filters:</Text>
              <TouchableOpacity
                style={styles.filterModalStyle}
                onPress={() => setModalVisible(true)}
              >
                <Text>Select Filter</Text>
              </TouchableOpacity>
              <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View>
                  <Text style={{ paddingLeft: "2%" }}>Sort By</Text>

                  <View style={styles.radioBoxStyle}>
                    <RadioGroup
                      radioButtons={radioButtons}
                      onPress={onPressRadioButton}
                    />
                  </View>
                  <Text style={styles.horizontalLine}>Brand</Text>
                  <CustomMultiPicker
                    options={brands}
                    search={true}
                    multiple={true}
                    placeholder={"Search"}
                    placeholderTextColor={"#757575"}
                    returnValue={"label"}
                    callback={(res) => {}}
                    rowBackgroundColor={"#eee"}
                    rowHeight={45}
                    rowRadius={5}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={130}
                    selected={[1, 2]}
                  />
                  <Text style={styles.horizontalLine}>Model</Text>
                  <CustomMultiPicker
                    options={models}
                    search={true}
                    multiple={true}
                    placeholder={"Search"}
                    placeholderTextColor={"#757575"}
                    returnValue={"label"}
                    callback={(res) => {}}
                    rowBackgroundColor={"#eee"}
                    rowHeight={45}
                    rowRadius={5}
                    iconColor={"#00a2dd"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle-outline"}
                    unselectedIconName={"ios-radio-button-off-outline"}
                    scrollViewHeight={130}
                    selected={[1, 2]}
                  />
                  <View style={styles.applyAndClose}>
                    <TouchableOpacity onPress={() => applyFilters()}>
                      <Text style={{ color: "#1d56ff" }}>Apply Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={{ color: "#1d56ff" }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
    backgroundColor: "#fff",
    padding: "5%",
    paddingHorizontal: "2%",
  },
  item: {
    margin: "5%",
  },
  image: {
    height: 150,
    width: 150,
    margin: "5%",
  },
  filterModalLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "2%",
    paddingLeft: "2%",
  },
  filterModalStyle: {
    backgroundColor: "#d9d9d9",
    height: 25,
    width: 100,
    alignItems: "center",
  },
  radioBoxStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  applyAndClose: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#d9d9d9",
    height: 30,
    alignItems: "center",
    marginTop: "5%",
  },
  horizontalLine: {
    borderTopColor: "black",
    borderTopWidth: 0.5,
    paddingLeft: "2%",
    paddingTop: "2%",
  },
});
