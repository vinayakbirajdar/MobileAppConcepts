import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FormScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>

                <View style={style.main}>
                    {console.log(errors)
                    }


                    <View style={style.head}>
                        <Text style={style.headtext}>Registration form</Text>
                        <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={style.inputCon}>
                        <Controller
                            name="userName"
                            control={control}
                            rules={{
                                required: 'Name is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <TextInput
                                        placeholder="Enter name"
                                        style={style.input}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.userName && (
                                        <Text style={style.errorText}>{errors.userName.message}</Text>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <TextInput
                                        placeholder="Enter Email"
                                        style={style.input}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                    {errors.email && (
                                        <Text style={style.errorText}>{errors.email.message}</Text>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <TextInput
                                        placeholder="Enter Password"
                                        style={style.input}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                    />
                                    {errors.password && (
                                        <Text style={style.errorText}>{errors.password.message}</Text>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            name="number"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Enter a valid phone number',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Phone number must be at least 10 digits'
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Phone number must be at least 10 digits'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <TextInput
                                        placeholder="Enter Phone number"
                                        style={style.input}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                    />
                                    {errors.number && (
                                        <Text style={style.errorText}>{errors.number.message}</Text>
                                    )}
                                </>
                            )}
                        />

                        <View style={style.submitCon}>
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={style.submitBtn}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </KeyboardAvoidingView>





        </SafeAreaView>

    );
};

const style = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        // margin: 20,
        // marginTop: 60,
        marginTop: Platform.OS === 'ios' ? 25 : 1,
        alignItems: 'center',
    },
    head: {
        // marginTop: 60,
        marginTop: Platform.OS === 'ios' ? 10 : 1,
        // backgroundColor: '#fffaf0',
        padding: 20,
        alignItems: 'center',
        width: '100%',
        // borderRadius: 20
    },
    headtext: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 30
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    inputCon: {
        flex: 2,
        width: '90%',
        margin: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    submitBtn: {
        alignItems: 'center',
        borderWidth: 2,
        width: 90,
        marginLeft: 120,
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
    },
    backButton: {
        position: 'absolute',
        top: -30,
        left: 10,
        marginTop: 50,
    },
});

export default FormScreen;