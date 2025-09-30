import { useEffect, useState } from "react";
import { Item } from "../models/Item";
import ItemService from "../service/ItemService";

export const ItemController = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        const allItems = ItemService.getItems();
        setItems([...allItems]);
    };

    const addItem = (inputText: string) => {
        ItemService.addItem(inputText);
        loadItems();
        setModalVisible(false);
    }

    const closeModal = () => {
        setEditingItem(null);
        setModalVisible(false);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setModalVisible(true);
    };

    const openEditModal = (item: Item) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const deleteItem = (item: Item) => {
        ItemService.deleteItem(item);
        loadItems();
        setModalVisible(false);
    }

    const updateItem = (inputText: string, editingItem: Item) => {
        ItemService.updateItem(inputText, editingItem);
        loadItems();
        setModalVisible(false);
    }

    return {
        items,
        addItem,
        closeModal,
        openAddModal,
        openEditModal,
        editingItem,
        modalVisible,
        deleteItem,
        updateItem
    };
}

export default ItemController;