/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => {
          props.navigation.navigate('UserForm');
        }}>
        <Avatar rounded source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <View style={{marginRight: 20}}>
            <ListItem.Chevron
              name="edit"
              size={25}
              color="orange"
              onPress={() => props.navigation.navigate('UserForm', user)}
            />
          </View>
          <ListItem.Chevron
            name="delete"
            size={25}
            color="red"
            onPress={() => confirmUserDeletion(user)}
          />
        </View>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
