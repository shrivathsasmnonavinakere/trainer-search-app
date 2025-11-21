import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

const restaurants = [
  {
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Margherita', price: '$8.99', image: 'https://via.placeholder.com/100' },
      { name: 'Pepperoni', price: '$9.99', image: 'https://via.placeholder.com/100' },
      { name: 'Chicken Masala Pizza', price: '$11.50', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Sushi World',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'California Roll', price: '$7.50', image: 'https://via.placeholder.com/100' },
      { name: 'Salmon Nigiri', price: '$10.00', image: 'https://via.placeholder.com/100' },
      { name: 'Dragon Roll', price: '$12.00', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Burger Hub',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Classic Beef Burger', price: '$8.50', image: 'https://via.placeholder.com/100' },
      { name: 'Cheese Burst', price: '$9.00', image: 'https://via.placeholder.com/100' },
      { name: 'Spicy Chicken Burger', price: '$9.50', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Taco Town',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Chicken Tacos', price: '$6.50', image: 'https://via.placeholder.com/100' },
      { name: 'Beef Tacos', price: '$7.00', image: 'https://via.placeholder.com/100' },
      { name: 'Veggie Tacos', price: '$5.50', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Pasta Point',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Alfredo Pasta', price: '$9.00', image: 'https://via.placeholder.com/100' },
      { name: 'Arrabiata', price: '$8.50', image: 'https://via.placeholder.com/100' },
      { name: 'Pesto Pasta', price: '$9.50', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Salad Stop',
    image: 'https://images.unsplash.com/photo-1464306076886-debede6bbf09?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Greek Salad', price: '$6.50', image: 'https://via.placeholder.com/100' },
      { name: 'Caesar Salad', price: '$7.00', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Steak House',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Ribeye Steak', price: '$18.00', image: 'https://via.placeholder.com/100' },
      { name: 'Grilled Chicken', price: '$12.00', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Seafood Shack',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Fried Calamari', price: '$9.00', image: 'https://via.placeholder.com/100' },
      { name: 'Grilled Salmon', price: '$14.00', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Dessert Den',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Chocolate Lava Cake', price: '$5.50', image: 'https://via.placeholder.com/100' },
      { name: 'Ice Cream Sundae', price: '$4.50', image: 'https://via.placeholder.com/100' },
    ],
  },
  {
    name: 'Vegan Vibes',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    dishes: [
      { name: 'Vegan Bowl', price: '$8.00', image: 'https://via.placeholder.com/100' },
      { name: 'Tofu Stir Fry', price: '$9.00', image: 'https://via.placeholder.com/100' },
    ],
  },
];

export default function QuickDelivery() {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [upiVisible, setUpiVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [upiApp, setUpiApp] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [problemReport, setProblemReport] = useState('');
  const [restaurantFeedbacks, setRestaurantFeedbacks] = useState({});
  const [pendingFeedbackRestaurant, setPendingFeedbackRestaurant] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  const openMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setMenuItems(restaurant.dishes || []);
    setMenuVisible(true);
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    Alert.alert('Added to cart', `${item.name} has been added to your cart.`);
  };

  const computeCartTotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceString = item.price || '$0';
      const priceValue = priceString.replace(/[^0-9.]/g, '');
      return sum + (parseFloat(priceValue) || 0) * (item.quantity || 1);
    }, 0);
  };

  const handlePayment = (method) => {
    setSelectedPayment(method);
    
    if (method === 'UPI') {
      setPaymentVisible(false);
      setUpiVisible(true);
      return;
    }

    if (method === 'Cash on Delivery') {
      addOrderToHistory({ paymentMethod: 'Cash on Delivery' });
      setOrderStatus('Order placed successfully!');
      Alert.alert('Order placed', 'Your order has been placed (Cash on Delivery).');
      
      setTimeout(() => {
        setOrderStatus('Order reached your location!');
        Alert.alert(
          'Notification',
          'Food reached your location. Did you receive the order?',
          [
            { 
              text: 'Yes', 
              onPress: () => {
                setFeedback('');
                setFeedbackVisible(true);
              } 
            },
            { 
              text: 'No', 
              onPress: () => {
                Alert.alert('Sorry', 'Sorry for your inconvenience — order will be delivered soon');
              } 
            }
          ]
        );
      }, 10000);
    } else if (method === 'Debit Card') {
      Alert.alert('Notification', 'Processing card payment...');
      setTimeout(() => {
        addOrderToHistory({ paymentMethod: 'Debit Card' });
        setOrderStatus('Order placed successfully!');
        Alert.alert('Order placed', 'Payment successful. Your order has been placed.');
        
        setTimeout(() => {
          setOrderStatus('Order reached your location!');
          Alert.alert(
            'Notification',
            'Food reached your location. Did you receive the order?',
            [
              { 
                text: 'Yes', 
                onPress: () => { 
                  setFeedback('');
                  setFeedbackVisible(true); 
                } 
              },
              { 
                text: 'No', 
                onPress: () => { 
                  Alert.alert('Sorry', 'Sorry for your inconvenience — order will be delivered soon'); 
                } 
              }
            ]
          );
        }, 10000);
      }, 3000);
    }
    setPaymentVisible(false);
  };

  const addOrderToHistory = (opts = {}) => {
    const items = cartItems.length ? cartItems : (menuItems || []);
    const total = items.reduce((sum, item) => {
      const priceString = item.price || '$0';
      const priceValue = priceString.replace(/[^0-9.]/g, '');
      return sum + (parseFloat(priceValue) || 0) * (item.quantity || 1);
    }, 0).toFixed(2);

    const newOrder = {
      restaurant: selectedRestaurant?.name,
      items: [...items],
      total,
      address: deliveryAddress,
      paymentMethod: opts.paymentMethod || selectedPayment || 'Unknown',
      upiApp: opts.upiApp || null,
      upiId: opts.upiId || null,
      placedAt: new Date().toISOString(),
    };
    setOrderHistory(prev => [...prev, newOrder]);
    setCartItems([]);
  };

  const handleUpiConfirm = () => {
    if (!upiId) {
      Alert.alert('Validation', 'Please enter your UPI ID before confirming.');
      return;
    }
    
    if (!upiApp) {
      Alert.alert('Validation', 'Please select a UPI app before confirming.');
      return;
    }

    Alert.alert('Processing', `Processing payment via ${upiApp}...`);
    
    setTimeout(() => {
      addOrderToHistory({ paymentMethod: 'UPI', upiApp, upiId });
      setOrderStatus('Order placed successfully!');
      Alert.alert('Order placed', `Payment via ${upiApp} received. Your order has been placed.`);
      
      setUpiVisible(false);
      setUpiApp(null);
      setUpiId('');

      setTimeout(() => {
        setOrderStatus('Order reached your location!');
        Alert.alert(
          'Notification',
          'Food reached your location. Did you receive the order?',
          [
            { 
              text: 'Yes', 
              onPress: () => { 
                setFeedback('');
                setFeedbackVisible(true); 
              } 
            },
            { 
              text: 'No', 
              onPress: () => { 
                Alert.alert('Sorry', 'Sorry for your inconvenience — order will be delivered soon'); 
              } 
            }
          ]
        );
      }, 10000);
    }, 3000);
  };

  const handleFeedback = () => {
    const rating = Number(feedback);
    
    if (isNaN(rating) || rating < 1 || rating > 5) {
      Alert.alert('Invalid Rating', 'Please enter a valid rating between 1 and 5.');
      return;
    }

    if (selectedRestaurant) {
      setRestaurantFeedbacks(prev => {
        const currentFeedbacks = prev[selectedRestaurant.name] || [];
        const updatedFeedbacks = [
          ...currentFeedbacks,
          { 
            rating, 
            comment: problemReport || '', 
            at: new Date().toISOString() 
          }
        ];
        return { 
          ...prev, 
          [selectedRestaurant.name]: updatedFeedbacks 
        };
      });
    }

    if (rating <= 3) {
      // For React Native, we'll use Alert.alert since Alert.prompt is not available on Android
      Alert.alert(
        'Report Problem', 
        'What was the issue?',
        [
          {
            text: 'Skip',
            style: 'cancel',
            onPress: () => {
              Alert.alert('Thank you', 'Your feedback has been recorded.');
              setFeedbackVisible(false);
              setProblemReport('');
              setFeedback('');
            }
          },
          {
            text: 'Describe Issue',
            onPress: () => {
              // In a real app, you would show another modal with TextInput
              // For now, we'll just record without details
              Alert.alert('Thank you', 'Your feedback has been recorded.');
              setFeedbackVisible(false);
              setProblemReport('');
              setFeedback('');
            }
          }
        ]
      );
    } else {
      Alert.alert('Thank you', 'Your feedback has been recorded.');
      setFeedbackVisible(false);
      setProblemReport('');
      setFeedback('');
    }
    
    setPendingFeedbackRestaurant(null);
  };

  return (
    <View style={styles.container}>
      {/* Delivery Symbol */}
      <Image
        source={{ uri: 'https://img.icons8.com/color/96/000000/delivery.png' }}
        style={styles.symbol}
      />
      
      {/* Order Status Display */}
      {orderStatus ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{orderStatus}</Text>
        </View>
      ) : null}
      
      {/* App Button */}
      <TouchableOpacity style={styles.appButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.appText}>Delivery App</Text>
      </TouchableOpacity>

      {/* Modal for Restaurant List */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButtonContainer}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Restaurants</Text>
            <ScrollView style={styles.scrollView}>
              {restaurants.map((r, idx) => (
                <TouchableOpacity key={idx} style={styles.restaurantItem} onPress={() => openMenu(r)}>
                  <Image source={{ uri: r.image }} style={styles.restaurantImage} />
                  <Text style={styles.restaurantName}>{r.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal for UPI App Selection and UPI ID Input */}
      <Modal
        visible={upiVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpiVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setUpiVisible(false)} style={styles.backButtonContainer}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose UPI App</Text>
            
            <TouchableOpacity onPress={() => setUpiApp('PhonePe')} style={styles.paymentOptionContainer}>
              <Text style={[styles.paymentOption, upiApp === 'PhonePe' && styles.selectedPaymentOption]}>PhonePe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUpiApp('Google Pay')} style={styles.paymentOptionContainer}>
              <Text style={[styles.paymentOption, upiApp === 'Google Pay' && styles.selectedPaymentOption]}>Google Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUpiApp('Paytm')} style={styles.paymentOptionContainer}>
              <Text style={[styles.paymentOption, upiApp === 'Paytm' && styles.selectedPaymentOption]}>Paytm</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.addressInput}
              placeholder="Enter UPI ID (example@upi)"
              value={upiId}
              onChangeText={setUpiId}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.paymentButton} onPress={handleUpiConfirm}>
              <Text style={styles.paymentText}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Menu */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.backButtonContainer}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedRestaurant?.name} Menu</Text>
            <ScrollView style={styles.scrollView}>
              {menuItems.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.menuItem} onPress={() => addToCart(item)}>
                  <Image source={{ uri: item.image }} style={styles.menuImage} />
                  <View style={styles.menuItemDetails}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <Text style={styles.menuPrice}>{item.price}</Text>
                    {cartItems.find(ci => ci.name === item.name) && (
                      <Text style={styles.addedToCartText}>Added to cart</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {cartItems.length > 0 && (
              <View style={styles.cartSummary}>
                <Text style={styles.cartTitle}>Cart Summary:</Text>
                {cartItems.map((item, idx) => (
                  <Text key={idx} style={styles.cartItem}>
                    {item.name} x{item.quantity} - {item.price}
                  </Text>
                ))}
                <Text style={styles.cartTotal}>Total: ${computeCartTotal().toFixed(2)}</Text>
              </View>
            )}
            
            <TextInput
              style={styles.addressInput}
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
            
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => {
                if (!cartItems.length) {
                  Alert.alert('Cart Empty', 'Please add items to cart before proceeding to payment.');
                  return;
                }
                if (!deliveryAddress) {
                  Alert.alert('Address Required', 'Please enter delivery address before proceeding to payment.');
                  return;
                }
                setPaymentVisible(true);
              }}
            >
              <Text style={styles.paymentText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Payment */}
      <Modal
        visible={paymentVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPaymentVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setPaymentVisible(false)} style={styles.backButtonContainer}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <View style={styles.paymentSummary}>
              <Text style={styles.subtotalText}>Subtotal: ${computeCartTotal().toFixed(2)}</Text>
              <Text style={styles.totalText}>Amount to pay: ${computeCartTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePayment('Cash on Delivery')} style={styles.paymentOptionContainer}>
              <Text style={styles.paymentOption}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePayment('UPI')} style={styles.paymentOptionContainer}>
              <Text style={styles.paymentOption}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePayment('Debit Card')} style={styles.paymentOptionContainer}>
              <Text style={styles.paymentOption}>Debit Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Feedback */}
      <Modal
        visible={feedbackVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Your Experience</Text>
            <Text style={styles.feedbackSubtitle}>How would you rate your order from {selectedRestaurant?.name}?</Text>
            
            <TextInput
              style={styles.feedbackInput}
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
              value={feedback}
              onChangeText={setFeedback}
              maxLength={1}
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={handleFeedback}>
              <Text style={styles.submitText}>Submit Feedback</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setFeedbackVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  symbol: {
    width: 96,
    height: 96,
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  appText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  scrollView: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  feedbackSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: '500',
  },
  menuPrice: {
    fontSize: 16,
    color: '#888',
  },
  addedToCartText: {
    color: '#4caf50',
    marginTop: 4,
    fontWeight: '500',
  },
  cartSummary: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  cartTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#4caf50',
  },
  addressInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  paymentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  paymentOptionContainer: {
    width: '100%',
    marginBottom: 10,
  },
  paymentOption: {
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  selectedPaymentOption: {
    backgroundColor: '#dff0d8',
  },
  paymentSummary: {
    width: '100%',
    marginBottom: 20,
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    color: '#4caf50',
  },
  feedbackInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});