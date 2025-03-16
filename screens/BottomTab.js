import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { BottomSheet } from "@rneui/base";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";


const BottomTab = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null)

    const fetchData = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error("Cannot fetch data", error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const handleTitle = (item) => {
        setTitle(item);
        setOpen(false);
    }

    return (
        <View style={styles.main}>

            <View style={styles.heading}>
                <Text style={styles.headingText}>BottomSheet</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setOpen(true)}
            >
                <Text style={{ fontSize: 27 }}>
                    {title ? title.name : "Select user"}
                </Text>
            </TouchableOpacity>

            <View style={{ height: '40%' }}>
                <BottomSheet
                    isVisible={open}
                    onBackdropPress={() => setOpen(false)}
                    containerStyle={{ backgroundColor: "transparent" }}
                >
                    <View style={styles.BottomSheet}>
                        <FlatList
                            data={user}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleTitle(item)}>
                                    <View style={styles.content}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>🏷️  Name: {item.name}</Text>
                                        <Text style={[styles.bottomText, { fontSize: 15 }]}>✉️  Email: {item.email}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </BottomSheet>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    },
    heading: {
        // backgroundColor: '#fffaf0',
        width: '100%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20
    },
    headingText: {
        fontSize: 26,
        color: 'black',
    },
    content: {
        padding: 10,
        borderRadius: 20,
        margin: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'powderblue',
        width: '80%',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 50
    },
    BottomSheet: {
        maxHeight: 500,
        padding: 10,
        backgroundColor: '#f0f8ff',
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5
    },

    backButton: {
        position: 'absolute',
        top: -34,
        left: 10,
        marginTop: 50,
    },
});
export default BottomTab;