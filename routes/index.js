import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';


// Import screens
import CountScreen from "../screens/countScreen";
import flatListScreen from "../screens/flatListScreen";
import Form from "../screens/formWithValidation";
import HomeScreen from "../screens/homeScreen";
import NativeElement from "../screens/nativeElement";
import ProfileScreen from "../screens/profileScreen";
import Task from "../screens/task";
import Counter from "../screens/counter";
import TodoScreen from "../screens/todoScreen";
import Gallery from "../screens/galleryScreen";
import AlbumList from "../screens/albumList";
import AlbumPhotos from "../screens/albumPhoto";
import FormElement from "../screens/FormElement";
import BottomTab from "../screens/BottomTab";
import DateTime from "../screens/DateTime";
import Animation from "../screens/Animation";
import FeedBack from "../screens/FeedBack";
import ReanimatedModal from "../screens/ModalWithAnimation";
import AnimatedBottomSheet from "../screens/bottomAnimation";
import DrawerNavigator from "../screens/Drawer/drawerNavigation";




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Deep linking 
const linking = {
    prefixes: ["myapp://"],
    config: {
        screens: {
            Main: {
                screens: {
                    Home: "home",
                    Profile: "profile",
                    Gallery: "gallery",
                },
            },
            CountScreen: "countscreen",
            FlatList: "flatlist",
            Form: "form",
            Element: "element",
            Task: "task",
            Counter: "counter",
            Todo: "todo",
            AlbumList: "albumlist",
            AlbumPhotos: "albumphotos",
            FormElement: "formelement",
            BottomTab: "bottomtab",
            DateTime: "datetime",
            Animation: "animation",
            FeedBack: "feedback"
        },
    },
};



export const Tabs = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: "#33b8e3",
                tabBarInactiveTintColor: "#888888",
                tabBarStyle: { backgroundColor: "#ffffff" },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    headerLeft: () => (
                        <Ionicons
                            name="menu"
                            size={30}
                            color="black"
                            style={{ marginLeft: 15 }}
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    // headerTitle: " ",//to avoid the text
                    headerTitleAlign: "center",
                    headerStyle: {
                        height: 55,
                    },
                    headerTitleStyle: {
                        fontSize: 29,
                        fontWeight: "bold",
                        color: "grey"
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerLeft: () => (
                        <Ionicons
                            name="menu"
                            size={30}
                            color="black"
                            style={{ marginLeft: 15 }}
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    headerTitleAlign: "center",
                    headerStyle: {
                        height: 55,
                    },
                    headerTitleStyle: {
                        fontSize: 29,
                        fontWeight: "bold",
                        color: "grey"
                    },
                }}
            />

            <Tab.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="folder" size={size} color={color} />
                    ),
                    headerLeft: () => (
                        <Ionicons
                            name="menu"
                            size={30}
                            color="black"
                            style={{ marginLeft: 15 }}
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 29,
                        fontWeight: "bold",
                        color: "grey"
                    },
                    headerStyle: {
                        height: 55,
                    },
                }}
            />
        </Tab.Navigator >
    );

};



// Root Navigator
const RootNavigator = () => {
    return (
        <Provider store={store}>
            <NavigationContainer linking={linking}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Drawer" component={DrawerNavigator} />
                    <Stack.Screen name="CountScreen" component={CountScreen} />
                    <Stack.Screen name="FlatList" component={flatListScreen} />
                    <Stack.Screen name="Form" component={Form} />
                    <Stack.Screen name="Element" component={NativeElement} />
                    <Stack.Screen name="Task" component={Task} />
                    <Stack.Screen name="Counter" component={Counter} />
                    <Stack.Screen name="Todo" component={TodoScreen} />
                    <Stack.Screen name="AlbumList" component={AlbumList} />
                    <Stack.Screen name="AlbumPhotos" component={AlbumPhotos} />
                    <Stack.Screen name="FormElement" component={FormElement} />
                    <Stack.Screen name="BottomTab" component={BottomTab} />
                    <Stack.Screen name="DateTime" component={DateTime} />
                    <Stack.Screen name="Animation" component={Animation} />
                    <Stack.Screen name="FeebBack" component={FeedBack} />
                    <Stack.Screen name="Modal" component={ReanimatedModal} />
                    <Stack.Screen name="BottomAnimate" component={AnimatedBottomSheet} />


                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default RootNavigator;