import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import globalStyles from '../styles/global';
import { Colors } from '../constants';
import CustomButton from '../components/CustomButton';
import Tasks from '../components/Tasks';
import { getTasks } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listActions';
import Icon from 'react-native-vector-icons/Ionicons';

const ListScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const { id } = route.params;
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getTasks(() => setLoading(false)));
     }, [dispatch]);

     useEffect(() =>{
        dispatch(setActiveListId(id));
     }, [dispatch, id]);

     if (loading) {
        return <ActivityIndicator color={Colors.first} size="large" style={globalStyles.loader}/>
    }
    

    return (
        <View style={styles.container}>
            <Tasks navigation={navigation} listId={id}/>
            <CustomButton text="Add new task..." icon="add" iconColor="#FFF" onPress={() => navigation.navigate('NewTask')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
});

export default ListScreen;