import { FlatList, Image, RefreshControl, StyleSheet, View, useWindowDimensions } from "react-native";
import { ActivityIndicator, Card, Chip, Divider, List, Text } from 'react-native-paper';
import { PokemonController } from "../controller/PokemonController";
import { Pokemon } from "../models/Pokemon";

export const ListPage = () => {
    const { pokemons, loading, error, refreshPokemons, loadMorePokemons, showStats, showTypes } = PokemonController();
    const { width, height } = useWindowDimensions();
    const isTablet = width >= 768;
    const numColumns: number = 1;
    const containerPadding = isTablet ? 20 : 16;
    const titleFontSize = isTablet ? 28 : 24;
    const imageSize = numColumns >= 4 ? 45 : numColumns === 3 ? 50 : 60;
    const imageBoxSize = imageSize + 10;
    const rightMinWidth = numColumns >= 4 ? 120 : numColumns === 3 ? 140 : 160;
    const itemHeight = isTablet ? 110 : 100;

    const renderItem = ({ item }: { item: Pokemon }) => {
        
        return (
            <Card style={styles.card} mode="outlined">
                <List.Item
                    title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    description={`#${item.id.toString().padStart(3, '0')}`}
                    titleStyle={[styles.titleText, { fontSize: 16 }]}
                    descriptionStyle={[styles.descriptionText, { fontSize: 14 }]}
                    left={() => (
                        <View style={[styles.imageContainer, { width: imageBoxSize, height: imageBoxSize }]}>
                            <Image
                                source={{ uri: item.image }}
                                style={[styles.pokemonImage, { width: imageSize, height: imageSize }]}
                                resizeMode="contain"
                            />
                        </View>
                    )}
                    right={() => (
                        <View style={[styles.rightContent, { minWidth: rightMinWidth }]}>
                            {item.types && showTypes && (
                                <View style={styles.typesContainer}>
                                    {item.types.slice(0, 2).map((type, index) => (
                                        <Chip 
                                            key={index}
                                            style={[styles.typeChip]} 
                                        >
                                            {type.name}
                                        </Chip>
                                    ))}
                                </View>
                            )}
                            {item.stats && showStats && (
                                <View style={styles.statsContainer}>
                                    <Chip 
                                        style={[styles.statChip]} 
                                    >
                                        HP: {item.stats.hp}
                                    </Chip>
                                    <Chip 
                                        style={[styles.statChip]} 
                                    >
                                        ATK: {item.stats.attack}
                                    </Chip>
                                </View>
                            )}
                            {item.height && item.weight && (
                                <View style={styles.detailsContainer}>
                                    <Text style={[
                                        styles.detailText, 
                                        { fontSize: 14 }
                                    ]}>
                                        📏 {(item.height / 10).toFixed(1)}m
                                    </Text>
                                    <Text style={[
                                        styles.detailText, 
                                        { fontSize: 14 }
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
                contentContainerStyle={{ paddingBottom: 20 }}
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
                    return {
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    };
                }}
                numColumns={numColumns}
                columnWrapperStyle={undefined}
                key={`cols-${numColumns}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingRight: 16,
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
    card: {
        borderRadius: 10,
        flex: 1,
        marginVertical: 4,
        backgroundColor: '#fff',
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
    
    divider: {
        marginVertical: 4,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    pokemonImage: {},
    
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
