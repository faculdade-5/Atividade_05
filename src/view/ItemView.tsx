import { Formik } from 'formik';
import { FlatList, StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Divider,
    FAB,
    IconButton,
    List,
    Modal,
    Portal,
    Text,
    TextInput
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { ItemController } from "../controller/ItemController";
import { Item } from "../models/Item";

// Schema de validação
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'O título deve ter pelo menos 2 caracteres')
    .max(50, 'O título deve ter no máximo 50 caracteres')
    .required('O título é obrigatório'),
});

export const ItemView = () => {
    const { items, openAddModal, modalVisible, editingItem, closeModal, deleteItem, updateItem, addItem, openEditModal } = ItemController();

    const renderItem = ({ item }: { item: Item }) => (
        <Card style={styles.card} mode="outlined">
            <List.Item
                title={item.title}
                right={(props) => (
                    <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() => openEditModal(item)}
                    />
                )}
            />
        </Card>
    );

    const handleSubmit = (values: { title: string }, { resetForm }: any) => {
        try {
            if (editingItem) {
                updateItem(values.title, editingItem);
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Item atualizado com sucesso!',
                });
            } else {
                addItem(values.title);
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Item adicionado com sucesso!',
                });
            }
            resetForm();
            closeModal();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Ocorreu um erro ao salvar o item.',
            });
        }
    };

    const handleDelete = (item: Item) => {
        try {
            deleteItem(item);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Item excluído com sucesso!',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Ocorreu um erro ao excluir o item.',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Lista de Itens
            </Text>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={openAddModal}
            />

            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={closeModal}
                    contentContainerStyle={styles.modalContainer}
                >
                    <Card>
                        <Card.Title title={editingItem ? 'Editar Item' : 'Novo Item'} />
                        <Card.Content>
                            <Formik
                                initialValues={{ title: editingItem?.title || '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <TextInput
                                            label="Título do Item"
                                            value={values.title}
                                            onChangeText={handleChange('title')}
                                            onBlur={handleBlur('title')}
                                            error={touched.title && !!errors.title}
                                            mode="outlined"
                                            style={styles.input}
                                        />
                                        {touched.title && errors.title && (
                                            <Text variant="bodySmall" style={styles.errorText}>
                                                {errors.title}
                                            </Text>
                                        )}

                                        <View style={styles.buttonContainer}>
                                            <Button
                                                mode="outlined"
                                                onPress={closeModal}
                                                style={styles.button}
                                            >
                                                Cancelar
                                            </Button>

                                            {editingItem && (
                                                <Button
                                                    mode="contained"
                                                    buttonColor="#d32f2f"
                                                    onPress={() => handleDelete(editingItem)}
                                                    style={styles.button}
                                                >
                                                    Excluir
                                                </Button>
                                            )}

                                            <Button
                                                mode="contained"
                                                onPress={() => handleSubmit()}
                                                style={styles.button}
                                            >
                                                {editingItem ? 'Salvar' : 'Adicionar'}
                                            </Button>
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 100, // Espaço para o FAB
    },
    card: {
        marginVertical: 4,
        backgroundColor: '#fff',
    },
    divider: {
        marginVertical: 4,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    input: {
        marginBottom: 8,
    },
    errorText: {
        color: '#d32f2f',
        marginBottom: 16,
        marginTop: -8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
});