import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const DateTime = () => {
    const [date, setDate] = useState(new Date());
    const [openDAte, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [show, setShow] = useState(false)
    const [time, setTime] = useState(new Date());
    const navigation = useNavigation()

    const handleDate = (selectedDate) => {
        setOpenDate(false);
        setDate(selectedDate);
    };
    const handleTime = (selectedTime) => {
        setOpenTime(false);
        setTime(selectedTime);
    };

    const handleCancelDate = () => {
        setOpenDate(false);
    };

    const handleCancelTime = () => {
        setOpenTime(false);
    };

    return (
        <View style={styles.main}>

            <View style={styles.head}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black' }}> Date And Time </Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => setOpenDate(true)} style={styles.btn}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Set date</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOpenTime(true)} style={styles.btn}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Set Time</Text>
                </TouchableOpacity>


            </View>


            <TouchableOpacity onPress={() => setShow(true)} style={styles.btn}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Show data</Text>
            </TouchableOpacity>


            <View style={{ maxHeight: 400, backgroundColor: 'red' }}>
                <BottomSheet
                    isVisible={show}
                    onBackdropPress={() => setShow(false)}
                >
                    <View style={styles.container}>
                        <Text style={styles.dateText}>📅  Date: {date.toLocaleDateString()}</Text>
                        <Text style={styles.dateText}>⏱️  Time: {time.toLocaleTimeString()}</Text>
                    </View>


                </BottomSheet>


            </View>

            <DatePicker
                modal
                open={openDAte}
                date={date}
                mode="date"
                onConfirm={handleDate}
                onCancel={handleCancelDate}
            />

            <DatePicker
                modal
                open={openTime}
                date={time}
                mode="time"
                onConfirm={handleTime}
                onCancel={handleCancelTime}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        // marginTop: 60,
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
        alignItems: 'center',
        // padding: 20,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    head: {
        width: '100%',
        alignItems: 'center',
        // backgroundColor: '#fffaf0',
        padding: 20,
        // borderRadius: 20
    },
    backButton: {
        position: 'absolute',
        top: -32,
        left: 10,
        marginTop: 50,
    },
    btn: {
        borderWidth: 1,
        backgroundColor: 'powderblue',
        padding: 10,
        borderRadius: 20,
        width: '30%',
        alignItems: 'center',
        marginTop: 60,

    },
    container: {
        width: '100%',
        margin: 20,
        borderBottomWidth: 2,
        marginBottom: 90

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginTop: 20,
    },
});

export default DateTime;