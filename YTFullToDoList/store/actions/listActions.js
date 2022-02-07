import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_LISTS, SET_ACTIVE_LIST_ID } from '../types';
import { STORAGE_KEYS } from '../../constants';
import store from '../';

// Getting lists
export const getLists = (onSuccess = () => {}, onError = () => {}) => {
    return async dispatch => {
        try {
            const listRes = await AsyncStorage.getItem(STORAGE_KEYS.lists);
            const lists = listRes ? JSON.parse(listRes) : [];

            dispatch({
                type: SET_LISTS,
                payload: lists,
            });
            onSuccess();
        }
        catch (err){
            console.log(err);
            onError();
        }
    };
};


// Creating lists
export const createList = (name, onSuccess = () => {}, onError = () => {}) => {
    return async dispatch => {
        try {
            const newList = {
                name,
                id: `list-${new Date().getTime()}`,

            };

            const { lists } = store.getState().list;
            const listsCopy = [...lists];
            listsCopy.push(newList);
            await AsyncStorage.setItem(STORAGE_KEYS.lists, JSON.stringify(listsCopy))

            dispatch({
                type: SET_LISTS,
                payload: listsCopy,
            });
            onSuccess();
        }
        catch (err){
            console.log(err);
            onError();
        }
    };
};

//Creating Delete List Action
export const deleteList = (id, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
        const { lists } = store.getState().list;
        
        const listsCopy = [...lists];
        const filteredLists = listsCopy.filter(l => l.id !== id);
        await AsyncStorage.setItem(STORAGE_KEYS.lists, JSON.stringify(filteredLists));

        dispatch({
            type: SET_LISTS,
            payload: filteredLists,
        });
        onSuccess();
    } catch (err) {
        console.log(err);
        onError();
        }
    };
};

//Setting active list id
export const setActiveListId = (id) => {
    return {
        type: SET_ACTIVE_LIST_ID,
        payload: id,
    };
};