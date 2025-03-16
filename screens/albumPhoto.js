import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator, RefreshControl } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

const AlbumPhotos = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { albumId } = route.params;
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [refresh, SetRefresh] = useState(false)

    const fetchPhotos = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            if (!response.ok) {
                throw new Error('Unable to fetch data!!')
            }
            const result = await response.json();
            setPhotos(result);
        } catch (error) {
            console.error("Error fetching photos", error);
            setError(error.message)
        }
        finally {
            setLoading(false)
            SetRefresh(false)
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const onRefresh = () => {
        SetRefresh(true)
        setTimeout(() => {
            fetchPhotos()
        }, 2000);
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headertext}>ID: {albumId}</Text>

            </View>

            {/* Back Button (No Changes) */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            {loading && <ActivityIndicator size={'large'} color={'blue'} />}
            {error && <Text style={{ fontSize: 20, alignSelf: 'center', color: 'red' }}>❌ Error{error}</Text>}

            <View style={{ padding: 15 }}>
                {!loading && !error && (<FlatList
                    data={photos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/female-profile-8187681-6590623.png?f=webp" }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={<RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refresh}
                        colors={["#FF5733", "#33FF57", "#3357FF"]}

                        tintColor={'blue'}
                    />}
                />)}


            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15,
        backgroundColor: "#F4F4F9",
        // marginTop: 70,
        marginTop: Platform.OS === 'ios' ? 50 : 0
    },
    header: {
        width: '100%',
        padding: 10

    },

    headertext: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2A2A2A",
    },

    listContainer: {
        paddingBottom: 20,
    },

    photoContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },

    image: {
        width: 70,
        height: 90,
        borderRadius: 15,
        marginRight: 15,
        borderWidth: 3,
        borderColor: "#ddd",
        resizeMode: "cover",
    },

    title: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
    },

    backButton: {
        position: 'absolute',
        top: -40,
        left: 5,
        marginTop: 50,
    },
});

export default AlbumPhotos;