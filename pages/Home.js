/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-dupe-keys */
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Dimensions} from 'react-native';
import TeslaLogo from '../img/TeslaLogo';
import BtnEngine from '../components/BtnEngine';
import Color from '../components/Color';
import {orderIdAtom} from '../atom/atom';
import {useAtom} from 'jotai/react';
import {engine, colors, colorsMenu} from '../data/data';
import {db} from '../firebase-config';
import {
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
} from 'firebase/firestore';

const {width, height} = Dimensions.get('window');

function Home() {
  const [activeColor, setActiveColor] = useState('white');
  const [activeEngine, setActiveEngine] = useState('basic');
  const [activeJant, setActiveJant] = useState(engine[activeEngine].jant[0]);
  const [orderId, setOrderId] = useAtom(orderIdAtom);
  
  const orderRef = collection(db, 'orders');

  useEffect(() => {
    setActiveJant(engine[activeEngine].jant[0].inc);
  }, [activeEngine]);

  const selectedJant = engine[activeEngine].jant.find(item => {
    return item.inc == activeJant;
  });

  const formatNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const submitOrder = async () => {
    const docRef = await addDoc(orderRef, {
      engine: {
        paket: activeEngine,
        price: engine[activeEngine].ucret,
      },
      jant: {
        inc: selectedJant.inc,
        name: selectedJant.name,
        text: selectedJant.text,
        price: selectedJant.price,
      },
      color: {
        name: colorsMenu[activeColor].name,
        price: colorsMenu[activeColor].price,
      },
    });
    setOrderId(docRef.id);
  };

  const total =
    colorsMenu[activeColor].price +
    engine[activeEngine].ucret +
    selectedJant?.price;

  return (
    <SafeAreaView style={{backgroundColor: '#F1EFEF'}}>
      <StatusBar />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TeslaLogo />
            <Text>TR</Text>
          </View>
          <View style={styles.banner}>
            <Text style={{fontSize: 18}}>
              Önceden Konfigüre Edilmiş Araçlar
            </Text>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              Fiyat düzenlemeleri, siparişten sonraki yedi gün içinde teslim
              alındığında geçerlidir.
            </Text>
            <Text>Uygunluğu Kontrol Et</Text>
          </View>
          <Image
            source={{
              uri: 'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY09,$PPSW,$WY20P,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=1&crop=1300,450,300,300&',
            }}
            style={styles.carImg}
          />
          <View style={styles.center}>
            <Text style={styles.title}>Model Y</Text>
            <Text style={{fontSize: 16}}>
              Tahmini Teslimat: Oca 2024 – Şub 2024
            </Text>
          </View>
          <View style={styles.between}>
            <TouchableOpacity>
              <View>
                <Text>{engine[activeEngine].km} km</Text>
                <Text>Menzil (WLTP)</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text>{engine[activeEngine].hiz} km/h</Text>
              <Text>Azami Hız</Text>
            </View>
            <View>
              <Text>{engine[activeEngine].sn} sn</Text>
              <Text>0-100 km/s</Text>
            </View>
          </View>
          <Text style={{marginVertical: 5}}>Arkadan İtiş</Text>
          <View
            style={[
              styles.btnEngine,
              activeEngine == 'basic' ? styles.activeEngine : '',
            ]}>
            <TouchableOpacity
              onPress={() => {
                setActiveEngine('basic');
              }}>
              <BtnEngine
                text1="Model Y"
                text2={formatNumber(engine.basic.ucret)}
              />
            </TouchableOpacity>
          </View>
          <Text style={{marginVertical: 5}}>Çift Motorlu Dört Çeker</Text>
          <View
            style={[
              styles.btnEngine,
              activeEngine == 'long' ? styles.activeEngine : '',
            ]}>
            <TouchableOpacity
              onPress={() => {
                setActiveEngine('long');
              }}>
              <BtnEngine
                text1="Model Y Long Range"
                text2={formatNumber(engine.long.ucret)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.btnEngine,
              activeEngine == 'performance' ? styles.activeEngine : '',
            ]}>
            <TouchableOpacity
              onPress={() => {
                setActiveEngine('performance');
              }}>
              <BtnEngine
                text1="Model Y Performance"
                text2={formatNumber(engine.performance.ucret)}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 13,
              textAlign: 'center',
            }}>
            Görüntülenen fiyatlar tahminidir. ÖTV ve KDV hariçtir.
          </Text>
          <View style={styles.center}>
            <Text
              style={{
                backgroundColor: 'gray',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 3,
              }}>
              Öne Çıkanlar
            </Text>
          </View>
          <Image
            source={{
              uri: colorsMenu[activeColor].img
            }}
            style={styles.carImg}
          />
          <View style={styles.center}>
            <Text style={styles.title}>Renk</Text>
          </View>
          <View style={styles.between}>
            {colors.map((color, index) => (
              <TouchableOpacity
                onPress={() => {
                  setActiveColor(color);
                }}
                key={index}>
                <Color color={color} active={activeColor} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.center}>
            <Text style={styles.title2}>{colorsMenu[activeColor].name}</Text>
            <Text style={styles.title2}>
              {formatNumber(colorsMenu[activeColor].price)} ₺
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Jantlar</Text>
          </View>

          <View style={styles.center2}>
            {engine[activeEngine].jant.map(e => (
              <TouchableOpacity
                onPress={() => {
                  setActiveJant(e.inc);
                }}
                style={activeJant == e.inc ? styles.activeJant : ''}>
                <View
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    backgroundColor: 'gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                  }}>
                  <Text style={{color:"white"}}>{e.inc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text>{selectedJant?.name}</Text>
            <Text>{selectedJant?.text}</Text>
            <Text>
              {selectedJant?.price && formatNumber(selectedJant?.price)} ₺
            </Text>
          </View>

          <Button
            title={orderId ? 'Satın Alındı' : 'Satın Al'}
            disabled={orderId ? true : false}
            onPress={() => submitOrder()}
          />

          <View style={styles.center}>
            <Text style={styles.title}>Seçili Parçalar</Text>
          </View>
          <View>
            <Text>Engine: {formatNumber(engine[activeEngine].ucret)} ₺</Text>
            <Text>Color: {formatNumber(colorsMenu[activeColor].price)} ₺</Text>
            <Text>
              Jant: {selectedJant?.price && formatNumber(selectedJant?.price)} ₺
            </Text>
            <Text>Toplam: {formatNumber(total)} ₺</Text>
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.float}>
        <TouchableOpacity onPress={<Basket />}>
          <Text>Toplam Ücret: </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    maxwidth: width,
    marginHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  banner: {
    height: 140,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  btnEngine: {
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    columnGap: 10,
    marginVertical: 5,
  },
  carImg: {
    height: 140,
    marginTop: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  activeEngine: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'blue',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  basket: {},
  float: {
    position: 'absolute',
    height: (height * 8) / 100,
    width: width,
    bottom: 0,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  activeJant: {
    borderWidth: 4,
    borderRadius: 50,
    borderColor: 'blue',
  },
});

export default Home;
