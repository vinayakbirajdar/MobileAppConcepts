// Screens/HomeScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <>
            {/* Heading view start */}
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Assignments</Text>
            </View> */}
            {/* Heading view ends  */}

            {/* Scroll behaviour starts which includes screens */}
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.mainContent}>
                    {[
                        { title: 'Use of State', screen: 'CountScreen' },
                        { title: 'Component Use with Style', screen: 'Profile' },
                        { title: 'Use of Flat List', screen: 'FlatList' },
                        { title: 'Form With Validation', screen: 'Form' },
                        { title: 'React-Native Elements', screen: 'Element' },
                        { title: 'Task', screen: 'Task' },
                        { title: 'Counter Using Redux', screen: 'Counter' },
                        { title: 'Todo Using Redux', screen: 'Todo' },
                        { title: 'Album List', screen: 'AlbumList' },
                        { title: 'Form Element', screen: 'FormElement' },
                        { title: 'Bottom Tab', screen: 'BottomTab' },
                        { title: 'Date and Time', screen: 'DateTime' },
                        { title: 'Animations', screen: 'Animation' },
                        { title: 'Feed Back', screen: 'FeedBack' },
                        { title: 'Modal with animation', screen: 'Modal' },
                        { title: 'Bottom sheet with animation', screen: 'BottomAnimate' }

                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {/* Scroll ends */}
        </>
    );
};

const styles = StyleSheet.create({
    // style for the whole screen
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 20,
        marginBottom: 20
    },
    // style for the header
    header: {

        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: Platform.OS === 'ios' ? 50 : 1,
        alignItems: 'center'
    },
    // style gor header text
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },
    mainContent: {
        width: '90%',
        alignItems: 'center',
    },
    // button styles
    button: {
        backgroundColor: '#264653',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 8,
        width: '100%',
    },
    // button text
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default HomeScreen;