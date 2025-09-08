import React,{useState,useEffect} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Producto } from "@/interfaces/Product";
import { useRouter } from "expo-router";
/* import AsyncStorage from "@react-native-async-storage/async-storage"; */

export default function HomePage(){
    const [products, setProducts] = useState<Producto[]>([]);

    const router = useRouter();
    const handleDetailClick = (id: number) => {
        /* AsyncStorage.setItem('idProducto', String(id)); */
        /* router.push('/DetailHomePage'); */
    };
    const getProducts = async () => {
        try {
            const response = await fetch(`http://192.168.0.247:8001/product`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const productData = await response.json();
                setProducts(productData);
            } 
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProducts();
    }, [products]);
    return(
        <View style={{ flex: 1, backgroundColor: '#00C8E6' }}>
            {/* <NavBar /> */}

            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>PRODUCTOS DISPONIBLES</Text>
                
                {products.map((product) => (
                    <TouchableOpacity key={product.id} style={{ backgroundColor: '#ffffff', marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                        <View style={{ height: 200, overflow: 'hidden' }}>
                            <Image source={{ uri: product.image }} style={{ width: '50%', height: '100%', alignSelf: 'center', justifyContent: 'center' }} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{product.name.toUpperCase()}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 10 }} numberOfLines={2}>{product.description}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 10 }}>Precio: {product.price}€</Text>
                            <View  >
                                <TouchableOpacity onPress={() => handleDetailClick(product.id)}>
                                    <Text style={{ color: '#0070f3', fontSize: 16, textDecorationLine: 'none' }}>Ver detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}