import React from 'react';
import { View, Alert, ToastAndroid, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import AddListScreen from '../screens/AddListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import ListScreen from '../screens/ListScreen';
import TaskScreen from '../screens/TaskScreen';
import { Colors } from '../constants';
import { deleteList } from '../store/actions/listActions'

const Stack = createNativeStackNavigator();

const defaultStyles = {
    headerStyle: {
        backgroundColor: Colors.first,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: 'Poppins-Regular',
    }, 
}


const TasksNavigator = () => {
    const dispatch = useDispatch();
    const deleteListClickHandler = (id, navigation) => {
        Alert.alert(
            'Delete list',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => deleteListHandler(id, navigation) },
                { text: 'No'}
            ]
        );
    };

    const deleteListHandler = (id, navigation) => {
        dispatch(deleteList (id, () => {
            navigation.goBack();
            ToastAndroid.show('List successfully erased.', ToastAndroid.LONG);
        }));
    };


    return(
        <Stack.Navigator>
            <Stack.Screen
             name="Home"
             component={HomeScreen}
             options={{ ...defaultStyles, title: 'To Do Lists', headerTitleAlign: 'center'}}
            
            />
            <Stack.Screen
             name="NewList"
             component={AddListScreen}
             options={{...defaultStyles, title: 'Add new list'}}
            
            />
            <Stack.Screen
             name="List"
             component={ListScreen}
             options={( {route, navigation} ) => ({
                 ...defaultStyles, 
                 title: route.params.name,
                 headerRight: () => (
                     <View>
                         <Icon
                            name='md-trash'
                            color="#fff"
                            size={30}
                            onPress={() => deleteListClickHandler(route.params.id, navigation)}
                         />
                     </View>
                 )
            })}
            />
            <Stack.Screen
             name="NewTask"
             component={AddTaskScreen}
             options={{...defaultStyles, title: 'Add new task'}}
            
            />
            <Stack.Screen
             name="Task"
             component={TaskScreen}
             options={{...defaultStyles, title: 'Update task'}}
            
            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TasksNavigator/>
        </NavigationContainer>
    );
};

export default AppNavigator;