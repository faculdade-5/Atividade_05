import { Alert } from "react-native";
import { Item } from "../models/Item";

class ItemService {
    private items: Item[] = [
        { id: '1', title: 'Item Exemplo 1' },
        { id: '2', title: 'Item Exemplo 2' },
    ];
    
    private generateId = () => Date.now().toString();

    public addItem = (inputText: string) => {
        if (!inputText.trim()) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        const newItem: Item = {
            id: this.generateId(),
            title: inputText.trim(),
        };

        this.items.push(newItem);
    };

    public updateItem = (inputText: string, editingItem: Item) => {
        if (!inputText.trim() || !editingItem) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        this.items = this.items.map(item =>
            item.id === editingItem.id
                ? { ...item, title: inputText.trim() }
                : item
        );
    };

    public deleteItem = (editingItem: Item) => {
        if (!editingItem) return;

        this.items = this.items.filter(item => item.id !== editingItem.id);
    };

    public getItems = () => {
        return this.items;
    };
}

export default new ItemService();