import React, { useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import api from "../services/Api";
import isEqual from "lodash/isEqual";
// import {
//     getProductById,
//     insertProduct,
//     getSections,
//     updateProduct
// } from  '../database/Database'

const  activeColor = '#6100ed';

const Form = ({isCreate = true, id = "0"}) => {
    const [name, onChangeName] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [price, onChangePrice] = React.useState("");
    const [photoUrl, onChangePhotoUrl] = React.useState("");
    const [isLoading, onChangeIsLoading] = React.useState(false);
    const [sectionList, onChangeSectionList] = React.useState([]);
    const [sectionId, onChangeSectionId] = React.useState();

    useEffect(async () => {
        if (!isCreate && !isEqual(id, "0")) {
            await getQuadro();
        }

        // local
        // getSections(onChangeSectionList);

        // api rest
        const response = await api.get('/select/selectsections');
        onChangeSectionList(response.data.data)
    }, []);

    const getQuadro = async () => {
        // API REST
        const response = await api.get(
            '/products/getbyid',
            {
                headers: {
                    'id': id
                }
            }
        );

        const {
            name,
            description,
            price,
            photoUrl,
            sectionId,
        } = response.data.data


        if(response.data.status) {
            onChangeName(name);
            onChangeDescription(description);
            onChangePrice(price.toString());
            onChangePhotoUrl(photoUrl);
            onChangeSectionId(sectionId);
        }

        // LOCAL
        // getProductById((data) => {
        //     const {
        //         name,
        //         description,
        //         price,
        //         photoUrl,
        //         sectionId,
        //     } = data
        //
        //     onChangeName(name);
        //     onChangeDescription(description);
        //     onChangePrice(price.toString());
        //     onChangePhotoUrl(photoUrl);
        //     onChangeSectionId(sectionId);
        // }, id);

    }

    const save = async () => {
        // LOCAL
        // onChangeIsLoading(true);
        // await insertProduct({
        //     name: name,
        //     description: description,
        //     price: parseFloat(price),
        //     sectionId: sectionId,
        //     photoUrl: photoUrl
        // });
        //
        // onChangeIsLoading(false);
        // onChangeName("");
        // onChangeDescription("");
        // onChangePrice("");
        // onChangePhotoUrl("");

        // API REST
        const response = await api.post('/products/insert', {
            name: name,
            description: description,
            price: parseFloat(price),
            sectionId: sectionId,
            photoUrl: photoUrl
        });
        onChangeIsLoading(false);
        if(response.data.status) {
            onChangeName("");
            onChangeDescription("");
            onChangePrice("");
            onChangePhotoUrl("");
        }
    }

    const edit = async () => {
        // LOCAL
        // onChangeIsLoading(true);
        // updateProduct({
        //     id: parseInt(id),
        //     name: name,
        //     description: description,
        //     price: parseFloat(price),
        //     sectionId: 1,
        //     photoUrl: photoUrl
        // });
        // onChangeIsLoading(false);

        // API REST
        onChangeIsLoading(true);
        const response = await api.put('/products/update', {
            id: parseInt(id),
            name: name,
            description: description,
            price: parseFloat(price),
            sectionId: 1,
            photoUrl: photoUrl
        });
        onChangeIsLoading(false);
    }

    const {
        input,
        title,
        button,
        container
    } = styles;

    return (
        <View style={container}>
            {
                isCreate
                    ? <Title style={title}>Novo Quadro</Title>
                    : <Title style={title}>Editar Quadro</Title>
            }
            <TextInput
                label="Nome"
                style={input}
                onChangeText={onChangeName}
                value={name}
                activeUnderlineColor={activeColor}
            />
            <TextInput
                style={input}
                onChangeText={onChangeDescription}
                value={description}
                label="Descri????o"
                activeUnderlineColor={activeColor}
            />
            <TextInput
                style={input}
                onChangeText={onChangePrice}
                value={price}
                label="Pre??o"
                keyboardType="numeric"
                activeUnderlineColor={activeColor}
            />
            <Dropdown
                label='Se????o'
                data={sectionList}
                // baseColor="#694fad"
                dropdownOffset={{top: 15, left: 50}}
                containerStyle={{
                    backgroundColor: 'white',
                    margin: 11,
                    // padding: 10,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}
                onChangeText={onChangeSectionId}
                value={sectionId}
            />
            <TextInput
                style={input}
                onChangeText={onChangePhotoUrl}
                value={photoUrl}
                label="Url da Imagem"
                activeUnderlineColor={activeColor}
            />
            <Button
                mode="contained"
                onPress={() => isCreate
                    ? save()
                    : edit()
                }
                color='#6100ed'
                style={button}
                loading={isLoading}
            >Salvar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 12
    },
    title: {
        textAlign: 'center',
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        padding: 5,
        margin: 15
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});

export default Form;