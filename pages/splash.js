import { useEffect } from "react";
import { ImageBackground, Image ,StyleSheet} from "react-native";



export default function Splash({navigation}){

    useEffect(()=>{

    const time = setTimeout(()=>{

        
    navigation.navigate("Login");

    },3000)


    return ()=>clearTimeout(time);

    },[])

     return(



        // <ImageBackground source={{uri:'../assets/moto.webp'}}>

<ImageBackground source={require('../assets/moto.webp')}style={style.imgBack}>

<Image source={require('../assets/PLG.png')}style={style.imglogo} /> 


</ImageBackground>



    )



}

const style = StyleSheet.create({

imgBack:{

flex:1,
justifyContent:"flex-end",
alignItems:"center",

},

imglogo:{
width:400,
height:200,
marginBottom:100

}

})