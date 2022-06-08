import React, { memo, useCallback, useMemo } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../Config/colors'
import Formatter from '../Utils/Formatter'

type RenderData = {
  id: number
  name: string
  price: number
  image: string
}

type CartItemProps = {
  item: RenderData
  total: number
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  total,
}) => {
  const increment = useCallback(() => onIncrement(item.id), [item.id])
  const decrement = useCallback(() => onDecrement(item.id), [item.id])

  const imageSource = useMemo(() => ({ uri: item.image }), [item.image])

  return (
    <View style={styles.container}>
      <View style={styles.rowFill}>
        <Image resizeMode="contain" source={imageSource} style={styles.image} />
        <View style={styles.containerText}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.priceText}>{Formatter.money(item.price)}</Text>
        </View>
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity
          onPress={decrement}
          style={styles.buttonCircle}
          disabled={total === 0}
        >
          <Text style={styles.buttonCircleText}>-</Text>
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText} numberOfLines={1}>
            {total ?? 0}
          </Text>
        </View>
        <TouchableOpacity onPress={increment} style={styles.buttonCircle}>
          <Text style={styles.buttonCircleText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
    marginBottom: 12,
  },
  containerText: { padding: 4, paddingLeft: 8 },
  nameText: { fontWeight: '700', paddingBottom: 4 },
  priceText: { fontSize: 12 },
  fill: { flex: 1 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  rowFill: { flexDirection: 'row', flex: 1 },
  image: {
    width: 50,
    height: 50,
  },
  buttonCircle: {
    width: 28,
    height: 28,
    backgroundColor: colors.yellow[500],
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircleText: {
    fontSize: 16,
  },
  priceContainer: { paddingHorizontal: 8, width: 50, alignItems: 'center' },
})

export default memo(CartItem)
