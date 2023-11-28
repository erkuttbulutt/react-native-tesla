import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useEffect} from 'react';
import {db} from '../firebase-config';
import {
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  getDoc,
  query,
  documentId,
  where,
} from 'firebase/firestore';
import {orderDetailAtom, orderIdAtom} from '../atom/atom';
import {useAtom} from 'jotai/react';
import OrderLogo from '../img/OrderLogo';
import BuyLogo from '../img/BuyLogo';

// const firebaseRef = firebase.database().ref('orders');

const Order = () => {
  const [orderId, setOrderId] = useAtom(orderIdAtom);
  const [orderDetail, setOrderDetail] = useAtom(orderDetailAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);
        setOrderDetail(docSnap.data());
      } catch (err) {
        console.log(err);
      }
    };
    if (orderId) {
      fetchData();
    }

    return () => {
      orderId == '';
    };
  }, [orderId]);

  console.log(orderId, 'orderID');
  console.log(orderDetail, 'orderDetail');

  return (
    <View style={{padding: 20}}>
      {orderDetail ? (
        <View>
          <Text style={{fontSize: 20}}>Motor Bilgileri :</Text>
          <Text>Paket: {orderDetail.engine.paket}</Text>
          <Text>Ücret: {orderDetail.engine.price}</Text>
          <Text style={{fontSize: 20}}>Renk Bilgileri :</Text>
          <Text>Renk: {orderDetail.color.name}</Text>
          <Text>Ücret: {orderDetail.color.price}</Text>
          <Text style={{fontSize: 20}}>Jant Bilgileri :</Text>
          <Text>İnc: {orderDetail.jant.inc}</Text>
          <Text>Adı: {orderDetail.jant.name}</Text>
          <Text>Ücret: {orderDetail.jant.price}</Text>
          <Text>Detay: {orderDetail.jant.text}</Text>
          <Text>
            Toplam Ücret:{' '}
            {orderDetail.engine.price +
              orderDetail.color.price +
              orderDetail.jant.price}
          </Text>
          <Button
            title="Siparişi İptal Et"
            onPress={() => {
              setOrderId('');
              setOrderDetail('');
            }}
          />
        </View>
      ) : (
        <Text>Sipariş Yok</Text>
      )}
    </View>
  );
};

export default Order;
