import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const AlbumList = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refresh, SetRefresh] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch("https://jsonplaceholder.typicode.com/albums");
            if (!response.ok) {
                throw new Error('Unable to fetch data')
            }
            const result = await response.json();
            setData(result);

        } catch (error) {
            console.error("Unable to fetch", error);
            setError(error.message)
        }
        finally {
            setLoading(false)
            SetRefresh(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        SetRefresh(true)
        setTimeout(() => {
            fetchData()
        }, 3000)

    }



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.head}>
                <Text style={styles.headtext}>Album ID List</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="blue" />}
            {error && <Text style={{ fontSize: 20, alignSelf: 'center', color: 'red' }}>❌ Error: {error}</Text>}

            {!loading && !error && (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("AlbumPhotos", { albumId: item.id })}>
                            <View style={styles.cards}>
                                <Text style={styles.subText}>Album ID: {item.id}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            tintColor={'blue'}
                            colors={["#FF5733", "#33FF57", "#3357FF"]}
                            size='large'
                        />
                    }
                />
            )}



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8F9",
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        paddingHorizontal: 5,
    },
    cards: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        marginVertical: 12,
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        borderBottomColor: "#fffaf0",
        borderBottomWidth: 1,
    },
    head: {
        marginBottom: 15,
        width: '100%',
        padding: 15,
        alignItems: 'center',
        // backgroundColor: "#fffaf0",
        borderRadius: 15,
        position: 'relative',
    },
    headtext: {
        fontSize: 28,
        color: "black",
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 18,
        color: "black",
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 1,
    },
    list: {
        paddingBottom: 20,
    },
});

export default AlbumList;