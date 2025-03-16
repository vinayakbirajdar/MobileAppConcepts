import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Platform, RefreshControl } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const Gallery = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, SetRefresh] = useState(true)

    const fetchApi = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = "https://jsonplaceholder.typicode.com/albums";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to load data");
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
            SetRefresh(false)

        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const onRefresh = () => {
        SetRefresh(true)
        setTimeout(() => {
            fetchApi()
        }, 2000);
    }

    return (
        <View style={styles.main}>
            {/* <View style={styles.head}>
                <Text style={styles.headText}>📂 API Data</Text>
            </View> */}

            <View style={{ paddingHorizontal: 15 }}>
                {loading && <ActivityIndicator size="large" color="blue" />}

                {error && <Text style={styles.errorText}>❌ Error: {error}</Text>}

                {!loading && !error && (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (

                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>📌 {item.title}</Text>
                                <Text style={styles.cardText}>🆔 ID: {item.id}</Text>
                                <Text style={styles.cardText}>👤 User ID: {item.userId}</Text>
                            </View>
                        )}

                        refreshControl={<RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            colors={["#FF5733", "#33FF57", "#3357FF"]}
                            tintColor={'blue'}
                        />}

                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        marginTop: Platform.OS === "ios" ? 50 : 0,
        flex: 1,
    },
    head: {
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 20,
    },
    headText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2A9D8F",
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
        margin: 5,
    },
});

export default Gallery;