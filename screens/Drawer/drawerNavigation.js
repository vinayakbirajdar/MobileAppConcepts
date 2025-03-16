import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import screenB from './Screens/screenB';
import { Tabs } from '../../routes';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: { backgroundColor: "#fff", width: 250 },
                drawerActiveTintColor: "blue",
                headerShown: false,
            }}>
            <Drawer.Screen name="Tabs" component={Tabs}
                options={{
                    drawerLabel: 'Home'
                }} />

            <Drawer.Screen name="screenB" component={screenB} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;