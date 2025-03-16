import React from "react";
import { Header, Icon } from "@rneui/base";
import { Input, Text } from "@rneui/base";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CheckBox } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';

const NativeElement = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const [checked, setChecked] = React.useState(false);

    const onSubmit = (data) => {
        if (checked === true) {
            console.log(JSON.stringify(data));
            reset();
            setChecked(false);
        } else {
            console.log('please accept terms and conditions')

        }

    };

    return (
        <View style={styles.main}>
            <View>
                <Header
                    backgroundColor="#fffaf0"
                    centerComponent={{
                        text: "Registration Form",
                        style: {
                            color: "black",
                            fontSize: 20,
                        },
                    }}
                    leftComponent={{ icon: "home", color: "black", onPress: () => { navigation.goBack() } }}
                    // rightComponent={{ icon: "home", color: "black", onPress: () => { navigation.goBack() } }}
                    containerStyle={{ width: "100%" }}
                />
            </View>
            <View style={styles.input}>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: "Name is required",
                        maxLength: 30
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                placeholder="Enter Name"
                                leftIcon={<Icon name="" size={20} />}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                errorMessage={errors.name ? errors.name.message : ""}
                            />
                        </>
                    )} />


                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+$/,
                            message: 'Email must be in lowercase and contain "@"'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                placeholder="Enter Email"
                                // leftIcon={<Icon name="at-sharp" size={20} />}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={text => onChange(text.toLowerCase())}
                                errorMessage={errors.email ? errors.email.message : ""}
                            />
                        </>
                    )} />


                <Controller
                    name="number"
                    control={control}
                    rules={{
                        pattern: {
                            value: /^(?!6|66|55|2|1|4|3|7|0)\d{10}$/,
                            message: 'Enter a valid phone number'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                placeholder="Enter Phone number"
                                // leftIcon={<Icon name="account-outline" size={20} />}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                errorMessage={errors.number ? errors.number.message : ""}
                            />

                        </>
                    )} />

                <View style={styles.agree}>
                    <CheckBox
                        checked={checked}
                        checkedColor="'blue'"
                        checkedTitle="I agree"
                        containerStyle={{ width: "75%" }}
                        onIconPress={() => setChecked(!checked)}
                        size={30}
                        textStyle={{}}
                        title="I don't agree terms"
                        titleProps={{}}
                        uncheckedColor="#F00"
                    />
                </View>
            </View>



            <View style={styles.submitBtn}>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    input: {
        padding: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30,
        margin: 20,
    },
    submitBtn: {
        marginLeft: 160,
        borderWidth: 2,
        borderColor: 'black',
        width: 80,
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'powderblue'
    },


});

export default NativeElement;