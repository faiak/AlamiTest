import React, { memo, useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../Config/colors'
import Formatter from '../Utils/Formatter'
import CartItem from './CartItem'

type RenderData = {
  id: number
  name: string
  price: number
  image: string
}

type CartCount = { id: number; total: number }

const DATA = [
  {
    id: 1,
    name: 'Apel',
    price: 1000,
    image:
      'https://res.cloudinary.com/dbw2gd4m8/image/upload/v1654683260/ayo-nikmati-apel-rebus-yang-ternyata-sangat-baik-untuk-kesehatan_zrwze3.jpg',
  },
  {
    id: 2,
    name: 'Jeruk',
    price: 2000,
    image:
      'https://res.cloudinary.com/dbw2gd4m8/image/upload/v1654683258/490391_620_wnubpp.jpg',
  },
  {
    id: 3,
    name: 'Mangga',
    price: 1500,
    image:
      'https://res.cloudinary.com/dbw2gd4m8/image/upload/v1654683256/187246179_ttocqv.jpg',
  },
]

const Cart = () => {
  const [cartCount, setCartCount] = useState<Array<CartCount>>([])

  const totalPrice = useMemo(
    () =>
      cartCount.reduce(
        (prev, current) =>
          prev +
          (DATA.find(item => item.id === current.id)?.price ?? 0) *
            current.total,
        0,
      ),
    [cartCount, DATA],
  )

  const incrementCart = useCallback(id => {
    setCartCount(prev => {
      if (!prev.find(item => item.id === id)) {
        return [...prev, { id, total: 1 }]
      }
      return prev.map(item => ({
        ...item,
        total: item.id === id ? item.total + 1 : item.total,
      }))
    })
  }, [])

  const decrementCart = useCallback(id => {
    setCartCount(prev =>
      prev.map(item => ({
        ...item,
        total: item.id === id && item.total > 0 ? item.total - 1 : item.total,
      })),
    )
  }, [])

  const renderItem = useCallback(
    (item: RenderData) => {
      const totalItem = cartCount.find(i => i.id === item.id)?.total ?? 0
      return (
        <CartItem
          key={`CartItem_${item.id}`}
          item={item}
          total={totalItem}
          onIncrement={incrementCart}
          onDecrement={decrementCart}
        />
      )
    },
    [cartCount],
  )
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Cart</Text>
      </View>
      {DATA.map(renderItem)}
      <View style={styles.rowCenter}>
        <View style={styles.fill}>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.textTotalAmount}>
            {Formatter.money(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.textCheckout}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  titleContainer: {
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: colors.purple[500],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  textTotal: { fontSize: 16, fontWeight: '600' },
  textTotalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[600],
  },
  textCheckout: { color: colors.neutral[100] },
})

export default memo(Cart)
