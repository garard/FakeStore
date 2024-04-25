import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "row"
    },

    splash: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "column",
    },

    header: {
        width: "100%",
        height: "8%",
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
    },

    body: {
        backgroundColor: "lightgrey",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "82%",
        paddingTop: 10,
    },
    productView: {
        backgroundColor: "lightgrey",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        width: "100%",
        height: "10%",
        backgroundColor: "darkgrey",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",

    },
    productFooter: {
        width: "100%",
        height: "10%",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },

    image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        marginBottom: 10,
    },
    rating: {
        width: "80%",
        height: "5%",
        borderRadius: 10,
        backgroundColor: "darkgrey",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,

    },
    imageContainer: {
        flex: 1,
        position: "relative",
        resizeMode: "contain",

    },

    productImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },

    categoryDisplay: {
        fontSize: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        width: 350,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        textAlign: "center"
    },

    productDisplay: {
        height: 125,
        fontSize: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        width: 350,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: "row",
    },

    categoryText: {
        fontSize: 25,
        padding: 10,
        textAlign: "center",
    },

    productText: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        fontSize: 12,
        textAlign: "center"
    },

    infoContainer: {
        flex: 2,
        marginLeft: 10,
        justifyContent: "space-between",
    },

    price: {
        fontSize: 16,
        color: "green",
    },

    navButton: {
        marginHorizontal: 50,
        height: 50,
        width: 125,
        flexDirection: "row",
        borderRadius: 20,
        alignItems: "center",
        marginEnd: 10,
        justifyContent: "center",
        backgroundColor: '#2196F3',
    },
    productButton: {
        marginHorizontal: 50,
        height: 50,
        width: 125,
        flexDirection: "row",
        borderRadius: 20,
        alignItems: "center",
        marginEnd: 10,
        justifyContent: "center",
        backgroundColor: '#2196F3',
    },
    productDescription: {
        height: "30%",
        width: "90%",
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,
    }

});
export default Styles;