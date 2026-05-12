import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Splash from './pages/splash';
import Cep from './pages/cep';
import Home from './pages/Home';
import Formulario from './pages/formulario';
import EditarCarro from './pages/editarcarro';
import Navbar from './components/Navbar';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.drawerLogoShell}>
          <Image source={require('./assets/PLG.png')} style={styles.drawerLogo} />
        </View>
        <Text style={styles.drawerBrand}>MOTOGP</Text>
        <Text style={styles.drawerSubtitle}>Racing Garage</Text>
      </View>

      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation, route }) => ({
          header: () => <Navbar navigation={navigation} route={route} />,
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: '#b8bac7',
          drawerActiveBackgroundColor: '#f23845',
          drawerInactiveBackgroundColor: 'transparent',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '800',
          },
          drawerItemStyle: {
            borderRadius: 16,
            marginHorizontal: 12,
            marginVertical: 5,
          },
          drawerStyle: {
            backgroundColor: '#10111b',
            width: 292,
          },
          sceneContainerStyle: {
            backgroundColor: '#0d0e16',
          },
        })}
      >
        <Drawer.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' },
          }}
        />

        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerLabel: 'Entrar',
          }}
        />

        <Drawer.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            drawerLabel: 'Cadastro',
          }}
        />

        <Drawer.Screen
          name="CEP"
          component={Cep}
          options={{
            drawerLabel: 'Buscar CEP',
          }}
        />

        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerLabel: 'Garagem',
          }}
        />

        <Drawer.Screen
          name="Formulario"
          component={Formulario}
          options={{
            drawerLabel: 'Nova Moto',
          }}
        />

        <Drawer.Screen
          name="EditarCarro"
          component={EditarCarro}
          options={{
            drawerLabel: 'Editar Moto',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flexGrow: 1,
    backgroundColor: '#10111b',
  },
  drawerHeader: {
    paddingTop: 26,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a1b28',
    backgroundColor: '#141520',
  },
  drawerLogoShell: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#181827',
    borderWidth: 2,
    borderColor: '#ff4051',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#ff4051',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 8,
  },
  drawerLogo: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    borderRadius: 28,
  },
  drawerBrand: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
  drawerSubtitle: {
    color: '#ff5362',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  drawerItems: {
    paddingTop: 8,
  },
});
