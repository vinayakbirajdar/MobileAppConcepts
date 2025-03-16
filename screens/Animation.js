import React, { useState } from "react";
import { TextInput, View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming } from "react-native-reanimated";

import { Header } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";


const BounceButton = () => {

    const navigation = useNavigation();

    // Bouncing button starts here
    const scale = useSharedValue(1);

    const onPressIn = () => {
        scale.value = withSpring(1.7); // Shrinks slightly
    };

    const onPressOut = () => {
        scale.value = withSpring(1, { damping: 2, stiffness: 200 }); // Bounces back
    };

    const Bouncing = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    // Bouncing button ends here

    // shaking button starts here
    const rotate = useSharedValue(0);

    const onPress = () => {
        rotate.value = withSequence(
            withTiming(10, { duration: 100 }),  // Tilt right fast
            withTiming(-10, { duration: 100 }), // Tilt left fast
            withTiming(7, { duration: 100 }),  // Back to right fast
            withTiming(-7, { duration: 100 }), // Back to left fast
            withTiming(0, { duration: 100 })   // Return to original position
        );
    };

    const shaking = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));
    // shaking button ends here

    // Expanding button starts here

    const expand = useSharedValue(150)

    const ExpandPress = () => {
        expand.value = withSpring(expand.value === 150 ? 250 : 150)
    }

    const ReduceExpandPress = () => {
        expand.value = withSpring(expand.value === 250 ? 150 : 150)
    }

    const expanding = useAnimatedStyle(() => ({
        width: expand.value
    }))
    // Expanding ends here

    // mutiple option button starts here
    const MultiWidth = useSharedValue(60)
    const [isExpand, setIsExpand] = useState(false)

    const toggleExpand = () => {
        MultiWidth.value = withSpring(MultiWidth.value === 60 ? 150 : 60)
        // MultiWidth.value = withTiming(MultiWidth.value === 60 ? 150 : 60, { duration: 200 });
        setIsExpand(!isExpand)//always change the isexpand value 
    }

    const mutiButton = useAnimatedStyle(() => ({
        width: MultiWidth.value
    }))

    // mutiple option button ends here

    // search bar starts here

    const searchWidth = useSharedValue(90)


    const searchAnimatedStyle = useAnimatedStyle(() => ({
        width: searchWidth.value
    }))

    const [islong, setIslong] = useState(false)

    const toggle = () => {

        if (islong) {
            searchWidth.value = withTiming(60, { duration: 300 })
        }
        else {
            searchWidth.value = withTiming(360, { duration: 300 })
        }
        setIslong(!islong);
    }



    return (
        <View style={{ flex: 1 }}>


            <Header
                backgroundColor="#f0ebeb"
                centerComponent={{
                    text: "Animations",
                    style: { color: "black", fontSize: 25, fontWeight: 'bold' }
                }}
                containerStyle={{ width: "100%" }}
                leftComponent={{ icon: "home", color: "black", size: 30, onPress: () => { navigation.goBack() } }}
            />

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <View style={{ marginVertical: 10 }}>
                    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
                        <Animated.View
                            style={[
                                { width: 200, height: 60, backgroundColor: "blue", justifyContent: "center", alignItems: "center", borderRadius: 10 },
                                Bouncing,
                            ]}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>Press Me</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>


                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={onPress}>
                        <Animated.View
                            style={[
                                { width: 200, height: 60, backgroundColor: "green", justifyContent: "center", alignItems: "center", borderRadius: 10 },
                                shaking,
                            ]}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>Shake Me</Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>


                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPressIn={ExpandPress} onPressOut={ReduceExpandPress}>

                        <Animated.View
                            style={[
                                { width: 200, height: 60, backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 10 },
                                expanding
                            ]}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Press me</Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity onPress={toggleExpand}>
                        <Animated.View
                            style={[{
                                height: 60,
                                backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30
                            }, mutiButton]}
                        >
                            <Text style={{ fontSize: 20, color: 'white' }}>{isExpand ? "close" : "+"}</Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical: 10 }}>

                    <Animated.View
                        style={[{
                            height: 70,
                            backgroundColor: 'powderblue',
                            marginTop: 30,
                            borderRadius: 20,
                            alignItems: 'flex-end',
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }, searchAnimatedStyle]}>
                        {islong && <TextInput
                            placeholder="Search here"
                            style={{ width: '90%', borderRadius: 10, borderColor: 'white', padding: 15, fontSize: 20 }}
                        />}
                        <TouchableOpacity onPress={toggle} >
                            <Text style={{ fontSize: 30, marginRight: 4, marginBottom: 4 }}>🔍</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>


        </View>

    );
};

export default BounceButton;