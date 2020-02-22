import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from '../screens/Home';
import PersonalInfo from '../screens/PersonalInfo';
import BackgroundInfo from '../screens/BackgroundInfo';
import Dashboard from '../screens/Dashboard';
import Symptoms from "../screens/Symptoms";
import Investigations from "../screens/Investigations";
import Comorbidities from "../screens/Comorbidities";
import Test from "../screens/Test";
import Diagnosis from "../screens/Diagnosis";
import SelectPatient from "../screens/SelectPatient";
import Login from '../screens/Login';
import Register from '../screens/Register';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        },
    },
    Login: {
        screen: Login
     },
    Register: {
        screen: Register
     },
    PersonalInfo: {
        screen: PersonalInfo,
        navigationOptions: {
            headerTitle: 'New Patient',
        }
    },
    BackgroundInfo: {
        screen: BackgroundInfo,
        navigationOptions: {
            headerTitle: 'New Patient',
        }
    },
    SelectPatient: {
        screen: SelectPatient,
        navigationOptions: {
            header: () => null,
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            headerTitle: 'Patient Home',
        }
    },
    Symptoms: {
        screen: Symptoms,
        navigationOptions: {
            headerTitle: 'Symptoms',
        }
    },
    Comorbidities: {
        screen: Comorbidities,
        navigationOptions: {
            headerTitle: 'Comorbidities',
        }
    },
    Investigations: {
        screen: Investigations,
        navigationOptions: {
            headerTitle: 'Investigations',
            headerTitleStyle: {
                alignSelf: 'center',
            }
        }
    },
    Diagnosis: {
        screen: Diagnosis,
        navigationOptions: {
            headerTitle: 'Diagnosis',
        },
    },
    Test: {
        screen: Test,
        navigationOptions: {
            headerTitle: 'Testing',
        },
    }
}, {
    headerMode: 'screen',
});

const MainRoute = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: () => null,
        }
    },
    Home: HomeStack,
}, {
    mode: 'screen',
    headerMode: 'none',
});

export default createAppContainer(MainRoute);