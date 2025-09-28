import { FlatList, Image, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Chip, Divider, List, Text } from 'react-native-paper';
import { PokemonController } from "../controller/PokemonController";
import { Pokemon } from "../models/Pokemon";

export const ListPage = () => {
    const { 
        pokemons, 
        loading, 
        error, 
        refreshPokemons, 
        loadMorePokemons,
        showStats,
        showTypes,
        showAbilities
    } = PokemonController();


    const renderItem = ({ item }: { item: Pokemon }) => {
        
        return (
            <Card style={styles.card} mode="outlined">
                <List.Item
                    title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    description={`#${item.id.toString().padStart(3, '0')}`}
                    titleStyle={[styles.titleText, { fontSize: 16 }]}
                    descriptionStyle={[styles.descriptionText, { fontSize: 14 }]}
                    left={() => (
                        <View style={[styles.imageContainer, { width: 60, height: 60 }]}>
                            <Image
                                source={{ uri: item.image }}
                                style={[styles.pokemonImage, { width: 50, height: 50 }]}
                                resizeMode="contain"
                            />
                        </View>
                    )}
                    right={() => (
                        <View style={[styles.rightContent, { minWidth: 200 }]}>
                            {item.types && showTypes && (
                                <View style={styles.typesContainer}>
                                    {item.types.slice(0, 2).map((type, index) => (
                                        <Chip 
                                            key={index}
                                            style={[styles.typeChip, { height: 24 }]} 
                                            textStyle={[styles.typeText, { fontSize: 10 }]}
                                        >
                                            {type.name}
                                        </Chip>
                                    ))}
                                </View>
                            )}
                            {item.stats && showStats && (
                                <View style={styles.statsContainer}>
                                    <Chip 
                                        style={[styles.statChip, { height: 24 }]} 
                                        textStyle={[styles.statText, { fontSize: 10 }]}
                                    >
                                        HP: {item.stats.hp}
                                    </Chip>
                                    <Chip 
                                        style={[styles.statChip, { height: 24 }]} 
                                        textStyle={[styles.statText, { fontSize: 10 }]}
                                    >
                                        ATK: {item.stats.attack}
                                    </Chip>
                                </View>
                            )}
                            {item.height && item.weight && (
                                <View style={styles.detailsContainer}>
                                    <Text style={[
                                        styles.detailText, 
                                        { fontSize: 10 }
                                    ]}>
                                        📏 {(item.height / 10).toFixed(1)}m
                                    </Text>
                                    <Text style={[
                                        styles.detailText, 
                                        { fontSize: 10 }
                                    ]}>
                                        ⚖️ {(item.weight / 10).toFixed(1)}kg
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                />
            </Card>
        );
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" />
                <Text style={styles.loadingText}>Carregando mais Pokémons...</Text>
            </View>
        );
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text variant="headlineSmall" style={styles.errorTitle}>
                    Erro ao carregar Pokémons
                </Text>
                <Text variant="bodyMedium" style={styles.errorMessage}>
                    {error}
                </Text>
            </View>
        );
    }

    const containerPadding = 16;
    const titleFontSize = 24;

    return (
        <View style={[styles.container, { padding: containerPadding }]}>
            <View style={styles.header}>
                <Text 
                    variant="headlineMedium" 
                    style={[
                        styles.title, 
                        { fontSize: titleFontSize }
                    ]}
                >
                    Pokédex
                </Text>
            </View>

            <FlatList
                data={pokemons}
                renderItem={renderItem}
                keyExtractor={item => `pokemon-${item.id}-${item.name}`}
                contentContainerStyle={[
                    styles.listContainer, 
                    { paddingBottom: 20 }
                ]}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshPokemons}
                        colors={['#1976d2']}
                        tintColor="#1976d2"
                    />
                }
                onEndReached={loadMorePokemons}
                onEndReachedThreshold={0.3}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={true}
                removeClippedSubviews={true}
                maxToRenderPerBatch={15}
                updateCellsBatchingPeriod={50}
                initialNumToRender={15}
                windowSize={15}
                getItemLayout={(data, index) => {
                    const itemHeight = 100;
                    return {
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    };
                }}
                numColumns={2}
                key={'phone'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        textAlign: 'center',
        color: '#1976d2',
        fontWeight: 'bold',
    },
    titleText: {
        fontWeight: 'bold',
    },
    descriptionText: {
        color: '#666',
    },
    listContainer: {
        // paddingBottom será definido dinamicamente
    },
    card: {
        marginVertical: 4,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    rightContent: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginBottom: 4,
    },
    typeChip: {
        margin: 2,
        backgroundColor: '#e3f2fd',
    },
    typeText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    detailsContainer: {
        alignItems: 'flex-end',
        marginTop: 4,
    },
    detailText: {
        color: '#666',
        marginVertical: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    statChip: {
        margin: 2,
    },
    statText: {
        // fontSize será definido dinamicamente
    },
    divider: {
        marginVertical: 4,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    pokemonImage: {
        // width e height serão definidos dinamicamente
    },
    idChip: {
        marginRight: 8,
    },
    footerLoader: {
        padding: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorTitle: {
        color: '#d32f2f',
        marginBottom: 8,
    },
    errorMessage: {
        color: '#666',
        textAlign: 'center',
    },
});
