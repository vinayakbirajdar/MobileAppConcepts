import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Navigation, Platform } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@rneui/base";
import { increment, decrement, reset } from "../redux/counterSlice";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // <-- import this



const Counter = () => {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();
    const navigation = useNavigation()

    return (
        <View style={style.main}>

            <View style={style.header}>
                <TouchableOpacity style={style.backButton} onPress={() => navigation.pop()}>
                    <Icon name="arrow-back" size={30} color="black" />

                </TouchableOpacity>
                <Text style={style.headtext}>Counter With Redux</Text>

            </View>


            <View>
                <Text style={style.text}>The count is {count}</Text>

                <View style={style.btns}>
                    <Button
                        title={'Increment'}
                        onPress={() => { dispatch(increment()) }}
                        style={{ margin: 20 }}
                    />
                </View>


                <View style={style.btns}>
                    <Button
                        title={'Decrement'}
                        onPress={() => { dispatch(decrement()) }}
                        style={{ margin: 20 }}
                    />
                </View>

                <View style={style.btns}>
                    <Button
                        title={'Reset'}
                        onPress={() => { dispatch(reset()) }}
                        style={{ margin: 20 }}
                    />

                </View>


            </View>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',

    },
    subCon: {
        margin: 20
    },
    text: {
        fontSize: 30,
        margin: 30
    },
    backButton: {
        position: 'absolute',
        top: -30,
        left: 20,
        marginTop: 50
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        padding: 20,
        alignItems: 'center',
        width: '100%',
    },
    headtext: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 40
    },
    btns: {
        marginVertical: Platform.OS === 'ios' ? 0 : 20
    }

})


export default Counter;