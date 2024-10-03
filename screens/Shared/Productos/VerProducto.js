import { Dimensions, TouchableOpacity, StyleSheet, View, Text, Image, Button, Pressable, SafeAreaView, ScrollView, StatusBar, Modal} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';


const VerProducto = (id) => {
    DATA = {
        'id': 1,
        "nombre_vino": "Gran Reserva Merlot",
        "cepa_vino": "Merlot",
        "pais_origen": "Chile",
        "pais_destino": "EE.UU.",
        "fecha_cosecha": "2018-04-15",
        "fecha_produccion": "2019-01-10",
        "capacidad_ml": 750,
        "grado_alcoholico": 13.5,
        "azucar_gr": 1.2,
        "sulfuros_mg_l": 35.0,
        "densidad_g_ml": 0.995,
        "tipo_capsula": "PVC",
        "tipo_etiqueta": "Estándar",
        "color_botella": "Verde",
        "medalla": true,
        "color_capsula": "Rojo",
        "tipo_corcho": "Natural",
        "tipo_botella": "Bordelesa",
        "altura_botella_mm": 30,
        "ancho_botella_mm": 8,
        "unidad_medida_etiqueta": "cc",
        "medida_etiqueta_corcho": 7,
        "medida_etiqueta_base": 10,
        "activo": true,
        "fecha_registro": "2024-09-04 10:30:00",
        "idioma": "Español",
        "descripcion_capsula": "Cápsula de PVC color rojo"

    }
    const VinoEjemplo = require('../../../assets/images/VinoEjemplo.jpg')
    const iconEditarProducto = require('../../../assets/icons/editarProducto.png')
    const iconPausa = require('../../../assets/icons/iconPausa.png')
    const iconBuscador = require('../../../assets/icons/iconBuscador.png')
    return (

        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
                <Image source={VinoEjemplo} style={styles.image} />

                <View style={styles.containerInfo} >
                    <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{DATA.nombre_vino}</Text>
                            <Text style={{ fontSize: 10 }}>CODIGO: {DATA.id}</Text>
                            <Text style={{ fontSize: 10 }}>COD. VE: {DATA.id}</Text>

                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>

                            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={iconEditarProducto} style={{ width: 20, height: 20 }} />
                                <Text style={{ fontSize: 8, }}>EDITAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={iconPausa} style={{ width: 20, height: 20 }} />
                                <Text style={{ fontSize: 8, }}>DESACTIVAR</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                    <Text style={{ fontSize: 14 }}>Codigo VE: {DATA.id}</Text>
                    <Text style={{ fontSize: 14 }}>Cepa: {DATA.cepa_vino}</Text>
                    <Text style={{ fontSize: 14 }}>País de Origen: {DATA.pais_origen}</Text>
                    <Text style={{ fontSize: 14 }}>País de Destino: {DATA.pais_destino}</Text>
                    <Text style={{ fontSize: 14 }}>Fecha de Cosecha: {DATA.fecha_cosecha}</Text>
                    <Text style={{ fontSize: 14 }}>Fecha de Producción: {DATA.fecha_produccion}</Text>
                    <Text style={{ fontSize: 14 }}>Capacidad: {DATA.capacidad_ml} ml</Text>
                    <Text style={{ fontSize: 14 }}>Grado Alcohólico: {DATA.grado_alcoholico}%</Text>
                    <Text style={{ fontSize: 14 }}>Azúcar: {DATA.azucar_gr} g</Text>
                    <Text style={{ fontSize: 14 }}>Sulfuros: {DATA.sulfuros_mg_l} mg/L</Text>
                    <Text style={{ fontSize: 14 }}>Densidad: {DATA.densidad_g_ml} g/ml</Text>
                    <Text style={{ fontSize: 14 }}>Tipo de Capsula: {DATA.tipo_capsula}</Text>
                    <Text style={{ fontSize: 14 }}>Tipo de Etiqueta: {DATA.tipo_etiqueta}</Text>
                    <Text style={{ fontSize: 14 }}>Color de la Botella: {DATA.color_botella}</Text>
                    <Text style={{ fontSize: 14 }}>Medalla: {DATA.medalla ? 'Sí' : 'No'}</Text>
                    <Text style={{ fontSize: 14 }}>Color de la Capsula: {DATA.color_capsula}</Text>
                    <Text style={{ fontSize: 14 }}>Tipo de Corcho: {DATA.tipo_corcho}</Text>
                    <Text style={{ fontSize: 14 }}>Tipo de Botella: {DATA.tipo_botella}</Text>
                    <Text style={{ fontSize: 14 }}>Altura de la Botella: {DATA.altura_botella_mm} mm</Text>
                    <Text style={{ fontSize: 14 }}>Ancho de la Botella: {DATA.ancho_botella_mm} mm</Text>
                    <Text style={{ fontSize: 14 }}>Unidad de Medida de la Etiqueta: {DATA.unidad_medida_etiqueta}</Text>
                    <Text style={{ fontSize: 14 }}>Medida de la Etiqueta (Corcho): {DATA.medida_etiqueta_corcho} {DATA.unidad_medida_etiqueta}</Text>
                    <Text style={{ fontSize: 14 }}>Medida de la Etiqueta (Base): {DATA.medida_etiqueta_base} {DATA.unidad_medida_etiqueta}</Text>
                    <Text style={{ fontSize: 14 }}>Fecha de Registro: {DATA.fecha_registro}</Text>
                    <Text style={{ fontSize: 14 }}>Idioma: {DATA.idioma}</Text>
                    <Text style={{ fontSize: 14 }}>Descripción de la Capsula: {DATA.descripcion_capsula}</Text>




                </View>
            </ScrollView>

            <TouchableOpacity style={styles.ButtonCirculoAtras}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <FontAwesomeIcon icon={faArrowLeftLong} size={38} color="white" />
                        <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 22 }}>Registros</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonRealizarControl}   >
                <Text style={{ color: 'white', }}>
                    REALIZAR CONTROL

                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.botonBuscadorFlotante} >
                <Image source={iconBuscador} style={{ width: 30, height: 30 }} resizeMode='contain' />

            </TouchableOpacity>

            {/* Modal para seleccionar el tipo de estado */}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Seleccionar Filtro por Estado</Text>
                        <TouchableOpacity onPress={() => filterDataByState('Aprobado')} style={styles.modalButton}>
                            <Text>Aprobado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => filterDataByState('Rechazado')} style={styles.modalButton}>
                            <Text>Rechazado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => filterDataByState('Reproceso')} style={styles.modalButton}>
                            <Text>Reproceso</Text>
                        </TouchableOpacity>

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => resetFilter()}>
                                <Text style={{ fontSize: 14, color: '#260202', textTransform: 'uppercase' }}>Restablecer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ fontSize: 14, color: '#bf6565', textTransform: 'uppercase' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>


        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
    },

    ButtonCirculoAtras: {
        position: 'absolute',
        top: -50,
        left: -50,
        zIndex: 1
    },

    CirculoAtras: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#270403',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

    },
    scroll: {
        width: '100%',
        height: '100%',
    },

    containerInfo: {
        padding: 25,
        paddingBottom: 100,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    botonRealizarControl: {
        position: 'absolute',
        bottom: 20,
        left: '10%',

        width: '80%',
        height: 50,
        backgroundColor: '#270403',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    }, botonBuscadorFlotante: {
        position: 'absolute',
        top: 30,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: '#270403',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }

})

export default VerProducto;