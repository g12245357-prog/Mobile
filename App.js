import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Splash from './pages/splash';
import Cep from './pages/cep';

export default function App(){

const Drawer = createDrawerNavigator();

return(

<NavigationContainer>
  <Drawer.Navigator initialRouteName='Splash'>
   
    {/* SPLASH - com as 3 linhas para não aparecer no menu */}
    <Drawer.Screen
      name='Splash'
      component={Splash}
      options={{
        headerTransparent: true,
        headerTitle: "",
        drawerLabel: () => null,
        drawerItemStyle: { display: 'none' },
        swipeEnabled: false,
      }}
    />
   
    {/* OUTRAS TELAS - tudo normal */}
    <Drawer.Screen
      name='Login'
      component={Login}
    />
   
    <Drawer.Screen
      name='Cadastro'
      component={Cadastro}
    />

    <Drawer.Screen
      name='CEP'
      component={Cep}
    />
   
  </Drawer.Navigator>
</NavigationContainer>

)

}